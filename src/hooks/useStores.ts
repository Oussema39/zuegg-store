import { useContext } from "react";
import { StoresContext, StoresContextType } from "../contexts/StoresContext";

export const useStores = (): StoresContextType => {
  const context = useContext(StoresContext);
  if (context === undefined) {
    throw new Error("useStores must be used within a StoresProvider");
  }
  return context;
};
