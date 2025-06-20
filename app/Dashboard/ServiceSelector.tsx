import { ServiceIcon } from "~/Components/ServiceIcon";
import { Service } from "~/Types/core";
import { serviceMap } from "./const";

interface Props {
  service: Service;
  enabled: boolean;
  onClick?: () => void;
  animations?: boolean;
}

export const ServiceSelector = ({
  service,
  enabled,
  onClick,
  animations = true,
}: Props) => {
  const bgColor = enabled ? serviceMap[service].bgColor : "bg-gray-500";
  const redirect = serviceMap[service].redirect;

  const startOauthFlow = () => {
    if (enabled) {
      return;
    }

    if (!redirect) {
      console.log("no redirect URL configured for this service");
      return;
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      console.log("no auth token found");
      return;
    }

    const url = `https://handoff-api.enns.dev/api/auth/redirect/${redirect}?token=${token}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      data-tooltip-id="tooltip"
      data-tooltip-content={serviceMap[service].name}
      data-tooltip-place="top"
      onClick={enabled ? onClick : undefined}
    >
      {redirect ? (
        <span onClick={startOauthFlow}>
          <ServiceIcon
            icon={serviceMap[service].icon}
            bgColor={bgColor}
            animations={animations}
          />
        </span>
      ) : (
        <ServiceIcon
          icon={serviceMap[service].icon}
          bgColor={bgColor}
          animations={animations}
        />
      )}
    </div>
  );
};
