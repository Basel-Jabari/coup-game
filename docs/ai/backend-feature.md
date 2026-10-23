# Add or change a backend feature

Use this guide for a FastAPI endpoint, a room/game message, or a backend use case. Start with the [backend rules](../../backend/AGENTS.md). The backend is still planned; inspect the current files and installed tools before choosing commands or adding dependencies.

## Place the change

1. Find the owning feature and its existing contracts and tests. Reuse its module instead of adding a second place for the same business rule.
2. Identify the behavior, caller, permissions, inputs, outputs, and important failure cases. Use the agreed project context. Ask only when missing information would lead to a different implementation.
3. Map the required files before editing. Use the layers below, and skip layers the change does not need. A pure game rule does not need a router or a database table.

| Responsibility | Location |
| --- | --- |
| HTTP endpoint and transport mapping | `backend/app/modules/<feature>/routes.py` |
| External request/response models | `backend/app/modules/<feature>/schemas.py` |
| Business action and permission checks | `backend/app/modules/<feature>/service.py` |
| Database access | `backend/app/modules/<feature>/repository.py` |
| Database table mappings | `backend/app/modules/<feature>/models.py` |
| Rules independent of storage and transport | `backend/app/games/coup/` |
| External service client | `backend/app/integrations/` |

## Build the behavior

- Agree on the API or message format in `integration/contracts/`. Mark drafts as proposals. Update both sides when a shared format changes.
- Define input and output schemas separately from database models. Put simple constraints in types and field limits. Keep private fields out of public schemas.
- Put business checks in the service or game engine. Check the real caller, room membership, ownership, and legal state changes where the action needs them. Routes and background work must reach the same rules.
- Keep HTTP handlers small. Register the router once, give it clear metadata, and map typed errors through shared handlers. Do not put queries or game decisions in routes.
- Reuse services for WebSocket actions. Define what is public, what is visible only to one player, and how stale or repeated messages are handled.
- If data is involved, follow the [data guide](backend-data.md). Keep a complete action atomic so a failed step does not leave half the update saved.
- For an external call, use a dedicated client with typed inputs/outputs, an explicit timeout, and safe error mapping. Retry only when repeating the call is safe. Provide an explicit test replacement through the project's dependency setup.
- Use shared logging for meaningful actions and failures. Include safe identifiers when useful; exclude secrets and hidden game information.

## Verify and document

- Add relevant backend tests under `backend/tests/`, grouped like the owning feature. Cover the result, denied access, invalid state, and meaningful edge cases. Test a response's fields as well as its status.
- Test the pure engine with controlled state and randomness. When turns or results can arrive twice or at the same time, check that the behavior remains correct.
- Add or update integration tests when a public API/message or the frontend boundary changes. Use `integration/mocks/` for shared synthetic examples.
- Run the configured checks for the affected area. Backend commands and coverage rules must be added with the runtime; do not claim a test runner or a coverage target already exists.
- Update the relevant project docs and contracts with behavior, file locations, and remaining limits. Prepare the PR using the [PR guide](pull-requests.md).
