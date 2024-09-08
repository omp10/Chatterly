import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  
  
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={authUser?<HomePage />:<Navigate to={"/login"}/>} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUpPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
