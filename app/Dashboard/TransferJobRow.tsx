import { FaArrowRight } from "react-icons/fa";
import { JobStatusBadge } from "~/Components/JobStatusBadge";
import React from "react";
import { Service, type TransferJob } from "~/Types/core";
import { serviceMap } from "~/Dashboard/const";

const getServiceInfo = (serviceId: string) => {
  // Convert string serviceId to Service enum if needed
  const service = serviceId as Service;
  return serviceMap[service];
};

export const TransferJobRow: React.FC<{ job: TransferJob }> = ({ job }) => {
  const fromServiceInfo = getServiceInfo(job.fromService);
  const toServiceInfo = getServiceInfo(job.toService);

  return (
    <div
      key={job.id}
      className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
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
              {job.playlists} {job.playlists === 1 ? "Playlist" : "Playlists"}
            </p>
          </div>
        </div>
        <JobStatusBadge status={job.status} />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-white/70 text-sm">
          {job.songsTransferred} of {job.songsTotal} songs
        </div>
        <div className="flex items-center gap-4">
          {job.status === "in-progress" && (
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-400 to-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(job.songsTransferred / job.songsTotal) * 100}%`,
                }}
              />
            </div>
          )}
          <div className="text-white/50 text-sm">
            {new Date(job.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};
