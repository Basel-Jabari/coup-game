# What to share from Figma

You do not need to know HTML, CSS, or JavaScript, or write a technical specification, to start a new screen.

## Needed to start

1. **The Figma design file link.** Share the design file itself, so its frames, layers, text, colors, and sizes can be inspected. A prototype link helps too, but share the design file as well.
2. **View access.** The account used for the work must be able to open the file. Edit access is not needed. See Figma's guide to [sharing files and prototypes](https://help.figma.com/hc/en-us/articles/360040531773-Share-files-and-prototypes).
3. **The screen or flow to build.** Name it, or copy a link with its frame selected.

## Useful details

Most of these can be found in the file or agreed after the first review. Send the ones you already know.

| Detail | What helps |
| --- | --- |
| Screens | Which pages and dialogs are ready for this version. |
| Devices | Desktop, phone, or tablet. If only a desktop design exists, agree on the phone layout. |
| Language | English, Arabic, or both. Arabic also changes the text direction and layout. |
| Interactions | The clickable prototype, or short notes on what buttons, forms, menus, and dialogs do. |
| Screen states | Loading, empty, success, error, disabled, waiting, and reconnecting states. Missing states can be proposed. |
| Assets | Logos, card artwork, card backs, table backgrounds, icons, and sounds. Export them if they cannot be taken from the file. |
| Fonts | Font names, and font files for custom fonts that are not available otherwise. |
| Design priority | Whether to copy each frame closely or allow agreed layout changes. |

You do not need to list every color, spacing value, or font size when the file shows them.

## Backend work comes later

A screen can be built before the backend exists. Connecting it later needs agreed API endpoints, request and response formats, session behavior, WebSocket messages, and server errors. Those agreements belong in `integration/contracts/`, with sample data in `integration/mocks/`.
