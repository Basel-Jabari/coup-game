# Desktop login screen

## Scope

Login screen only, in English, for desktop. It is a frontend preview: it checks the fields locally and never contacts a server. Registration, password recovery, authentication, and the game are not part of it. Backend integration starts only when the user asks for it.

Source: [Figma design](https://www.figma.com/design/gSwvUJYZiyFV5LTaTRcQvW/ui-login-register?node-id=120-3855), frame "Desktop - login default" (120:3855), 1440 x 922. Design version: 23 October 2026, with Noor's changes. The motion page gave the card poses and the panel hover. Prototype keyboard shortcuts are not app shortcuts.

## Design values

- Form panel: x 95, y 178, 500 x 550, 4 px border, 54 px corners.
- Email x 152, y 378. Password x 152, y 467. Sign-in button x 151, y 602. Each is 400 x 60.
- Heading: Playfair Display Regular, 52 px, #F3F0E8. Subtitle: 23 px, #A5AEC3. Recovery link: 20 px.
- Input hints: Roboto Regular, 21 px. Entered text: 42dot Sans Regular, 23 px (error frame 120:5560).
- Field warnings: Abhaya Libre SemiBold, 22 px with 26 px line height, #D6A943, and a 20 px warning icon.
- Sign-in text: Playfair Display Bold, 33 px. Sign-up text: 22 px, with a 24 px link.
- Inputs: background #0D1632, border #242C48, icons #AAB4D0. Primary gold: #C9A148.
- Background gradient: #080F27 at 10%, #0D1632 at 91%.

Colors used in several places are tokens in `frontend/src/styles/index.css`.

## Artwork and layout

The cards (instance 120:4380, 715 x 447 at x 673, y 245), coins, and emblem are SVG exports in `frontend/public/assets/`. The four fonts are bundled locally with Fontsource.

- The Figma export left out details from five background coins. They reuse complete coin artwork with only rotation and movement, so size, color, and stroke stay the same. All 16 coins are complete.
- The user asked to scatter the three coins on the right side. They were almost in one column, with the same angle and size. Now they form a zig-zag, each with its own angle and size, and keep their color. The top coin is turned 30° at 90% size, the middle coin −15° at 125%, and the bottom coin 55° at 80%. Each coin turns and resizes around its own center. The right side mirrors the left side: the middle-left coin goes 81.75 px past the left edge, so the middle-right coin goes 81.75 px past the right edge. Visible edges, including the line: top x 1283.75 to 1422.25, middle x 1371.25 to 1521.75, bottom x 1359.25 to 1461.
- The card glow uses a soft SVG shadow, because Figma's outer filter made rectangle artifacts. The filter areas leave room so the blur is never cut off.
- The 1440 x 922 scene scales as one piece to fit the window, with a 1024 px minimum width. The background fills wide screens. Coins may be cut by the window edge, as in Figma. There is no mobile layout.

## Interactions

- **Card hover.** When the pointer enters the 890 x 650 card area, the four back cards move behind the middle card in 300 ms with ease-out, as in Figma's tight "Variant3" pose. The moves are about −113, +116, +66, and −89 px (Figma values scaled to the 715 px instance). The middle card gets a warm halo, 12% more brightness, and a soft gold edge at 0.25 opacity. The shared glow fades from 0.8 to 0.3, and the background aura from 0.35 to 0.15. Leaving the area restores everything.
- **Panel hover.** The border changes to #C9A24B gold at the top and #2D354F dark blue at the bottom in 200 ms, as in Figma (120:1135).
- **Sign-in hover.** The button gets an outer and inner edge glow. Its center stays transparent.
- **Inputs.** Inputs use the normal text cursor and native clicks. Focus turns the border and leading icon gold and hides the hint. Leaving a field keeps its value. The text is vertically centered; the user chose this over Figma's lower text position.
- **Password eye.** It shows or hides the password. Edge's own extra eye is hidden with `::-ms-reveal`, as [Microsoft documents](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal). Autocomplete still works.
- Reduced-motion settings remove the transitions.

## Local validation

Sign in and Enter check the fields locally:

| Case | Warning |
| --- | --- |
| Empty email | Enter your email address. |
| Invalid email format | Enter a valid email address. |
| Empty password | Enter your password. |

Spaces around the email are ignored. The password has no length rule. A warning appears 8 px below its field with the yellow icon, and the field border turns gold. Each warning adds 32 px, so the panel grows to 614 px with both. Editing a field clears only its warning. Submission keeps both values.

Valid fields do nothing yet. There is no request, loading state, red error, or retry delay; only the backend can decide whether an account exists. "Forgot your password?" and "Sign up" show a short "not available yet" notice.

## Run and test

Double-click `Start-Login.cmd` in the `coup-game` folder, or run `npm run dev` and open the Local URL. If port 5173 is busy, another free port is used. Close the terminal window or press Ctrl+C to stop the server. Opening `frontend/index.html` directly only shows these instructions.

Run `npm test` for the UI tests in `frontend/tests/` and `npm run build` for the production build.

## Previews

[Default](previews/login-desktop.png), [wide desktop](previews/login-wide.png), [tall desktop](previews/login-tall.png), [card hover](previews/login-hover.png), [panel hover](previews/login-panel-hover.png), [email focus](previews/login-focus.png), [entered text](previews/login-filled.png), and [field warnings](previews/login-validation.png).
