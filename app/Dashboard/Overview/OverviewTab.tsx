import { TransferJobRow } from "~/Dashboard/TransferJobRow";
import React from "react";
import type { TransferJob } from "~/Types/core";
import type { Tab } from "~/Dashboard/types";

interface Props {
  jobs: TransferJob[];
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}

export const OverviewTab = ({ jobs, setActiveTab }: Props) => {
  return (
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

      {/* Recent 1s */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
        {jobs.length ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Transfers
            </h2>
            <div className="space-y-4">
              {jobs.map((job) => (
                <TransferJobRow key={job.id} job={job} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="justify-center flex flex-col items-center space-y-4 text-white">
              <h1 className="text-3xl font-bold">Getting Started is Easy!</h1>

              <span className="text-lg">
                <p>1. Log in with a streaming service</p>
                <p>2. Select the playlists you'd like to sync</p>
                <p>3. Log in to the streaming service to sync with</p>
                <p>4. Let the transfer begin!</p>
              </span>

              <button
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 text-white/70 bg-white/10 hover:text-white hover:bg-white/20`}
                onClick={() => setActiveTab("new-transfer")}
              >
                Get Started
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
