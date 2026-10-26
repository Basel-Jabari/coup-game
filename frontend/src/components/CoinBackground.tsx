import { useId } from "react";

export function CoinBackground() {
  const gradient = useId();
  return (
    <svg className="scene-background" viewBox="0 0 1440 922" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradient} x1="472" y1="793.694" x2="697.745" y2="1008.02" gradientUnits="userSpaceOnUse">
          <stop offset=".100322" stopColor="#080f27" />
          <stop offset=".908055" stopColor="#0d1632" />
        </linearGradient>
      </defs>
      <rect x="-5000" y="-5000" width="11440" height="10922" fill={"url(#" + gradient + ")"} />
      <use href="/assets/coin-pattern.svg#coup-coins" />
    </svg>
  );
}
