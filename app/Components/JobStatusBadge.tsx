import React from "react";
import { FaCheck, FaClock, FaExclamationTriangle } from "react-icons/fa";

interface JobStatusConfig {
  icon: React.ReactNode;
  text: string;
  color: string;
}

const defaultConfig: JobStatusConfig = {
  icon: <FaClock />,
  text: "Unknown",
  color: "bg-gray-500",
};

export const JobStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig: Record<string, JobStatusConfig> = {
    pending: { icon: <FaClock />, text: "Pending", color: "bg-yellow-500" },
    "in-progress": {
      icon: <FaClock />,
      text: "In Progress",
      color: "bg-blue-500",
    },
    completed: { icon: <FaCheck />, text: "Completed", color: "bg-green-500" },
    failed: {
      icon: <FaExclamationTriangle />,
      text: "Failed",
      color: "bg-red-500",
    },
  };

  const config = statusConfig[status] ?? defaultConfig;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${config.color}`}
    >
      {config.icon}
      {config.text}
    </div>
  );
};
