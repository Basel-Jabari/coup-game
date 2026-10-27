import type { StrengthEngine } from "./passwordPolicy";

let loading: Promise<StrengthEngine> | undefined;

// zxcvbn is about 800 KB, so it loads only when a screen needs it, never with the login page.
export function loadStrengthEngine() {
  loading ??= Promise.all([import("zxcvbn"), import("zxcvbn/lib/matching")]).then(([estimator, matcher]) => ({
    estimate: estimator.default,
    matchAll: (password: string) => matcher.default.omnimatch(password),
  }));
  return loading;
}
