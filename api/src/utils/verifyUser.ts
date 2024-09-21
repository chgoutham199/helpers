import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
// import { errorHandler } from './errorHandler';
import User from '../models/user.model';
import { log } from 'console';


const result = dotenv.config({ path: path.join(__dirname, '../../.env') });
const secret=result.parsed?.JWT_SECRET;

export const verifyUser =async (req: Request, res: Response, next: Function) => {

         const cookie = req.cookies.auth;
          if (!cookie) {
            return  res.status(401).json({message:"Unauthorized",Login:false});
          }
         let emails:any;
          jwt.verify(cookie, secret as string, (err:any, email:any) => {
            if (err) {
              return res.status(401).json({message:"Unauthorized",Login:false});
            }
            if (email) {
              emails=email.email;
              console.log(emails);
              
            }
            
          });
          try{
           
            const user=await User.findOne({email:emails})
            if (!user){
              // console.log("User Not Found",user);
              return res.status(404).json({message:"User Not Found",Login:false})
            }
            if (user.isActive===false){
              // console.log("User is Deactivated",user);
              return res.status(400).json({message:"User is Deactivated",Login:false})
            }

          }catch(error){
                    next(error)
          }
          
          next();


}