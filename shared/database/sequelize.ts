import * as mysql from "mysql2";
import { Options, Sequelize } from "sequelize";

// Options for the database connection
// const options: Options = {
//   database: process.env.DB_SCHEMA,
//   dialect: "mysql",
//   dialectModule: mysql,
//   host: process.env.DB_HOST,
//   username: process.env.DB_USERNAME,
//   logging: false,
//   pool: {
//     max: 2,
//     min: 0,
//     idle: 0,
//     acquire: 3000,
//     evict: process.env.DEFAULT_LAMBDA_FUNCTION_TIMEOUT
//       ? parseInt(process.env.DEFAULT_LAMBDA_FUNCTION_TIMEOUT)
//       : 300,
//   },
// };

const options: Options = {
  database: "kracknow",
  dialect: "mysql",
  dialectModule: mysql,
  host: "localhost",
  username: "root",
  logging: false,
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 3000,
  },
};
/**
 * Add password to the options if it is provided
 * This is to prevent mysql throwing errors "PASSWORD=YES" when
 * running on environments which does not have password like localhost
 */
if (process.env.DB_PASSWORD !== "null") {
  options.password = process.env.DB_PASSWORD;
}

export const loadDatabase = async () => {
  const sequelize = new Sequelize(options);
  // console.log('KRISH',Sequelize)
  await sequelize.authenticate();
  return sequelize;
};
export const instance = { connection: null };
