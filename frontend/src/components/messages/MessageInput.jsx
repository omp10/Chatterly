import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessages from "../../../hooks/useSendMessages";

const MessageInput = () => {
  const [message, setMessage] = useState("");  // Correctly initialize useState with an empty string
  const { loading, sendMessage } = useSendMessages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");  // Clear the input field after sending the message
  };

  return (
    <form className="px-4 my-3 relative" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          value={message}  // Bind the input value to the message state
          onChange={(e) => setMessage(e.target.value)}  // Update the message state on input change
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a Message"
        />
        <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
