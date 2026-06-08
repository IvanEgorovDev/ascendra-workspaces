import { createFileRoute } from "@tanstack/react-router";
import DevPage from "../pages/DevPage";

export const Route = createFileRoute("/dev")({
  component: DevPage,
});
