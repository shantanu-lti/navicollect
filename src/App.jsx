import { Tooltip } from "react-tooltip";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import ChatBot from "./components/ChatBot";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import ModalContextProvider from "./context/modal";
function App() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen w-full">
      <Tooltip id="my-tooltip" className="z-10" />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header />
      <div className="flex w-full h-screen overflow-hidden">
        {user?.isLoggedIn && <Sidebar />}
        <ModalContextProvider>
          <Outlet />
        </ModalContextProvider>
        {user?.isLoggedIn && <ChatBot />}
      </div>
    </div>
  );
}

export default App;
