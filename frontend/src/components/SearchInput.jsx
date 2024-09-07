import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import useConversation from "../zustand/UseConversation";
import useGetConversation from "../../hooks/useGetConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { conversations} = useGetConversation();
  const {setSelectedConversation}=useConversation()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    
    if (search.length < 3) {
      toast.error('Search must be at least 3 characters long');
      return;
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error("Can't find the user :)");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <FaSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
