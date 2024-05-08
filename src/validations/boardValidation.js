/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({

    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    // console.log("req.body",req.body)
    //Chỉ định abortEarly :false để trường hợp có lỗi vẫn check tiếp
    await correctCondition.validateAsync(req.body,{abortEarly:false})

    // next()
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Post From Validation: APIs V1 create new board" });
  } catch (error) {
    console.log("error1",error)
    console.log("error2",new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors:new Error(error).message
    })
  }
};

export const boardValidation = {
  createNew,
};
