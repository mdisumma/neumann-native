import React, { createContext, useState } from "react";

// Create the context
export const InspectionContext = createContext();

// Create the provider component
export const InspectionProvider = ({ children }) => {
  // Start with an empty object
  const [inspectionData, setInspectionData] = useState({});

  return (
    <InspectionContext.Provider value={{ inspectionData, setInspectionData }}>
      {children}
    </InspectionContext.Provider>
  );
};
