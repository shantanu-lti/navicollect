import React, { useEffect, useState } from "react";
import { useSignInContext } from "./SignInContext";
import { Navigate } from "react-router-dom";
import { confirmSignIn } from "aws-amplify/auth";
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import axios from "axios";
const Mfa = () => {
  const { switchNextStep, nextStep, status, setNextStep, setStatus } =
    useSignInContext();
  if (
    status !== "inprogress" ||
    !nextStep ||
    !nextStep.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP" ||
    !nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
  )
    return <Navigate to="/auth/signin" />;

  const [mfaUrl, setMfaUrl] = useState("");
  const [TOTP, setTOTP] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState();
  const [errMessage, setErrMessage] = useState();
  const { setUser } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (TOTP.length < 6) return setErrMessage("Enter your 6 digit MFA Code");
    setIsReadOnly(true);
    try {
      const { isSignedIn, nextStep } = await confirmSignIn({
        challengeResponse: TOTP,
      });

      if (isSignedIn && nextStep.signInStep === "DONE") {
        console.log("login successful");
        const { idToken, accessToken } =
          (await fetchAuthSession()).tokens ?? {};
        const { username, userId, signInDetails } = await getCurrentUser();
        axios.defaults.headers.common["Authorization"] = "Bearer " + idToken;
        axios.defaults.headers.common["Access-token"] = accessToken;
        toast.success("Login Successful");
        setUser({ isLoggedIn: true, username, userId, signInDetails });
      } else {
        toast.error(
          "Could not process you login request. Please try again later"
        );
      }
      setIsReadOnly(false);
    } catch (err) {
      console.log(err);
      setIsReadOnly(false);

      if (err.message.includes("expired")) {
        toast.warn("Login Session Expired");
        setNextStep(null);
        setStatus(null);
        return;
      }
      if (err.name === "SignInException") {
        toast.error(
          "Could not process you login request. Please try again later"
        );
        setNextStep(null);
        setStatus(null);
        return;
      }
      setErrMessage(err.message);
    }
  };
  return (
    <>
      {nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE" && (
        <>
          <h2 className="text-2xl font-bold 2xl:text-3xl">
            Multi-factor Authentication
          </h2>
          <p className="text-sm text-slate-600">
            Enter an MFA code to complete sign-in
          </p>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isReadOnly}>
          <input
            type="number"
            value={TOTP ? TOTP : ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length > 6) {
                return setTOTP(value.substring(0, 6));
              }
              setTOTP(value);
            }}
            required
            placeholder="Enter MFA Code"
            className="block mt-2 w-full p-3 border  border-slate-300 rounded-md outline-slate-300"
            autoFocus
          />
          <p className="text-red-400 mt-4 text-sm font-medium">{errMessage}</p>
          <button
            type="submit"
            className="block mt-2 w-full p-3 bg-slate-800 border border-slate-800 text-white font-bold rounded-md"
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

export default Mfa;
