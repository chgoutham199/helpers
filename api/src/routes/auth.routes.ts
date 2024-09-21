import express from "express";
import { Login, Logout} from "../controllers/user.controller";

const authRouter=express.Router();

authRouter.post("/login",Login);
authRouter.post("/logout",Logout);
// authRouter.post("/checkStatus",checkStatus);

export default authRouter;