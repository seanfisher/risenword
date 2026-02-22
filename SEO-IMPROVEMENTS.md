# Risen Word — SEO Improvement Plan

> Generated 2026-02-22 after a full audit of templates, meta tags, structured data, content pages, and build config.
> Items are grouped by priority. Each item is a self-contained task an AI agent can pick up and execute.

---

## Priority 1 — Critical (high impact, easy wins)

### 1.1 Add Canonical URLs

**Where:** `_includes/base.njk` `<head>`

**Status:** ✅ Done (2026-02-22)

Currently there is no `<link rel="canonical">`. Without it, search engines may index duplicate URLs (trailing slashes, query params, www vs non-www).

**Action:** Add a canonical link tag in the `<head>` of `base.njk`:
```html
<link rel="canonical" href="{{ site.url }}{{ page.url }}">
```

---

### 1.2 Complete Open Graph & Twitter Card Tags

**Where:** `_includes/base.njk` `<head>`

The site has `og:title`, `og:description`, and `og:url` but is missing:

- `og:type` (should be `"website"` for most pages, `"article"` for poems)
- `og:image` (a default share image for the site — critical for social previews)
- `og:site_name`
- `og:locale`
- Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

**Action:**
1. Create a default Open Graph share image (1200×630px) and place it in `/images/og-default.jpg`.
2. Add the following to `<head>` in `base.njk`:
```html
<meta property="og:type" content="{% if layout == 'poem.njk' %}article{% else %}website{% endif %}">
<meta property="og:site_name" content="{{ site.title }}">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="{{ site.url }}/images/og-default.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ title or site.title }}">
<meta name="twitter:description" content="{{ description or site.description }}">
<meta name="twitter:image" content="{{ site.url }}/images/og-default.jpg">
```

---

### 1.3 Add Unique `description` Front Matter to Every Poem

**Where:** Each file in `poems/2025/*.md` (and future years)

**Status:** ✅ Done (2026-02-22)

Most poems have no `description` field. The base template falls back to `site.description`, so every poem page shares the same meta description — a major duplicate-content signal.

**Action:** Add a 1–2 sentence `description` to the front matter of every poem. Example for `hope.md`:
```yaml
description: "A short-form Easter poem by Jennie Compton exploring the resilience of hope and divine light."
```

Files to update (all in `poems/2025/`):
- `ballad-of-grace.md`
- `bestie-for-the-restie.md`
- `choose-to-love.md`
- `conversion-story.md`
- `easter-glory.md`
- `easter-poem.md`
- `easters-miracle.md`
- `empty-tomb.md`
- `grateful-glow.md`
- `hello.md`
- `hope.md`
- `in-listening.md`
- `into-light.md`
- `morning-light.md`
- `my-favorite-light.md`
- `rebirth.md`
- `rechristened.md`
- `resurrection-spring.md`
- `rise.md`
- `someone-like-me.md`
- `turn.md`
- `younnukorns.md`

---

### 1.4 Improve `<title>` Tag Pattern for Poems

**Where:** `_includes/base.njk`

**Status:** ✅ Done (2026-02-22)

Current pattern: `Risen Word | Hope`

Best practice for content-heavy pages is **`Page Title | Site Name`** (page-specific first). Also, poem titles should include the author for long-tail keyword benefit.

**Action:** Update the `<title>` tag in `base.njk`:
```html
<title>{% if title and title != "Home" %}{{ title }}{% if author %} by {{ author }}{% endif %} | {{ site.title }}{% else %}{{ site.title }} — {{ site.tagline }}{% endif %}</title>
```

---

## Priority 2 — Important (structural SEO)

### 2.1 Add JSON-LD Structured Data for Poems

**Where:** `_includes/poem.njk`

**Status:** ✅ Done (2026-02-22)

The poem template currently uses basic Schema.org microdata (`itemscope`, `itemprop`). JSON-LD is Google's preferred format and allows richer data.

**Action:** Add a `<script type="application/ld+json">` block inside `poem.njk`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "{{ title }}",
  "author": {
    "@type": "Person",
    "name": "{{ author }}"
  },
  "datePublished": "{{ page.date | date('yyyy-MM-dd') }}",
  "description": "{{ description or site.description }}",
  "inLanguage": "en",
  "genre": "Poetry",
  "isPartOf": {
    "@type": "WebSite",
    "name": "{{ site.title }}",
    "url": "{{ site.url }}"
  }
}
</script>
```

---

### 2.2 Add JSON-LD Organization / WebSite Structured Data

**Where:** `_includes/base.njk` (global, or homepage only)

**Status:** ✅ Done (2026-02-22)

**Action:** Add site-level structured data so Google can build a knowledge panel and show sitelinks:
```html
{% if page.url == '/' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "{{ site.title }}",
  "url": "{{ site.url }}",
  "description": "{{ site.description }}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ site.url }}/poems/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
{% endif %}
```

---

### 2.3 Add `description` Front Matter to Non-Poem Pages

**Where:** Multiple files

**Status:** ✅ Done (2026-02-22)

The following pages have no `description` and will all share the generic site description:

| File | Suggested description |
|---|---|
| `poems.njk` | "Browse all Easter poems in the Risen Word collection, sorted alphabetically." |
| `categories/index.njk` | "Explore Risen Word poems by category: Short Form and Long Form Easter poetry." |
| `years/index.njk` | "Browse Risen Word Easter poems by contest year." |
| `contests/2025.md` | "Results and winning poems from the 2025 Risen Word Easter Poetry Contest." |
| `404.html` | *(add `description: "Page not found"` — minor but avoids the global description)* |
| `index.md` | "The Risen Word is a collection of original Christian poetry celebrating Jesus Christ's resurrection. Enter our annual Easter poetry contest." |

**Action:** Add a `description` field to the front matter of each file listed above.

---

### 2.4 Improve Heading Hierarchy on Listing Pages

**Where:** `poems.njk`, `category.njk`, `author.njk`, `year.njk`, `categories/index.njk`, `years/index.njk`

These pages use `<h1>` for the page title but then jump to `<h3>` inside the macro `poemListItem`. The `<h3>` should be `<h2>` or the list items should not use heading elements at all (a styled `<span>` or `<strong>` is fine for list items).

**Action:** In `_includes/_macros/poems.njk`, change the `<h3>` inside `poemListItem` to a non-heading element (e.g., `<span>` with the same classes), since these are navigation links, not section headings.

---

### 2.5 Add an About / Landing Page with Keyword-Rich Content

**Where:** New file, e.g., `about.md`

**Status:** ✅ Done (2026-02-22)

There is an `/about/` folder in `_site/` but no source file is visible. The site needs a keyword-rich "About" page explaining the mission, targeting keywords like "Christian poetry", "Easter poems", "resurrection poetry", "poetry contest".

**Action:** Create `about.md` with front matter and 200–400 words of content covering the mission, history, and what makes the collection unique.

---

### 2.6 Add `font-display: swap` to Custom Font Declarations

**Where:** `assets/styles/index.css`

**Status:** ✅ Done (2026-02-22)

The two `@font-face` declarations for TAN Mon Cheri and Beautifully Delicious do not include `font-display: swap`. This means the browser may hide text until fonts load, hurting both CLS (Cumulative Layout Shift) and perceived performance (which Google factors into ranking).

**Action:** Add `font-display: swap;` to both `@font-face` rules in `index.css`.

---

## Priority 3 — Moderate (technical & performance SEO)

### 3.1 Self-Host Google Fonts

**Where:** `_includes/base.njk`, `assets/styles/index.css`

The site loads Crimson Text and Playfair Display from `fonts.googleapis.com`. This creates:
- An extra DNS lookup and connection
- A render-blocking request
- A potential privacy concern (GDPR)

**Action:**
1. Download Crimson Text and Playfair Display woff2 files.
2. Add `@font-face` declarations in `index.css` (with `font-display: swap`).
3. Remove the Google Fonts `<link>` from `base.njk`.

---

### 3.2 Preconnect Hint for Google Fonts (if not self-hosting)

**Where:** `_includes/base.njk` `<head>`

**Status:** ✅ Done (2026-02-22)

If you choose NOT to self-host, at minimum add a preconnect:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Place these **before** the Google Fonts stylesheet link.

---

### 3.3 Complete the Web App Manifest

**Where:** `site.webmanifest`

**Status:** ✅ Done (2026-02-22)

The manifest currently has empty `name` and `short_name` fields. These are used by browsers and can also appear in search.

**Action:** Update to:
```json
{
  "name": "Risen Word",
  "short_name": "Risen Word",
  "icons": [...],
  "theme_color": "#ff6f61",
  "background_color": "#f9f7f3",
  "display": "standalone",
  "start_url": "/",
  "description": "A poetry collection celebrating the Risen Word: Jesus Christ."
}
```

---

### 3.4 Add `alt` Text Infrastructure for Future Images

**Where:** Templates, content files

Currently the site has very few images, but as it grows, every `<img>` should have descriptive `alt` text. Establish a convention now.

**Action:** Add a note in the copilot instructions or a `CONTRIBUTING.md` that all images must include `alt` attributes with descriptive text.

---

### 3.5 Make the 404 Page Use the Base Layout

**Where:** `404.html`

The 404 page is a standalone HTML document with its own `<head>`, styles, and fonts — it doesn't use `base.njk`. This means it lacks all the meta tags, structured data, and nav. While 404s aren't indexed, a consistent experience helps users find their way back.

**Action:** Refactor `404.html` to extend `base.njk` (like other pages), keeping the fun animation but inheriting the nav and footer.

---

### 3.6 Add `lastmod` / `updated` Front Matter to Content

**Where:** Poem markdown files, contest pages

The sitemap template supports `updated` front matter for `<lastmod>`, but no content files use it. Google values accurate last-modified dates.

**Action:** Add `updated: YYYY-MM-DD` front matter to any page that has been modified since its initial publish date. For poems that haven't changed, this can be omitted (the `date` field is used as fallback).

---

## Priority 4 — Nice-to-Have (content & link SEO)

### 4.1 Internal Linking Strategy

**Where:** Poem pages, contest pages, homepage

**Status:** ✅ Done (2026-02-22)

Currently, individual poem pages only link to the previous/next poem. They don't link back to the author page, category page, or contest year page — all of which would strengthen the internal link graph.

**Action:** In `_includes/poem.njk`, add contextual links below the poem:
```html
<div class="mt-4 text-sm text-gray-600">
  <a href="/authors/{{ author | slugify }}/">More poems by {{ author }}</a> ·
  <a href="/categories/{{ category | slugify }}/">{{ category }} poems</a> ·
  <a href="/years/{{ year }}/">{{ year }} contest</a>
</div>
```

---

### 4.2 Add Breadcrumb Navigation

**Where:** `_includes/base.njk` or individual layouts

Breadcrumbs improve both UX and SEO (Google shows them in search results).

**Action:**
1. Add a breadcrumb partial, e.g., `Home > Poems > The Ballad of Grace`.
2. Add `BreadcrumbList` JSON-LD structured data to support rich results.

---

### 4.3 Create a Dynamic "Poems by Theme/Tag" Taxonomy

**Where:** Eleventy config, new template

Poems already have `tags` in front matter (e.g., `["2025", "long-form"]`), but there are no dedicated tag pages. Creating individual tag pages (e.g., `/tags/long-form/`) expands the site's indexable surface area and targets more keyword variations.

**Action:**
1. Add a `tag.njk` pagination template (similar to `category.njk`).
2. Ensure poems have meaningful content tags beyond just year/category (e.g., `resurrection`, `grace`, `hope`, `Easter morning`).

---

### 4.4 Add a Blog or Devotional Section

**Where:** New content directory

A blog with posts about Easter, poetry craft, or devotional reflections would:
- Create recurring fresh content (a strong ranking signal)
- Target informational keywords ("what is Easter poetry", "how to write a Christian poem")
- Provide natural internal links to poems

**Action:** Consider creating a `blog/` directory with markdown posts and a listing page.

---

### 4.5 Lazy-Load the Google Forms Iframe

**Where:** `submit.md`

**Status:** ✅ Done (2026-02-22)

The submission iframe already has `loading="lazy"` ✅, but it lacks a `width` and `height` attribute in proper HTML units, which hurts CLS.

**Action:** Add explicit `width` and `height` attributes (e.g., `width="640" height="2200"`) so the browser can reserve space before the iframe loads.

---

### 4.6 Add `rel="noopener noreferrer"` to All External Links

**Where:** All templates and content files

**Status:** ✅ Done (2026-02-22)

Some links already have this (e.g., in `submit.md`), but it should be consistent across the site for security and minor SEO benefit.

**Action:** Audit all `target="_blank"` links and ensure they include `rel="noopener noreferrer"`.

---

## Priority 5 — Monitoring & Ongoing

### 5.1 Submit Sitemap to Google Search Console

**Action:** Verify the site in [Google Search Console](https://search.google.com/search-console) and submit `https://risenword.org/sitemap.xml`.

### 5.2 Set Up Google Analytics or Plausible

**Action:** Add a privacy-friendly analytics solution to track organic search traffic and identify top-performing pages.

### 5.3 Test with Lighthouse & PageSpeed Insights

**Action:** Run Lighthouse audits on the homepage and a poem page. Focus on:
- Performance (font loading, render-blocking CSS)
- Accessibility
- SEO (meta tags, crawlability)
- Best Practices

### 5.4 Monitor Core Web Vitals

**Action:** Once Search Console is set up, monitor LCP, FID/INP, and CLS regularly.

### 5.5 Build External Backlinks

**Action:** Submit the site to Christian poetry directories, church newsletters, and relevant community sites. Each quality backlink significantly boosts domain authority.

---

## Quick Reference: Files to Touch

| File | Tasks |
|---|---|
| `_includes/base.njk` | 1.1, 1.2, 1.4, 2.2, 3.2, 4.2 |
| `_includes/poem.njk` | 2.1, 4.1 |
| `_includes/_macros/poems.njk` | 2.4 |
| `poems/2025/*.md` (all 22 files) | 1.3, 3.6 |
| `poems.njk` | 2.3 |
| `categories/index.njk` | 2.3 |
| `years/index.njk` | 2.3 |
| `contests/2025.md` | 2.3 |
| `index.md` | 2.3 |
| `assets/styles/index.css` | 2.6, 3.1 |
| `site.webmanifest` | 3.3 |
| `404.html` | 3.5 |
| `submit.md` | 4.5 |
| `_data/site.json` | *(no changes needed — already well-structured)* |
| `eleventy.config.js` | 4.3 (if adding tag pages) |
| **New files** | `about.md` (2.5), `tag.njk` (4.3), OG image (1.2) |
