/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi, { types } from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import {BOARD_TYPES} from "~/utils/constants"
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({}),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type:Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  });

  try {
    //Chỉ định abortEarly :false để trường hợp có lỗi vẫn check tiếp
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validate dữ liệu xong thì cho request đi tiếp sang Controller
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customerError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,errorMessage);
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), error.message);


  }
};

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type:Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
  });

  try {
    //Chỉ định abortEarly :false để trường hợp có lỗi vẫn check tiếp
    await correctCondition.validateAsync(req.body, { 
      abortEarly: false ,
      allowUnknown: true
    });
    //Validate dữ liệu xong thì cho request đi tiếp sang Controller
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customerError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,errorMessage);
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), error.message);


  }
};

export const boardValidation = {
  createNew,
  update
};
