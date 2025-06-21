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
