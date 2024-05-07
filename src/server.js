/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
const START_SERVER = () => {
  const app = express();



  app.get("/", async (req, res) => {
    console.log(process.env);
    // Test Absolute import mapOrder
    res.end("<h1>Hello World!</h1><hr>");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(
      `Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`
    );
  });

  exitHook(() => {
    console.log('4.Server is shutting down');
    CLOSE_DB();
    console.log("5.Disconneted from MongoDB");
  });
};

(async () => {
  try {
    console.log("1.Connecting to MongoDB Cloud Atlas!");
    await CONNECT_DB();
    console.log("2.Connected to MongoDB Cloud Atlas!");
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();

// CONNECT_DB()
//   .then(() => console.log("Connect to MongoDB Cloud Atlas!"))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//     process.exit(0);
//   });
