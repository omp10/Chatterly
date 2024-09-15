import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from "../socket/socket.js"; // Ensure io is imported

export const sendMessage = async (req, res) => {
    try {
        // Extract message and receiverId from the request
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Validate input
        if (!message || !receiverId) {
            return res.status(400).json({ error: "Message and receiverId are required" });
        }

        // Find or create a conversation
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
        conversation.messages.push(newMessage._id);

        // Save both the conversation and the message
        await Promise.all([conversation.save(), newMessage.save()]);

        // Get the receiver's socket ID and emit the new message
        const receiverSocketId = getRecieverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        // Extract userToChatId from request params and get the sender's ID
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation and populate messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

        // Respond with the messages
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error in getMessage:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
