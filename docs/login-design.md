# Desktop login implementation

## Confirmed scope

Login screen only, English only, desktop only. This frontend preview includes local yellow field warnings. Registration, password recovery, authentication, and the game itself are outside this implementation. The user will request backend integration and its feedback states later.

Source: [Figma design](https://www.figma.com/design/gSwvUJYZiyFV5LTaTRcQvW/ui-login-register?node-id=120-3855).

The supplied link opens the Login-Register page. The source frame is Desktop - login default (120:3855), 1440 x 922. It was refreshed on 23 October 2026 to include Noor's changes. The motion page was also inspected. Presentation keyboard shortcuts from the prototype are not application shortcuts.

## Design values inspected

- Form panel: x 95, y 178, 500 x 550.
- Email: x 152, y 378, 400 x 60.
- Password: x 152, y 467, 400 x 60.
- Sign-in button: x 151, y 602, 400 x 60.
- Heading: Playfair Display Regular, 52 px, #F3F0E8.
- Subtitle: Playfair Display Regular, 23 px, #A5AEC3.
- Recovery link: Playfair Display Regular, 20 px.
- Empty input hints: Roboto Regular, 21 px. Entered text: 42dot Sans Regular, 23 px, confirmed in the error frame (120:5560).
- Field warnings: Abhaya Libre SemiBold, 22 px with 26 px line height, #D6A943, and a 20 px yellow warning icon.
- Sign-in text: Playfair Display Bold, 33 px. Sign-up text: 22 px, with a 24 px link.
- Inputs: background #0D1632, border #242C48, icons #AAB4D0.
- Primary gold: #C9A148.
- Background gradient stops: #080F27 at 10%, #0D1632 at 91%.

The card layers, coin background, and emblem were exported as SVG from Figma. The login card instance (120:4380) is 715 x 447 at x 673, y 245. The layer export keeps the card paths, colors, and individual effects. A soft SVG shadow avoids artifacts from applying Figma's outer alpha filter to already filtered card layers. The panel and controls use CSS and accessible HTML. All four interface fonts are bundled locally using Fontsource.

The glow filter bounds include the card layers' existing shadows plus room for the outer blur to fade. The background aura also has extra filter space and visible SVG overflow. These prevent the straight cutoff above the middle card while keeping the same artwork positions and hover area.

The desktop content and coins share one uniform scale based on the 1440 x 922 frame. The coin shapes can extend outside that frame on wider screens. The background gradient extends across the viewport, so there are no hard side strips. The minimum layout width is 1024 px. No mobile layout or device block has been added.

All 16 background coins were checked as complete shapes, including parts outside the original frame. The Figma export left out details from five coins: upper-left, lower-left, top-large, bottom-large, and bottom-medium. This was visible when the background extended to other desktop sizes. The four repaired coin instances reuse complete matching artwork with rotation and translation only. The top-large coin keeps its existing paths and gains one missing short edge mark. Every coin now has its center number, four dots, and all four groups of edge marks. The gold panel emblem was also checked and needs no change.

The repairs preserve the original sizes, angles, positions, colors, opacity, and stroke widths. Reused outlines match the source positions within 0.005 px; the added edge mark is placed from a source outline that matches within 0.01 px. The entire scene still scales equally in both directions. The browser edge can crop a coin, as in Figma, but the underlying artwork is complete.

## Card hover

The motion page has three card poses: Default (120:1155), Variant2 (120:1304), and the tighter Variant3 (120:1453). The prototype connects them with Smart Animate, Ease out, 300 ms. The user requested the tight pose when the pointer enters the shadow.

The frontend moves four separate card layers into Variant3 over 300 ms with ease-out timing. Contessa stays in front and does not move. The source horizontal changes are -112 px for Ambassador, +115 px for Assassin, +65 px for Duke, and -88 px for Captain. These values are scaled from the 708.49 px source component to the 715 px login instance.

The user requested light focused on the middle card, with less glow around the other cards and a softer gold edge. On hover, the shared fan glow fades from 0.8 to 0.3 opacity and the wide background aura fades from 0.35 to 0.15. A separate warm halo appears around Contessa at 0.95 opacity. It uses the exact existing outer border path, widened by 7 px and blurred by 18 px and 32 px, behind the middle card. This spreads soft light around that card while reducing light at the outer cards.

Contessa becomes 12% brighter. Its small border highlight, with 2 px and 7 px blurs, fades from zero to only 0.25 opacity to avoid an overly bright gold edge. Both effects reuse the exported border path and add no filled rectangle over the artwork. The other cards keep their original artwork colors. All lighting changes use the same 300 ms ease-out timing as the card movement. Hovering directly over the middle card or anywhere in the fixed 890 x 650 shadow area triggers the same effect. Leaving that area smoothly restores the normal lighting and card positions. Reduced-motion preferences remove the transitions.

## Behavior

- An empty focused input hides its hint. Its edge and mail or lock icon turn gold. Empty blur restores the hint and neutral icon. The password eye keeps its separate hover and toggle states.
- Inputs use the normal text cursor and native mouse behavior. Clicking focuses the input; repeated clicks keep it focused and allow text selection and caret placement. Clicking elsewhere removes focus and the field glow without clearing entered text. An empty field shows its hint again. The existing gold focus styles and password eye remain unchanged.
- Input hints and entered text are vertically centered with equal top and bottom padding. This is the user's requested change from Figma's lower text position.
- Hovering the large panel changes its border gradient: the top becomes #C9A24B gold, while the bottom stays #2D354F dark blue. The 4 px border keeps 87% opacity and a 54 px corner radius. This follows the motion page's Rectangle login hover shape (120:1135). Mouse enter and leave use 200 ms ease-in-out transitions, as in Figma. The existing soft black shadow stays the same. Hovering sign-in adds an outer and small inner edge glow while its center stays transparent.
- Password show/hide, keyboard focus, and password-manager autocomplete remain available.
- The password field hides Edge's extra native reveal icon using its supported `::-ms-reveal` rule, so it does not appear beside the existing show/hide button. This follows [Microsoft's documented approach](https://learn.microsoft.com/en-us/microsoft-edge/web-platform/password-reveal). The rule is limited to this field; autocomplete and the custom button stay available.
- Clicking Sign in or pressing Enter checks fields locally and keeps the page and entered values. A blank email shows "Enter your email address." An invalid email format shows "Enter a valid email address." A missing password shows "Enter your password." Validation ignores surrounding email spaces and does not clear either field. The password is required, but no length or strength rule is imposed for sign-in.
- Each warning uses the original yellow icon and text below the field, with an 8 px gap. The field border turns gold without a red state. Each visible warning adds 32 px of room and moves lower controls down; with both warnings the panel grows from 550 px to 614 px. Editing a field clears only its warning. The password eye does not clear warnings. Warning text is linked to its input and announced to assistive technology.
- Valid fields produce no login result. Submission sends no request and never shows a loading state, red button or field, credential rejection, or retry delay. Only the backend can decide whether an email and password match an account.
- Registration and recovery links show that those screens are not available yet.

There is no authentication service, login API contract, API environment setting, or simulated server response in the current implementation. The earlier response previews and related tests were removed at the user's request. The backend and integration folders keep their planned organization for future work; the current UI checks stay in integration/tests/frontend.

## Local visual previews

Run npm run dev from the coup-game folder and open the Local URL.

The development server starts on port 5173 when available and automatically selects another free port if it is occupied. The Windows launcher opens the actual selected URL in the browser. Each terminal owns its own preview server; close that terminal to stop its server.

Open `/` for the login preview. Old preview query parameters are ignored and also show the normal screen. No backend setup is needed.

## Validation

The production build and all 11 UI tests in integration/tests/frontend passed. Tests cover native input interactions, password visibility, navigation placeholders, local warnings for missing or malformed fields, field-by-field correction, and valid submission. They include blank email spaces, surrounding email spaces, and a short nonempty password. Submission checks confirm accessible warnings, no request, no disabled or red button, and retained values.

Browser checks at 1440 x 922, 1920 x 1080, and 1366 x 768 cover the desktop layout, panel and card hover, focus and empty blur, gold leading icons, the neutral eye, centered text, password visibility, and local warnings on Sign in/Enter. Single and double warnings fit without overlap, and correcting fields restores the original layout. The old server-error and lockout query URLs show the normal screen. No horizontal overflow or browser warnings/errors were found.

The coin repair was also checked at 1440 x 1200 and 2560 x 1080. All five desktop sizes keep equal horizontal and vertical scaling, with no horizontal overflow. The SVG has unique IDs and valid references, and the built asset matches the source.

Saved previews show the [default screen](previews/login-desktop.png), [wide desktop](previews/login-wide.png), [tall desktop with more background coins](previews/login-tall.png), [card hover pose](previews/login-hover.png), [panel hover gradient](previews/login-panel-hover.png), [email focus](previews/login-focus.png), [entered text](previews/login-filled.png), and [yellow field warnings](previews/login-validation.png). Server-error and retry-delay previews remain removed. Follow the [Claude review guide](ai/claude-review.md) before committing future frontend changes. Double-click Start-Login.cmd to reopen the preview. Closing its terminal window or pressing Ctrl+C stops its server.

The port-conflict fix was verified with an existing preview occupying 5173: the launcher selected 5174 and served the login page with HTTP 200. Both verification process trees were then stopped, and the ports were checked from the host session to confirm that neither had a listener.
