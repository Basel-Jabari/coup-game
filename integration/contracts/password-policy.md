# Password policy (proposal)

Status: proposal, agreed with the user for the register screen. The frontend checker in `frontend/src/security/` follows it, and the register screen (next PR) will use that checker. The backend must apply the same checks when it is built, because a tool such as Burp Suite can skip every frontend check.

The rules are in [password-policy.json](password-policy.json). Both sides read that file. The shared test passwords are in [password-cases.json](../mocks/password-cases.json); frontend and backend tests must give the same results for every case. The [password policy PDF](../../docs/security/password-policy/password-policy.pdf) explains the rules, the strength bars, and the references for readers.

## Rules

Length, the blocklist, and the strength check follow NIST SP 800-63B-4 (2025) for passwords that are the only login factor. The four character types follow common sites and PCI DSS, because players know them; NIST and OWASP ASVS advise against them, so the other rules stay in place.

| Rule | Value |
| --- | --- |
| Normalization | Unicode NFC before every check and before hashing |
| Length | 15 to 128 characters, counted as Unicode code points |
| Character types | At least one capital letter A–Z, one small letter a–z, one number 0–9, and one symbol from `symbols` (the 32 OWASP special characters, without the space) |
| Other characters | Allowed: spaces, other symbols, and letters from any language. They do not count as one of the four types. |
| Personal words | No username or email name (the part before @) inside the password. Names shorter than 3 characters are ignored, because names must have at least 3 and a very short email name would block almost every password. |
| Common passwords | Rejected when one of `zxcvbn`'s matches (`omnimatch`) covers the whole password with an entry of its common-password list, including other capital letters, l33t (look-alike symbols, such as `@` for `a`), and reversed forms |
| Strength | `zxcvbn` score 0–1 Weak, 2 Fair, 3 Good, 4 Strong. Weak is rejected. |
| Not allowed | Forced password changes over time, and password hints |

The checks run in the order of the JSON file and stop at the first failure. The user sees the message for that check.

## Strength estimator

The frontend uses `zxcvbn` 4.4.2. The backend should use the Python port `zxcvbn` 4.5.0 and call it with `max_length` set to 128, because its default stops at 72 characters. Both libraries have `matching.omnimatch`, which the common-password check uses. Both versions gave the same result for every shared test password.

## Known limit

Character type rules lead people to patterns such as `Password12345678!`. `zxcvbn` rates that example Good, so it passes. A later backend step should also check a list of breached passwords, as OWASP ASVS 5.0 asks at Level 2 (6.2.12).

## Backend notes

- Run the same checks on every request that sets a password. Never trust the frontend result.
- Hash with Argon2id. Do not use bcrypt: it silently cuts passwords after 72 bytes.
- Never log passwords or send them back in a response.
- Limit failed login attempts (NIST allows at most 100 in a row; a lower limit is better).
