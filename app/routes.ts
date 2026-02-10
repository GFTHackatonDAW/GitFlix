import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movie/:id", "routes/movie.$id.tsx"),
  route("actor/:id", "routes/actor.$id.tsx"),
  route("popular", "routes/popular.tsx"),
  route("top-rated", "routes/top-rated.tsx"),
  route("upcoming", "routes/upcoming.tsx"),
  route("search", "routes/search.tsx"),
] satisfies RouteConfig;
