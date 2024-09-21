import express from 'express';
import { getHelper,getHelpers,createHelper,updateHelper,deleteHelper } from '../controllers/helper.controller';
import multer from 'multer';
import { verifyUser } from '../utils/verifyUser';
const helperRouter = express.Router();
const upload = multer();
helperRouter.get("/",verifyUser,getHelpers);
helperRouter.get("/:id",verifyUser,getHelper);
helperRouter.post("/", verifyUser,upload.fields([{ name: 'photo' }, { name: 'document' }]), createHelper);
helperRouter.put("/:id", verifyUser,upload.fields([{ name: 'photo' }, { name: 'document' }]), updateHelper);
helperRouter.delete("/:id",verifyUser,deleteHelper);
export default helperRouter;

