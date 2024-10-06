import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    role:{
      type:String,
      enum:["student","recruiter"],
      required:true
    },
    profile:{
        bio:{type:String},
        resume:{
            public_id: String,
            url: String,
        },
        skills:[{type:String}],
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:"Company"},
        profilePhoto: {
            public_id: String,
            url: String,
        },
        education:[
            {
                education_level:{type:String},
                education_name:{type:String},
                start_date:{type:Date},
                end_date:{type:Date,default:null},
            }
        ],
        projects:[
            {
                title:{type:String},
                description:{type:String},
                live_link:{type:String},
                github_link:{type:String},
            }
        ]
    }
},{timestamps:true})

export const UserModel = mongoose.model("User",userSchema)