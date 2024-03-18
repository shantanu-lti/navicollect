import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
const AuthContext = createContext();
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from "react-toastify";
import { signOut } from "aws-amplify/auth";
import useIdleTimer from "../utils/useIdleTimer";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const [loading, setLoading] = useState(true);
  const { idle } = useIdleTimer();

  const logoutUser = async () => {
    console.log("logging user out");

    try {
      await signOut();
      setUser({ isLoggedIn: false });
      sessionStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      toast.warn("Logged Out");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const value = {
    user,
    setUser,
    logoutUser,
  };

  const validateToken = async () => {
    try {
      const { idToken, accessToken } =
        (await fetchAuthSession({ forceRefresh: true })).tokens ?? {};

      const currentUser = await getCurrentUser();
      const { username, userId, signInDetails } = currentUser;
      console.log(currentUser);
      console.log(idToken, accessToken);
      if (!idToken || !accessToken) throw new Error("User Session expired");
      axios.defaults.headers.common["Authorization"] = "Bearer " + idToken;
      axios.defaults.headers.common["Access-token"] = accessToken;
      toast.success("Login Successful");
      setUser({
        isLoggedIn: true,
        username,
        userId,
        signInDetails,
      });
    } catch (err) {
      console.log(err);
      sessionStorage.clear();
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.common["Access-token"];
      toast.warn("Session Expired");
      setUser({ isLoggedIn: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idle && user.isLoggedIn) {
      logoutUser();
    }
  }, [idle]);

  useEffect(() => {
    validateToken();
  }, []);

  if (!loading) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  } else {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <PulseLoader size={10} color="#1e1b4b" speedMultiplier={0.5} />
      </div>
    );
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
