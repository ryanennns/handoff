import { Dashboard } from "~/Dashboard/Dashboard";

export function meta() {
  return [
    { title: "Dashboard | handoff.fm" },
    { name: "description", content: "handoff.fm Dashboard" },
  ];
}

export default function DashboardRoute() {
  return <Dashboard />;
}
