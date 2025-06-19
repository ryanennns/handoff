import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route("dashboard", "routes/dashboard.tsx"),
  index("routes/home.tsx"),
] satisfies RouteConfig;
