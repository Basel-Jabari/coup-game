# Backend rules

These rules apply to `backend/` and extend the [repository rules](../AGENTS.md). Read the relevant [feature guide](../docs/ai/backend-feature.md) or [data guide](../docs/ai/backend-data.md) for task steps.

## File organization

Use one modular FastAPI application. Group business areas by feature, then separate their responsibilities. This is the target layout, not a request to create empty files:

```text
backend/
  app/
    main.py                      # Build the app and register routes and handlers.
    core/                        # Shared settings, auth dependencies, errors, logging.
    db/                          # Shared connection/session setup and model base.
    modules/
      auth/                      # Example feature; add other areas as needed.
        routes.py                # HTTP endpoints and transport mapping.
        schemas.py               # Pydantic request and response models.
        service.py               # Use cases, permissions, and business rules.
        repository.py            # Database reads and writes for this feature.
        models.py                # Database table mappings for this feature.
    games/coup/                  # Pure game state, rules, and legal actions.
    integrations/                # Clients for email, payments, or other services.
  migrations/                    # Schema history once a migration tool is set up.
  tests/                         # Backend tests, grouped by feature or game.
```

Keep small features small. Add only the files a working change needs. Split a file by responsibility when it grows; avoid large catch-all files such as a shared `utils.py` for unrelated business logic. Keep helpers with their feature until they are truly shared. Keep `__init__.py` files light, without starting services or making network calls.

## Dependency direction

- Routes use schemas, shared request dependencies, and services. Keep request parsing and response mapping here, without SQL or business decisions.
- Schemas describe external input and output. Keep database table mappings in `models.py` and game state in the game package.
- Services run use cases. They check permissions, ownership, business limits, and allowed state changes, using repositories and integration clients as needed.
- Repositories use database models and the supplied session. They do not import routes or services, open hidden transactions, or commit on their own.
- External clients handle a service's requests, responses, timeouts, and errors. Business rules stay in the owning service.
- The pure Coup engine does not depend on FastAPI, database access, or network clients. Pass it the state and input it needs. Make time and randomness controllable in tests.
- Shared `core/` and `db/` code must not import feature modules. Other features call an owning service or a clear shared interface, rather than changing its tables directly.

## API and business rules

Use type hints on new Python functions. Give HTTP endpoints clear request/response models, status codes, summaries, and tags. Use Pydantic types and field limits for input shape. Use service or game rules for permissions, room membership, turn order, and other business checks. Avoid checking the same field shape again after it was already validated.

Get the current player from a validated server session. Apply the same permissions and game rules to HTTP and WebSocket actions. Typed application errors are mapped to safe responses in shared handlers; avoid repeated catch-log-raise blocks in every route.

The server owns game results, prices, inventory, balances, and rewards. Return only the game information the current player may see. A full internal game state must never become a public response by default. Do not log passwords, tokens, payment secrets, or hidden cards.

## Data and tests

Keep one clear transaction boundary for each write use case, managed by the service through the shared database setup. Schema changes need a matching migration once the database layer is introduced. Use parameterized queries and batch related reads.

Backend tests belong under `backend/tests/`, outside application code. Tests across the frontend/API boundary belong under `integration/tests/`; shared API formats belong under `integration/contracts/`. Mirror feature names in tests so the matching checks are easy to find.

Test game rules without a web server or database. For database behavior, use isolated test data and verify rollback and relevant MySQL constraints. External clients use explicit test replacements; production code must not import tests or switch silently to fake success.
