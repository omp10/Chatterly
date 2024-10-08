import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loading,login}=useLogin()

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(username,password)

  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-white">
          Login
          <span className="text-blue-500"> Chatterly</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base text-white/95 label-text">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full bg-white input input-bordered h-10"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base text-white/95 label-text">
                Password
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              className="w-full bg-white input input-bordered h-10"
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm hover:underline text-white/95 hover:text-blue-600 mt-2 inline-block"
          >
            Dont have an account?
          </Link>
          <div>
            <button className="btn bg-inherit btn-block btn-sm mt-2"
            disabled={loading}
            >
               {loading?<span className="loading loading-spinner"></span>:"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
