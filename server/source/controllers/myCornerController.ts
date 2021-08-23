import { Request, Response, NextFunction } from "express";
import { userOrOwner } from "../helper functions/userOrOwner";
import Establishment from "../sequelize/models/Establishment";
import FavoritesOwner from "../sequelize/models/FavoritesOwner";
import FavoritesUser from "../sequelize/models/FavoritesUser";
import Reservation from "../sequelize/models/Reservation";
import WorkHour from "../sequelize/models/WorkHours";

const myCorner = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(400).json("You must be logged to see your corner");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);
  if (isUserOrOwner == "User") {
    const favorites = await Establishment.findAll({
      include: [
        { model: FavoritesUser, where: { User_id: req.session.userId } },
        { model: WorkHour, where: { Day_type: "Weekday" }, required: false },
      ],
    });
    return res.status(200).json(favorites);
  } else if (isUserOrOwner == "Owner") {
    const favorites = await Establishment.findAll({
      include: [
        { model: FavoritesOwner, where: { Owner_id: req.session.userId } },
        { model: WorkHour, where: { Day_type: "Weekday" }, required: false },
      ],
    });
    return res.status(200).json(favorites);
  } else {
    return res.status(404).json("This user is not in the deatabase");
  }
};

const getReservations = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(400).json("You must be logged to see your reservations");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);
  if (isUserOrOwner == "User") {
    const reservations = await Reservation.findAll({ where: { User_id: req.session.userId }, include: [{ model: Establishment }] });
    return res.status(200).json(reservations);
  } else if (isUserOrOwner == "Owner") {
    const reservations = await Reservation.findAll({ where: { Owner_id: req.session.userId }, include: [{ model: Establishment }] });
    return res.status(200).json(reservations);
  }
};

const getMyEstablishments = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(400).json("You must be logged to see your establishments");
  }
  const isUserOrOwner = await userOrOwner(req.session.userId);
  if (isUserOrOwner == "User") {
    return res.status(400).json("You must have establishments to manage them");
  } else if (isUserOrOwner == "Owner") {
    const establishments = await Establishment.findAll({
      where: {
        Owner_id: req.session.userId,
      },
    });
    return res.status(200).json(establishments);
  }
};
export default { myCorner, getReservations, getMyEstablishments };
