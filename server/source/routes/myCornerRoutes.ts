import express from "express";
import myCornerController from "../controllers/myCornerController";

const router = express.Router();

router.get("/", myCornerController.myCorner);
router.get("/Reservations", myCornerController.getReservations);
router.get("/MyEstablishments", myCornerController.getMyEstablishments);

export = router;
