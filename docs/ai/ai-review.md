# Independent AI review

Before you commit and push frontend work, ask the other AI tool for a read-only review: Codex reviews Claude's work, and Claude reviews Codex's work. Use it for other large code changes when a second view helps. The user allows both tools to run with the accounts already signed in on this PC.

## Steps

1. Write a short notes file inside the repository, for example under the ignored `.review/` folder. Include the user's requirements and the design values you checked. For visible changes, add local Figma references and browser screenshots.
2. Run `node scripts/ai-review.mjs --reviewer codex --notes <notes-file>` (or `--reviewer claude`). The default base is `origin/main`; use `--base <branch>` for a stacked PR. Use `--dry-run` to see the command without sending a request.
3. Read the findings and check each one yourself. Fix the valid ones and run the checks again. Ask for another review only when the fixes need one.
4. Write the result in the PR's Checks section: the verdict, what changed because of it, and what the reviewer could not check. Never invent a result when a review could not run.

## Limits

- The script sends the diff and notes. It checks that no project file changed during the review and saves the answer to `.review/<reviewer>/latest.md`.
- Codex runs with `--sandbox read-only`: it can read files and run commands, but it cannot write files.
- Claude runs in safe and restricted mode with only Read, Glob, and Grep. Hooks, custom settings, MCP servers, and shell tools are off.
- The reviewer reads code and images only. It does not use a browser, so the implementing tool still checks the real page and runs the tests.
- A review uses the account's model and usage limits. If sign-in or a usage limit stops it, report that and keep the work ready for review. It does not replace the human review that GitHub requires.
- If a command is not on `PATH`, set `CODEX_BIN` or `CLAUDE_BIN` to its full path.

References: [Codex non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode), [Claude Code programmatic usage](https://code.claude.com/docs/en/headless).
