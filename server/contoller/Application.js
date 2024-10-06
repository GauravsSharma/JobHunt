import { ApplicationModel } from "../models/Application.js";
import { JobModel } from "../models/Job.js";

export const applyJob = async (req, res) => {
    try {
        const { id: jobId } = req.params;
        const {questionAnswer} = req.body;
        console.log(req.body);
        
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job Id is required"
            })
        }
        const job = await JobModel.findById(jobId)
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found to apply"
            })
        }
        if(job.questions.length>0 &&!questionAnswer){
            return res.status(400).json({
                success: false,
                message: "Answers are neccessory !!"
            })
        }
        const existingApplication = await ApplicationModel.findOne({
            job: jobId,
            applicants: req.userId
        })
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "Already applied !"
            })
        }
        const application = await ApplicationModel.create({
            applicants: req.userId,
            job: jobId,
            status: "pending"
        })
        if(questionAnswer){
            application.questionAnswer = questionAnswer;
        }
        await application.save()
        job.applications.push(application);
        await job.save();
        return res.status(200).json({
            success: true,
            message: "Successfull applied",
            application
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getAppliedJobs = async (req, res) => {
    try {
        const applications = await ApplicationModel.find({ applicants: req.userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!applications) {
            return res.status(404).json({
                success: false,
                message: "No application found",
            })
        }
        return res.status(200).json({
            success: true,
            applications
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const applications = await ApplicationModel.find({job:jobId}).sort({ createdAt: -1 }).populate("applicants")

        if (!applications||applications.length===0) {
            return res.status(404).json({
                success: false,
                message: "No applications found",
            })
        }
        return res.status(200).json({
            success: true,
            applications
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getApplicationById = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const application = await ApplicationModel.findById(applicationId).sort({ createdAt: -1 }).populate("applicants")

        if (!application||application.length===0) {
            return res.status(404).json({
                success: false,
                message: "No applications found",
            })
        }
        return res.status(200).json({
            success: true,
            application
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const updateJobStatus = async (req, res) => {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            })
        }
        const application = await ApplicationModel.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "No application found"
            })
        }
        application.status = status;
        await application.save()
        return res.status(200).json({
            success: true,
            message: "Status updated"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}