import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <App />
  </MemoryRouter>
);
