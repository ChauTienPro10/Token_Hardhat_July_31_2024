import express from "express";
import { createNewAccount,getTokenOf ,transferTokens,addKeyToBlockChain} from "../interact/interation.js";
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const OWNER=process.env.OWNER;

const routerRegister = express.Router();
console.log('Private Key:', PRIVATE_KEY);
routerRegister.get('/hello', async (req, res) => {
    res.send('Hello, World! and Chau Duong Phat Tien');
});


routerRegister.post('/getNewAccountPay',async (req,res)=>{
    try {
      const authHeader = req.headers['authorization'];
        if (authHeader && authHeader !== '') {
          const token = authHeader.split(' ')[1];
          // const decoded = jwt.verify(token, PRIVATE_KEY);
          // const username = decoded.username || decoded.sub;
          const accountData = await createNewAccount();
          return res.status(200).json(accountData);  // Return after sending response
        }
      return res.status(400).json({ message: 'Verification code is missing or empty' }); // Handle missing verCode
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
})
routerRegister.get('/getbalance',async (req,res)=>{
  try{
    const { address } = req.query;
    const balance = await getTokenOf(address);
    return res.status(200).json(Number(balance));
  }catch (error) {
    
        res.status(500).json({ error: error.message });
      }
})

routerRegister.post('/trans.token',async (req,res)=>{
  try{
    

    const resultStatus=await transferTokens(req.body.amount,req.body.email, OWNER,PRIVATE_KEY) // emamil la address 
    if(resultStatus){
      return res.status(200).json({result:Number(await getTokenOf(req.body.email))});
    }
    else{
      res.status(500).json({ result:0 });
    }
  }catch (error) {
        res.status(500).json({ result:0 });
      }
})

routerRegister.post('/add.key',async (req,res)=>{

  addKeyToBlockChain(req.body.key);
  console.log(req.body.key);
  res.status(200).json(true);
})

routerRegister.post('/pay.token',async (req,res)=>{
  try{
    if (getTokenOf(req.body.email)<req.body.amount){
      res.status(500).json({ result:-1 });
    }
    else{
      const resultStatus=await transferTokens(req.body.amount, OWNER,req.body.email,req.body.key) // emamil la address 
      console.log(req.body.email);
      if(resultStatus){
        return res.status(200).json({result:Number(await getTokenOf(req.body.email))});
      }
      else{
        res.status(500).json({ result:-1 });
      }
    }
    
  }catch (error) {
        res.status(500).json({ result:-1 });
      }
})

routerRegister.get('/getAdTokens', async (req,res) => {
  try {
    return res.status(200).json({balance:Number(await getTokenOf('0x320622231715a3C30307B74Ba0f5Fe7a919086bA'))});
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).json({ error: 'Failed to fetch token balance' });
  }
});
export default routerRegister;









