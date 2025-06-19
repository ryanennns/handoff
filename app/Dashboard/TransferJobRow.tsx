import { FaArrowRight, FaSpotify, FaYoutube } from "react-icons/fa";
import { JobStatusBadge } from "~/Components/JobStatusBadge";
import React from "react";
import { SiAmazonmusic, SiApplemusic, SiTidal } from "react-icons/si";
import type { TransferJob } from "~/Types/core";

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const services: ServiceOption[] = [
  {
    id: "spotify",
    name: "Spotify",
    icon: <FaSpotify />,
    color: "text-green-400",
  },
  {
    id: "youtube",
    name: "YouTube Music",
    icon: <FaYoutube />,
    color: "text-red-500",
  },
  {
    id: "apple",
    name: "Apple Music",
    icon: <SiApplemusic />,
    color: "text-red-400",
  },
  { id: "tidal", name: "Tidal", icon: <SiTidal />, color: "text-white" },
  {
    id: "amazon",
    name: "Amazon Music",
    icon: <SiAmazonmusic />,
    color: "text-cyan-400",
  },
];
const getServiceInfo = (serviceId: string) => {
  return services.find((s) => s.id === serviceId);
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
            <div className={`text-xl ${fromServiceInfo?.color}`}>
              {fromServiceInfo?.icon}
            </div>
            <FaArrowRight className="text-white/50" />
            <div className={`text-xl ${toServiceInfo?.color}`}>
              {toServiceInfo?.icon}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              {job.playlistName}
            </h3>
            <p className="text-white/60 text-sm">
              {fromServiceInfo?.name} → {toServiceInfo?.name}
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
