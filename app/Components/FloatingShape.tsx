import React from "react";

export const FloatingShape: React.FC<{
  size: number;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}> = ({ size, top, left, right, delay }) => (
  <div
    className={`absolute rounded-full bg-white/10 animate-pulse`}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      right,
      animationDelay: `${delay}s`,
      animationDuration: "4s",
    }}
  />
);
