import React from "react";

interface ServiceIconProps {
  icon: string;
  bgColor: string;
  delay?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
                                                   icon,
                                                   bgColor,
                                                   delay = 0,
                                                 }) => (
    <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl text-white transition-all duration-300 cursor-pointer backdrop-blur-md border border-white/20 hover:transform hover:-translate-y-2 hover:scale-110 hover:shadow-2xl ${bgColor}`}
        style={{ animationDelay: `${delay}ms` }}
    >
      {icon}
    </div>
);