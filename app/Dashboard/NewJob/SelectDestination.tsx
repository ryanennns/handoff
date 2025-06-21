import { type Service, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";
import React from "react";
import { serviceMap } from "~/Dashboard/const";
import { ServiceIcon } from "~/Components/ServiceIcon";

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
      {services.map((service: Service) => {
        const enabled = enabledServices.includes(service);
        const bgColor = enabled ? serviceMap[service].bgColor : "bg-gray-500";

        return (
          <div key={service} className="flex flex-col items-center space-y-2">
            <div
              data-tooltip-id="tooltip"
              data-tooltip-content={serviceMap[service].name}
              data-tooltip-place="top"
              onClick={() => onClick(service)}
              className={`rounded-3xl p-1 transition-all duration-300 ${
                selectedDestination === service
                  ? "ring-4 ring-inset ring-white-400 shadow-xl"
                  : ""
              }`}
            >
              <ServiceIcon
                icon={serviceMap[service].icon}
                bgColor={bgColor}
                animations={false}
              />
            </div>
            <p className="text-white/70 text-sm capitalize">{service}</p>
          </div>
        );
      })}
    </div>
  </>
);
