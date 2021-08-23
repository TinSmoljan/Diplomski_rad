import { NextFunction, Request, response, Response } from "express";
import { Op } from "sequelize";
import { isFull, moreThan3 } from "../helper functions/areReservationsFull";
import getTheDates from "../helper functions/dateGetter";
import {userOrOwner} from "../helper functions/userOrOwner";
import { generateID } from "../helper functions/uuidGenerator";
import Establishment from "../sequelize/models/Establishment";
import FavoritesOwner from "../sequelize/models/FavoritesOwner";
import FavoritesUser from "../sequelize/models/FavoritesUser";
import Picture from "../sequelize/models/Pictures";
import Reservation from "../sequelize/models/Reservation";
import WorkHour from "../sequelize/models/WorkHours";

const getEstablishments = async (req: Request, res: Response, next: NextFunction) => {
  let favoritesUser,
    favoritesOwner,
    favorites: Array<string> = new Array(),
    toReturn: Array<any>;

  //Get the favorites if the user is logged in
  if (req.session.userId != undefined) {
    const isUserOrOwner = await userOrOwner(req.session.userId);
    if (isUserOrOwner === "User") {
      favoritesUser = await FavoritesUser.findAll({
        where: { User_id: req.session.userId },
        include: [{ model: Establishment, where: { Type: req.params.type }, attributes: ["Establishment_id"] }],
        attributes: ["Establishment_id"],
      });
      for (let i = 0; i < favoritesUser.length; i++) {
        favorites.push(favoritesUser[i]["Establishment_id"]);
      }
    } else if (isUserOrOwner === "Owner") {
      favoritesOwner = await FavoritesOwner.findAll({
        where: { Owner_id: req.session.userId },
        include: [{ model: Establishment, where: { Type: req.params.type }, attributes: ["Establishment_id"] }],
        attributes: ["Establishment_id"],
      });
      for (let i = 0; i < favoritesOwner.length; i++) {
        favorites.push(favoritesOwner[i]["Establishment_id"]);
      }
    }
  }
  //get the establishments with their work hours
  const establishments = await Establishment.findAll({
    where: {
      Type: req.params.type,
    },
    include: [
      { model: WorkHour, required: false },
      { model: Picture, required: false, where: { Thumbnail: true }, attributes: [["Picture", "Thumbnail"]] },
    ],
  });

  toReturn = req.session.userId != undefined ? [establishments, favorites] : [establishments];
  return res.status(200).json(toReturn);
};

const getEstablishment = async (req: Request, res: Response, next: NextFunction) => {
  const establishment = await Establishment.findAll({
    where: {
      Type: req.params.type,
      Establishment_id: req.params.establishmentId,
    },
  });
  const work_hour = await WorkHour.findAll({
    where: {
      Establishment_id: req.params.establishmentId,
    },
  });

  //get all the reservations of that establishment in that week
  let dates = getTheDates(req.params.date);
  const reservations = await Reservation.findAll({
    where: {
      Establishment_id: req.params.establishmentId,
      [Op.or]: [
        { Date: dates[0] },
        { Date: dates[1] },
        { Date: dates[2] },
        { Date: dates[3] },
        { Date: dates[4] },
        { Date: dates[5] },
        { Date: dates[6] },
      ],
    },
  });

  //get user reservations and if he has favorited that establishemnt so we can display them
  let userReservation, favorite;
  if (req.session.userId != undefined) {
    userReservation = await Reservation.findAll({
      where: {
        Establishment_id: req.params.establishmentId,
        User_id: req.session.userId,
      },
    });

    favorite = await FavoritesUser.findAll({
      where: { User_id: req.session.userId, Establishment_id: req.params.establishmentId },
    });
  }
  const toReturn =
    req.session.userId != undefined
      ? [establishment, work_hour, reservations, userReservation, `Favorited: ${Boolean(favorite)}`]
      : [establishment, work_hour, reservations];
  return res.status(200).json(toReturn);
};

const favouriteEstablishment = async (req: Request, res: Response, next: NextFunction) => {
  //can't favorite if they're not logged in
  if (req.session.userId == undefined) {
    return res.status(401).json("You must log in to favorite establishments");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);
  if (isUserOrOwner === "User") {
    const favorite = await FavoritesUser.create({ User_id: req.session.userId, Establishment_id: req.params.establishmentId });
    return res.status(200).json("You have succesfully favorited this establishment");
  } else if (isUserOrOwner === "Owner") {
    const favorite = await FavoritesOwner.create({ Owner_id: req.session.userId, Establishment_id: req.params.establishmentId });
    return res.status(200).json("You have succesfully favorited this establishment");
  } else {
    return res.status(404).json("That user doesn't exist");
  }
};

const unFavouriteEstablishment = async (req: Request, res: Response, next: NextFunction) => {
  //can't unfavorite if they're not logged in
  if (req.session.userId == undefined) {
    return res.status(401).json("You must log in to unfavorite establishments");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);

  if (isUserOrOwner === "User") {
    const favorite = await FavoritesUser.destroy({ where: { User_id: req.session.userId, Establishment_id: req.params.establishmentId } });
    return res.status(200).json("You have succesfully unfavorited this establishment");
  } else if (isUserOrOwner === "Owner") {
    const favorite = await FavoritesUser.destroy({ where: { User_id: req.session.userId, Establishment_id: req.params.establishmentId } });
    return res.status(200).json("You have succesfully unfavorited this establishment");
  } else {
    return res.status(404).json("That user doesn't exist");
  }
};

const setReservation = async (req: Request, res: Response, next: NextFunction) => {
  //can't set a reservation if they're not logged in
  if (req.session.userId == undefined) {
    return res.status(401).json("You must log in to make reservations");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);
  const id = generateID();

  if (isUserOrOwner === "User") {
    /*check if the reservation can be made. If there are already too many reservations 
    during that period (no.reservations >= allowed by establishment) then the reservation has to be declined */
    const canAddReservation = await isFull(req.body.from, req.body.to, req.params.establishmentId, req.body.date);
    //If the user already has 3 reservations this week he cannot make a fourth
    const isMoreThan3 = await moreThan3(req.session.userId, req.params.establishmentId, req.body.date);
    if (isMoreThan3 == true) {
      return res.status(406).json("You already have 3 reservations this week, you can't make any more");
    }
    if (canAddReservation == true) {
      const reservation = await Reservation.create({
        Establishment_id: req.params.establishmentId,
        User_id: req.session.userId,
        Date: req.body.date,
        From: req.body.from,
        To: req.body.to,
        Reservation_id: id,
        Owner_id: null,
      });
      return res.status(201).json("Your reservation has been added");
    } else {
      return res.status(406).json("The establishment is already at max capacity at that time");
    }
  } else if (isUserOrOwner === "Owner") {
    //same as with user but with owner
    const canAddReservation = await isFull(req.body.from, req.body.to, req.params.establishmentId, req.body.date);
    if (canAddReservation == true) {
      const reservation = await Reservation.create({
        Establishment_id: req.params.establishmentId,
        User_id: req.session.userId,
        Date: req.body.date,
        From: req.body.from,
        To: req.body.to,
        Reservation_id: id,
        Owner_id: req.session.userId,
      });
      return res.status(201).json("Your reservation has been added");
    } else {
      return res.status(406).json("The establishment is already at max capacity at that time");
    }
  } else {
    return res.status(404).json("That user doesn't exist");
  }
};

const cancelReservation = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(401).json("You must log in to cancel reservations");
  }
  const reservation = await Reservation.destroy({
    where: { Reservation_id: req.body.reservationId },
  });
  if (reservation == 0) {
    return res.status(404).json("Reservation not found");
  }
  return res.status(200).json("Reservation has been deleted");
};

const getPictures = async (req: Request, res: Response, next: NextFunction) => {
  console.log("\n\n\n this \n\n\n");

  const pictures = await Picture.findAll({
    where: { Establishment_id: req.params.establishmentId },
    attributes: ["Picture"],
  });
  if (pictures.length == 0) {
    return res.status(404).json("This establishment doesn't have pictures");
  }
  return res.status(200).json(pictures);
};

const getReservations = async (req: Request, res: Response, next: NextFunction) => {
/*When the user chooses a different week he gets different reservations.
 This is done so the whole page doesn't have to be re-rendered, just the reservations part*/
  let dates = getTheDates(req.params.date);
  const reservations = await Reservation.findAll({
    where: {
      Establishment_id: req.params.establishmentId,
      [Op.or]: [
        { Date: dates[0] },
        { Date: dates[1] },
        { Date: dates[2] },
        { Date: dates[3] },
        { Date: dates[4] },
        { Date: dates[5] },
        { Date: dates[6] },
      ],
    },
  });
  return res.status(200).json(reservations);
};

export default {
  getEstablishments,
  getEstablishment,
  favouriteEstablishment,
  unFavouriteEstablishment,
  setReservation,
  cancelReservation,
  getPictures,
  getReservations,
};
