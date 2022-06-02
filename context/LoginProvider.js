import React, { createContext, useContext, useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isFinishSplash, setisFinishSplash] = useState(false);
  const [Email_, setEmail_] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [ingresos, setIngresos] = useState(false);
  const [umbral_, setUmbral_] = useState(false);
  const [profile, setProfile] = useState({});

  return (
    <LoginContext.Provider
      value={{
        isFinishSplash,
        setisFinishSplash,
        profile,
        setProfile,
        Email_,
        setEmail_,
        isLogIn,
        setIsLogIn,
        ingresos,
        setIngresos,
        umbral_,
        setUmbral_,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
