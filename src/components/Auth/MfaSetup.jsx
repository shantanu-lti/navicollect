import React, { useEffect, useState } from "react";
import { useSignInContext } from "./SignInContext";
import { Navigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Mfa from "./Mfa";

const MfaSetup = () => {
  const { nextStep, status } = useSignInContext();
  if (
    status !== "inprogress" ||
    !nextStep ||
    !nextStep.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP"
  )
    return <Navigate to="/auth/signin" />;

  const [mfaUrl, setMfaUrl] = useState("");

  useEffect(() => {
    // generate QR code
    generateQRCode();
  }, []);

  const generateQRCode = () => {
    const totpSetupDetails = nextStep.totpSetupDetails;
    const appName = "LTIM_GEN_AI_APPS";
    const setupUri = totpSetupDetails.getSetupUri(appName);
    console.log(setupUri);
    setMfaUrl(setupUri.href);
  };

  return (
    <>
      <h2 className="text-2xl font-bold 2xl:text-3xl">MFA Setup</h2>
      <QRCode value={mfaUrl} />
      <p className="text-sm text-slate-600">
        Scan the QR Code from any authenticator app
      </p>
      <Mfa />
    </>
  );
};

export default MfaSetup;
