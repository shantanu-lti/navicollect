import React, { useEffect, useState } from "react";

const useIdleTimer = () => {
  const [idle, setIdle] = useState(false);
  let timeoutId;
  const resetTimeout = () => {
    // console.log("reset timeout called");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIdle(false);
  };
  const updateTimeout = () => {
    console.log("update timeout called");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = timeOutFunction();
    setIdle(false);
  };
  useEffect(() => {
    window.addEventListener("click", updateTimeout);
    window.addEventListener("mousemove", updateTimeout);
    window.addEventListener("keydown", updateTimeout);
    window.addEventListener("scroll", updateTimeout);
    timeoutId = timeOutFunction();
    return () => {
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);
    };
  }, []);
  const timeOutFunction = () => {
    return setTimeout(() => {
      console.log("setTimeout called");
      setIdle(true);
    }, 10 * 60 * 1000);
  };

  return { idle };
};

export default useIdleTimer;
