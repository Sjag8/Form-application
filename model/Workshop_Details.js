const mongoose = require("mongoose");
const { Schema } = mongoose;

const WorkShopDetails = new Schema({
     Actual_Date_of_String:{type:Date},
     Job_No:{type:Number},
     Quantity:{type:Number},
     Name_of_Workshop_Incharge:{type:String},
     Job_Organizer:{type:String},
     Material_Used:{type:String},
     Job_Completed_Date:{type:Date}
     

});

const WorkShopsDetails = mongoose.model("WorkShopDetails", WorkShopDetails);
exports.WorkShopsDetails = WorkShopsDetails;
