import { createContext, useState } from "react";
// provider
export const ResourceContext = createContext();
export const ResourceProvider = () => {
  const [showRes, setShowRes] = useState(false);
  return <ResourceContext value={{ showRes, setShowRes }}></ResourceContext>;
};
