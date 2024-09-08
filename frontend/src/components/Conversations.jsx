import useGetConversation from "../../hooks/useGetConversation.js"
import { getRandomEmoji } from "../utils/emojis";
import { Conversation } from "./conversation"
export const Conversations = () => {
  const {loading,conversations}=useGetConversation();
  
  return (
    <div className="py-2 flex flex-col overflow-auto">
        {conversations.map((conversation,idx)=>(
          <Conversation key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx===conversations.length-1}
          />

        ))}
    </div>

  )
}