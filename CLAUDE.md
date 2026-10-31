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
  Use the variables, never hex values.
- Fonts: the variables `--font-head` (Jost), `--font-body` (Fira Sans),
  `--font-code` (Fira Code) and `--font-serif` (Source Serif 4), as named in template B;
  self-hosted from `fonts/`. The template loaded them from Google Fonts; that was replaced.

## Assets (`assets/`)
| File | Notes |
|---|---|
| `Otlet_lateral.png` | Wordmark with tagline, horizontal layout. Typographic source for wordmark and tag line. |
| `Otlet_stacked.png` | Stacked logo layout (source, 1663×2314). |
| `Otlet_stacked.webp` | 1000 px wide WebP of the stacked logo, used on the page with the PNG as fallback. |
| `icons/` | `icon-192.png`, `icon-512.png` (transparent, for the manifest) and `apple-touch-icon.png` (180 px, on manila-light). |
| `Otlet_wordmark_plain.png`, `Otlet_wordmark_fancy.png` | Wordmark variants. |
| `Otlet_wordmark_fancy.webp`, `Otlet_wordmark_fancy_1200.png` | Fancy wordmark trimmed to its content, 1200×276, transparent. Header of template A; unused and untracked since 2026-10-28. |
| `otlet-wordmark.webp` (417×96), `otlet-emblem.webp` (560×560), `og-image.jpg` (1200×630) | From template B: top-bar wordmark, Home hero emblem, social-sharing image. |
| `Otlet_lateral.webp`, `Otlet_lateral_1400.png` | Trimmed lateral logo, 1400×529. Tried as the header, not used; untracked. |
| `Otlet_emblem.png` | Emblem, full color. |
| `otlet_emblem_1c_purple.png`, `otlet_emblem_1c_black.png`, `otlet_emblem_reversed_white.png` | One-color emblems. The white one is for dark or purple backgrounds. |
| `Otlet_favicon.svg` | Favicon source (purple ring). The cleaned, square-viewBox copy served by the site is `favicon.svg` in the repo root, with `favicon.ico` (16/32/48) and `site.webmanifest`. |

## Site structure (Jekyll): template B, "the bounded disk"
Adopted 2026-10-26 from `misc/otlet-site-b.zip` (a static five-page template). Pages are
stacked full-width color bands; small rings, taken from the emblem's edge, mark the
current menu item and timeline points.

| Path | Role |
|---|---|
| `_config.yml` | Site title, description, URL; `exclude` keeps `CLAUDE.md`, `Gemfile` etc. out of the build |
| `_layouts/default.html` | Head (meta, Open Graph, JSON-LD), top bar, `<main id="main">`, footer. Pages set `layout: default` and supply the bands |
| `_includes/site-header.html` | Top bar: wordmark, live tagline, menu from `_data/nav.yml` (current item: `aria-current="page"`); tabs or ring menu per `_data/options.yml` |
| `_includes/site-footer.html` | Dark footer: name, tagline, page links from `_data/nav.yml`, credit line |
| `_data/nav.yml` | Menu and footer links, in order: Home, About, Advocacy, Education, Lineage, Contact |
| `home.html` (`/home/`) | Home: hero with emblem; dark band with Report and News Item boxes and a YouTube video facade (thumbnail `assets/images/video-rqHdQIuQNMo.webp`, from YouTube; the player loads only on click, from youtube-nocookie.com); Advocacy rows, quotation, call to action. Lorem ipsum |
| `about.html` (`/about/`) | Banner, principles (dark band), article with contents rail (What we do, Our name), call to action |
| `lineage.html` (`/lineage/`) | Banner, article: the three founders (ring portraits), the Répertoire (Fig. 1), timeline, why it matters now (Fig. 2) |
| `advocacy.html` (`/advocacy/`) | Banner, index rows (`301`…), three-point dark band, call to action. Lorem ipsum. Formerly Programs (`/programs/`) |
| `education.html` (`/education/`) | Banner, index rows (`401`…), call to action. Lorem ipsum |
| `contact.html` (`/contact/`) | Lorem ipsum. The contact form is not connected to any mail service; a short inline script says so on submit |
| `css/site.css` | Template B stylesheet with the project's `@font-face` rules prepended, plus `.placeholder` and `.plate` |

`index.html` stays the live "Coming soon" page, so Home lives at `/home/` for now. At
launch: move the home page to `/` (replace `index.html`), point the wordmark link and the
Home menu item at `/`, and add `robots.txt` and a sitemap (the template's versions list
`.html` URLs, not these permalinks).

Page front matter: `title` (omit on Home), `permalink`, optional `description`, and
`noindex: true` while the page is a draft. Use `relative_url` for every internal link and
asset path.

All six pages are git-ignored, so they are not published. To publish a page: remove its
line from `.gitignore`, drop `noindex`, clear its `.placeholder` text, and whitelist the
assets it uses (`otlet-wordmark.webp`, `otlet-emblem.webp`, `og-image.jpg` are used by the
layout or Home and are not yet whitelisted).

Components (class names from the template): `.band` with `.band-light` (manila-light),
`.band-white`, `.band-dark` (purple-dark), `.band-lavender`; `.banner` (page title with
breadcrumb `.crumbs`); `.hero`; `.limits`/`.limit` (three numbered points); `.rows` (index
rows with a catalog label and an arrow); `.quote`; `.cta`; `.article` with a sticky `.toc`
and `.content` sections; `.prose` (Source Serif 4, 38em measure); `.people`/`.person`
(ring portraits); `.timeline`; `.facts` (definition list); `.tile`; `.btn-primary`/`.btn-ghost`;
`.label` (Fira Code catalog label). Additions: `.plate` frames an illustration as a
comic-strip panel (house style, section 5); `.placeholder` marks text still to be written
(dashed outline); none may remain at publication.

Menu: `_data/options.yml` sets `menu: tabs`, which draws the menu as divider tabs
(`_includes/nav-tabs.html`, `css/tabs.css`, loaded only in that case): right-aligned
beside the logo on the top bar's bottom rule, unnumbered, overlapping, with rounded
tops and flared bottoms. `clip-path: shape()` draws the curves; browsers without it get
sharp trapezoids. Any other value restores the template B top-bar menu with ring markers
(`.menu` in `css/site.css`), kept as the alternative.

The house style describes this version: the tabs in section 4, and template B's bands,
pill buttons, rounded tiles and dark footer in section 4.1 (applied 2026-10-28).

The historical facts on About and Lineage were drafted from model knowledge, not checked
sources; verify them (Mundaneum archives; Rayward, *The Universe of Information*, 1975)
before publishing.

Page images are in `assets/images/` (WebP from the less saturated
`Otlet_transformed_photograph/image1_612387.jpg` and `image6_612387.jpg`; the Lineage
portraits `portrait-*.webp`, 320 px, from `trio_*_612387_round.png`). They are
git-ignored until publication. The original photographs are public domain (user,
2026-10-21). Before a page that uses them is published: record who made the purple
engraving-style transformations and the source of each original photograph, then
whitelist the images in `.gitignore`.

## Fonts (`fonts/`)
Latin-subset WOFF2 files from Fontsource (jsDelivr, pinned versions), each family with
its OFL license text: Fira Sans 400/400 italic/500/500 italic/700, Jost 600, Fira Code 400,
Source Serif 4 400/400 italic/600. The Source Serif 4 license is Adobe's original
(`adobe-fonts/source-serif`), since Fontsource's copy lacks the copyright line.

## Local preview
- `bundle exec jekyll serve --host 127.0.0.1 --port 4000`, then open
  `http://127.0.0.1:4000/home/`. It rebuilds on save (not on `_config.yml` changes).
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
- Home, Advocacy, Education, and Contact: Lorem ipsum only.
- Whether `/` stays the "Coming soon" page or becomes the About page at launch.
