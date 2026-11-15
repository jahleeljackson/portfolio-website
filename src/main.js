import './styles.css';
import {
  profile,
  experience,
  education,
  projects,
  skills,
  leadership,
  videos,
  documents,
} from './data/content.js';

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function youtubeThumb(id) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function renderHero() {
  document.getElementById('hero-name').textContent = profile.name;
  document.getElementById('hero-title').textContent = profile.title;
  document.getElementById('hero-bio').textContent = profile.bio;

  const portrait = document.getElementById('portrait');
  portrait.src = profile.portraitSrc;
  portrait.alt = profile.portraitAlt;

  const contact = document.getElementById('hero-contact');
  contact.innerHTML = `
    <a href="mailto:${profile.email}">${profile.email}</a>
    ${profile.links
      .map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
      .join('')}
  `;

  const footer = document.getElementById('footer-contact');
  footer.innerHTML = `
    <a href="mailto:${profile.email}">${profile.email}</a>
    ${profile.links
      .map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`)
      .join('')}
  `;
}

function renderExperience() {
  const root = document.getElementById('experience-list');
  root.innerHTML = experience
    .map(
      (job) => `
      <article class="entry">
        <div class="entry-meta">
          <span class="dates">${job.dates}</span>
          <span>${job.location}</span>
        </div>
        <h3>${job.role}</h3>
        <p class="org">${job.org}</p>
        <ul>
          ${job.bullets.map((b) => `<li>${b}</li>`).join('')}
        </ul>
      </article>
    `,
    )
    .join('');
}

function renderEducation() {
  const root = document.getElementById('education-list');
  root.innerHTML = education
    .map(
      (ed) => `
      <article class="entry">
        <div class="entry-meta">
          <span class="dates">${ed.dates}</span>
          <span>${ed.location}</span>
        </div>
        <h3>${ed.degree}</h3>
        <p class="org">${ed.school}</p>
        ${ed.detail ? `<p class="detail">${ed.detail}</p>` : ''}
      </article>
    `,
    )
    .join('');
}

function renderProjects() {
  const root = document.getElementById('projects-list');
  root.innerHTML = projects
    .map(
      (p) => `
      <article class="entry">
        <h3>${p.name}</h3>
        <p class="org">${p.context}</p>
        <p class="detail">${p.description}</p>
      </article>
    `,
    )
    .join('');
}

function renderSkills() {
  const root = document.getElementById('skills-grid');
  const groups = [
    { title: 'Languages', items: skills.languages },
    { title: 'Technologies', items: skills.technologies },
    { title: 'Analysis & Communication', items: skills.consulting },
    { title: 'Certifications', items: skills.certifications },
  ];

  root.innerHTML = groups
    .map(
      (g) => `
      <div class="skill-group">
        <h3>${g.title}</h3>
        <p>${g.items.join(' · ')}</p>
      </div>
    `,
    )
    .join('');
}

function renderLeadership() {
  const root = document.getElementById('leadership-list');
  root.innerHTML = leadership.map((item) => `<li>${item}</li>`).join('');
}

function renderVideos() {
  const root = document.getElementById('videos-list');
  root.innerHTML = videos
    .map(
      (v) => `
      <button
        type="button"
        class="video-card"
        data-youtube-id="${v.youtubeId}"
        data-title="${v.title.replace(/"/g, '&quot;')}"
      >
        <div class="video-thumb">
          <img src="${youtubeThumb(v.youtubeId)}" alt="" loading="lazy" width="480" height="360" />
          <div class="play" aria-hidden="true"><span class="play-icon"></span></div>
        </div>
        <p class="meta">${formatDate(v.date)}</p>
        <h3>${v.title}</h3>
        ${v.description ? `<p class="desc">${v.description}</p>` : ''}
      </button>
    `,
    )
    .join('');
}

function renderDocuments() {
  const root = document.getElementById('documents-list');
  if (!documents.length) {
    root.innerHTML = '<p class="section-lede">No documents yet. </p>';
    return;
  }

  root.innerHTML = documents
    .map(
      (doc) => `
      <a
        class="doc-item"
        href="${doc.href}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="doc-title">${doc.title}</span>
        <span class="doc-type">${doc.type || 'Link'}</span>
        <span class="doc-date">${formatDate(doc.date)}</span>
      </a>
    `,
    )
    .join('');
}

function setupVideoModal() {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('video-iframe');
  const titleEl = document.getElementById('video-modal-title');
  let lastFocus = null;

  function openModal(id, title) {
    lastFocus = document.activeElement;
    titleEl.textContent = title;
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
  }

  function closeModal() {
    modal.hidden = true;
    iframe.src = '';
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') {
      lastFocus.focus();
    }
  }

  document.getElementById('videos-list').addEventListener('click', (e) => {
    const card = e.target.closest('[data-youtube-id]');
    if (!card) return;
    openModal(card.dataset.youtubeId, card.dataset.title);
  });

  modal.addEventListener('click', (e) => {
    if (e.target.matches('[data-close-modal]')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function setupNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const links = [...nav.querySelectorAll('a')];

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open', !open);
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      nav.classList.remove('is-open');
    });
  });

  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          if (link.getAttribute('href') === id) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    nodes.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((el) => observer.observe(el));
}

function init() {
  renderHero();
  renderExperience();
  renderEducation();
  renderProjects();
  renderSkills();
  renderLeadership();
  renderVideos();
  renderDocuments();
  setupVideoModal();
  setupNav();
  setupReveal();
}

init();
