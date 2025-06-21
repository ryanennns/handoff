import React, { useEffect, useState } from "react";
import { FloatingShape } from "~/Components/FloatingShape";
import { NewJobTab } from "./NewJob/NewJobTab";
import {
  type Service,
  Service as ServiceEnum,
  type TransferJob,
} from "~/Types/core";
import type { Tab } from "~/Dashboard/types";
import { OverviewTab } from "~/Dashboard/Overview/OverviewTab";
import { ServicesTab } from "./Services/ServicesTab";
import { api } from "~/Utils/apiClient";
import { getCookie } from "~/Utils/utils";
import { FadeWrapper } from "~/Utils/FadeWrapper";

export const Dashboard: React.FC = () => {
  const getPlaylistTransfers = () => {
    api
      .get("/playlist-transfers")
      .then((response) => {
        const data = response.data.data as TransferJob[];
        console.log({ data });
        setJobs(data);
      })
      .catch((error) => {
        console.log("Error fetching transfer jobs:", error);
      });
  };

  const [enabledServices, setEnabledServices] = useState<Service[]>([]);
  const [hasAuthed, setHasAuthed] = useState(false);
  const [jobs, setJobs] = useState<TransferJob[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token") ?? getCookie("auth_token");
    if (token) {
      document.cookie = `auth_token=${token}; path=/; secure; samesite=strict; max-age=2592000`;
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
    const token = getCookie("auth_token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    api
      .get("/user")
      .then((res) => {
        console.log("Authenticated user:", res.data);
        setHasAuthed(true);
      })
      .catch(() => {
        document.cookie = "auth_token=; Max-Age=0; path=/;";
        window.location.href = "/";
      });
  }, []);

  useEffect(() => {
    api
      .get("/services")
      .then((response) => {
        const data = response.data.services;
        const servicesList = Object.values(ServiceEnum).filter((service) =>
          data.includes(service),
        ) as Service[];
        console.log({ servicesList });
        setEnabledServices(servicesList);
      })
      .catch((error) => {
        console.error("Error fetching enabled services:", error);
      });

    getPlaylistTransfers();
  }, []);

  useEffect(() => {
    console.log("snickers", { jobs });
  }, [jobs]);

  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { name: string; value: Tab }[] = [
    { name: "Overview", value: "overview" },
    { name: "Services", value: "services" },
    { name: "New Transfer", value: "new-transfer" },
  ];

  const onJobCreated = () => {
    getPlaylistTransfers();
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
          <FadeWrapper activeKey={activeTab}>
            {activeTab === "overview" && (
              <OverviewTab jobs={jobs} setActiveTab={setActiveTab} />
            )}
            {activeTab === "services" && (
              <ServicesTab
                enabledServices={enabledServices}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "new-transfer" && (
              <NewJobTab
                enabledServices={enabledServices}
                onJobCreated={onJobCreated}
              />
            )}
          </FadeWrapper>
        </div>
      </div>
    </div>
  ) : null;
};
