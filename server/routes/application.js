import express from "express"
import { applyJob, getApplicants, getApplicationById, getAppliedJobs, updateJobStatus } from "../contoller/Application.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();
router.route("/apply/:id").post(isAuthenticated,applyJob)
router.route("/get-applied-job").get(isAuthenticated,getAppliedJobs)
router.route("/get-applicants/:id").get(isAuthenticated,getApplicants)
router.route("/get-applicationById/:id").get(isAuthenticated,getApplicationById)
router.route("/update-status/:id").post(isAuthenticated,updateJobStatus)

export default router;



