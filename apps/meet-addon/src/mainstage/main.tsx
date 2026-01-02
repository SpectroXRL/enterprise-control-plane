import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainStage from "./MainStage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainStage />
  </StrictMode>
);
