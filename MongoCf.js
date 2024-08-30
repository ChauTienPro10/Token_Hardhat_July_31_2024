import { MongoClient } from "mongodb";
export const uri = "mongodb://localhost:27017"; // Thay đổi theo địa chỉ MongoDB của bạn
export const clientMongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



