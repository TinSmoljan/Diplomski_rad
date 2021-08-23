import { NextFunction, Request, Response } from "express";
import User from "../sequelize/models/User";
import { generateID } from "../helper functions/uuidGenerator";
import genRandomString from "../helper functions/saltGenerator";
import sha512 from "../helper functions/hashFunctions";
import Owner from "../sequelize/models/Owner";
import { userOrOwner, doesEmailExist } from "../helper functions/userOrOwner";
import nodemailer from "nodemailer";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  //generating id, salt and hash value to store in db
  const id = generateID();
  const salt = genRandomString(16);
  const hashedPassword = sha512(req.body.password, salt);

  //checking if the mail already exists in the db
  const ownerWithSameEmail = await Owner.findAll({
    where: {
      E_mail: req.body.email,
    },
  });
  const userWithSameEmail = await User.findAll({
    where: {
      E_mail: req.body.email,
    },
  });
  if (ownerWithSameEmail.length != 0 || userWithSameEmail.length != 0) {
    return res.status(406).json("A user with that email adress already exists");
  }

  //adding the user to db
  let user;
  try {
    user = await User.create({
      User_id: id,
      First_name: req.body.firstName,
      Last_name: req.body.lastName,
      Password: hashedPassword,
      E_mail: req.body.email,
      Salt: salt,
    });
    req.session.userId = id;
  } catch (err) {
    console.log(err);
    return res.status(400).json("there was an error with creating a user");
  }
  console.log("\nUsers has been added, ID:", user.User_id);
  return res.status(201).json("User has been created");
};

const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(400).json("You must be logged in to edit user data");
  }
  if (!!!req.body.firstName && !!!req.body.lastName && !!!req.body.password && !!!req.body.email) {
    return res.status(400).json("Can't update user without new information");
  }

  const isUserOrOwner = await userOrOwner(req.session.userId);
  let updatedAccount: Array<any> = new Array();
  let properties: Array<any> = new Array();

  /*If we want to update an account we must first find all the new properties that want to be updated.
  That's why we have the "properties" variable which we'll use to update the cureent acount. If this wasn't 
  implemented in this way we would have to make up to 4 updates to our user which isn't very good performance
  wise. Instead if the user hasn't specified that he wants for example a new password or a new email then we'll
  update the instance with the current information that we have regarding those properties*/
  if (isUserOrOwner === "User") {
    let user = await User.findAll({ where: { User_id: req.session.userId } });

    !!req.body.firstName ? properties.push(req.body.firstName) : properties.push(user[0]["First_name"]);
    !!req.body.lastName ? properties.push(req.body.lastName) : properties.push(user[0]["Last_name"]);
    if (!!req.body.email) {
      const emailExists = await doesEmailExist(req.body.email);
      if (emailExists == true) {
        return res.status(406).json("A user with this email already exists");
      } else {
        properties.push(req.body.email);
      }
    } else {
      properties.push(user[0]["E_mail"]);
    }
    if (!!req.body.password) {
      const changedHashedPassword = sha512(req.body.password, user[0]["Salt"]);
      if (changedHashedPassword === user[0]["Password"]) {
        return res.status(400).json("Your new password can't be the same as your last");
      } else {
        const newSalt = genRandomString(16);
        const newHashedPassword = sha512(req.body.password, newSalt);
        properties.push(newHashedPassword);
        properties.push(newSalt);
      }
    } else {
      properties.push(user[0]["Password"]);
      properties.push(user[0]["Salt"]);
    }

    updatedAccount = await User.update(
      {
        First_name: properties[0],
        Last_name: properties[1],
        E_mail: properties[2],
        Password: properties[3],
        Salt: properties[4],
      },
      { where: { User_id: req.session.userId } }
    );
    return res.status(200).json("Your data has been updated");
  } else if (isUserOrOwner === "Owner") {
    // here we have the same logic as with users but with owners
    let owner = await Owner.findAll({ where: { Owner_id: req.session.userId } });

    !!req.body.firstName ? properties.push(req.body.firstName) : properties.push(owner[0]["First_name"]);
    !!req.body.lastName ? properties.push(req.body.lastName) : properties.push(owner[0]["Last_name"]);
    if (!!req.body.email) {
      const emailExists = await doesEmailExist(req.body.email);
      if (emailExists == true) {
        return res.status(406).json("A user with this email already exists");
      } else {
        properties.push(req.body.email);
      }
    } else {
      properties.push(owner[0]["E_mail"]);
    }
    if (!!req.body.password) {
      const changedHashedPassword = sha512(req.body.password, owner[0]["Salt"]);
      if (changedHashedPassword === owner[0]["Password"]) {
        return res.status(400).json("Your new password can't be the same as your last");
      } else {
        const newSalt = genRandomString(16);
        const newHashedPassword = sha512(req.body.password, newSalt);
        properties.push(newHashedPassword);
        properties.push(newSalt);
      }
    } else {
      properties.push(owner[0]["Password"]);
      properties.push(owner[0]["Salt"]);
    }

    updatedAccount = await Owner.update(
      {
        First_name: properties[0],
        Last_name: properties[1],
        E_mail: properties[2],
        Password: properties[3],
        Salt: properties[4],
      },
      { where: { Owner_id: req.session.userId } }
    );
    return res.status(200).json("Your data has been updated");
  } else {
    return res.status(404).json("That account isn't in the databse");
  }
};

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
  //Check if user or owner to see which table to modify
  const isUserOrOwner = await userOrOwner(req.session.userId);
  if (isUserOrOwner === "User") {
    await User.destroy({
      where: {
        User_id: req.session.userId,
      },
    });
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.status(200).json(req.session);
      }
    });
    return res.status(200).json("User has been deleted");
  } else if (isUserOrOwner === "Owner") {
    await Owner.destroy({
      where: {
        Owner_id: req.session.userId,
      },
    });
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.status(200).json(req.session);
      }
    });
    return res.status(200).json("User has been deleted");
  } else {
    return res.status(404).json("This user doesn't exist in the db");
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  //Get the salt to verify credentials
  const saltOwner = await Owner.findAll({
    attributes: ["Salt"],
    where: { E_mail: req.body.email },
  });
  const saltUser = await User.findAll({
    attributes: ["Salt"],
    where: { E_mail: req.body.email },
  });

  if (saltOwner.length == 0 && saltUser.length == 0) {
    return res.status(404).json("Wrong username or password");
  } else {
    if (saltOwner.length == 0) {
      //get the password using the salt and check the credentials
      const hashedPasswordUser = sha512(req.body.password, saltUser[0]["Salt"]);
      const userExists = await User.findAll({
        where: {
          E_mail: req.body.email,
          Password: hashedPasswordUser,
        },
      });
      if (userExists.length == 0) {
        return res.status(404).json("Wrong username or password");
      } else {
        //add user id to cookie for verfication in upcoming requests
        req.session.userId = userExists[0]["User_id"];
        return res.status(200).json("Login succesful");
      }
    } else if (saltUser.length == 0) {
      //same process as with the user only now with owner
      const hashedPasswordOwner = sha512(req.body.password, saltOwner[0]["Salt"]);
      const ownerExists = await Owner.findAll({
        where: {
          E_mail: req.body.email,
          Password: hashedPasswordOwner,
        },
      });
      if (ownerExists.length == 0) {
        return res.status(404).json("Wrong username or password");
      } else {
        req.session.userId = ownerExists[0]["Owner_id"];
        return res.status(200).json("Login succesful");
      }
    }
  }
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId == undefined) {
    return res.status(404).json("You must be logged in to log out");
  }
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send("Unable to log out");
    } else {
      res.status(200).json(req.session);
    }
  });
};

const sendMail = async (req: Request, res: Response, next: NextFunction) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("\n\nServer is ready to take our messages\n\n");
    }
  });

  let info = await transporter.sendMail({
    to: "tsmolj00@fesb.hr", // list of receivers
    subject: `${req.body.title}`, // Subject line
    text: `E-mail:${req.body.email}\n\n${req.body.message}`, // plain text body
  });

  return res.status(200).json("Message has been sent");
};

export default { createAccount, deleteAccount, updateAccount, loginUser, logoutUser, sendMail };
