# DFAM PRO - Design for Additive Manufacturing Pro

Professional website for DFAM PRO, a consulting and training business specializing in Design for Additive Manufacturing (DFAM).

## About

DFAM PRO provides expert consulting and training services to help businesses unlock the full potential of additive manufacturing. Our services include:

- **DFAM Consulting**: Strategic guidance to optimize designs for additive manufacturing
- **Training Programs**: Comprehensive training tailored to your team's needs
- **Technical Support**: Ongoing support to ensure project success

## Website Structure

This is a modern, responsive single-page website featuring:

- Hero section with call-to-action buttons
- Services showcase with detailed information
- About section highlighting company expertise
- Contact form for inquiries
- Fully responsive design for all devices

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- SVG icons

## Features

- Smooth scrolling navigation
- Mobile-friendly responsive design
- Interactive contact form
- Scroll animations
- Modern gradient hero section
- Professional color scheme optimized for tech consulting

## Getting Started

Simply open `index.html` in a web browser to view the website.

For development with live reload, you can use any local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Customization

### Colors
The color scheme can be customized by modifying the CSS variables in `css/styles.css`:

```css
:root {
    --accent-color: #2B6CB0;
    /* ... more variables */
}
```

### Content
Most content is now driven by `content.json`. Edit that file to update titles, copy, and images across the site.

Note: Loading JSON requires a local server (browsers block `file://` fetches). Use one of the commands below and visit `http://localhost:8000`.

For a mapped list of what to edit (titles, text, and images) with file/line pointers, see `CONTENT.md`.

Quick start:
- Edit text directly in `index.html` and `projects.html`.
- Place images under `images/` and update `<img src>` paths accordingly.

### Contact Form
The contact form currently uses a simulated submission. To implement actual form submission, modify the form handler in `js/main.js` to integrate with your backend API or email service.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2025 DFAM PRO. All rights reserved.
