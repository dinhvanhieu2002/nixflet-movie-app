import React from "react";
import { View, Text } from "native-base";
import Svg, { Circle } from "react-native-svg";

const CircularRate = ({ progress }) => {
  const size = 40; // The size of the circle
  const strokeWidth = 5; // The thickness of the progress bar
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressStrokeDasharray = `${circumference} ${circumference}`;
  const progressStrokeDashoffset =
    circumference - (progress / 10) * circumference;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          stroke="lightgreen"
          strokeWidth={strokeWidth}
          strokeDasharray={progressStrokeDasharray}
          strokeDashoffset={`${progressStrokeDashoffset}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
          fill="transparent"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          color: "white",
          fontWeight: 400,
        }}
      >
        {Math.floor(progress * 10) / 10}
      </Text>
    </View>
  );
};

export default CircularRate;
