---
title: "v1.1 — Footer & Icon Improvements"
date: 2026-02-18
summary: "Multi-column footer with social icons, improved icon rendering, and changelog section."
version: "1.1.0"
---

## What's New

- **Multi-column Footer** — New `columns` footer style with logo, tagline, and navigation
- **Social Icons** — Site-wide social links rendered in the footer via `identity.social.links`
- **Icon Rendering** — Robust SVG sizing strategy with `1em` default for inline icons

## Improvements

- Icons now self-size to `1em` by default, eliminating 0px collapse bugs
- Footer branding supports configurable logo height and SVG scaling
- Feature block icons bumped to larger size for better visual presence

## Content

- **Changelog Section** — New standalone section at `/changelog/` using the `date-title-summary` view
