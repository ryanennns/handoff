import { FaArrowRight } from "react-icons/fa";
import { JobStatusBadge } from "~/Components/JobStatusBadge";
import React from "react";
import { Service, type TransferJob } from "~/Types/core";
import { serviceMap } from "~/Dashboard/const";

const getServiceInfo = (service: Service) => {
  return serviceMap[service];
};

export const TransferJobRow: React.FC<{ job: TransferJob }> = ({ job }) => {
  const fromServiceInfo = getServiceInfo(job.source);
  const toServiceInfo = getServiceInfo(job.destination);

  return (
    <div
      key={job.id}
      className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${fromServiceInfo?.bgColor}`}>
              <div className="text-xl text-white">{fromServiceInfo?.icon}</div>
            </div>
            <FaArrowRight className="text-white/50" />
            <div className={`p-2 rounded-lg ${toServiceInfo?.bgColor}`}>
              <div className="text-xl text-white">{toServiceInfo?.icon}</div>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              {fromServiceInfo?.name} ➡️ {toServiceInfo?.name}
            </h3>
            <p className="text-white/60 text-sm">
              {job.playlists.length}{" "}
              {job.playlists.length === 1 ? "Playlist" : "Playlists"}
              {" - "} {new Date(job.created_at).toLocaleDateString()}{" "}
              {new Date(job.created_at).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <JobStatusBadge status={job.status} />
      </div>
    </div>
  );
};
