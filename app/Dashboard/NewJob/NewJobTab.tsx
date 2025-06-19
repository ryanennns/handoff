import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { type Service, Service as ServiceEnum, services } from "~/Types/core";
import { SelectSource } from "~/Dashboard/NewJob/SelectSource";
import { SelectDestination } from "~/Dashboard/NewJob/SelectDestination";

enum NewJobSteps {
  SelectSource,
  SelectDestination,
}

export const NewJobTab: React.FC<{}> = () => {
  // todo -- make api call here to get enabled services
  const enabledServices: Service[] = [ServiceEnum.YouTube, ServiceEnum.Spotify];
  const [selectedSource, setSelectedSource] = useState<Service | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<Service | null>(null);
  const [currentStep, setCurrentStep] = useState<NewJobSteps>(
    NewJobSteps.SelectSource,
  );

  const onSelectSource = (service: Service) => {
    setSelectedSource(service);
    setCurrentStep(NewJobSteps.SelectDestination);
    console.log(`Selected source service: ${service}`);
  };

  const onSelectDestination = (service: Service) => {
    setSelectedDestination(service);
    console.log(`Selected destination service: ${service}`);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-white">
        <SelectSource
          enabledServices={enabledServices}
          onClick={onSelectSource}
          enabled={currentStep === NewJobSteps.SelectSource}
        />
      </div>

      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-white">
        <SelectDestination
          enabledServices={enabledServices}
          onClick={onSelectDestination}
          enabled={currentStep === NewJobSteps.SelectDestination}
        />
      </div>
      <Tooltip id="tooltip" />
    </div>
  );
};
