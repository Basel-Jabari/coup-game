# AI tool setup

## Shared instructions

- `AGENTS.md` holds the shared project rules. Codex reads this file. `backend/AGENTS.md` adds rules for backend work.
- `CLAUDE.md` imports `@AGENTS.md`. The backend has the same small entry file. This keeps one copy of each rule and supports Claude Code sessions that do not read `AGENTS.md` directly.
- `docs/ai/` holds shared task guides. The old root `SKILLS.md` has been removed; the guides now have skill entry files in the tool-specific locations below.

Open this repository's `coup-game` folder in the coding tool. In a plain ChatGPT or Claude chat without repository access, share `AGENTS.md` and the guide for the task. Repository files alone do not give a chat access to the local disk.

## Skills

| Skill | Use |
| --- | --- |
| `coup-backend-feature` | Backend file placement, APIs, game actions, and tests. |
| `coup-backend-data` | Queries, transactions, models, and migrations. |
| `coup-pull-request` | Numbered PR titles, clear descriptions, checks, and docs. |

Codex entry files are under `.agents/skills/<name>/SKILL.md`. Claude Code entry files are under `.claude/skills/<name>/SKILL.md`. Each pair has the same small entry file and links to one shared guide. Resolve its relative links from the entry file's folder.

Edit procedures in `docs/ai/`. If a skill name or description changes, update both entry files. Keep the shared rules in `AGENTS.md`, with backend-only rules in `backend/AGENTS.md`. Reopen the repository session if a newly added skill does not appear. The current session's skill list may still reflect the files available when it started.

## Official references

- [OpenAI: project instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
- [OpenAI: local skill locations](https://learn.chatgpt.com/docs/build-skills).
- [Claude Code: shared instructions and imports](https://code.claude.com/docs/en/memory).
- [Claude Code: skill locations](https://code.claude.com/docs/en/skills).
