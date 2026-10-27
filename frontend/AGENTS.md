# Frontend rules

These rules apply to `frontend/` and extend the [repository rules](../AGENTS.md).

## File organization

```text
frontend/
  index.html          # Page shell.
  public/assets/      # Images and SVG artwork, served as /assets/...
  src/
    main.tsx          # Starts the app.
    pages/            # One component for each screen.
    components/       # UI parts shared by screens.
    styles/           # index.css (Tailwind and color tokens), base.css, one file for each screen.
    security/         # Checks that the backend repeats, such as the password policy.
    services/         # API and WebSocket clients, once the backend exists.
  tests/              # Vitest and Testing Library tests, named after the page or component.
```

Use the color and font tokens in `styles/index.css` instead of repeating values. Do not add empty folders or files for later work.

## Design

- Match the Figma design. Do not change layout, colors, fonts, sizes, or motion unless the user asks.
- Record the checked design values and any change the user approved in the screen's note under `docs/`.
- Keep keyboard access, visible focus, labels for screen readers, and reduced-motion support.

## Backend boundary

Screens stay frontend-only until the user asks for backend integration. Local checks, such as required-field warnings, are fine. Do not add API requests, fake server responses, login results, or server error states before that. Shared API formats belong in `integration/contracts/`.

## Checks

- Run `npm test` and `npm run build` from the repository root.
- Check visible changes in a browser at 1440 x 922, 1366 x 768, and 1920 x 1080, with no horizontal scroll or console errors.
- Ask for an independent review before committing, as the [AI review guide](../docs/ai/ai-review.md) explains.
- Save updated screenshots under `docs/previews/`.
