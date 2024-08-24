import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message} = req.body; // Extracting receiverId from request body
        const {id:receiverId }=req.params;
        const senderId = req.user._id;
        
        // Find conversation between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create and save the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(),newMessage.save()]);

       

        // Respond with the new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages")
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessages Controller :",error.message);
        res.status(500).json({error:"Internal server error "});
        
    }
}
