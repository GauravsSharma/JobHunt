import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   senderId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", // Reference to the User model
     required: true
   },
   receiverId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User", 
     required: true
   },
   message: {
     type: String, 
     required: true
   }
}, { timestamps: true });

export const MessageModel = mongoose.model("Message", messageSchema);
