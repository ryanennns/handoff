import React, { useEffect, useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  type Playlist,
  type Service,
  Service as ServiceEnum,
} from "~/Types/core";
import { SelectSource } from "~/Dashboard/NewJob/SelectSource";
import { SelectDestination } from "~/Dashboard/NewJob/SelectDestination";
import { StepWrapper } from "./StepWrapper";
import { SelectPlaylists } from "./SelectPlaylists";
import { api } from "~/Utils/apiClient";
import type { Tab } from "~/Dashboard/types";

enum NewJobSteps {
  SelectSource,
  SelectPlaylists,
  SelectDestination,
}

interface Props {
  enabledServices: Service[];
  onJobCreated: () => void;
}

export const NewJobTab = ({ enabledServices, onJobCreated }: Props) => {
  // todo -- make api call here to get enabled services
  const [isTransferring, setIsTransferring] = useState(false);

  const [selectedSource, setSelectedSource] = useState<Service | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Service | null>(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>([]);

  const [currentStep, setCurrentStep] = useState<NewJobSteps>(
    NewJobSteps.SelectSource,
  );
  const onSelectSource = (service: Service) => {
    setSelectedSource(
      service !== null && service === selectedSource ? null : service,
    );
    setCurrentStep(NewJobSteps.SelectDestination);
  };

  const onSelectDestination = (service: Service) => {
    setSelectedDestination(
      service !== null && service === selectedDestination ? null : service,
    );
  };

  const triggerJob = async () => {
    setIsTransferring(true);

    try {
      const response = await api.post("/playlist-transfers/trigger", {
        source: selectedSource,
        destination: selectedDestination,
        playlists: selectedPlaylists.map((p) => ({
          id: p.id,
          name: p.name,
        })),
      });

      setSelectedPlaylists([]);
      setCurrentStep(NewJobSteps.SelectSource);
      onJobCreated();
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please try again.");
    } finally {
      setIsTransferring(false);
    }
  };

  const canTransfer = useMemo<boolean>(() => {
    return (
      !isTransferring &&
      selectedPlaylists.length > 0 &&
      selectedDestination !== null &&
      selectedSource !== null
    );
  }, [
    selectedPlaylists.length,
    isTransferring,
    selectedDestination,
    selectedSource,
  ]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <StepWrapper enabled={currentStep >= NewJobSteps.SelectSource}>
        <SelectSource
          enabledServices={enabledServices}
          onClick={onSelectSource}
          selectedSource={selectedSource}
        />
      </StepWrapper>

      <StepWrapper enabled={true}>
        <SelectPlaylists
          service={selectedSource as string}
          setter={setSelectedPlaylists}
        />
      </StepWrapper>

      <StepWrapper enabled={currentStep === NewJobSteps.SelectDestination}>
        <SelectDestination
          enabledServices={enabledServices}
          onClick={onSelectDestination}
          selectedDestination={selectedDestination}
        />
      </StepWrapper>

      <button
        disabled={!canTransfer}
        className={`w-full py-3 px-6 font-semibold rounded-2xl transition-all duration-300 ${
          !canTransfer
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "cursor-pointer bg-gradient-to-r from-green-400 to-cyan-400 text-white hover:from-green-500 hover:to-cyan-500 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
        }`}
        onClick={triggerJob}
      >
        {isTransferring
          ? "Transferring..."
          : `Transfer ${selectedPlaylists.length} Playlist${selectedPlaylists.length !== 1 ? "s" : ""}`}
      </button>

      <Tooltip id="tooltip" />
    </div>
  );
};
