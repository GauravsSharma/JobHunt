import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
   name:{
     type:String,
     required:true,
     unique:true
   },
   description:{
     type:String,
   },
   website:{
     type:String,
   },
   location:{
     type:String,
   },
   logo: {
    public_id: String,
    url: String,
},
   userId:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User"
   },
},{timestamps:true})

export const CompanyModel = mongoose.model("Company",companySchema)