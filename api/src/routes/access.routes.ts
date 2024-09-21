import express from 'express';
import { verifyUser } from '../utils/verifyUser';
import { verifyAccess } from '../utils/access.handler';
import exp from 'constants';



const acccessRouter=express.Router();

acccessRouter.get("/check",verifyUser,verifyAccess);
export default acccessRouter;