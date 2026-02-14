# Specification

## Summary
**Goal:** Add a blog system with a simple admin UI, support for in-post images, and categories/tags, backed by persistent storage in the Motoko canister.

**Planned changes:**
- Implement backend CRUD for blog posts (id/slug lookup, list, create/update, delete) with fields for title, slug, excerpt, content (including inline images), categories, tags, timestamps, and publish state/date.
- Persist blog posts in stable storage so content remains after canister upgrades.
- Add admin authorization via Internet Identity by restricting blog write operations to an allowlist of admin principals.
- Create public Blog pages: a blog list (published posts, reverse chronological) with category/tag filtering, and a blog detail page that renders post content with embedded images inline.
- Create a simple in-site Blog Admin UI for admins to login/logout, create/edit posts, manage publish state, and embed image blocks (src URL + alt text, optional caption).
- Add Blog navigation links in the site header and footer for easy access.

**User-visible outcome:** Visitors can browse and read published blog posts (with inline images) and filter by category/tag; authenticated admins can log in to create, edit, publish/unpublish, and delete posts through an in-site admin interface.
