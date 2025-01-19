import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productroutes from './routes/productroutes.js';
import cors from 'cors'; 
import path from 'path'; // Add this line at the top
const app = express();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config();

app.use(cors());
app.use(express.json());


app.use('/api/products', productroutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend", "dist")));


app.get("*", (req,res) => {
  res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
})
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); 
  }
};


startServer();
