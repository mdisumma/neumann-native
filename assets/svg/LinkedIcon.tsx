import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const LinkedIcon: React.FC<React.ComponentProps<typeof Svg>> = (props) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 64 64" fill="none" {...props}>
      <Rect
        x="0.5"
        y="0.5"
        width="63"
        height="63"
        rx="31.5"
        fill="#F4F8FC"
        stroke="#6B7C93"
      />
      <Path
        d="M39.5 15.5L45.5 21.5M45.5 21.5L39.5 27.5M45.5 21.5H24.5C22.9087 21.5 21.3826 22.1321 20.2574 23.2574C19.1321 24.3826 18.5 25.9087 18.5 27.5V30.5M24.5 48.5L18.5 42.5M18.5 42.5L24.5 36.5M18.5 42.5H39.5C41.0913 42.5 42.6174 41.8679 43.7426 40.7426C44.8679 39.6174 45.5 38.0913 45.5 36.5V33.5"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LinkedIcon;
