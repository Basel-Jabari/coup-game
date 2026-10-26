import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RegisterPage } from "../src/pages/RegisterPage";

// Holds the strength checker back until the test releases it, like a slow network.
const loader = vi.hoisted(() => {
  let release = () => {};
  const ready = new Promise<void>(resolve => { release = resolve; });
  return { ready, release: () => release() };
});

vi.mock("../src/security/strengthEngine", async () => {
  const actual = await vi.importActual<typeof import("../src/security/strengthEngine")>("../src/security/strengthEngine");
  return { loadStrengthEngine: async () => { await loader.ready; return actual.loadStrengthEngine(); } };
});

afterEach(() => { cleanup(); });

describe("register screen while the strength checker loads", () => {
  it("drops old results when a field changes before the checker is ready", async () => {
    render(<RegisterPage />);
    fireEvent.submit(screen.getByRole("form", { name: "Create account" }));
    fireEvent.change(screen.getByLabelText("Name", { exact: true }), { target: { value: "Card_Shark" } });
    await act(async () => { loader.release(); await new Promise(resolve => setTimeout(resolve, 50)); });
    expect(screen.queryAllByRole("alert")).toHaveLength(0);
    fireEvent.submit(screen.getByRole("form", { name: "Create account" }));
    expect(await screen.findAllByRole("alert")).toHaveLength(3);
  });
});
