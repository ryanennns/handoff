import React, { useEffect, useState } from "react";
import { FloatingShape } from "~/Components/FloatingShape";
import { TransferJobRow } from "./TransferJobRow";
import { NewJobTab } from "./NewJob/NewJobTab";
import type { TransferJob } from "~/Types/core";
import type { Tab } from "~/Dashboard/types";
import { OverviewTab } from "~/Dashboard/Overview/OverviewTab";

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
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let mockJobs: TransferJob[] = [
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
  mockJobs = [];

  const tabs: { name: string; value: Tab }[] = [
    { name: "Overview", value: "overview" },
    { name: "Services", value: "services" },
    { name: "New Transfer", value: "new-transfer" },
  ];

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
                Dashboard
              </h1>
              <div className="flex gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeTab === tab.value
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeTab === "overview" && (
            <OverviewTab jobs={mockJobs} setActiveTab={setActiveTab} />
          )}
          {activeTab === "new-transfer" && <NewJobTab />}
        </div>
      </div>
    </div>
  ) : null;
};
