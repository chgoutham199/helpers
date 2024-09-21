import mongoose, { Schema } from "mongoose";

const helperSchema :Schema= new mongoose.Schema(
  { 
    photo:{
        type: String,
        required: true,
    },
    employeeCode: {
      type: Number,
    },
    name: {
      type: String,
      required: true,
    },
    phone:{
        type: Number,
        unique: true,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum:["Male",'Female','Others'],
        index: true,
    },
    type:{
        type: String,
        required: true,
        index: true,
    },
    organization:{
        type: String,
        required: true,
        index: true,

    },
    vehicleType:{
        type: String,
        default:"None",
        index: true,
    },
    vehicleNumber:{
        type: String,
        default:"-"

    },
    document:{
        type: String,
        required: true,
    
    },
    documentName:{
           type: String,
           required: true,
    },
    documentSize:{
        type: String,
        required: true, 
    }
},
  { timestamps: true }
);
helperSchema.pre("save", async function (next) {
  const helper = this;
  if (helper.isNew) {
    const count = await Helper.countDocuments();
    let employeeCode = count + 1001;
    while (await Helper.exists({ employeeCode })) {
      employeeCode++;
    }

    helper.employeeCode = employeeCode;
  }
  next();
});
const Helper = mongoose.model("Helper", helperSchema);
export default Helper;
