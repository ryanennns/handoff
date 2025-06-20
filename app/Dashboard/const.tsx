import { Service } from "~/Types/core";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SiAmazonmusic, SiApplemusic, SiTidal } from "react-icons/si";
import type { ServiceSelectorConfig } from "~/Dashboard/types";

export const serviceMap: Record<Service, ServiceSelectorConfig> = {
  [Service.Spotify]: {
    name: "Spotify",
    icon: <FaSpotify />,
    bgColor: "bg-gradient-to-br from-green-400 to-green-600",
    redirect: "spotify",
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
    redirect: "youtube",
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
