import { type Service, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";
import React from "react";

interface Props {
  enabledServices: Service[];
  onClick: (service: Service) => void;
}

export const SelectSource = ({ enabledServices, onClick }: Props) => (
  <>
    <h1 className="text-2xl font-bold">1. Select Source</h1>
    <div className="flex flex-row justify-center gap-12 mt-6">
      {services.map((service: Service) => (
        <ServiceSelector
          service={service}
          enabled={enabledServices.includes(service)}
          onClick={() => onClick(service)}
        />
      ))}
    </div>
  </>
);
