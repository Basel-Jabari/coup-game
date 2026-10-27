import { useEffect, useRef, useState } from "react";

// The Figma "Tips" bubble (vector 226:3074). Its tail moved from x 186–208 to x 217–239, near the right corner,
// so the bubble stays inside the panel while the tail still points at the "?".
const BUBBLE =
  "M239.161 0.508H16.416C8.246 0.947 5.242 3.089 4.579 12.578V104.411C3.974 113.519 6.731 116.273 16.416 117.53" +
  "H217.071L233.667 128.5L238.548 117.53H239.161C248.253 117.456 250.157 113.969 250.459 104.411V12.578" +
  "C250.883 2.614 248.058 0.344 239.161 0.508Z";

// The "?" button shows short password tips while the button or the tips are hovered, or the button has focus.
// Escape closes them without moving focus.
export function PasswordHelp({ minLength }: { minLength: number }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const open = (hovered || focused) && !dismissed;

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setDismissed(true); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  function enter() {
    window.clearTimeout(closeTimer.current);
    setHovered(true);
    setDismissed(false);
  }

  // A short delay lets the pointer move from the button to the tips without closing them.
  function leave() {
    closeTimer.current = window.setTimeout(() => setHovered(false), 150);
  }

  return (
    <div className="password-help-group" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="password-help" type="button" aria-label="Password tips" aria-describedby="password-tips"
        onFocus={() => { setFocused(true); setDismissed(false); }} onBlur={() => setFocused(false)}
      >
        <img src="/assets/help-ring.svg" alt="" draggable="false" />
        <span aria-hidden="true">?</span>
      </button>
      <div className={"password-tips" + (open ? " open" : "")} id="password-tips" role="tooltip">
        <span className="tips-blur" style={{ clipPath: `path("${BUBBLE}")` }} />
        <svg className="tips-bubble" viewBox="0 0 255 137.243" aria-hidden="true" focusable="false">
          <path d={BUBBLE} />
        </svg>
        <div className="tips-text">
          <strong>Password Tips</strong>
          <ul>
            <li>Use at least {minLength} characters.</li>
            <li>Add a capital letter, a small letter, a number, and a symbol, like ! or #.</li>
            <li>Do not use a common password.</li>
            <li>Do not use your name or email.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
