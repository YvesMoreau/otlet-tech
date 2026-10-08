# OTLET web site

## Project
Static web site for an organization called OTLET, published with GitHub Pages
from `YvesMoreau/otlet-tech` (branch `main`) at https://otlet.tech
(`www.otlet.tech` redirects to the apex). The `CNAME` file must stay in the repo root.

The site emphasizes the lineage of the organization with the work of Paul Otlet,
Henri La Fontaine, and Léonie La Fontaine.

Start as plain static HTML/CSS. Jekyll or another generator is deferred until the
site has enough pages to need shared layouts.

## Colour palette
The three brand colours are purple, lavender and white. The rest extend them.
Contrast ratios are WCAG 2.x.

| Family | CSS variable | Hex | Role |
|---|---|---|---|
| Purple | `--purple-dark` | `#3A1556` | Long-form body text, footers, dark sections |
| | `--purple` | `#612387` | Brand colour: logo, headings, links, buttons |
| | `--purple-mid` | `#8040B0` | Hover and focus states, secondary accents (large text only) |
| Lavender | `--lavender` | `#CFBDF5` | Brand accent surfaces, tags, borders. Not for text on light backgrounds |
| | `--mist` | `#F1EBFC` | Panels and cards on lavender or white pages |
| Manila | `--manila-deep` | `#D9C48A` | Rules, borders, dividers. Decoration only, not for text |
| | `--manila` | `#F2E2B0` | Accent surfaces: cards, badges, callouts |
| | `--manila-light` | `#F8F0D8` | Default page background |
| Neutral | `--white` | `#FFFFFF` | Text on dark purple, inputs, white panels |

Manila refers to the catalogue cards of Otlet's Répertoire (see the concept below).

Text on the default background (`--manila-light`): `purple-dark` 12.98, `purple` 8.79,
`purple-mid` 5.63. Text on `--purple-dark`: white 14.77, `manila-light` 12.98,
`lavender` 8.62. `mist` and `manila-light` are nearly the same lightness (1.02:1), so
do not place them side by side. There is no black or grey: `purple-dark` is the near-black.

## Typography
| Role | Font | Rationale |
|---|---|---|
| Wordmark | Jost Heavy | Taken from `assets/Otlet_lateral.png`. 1920s geometric (Futura-style) lineage, contemporary with Otlet's Mundaneum. |
| Tag line | Fira Sans | Taken from `assets/Otlet_lateral.png`. "Own The Limits" in Bold, "Ethics in Tech" in Italic. |
| Headings | Jost | Continuity with the wordmark. |
| Body text and interface | Fira Sans | Continuity with the tagline. Designed for screens, full weight range, legible at small sizes. |
| Metadata, labels, code | Fira Code (or Fira Mono) | Bridge between the two dimensions: evokes the typewritten index card of Otlet's Répertoire and modern code. Same Fira family, so no new design language. OFL licence. |
| Long-form and quotations | Source Serif 4 | Gives essays and quotations a historical, bookish register. Calm and highly readable. OFL licence. |

## Concept: the index card as an interface pattern
The monospace carries the historical reference structurally, not decoratively.
Set dates, tags, authors and section numbers like catalogue-card entries, e.g. a
classification-style label such as `004.8 · Ethics · 2026-10` above an article
title. This ties Otlet's classification work to present-day metadata and tagging.
Do not use ornamental "vintage" fonts.

## Assets (`assets/`)
| File | Notes |
|---|---|
| `Otlet_lateral.png` | Wordmark with tagline, horizontal layout. Typographic source for wordmark and tag line. |
| `Otlet_stacked.png` | Stacked logo layout. |
| `Otlet_wordmark_plain.png`, `Otlet_wordmark_fancy.png` | Wordmark variants. |
| `Otlet_emblem.png` | Emblem, full colour. |
| `otlet_emblem_1c_purple.png`, `otlet_emblem_1c_black.png`, `otlet_emblem_reversed_white.png` | One-colour emblems. The white one is for dark or purple backgrounds. |
| `Otlet_favicon.svg` | Favicon. |

## Conventions
- Self-host the fonts (OFL permits it) rather than loading from a third-party CDN.
- Keep text/background pairs accessible (WCAG AA contrast). Purple on white passes;
  check lavender before using it for text.
- `.devcontainer/`, `.vscode/` and `claude-devcontainer.sh` are environment files and
  are git-ignored. Do not commit them.

## Open questions
- Pages, content and navigation for the site are not yet defined.
