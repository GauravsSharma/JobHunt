import express from "express"
import {register,login,updateProfile, logout, loadUser, getUserById, getUsernameAndProfilePhoto} from "../contoller/User.js"
import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/update-profile").put(isAuthenticated,singleUpload,updateProfile)
router.route("/logout").get(isAuthenticated,logout)
router.route("/getuser").get(isAuthenticated,loadUser)
router.route("/getUserById/:id").get(isAuthenticated,getUserById)
router.route("/get/userinfo/:id").get(isAuthenticated,getUsernameAndProfilePhoto)

export default router;

