# Repository guidance

These are the shared rules for Codex and Claude Code in this repository. Keep one copy of the rules here; `CLAUDE.md` imports this file for Claude. Read only the task guides that apply.

## Project direction

Build one Coup game platform. The target stack is React, TypeScript, Vite, and Tailwind CSS for the interface, with one modular FastAPI backend, MySQL, and WebSockets. The backend runtime is not implemented yet. These instructions define how to add it; they do not mean its packages, commands, or services already exist.

## Task guides

| Task | Read |
| --- | --- |
| Backend feature, HTTP endpoint, or room/game message | [Backend rules](backend/AGENTS.md) and [backend feature guide](docs/ai/backend-feature.md) |
| Database query, transaction, or schema change | [Backend rules](backend/AGENTS.md) and [backend data guide](docs/ai/backend-data.md) |
| Create or update a PR, or maintain docs | [PR and docs guide](docs/ai/pull-requests.md) |
| Understand the AI file setup | [Tool setup](docs/ai/tool-setup.md) |

The matching skills are `coup-backend-feature`, `coup-backend-data`, and `coup-pull-request`. Their entry files are under `.agents/skills/` for Codex and `.claude/skills/` for Claude. Both point to the same guides above. Read the guide directly if the current tool cannot load skills.

## Project layout

- `frontend/`: browser interface, styles, and images.
- `backend/app/`: backend application code. Read [backend/AGENTS.md](backend/AGENTS.md) before changing backend files.
- `backend/tests/`: backend tests.
- `integration/contracts/`: agreed API and message formats. Mark proposed formats as proposals.
- `integration/mocks/`: sample data for development and tests.
- `integration/tests/`: integration checks, including the current login UI tests.
- `docs/`: project notes, design details, setup guidance, and saved previews.
- `.github/`: PR templates, CI, and saved repository rules.

Use one feature module for each backend area. Keep HTTP routes, request/response models, business rules, database code, and external clients in their assigned files. Add files when the feature needs them; keep the pure Coup engine separate from web and database code.

Keep tests in their assigned folders. Do not add a root `tests/` folder. Keep the root for shared tools, configuration, and entry files. Do not add README files unless the user asks for them.

## Pull requests

- Use the title format `[N] Clear name`. `N` is the next order number after the highest existing title prefix, across open, merged, and closed PRs. Keep a PR's number when editing it. Do not restart numbering for a new stack.
- Write every title and description in B1-B2 English. Use common words, short sentences, and active voice. Explain technical terms when they are needed. Keep exact code names and file paths where they help the reader.
- Explain why the change is needed, what it changes, how it was checked, and which docs were updated. Include known limits and related PRs when relevant. Give enough detail for someone who has not read the chat.
- Keep the description accurate for the final change. Remove old claims, chat history, and plans that were dropped. Never claim a check passed unless its result was confirmed.
- Start from [.github/pull_request_template.md](.github/pull_request_template.md). Use only the sections that help explain the change; always include checks and the docs decision.
- For stacked PRs, name the earlier PR, select the correct base branch, and explain the merge order. After an earlier PR is squash-merged, rebase the remaining work onto its new base and update the PR target before merging.
- GitHub deletes merged remote branches automatically. Check the base of any remaining PR after a merge. Use commit links for docs and screenshots in PR descriptions so the links survive branch deletion.
- Use squash merging. Keep the owner `Basel-Jabari` in the ruleset's Always bypass list unless the user asks to change it. The saved ruleset file records GitHub settings; committing it alone does not apply those settings.

## Documentation

Update docs in the same PR when a change affects behavior, setup, commands, APIs, design choices, or the working process. Prefer updating the relevant file over adding another file with the same information.

Keep docs under `docs/`, grouped by topic when needed. Put saved screenshots under `docs/previews/` and API agreements under `integration/contracts/`. Use clear file names and working relative links. Move or remove outdated guidance when it no longer matches the project. Keep new or edited prose in B1-B2 English.

If no docs update is needed, explain why in the PR. Do not add unrelated docs just to fill a section.

## Checks

Run checks that match the change. When frontend code or its setup changes, use the available project test and build commands. When only prose changes, check links, file paths, and patch formatting. Report checks that were skipped and give the reason.

Use the existing package scripts and backend tools that are actually installed. Do not copy commands or private dependencies from another repository. For small changes, continue with the available context; ask only when missing information would change the result.
