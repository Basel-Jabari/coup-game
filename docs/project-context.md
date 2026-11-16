# Project context

## Agreed proposal

Project title: **Design and Security Evaluation of a Multiplayer Coup Platform**.

This note follows the latest agreed university proposal and the user's corrections. The local proposal source is `../Ready/Proposal/Proposal.tex`, relative to the `coup-game` folder. Its PDF and presentation are in the same folder. The full Chapter One source and compiled PDF are in `../Ready/ChapterOne/`.

Use this note for the agreed repository scope. Old drafts and temporary build files are not requirements. A proposal describes planned work; it does not mean the backend or these controls already exist.

## Purpose

Build and evaluate a website dedicated to multiplayer Coup. The physical game requires players to meet in person, which inspired our browser prototype. Online versions of Coup already exist; creating the first online version is not our claim.

The project covers Coup only. Do not add a shared platform for several games, support for future games, or a marketplace for outside developers.

## Scope

- Registration, login, logout, password protection, and sessions.
- Player and administrator permissions, with activity records.
- Complete Coup rules: turns, challenges, legal bluffing, hidden information, and confirmed results.
- Private rooms, joining and leaving, and live updates.
- One Gold balance and one Gems balance for each account, with a record of every change.
- Cosmetic card and table skins, purchases, inventory, and ownership checks. Players can see the host's table skin without owning it.
- Fixed Gold rewards based on confirmed final ranks. The amounts are not decided yet. There is no entry stake or prize pool.
- Email confirmation and password recovery using expiring, single-use codes sent by email. The user reads the code, returns to the website, and enters it there.
- Email two-step verification at sign-in: mandatory for administrators and optional for players.

Gold cannot be bought with Gems or real money. The prototype uses test Gems. Real-money Gem purchases and payment processing will not be implemented. A skin may have a Gold price, a Gems price, or a price in each currency.

Large-scale production hosting is outside the graduation scope. The technical stack is described in the [repository rules](../AGENTS.md): React, TypeScript, Vite, and Tailwind CSS, with one modular FastAPI backend, Python Coup game logic, MySQL with InnoDB, and WebSockets. FastAPI handles APIs and live messages; the Python game logic applies Coup's rules. InnoDB transactions keep related wallet and inventory changes together.

## Email codes and protected changes

Email confirmation, password recovery, and two-step verification use codes entered on the website. Do not replace them with emailed confirmation or reset links. Email is the only planned verification channel.

For any account with two-step verification enabled, a fresh code is required before changing or resetting its password, changing its email address, or changing verification settings. The code goes to the currently registered email address. Administrators cannot disable verification, even with a valid code. Password resets leave verification enabled.

## Match departures and optional recovery

A detected player disconnection removes only that player from the current match. The remaining players continue under the normal match and rank reward rules. The returning player can join a new match.

If a server failure prevents the match from continuing, that match ends without rank rewards. Account and wallet records remain stored. Restoring an interrupted match from saved game state is optional.

## Security and logs

Hosted communication uses HTTPS and WSS (WebSocket Secure). For live messages, the server checks the origin, session, room membership, message format, and permission for each action. Expired sessions lose access.

Only administrators can read match audit logs. These logs record the time, user and match IDs, action, result, reason, and the player's current cards, including hidden cards. An eliminated player is marked as eliminated with an empty active hand. Public activity feeds and general operational logs exclude hidden cards.

Login events are logged, including successful and failed attempts, time, result, and account ID when known. Passwords, session tokens, and verification codes are never logged.

The server rejects invalid actions. Too many invalid requests in a short period trigger an automatic, temporary limit on that player's game requests and a log event. The player stays connected. Legal bluffing does not count as an invalid request. Manual administrator review is not the planned response to these requests.

## Boundaries to keep

The server checks permissions, actions, stored prices, ownership, balances, match results, and rewards. It sends each player only the information that player may see. The Coup game logic confirms results, and the Coup reward service applies the agreed Gold amounts once per player per match. Use transactions and unique operation records to prevent partial updates, repeated effects, and double spending.

The frontend shows clear turn information, available actions, loading and waiting states, validation feedback, and connection problems. Disabled buttons help the user, but the server enforces the rules.

## Security design and evaluation

An acceptable security level means passing the stated checks for the agreed threats and test environment. It is not a claim of protection against every attack.

Use STRIDE in Chapter Three's existing threat model section. Mark trust boundaries on its data flow diagram and describe Coup's match states in the system design. Chapter Four explains implementation and security mechanisms. Chapter Five records the test setup, expected and actual outcomes, and Pass or Fail results. Keep details in those existing Palestine Polytechnic University (PPU) report sections rather than adding new deliverables.

Examples of passing conditions from the proposal:

- Requests for another player's private view return zero forbidden card values.
- Unauthorized actions cause zero protected changes.
- Repeating the same accepted action or valid reward request 20 times causes exactly one effect.
- Two purchases competing for funds sufficient for only one produce exactly one purchase, one stored-price deduction, and one inventory addition.
- Expired or used email codes are rejected without changing email status or passwords. Required fresh codes cannot be skipped, and administrators cannot disable verification.
- A player disconnection allows the remaining players to finish the same match. Tests for restoring saved matches apply only if recovery is implemented.

## Team and current implementation

Basel owns backend development, Coup game logic, and all frontend–backend integration. Noor owns frontend development, UI design, layout, and styling. Both contribute to security, testing, and documentation.

The existing login and register screens are desktop frontend previews in English. They check fields locally and do not connect to a backend. The agreed account, game, and security behavior above is planned work.
