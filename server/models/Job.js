import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    experience_level:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    requirement: [{
        type: String,
        required: true
    }],
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application",
        }
    ],
    questions:[{type:String}]
}, { timestamps: true })

export const JobModel = mongoose.model("Job", jobSchema)