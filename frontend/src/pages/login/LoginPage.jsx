
function loginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Login
            <span className="text-blue-500"> Chatterly</span>
          </h1>
          <form>
            <div>
              <label className="label p-2">
                <span className="text-base text-white/95 label-text">Username</span>
              </label>
              <input type="text" placeholder="Enter your username" className="w-full bg-inherit input input-bordered h-10"/>
            </div>
            <div>
              <label className="label p-2">
                <span className="text-base text-white/95 label-text">Password</span>
              </label>
              <input type="text" placeholder="Enter your password" className="w-full bg-inherit input input-bordered h-10"/>
            </div>
            <a href="#" className="text-sm hover:underline text-white/95 hover:text-blue-600 mt-2 inline-block">
              Dont have an account?
            </a>
            <div>
              <button className="btn bg-inherit btn-block btn-sm mt-2">Login</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default loginPage