import type { Route } from "./+types/home";
import { LandingPage } from "~/LandingPage/LandingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "handoff.fm" },
    { name: "description", content: "handoff.fm Landing Page" },
  ];
}

export default function Home() {
  return <LandingPage />;
}
