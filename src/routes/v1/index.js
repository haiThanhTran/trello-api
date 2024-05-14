/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "~/routes/v1/boardRoutes";
import { columnRoutes } from "~/routes/v1/columnRoutes";
import { cardRoutes } from "~/routes/v1/cardRoutes";

const Router = express.Router();

//Check API V1 status
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use" });
});

Router.use("/boards", boardRoutes);

Router.use("/columns", columnRoutes);

Router.use("/cards", cardRoutes);

export const APIs_V1 = Router;
