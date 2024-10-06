import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../contoller/Company.js";
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();
router.route("/register-company").post(isAuthenticated,registerCompany)
router.route("/getcompany").get(isAuthenticated,getCompany)
router.route("/getcompany-by-id/:id").get(isAuthenticated,getCompanyById)
router.route("/updatecompany/:id").put(isAuthenticated,singleUpload,updateCompany)

export default router;