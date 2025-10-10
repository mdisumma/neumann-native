import React, { createContext, useState } from "react";

// Define the image data structure
export interface CapturedImage {
  // id: string;
  uri: string;
  base64?: string;
  timestamp: string;
}

// Define the analysis result structure
export interface AnalysisResult {
  [key: string]: any; // Flexible for API response
}

// Define the context interface
export interface ImageContextType {
  capturedImage: CapturedImage | null;
  analysisResult: AnalysisResult | null;
  setCapturedImage: (image: CapturedImage | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  clearImage: () => void;
  clearAll: () => void;
}

// Create the context
export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

// Create the provider component
export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [capturedImage, setCapturedImage] = useState<CapturedImage | null>(
    null
  );
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );

  const clearImage = () => {
    setCapturedImage(null);
  };

  const clearAll = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  return (
    <ImageContext.Provider
      value={{
        capturedImage,
        analysisResult,
        setCapturedImage,
        setAnalysisResult,
        clearImage,
        clearAll,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook for easier usage
export const useImageContext = () => {
  const context = React.useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImageContext must be used within an ImageProvider");
  }
  return context;
};
