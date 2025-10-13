import React, { createContext, useState } from "react";

// Minimal types
export type CapturedImage = {
  uri: string;
  base64?: string;
};

export type InspectionItem = {
  execution_order: string | number;
  name: string;
  user_response?: "yes" | "no" | null;
  description?: string;
  measure?: string;
  lower_limits?: string | number;
  upper_limits?: string | number;
};

export type AnalysisResult = {
  session_id?: string;
  device?: string;
  appliance_classification?: {
    protection_class?: string;
  };
  technical_data?: {
    model_number?: string;
    voltage?: string;
    serial_number?: string;
  };
  tests?: {
    visual_inspection?: {
      items?: InspectionItem[];
      display_order?: number;
    };
    electrical_inspection?: {
      items?: InspectionItem[];
      display_order?: number;
    };
    functional_inspection?: {
      items?: InspectionItem[];
      display_order?: number;
    };
  };
  [key: string]: unknown;
};

type ImageContextType = {
  capturedImage: CapturedImage | null;
  analysisResult: AnalysisResult | null;
  setCapturedImage: (image: CapturedImage | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  updateAnalysisResult: (updatedData: AnalysisResult) => void;
  clearImage: () => void;
  clearAll: () => void;
};

// Create context
export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

// Provider component
export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(
    null
  );
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const clearImage = () => setCapturedImage(null);
  const clearAll = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };
  const updateAnalysisResult = (updatedData: AnalysisResult) => {
    console.log(
      "📊 Current inspection data:",
      JSON.stringify(updatedData, null, 2)
    );
    setAnalysisResult(updatedData);
  };

  return (
    <ImageContext.Provider
      value={{
        capturedImage,
        analysisResult,
        setCapturedImage,
        setAnalysisResult,
        updateAnalysisResult,
        clearImage,
        clearAll,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Hook
export const useImageContext = () => {
  const context = React.useContext(ImageContext);
  if (!context)
    throw new Error("useImageContext must be used within an ImageProvider");
  return context;
};
