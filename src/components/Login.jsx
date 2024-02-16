import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import useApi from "../utils/useApi";
import PulseLoader from "react-spinners/PulseLoader";
import logo from "../assets/NaviColouredIcon.png";
const Login = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);
  const { loginUser } = useApi();

  if (user?.isLoggedIn) return <Navigate to="/" />;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrMessage("");
    setIsReadOnly(true);
    loginUser(username, password)
      .then((res) => {
        setIsReadOnly(false);
      })
      .catch((err) => {
        if (err?.status === 401) setErrMessage("Invalid username or password.");
        else {
          setErrMessage("Unable to login. Please try again later.");
        }
        setIsReadOnly(false);
      });
  };

  return (
    <main className="w-full h-full bg-image-ai flex items-center">
      <div className="w-[90%] h-auto md:w-[50%] lg:w-[45%] xl:w-[35%] bg-white backdrop-blur-sm md:mr-0 md:h-full mx-auto md:ml-auto flex items-center">
        <div className="w-full mx-auto p-6 md:p-8 lg:p-12 2xl:p-16 rounded-sm flex flex-col gap-4 lg:gap-2">
          {/* <h2 className="text-2xl font-semibold 2xl:text-3xl text-center">
            Explore
          </h2> */}
          <div className="flex justify-start items-center gap-4">
            <img src={logo} className="block rounded-sm w-12" />
            <span className="text-2xl font-bold text-slate-800">
              {" "}
              Navicollect.AI
            </span>
          </div>
          <form onSubmit={handleLogin}>
            <fieldset disabled={isReadOnly}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="block mt-2 w-full p-3 border  border-gray-300 rounded-sm outline-gray-300"
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <input
                type="password"
                id="password"
                placeholder="Password"
                className="block mt-4 w-full p-3 border border-gray-300 rounded-sm outline-gray-300"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <p className="text-red-400 mt-4 text-sm font-medium">
                {errMessage}
              </p>
              <button
                type="submit"
                className="block mt-4 w-full p-3 bg-slate-800 border border-slate-800 text-white font-bold rounded-sm"
              >
                {isReadOnly ? (
                  <PulseLoader color="#fff" size={10} speedMultiplier={0.5} />
                ) : (
                  "Login"
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
