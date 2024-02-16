import { createContext, useContext, useState } from "react";
const ModalContext = createContext();

export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalContextProvider = ({ children }) => {
  const [showSapConnectModal, setShowSapConnectModal] = useState(false);

  const value = {
    showSapConnectModal,
    setShowSapConnectModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
