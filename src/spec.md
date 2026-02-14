# Specification

## Summary
**Goal:** Switch the app’s canonical public URL to `https://prasadenterprise-epm.caffeine.xyz/` and ensure all user-facing absolute URL references use the new domain.

**Planned changes:**
- Update `SITE_CONFIG.url` in `frontend/src/config/site.ts` to `https://prasadenterprise-epm.caffeine.xyz/` (normalized consistently).
- Replace/remove any hardcoded absolute URL references in the frontend that still point to `https://prasadenterprise.caffeine.xyz`, `https://www.prasadenterprise.caffeine.xyz`, or any draft domain such as `https://significant-blush-1gq-draft.caffeine.xyz/`.
- Ensure any user-facing navigation or guidance to the admin area references the admin route on the new domain (domain change only; keep existing admin paths/routes).

**User-visible outcome:** Links, canonical/primary site URL displays, and any admin-area pointers consistently use `https://prasadenterprise-epm.caffeine.xyz/`, and the admin area is reachable on the new domain without relying on draft/preview URLs.
