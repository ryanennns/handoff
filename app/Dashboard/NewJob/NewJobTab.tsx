import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { type Service, Service as ServiceEnum, services } from "~/Types/core";
import { SelectSource } from "~/Dashboard/NewJob/SelectSource";
import { SelectDestination } from "~/Dashboard/NewJob/SelectDestination";
import { StepWrapper } from "./StepWrapper";
import { SelectPlaylists } from "./SelectPlaylists";

enum NewJobSteps {
  SelectSource,
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
        setEnabledServices(servicesList);
      })
      .catch((error) => {
        console.error("Error fetching enabled services:", error);
      });
  }, []);

  const [selectedSource, setSelectedSource] = useState<Service | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Service | null>(null);
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

  useEffect(() => {
    console.log({
      selectedSource,
      selectedDestination,
    });
  }, [selectedSource, selectedDestination]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <StepWrapper enabled={currentStep >= NewJobSteps.SelectSource}>
        <SelectSource
          enabledServices={enabledServices}
          onClick={onSelectSource}
        />
      </StepWrapper>

      <StepWrapper enabled={currentStep === NewJobSteps.SelectDestination}>
        <SelectDestination
          enabledServices={enabledServices}
          onClick={onSelectDestination}
          selectedDestination={selectedDestination}
        />
      </StepWrapper>

      <StepWrapper enabled={true}>
        <SelectPlaylists service={selectedSource as string} />
      </StepWrapper>
      <Tooltip id="tooltip" />
    </div>
  );
};
