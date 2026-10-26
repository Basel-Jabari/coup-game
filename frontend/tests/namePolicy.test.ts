import { describe, expect, it } from "vitest";
import shared from "../../integration/mocks/name-cases.json";
import { checkName, nameMessage, namePolicy } from "../src/security/namePolicy";

describe("name policy", () => {
  it.each(shared.cases)("$name", ({ value, expected }) => {
    expect(checkName(value)).toEqual(expected);
  });

  it("has a message for every check", () => {
    for (const check of namePolicy.checks) expect(nameMessage(check.id as Parameters<typeof nameMessage>[0])).toBe(check.message);
  });
});
