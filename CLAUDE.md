# OTLET web site

## Project
Static web site for an organization called OTLET, published with GitHub Pages
from `YvesMoreau/otlet-tech` (branch `main`) at https://otlet.tech
(`www.otlet.tech` redirects to the apex). The `CNAME` file must stay in the repo root.

The site emphasizes the lineage of the organization with the work of Paul Otlet,
Henri La Fontaine, and Léonie La Fontaine.

Built with Jekyll (3.10.0, the version GitHub Pages runs), which GitHub Pages builds on
push. `index.html` has no front matter, so Jekyll copies it unchanged: it is still the live
"Coming soon" page.

## Colour palette
The three brand colours are purple, lavender and white. The rest extend them.
Contrast ratios are WCAG 2.x.

| Family | CSS variable | Hex | Role |
|---|---|---|---|
| Purple | `--purple-dark` | `#3A1556` | Long-form body text, footers, dark sections |
| | `--purple` | `#612387` | Brand colour: logo, headings, links, buttons |
| | `--purple-mid` | `#8040B0` | Hover and focus states, secondary accents (large text only) |
| | `--purple-muted` | `#715785` | Secondary text: labels, inactive tabs, footer, attributions (purple-dark mixed 72% with white). On white 6.17, manila-light 5.65, manila 4.78 |
| Lavender | `--lavender` | `#CFBDF5` | Brand accent surfaces, tags, borders. Not for text on light backgrounds |
| | `--mist` | `#F1EBFC` | Panels and cards on lavender or white pages |
| Manila | `--manila-deep` | `#D9C48A` | Rules, borders, dividers. Decoration only, not for text |
| | `--manila` | `#F2E2B0` | Accent surfaces: cards, badges, callouts |
| | `--manila-light` | `#FAF5E3` | Default page background (manila mixed 65% with white) |
| Neutral | `--white` | `#FFFFFF` | Text on dark purple, inputs, white panels |

Manila refers to the catalogue cards of Otlet's Répertoire (see the concept below).

Text on the default background (`--manila-light`): `purple-dark` 13.53, `purple` 9.17,
`purple-mid` 5.87. Text on `--purple-dark`: white 14.77, `manila-light` 13.53,
`lavender` 8.62. `mist` and `manila-light` are nearly the same lightness (1.07:1), as are
`white` and `manila-light` (1.09:1), so separate them with a border, not by colour alone. There is no black or grey: `purple-dark` is the near-black.

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
| `Otlet_stacked.png` | Stacked logo layout (source, 1663×2314). |
| `Otlet_stacked.webp` | 1000 px wide WebP of the stacked logo, used on the page with the PNG as fallback. |
| `icons/` | `icon-192.png`, `icon-512.png` (transparent, for the manifest) and `apple-touch-icon.png` (180 px, on manila-light). |
| `Otlet_wordmark_plain.png`, `Otlet_wordmark_fancy.png` | Wordmark variants. |
| `Otlet_wordmark_fancy.webp`, `Otlet_wordmark_fancy_1200.png` | Fancy wordmark trimmed to its content, 1200×276, transparent. Site header (WebP with PNG fallback), with the tagline set as live text to its right. |
| `Otlet_lateral.webp`, `Otlet_lateral_1400.png` | Trimmed lateral logo, 1400×529. Tried as the header, not used; untracked. |
| `Otlet_emblem.png` | Emblem, full colour. |
| `otlet_emblem_1c_purple.png`, `otlet_emblem_1c_black.png`, `otlet_emblem_reversed_white.png` | One-colour emblems. The white one is for dark or purple backgrounds. |
| `Otlet_favicon.svg` | Favicon source (purple ring). The cleaned, square-viewBox copy served by the site is `favicon.svg` in the repo root, with `favicon.ico` (16/32/48) and `site.webmanifest`. |

## Site structure (Jekyll)
| Path | Role |
|---|---|
| `_config.yml` | Site title, description, URL; `exclude` keeps `CLAUDE.md`, `Gemfile` etc. out of the build |
| `_layouts/default.html` | Shared page: head, header, tabs, `main.card`, footer. Pages set `layout: default` |
| `_includes/site-header.html`, `tabs.html`, `site-footer.html` | Header (wordmark + live tagline), divider tabs, footer |
| `_data/nav.yml` | The tabs, in order. The active tab is the one whose `url` equals `page.url`. Add a tab only when its page has content |
| `about.html` (`/about/`) | 001 About, 002 Principles (entry cards), 003 Our name (teaser linking to Lineage) |
| `lineage.html` (`/lineage/`) | 001 A century-old question (Otlet, Henri and Léonie La Fontaine, Fig. 1), 002 Why it matters now (Fig. 2) |
| `css/site.css` | Tokens, `@font-face` rules and all components |

Page front matter: `title`, `permalink`, optional `description`, and `noindex: true` while
the page is a draft. `body_class: long-form` sets the page's running text (`.prose > p`) in
Source Serif 4 at 1.125rem; Lineage uses it, About stays in Fira Sans. Use `relative_url` for every internal link and asset path, since
pages live in subfolders.

`about.html` and `lineage.html` are git-ignored, so they are not published. To publish a
page: remove its line from `.gitignore`, drop `noindex`, clear its `.placeholder` text, and
whitelist the images it uses.

Components: divider tabs (`nav.tabs`, active tab marked with `aria-current="page"` and
joined to the card below; each tab is an isosceles trapezoid with 75° base angles, drawn
with `clip-path` from an explicit `--tab-h`, so change heights through that variable).
`main.card` holds `.record` sections separated by 1px rules. From 52rem wide, each
record's catalogue data (`.meta`: classification number, heading, date) sits in a left
margin column under a purple rule; below that width it is one line above the content.
Figures (`.figure`) are framed like comic-strip panels (3px `purple-dark` ink line, a
`manila-light` mat, a `manila-deep` hairline at its edge). The Lineage figures have no
caption; the `figcaption` style (Fira Code, `Fig. n`) remains for later use. In running text, put the figure first inside its `.prose` block with
`figure-right` or `figure-left`: from 40rem wide it floats at 60% of the column width and
the text wraps round it; narrower, it is full width. The 38em measure is set on
`.prose > p`, not on `.prose`, so floated figures align with the column edge. Entry cards
(`.entries`/`.entry`) are catalogue cards. Text still to be written is marked
`.placeholder` (dashed outline); none may remain at publication.

The historical facts on both pages were drafted from model knowledge, not checked
sources; verify them (Mundaneum archives; Rayward, *The Universe of Information*, 1975)
before publishing.

Page images are in `assets/images/` (WebP from the less saturated
`Otlet_transformed_photograph/image1_612387.jpg` and `image6_612387.jpg`). They are
git-ignored: confirm the rights to the source images, then whitelist them in
`.gitignore`, before a page that uses them is published.

Visual rules: purple is reserved for headings, the active tab and links; running text is
`purple-dark`; secondary text is `purple-muted`. One border language: 1px `manila-deep`
lines, no drop shadows, no coloured top bars on cards.

## Fonts (`fonts/`)
Latin-subset WOFF2 files from Fontsource (jsDelivr, pinned versions), each family with
its OFL licence text: Fira Sans 400/400 italic/500/500 italic/700, Jost 600, Fira Code 400,
Source Serif 4 400/400 italic/600. The Source Serif 4 licence is Adobe's original
(`adobe-fonts/source-serif`), since Fontsource's copy lacks the copyright line.

## Local preview
- `bundle exec jekyll serve --host 127.0.0.1 --port 4000`, then open
  `http://127.0.0.1:4000/about/`. It rebuilds on save (not on `_config.yml` changes).
  The `Gemfile` pins the `github-pages` gem; gems install into `vendor/bundle`
  (`bundle config set --local path vendor/bundle`, then `bundle install`).
- The container image has neither Ruby nor the full Python standard library. Until the
  dev container provides them: `sudo apt-get install -y ruby-full build-essential
  zlib1g-dev python3`, then `gem install --user-install bundler` and add
  `$(ruby -e 'print Gem.user_dir')/bin` to `PATH`.
- Headless checks use Playwright with Chromium (installed outside the repo so far).
  Render at desktop (1280 px) and mobile (390 px) widths and check for failed
  requests, unloaded fonts and horizontal page scroll.

## Conventions
- Self-host the fonts (OFL permits it) rather than loading from a third-party CDN.
- Keep text/background pairs accessible (WCAG AA contrast). Purple on white passes;
  check lavender before using it for text.
- `.gitignore` tracks only the assets the page uses (a whitelist under `assets/*`). When
  the page starts using another asset, add a `!assets/<file>` line, or it will not be
  committed or published. Unused source files stay on disk, untracked.
- `.devcontainer/`, `.vscode/` and `claude-devcontainer.sh` are environment files and
  are git-ignored. Do not commit them.

## Open questions
- Work, Writing and Contact pages: not yet written, so no tabs.
- Whether `/` stays the "Coming soon" page or becomes the About page at launch.
