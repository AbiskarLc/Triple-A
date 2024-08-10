import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const Contexts = ({ children }) => {



  return (
    <userContext.Provider value={{}}>
      {children}
    </userContext.Provider>
  );
};
