import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
const useApi = () => {
  const { setUser } = useAuth();
  const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
      const url = import.meta.env.VITE_BACKEND_BASE_URL + "/auth/login";
      const data = {
        username: username,
        password: password,
      };
      axios
        .post(url, data)
        .then((response) => {
          console.log("login successful");
          const { token, user } = response.data;
          setUser({ ...user, isLoggedIn: true });
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("username", user.username);
          sessionStorage.setItem("fullName", user.name);
          toast.success("Login Successful");
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          delete axios.defaults.headers.common["Authorization"];
          sessionStorage.clear();
          reject(err.response);
        });
    });
  };

  const logoutUser = () => {
    console.log("logging user out");
    setUser({ isLoggedIn: false });
    sessionStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    toast.warn("Logout Successful");
  };

  return { loginUser, logoutUser };
};

export default useApi;
