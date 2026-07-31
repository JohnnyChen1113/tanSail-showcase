# Security policy

## Supported versions

TanSail is pre-1.0 software. Security fixes are applied to the latest tagged `0.1.x` release and
the `main` branch.

| Version                                 | Supported |
| --------------------------------------- | --------- |
| `0.1.x`                                 | Yes       |
| Unreleased branches and older snapshots | No        |

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Submit a private report through
[GitHub Security Advisories](https://github.com/JohnnyChen1113/tanSail/security/advisories/new) with:

- the affected version or commit;
- reproduction steps or a minimal proof of concept;
- the expected impact;
- any suggested mitigation.

Remove real credentials, personal data, and third-party secrets from the report. Maintainers will
acknowledge a report as soon as practical, validate the impact, coordinate a fix, and credit the
reporter when requested. Please allow a reasonable remediation window before public disclosure.

## Project boundaries

The default starter intentionally has no authentication, database, billing, email, analytics, or
required secrets. Projects that add optional integrations are responsible for their own threat
model, secret management, authorization, dependency updates, and Cloudflare bindings.
