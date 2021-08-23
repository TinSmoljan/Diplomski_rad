import { body, oneOf } from "express-validator";

const newUserValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  body("firstName").exists({ checkFalsy: true }),
  body("lastName").exists({ checkFalsy: true }),
];

const loginUserValidation = [body("email").isEmail(), body("email").exists({ checkFalsy: true }), body("password").isLength({ min: 8 })];

const editUserValidation = [
  oneOf([body("email").isEmail(), body("email").isEmpty()]),
  oneOf([body("password").isLength({ min: 8 }), body("password").isEmpty()]),
];

const sendMailValidation = [
  body("email").isEmail(),
  body("title").exists({ checkFalsy: true }),
  body("message").exists({ checkFalsy: true }),
];

export { newUserValidation, loginUserValidation, editUserValidation, sendMailValidation };
