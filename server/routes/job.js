import { createJob, getInternships, getJobById, getJobs, getJobsPostedByAdmin, getLatestJobs, getUniqueJobTitlesAndLocations } from "../contoller/Job.js";
import { isAuthenticated } from "../middleware/auth.js";
import express from "express"

const router = express.Router();

router.route("/createJob").post(isAuthenticated,createJob)
router.route("/getJobs").get(getJobs)
router.route("/getInternships").get(getInternships)
router.route("/getJobById/:id").get(getJobById)
router.route("/getLatestJobs").get(getLatestJobs)
router.route("/getJobsPostedByAdmin").get(isAuthenticated,getJobsPostedByAdmin)
router.route("/get/titleAndLocaton").get(isAuthenticated,getUniqueJobTitlesAndLocations)

export default router;
