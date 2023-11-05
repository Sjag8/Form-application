const mongoose = require("mongoose");
const { Schema } = mongoose;

const WorkshopSchema = new Schema({
  Name: { type: String },
  Department: { type: String },
  Email_ID: { type: String },
  Mobile_Number: { type: Number}
});

const WorkShopUser = mongoose.model("WorkshopUsers", WorkshopSchema);
exports.WorkShopUser = WorkShopUser;
