# Security documents

This folder explains the project's security decisions for readers of the graduation report. The rules that code must follow live in `integration/contracts/`; these documents explain them in plain English with references.

The agreed proposal scope and planned security behavior are recorded in [project context](../project-context.md). It covers email codes entered on the website, protected account changes, admin-only hidden-card audit logs, automatic request limits, and disconnections. These planned features are not implemented by the existing password and name checkers.

| Document | Topic | Rules file |
| --- | --- | --- |
| [Password rules](password-policy/password-policy.pdf) ([source](password-policy/password-policy.html)) | How players choose a password, and what the strength bars mean | [password-policy.json](../../integration/contracts/password-policy.json) |
| [Name rules](../../integration/contracts/name-policy.md) | Allowed display names | [name-policy.json](../../integration/contracts/name-policy.json) |

To add or update a document, follow the [security docs guide](../ai/security-docs.md).
