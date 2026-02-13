# Specification

## Summary
**Goal:** Set the app’s primary site URL to `https://prasadenterprise.caffeine.xyz/` (no `www`) and remove any draft/incorrect URL references from the frontend.

**Planned changes:**
- Update `SITE_CONFIG.url` to exactly `https://prasadenterprise.caffeine.xyz` (no `www`).
- Remove/replace any frontend occurrences of `significant-blush-1gq-draft.caffeine.xyz` in user-facing text, links, or metadata derived from `SITE_CONFIG`.
- Ensure the `https://www.prasadenterprise.caffeine.xyz` variant is not used anywhere as the primary site URL in user-facing UI copy, links, or metadata derived from `SITE_CONFIG`.

**User-visible outcome:** Any displayed or linked “primary site URL” (if present) will consistently use `https://prasadenterprise.caffeine.xyz/`, and the draft/`www` variants will no longer appear in the UI.
