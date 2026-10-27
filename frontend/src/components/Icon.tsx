import type { ReactNode, SVGProps } from "react";

export type IconName = "mail" | "lock" | "eye" | "eye-off" | "warning" | "user";

const paths: Record<IconName, ReactNode> = {
  warning: (
    <>
      <circle cx="12" cy="12" r="11" fill="currentColor" stroke="none" />
      <path d="M12 6v7m0 4h.01" stroke="#080f27" strokeWidth="1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M7 10V7a5 5 0 0 1 10 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  // The person icon from the Figma register frame, in its own 26.5 x 29.5 box.
  user: (
    <path d="M24.75 27.75V24.8611C24.75 23.3287 24.1442 21.8591 23.0659 20.7756C21.9875 19.6921 20.525 19.0833 19 19.0833H7.5C5.97501 19.0833 4.51247 19.6921 3.43414 20.7756C2.3558 21.8591 1.75 23.3287 1.75 24.8611V27.75M19 7.52778C19 10.7188 16.4256 13.3056 13.25 13.3056C10.0744 13.3056 7.5 10.7188 7.5 7.52778C7.5 4.3368 10.0744 1.75 13.25 1.75C16.4256 1.75 19 4.3368 19 7.52778Z" strokeWidth="3.5" />
  ),
  "eye-off": (
    <>
      <path d="m3 3 18 18M9.9 5.2A12 12 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-3.1 4M6.1 6.1A19 19 0 0 0 2 12s3.5 7 10 7a12 12 0 0 0 5.9-1.6M10 10a3 3 0 0 0 4 4" />
    </>
  ),
};

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      viewBox={name === "user" ? "0 0 26.5 29.5" : "0 0 24 24"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
