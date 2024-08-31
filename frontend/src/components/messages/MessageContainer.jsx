import MessageInput from "./MessageInput";
import { Messages } from "./Messages";
import { TiMessages } from "react-icons/ti"; // Make sure to import TiMessages if it's being used

const MessageContainer = () => {
  const NoChatSelected = true;
  
  return (
    <div className='md:min-w-[450px] flex flex-col h-full'>
      {NoChatSelected ? (
        <NoChatSelectedComponent />
      ) : (
        <>
          {/* Header */}
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John Doe</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelectedComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className="px-4 text-center sm:text-lg md:text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome John Doe 👋</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
}

export default MessageContainer;
