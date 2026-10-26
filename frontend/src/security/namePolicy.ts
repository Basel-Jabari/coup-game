import policy from "../../../integration/contracts/name-policy.json";

// The shared rules live in integration/contracts so the backend can apply the same checks.
export const namePolicy = policy;

export type NameReason = "required" | "spaces" | "length" | "characters" | "reserved";
export type NameCheck = { accepted: boolean; reason: NameReason | null };

const pattern = new RegExp(policy.pattern);
const messages = Object.fromEntries(policy.checks.map(check => [check.id, check.message])) as Record<NameReason, string>;

export function nameMessage(reason: NameReason) {
  return messages[reason];
}

export function checkName(name: string): NameCheck {
  const text = name.normalize("NFC");
  const length = [...text].length;
  const fail = (reason: NameReason): NameCheck => ({ accepted: false, reason });

  if (length === 0) return fail("required");
  if (/\s/u.test(text)) return fail("spaces");
  if (length < policy.minLength || length > policy.maxLength) return fail("length");
  if (!pattern.test(text)) return fail("characters");
  if (policy.reserved.includes(text.toLowerCase())) return fail("reserved");
  return { accepted: true, reason: null };
}
