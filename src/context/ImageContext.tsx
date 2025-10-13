import React, { createContext, useState } from "react";

// Minimal types
export type CapturedImage = {
  uri: string;
  base64?: string;
};

export type InspectionItem = {
  execution_order: any;
  name: string;
  user_response?: "yes" | "no" | null;
  [key: string]: any;
};

export type AnalysisResult = {
  [key: string]: any; // Generic object for API responses
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
