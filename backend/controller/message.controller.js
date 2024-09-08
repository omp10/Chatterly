import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // Ensure io is imported

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // Extract message from the request body
        const { id: receiverId } = req.params; // Extract receiverId from request params
        const senderId = req.user._id; // Get the sender's userId from req.user

        // Find or create a conversation between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Add the new message to the conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save both conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        // Get the receiver's socket ID
        const receiverSocketId = getRecieverSocketId(receiverId);

        // Emit the new message to the receiver's socket
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params; // Extract user ID to chat with from request params
        const senderId = req.user._id; // Get the sender's userId from req.user

        // Find the conversation between the sender and the other user, populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        // Respond with the messages
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error in getMessages Controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
