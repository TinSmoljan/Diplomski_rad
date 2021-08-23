import { Sequelize } from "sequelize";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const databaseName: string = String(process.env.DATABASE_NAME);
const databaseType: string = String(process.env.DATABASE_TYPE);
const databasePassword: string = String(process.env.DATABASE_PASSWORD);
const host: string = String(process.env.SERVER_HOSTNAME);

const sequelize = new Sequelize(databaseName, databaseType, databasePassword, {
  host: host,
  dialect: "postgres",
});

export default sequelize;
