import { type Service, services } from "~/Types/core";
import { ServiceSelector } from "~/Dashboard/ServiceSelector";
import React from "react";
import { serviceMap } from "~/Dashboard/const";

interface Props {
  enabledServices: Service[];
}

export const ServicesTab = ({ enabledServices }: Props) => {
  console.log({ enabledServices });

  const sortedServices = services.sort((a, b) => {
    const aEnabled = enabledServices.includes(a);
    const bEnabled = enabledServices.includes(b);

    if (aEnabled && !bEnabled) return -1; // a comes first
    if (!aEnabled && bEnabled) return 1; // b comes first
    return 0; // maintain original order if both are enabled or both are disabled
  });

  const serviceUrl = (service: Service, isConnected: boolean) => {
    return isConnected
      ? serviceMap[service].homepage
      : `https://handoff-api.enns.dev/api/auth/redirect/${serviceMap[service].redirect}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Streaming Services
        </h2>
        <p className="text-white/70">
          {enabledServices.length} of {services.length} services connected
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedServices.map((service: Service) => {
          const isConnected = enabledServices.includes(service);
          return (
            <div
              key={service}
              className={`bg-white/5 backdrop-blur-sm border rounded-xl p-4 transition-all cursor-pointer group ${
                isConnected
                  ? "border-white/10 hover:bg-white/10"
                  : "border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
            >
              <a href={serviceUrl(service, isConnected)} target="_blank">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ServiceSelector
                      service={service}
                      enabled={isConnected}
                      onClick={() => {}}
                      animations={false}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium capitalize">
                      {service}
                    </h4>
                    <p
                      className={`${isConnected ? "text-gray-300" : "text-white/50"} text-sm`}
                    >
                      {isConnected ? "Connected" : "Click to connect"}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      className="w-5 h-5 text-white/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={
                          isConnected
                            ? "M9 5l7 7-7 7"
                            : "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        }
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {enabledServices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <h3 className="text-white font-medium mb-2">No Services Connected</h3>
          <p className="text-white/70 text-sm">
            Connect your first streaming service to get started
          </p>
        </div>
      )}
    </div>
  );
};
