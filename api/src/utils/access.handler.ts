import User from "../models/user.model";
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { access } from "fs";


const result = dotenv.config({ path: path.join(__dirname, '../../.env') });
const secret=result.parsed?.JWT_SECRET;

export const verifyAccess=async (req: Request, res: Response, next: Function) => {

    const cookie = req.cookies.auth;
    let emails:any;
    jwt.verify(cookie, secret as string, (err:any, email:any) => {

        if (email) {
            emails=email.email;

    }
});

     try{
        const user=await User.findOne({email:emails});
        if (user?.role=="admin"){
              console.log("admin");
              return res.status(200).json({access:"admin"})   
        }
        else if (user?.role=="user"){
            console.log("user");
            return res.status(200).json({access:"user"})
        }

        
     }catch(error){
        next(error)

     }



}
