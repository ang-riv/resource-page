import { createContext, useState } from "react";
// provider
export const ResourceContext = createContext();
export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  // main cats
  const [selectedMain, setSelectedMain] = useState("");

  // sub cats
  const [showSubs, setShowSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");

  // individual resources
  const [openRes, setOpenRes] = useState("");
  const [showRes, setShowRes] = useState(false);
  return (
    <ResourceContext.Provider
      value={{
        selectedMain,
        setSelectedMain,
        showRes,
        setShowRes,
        showSubs,
        setShowSubs,
        selectedSub,
        setSelectedSub,
        openRes,
        setOpenRes,
        resources,
        setResources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
