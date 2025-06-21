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

  return (
    <div
      data-tooltip-id="tooltip"
      data-tooltip-content={serviceMap[service].name}
      data-tooltip-place="top"
      onClick={enabled ? onClick : undefined}
    >
      <ServiceIcon
        icon={serviceMap[service].icon}
        bgColor={bgColor}
        animations={animations}
      />
    </div>
  );
};
