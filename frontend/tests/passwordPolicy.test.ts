import { describe, expect, it } from "vitest";
import zxcvbn from "zxcvbn";
import matching from "zxcvbn/lib/matching";
import shared from "../../integration/mocks/password-cases.json";
import { checkPassword, levelLabel, passwordMessage, passwordPolicy } from "../src/security/passwordPolicy";

const engine = { estimate: zxcvbn, matchAll: (password: string) => matching.omnimatch(password) };

describe("password policy", () => {
  it.each(shared.cases)("$name", ({ password, username, email, expected }: (typeof shared.cases)[number] & { username?: string; email?: string }) => {
    expect(checkPassword(password, { username, email }, engine)).toEqual(expected);
  });

  it("has a message for every check and a label for every level", () => {
    for (const check of passwordPolicy.checks) expect(passwordMessage(check.id as Parameters<typeof passwordMessage>[0])).toBe(check.message);
    expect(passwordPolicy.levels.map(level => levelLabel(level.id as Parameters<typeof levelLabel>[0]))).toEqual(["Weak", "Fair", "Good", "Strong"]);
  });
});
