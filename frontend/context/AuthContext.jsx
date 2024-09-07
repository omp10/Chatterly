import { createContext, useContext, useState } from "react";

// Create context with a default value
const AuthContext = createContext({
    authUser: null,
    setAuthUser: () => {}
});

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => JSON.parse(localStorage.getItem("chat-user")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
