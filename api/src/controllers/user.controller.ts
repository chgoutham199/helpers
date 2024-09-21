import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandler";
import { Response, Request } from "express";
import dotenv from 'dotenv';
import path from "path";
import jwt from 'jsonwebtoken';

const result=dotenv.config({ path: path.join(__dirname, '../../.env') });

const secret=result.parsed?.JWT_SECRET;

const  Login=async(req:Request,res:Response,next:Function)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return   res.status(404).json({message:"User Not Found"})
        }
        if (user.isActive==false){
            return res.status(400).json({message:"User is Deactivated",Login:false})

        }
        if (user.password!==password){
            return res.status(400).json({message:"Invalid Password"})
        }
        const token=jwt.sign({email:email},secret as string)
            res.cookie('auth',token).status(200).json({email});

    }
    catch (error) {
        next(error);
        console.log(error);
    }
}


const Logout= async(req:Request,res:Response,next:Function)=>{
    try {
        res.clearCookie('auth').status(200).json({message:"Logged Out",logout:true});
    } catch (error) {
        next(error);
    }
}

// const checkStatus=async(req:Request,res:Response,next:Function)=>{

//              try{   
//                     const email=req.body.email;
//                     const user=await User.findOne({email})
//                     if (!user){
//                         return res.status(404).json({message:"User Not Found"})
//                     }
//                     if (user.isActive===false){
//                         return res.status(400).json({message:"User is Deactivated"})
//                     }
//                     return res.status(200).json({email:user.email,isActive:user.isActive});
                             

                    
//              }catch(error){
//                     next(error);
//                 }

// }


export{Login,Logout};