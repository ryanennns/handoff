import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiAmazonmusic, SiApplemusic, SiTidal } from "react-icons/si";
import type { ReactElement } from "react";
import { ServiceIcon } from "~/Components/ServiceIcon";
import { Service } from "~/Types/core";

interface ServiceSelectorConfig {
  name: string;
  icon: ReactElement;
  bgColor: string;
}

const serviceMap: Record<Service, ServiceSelectorConfig> = {
  [Service.Spotify]: {
    name: "Spotify",
    icon: <FaSpotify />,
    bgColor: "bg-gradient-to-br from-green-400 to-green-600",
  },
  [Service.Tidal]: {
    name: "Tidal",
    icon: <SiTidal />,
    bgColor: "bg-black",
  },
  [Service.YouTube]: {
    name: "YouTube Music",
    icon: <FaYoutube />,
    bgColor: "bg-gradient-to-br from-red-500 to-red-700",
  },
  [Service.Apple]: {
    name: "Apple Music",
    icon: <SiApplemusic />,
    bgColor: "bg-gradient-to-br from-red-400 to-pink-500",
  },
  [Service.Amazon]: {
    name: "Amazon Music",
    icon: <SiAmazonmusic />,
    bgColor: "bg-[#25D1DB]",
  },
};

interface Props {
  service: Service;
  enabled: boolean;
}

export const ServiceSelector = ({ service, enabled }: Props) => {
  const bgColor = enabled ? serviceMap[service].bgColor : "bg-gray-500";

  return (
    <>
      <a
        data-tooltip-id="tooltip"
        data-tooltip-content={serviceMap[service].name}
        data-tooltip-place="top"
      >
        <ServiceIcon icon={serviceMap[service].icon} bgColor={bgColor} />
      </a>
    </>
  );
};
