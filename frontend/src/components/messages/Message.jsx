import { useAuthContext } from "../../../context/AuthContext";
import useConversation from "../../zustand/UseConversation";
import { timeformat } from "../../utils/timeFormat.js";

export const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic || "/path/to/default/profilePic.png";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-green-500";
  const formattedTime = timeformat(message.createdAt);
  const shake=message.shouldShake?"shake":"";


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt={`${fromMe ? 'Your' : 'User'} profile picture`}
            src={profilePic}
          />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shake} pb-2 text-white`}>
        {message.message}
        <div className="chat-footer opacity-50 text-xs mt-1 flex gap-1 items-center">
          {formattedTime}
        </div>
      </div>
    </div>
  );
};
