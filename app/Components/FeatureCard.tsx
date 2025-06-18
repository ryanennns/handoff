import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export const FeatureCard= ({
  icon,
  title,
  description,
}: FeatureCardProps) => {
  return (
      <div
          className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-3 hover:bg-white/15 hover:shadow-2xl">
        <div className="text-5xl mb-5 bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-white/80 leading-relaxed">{description}</p>
      </div>
  );
};
