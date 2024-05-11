/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formaters";
import { boardModel } from "~/models/boardModel";
import { StatusCodes } from "http-status-codes";
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createdBoard = await boardModel.createNew(newBoard);
    console.log("createdBoard", createdBoard);

    //Lay ban ghi board sau khi goi
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)
    //Trả kết quả về,trong Service luôn phải có return
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetail = async (boardId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log("boardId",boardId)
    const board = await boardModel.getDetail(boardId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found');
    }
    return board;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetail
};
