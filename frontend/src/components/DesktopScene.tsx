import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// A Figma frame (1440 px wide) that scales as one piece to fit the window, with a 1024 px minimum width.
const FRAME_WIDTH = 1440;
const MIN_WIDTH = 1024;

function sceneScale(frameHeight: number) {
  return Math.min(Math.max(window.innerWidth, MIN_WIDTH) / FRAME_WIDTH, window.innerHeight / frameHeight);
}

type DesktopSceneProps = {
  frameHeight: number;
  label: string;
  sceneClass: string;
  children: ReactNode;
};

export function DesktopScene({ frameHeight, label, sceneClass, children }: DesktopSceneProps) {
  const [scale, setScale] = useState(() => sceneScale(frameHeight));

  useEffect(() => {
    const resize = () => setScale(sceneScale(frameHeight));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [frameHeight]);

  return (
    <main className="auth-screen min-h-dvh" aria-label={label}>
      <div className={"auth-scene " + sceneClass} style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {children}
      </div>
    </main>
  );
}
