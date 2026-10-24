# Pull requests and docs

Follow the [repository rules](../../AGENTS.md) and use the [PR template](../../.github/pull_request_template.md).

## Prepare or update a PR

1. Read the final diff and its purpose. Keep unrelated work out of the PR.
2. Check existing titles across open, merged, and closed PRs. Use the next order number in `[N] Clear name` for a new PR, and keep the number when updating one. Do not restart the count for each stack.
3. Write a short title that names the result, such as `[1] Set up folders and repository rules`.
4. Explain why the change is needed and what it does now. Give enough detail for someone who has not read the chat. Add an example, screenshot, or link when it helps.
5. List checks and confirmed results, including the independent review verdict and what it changed. State what was not checked and why. Do not describe planned checks as passed.
6. Link updated docs, or explain why none needed changing. Include known limits and related PRs when relevant. Keep the description about the final result and remove old claims.
7. Use B1-B2 English in the title and body. Choose common words, use short sentences, and explain needed technical terms.
8. After creating or editing the PR, confirm its title, body, base branch, and check results.

## Keep a stack clear

Name the earlier PR, select the right base branch, and explain the merge order. Use squash merging. After the earlier PR is squash-merged, rebase only the remaining work onto its new base and update the PR target before merging.

GitHub is set to delete merged remote branches automatically. After a merge, check the base of any open PR that depended on that branch. If a rebase changes published commits, use a push with an explicit force-with-lease check so another person's newer work is not overwritten.

In PR descriptions, link docs and screenshots to a commit that contains them. Avoid links that rely on a feature branch, because that branch is removed after merging.

Keep the saved ruleset in line with the live GitHub settings when changing repository rules. Preserve the owner `Basel-Jabari` in the Always bypass list unless the user asks to change it. The file records settings; committing it does not apply them to GitHub.

## Maintain docs

- Find the existing note before adding a new one. Use `docs/` for project knowledge, `docs/ai/` for these shared task guides, and `integration/contracts/` for API agreements.
- Update docs in the same PR when behavior, setup, commands, APIs, design choices, or the working process changes. Keep proposed and working behavior clear.
- Keep one topic per file and link to the main source of a rule. Use topic folders when several related files need them. Keep screenshots under `docs/previews/`.
- Update affected examples, links, commands, and limits. Remove outdated guidance. Do not add README files unless requested.

## Choose checks that fit

For frontend or shared package changes, run `npm test` and `npm run build` from the root when available. For backend work, run the configured checks for that area. For docs-only changes, check relative links, imports, and `git diff --check`; application tests do not need to repeat instruction text.
