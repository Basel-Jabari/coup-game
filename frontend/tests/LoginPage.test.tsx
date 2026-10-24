import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "../src/pages/LoginPage";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

function fillCredentials() {
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "player@example.com" } });
  fireEvent.change(screen.getByLabelText("Password", { exact: true }), { target: { value: "sample-password" } });
}

describe("desktop login", () => {
  it.each([
    ["Email address", "player@example.com"],
    ["Password", "sample-password"],
  ])("keeps %s focused on repeated clicks and retains its value after blur", (label, value) => {
    render(<LoginPage />);
    const input = screen.getByLabelText(label, { exact: true }) as HTMLInputElement;
    input.focus();
    expect(fireEvent.mouseDown(input, { button: 0 })).toBe(true);
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value } });
    expect(fireEvent.mouseDown(input, { button: 0 })).toBe(true);
    expect(document.activeElement).toBe(input);
    expect(fireEvent.mouseDown(input, { button: 2 })).toBe(true);
    expect(document.activeElement).toBe(input);
    input.blur();
    expect(document.activeElement).not.toBe(input);
    expect(input.value).toBe(value);
    input.focus();
    expect(document.activeElement).toBe(input);
    expect(input.value).toBe(value);
  });

  it("toggles password visibility without changing the value", () => {
    render(<LoginPage />);
    fillCredentials();
    const input = screen.getByLabelText("Password", { exact: true }) as HTMLInputElement;
    expect(input.type).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(input.type).toBe("text");
    expect(input.value).toBe("sample-password");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input.type).toBe("password");
  });

  it.each([
    ["empty fields", "", "", "Enter your email address.", "Enter your password."],
    ["whitespace email", "   ", "sample-password", "Enter your email address.", undefined],
    ["unfinished email", "player", "sample-password", "Enter a valid email address.", undefined],
    ["missing password", "player@example.com", "", undefined, "Enter your password."],
    ["filled fields", "player@example.com", "sample-password", undefined, undefined],
    ["email with surrounding spaces and a short password", " player@example.com ", "x", undefined, undefined],
  ])("validates %s locally without requests or value changes", (_, email, password, emailWarning, passwordWarning) => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    render(<LoginPage />);
    const emailInput = screen.getByLabelText("Email address") as HTMLInputElement;
    const passwordInput = screen.getByLabelText("Password", { exact: true }) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    const emailBeforeSubmit = emailInput.value;
    const form = screen.getByRole("form", { name: "Sign in" }) as HTMLFormElement;
    const button = screen.getByRole("button", { name: "Sign in" }) as HTMLButtonElement;

    fireEvent.click(button);
    expect(fireEvent.submit(form)).toBe(false);
    expect(fireEvent.submit(form)).toBe(false);
    expect(form.noValidate).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
    expect(button.disabled).toBe(false);
    expect(button.className).toBe("sign-in-button");
    expect(emailInput.value).toBe(emailBeforeSubmit);
    expect(passwordInput.value).toBe(password);
    expect(emailInput.getAttribute("aria-invalid")).toBe(emailWarning ? "true" : null);
    expect(passwordInput.getAttribute("aria-invalid")).toBe(passwordWarning ? "true" : null);
    expect(emailInput.getAttribute("aria-describedby")).toBe(emailWarning ? "email-warning" : null);
    expect(passwordInput.getAttribute("aria-describedby")).toBe(passwordWarning ? "password-warning" : null);
    expect(screen.queryAllByRole("alert").map(alert => alert.textContent)).toEqual([emailWarning, passwordWarning].filter(Boolean));
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("clears only the edited field warning and leaves the password eye independent", () => {
    render(<LoginPage />);
    const form = screen.getByRole("form", { name: "Sign in" });
    const emailInput = screen.getByLabelText("Email address");
    const passwordInput = screen.getByLabelText("Password", { exact: true });
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    fireEvent.submit(form);
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    fireEvent.change(emailInput, { target: { value: "player@example.com" } });
    expect(emailInput.hasAttribute("aria-describedby")).toBe(false);
    expect(screen.getAllByRole("alert").map(alert => alert.textContent)).toEqual(["Enter your password."]);
    fireEvent.change(passwordInput, { target: { value: "sample-password" } });
    expect(passwordInput.hasAttribute("aria-describedby")).toBe(false);
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    fireEvent.submit(form);
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
  });

  it("explains the screens outside the login-only scope", () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByRole("link", { name: "Forgot your password?" }));
    expect(screen.getByText("Password recovery is not available yet.")).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Sign up" }));
    expect(screen.getByText("Registration is not available yet.")).toBeTruthy();
  });
});
