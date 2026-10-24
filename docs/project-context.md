# Project context

## Sources

The scope comes from files outside this repository. Paths are relative to the `coup-game` folder:

- `../Ready/Proposal/Proposal.tex`: the prepared university proposal.
- `../tmp/presentations/coup_remake/content.mjs`: presentation notes, including the frontend plan and shared rewards.
- `../tmp/pdfs/card_platform_scope_data.py`: older scope notes.

The older notes describe some features differently. This project follows the proposal and the presentation notes; the older lists of optional features do not add scope.

## Purpose

Build and evaluate a secure multiplayer card-game platform. Coup is the only game in the graduation prototype. Shared platform features should stay reusable if another game is added later.

## Scope

- Registration, login, logout, password protection, and sessions.
- Player and administrator permissions, with activity records.
- Complete Coup rules: turns, challenges, legal bluffing, hidden information, and confirmed results.
- Private rooms, joining and leaving, and live updates.
- One Gold balance and one Gems balance for each account, with a record of every change.
- Cosmetic card and table skins, purchases, inventory, and ownership checks. Players can see the host's table skin without owning it.
- Fixed Gold rewards based on confirmed final ranks. The amounts are not decided yet. There is no entry stake or prize pool.
- Email verification and password recovery with links that expire and work only once.
- Required two-factor authentication for administrators, with a controlled recovery process.

Gold cannot be bought with Gems or real money. Gems come from verified real-money purchases; payments are tested in a test environment. A skin may have a Gold price, a Gems price, or both.

Other games, a marketplace for outside developers, and large-scale production hosting are out of scope. The technical stack is described in the [repository rules](../AGENTS.md).

## Boundaries to keep

The server checks permissions, actions, prices, ownership, payment confirmation, match results, and rewards. It sends each player only the game information that player may see. The Coup engine reports confirmed results; a shared platform service applies the reward rules.

The frontend shows clear turn information, available actions, loading and waiting states, validation feedback, and connection problems. Disabled buttons help the user, but the server enforces the rules.

The first milestone is the desktop login screen, in English only.
