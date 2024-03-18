import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { signIn } from "aws-amplify/auth";
import logo from "../../assets/NaviColouredIcon.png";
import { useSignInContext } from "./SignInContext";
const SignIn = () => {
  const [errMessage, setErrMessage] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { switchNextStep } = useSignInContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMessage("");
    setIsReadOnly(true);
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      console.log(isSignedIn, nextStep);
      setIsReadOnly(false);
      if (nextStep) {
        switchNextStep(nextStep);
      }
    } catch (error) {
      console.log(error);
      setIsReadOnly(false);
      setErrMessage(error.message);
    }
  };
  return (
    <>
      <div className="flex justify-start items-center gap-4">
        <img src={logo} className="block rounded-md h-12" />
        <h2 className="text-2xl font-bold 2xl:text-3xl">Navicollect.ai</h2>
      </div>
      <form onSubmit={handleLogin}>
        <fieldset disabled={isReadOnly}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="block mt-2 w-full p-3 border  border-slate-300 rounded-md outline-slate-300"
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
            className="block mt-4 w-full p-3 border border-slate-300 rounded-md outline-slate-300"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <p className="text-red-400 mt-4 text-sm font-medium">{errMessage}</p>
          <button
            type="submit"
            className="block mt-4 w-full p-3 bg-slate-800 border border-slate-800 text-white font-bold rounded-md"
          >
            {isReadOnly ? (
              <PulseLoader color="#fff" size={10} speedMultiplier={0.5} />
            ) : (
              "Login"
            )}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default SignIn;
