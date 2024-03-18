import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "aws-amplify/auth";
const Auth = () => {
  const { user, setUser } = useAuth();
  async function currentAuthenticatedUser() {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setUser({ isLoggedIn: true, username, userId });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // currentAuthenticatedUser();
  }, []);

  if (user.isLoggedIn) return <Navigate to="/" />;

  return (
    <main className="w-screen h-[100svh] bg-image-ai flex items-center">
      <div className="w-[90%] h-auto md:w-[50%] lg:w-[45%] xl:w-[35%] bg-white backdrop-blur-sm md:mr-0 md:h-full mx-auto md:ml-auto flex items-center rounded-md">
        <div className="w-full mx-auto p-6 md:p-8 lg:p-12 2xl:p-16 rounded-md flex flex-col gap-4 lg:gap-2">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Auth;
