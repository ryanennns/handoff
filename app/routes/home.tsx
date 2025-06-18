import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "handoff.fm" },
    { name: "description", content: "handoff.fm Landing Page" },
  ];
}

export default function Home() {
  return <Welcome />;
}
