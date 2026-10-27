import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { App } from "../src/App";
import { RegisterPage } from "../src/pages/RegisterPage";
import { loadStrengthEngine } from "../src/security/strengthEngine";

beforeAll(async () => { await loadStrengthEngine(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); window.history.replaceState(null, "", "/"); });

const field = (label: string) => screen.getByLabelText(label, { exact: true }) as HTMLInputElement;
const type = (label: string, value: string) => fireEvent.change(field(label), { target: { value } });
const submit = () => fireEvent.submit(screen.getByRole("form", { name: "Create account" }));
const alerts = () => screen.queryAllByRole("alert").map(alert => alert.textContent);
const strength = () => document.getElementById("password-level")!.textContent;

describe("register screen", () => {
  it("starts with an empty meter and the 15-character hint", () => {
    render(<RegisterPage />);
    for (const label of ["Name", "Email address", "Password", "Confirm password"]) expect(field(label).value).toBe("");
    expect(field("Name").placeholder).toBe("Name. Visible to Other Players");
    expect(document.querySelector(".name-placeholder")!.textContent).toBe("Name. Visible to Other Players");
    expect(strength()).toBe("Password strength: -");
    expect(screen.getByText("At least 15 characters")).toBeTruthy();
    expect(field("Password").getAttribute("aria-describedby")).toBe("password-level password-hint");
  });

  it.each([
    ["short pass", "Weak"],
    ["Summer2026!2026!", "Fair"],
    ["Football20262026!", "Good"],
    ["Violet piano 47!", "Strong"],
  ])("rates %s as %s while typing", async (password, level) => {
    render(<RegisterPage />);
    type("Password", password);
    await waitFor(() => expect(strength()).toBe("Password strength: " + level));
    expect(document.querySelectorAll(".meter-bar.on")).toHaveLength(["Weak", "Fair", "Good", "Strong"].indexOf(level) + 1);
  });

  it("warns about every empty field on submit, like the login", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<RegisterPage />);
    submit();
    await waitFor(() => expect(alerts()).toEqual(["Enter a name.", "Enter your email address.", "Enter a password.", "Confirm your password."]));
    expect(document.querySelector(".register-panel")!.className).toContain("has-name-warning");
    expect(field("Name").getAttribute("aria-invalid")).toBe("true");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("uses the shared name and password rules", async () => {
    render(<RegisterPage />);
    type("Name", "Card Shark");
    type("Email address", "card@example");
    type("Password", "violet piano 47!");
    type("Confirm password", "violet piano 47");
    submit();
    await waitFor(() => expect(alerts()).toEqual([
      "Do not use spaces in your name.",
      "Enter a valid email address.",
      "Add a capital letter (A–Z).",
      "Passwords don't match.",
    ]));
    expect(screen.queryByText("At least 15 characters")).toBeNull();
    // Like the login, warnings add room. The password warning uses the hint's row, so it adds none.
    expect(document.querySelector(".register-panel")!.className).toBe("auth-panel register-panel has-name-warning has-email-warning has-confirm-warning");
  });

  it("accepts a valid form without a request and keeps the values", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<RegisterPage />);
    type("Name", "Card_Shark");
    type("Email address", "card@example.com");
    type("Password", "Violet piano 47!");
    type("Confirm password", "Violet piano 47!");
    submit();
    await waitFor(() => expect(strength()).toBe("Password strength: Strong"));
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(alerts()).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
    expect(field("Name").value).toBe("Card_Shark");
    expect(field("Confirm password").value).toBe("Violet piano 47!");
  });

  it("clears only the edited field's warning", async () => {
    render(<RegisterPage />);
    submit();
    await waitFor(() => expect(alerts()).toHaveLength(4));
    type("Email address", "card@example.com");
    expect(alerts()).toEqual(["Enter a name.", "Enter a password.", "Confirm your password."]);
  });

  it("shows and hides each password on its own", () => {
    render(<RegisterPage />);
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(field("Password").type).toBe("text");
    expect(field("Confirm password").type).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show confirm password" }));
    expect(field("Confirm password").type).toBe("text");
  });

  it("explains the password rules from the ? button", () => {
    render(<RegisterPage />);
    const help = screen.getByRole("button", { name: "Password tips" });
    expect(help.getAttribute("aria-describedby")).toBe("password-tips");
    const tips = screen.getByRole("tooltip", { hidden: true }).textContent;
    expect(tips).toContain("Use at least 15 characters.");
    expect(tips).toContain("Add a capital letter, a small letter, a number, and a symbol");
    expect(tips).not.toContain("Coup");
  });

  it("keeps the tips open while hovered and closes them with Escape", () => {
    vi.useFakeTimers();
    try {
      render(<RegisterPage />);
      const help = screen.getByRole("button", { name: "Password tips" });
      const tips = document.getElementById("password-tips")!;
      fireEvent.mouseEnter(help);
      expect(tips.className).toContain("open");
      fireEvent.mouseLeave(help);
      act(() => { vi.advanceTimersByTime(100); });
      fireEvent.mouseEnter(tips);
      act(() => { vi.advanceTimersByTime(300); });
      expect(tips.className).toContain("open");
      fireEvent.keyDown(document, { key: "Escape" });
      expect(tips.className).not.toContain("open");
      expect(document.activeElement).not.toBe(tips);
    } finally {
      vi.useRealTimers();
    }
  });

  it("switches between the login and register screens", () => {
    window.history.replaceState(null, "", "/register");
    render(<App />);
    expect(screen.getByRole("heading", { name: "Create Account" })).toBeTruthy();
    expect(document.title).toBe("Create account · Coup");
    fireEvent.click(screen.getByRole("link", { name: "Sign in" }));
    expect(window.location.pathname).toBe("/");
    expect(screen.getByRole("heading", { name: "Welcome to COUP" })).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Sign up" }));
    expect(screen.getByRole("heading", { name: "Create Account" })).toBeTruthy();
  });
});
