import express from "express"

import { isAuthenticated } from "../middleware/auth.js";
import { singleUpload } from "../middleware/multer.js";
import { getUserContact, recieveMessage, sendMessage } from "../contoller/Message.js";
const router = express.Router();

router.route("/send/:id").post(isAuthenticated,sendMessage)
router.route("/recieve/:id").get(isAuthenticated,recieveMessage)
router.route("/get/contact").get(isAuthenticated,getUserContact)

export default router;

