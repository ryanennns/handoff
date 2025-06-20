import React, { useEffect, useState } from "react";
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

enum NewJobSteps {
  SelectSource,
  SelectPlaylists,
  SelectDestination,
}

export const NewJobTab: React.FC<{}> = () => {
  // todo -- make api call here to get enabled services
  const [enabledServices, setEnabledServices] = useState<Service[]>([]);
  useEffect(() => {
    fetch("https://handoff-api.enns.dev/api/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch enabled services");
        }
        const data = (await response.json()).services;
        const servicesList = Object.values(ServiceEnum).filter((service) =>
          data.includes(service),
        ) as Service[];
        console.log({servicesList})
        setEnabledServices(servicesList);
      })
      .catch((error) => {
        console.error("Error fetching enabled services:", error);
      });
  }, []);

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

  const triggerJob = () => {
    console.log({
      selectedSource,
      selectedDestination,
      selectedPlaylists: selectedPlaylists.map((p: Playlist) => p.id),
    });
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <StepWrapper enabled={currentStep >= NewJobSteps.SelectSource}>
        <SelectSource
          enabledServices={enabledServices}
          onClick={onSelectSource}
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
        disabled={selectedPlaylists.length === 0}
        className={`cursor-pointer w-full py-3 px-6 font-semibold rounded-2xl cursor-auto transition-all duration-300 ${
          selectedPlaylists.length === 0
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-gradient-to-r from-green-400 to-cyan-400 text-white hover:from-green-500 hover:to-cyan-500 hover:transform hover:-translate-y-0.5 hover:shadow-lg"
        }`}
        onClick={triggerJob}
      >
        Transfer {selectedPlaylists.length} Playlist
        {selectedPlaylists.length !== 1 ? "s" : ""}
      </button>

      <Tooltip id="tooltip" />
    </div>
  );
};
