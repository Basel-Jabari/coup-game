import { useEffect, useRef, useState } from "react";

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
    <div onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="password-help" type="button" aria-label="Password tips" aria-describedby="password-tips"
        onFocus={() => { setFocused(true); setDismissed(false); }} onBlur={() => setFocused(false)}
      >
        <img src="/assets/help-ring.svg" alt="" draggable="false" />
        <span aria-hidden="true">?</span>
      </button>
      <div className={"password-tips" + (open ? " open" : "")} id="password-tips" role="tooltip">
        <strong>Password tips</strong>
        <ul>
          <li>Use at least {minLength} characters.</li>
          <li>Add a capital letter, a small letter, a number, and a symbol, like ! or #.</li>
          <li>Do not use a common password.</li>
          <li>Do not use your name or email.</li>
        </ul>
      </div>
    </div>
  );
}
