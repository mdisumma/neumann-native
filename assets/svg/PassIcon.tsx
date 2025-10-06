import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const PassIcon: React.FC<React.ComponentProps<typeof Svg>> = (props) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 32 32" fill="none" {...props}>
      <Rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="15.5"
        fill="#F4F8FC"
        stroke="#6B7C93"
      />
      <Path
        d="M24 11L13 22L8 17"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default PassIcon;
