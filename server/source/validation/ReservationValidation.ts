import { body } from "express-validator";

const makeReservationValidation = [
  body("date").exists({ checkFalsy: true }),
  body("from").exists({ checkFalsy: true }),
  body("to").exists({ checkFalsy: true }),
];
const cancelReservationValidation = [body("reservationId").exists({ checkFalsy: true })];


export { makeReservationValidation, cancelReservationValidation };
