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
  const validateToken = async () => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("username")) {
      const user = {
        username: sessionStorage.getItem("username"),
        name: sessionStorage.getItem("fullName"),
      };
      setUser({ ...user, isLoggedIn: true });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("token");
      const url = import.meta.env.VITE_BACKEND_BASE_URL + "/auth/validate";

      try {
        const response = await axios.post(url);
        console.log(response);
        if (response.data.status === true) {
          toast.success("Login Successful");
        } else {
          setUser({ isLoggedIn: false });
          sessionStorage.clear();
          delete axios.defaults.headers.common["Authorization"];
          toast.warn("Session Expired");
        }
      } catch (err) {
        setUser({ isLoggedIn: false });
        sessionStorage.clear();
        delete axios.defaults.headers.common["Authorization"];
        toast.warn("Session Expired");
      }
    }
  };

  useEffect(() => {
    validateToken();
  }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
