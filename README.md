# The Savyora Fitness

A Next.js App Router site for The Savyora Fitness in Peshawar. The site uses a black and violet art direction, responsive shared navigation, motion-enhanced sections, a filtered facility carousel, membership pricing, training windows, coaching information, and WhatsApp enquiry forms.

## Requirements

- Node.js 20.9 or newer
- npm

## Local development

```powershell
npm install
npm run dev
```

Open the local URL printed by Next.js. To create and serve a production build:

```powershell
npm run build
npm start
```

Run the TypeScript check with `npm run typecheck`.

## Routes

- `/` — homepage
- `/facilities` — facility categories and carousel
- `/training` — training windows
- `/membership` — plans, offer details, enquiry form
- `/coaching` — coaching information and enquiry form
- `/about` — club story and values
- `/contact` — location and contact options

Forms build a WhatsApp message in the visitor’s browser; the site does not store enquiry data. The hero figure is cropped from the supplied 846×638 design reference, so replace it with a high-resolution licensed transparent cutout before final production. Facility carousel imagery still loads seven images from Unsplash, and typography loads from Google Fonts; those visuals require an internet connection. Social links without verified official profile URLs lead to search results. Confirm prices, facilities, schedule, offers, contact details, and claims with the business before publishing.

The project includes unused static-site files from an earlier version in `data/site-pages.json` and `public/assets/site.js`, `site.css`, and `premium.css`; the Next.js app does not import them. Deployment, a Git remote, and `savyora.pk` DNS are not configured.
