import http from "http";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import establishmentRoutes from "./routes/establishmentRoutes";
import userRoutes from "./routes/userRoutes";
import myCornerRoutes from "./routes/myCornerRoutes";

//For the environment varialbes
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// import session from "express-session"; probaj ovo kasnije kad vidis da noramlni nacin radi
const session = require("express-session");
var MemoryStore = require("memorystore")(session);

const NAMESPACE = "Server";
const router = express();

/** logging the requests */
router.use((req, res, next) => {
  logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });
  next();
});

/**parsing the request so we can see it properly */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

/**adding user id to cookie so it can be manipulated with */
declare module "express-session" {
  interface Session {
    userId: string;
  }
}

/**adding sessions */
router.use(
  session({
    store: new MemoryStore({
      checkPeriod: 1000 * 60 * 60, // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET, // triba izbacit ovo "1" ali dotenv ne radi pa je dramica
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 100, // session max age in miliseconds
    },
  })
);

/**Rules what sort of headers we'll accept and from what origins */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

/** Routes */
router.use("/Establishments", establishmentRoutes);
router.use("/Users", userRoutes);
router.use("/MyCorner", myCornerRoutes);

// /** Error handling */
// router.use((req, res, next) => {
//   const error = new Error("Not found");

//   res.status(404).json({
//     message: error.message,
//   });
// });

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${config.server.port}`));
