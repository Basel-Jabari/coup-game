import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// The login's 1440 x 922 Figma frame, which scales as one piece to fit the window, with a 1024 px minimum width.
// Every screen uses this frame, so the background and cards keep their size when the player switches screens.
const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 922;
const MIN_WIDTH = 1024;

function sceneScale() {
  return Math.min(Math.max(window.innerWidth, MIN_WIDTH) / FRAME_WIDTH, window.innerHeight / FRAME_HEIGHT);
}

type DesktopSceneProps = {
  label: string;
  sceneClass: string;
  children: ReactNode;
};

export function DesktopScene({ label, sceneClass, children }: DesktopSceneProps) {
  const [scale, setScale] = useState(sceneScale);

  useEffect(() => {
    const resize = () => setScale(sceneScale());
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="auth-screen min-h-dvh" aria-label={label}>
      <div className={"auth-scene " + sceneClass} style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {children}
      </div>
    </main>
  );
}
