# Desktop register screen

## Scope

Register screen at `/register`, in English, for desktop. Like the login, it is a frontend preview: it checks the fields locally and never contacts a server. Account creation, email verification, and the loading state come with the backend.

Source: [Figma design](https://www.figma.com/design/gSwvUJYZiyFV5LTaTRcQvW/ui-login-register?node-id=233-1402), frame "Desktop - Register default" (233:1402), 1440 x 1024. Panel layer "login box" (233:1928), error panel (233:3083), cards (233:1927), strength states "password level" (233:1346), and button states "Frame 1" (233:767).

## Design values

- Panel: x 847, y 162, 500 x 700, the same border, blur, shadow, and hover as the login panel, including the smooth border change and the emblem glow (see the [login note](login-design.md)).
- Emblem: 92 px at x 1051, y 177. Title "Create Account": Playfair Display Regular, 52 px, at x 912, y 259.
- Fields, each 400 x 60 at x 899: Name y 345, Email y 427, Password y 518, Confirm Password y 634. The Name field uses the Figma person icon. Its hint has two colors: "Name" in cream and "(Visible to Other Players)" in #677296.
- Strength bars: four 79 x 4 px bars at y 592; empty bars #313A57. Label at the right end; the empty "-" is centered on the bars. Hint: Roboto 20 px, #7D8BAD, at y 602.
- "?" help: 25 px at x 1307, y 539, with the Figma gold ring and Inria Serif Bold "?" in #C99B34, centered in the ring.
- Tips bubble: the Figma "Tips" component (motion page, 226:3067). Abhaya Libre ExtraBold 15 px, a #C99B34 "Password Tips" title, white tips, a #313A57 fill at 75%, a 1 px #C99B34 border, a soft shadow, and a background blur.
- Sign up button: x 898, y 735, 400 x 60. "Already have an account? Sign in": Playfair Display 22 px with a 24 px #C9A24B link, at x 941, y 809.
- Cards: the login's five-card artwork at x 47, y 289, with the same hover motion.

These are the Figma frame values. On screen, the panel, cards, and fields move as explained in "Same size as the login" and "Equal field spacing" below. Shared looks live in `frontend/src/styles/auth.css`; register positions live in `register.css`.

## Changes from Figma, agreed with the user

- **Same size as the login.** The Figma register frame is 1024 px tall, but the login frame is 922 px. When each screen scaled its own frame to the window, the register coins and cards were about 10% smaller, and the coins did not reach the bottom. Both screens now use the login's 1440 x 922 scene and the same scale, so the background and cards look the same when the player switches screens. The cards sit at the login's card height (y 245 instead of 289). The panel starts at y 80 instead of 162, so it still fits with all warnings (18 px above the bottom edge).
- **Equal field spacing, like the login.** In Figma the gaps between the boxes are 22 px and 31 px, and the hint sits 8 px above Confirm password. The screen uses the login's spacing everywhere: 29 px between boxes, and about 30 px from a warning or the hint to the next box (28 px from a warning, 31 px from the hint, the same as the login). So, compared with Figma, Email moves down 7 px, Password 5 px, and Confirm password 28 px, and the panel is 728 px tall instead of 700. The gap above the Sign up button stays 41 px, as in Figma.
- **15 characters, not 12.** The hint says "At least 15 characters" to match the [password rules](../integration/contracts/password-policy.md).
- **Four strength levels.** Figma shows Weak (1 red bar), Fair (2 yellow bars), and Strong (4 green bars). The screen adds Good (3 bars) in the old green and shows Strong (4 bars) in light purple #B388FF, the "legendary" color. The password border takes the level color while the player types.
- **Yellow warnings with login spacing.** Figma uses red messages that sit in the gaps. The screen uses the login's yellow warning style instead, and the Name, Email, and Confirm warnings each push the fields below them down by 32 px, so the two screens behave the same. The password warning takes the hint's row, 8 px below the strength bars, so it adds no space and the gaps stay equal. A warned password field gets the yellow border like the other fields.
- **Login coins and cards.** The new Figma frame has a different coin background. The user asked to reuse the login's coins and cards.
- **Tips bubble inside the panel.** Hovering or focusing the "?" opens the Figma tips bubble. In Figma, the bubble reaches 7 px past the panel border, so its tail moves to the bubble's right corner. The tail tip stays where Figma puts it, just above the "?", and the bubble ends 12 px inside the border. The bullet indent is 18 px instead of 22.5 px, so the tips fit the Figma size in 6 lines. The bubble stays open while the pointer is on the button or the bubble, and Escape closes it.
- **Name hint text.** The user asked for "Name (Visible to Other Players)" instead of Figma's "Name.Visible to other players.". Screen readers hear the same text from the field's placeholder.
- **Small consistency fixes.** Input text is centered like the login, and the Sign up button uses the login's button style, including the Figma pressed state.

## Behavior

- **Live strength.** The bars update while the player types, using the shared [password checker](../frontend/src/security/passwordPolicy.ts). It loads `zxcvbn` only on this screen, so the login page stays small. The hint shows until the password has 15 characters.
- **Warnings on Sign up.** Sign up and Enter check every field:

| Field | Possible warnings |
| --- | --- |
| Name | The [name rules](../integration/contracts/name-policy.md), for example "Do not use spaces in your name." |
| Email | "Enter your email address." or "Enter a valid email address." |
| Password | "Enter a password." or a password rule, for example "Add a symbol, like ! or #." or "This password is too common." |
| Confirm password | "Confirm your password." or "Passwords don't match." |

- Editing a field clears only its warning. Valid fields send no request and keep their values. If a field changes while the strength checker is still loading, that check result is dropped, so no old warning appears.
- Each password field has its own show/hide button. "Sign in" returns to the login screen, and "Sign up" on the login opens this screen. In browsers with view transitions, the screens change with a short 220 ms fade; with reduced motion, they change at once.

## Run and test

Run `npm run dev` and open `/register`, or click "Sign up" on the login. `npm test` runs the register tests in `frontend/tests/RegisterPage.test.tsx`.

## Previews

[Default](previews/register-desktop.png), [strength levels](previews/register-levels.png), [warnings](previews/register-warnings.png), [password tips](previews/register-help.png), [pressed button](previews/register-pressed.png), and [wide desktop](previews/register-wide.png).
