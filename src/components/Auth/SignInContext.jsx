import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const SignInContext = createContext();

const SignInContextProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [nextStep, setNextStep] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const switchNextStep = (nextStep) => {
    if (!nextStep) throw new Error("Next Step Undefined");
    setStatus("inprogress");
    setNextStep(nextStep);
    console.log(nextStep.signInStep);
    switch (nextStep.signInStep) {
      case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED": {
        console.log("redirect to confirm password");
        navigate("/auth/confirm-password");
        break;
      }
      case "CONFIRM_SIGN_IN_WITH_TOTP_CODE": {
        console.log("redirect to mfa setup page");
        navigate("/auth/mfa");
        break;
      }
      case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP": {
        console.log("redirect to mfa setup page");
        navigate("/auth/mfa-setup");
        break;
      }
      case "DONE": {
        console.log("Login Successful");
        setUser({ isLoggedIn: true });
        break;
      }
    }
  };

  const value = {
    status,
    setStatus,
    nextStep,
    setNextStep,
    switchNextStep,
  };
  return (
    <SignInContext.Provider value={value}>{children}</SignInContext.Provider>
  );
};

export const useSignInContext = () => {
  return useContext(SignInContext);
};

export default SignInContextProvider;
