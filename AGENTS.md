# Repository guidance

These rules apply to work in this repository. Read [SKILLS.md](SKILLS.md) for the steps that match the task.

## Project layout

- `frontend/`: browser interface, styles, and images.
- `backend/app/`: backend application code.
- `backend/tests/`: backend tests.
- `integration/contracts/`: agreed API and message formats. Mark proposed formats as proposals.
- `integration/mocks/`: sample data for development and tests.
- `integration/tests/`: integration checks, including the current login UI tests.
- `docs/`: project notes, design details, setup guidance, and saved previews.
- `.github/`: PR templates, CI, and saved repository rules.

Keep tests in their assigned folders. Do not add a root `tests/` folder. Keep the root for shared tools, configuration, and entry files. Do not add README files unless the user asks for them.

## Pull requests

- Use the title format `[N] Clear name`. `N` is the next order number after the highest existing title prefix, across open, merged, and closed PRs. Keep a PR's number when editing it. Do not restart numbering for a new stack.
- Write every title and description in B1-B2 English. Use common words, short sentences, and active voice. Explain technical terms when they are needed. Keep exact code names and file paths where they help the reader.
- Explain why the change is needed, what it changes, how it was checked, and which docs were updated. Include known limits and related PRs when relevant. Give enough detail for someone who has not read the chat.
- Keep the description accurate for the final change. Remove old claims, chat history, and plans that were dropped. Never claim a check passed unless its result was confirmed.
- Start from [.github/pull_request_template.md](.github/pull_request_template.md). Use only the sections that help explain the change; always include checks and the docs decision.
- For stacked PRs, name the earlier PR, select the correct base branch, and explain the merge order. After an earlier PR is squash-merged, rebase the remaining work onto its new base and update the PR target before merging.
- Use squash merging. Keep the owner `Basel-Jabari` in the ruleset's Always bypass list unless the user asks to change it. The saved ruleset file records GitHub settings; committing it alone does not apply those settings.

## Documentation

Update docs in the same PR when a change affects behavior, setup, commands, APIs, design choices, or the working process. Prefer updating the relevant file over adding another file with the same information.

Keep docs under `docs/`, grouped by topic when needed. Put saved screenshots under `docs/previews/` and API agreements under `integration/contracts/`. Use clear file names and working relative links. Move or remove outdated guidance when it no longer matches the project. Keep new or edited prose in B1-B2 English.

If no docs update is needed, explain why in the PR. Do not add unrelated docs just to fill a section.

## Checks

Run checks that match the change. When frontend code or its setup changes, use the available project test and build commands. When only prose changes, check links, file paths, and patch formatting. Report checks that were skipped and give the reason.
