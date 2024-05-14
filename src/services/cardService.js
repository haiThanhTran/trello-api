/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //Xử lý logic dữ liệu tùy đặc thù
    const newCard = {
      ...reqBody,
    };

    const createdCard = await cardModel.createNew(newCard);

    //Lay ban ghi card sau khi goi
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);

    //...
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard);
    }
    // console.log(getNewCard)
    //Trả kết quả về,trong Service luôn phải có return
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
