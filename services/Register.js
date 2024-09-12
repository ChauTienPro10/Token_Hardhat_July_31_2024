import express from "express";
import { createNewAccount } from "../interact/interation.js";
const routerRegister = express.Router();
routerRegister.get('/hello', async (req, res) => {
    res.send('Hello, World! and Chau Duong Phat Tien');
});
routerRegister.post('/getNewAccountPay',async (req,res)=>{
    try {
        const { verCode } = req.body;  // Ensure verCode is part of the request body
        if (verCode && verCode !== '') {
          const accountData = await createNewAccount();
          return res.status(200).json(accountData);  // Return after sending response
        }
    
        return res.status(400).json({ message: 'Verification code is missing or empty' }); // Handle missing verCode
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
export {   };
export default routerRegister;









