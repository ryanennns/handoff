import { type Service, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";
import React from "react";

interface Props {
  enabledServices: Service[];
  onClick: (service: Service) => void;
  selectedDestination?: Service | null;
}

export const SelectDestination = ({
  enabledServices,
  onClick,
  selectedDestination,
}: Props) => (
  <>
    <h1 className="text-2xl font-bold">3. Select Destination</h1>
    <div className="flex flex-row justify-center gap-12 mt-6">
      {services.map((service: Service) => (
        <div key={service} className="flex flex-col items-center space-y-2">
          <ServiceSelector
            service={service}
            enabled={enabledServices.includes(service)}
            onClick={() => onClick(service)}
          />
          <p className="text-white/70 text-sm capitalize">{service}</p>
        </div>
      ))}
    </div>
  </>
);
