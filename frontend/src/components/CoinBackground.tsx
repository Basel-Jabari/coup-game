import { useId } from "react";

const FRAME_WIDTH = 1440;
const FRAME_HEIGHT = 922;
const MIN_WIDTH = 1024;

export function CoinBackground({ sceneScale }: { sceneScale: number }) {
  const gradient = useId();
  const visibleWidth = Math.max(window.innerWidth, MIN_WIDTH) / sceneScale;
  const visibleHeight = window.innerHeight / sceneScale;

  return (
    <svg className="scene-background" viewBox="0 0 1440 922" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="472" y1="793.694" x2="697.745" y2="1008.02" gradientUnits="userSpaceOnUse">
          <stop offset=".100322" stopColor="#080f27" />
          <stop offset=".908055" stopColor="#0d1632" />
        </linearGradient>
      </defs>
      <rect x="-5000" y="-5000" width="11440" height="10922" fill={"url(#" + gradient + ")"} />
      <svg
        x={(FRAME_WIDTH - visibleWidth) / 2}
        y={(FRAME_HEIGHT - visibleHeight) / 2}
        width={visibleWidth}
        height={visibleHeight}
        viewBox={`0 0 ${FRAME_WIDTH} ${FRAME_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <use href="/assets/coin-pattern.svg#coup-coins" />
      </svg>
    </svg>
  );
}
