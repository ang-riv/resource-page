import { createContext, useState } from "react";
// provider
export const ResourceContext = createContext();
export const ResourceProvider = ({ children }) => {
  const [tester, setTester] = useState("Working");
  const [selectedMain, setSelectedMain] = useState("");
  const [showRes, setShowRes] = useState(false);
  const [showSubs, setShowSubs] = useState([]);
  const [selectedSub, setSelectedSub] = useState("");
  const [openRes, setOpenRes] = useState("");
  return (
    <ResourceContext.Provider
      value={{
        tester,
        setTester,
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
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
