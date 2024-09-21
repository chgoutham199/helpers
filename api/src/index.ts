import express from "express";
import mongoose from "mongoose";
import helperRouter from "./routes/helper.routes";
import { Response,Request } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import cookieParser from 'cookie-parser';
import authRouter from "./routes/auth.routes";
import acccessRouter from "./routes/access.routes";
const app = express();
const result = dotenv.config({ path: path.join(__dirname, '../.env') });
const port=result.parsed?.PORT || 3000;
const Key = result.parsed?.MONGO;
const local= result.parsed?.LOCAL_MONGO;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use(cors({
  origin:true,
  credentials:true
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((error :any,req :Request , res: Response,next:Function) => {

      const statusCode = error.statusCode || 500;
      const message = error.message || "internalServerError";
      res.status(statusCode).json({
        
        success:false,
        message:message,
        statusCode
        });


});
app.use('/api/helper',helperRouter)
app.use('/api/user',authRouter);
app.use('/api/access',acccessRouter)


const connect = async () => {
   try {
    await mongoose.connect(local as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }

};

connect();
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});


