// Content loader to populate site from content.json
(function () {
  function setText(selector, text) {
    if (text == null) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setAttr(selector, attr, value) {
    if (value == null) return;
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function replaceList(selector, items) {
    if (!Array.isArray(items)) return;
    const ul = document.querySelector(selector);
    if (!ul) return;
    ul.innerHTML = '';
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function createProjectCard(card) {
    const article = document.createElement('article');
    article.className = 'project-card';

    const media = document.createElement('div');
    media.className = 'project-media';
    const img = document.createElement('img');
    img.src = card?.image?.src || '';
    img.alt = card?.image?.alt || '';
    media.appendChild(img);
    if (card?.label) {
      const span = document.createElement('span');
      span.className = 'media-label';
      span.textContent = card.label;
      media.appendChild(span);
    }

    const content = document.createElement('div');
    content.className = 'project-content';

    const meta = document.createElement('div');
    meta.className = 'project-meta';
    if (card?.industry) {
      const spanInd = document.createElement('span');
      spanInd.className = 'project-industry';
      spanInd.textContent = card.industry;
      meta.appendChild(spanInd);
    }
    if (card?.tech) {
      const spanTech = document.createElement('span');
      spanTech.className = 'project-tech';
      spanTech.textContent = card.tech;
      meta.appendChild(spanTech);
    }

    const h3 = document.createElement('h3');
    h3.textContent = card?.title || '';

    const p = document.createElement('p');
    p.textContent = card?.description || '';

    const results = document.createElement('ul');
    results.className = 'project-results';
    (card?.results || []).forEach((t) => {
      const li = document.createElement('li');
      li.textContent = t;
      results.appendChild(li);
    });

    const tags = document.createElement('div');
    tags.className = 'project-tags';
    (card?.tags || []).forEach((t) => {
      const span = document.createElement('span');
      span.textContent = t;
      tags.appendChild(span);
    });

    content.appendChild(meta);
    content.appendChild(h3);
    content.appendChild(p);
    content.appendChild(results);
    content.appendChild(tags);

    article.appendChild(media);
    article.appendChild(content);
    return article;
  }

  async function loadContent() {
    try {
      const res = await fetch('content.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load content.json');
      const data = await res.json();

      const isProjects = /projects\.html(\?.*)?$/i.test(window.location.pathname);

      // Meta and brand
      const meta = isProjects ? data?.meta?.projects : data?.meta?.home;
      if (meta?.title) document.title = meta.title;
      if (meta?.description) {
        const md = document.querySelector('meta[name="description"]');
        if (md) md.setAttribute('content', meta.description);
      }

      setText('.logo h1', data?.site?.brandName);
      setText('.logo .tagline', data?.site?.tagline);

      // Footer year (if present)
      if (data?.site?.footer?.year) {
        document.querySelectorAll('.footer-bottom p').forEach((p) => {
          p.textContent = `© ${data.site.footer.year} ${data.site.brandName}. All rights reserved.`;
        });
      }

      // Shared contact details (email/location/phone)
      if (!isProjects) {
        // index.html only sections
        setText('.hero-title', data?.home?.heroTitle);
        setText('.hero-subtitle', data?.home?.heroSubtitle);

        // Services section header
        setText('#services .section-header h2', data?.home?.services?.heading);
        setText('#services .section-header p', data?.home?.services?.subheading);

        // Service cards
        const cards = document.querySelectorAll('.services .service-card');
        (data?.home?.services?.cards || []).forEach((c, idx) => {
          const card = cards[idx];
          if (!card) return;
          const h3 = card.querySelector('h3');
          const p = card.querySelector('p');
          const ul = card.querySelector('ul');
          if (h3 && c.title != null) h3.textContent = c.title;
          if (p && c.description != null) p.textContent = c.description;
          if (ul && Array.isArray(c.features)) {
            ul.innerHTML = '';
            c.features.forEach((f) => {
              const li = document.createElement('li');
              li.textContent = f;
              ul.appendChild(li);
            });
          }
        });

        // About section
        setText('#about h2', data?.home?.about?.title);
        setText('#about .lead', data?.home?.about?.lead);

        // About paragraphs (non-lead)
        const aboutParas = (data?.home?.about?.paragraphs || []).slice(0, 2);
        const pNodes = document.querySelectorAll('#about .about-text p:not(.lead)');
        pNodes.forEach((p, i) => {
          if (aboutParas[i] != null) p.textContent = aboutParas[i];
        });

        // About features
        const featNodes = document.querySelectorAll('#about .feature-item');
        (data?.home?.about?.features || []).forEach((f, i) => {
          const item = featNodes[i];
          if (!item) return;
          const h4 = item.querySelector('h4');
          const p = item.querySelector('p');
          if (h4 && f.title != null) h4.textContent = f.title;
          if (p && f.description != null) p.textContent = f.description;
        });

        // About image replacement
        if (data?.home?.about?.image?.src) {
          const aboutImgWrap = document.querySelector('#about .about-image');
          if (aboutImgWrap) {
            aboutImgWrap.innerHTML = '';
            const img = document.createElement('img');
            img.src = data.home.about.image.src;
            img.alt = data.home.about.image.alt || '';
            img.style.width = '100%';
            img.style.height = 'auto';
            aboutImgWrap.appendChild(img);
          }
        }

        // Contact section
        setText('#contact .section-header h2', data?.home?.contact?.heading);
        setText('#contact .section-header p', data?.home?.contact?.subtitle);
        setText('#contact .contact-item:nth-of-type(1) p', data?.site?.location);
        if (data?.site?.email) {
          const emailLink = document.querySelector('#contact .contact-item:nth-of-type(2) a[href^="mailto:"]');
          if (emailLink) {
            emailLink.textContent = data.site.email;
            emailLink.setAttribute('href', `mailto:${data.site.email}`);
          }
        }
        setText('#contact .contact-item:nth-of-type(3) p', data?.site?.phone);
      } else {
        // projects.html
        setText('.projects-hero .eyebrow', data?.projectsPage?.hero?.eyebrow);
        setText('.projects-hero h1', data?.projectsPage?.hero?.title);
        setText('.projects-hero-subtitle', data?.projectsPage?.hero?.subtitle);

        // Hero buttons
        const heroBtns = document.querySelectorAll('.projects-hero .hero-buttons a');
        (data?.projectsPage?.hero?.buttons || []).forEach((b, i) => {
          const a = heroBtns[i];
          if (!a) return;
          if (b.text != null) a.textContent = b.text;
          if (b.href != null) a.setAttribute('href', b.href);
        });

        // Highlights
        const hlNodes = document.querySelectorAll('.projects-hero-highlights > div');
        (data?.projectsPage?.highlights || []).forEach((h, i) => {
          const n = hlNodes[i];
          if (!n) return;
          const stat = n.querySelector('.highlight-stat');
          const p = n.querySelector('p');
          if (stat && h.stat != null) stat.textContent = h.stat;
          if (p && h.caption != null) p.textContent = h.caption;
        });

        // Projects grid
        const grid = document.querySelector('.project-gallery-grid');
        if (grid && Array.isArray(data?.projectsPage?.projects) && data.projectsPage.projects.length) {
          grid.innerHTML = '';
          data.projectsPage.projects.forEach((card) => grid.appendChild(createProjectCard(card)));
        }

        // Approach
        setText('.project-approach .eyebrow', data?.projectsPage?.approach?.eyebrow);
        setText('.project-approach h2', data?.projectsPage?.approach?.title);
        const approachP = document.querySelector('.project-approach .approach-content > div p');
        if (approachP && data?.projectsPage?.approach?.body != null) approachP.textContent = data.projectsPage.approach.body;
        const stepNodes = document.querySelectorAll('.project-approach .approach-list li');
        (data?.projectsPage?.approach?.steps || []).forEach((s, i) => {
          const li = stepNodes[i];
          if (!li) return;
          const h4 = li.querySelector('h4');
          const p = li.querySelector('p');
          if (h4 && s.title != null) h4.textContent = s.title;
          if (p && s.description != null) p.textContent = s.description;
        });

        // CTA
        setText('.project-cta h2', data?.projectsPage?.cta?.title);
        const ctaP = document.querySelector('.project-cta p');
        if (ctaP && data?.projectsPage?.cta?.body != null) ctaP.textContent = data.projectsPage.cta.body;
        const ctaBtns = document.querySelectorAll('.project-cta .hero-buttons a');
        (data?.projectsPage?.cta?.buttons || []).forEach((b, i) => {
          const a = ctaBtns[i];
          if (!a) return;
          if (b.text != null) a.textContent = b.text;
          if (b.href != null) a.setAttribute('href', b.href);
        });
      }
    } catch (err) {
      // If content.json isn't found (e.g., viewing via file://), skip silently
      console.warn('[content] Unable to load content.json:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', loadContent);
})();

