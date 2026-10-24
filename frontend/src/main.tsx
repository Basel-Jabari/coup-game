import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/playfair-display/latin-400.css";
import "@fontsource/playfair-display/latin-700.css";
import "@fontsource/roboto/latin-400.css";
import "@fontsource/abhaya-libre/latin-600.css";
import "@fontsource/42dot-sans/latin-400.css";
import { LoginPage } from "./pages/LoginPage";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
);
