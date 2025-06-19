import React from "react";
import { Tooltip } from "react-tooltip";
import { type Service, Service as ServiceEnum, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";

export const NewJobTab: React.FC<{}> = () => {
  // todo -- make api call here to get enabled services
  const enabledServices: Service[] = [ServiceEnum.YouTube, ServiceEnum.Spotify];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-white">
        <h1 className="text-2xl font-bold">1. Select Source</h1>
        <div className="flex flex-row justify-center gap-12 mt-6">
          {services.map((service: Service) => (
            <ServiceSelector
              service={service}
              enabled={enabledServices.includes(service)}
            />
          ))}
        </div>
      </div>
      <Tooltip id="tooltip" />
    </div>
  );
};
