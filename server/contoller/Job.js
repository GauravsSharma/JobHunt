import { JobModel } from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            salary,
            company,
            requirement,
            location,
            jobType,
            position,
            experience_level,
            questions
        } = req.body;
        if (!title || !description || !salary || !company || !requirement || !location || !jobType || !position || !experience_level) {
            return res.status(400).json({
                success: false,
                message: "Something is missing"
            })
        }
        const job = await JobModel.create({
            title,
            description,
            salary,
            company,
            requirement: requirement.split(","),
            location,
            jobType,
            position,
            created_by: req.userId,
            experience_level,
            questions: questions.split(",")
        })
        await job.save();
        return res.status(201).json({
            success: true,
            message: "Job created"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getJobs = async (req, res) => {
    try {
        const keywords = req.query.keyword;
        const location = req.query.location;
        const salary = req.query.salary ? parseInt(req.query.salary) : null;
        let keywordArray = keywords ? (keywords.includes(",") ? keywords.split(",") : [keywords]) : [];
        let locationArray = location ? (location.includes(",") ? location.split(",") : [location]) : [];
        const query = {
            jobType: { $regex: "full", $options: "i" }
        };
        if (keywordArray?.length > 0 && keywordArray[0] !== "null") {
            console.log("keyword", keywordArray);
            query.$or = keywordArray.map(keyword => ({
                title: { $regex: keyword, $options: "i" }
            }));
        }
        if (locationArray?.length > 0 && locationArray[0] !== "null") {
            console.log("location");

            query.$or = locationArray.map(location => {
                const normalizedLocation = location.replace(/-/g, " ");
                return {
                    location: { $regex: normalizedLocation, $options: "i" }
                };
            });
        }
        if (salary) {
            console.log("enter in salry")
            query.salary = { $gte: salary };
        }
        const jobs = await JobModel.find(query).populate("company").populate("created_by").sort({ createdAt: -1 });
        if (!jobs || jobs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Jobs found"
            });
        }
        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getInternships = async (req, res) => {
    try {
        const keywords = req.query.keyword;
        const location = req.query.location;
        const salary = req.query.salary ? parseInt(req.query.salary) : null;
        console.log("salary", salary);
        let keywordArray = keywords ? (keywords.includes(",") ? keywords.split(",") : [keywords]) : [];
        let locationArray = location ? (location.includes(",") ? location.split(",") : [location]) : [];
        const query = {
            jobType: { $regex: "internship", $options: "i" }
        };
        if (keywordArray?.length > 0 && keywordArray[0] !== "null") {
            query.$or = keywordArray.map(keyword => ({
                description: { $regex: keyword, $options: "i" }
            }));
        }
        if (locationArray?.length > 0 && locationArray[0] !== "null") {
            console.log("location");

            query.$or = locationArray.map(location => {
                const normalizedLocation = location.replace(/-/g, " ");
                return {
                    location: { $regex: normalizedLocation, $options: "i" }
                };
            });
        }
        if (salary) {
            console.log("enter in salry")
            query.salary = { $gte: salary };
        }
        const jobs = await JobModel.find(query).populate("company").populate("created_by").sort({ createdAt: -1 });
        if (!jobs || jobs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Internships found"
            });
        }
        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await JobModel.findById(jobId).populate("company").populate("created_by").populate("applications");
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        return res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getLatestJobs = async (req, res) => {
    try {
        const internships = await JobModel.find({ jobType: { $regex: "internship", $options: "i" } },).limit(3).sort({ createdAt: -1 }).populate("company").populate("created_by").populate("applications");

        const fullTimsJobs = await JobModel.find({ jobType: { $regex: "full", $options: "i" } },).limit(3).sort({ createdAt: -1 }).populate("company").populate("created_by").populate("applications");
        const jobs = [...internships, ...fullTimsJobs]
        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getJobsPostedByAdmin = async (req, res) => {
    try {
        const jobs = await JobModel.find({ created_by: req.userId }).populate("company")
        if (!jobs) {
            return res.status(404).json({
                success: false,
                message: "Jobs not found"
            })
        }
        return res.status(200).json({
            success: true,
            jobs
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getUniqueJobTitlesAndLocations = async (req,res) => {
    try {
        const uniqueJobTitles = await JobModel.distinct('title');
        const uniqueLocations = await JobModel.distinct('location');

        return res.status(200).json({
            success: true,
            jobTitles: uniqueJobTitles,
            locations: uniqueLocations
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};