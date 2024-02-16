import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false });
  const value = {
    user,
    setUser,
  };
  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("username")) {
      const user = {
        username: sessionStorage.getItem("username"),
        name: sessionStorage.getItem("fullName"),
      };
      setUser({ ...user, isLoggedIn: true });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");
      toast.success("Login Successful");
    }
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
