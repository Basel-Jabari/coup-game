import type { MouseEvent } from "react";

// A small path router: the app has only two screens, so it does not need a router library yet.
const navigateEvent = "coup:navigate";

export function navigate(path: string) {
  if (path === window.location.pathname) return;
  const update = () => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new Event(navigateEvent));
  };
  const transitionDocument = document as Document & {
    startViewTransition?: (callback: () => void) => unknown;
  };

  if (!transitionDocument.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    update();
    return;
  }

  transitionDocument.startViewTransition(update);
}

export function onNavigate(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(navigateEvent, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(navigateEvent, listener);
  };
}

// Opens a screen in the same tab, but keeps normal browser behavior for Ctrl, Shift, or middle clicks.
export function linkTo(path: string) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(path);
  };
}
