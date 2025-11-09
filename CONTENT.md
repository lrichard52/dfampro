# Content Editing Guide

This site is a simple static site (HTML/CSS/JS). You can edit text directly in the HTML files and swap images by changing `src` paths. Below is a quick map of what to edit and where.

If you prefer a single content file (JSON) to edit instead of touching HTML, let me know — I can wire that up so you only change one file.

## Page Titles & Meta
- Browser tab title: `index.html:8`, `projects.html:7`
- Meta description: `index.html:6`, `projects.html:6`

## Branding (Header & Footer)
- Logo/brand text: `index.html:17`, `projects.html:16`
- Tagline under logo: `index.html:18`, `projects.html:17`
- Footer brand + blurb: `index.html:247-248`, `projects.html:250-251`
- Footer year and name: `index.html:270`, `projects.html:273`

## Home Page (index.html)
- Hero title: `index.html:46`
- Hero subtitle: `index.html:47`
- Services section title + subtitle: `index.html:61-62`

- Service cards:
  - Card 1 heading + text: `index.html:73-75`
  - Card 2 heading + text: `index.html:90-91`
  - Card 3 heading + text: `index.html:108-110`
  - Feature bullets: edit the `<li>` items under each card

- About section:
  - Title + lead: `index.html:126-127`
  - Paragraphs: `index.html:128-129`
  - Feature items: `index.html:133`, `index.html:137`, `index.html:141`
  - About image placeholder (replace with your own image if desired): `index.html:147-154`

- Contact section:
  - Section title + subtitle: `index.html:164-166`
  - Location text: `index.html:178-180`
  - Email address + mailto: `index.html:191`
  - Phone text: `index.html:201-202`
  - Contact form labels (e.g., select options): `index.html:224-227`

## Projects Page (projects.html)
- Hero eyebrow, title, subtitle: `projects.html:45-50`
- Hero buttons: `projects.html:52-54`
- Highlight stats and captions: `projects.html:58-67`

- Project cards (repeat structure):
  - Card 1 image `src` + `alt`: `projects.html:83`
  - Card 1 label: `projects.html:84`
  - Industry + tech: `projects.html:88-89`
  - Title: `projects.html:91`
  - Description: `projects.html:92-95`
  - Results bullets: `projects.html:97-100`
  - Tags: `projects.html:102-105`

  - Card 2 start: `projects.html:111`
  - Card 3 start: `projects.html:139`
  - Card 4 start: `projects.html:167`

- "How we work" section title + body: `projects.html:201-208`
- Approach steps (headings + descriptions): `projects.html:211-220`
- CTA title, body, and buttons (email link): `projects.html:231-238`

## Images
- Local images folder: `images/` (added to the repo). Place your files there, e.g. `images/hero.jpg`.
- Swap an image by changing the `src` attribute in `<img>` tags. Example:
  ```html
  <img src="images/your-photo.jpg" alt="Descriptive alt text" />
  ```
- Replace the About section placeholder SVG (optional):
  ```html
  <!-- index.html:147-154 -->
  <div class="about-image">
    <img src="images/about.jpg" alt="Your team or product" />
  </div>
  ```
- Recommended: use descriptive `alt` text; aim for ~1200px width for main images.

## Global Find & Replace Tips
- Brand name: search for `DFAM PRO` across the repo to update all instances.
- Email address: search for `info@dfampro.com` to update mailto links and text.
- Navigation labels: update link text under the nav menus in both pages.

## Preview Changes Locally
You can open `index.html` directly in a browser, or run a quick local server for cleaner routing:

```bash
# From the project root
python -m http.server 8000
# Then visit http://localhost:8000
```

## Notes
- The contact form submission is simulated in `js/main.js`. To wire it to a backend/email service, swap the `setTimeout` block for a fetch to your API.
- Keep headings short to avoid wrapping on small screens.
- If anything feels repetitive to edit, I can centralize the content into one JSON file and auto-fill the pages on load.

