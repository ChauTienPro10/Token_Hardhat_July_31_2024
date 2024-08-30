import express from "express";
import routerRegister from "./services/Register.js";

const app = express();
const port = 3001;


// Middleware to parse JSON in the request body
app.use(express.json());
app.use('/registerService', routerRegister);

// Simple GET route
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
