# Add or update a security document

Use this guide for a document that explains a security decision, such as the password rules. Follow the [repository rules](../../AGENTS.md).

These documents are for the project team and the graduation report, not only for AI tools. Write for a student who has not read the code. Keep them short, and support every claim with a reference.

## Where files go

```text
docs/security/
  overview.md               # One row for each document. Update it with every change.
  <topic>/
    <topic>.html            # The source. Edit this file.
    <topic>.pdf             # Printed from the HTML. Never edit it by hand.
    <image>.svg|.png        # Pictures used by this document only.
integration/contracts/
  <topic>.json              # Rules that the frontend and backend both apply.
  <topic>.md                # The same rules for developers, marked as a proposal until agreed.
integration/mocks/
  <topic>-cases.json        # Shared test cases. Frontend and backend tests use the same file.
```

Use one short topic name everywhere, for example `password-policy`. A document that only explains, with no rules for code, needs only the `docs/security/<topic>/` files.

## Write the document

1. Agree on the rules with the user first. Write down open questions instead of guessing.
2. Copy the layout of [password-policy.html](../security/password-policy/password-policy.html): title, version and date, status, numbered sections, and a References list.
3. Write in A2–B2 English: short sentences, common words, and an example for each hard idea. Summarize: aim for 1–4 pages, and prefer a table or a short list to a long paragraph.
4. References are required. Give every security claim a numbered reference, such as `<sup>[1]</sup>`, and list the references at the end.
   - Prefer primary sources: NIST, OWASP, RFCs, and peer-reviewed papers. Use a blog only when no primary source exists, and say so.
   - Open each source and check the claim against its words before you write it. If you cannot support a claim, remove it. Never invent a reference, a quote, or a page number.
   - For each reference, give the title, the authors or publisher, the year or version, the link, and the date you read it.
5. Say clearly what is already built and what the backend must still do.

## Print the PDF

Open the HTML in a browser and print it to PDF on A4, with headers and footers off. On Windows, this command does the same:

```bash
msedge --headless=new --no-pdf-header-footer --print-to-pdf="<full-path>/<topic>.pdf" "file:///<full-path>/<topic>.html"
```

Open the PDF and check every page: no cut tables, readable colors, and working links.

## Keep code and documents together

- When a rules file changes, update its cases file, its `.md` file, the PDF, and the frontend checks in `frontend/src/security/` in the same PR.
- Run `npm test`; the shared cases must pass.
- Add the document to [overview.md](../security/overview.md), and mention it in the PR's Docs section.
