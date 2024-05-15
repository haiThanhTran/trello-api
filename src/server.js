/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import cors from "cors";
import { corsOptions } from "~/config/cors";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  //Xu ly cors
  app.use(cors(corsOptions));
  //Enable req.body json data
  app.use(express.json());

  app.use("/v1", APIs_V1);

  //Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(
        `production Hello ${env.AUTHOR}, I am running at Port ${process.env.PORT}/`
      );
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(
        `Hello local dev ${env.AUTHOR}, I am running at ${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`
      );
    });
  }

  exitHook(() => {
    console.log("4.Server is shutting down");
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
