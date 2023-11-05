const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSlip = new Schema(
  {
  
  Department: { type: String },
  Job_Origination_Date: { type: Date },
  Job_Required_Date: { type: Date },
  Material: { type: String },
  Quantity: { type: Number },
  Job_Description: { type: String },
  Add_Job_Drawing_Picture: { type: String }

});

const Jobslip = mongoose.model("JobSlip", JobSlip);
exports.Jobslip = Jobslip;
