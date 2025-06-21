import { Close } from "~/Close/Close";

export function meta() {
  return [
    { title: "Dashboard | handoff.fm" },
    { name: "description", content: "handoff.fm Dashboard" },
  ];
}

export default function DashboardRoute() {
  return <Close />;
}
