import { type Service, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";
import React from "react";

interface Props {
  enabledServices: Service[];
  onClick: (service: Service) => void;
  enabled: boolean;
}

export const SelectDestination = ({
  enabledServices,
  onClick,
  enabled = true,
}: Props) => (
  <div className="relative">
    <div className={enabled ? "" : "opacity-50"}>
      <h1 className="text-2xl font-bold">2. Select Destination</h1>
      <div className="flex flex-row justify-center gap-12 mt-6">
        {services.map((service: Service) => (
          <ServiceSelector
            key={service}
            service={service}
            enabled={enabledServices.includes(service)}
            onClick={() => onClick(service)}
          />
        ))}
      </div>
    </div>
    {!enabled && (
      <div className="absolute inset-0 z-10 bg-transparent pointer-events-auto" />
    )}
  </div>
);
