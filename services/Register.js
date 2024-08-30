import express from "express";

import { ObjectId } from "mongodb";
import { uri,clientMongo } from "../MongoCf.js";
import { CourseRegistration } from "../src/entity/CourseRegistration.js";

const newCourse=new CourseRegistration("1","101",new Date)
async function addCourse(course) {
    await clientMongo.connect();
    const db = clientMongo.db('eLearning');
    const collection = db.collection('register');
    const result = await collection.insertOne(course);
    console.log('Course added with ID:', result.insertedId);
    await clientMongo.close();
}

async function findRegisInfor(id) {
    try {
        await clientMongo.connect();
        const db = clientMongo.db('eLearning');
        const collection = db.collection('register');
        const document = await collection.findOne({ _id: new ObjectId(id) });
        if (document) {
            const registration = new CourseRegistration(document.idStudent, document.idCourse, document.time);
            console.log(`da tim thay! ${document._id}`)
            return registration;
        } else {
            console.log('No document found with this ID');
            return null;
        }
    } finally {
        await clientMongo.close();
    }
}

 const routerRegister = express.Router();

routerRegister.get('/hello', async (req, res) => {
    res.send('Hello, World! and Chau Duong Phat Tien');
});
routerRegister.get('/findID',async(req,res)=>{
    
    res.json(await findRegisInfor("66d14235483d018e23b3a269"));
})

export { addCourse, findRegisInfor };
export default routerRegister;









