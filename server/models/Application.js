import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questionAnswer: [
        {
            question: { type: String },
            answer: { type: String },
        }
    ],
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
}, { timestamps: true })

export const ApplicationModel = mongoose.model("Application", applicationSchema)