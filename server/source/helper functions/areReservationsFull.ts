import { Op } from "sequelize";
import Establishment from "../sequelize/models/Establishment";
import Reservation from "../sequelize/models/Reservation";
import getTheDates from "./dateGetter";

const isFull = async (from: string, to: string, establishmentId: string, date: Date): Promise<boolean> => {
  const establishment = await Establishment.findAll({
    where: { Establishment_id: establishmentId },
    attributes: ["Count"],
  });
  const count = establishment[0]["Count"];

  const otherReservations = await Reservation.findAll({
    where: { Establishment_id: establishmentId, Date: date },
    attributes: ["From", "To"],
  });

  let isFull = 0;
  for (let i = 0; i < otherReservations.length; i++) {
    if (from <= otherReservations[i]["From"].toString() && to >= otherReservations[i]["To"].toString()) {
      isFull++;
    } else if (
      from <= otherReservations[i]["From"].toString() &&
      to > otherReservations[i]["From"].toString() &&
      to <= otherReservations[i]["To"].toString()
    ) {
      isFull++;
    } else if (from >= otherReservations[i]["From"].toString() && from < otherReservations[i]["To"].toString()) {
      isFull++;
    }
  }

  return isFull < count ? true : false;
};

const moreThan3 = async (userId: string, establishmentId: string, date: string): Promise<boolean> => {
  const dates = getTheDates(date);
  const reservations = await Reservation.findAll({
    where: {
      User_id: userId,
      Establishment_id: establishmentId,
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
  return reservations.length >= 3 ? true : false;
};

export { isFull, moreThan3 };
