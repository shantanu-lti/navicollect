import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import PageHeader from "./PageHeader";
import SAPConnectModal from "./FollowUp/SAPConnectModal";
import { useModalContext } from "../context/modal";

const Home = () => {
  const { user } = useAuth();
  const { showSapConnectModal, setShowSapConnectModal } = useModalContext();
  if (!user.isLoggedIn) return <Navigate to="/auth/signin" />;

  return (
    <div className="w-full h-full bg-slate-100 overflow-auto">
      {showSapConnectModal && (
        <SAPConnectModal setShowSapConnectModal={setShowSapConnectModal} />
      )}
      <div className="flex flex-col p-4 lg:px-8 container mx-auto h-full">
        <PageHeader />
        <div className="mt-4 flex-grow pb-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
