import React, { createContext, ReactNode, useContext, useState } from "react";

// TypeScript Context for Inspection Data

// Define the structure of inspection items
export type InspectionItem = {
  execution_order: string | number;
  name: string;
  description?: string;
  measure?: string;
  lower_limits?: number;
  upper_limits?: number;
  user_response?: "yes" | "no" | null;
  [key: string]: any; // Allow additional properties from API
};

// Define the structure of test sections
export interface TestSection {
  items?: InspectionItem[];
  display_order?: number;
}

// Define the structure of technical data
export interface TechnicalData {
  model_number?: string;
  voltage?: string;
  serial_number?: string;
  [key: string]: any; // Allow additional technical properties
}

// Define the structure of appliance classification
export interface ApplianceClassification {
  protection_class?: string;
  [key: string]: any; // Allow additional classification properties
}

// Define the structure of all tests
export interface Tests {
  visual_inspection?: TestSection;
  electrical_inspection?: TestSection;
  functional_inspection?: TestSection;
  [key: string]: any; // Allow additional test types
}

// Define the complete inspection data structure
export interface InspectionData {
  session_id?: string;
  device?: string;
  appliance_classification?: ApplianceClassification;
  technical_data?: TechnicalData;
  tests?: Tests;
  error?: string;
  timestamp?: string;
  [key: string]: any; // Allow additional properties from API responses
}

// Define the context interface
export interface InspectionContextType {
  inspectionData: InspectionData;
  setInspectionData: (
    data: InspectionData | ((prevData: InspectionData) => InspectionData)
  ) => void;
  clearInspectionData: () => void;
}

// Create the context with proper typing
export const InspectionContext = createContext<
  InspectionContextType | undefined
>(undefined);

// Provider props interface
interface InspectionProviderProps {
  children: ReactNode;
}

// Create the provider component
export const InspectionProvider: React.FC<InspectionProviderProps> = ({
  children,
}) => {
  const [inspectionData, setInspectionData] = useState<InspectionData>({});

  const clearInspectionData = () => {
    setInspectionData({});
  };

  return (
    <InspectionContext.Provider
      value={{
        inspectionData,
        setInspectionData,
        clearInspectionData,
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};

// Custom hook for easier usage with error handling
export const useInspectionContext = (): InspectionContextType => {
  const context = useContext(InspectionContext);
  if (context === undefined) {
    throw new Error(
      "useInspectionContext must be used within an InspectionProvider"
    );
  }
  return context;
};
