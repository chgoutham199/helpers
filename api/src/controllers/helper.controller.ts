
import Helper from "../models/helpers.model";
import { errorHandler } from "../utils/errorHandler";
import { Response, Request } from "express";
import mongoose from "mongoose";

const createHelper = async (req: Request, res: Response, next: Function) => {
  try {
    const { photo, document } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const helperData = {
      ...req.body,
      photo: photo ? photo[0].buffer.toString("base64") : undefined,
      document: document ? document[0].buffer.toString("base64") : undefined,
    };
    const helper = new Helper(helperData);
    await helper.save();
    res.status(201).json({ message: "Helper created successfully", helper });
  } catch (error) {
    console.log(error);
    if (error instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation error", errors });
    }

    if ((error as any).code === 11000) {
      const duplicateField = Object.keys((error as any).keyValue)[0];
      const errorMessage = `${duplicateField} already exists`;
      return res.status(409).json({ message: errorMessage });
    }
    next(error);
  }
};
const getHelpers = async (req: Request, res: Response, next: Function) => {
  try {
    const {
      search,
      organization,
      type,
      gender,
      vehicleType,
      limit = 10,
      skip = 0,
    } = req.query;
    const parsedLimit = parseInt(limit as string);
    const parsedSkip = parseInt(skip as string);
    const query: any = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (organization) {
      query.organization = organization;
    }
    if (type) {
      query.type = type;
    }
    if (gender) {
      query.gender = gender;
    }

    if (vehicleType) {
      query.vehicleType = vehicleType;
    }
    console.log(query);

    const helpers = await Helper.find(query)
      .limit(parsedLimit)
      .skip(parsedSkip);
    const total = await Helper.countDocuments();
    res.status(200).json({ helpers, total });
  } catch (error) {
    next(error);
  }
};
const getHelper = async (req: Request, res: Response, next: Function) => {
  try {
    const helper = await Helper.findById(req.params.id);
    if (!helper) {
      return next( errorHandler(404, "Helper not found"));
    }
    res.status(200).json({ helper });
  } catch (error) {
    next(error);
  }
};
const updateHelper = async (req: Request, res: Response, next: Function) => {
  try {
    const { photo, document } = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const updateData = {
      ...req.body,
      ...(photo && { photo: photo[0].buffer.toString("base64") }),
      ...(document && { document: document[0].buffer.toString("base64") }),
    };

    const helper = await Helper.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!helper) {
      return  next(errorHandler(404, "Helper not found"))
    }
    res.status(200).json({ message: "Helper updated successfully", helper });
  } catch (error) {
    if ((error as any).code === 11000) {
      const duplicateField = Object.keys((error as any).keyValue)[0];
      const errorMessage = `${duplicateField} already exists`;
      return res.status(409).json({ message: errorMessage });
    }
    next(error);
  }
};
const deleteHelper = async (req: Request, res: Response, next: Function) => {
  try {
    const helper = await Helper.findByIdAndDelete(req.params.id);
    if (!helper) {
      return next(errorHandler(404, "Helper not found"));
    }
    res.status(200).json({ message: "Helper deleted successfully", helper });
  } catch (error) {
    next(error);
  }
};

export { createHelper, getHelpers, getHelper, updateHelper, deleteHelper };
