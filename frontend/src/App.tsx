import { useEffect, useState } from "react";
import { onNavigate } from "./navigation";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => onNavigate(() => setPath(window.location.pathname)), []);

  return path === "/register" ? <RegisterPage /> : <LoginPage />;
}
