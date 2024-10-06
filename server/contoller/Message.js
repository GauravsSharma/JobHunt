import { ConversationModel } from "../models/Conversation.js";
import { MessageModel } from "../models/Message.js";
import { getRecieverId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const receiverId = req.params.id;
        const { message } = req.body;
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
            })
        }
        let new_message = await MessageModel.create({
            senderId,
            receiverId,
            message
        })

        if (new_message) {
            conversation.messages.push(new_message)
        }
        await conversation.save();
        const recieverSocketId = getRecieverId(receiverId);

        if (recieverSocketId) {
            io.to(recieverSocketId).emit("new_message", new_message)
        }

        return res.status(200).json({
            success: true,
            message: new_message
        }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }
        )
    }
}
export const recieveMessage = async (req, res) => {
    try {
        const senderId = req.userId;
        const recieverId = req.params.id;
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, recieverId] }
        }).populate("messages")
        if (!conversation) {
            return res.status(404).json({
                success: true,
                message: "No messages found"
            }
            )
        }
        return res.status(200).json({
            success: true,
            messages: conversation.messages
        }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        }
        )
    }
}
export const getUserContact = async (req, res) => {
    try {
        const conversations = await ConversationModel.find({
            participants: { $in: [req.userId] }
        }).populate("messages").populate("participants");

        // Check if there are no conversations found
        if (conversations.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No messages found"
            });
        }

        // Extract profiles from conversations
        const profilesInWhichUserIncludes = conversations.map((con) => {
            return con.participants[0]._id.toString() === req.userId.toString() 
                ? con.participants[1] 
                : con.participants[0];
        });

        // Fetch last messages for each profile
        const lastMessages = await Promise.all(profilesInWhichUserIncludes.map(async (profile) => {
            const conversation = await ConversationModel.findOne({
                participants: { $all: [req.userId, profile._id] }
            }).populate("messages");

            // Check if the conversation exists and has messages
            if (conversation && conversation.messages.length > 0) {
                return conversation.messages[conversation.messages.length - 1];
            }
            return null; // Return null if no messages
        }));

        // Combine profiles with their last messages
        const profiles = profilesInWhichUserIncludes.map((profile, i) => ({
            profile,
            lastMessage: lastMessages[i] // Use lastMessages[i] instead of lastMessages
        }));

        // console.log(profiles);
        return res.status(200).json({
            success: true,
            profiles
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

