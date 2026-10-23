# Project working steps

This file is a guide for work in this repository. It is read through [AGENTS.md](AGENTS.md); it does not install a separate tool or agent skill.

## Prepare or update a PR

1. Read the changed files and their purpose. Check the final diff against the request. Keep unrelated work out of the PR.
2. Check existing PR titles, including closed and merged PRs. For a new PR, use the next order number in `[N] Clear name`. For an existing PR, keep its number. Check the number again before publishing if another PR was created during the work.
3. Write a short title that names the result. For example, `[1] Set up folders and repository rules` or `[2] Add the desktop login screen`.
4. Fill in the [PR template](.github/pull_request_template.md) with facts about the final change. Explain the reason and result first. Add details that help a reviewer understand the behavior or scope.
5. List the checks and their real results. State any skipped check and the reason. Add a screenshot or a useful link when it helps explain a visible change.
6. Update the relevant docs, or explain why no update is needed. For a stack, link the earlier PR and state the base branch and merge order. Mention limits that still affect use of the feature.
7. Read the title and description once more. Replace difficult words, split long sentences, and explain needed technical terms. Keep the text at B1-B2 English level.
8. After creating or updating the PR, confirm its title, description, base branch, and check results. Keep the title and description current when the scope changes.

## Update and organize docs

1. Find the existing note for the topic before writing a new one. Use `docs/` for project guidance and `integration/contracts/` for API agreements.
2. Change the affected parts with the code or workflow. Update commands, paths, links, screenshots, and limits when they change. Keep proposed behavior separate from working behavior.
3. Keep each file about one clear topic. Use a topic folder when several related files need it. Avoid copying the same rules into several files; link to the main source instead.
4. Check that file links resolve from the file that contains them and that examples match the current project. Remove outdated instructions.

## Check work before sharing it

- For frontend or shared package changes, run `npm test` and `npm run build` from the repository root when those commands are present.
- For backend or integration work, use the checks configured for that area. Do not invent passing results for services that are not built yet.
- For docs or PR guidance changes, check relative links, file paths, and `git diff --check`. Do not add application tests that only repeat the text of these rules.
- Keep the saved ruleset and its description in line with the active GitHub settings when changing repository rules. Check the live settings after an authorized change.
