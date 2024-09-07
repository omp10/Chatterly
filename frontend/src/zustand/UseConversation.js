import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  messages: [],  // Corrected the typo here, initialized as an empty array
  setMessages: (messages) => set({ messages }),  // Corrected to match the state name
}));

export default useConversation;
