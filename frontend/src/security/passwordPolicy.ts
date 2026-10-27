import type zxcvbn from "zxcvbn";
import type matching from "zxcvbn/lib/matching";
import policy from "../../../integration/contracts/password-policy.json";

// The shared rules live in integration/contracts so the backend can apply the same checks.
export const passwordPolicy = policy;

export type PasswordLevel = "weak" | "fair" | "good" | "strong";
export type PasswordReason = "tooShort" | "tooLong" | "noUpper" | "noLower" | "noNumber" | "noSymbol" | "personal" | "common" | "weak";
export type PasswordCheck = { level: PasswordLevel; accepted: boolean; reason: PasswordReason | null };
export type PasswordOwner = { username?: string; email?: string };
// Both parts come from zxcvbn: the score, and the full list of matches for the blocklist check.
export type StrengthEngine = { estimate: typeof zxcvbn; matchAll: typeof matching.omnimatch };

const levels = policy.levels as { id: PasswordLevel; label: string; minScore: number }[];
const messages = Object.fromEntries(policy.checks.map(check => [check.id, check.message])) as Record<PasswordReason, string>;
// The four character types, in the order of their checks. Only ASCII characters count.
const characterTypes: [PasswordReason, (text: string) => boolean][] = [
  ["noUpper", text => /[A-Z]/.test(text)],
  ["noLower", text => /[a-z]/.test(text)],
  ["noNumber", text => /[0-9]/.test(text)],
  ["noSymbol", text => [...text].some(char => policy.symbols.includes(char))],
];

export function passwordMessage(reason: PasswordReason) {
  return messages[reason];
}

export function levelLabel(level: PasswordLevel) {
  return levels.find(item => item.id === level)!.label;
}

function personalWords({ username = "", email = "" }: PasswordOwner) {
  const clean = (value: string) => value.trim().normalize("NFC").toLowerCase();
  const name = clean(username);
  const emailName = clean(email.slice(0, Math.max(0, email.lastIndexOf("@"))));
  return [name, emailName].filter(word => [...word].length >= policy.minPersonalLength);
}

export function checkPassword(password: string, owner: PasswordOwner, engine: StrengthEngine): PasswordCheck {
  const text = password.normalize("NFC");
  const length = [...text].length;
  const fail = (reason: PasswordReason): PasswordCheck => ({ level: "weak", accepted: false, reason });

  if (length < policy.minLength) return fail("tooShort");
  if (length > policy.maxLength) return fail("tooLong");
  const missing = characterTypes.find(([, has]) => !has(text));
  if (missing) return fail(missing[0]);
  const words = personalWords(owner);
  const lower = text.toLowerCase();
  if (words.some(word => lower.includes(word))) return fail("personal");

  const common = engine.matchAll(text).some(match => match.pattern === "dictionary" && match.dictionary_name === "passwords" && match.i === 0 && match.j === text.length - 1);
  if (common) return fail("common");

  const result = engine.estimate(text, words);

  const level = levels.filter(item => result.score >= item.minScore).at(-1)!.id;
  const accepted = levels.findIndex(item => item.id === level) >= levels.findIndex(item => item.id === policy.requiredLevel);
  return { level, accepted, reason: accepted ? null : "weak" };
}
