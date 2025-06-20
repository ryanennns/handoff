import type { ReactElement } from "react";

export interface ServiceSelectorConfig {
  name: string;
  icon: ReactElement;
  bgColor: string;
  homepage: string;
  redirect?: string;
}

export type Tab = "overview" | "services" | "new-transfer";
