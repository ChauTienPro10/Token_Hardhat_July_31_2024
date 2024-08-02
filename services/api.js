import express from "express";
import { getBlockNumber } from "../interact/interation.js";
const app = express();
const port = 3001;

// Middleware to parse JSON in the request body
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// POST route to receive and echo back data
app.post('/echo', (req, res) => {
  const data = req.body;
  res.json(data);
});

// aoi get block number
app.get('/getBlocks',async (req,res)=>{
    const data=await getBlockNumber();
    res.send(data);
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});