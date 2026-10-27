# Name policy (proposal)

Status: proposal, agreed with the user for the register screen. The name is the display name that other players see everywhere. The frontend checker in `frontend/src/security/` follows it, and the register screen (next PR) will use that checker. The backend must apply the same checks when it is built.

The rules are in [name-policy.json](name-policy.json). Both sides read that file. The shared test names are in [name-cases.json](../mocks/name-cases.json); frontend and backend tests must give the same results for every case.

## Rules

| Rule | Value |
| --- | --- |
| Length | 3 to 20 characters |
| Characters | English letters (A–Z), numbers, and `_` only |
| First character | A letter |
| Spaces | Not allowed anywhere, including at the start or end |
| Reserved names | `admin`, `administrator`, `moderator`, `mod`, `support`, `system`, `staff`, `official`, `coup`, `root` (any capital letters) |
| Uniqueness | Backend only. `Card_Shark` and `card_shark` count as the same name. |

The checks run in the order of the JSON file and stop at the first failure. The user sees the message for that check.

## Why

- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html): define what the app accepts and reject everything else (an allowlist), and use one normalization rule before checking and comparing.
- [RFC 8265](https://www.rfc-editor.org/rfc/rfc8265.html) (usernames): the core part of a username has no spaces, and names can be compared without case.
- English letters only also stop look-alike names that mix alphabets, such as a Cyrillic "а" in place of a Latin "a".
- Reserved names stop players from pretending to be staff or the game.

The user may later add a separate name that allows any language and spaces. This policy covers the display name only.

## Backend notes

- Run the same checks on every request that sets a name. Never trust the frontend result.
- Store the name as typed, and keep a unique index on its lowercase form.
- A display name is public, so "This name is already taken" is safe to show. The email is private: for an email that already exists, show a general message, as the [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) advises, so attackers cannot find out who has an account.
