import express from "express";
import establishmentController from "../controllers/establishmentController";
import {makeReservationValidation, cancelReservationValidation} from "../validation/ReservationValidation";
import ValidationResult from "../validation/ValidationResult";

const router = express.Router();

router.get("/:type", establishmentController.getEstablishments);
router.get("/:type/:establishmentId/getPictures", establishmentController.getPictures);
router.get("/:type/:establishmentId/:date", establishmentController.getEstablishment);
router.get("/:type/:establishmentId/:date/getReservations", establishmentController.getReservations);
router.post("/:type/:establishmentId/favourite", establishmentController.favouriteEstablishment);
router.delete("/:type/:establishmentId/unfavourite", establishmentController.unFavouriteEstablishment);
router.post("/:type/:establishmentId/makeReservation", makeReservationValidation, ValidationResult, establishmentController.setReservation);
router.delete("/:type/:establishmentId/cancelReservation", cancelReservationValidation, ValidationResult, establishmentController.cancelReservation);



export = router;
