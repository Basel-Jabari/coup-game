# Backend data and schema changes

Use this guide when adding or changing a query, transaction, table, index, or migration. Follow the [backend rules](../../backend/AGENTS.md). MySQL is planned, but its library and migration tool are not installed yet. Use the chosen project tools when that setup is added.

## Place models and queries

- Keep feature table mappings in that feature's `models.py` and queries in `repository.py`. Keep shared engine/session setup in `backend/app/db/`.
- Keep request/response schemas in `schemas.py`. Return only the fields the caller is allowed to see, rather than sending database objects directly.
- Reuse the existing database setup. Do not add a second engine, global request session, or another repository's private database helpers.
- Bind query values as parameters. Choose dynamic column or sort names from a fixed list in code. Batch related reads instead of making one query for every row.
- Add constraints and indexes that support the actual access pattern. Use unique constraints for actions that must only happen once.

## Keep writes complete

1. Find the service that owns the full business action. Give it one clear commit/rollback boundary through the shared database setup.
2. Pass the same session to the needed repositories. Repositories do not commit or open a second hidden transaction.
3. Check how another request could change the same data. Use the chosen database's locking, version, or uniqueness support where needed. Keep authorization and business checks valid at the time of the write.
4. For repeated game results, rewards, or payment events, use a stable operation ID and an enforced uniqueness rule. A retry must not credit the same result twice.
5. Keep slow external calls outside held database locks where possible. If a workflow spans an external service and the database, explain how it recovers from a failed step before implementing it.

## Change the schema with the code

- Set up a supported migration tool with the first persistent schema. Store schema history under `backend/migrations/`.
- Include the model change, migration, fixtures, and affected code in the same PR. Add a new migration rather than editing one that was already applied.
- Check the previous schema, existing data, null/default values, and the order of changes. Give the rollback path, or explain why a data change cannot be safely reversed.
- Test an upgrade on an isolated database. Test rollback when it is supported. Do not apply a migration to a real shared environment as part of a local check.

## Verify the result

Keep database tests under `backend/tests/` with isolated data. Check real behavior: constraints, rollback after a failed step, repeated requests, and conflicts that affect the change. Use MySQL for claims about MySQL behavior; a mock or another database does not prove those properties.

Run the backend checks that exist and report any service needed to run them. Update the affected docs and API contract when the data change affects users or the frontend. Follow the [PR guide](pull-requests.md) and describe any migration work needed before release.
