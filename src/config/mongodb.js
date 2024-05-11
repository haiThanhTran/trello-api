/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
//1eEVJIzZsJZKuD0W
import { env } from "~/config/environment";

import { MongoClient, ServerApiVersion } from "mongodb";

//Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null(vì chưa connect)
let trelloDatabaseInstance = null;

//Khởi tạo 1 đối tượng MongoClient Instance để connect tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI);

//Kết nối tới Database

export const CONNECT_DB = async () => {
  //Gọi kết nối tới MongoDB ATlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect();

  //Kết nối thành công thì lấy ra Database theo tên và gán ngược nó lại biến trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME);
};

export const GET_DB = () => {
  if (!trelloDatabaseInstance)
    throw new Error("Must connect to Database first");
  return trelloDatabaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
