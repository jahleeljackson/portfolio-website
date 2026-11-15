# Jahleel Jackson — Portfolio

Lightweight static portfolio built with Vite. Dark theme (black / white / `#b57aff` accents), Inter typeface, single scrolling page.

## Develop

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

Output lands in `dist/`.

## Deploy to Netlify

1. Connect this repo in Netlify, or drag-and-drop the `dist` folder after `npm run build`.
2. Build settings are already in `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

## Edit content

All copy, experience, skills, videos, and document links live in one file:

[`src/data/content.js`](src/data/content.js)

### Replace the headshot

1. Add your image to `public/` (e.g. `public/headshot.jpg`).
2. Update `profile.portraitSrc` in `content.js` to `/headshot.jpg`.

### Add a YouTube demo

```js
{
  title: 'My Project Demo',
  date: '2026-03-01', // YYYY-MM-DD
  youtubeId: 'VIDEO_ID', // from youtube.com/watch?v=VIDEO_ID
  description: 'Optional short blurb.',
}
```

### Add a document or write-up link

```js
{
  title: 'Architecture Notes',
  date: '2026-03-01',
  href: 'https://example.com/doc',
  type: 'PDF', // or Link, Notion, etc.
}
```

Redeploy after changes (or let Netlify rebuild from git).
