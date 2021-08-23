import express from "express";
import userController from "../controllers/userController";
import { editUserValidation, loginUserValidation, newUserValidation, sendMailValidation } from "../validation/UserValidation";
import ValidationResult from "../validation/ValidationResult";

const router = express.Router();

router.post("/AddUser", newUserValidation, ValidationResult, userController.createAccount);
router.delete("/DeleteAccount", userController.deleteAccount);
router.put("/UpdateAccount", editUserValidation, ValidationResult, userController.updateAccount);
router.post("/Login", loginUserValidation, ValidationResult, userController.loginUser);
router.post("/Logout", userController.logoutUser);
router.post("/SendMail", sendMailValidation, ValidationResult, userController.sendMail);

export = router;
