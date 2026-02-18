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
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 6, 1);
        const skip = (page - 1) * limit;

        const { keyword, location, salary } = req.query;

        let keywordArray = keyword
            ? (keyword.includes(",") ? keyword.split(",") : [keyword])
            : [];

        let locationArray = location
            ? (location.includes(",") ? location.split(",") : [location])
            : [];

        const query = {
            jobType: "full time"
        };

        if (keywordArray.length > 0) {
            query.$text = {
                $search: keywordArray.join(" ")
            };
        }
        if (locationArray?.length) {
            query.$or = locationArray.map(loc => ({
                location: { $regex: loc, $options: "i" }
            }));
        }

        if (salary) {
            query.salary = { $gte: parseInt(salary) }
        }

        const [jobs, totalJobs] = await Promise.all([
            JobModel.find(query)
                .populate({
                    path: "company",
                    select: "name logo"
                })
                .select("name _id location title description createdAt jobType experience_level salary requirement")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),

            JobModel.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalJobs / limit);

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPages,
            totalJobs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export const getInternships = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 6, 1);
        const skip = (page - 1) * limit;

        const { keyword, location, salary } = req.query;

        let keywordArray = keyword
            ? (keyword.includes(",") ? keyword.split(",") : [keyword])
            : [];

        let locationArray = location
            ? (location.includes(",") ? location.split(",") : [location])
            : [];

        const query = {
            jobType: "internship"
        };

        if (keywordArray.length > 0) {
            query.$text = {
                $search: keywordArray.join(" ")
            };
        }
        if (locationArray?.length) {
            query.$or = locationArray.map(loc => ({
                location: { $regex: loc, $options: "i" }
            }));
        }

        if (salary) {
            query.salary = { $gte: parseInt(salary) }
        }

        const [jobs, totalJobs] = await Promise.all([
            JobModel.find(query)
                .populate({
                    path: "company",
                    select: "name logo"
                })
                .select("name _id location title description createdAt jobType experience_level salary requirement")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            JobModel.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalJobs / limit);

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalPages,
            totalJobs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


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
        const selectFields =
            "name _id location title description createdAt jobType experience_level salary";

        const populateCompany = {
            path: "company",
            select: "name logo"
        };

        const internships = await JobModel.find({
            jobType: { $regex: "internship", $options: "i" }
        })
            .select(selectFields)
            .populate(populateCompany)
            .sort({ createdAt: -1 })
            .limit(3);

        const fullTimeJobs = await JobModel.find({
            jobType: { $regex: "full", $options: "i" }
        })
            .select(selectFields)
            .populate(populateCompany)
            .sort({ createdAt: -1 })
            .limit(3);

        const jobs = [...internships, ...fullTimeJobs];

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

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

export const getUniqueJobTitlesAndLocations = async (req, res) => {
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