import { MongoClient } from "mongodb";

// Địa chỉ kết nối đến MongoDB
const uri = "mongodb://localhost:27017"; // Thay đổi theo địa chỉ MongoDB của bạn
export const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Kết nối với server MongoDB
    await client.connect();

    // Chọn cơ sở dữ liệu (database)
    const database = client.db('student'); // Thay đổi tên database của bạn

    // Chọn collection
    const collection = database.collection('student'); // Thay đổi tên collection của bạn

    // Ví dụ: Thực hiện một truy vấn
    const query = { name: "tien" }; // Thay đổi điều kiện truy vấn của bạn
    const result = await collection.findOne(query);

    console.log(result);
  } finally {
    // Đóng kết nối khi hoàn thành
    await client.close();
  }
}

run().catch(console.dir);
