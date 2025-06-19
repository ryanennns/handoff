import React, { useEffect, useState } from "react";
import { FaArrowRight, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiAmazonmusic, SiApplemusic, SiTidal } from "react-icons/si";
import { FloatingShape } from "~/Components/FloatingShape";
import { JobStatusBadge } from "~/Components/JobStatusBadge";

interface TransferJob {
  id: string;
  playlistName: string;
  fromService: string;
  toService: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  songsTotal: number;
  songsTransferred: number;
  createdAt: string;
}

interface ServiceOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const ServiceSelector: React.FC<{
  selected: string;
  onSelect: (serviceId: string) => void;
  services: ServiceOption[];
  label: string;
}> = ({ selected, onSelect, services, label }) => (
  <div className="space-y-3">
    <label className="text-white font-medium text-lg">{label}</label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {services.map((service) => (
        <button
          key={service.id}
          onClick={() => onSelect(service.id)}
          className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
            selected === service.id
              ? "border-white bg-white/20 transform scale-105"
              : "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40"
          }`}
        >
          <div className={`text-2xl ${service.color}`}>{service.icon}</div>
          <span className="text-white text-sm font-medium">{service.name}</span>
        </button>
      ))}
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [hasAuthed, setHasAuthed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("auth_token", token);
      url.searchParams.delete("token");
      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search,
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("auth_token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch("https://handoff-api.enns.dev/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log("Authenticated user:", data);
        setHasAuthed(true);
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        window.location.href = "/";
      });
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<"overview" | "new-transfer">(
    "overview",
  );
  const [fromService, setFromService] = useState("");
  const [toService, setToService] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const mockJobs: TransferJob[] = [
    {
      id: "1",
      playlistName: "My Indie Favorites",
      fromService: "spotify",
      toService: "apple",
      status: "completed",
      songsTotal: 127,
      songsTransferred: 127,
      createdAt: "2025-06-18T14:30:00Z",
    },
    {
      id: "2",
      playlistName: "Workout Hits 2024",
      fromService: "youtube",
      toService: "spotify",
      status: "in-progress",
      songsTotal: 85,
      songsTransferred: 62,
      createdAt: "2025-06-19T09:15:00Z",
    },
    {
      id: "3",
      playlistName: "Chill Vibes",
      fromService: "apple",
      toService: "tidal",
      status: "pending",
      songsTotal: 43,
      songsTransferred: 0,
      createdAt: "2025-06-19T11:45:00Z",
    },
    {
      id: "4",
      playlistName: "90s Throwback",
      fromService: "spotify",
      toService: "youtube",
      status: "failed",
      songsTotal: 156,
      songsTransferred: 23,
      createdAt: "2025-06-17T16:20:00Z",
    },
  ];

  const mockPlaylists = [
    "Road Trip Classics",
    "Late Night Study",
    "Summer Vibes 2025",
    "Jazz & Blues Collection",
    "Electronic Dreams",
  ];

  const getServiceInfo = (serviceId: string) => {
    return services.find((s) => s.id === serviceId);
  };

  const handleStartTransfer = () => {
    // Mock transfer initiation
    console.log("Starting transfer:", {
      fromService,
      toService,
      selectedPlaylist,
    });
    // Reset form
    setFromService("");
    setToService("");
    setSelectedPlaylist("");
    setActiveTab("overview");
  };

  return hasAuthed ? (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingShape size={120} top="15%" left="5%" delay={0} />
        <FloatingShape size={80} top="70%" right="10%" delay={2} />
        <FloatingShape size={100} top="40%" right="25%" delay={4} />
        <FloatingShape size={60} top="85%" left="15%" delay={6} />
      </div>

      {/* Parallax Background Elements */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-xl" />
        <div className="absolute top-2/3 right-1/5 w-60 h-60 bg-gradient-to-r from-yellow-400/10 to-pink-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-white py-6 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                handoff.fm Dashboard
              </h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "overview"
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("new-transfer")}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === "new-transfer"
                      ? "bg-gradient-to-r from-pink-400 to-yellow-400 text-black"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  New Transfer
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === "overview" ? (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    label: "Total Transfers",
                    value: "847",
                    color: "from-green-400 to-cyan-400",
                  },
                  {
                    label: "Songs Transferred",
                    value: "23,451",
                    color: "from-pink-400 to-purple-400",
                  },
                  {
                    label: "Active Jobs",
                    value: "3",
                    color: "from-yellow-400 to-orange-400",
                  },
                  {
                    label: "Success Rate",
                    value: "98.7%",
                    color: "from-blue-400 to-indigo-400",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Transfers */}
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Recent Transfers
                </h2>
                <div className="space-y-4">
                  {mockJobs.map((job) => {
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
                              <div
                                className={`text-xl ${fromServiceInfo?.color}`}
                              >
                                {fromServiceInfo?.icon}
                              </div>
                              <FaArrowRight className="text-white/50" />
                              <div
                                className={`text-xl ${toServiceInfo?.color}`}
                              >
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
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  Start New Transfer
                </h2>

                <div className="space-y-8">
                  <ServiceSelector
                    selected={fromService}
                    onSelect={setFromService}
                    services={services}
                    label="Transfer From"
                  />

                  <ServiceSelector
                    selected={toService}
                    onSelect={setToService}
                    services={services}
                    label="Transfer To"
                  />

                  {fromService && toService && fromService !== toService && (
                    <div className="space-y-3">
                      <label className="text-white font-medium text-lg">
                        Select Playlist
                      </label>
                      <select
                        value={selectedPlaylist}
                        onChange={(e) => setSelectedPlaylist(e.target.value)}
                        className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white backdrop-blur-xl focus:border-white/40 focus:outline-none"
                      >
                        <option value="">Choose a playlist...</option>
                        {mockPlaylists.map((playlist) => (
                          <option
                            key={playlist}
                            value={playlist}
                            className="bg-gray-800"
                          >
                            {playlist}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="flex justify-center pt-6">
                    <button
                      onClick={handleStartTransfer}
                      disabled={
                        !fromService ||
                        !toService ||
                        !selectedPlaylist ||
                        fromService === toService
                      }
                      className="px-8 py-4 bg-gradient-to-r from-pink-400 to-yellow-400 text-black font-bold text-lg rounded-2xl hover:transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                    >
                      Start Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
