/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi, { types } from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),
  });

  try {
    //Chỉ định abortEarly :false để trường hợp có lỗi vẫn check tiếp
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    //Validate dữ liệu xong thì cho request đi tiếp sang Controller
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customerError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,errorMessage);
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
  });

  try {
    //Chỉ định abortEarly :false để trường hợp có lỗi vẫn check tiếp
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    //Validate dữ liệu xong thì cho request đi tiếp sang Controller
    next();
  } catch (error) {
    // const errorMessage = new Error(error).message;
    // const customerError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,errorMessage);
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY), error.message);
  }
};
export const columnValidation = {
  createNew,
  update,
};
