import React, { useState } from "react";
import { useSignInContext } from "./SignInContext";
import { Navigate } from "react-router-dom";
import { confirmSignIn } from "aws-amplify/auth";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
const ConfirmPassword = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [isReadOnly, setIsReadOnly] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const { status, nextStep, setNextStep, setStatus, switchNextStep } =
    useSignInContext();
  //   console.log(nextStep);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsReadOnly(true);
    setErrMessage("");
    console.log(fullName, email, newPass, confirmNewPass);
    try {
      if (
        fullName === "" ||
        email === "" ||
        newPass === "" ||
        confirmNewPass === ""
      )
        throw new Error("None of the fields can be blank");
      if (newPass !== confirmNewPass) throw new Error("Passwords do not match");

      if (fullName.split(" ").length <= 1)
        throw new Error("Please enter your full name");

      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: newPass,
        options: { userAttributes: { name: fullName, email } },
      });
      setIsReadOnly(false);
      if (nextStep) {
        switchNextStep(nextStep);
      }
    } catch (err) {
      console.log(err);
      setIsReadOnly(false);
      if (err.message.includes("expired")) {
        toast.warn("Login session expired");
        setStatus(null);
        setNextStep(null);
      } else {
        setErrMessage(err.message);
      }
    }
  };

  if (
    status !== "inprogress" ||
    !nextStep ||
    !nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
  )
    return <Navigate to="/auth/signin" />;

  return (
    <>
      <h2 className="text-2xl font-bold 2xl:text-3xl">Set New Password</h2>
      {/* <div className="flex justify-start items-center gap-4">
          <img src={logo} className="block rounded-md h-12" />
        </div> */}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isReadOnly}>
          <input
            type="text"
            placeholder="Full Name"
            className="block mt-2 w-full p-3 border  border-slate-300 rounded-md outline-slate-300"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email ID"
            className="block mt-4 w-full p-3 border  border-slate-300 rounded-md outline-slate-300"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="New Password"
            className="block mt-4 w-full p-3 border border-slate-300 rounded-md outline-slate-300"
            required
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="block mt-4 w-full p-3 border border-slate-300 rounded-md outline-slate-300"
            required
            value={confirmNewPass}
            onChange={(e) => {
              setConfirmNewPass(e.target.value);
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
              "Submit"
            )}
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default ConfirmPassword;
