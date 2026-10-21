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

## House style
@/mnt/otlet-shared/HOUSE-STYLE.md

The line above loads the OTLET house style (identity, voice and spelling, color,
typography, the index-card concept, logo and imagery) from
`/mnt/otlet-shared/HOUSE-STYLE.md`, mounted read-only from the Mac
(`~/CodeProjects/OTLET-SHARED`, a git repository there).

- Brand rules come from the house style. This file covers how the site implements
  them (CSS tokens, Jekyll structure, assets). If the two conflict, ask the user; do
  not choose.
- The house style cannot be edited from the container. To propose a change: copy it
  to `HOUSE-STYLE.proposed.md` in the project root, edit the copy, run
  `diff -u /mnt/otlet-shared/HOUSE-STYLE.md HOUSE-STYLE.proposed.md > house-style.patch`,
  and tell the user. The user reviews and applies the patch on the Mac. Delete both
  files once it is applied or rejected. Both are git-ignored and excluded from the site.
- If `/mnt/otlet-shared` is missing, the container was built before the mount was
  added: ask the user to rebuild. Do not work from an old copy.

## Implementation of the house style
- Colors: each house-style color is a CSS variable of the same name in `:root` of
  `css/site.css` (`--purple-dark`, `--purple`, `--purple-mid`, `--purple-muted`,
  `--lavender`, `--mist`, `--manila-deep`, `--manila`, `--manila-light`, `--white`).
  Use the variables, never hex values, except the tab hover fill `#F6ECCA` (halfway
  between manila and manila-light).
- Fonts: the variables `--font-heading` (Jost), `--font-body` (Fira Sans),
  `--font-mono` (Fira Code) and `--font-serif` (Source Serif 4); files under `fonts/`.

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
| `Otlet_emblem.png` | Emblem, full color. |
| `otlet_emblem_1c_purple.png`, `otlet_emblem_1c_black.png`, `otlet_emblem_reversed_white.png` | One-color emblems. The white one is for dark or purple backgrounds. |
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
record's catalog data (`.meta`: classification number, heading, date) sits in a left
margin column under a purple rule; below that width it is one line above the content.
Figures (`.figure`) are framed like comic-strip panels (3px `purple-dark` ink line, a
`manila-light` mat, a `manila-deep` hairline at its edge). The Lineage figures have no
caption; the `figcaption` style (Fira Code, `Fig. n`) remains for later use. In running text, put the figure first inside its `.prose` block with
`figure-right` or `figure-left`: from 40rem wide it floats at 60% of the column width and
the text wraps round it; narrower, it is full width. The 38em measure is set on
`.prose > p`, not on `.prose`, so floated figures align with the column edge. Entry cards
(`.entries`/`.entry`) are catalog cards. Text still to be written is marked
`.placeholder` (dashed outline); none may remain at publication.

The historical facts on both pages were drafted from model knowledge, not checked
sources; verify them (Mundaneum archives; Rayward, *The Universe of Information*, 1975)
before publishing.

Page images are in `assets/images/` (WebP from the less saturated
`Otlet_transformed_photograph/image1_612387.jpg` and `image6_612387.jpg`). They are
git-ignored until publication. The original photographs are public domain (user,
2026-10-21). Before a page that uses them is published: record who made the purple
engraving-style transformations and the source of each original photograph, then
whitelist the images in `.gitignore`.

Visual rules (color use, line style, contrast): see the house style.

## Fonts (`fonts/`)
Latin-subset WOFF2 files from Fontsource (jsDelivr, pinned versions), each family with
its OFL license text: Fira Sans 400/400 italic/500/500 italic/700, Jost 600, Fira Code 400,
Source Serif 4 400/400 italic/600. The Source Serif 4 license is Adobe's original
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
- `vendor/bundle` lives in the project folder, so installed gems survive a container
  rebuild; Ruby itself does not.
- Headless checks use Playwright with Chromium. It is not part of the project or the
  image: install it in the session scratchpad (`npm install playwright`, then
  `npx playwright install --with-deps chromium`) when needed. Render at desktop
  (1280 px) and mobile (390 px) widths and check for failed requests, unloaded fonts
  and horizontal page scroll.

## Environment and publishing
- Dev container. Read-only inside it: `.devcontainer/`, `.vscode/` and
  `claude-devcontainer.sh` (they run on the Mac; edit them there), the managed
  settings, and `/mnt/otlet-shared`. Anything installed with `apt` or `gem` is lost
  when the container is rebuilt.
- GitHub: `gh` holds a fine-grained token, and git uses it for github.com through
  gh's credential helper. The token can push to `YvesMoreau/otlet-tech`. Claude
  sessions are denied `gh` commands by the managed settings; there is no rule against
  `git push`.
- Push only when the user asks. A push to `main` deploys to otlet.tech within about a
  minute. Before pushing, check that no git-ignored draft (pages, images, notes) has
  been staged.

## Conventions
- Self-host the fonts (OFL permits it) rather than loading from a third-party CDN.
- Contrast: WCAG AA for every text/background pair (ratios in the house style).
- `.gitignore` tracks only the assets the page uses (a whitelist under `assets/*`). When
  the page starts using another asset, add a `!assets/<file>` line, or it will not be
  committed or published. Unused source files stay on disk, untracked.
- `.devcontainer/`, `.vscode/` and `claude-devcontainer.sh` are environment files and
  are git-ignored. Do not commit them.

## Open questions
- Work, Writing and Contact pages: not yet written, so no tabs.
- Whether `/` stays the "Coming soon" page or becomes the About page at launch.
