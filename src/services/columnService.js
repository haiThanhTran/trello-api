/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { columnModel } from "~/models/columnModel";
import { boardModel } from "~/models/boardModel";
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù
    const newColumn = {
      ...reqBody,
    };

    const createdColumn = await columnModel.createNew(newColumn);

    //Lay ban ghi column sau khi goi
    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      getNewColumn.cards=[]

      //Cập nhật lại mảng columnOrderIds
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    //...

    // console.log(getNewColumn)
    //Trả kết quả về,trong Service luôn phải có return
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (columnId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedColumn = await columnModel.update(columnId,updateData);
    return updatedColumn;
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  update
};
