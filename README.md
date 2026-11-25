# Vertical Studios website

Astro static site with the TinaCMS editor (click-to-edit), deployed on Vercel. Content lives in `/content` as JSON (pages, settings) and Markdown (Insights posts). Every edit, by a person or by AI, is a Git commit, so anything can be rolled back.

The design and structure follow the Vertical Studios Site Foundation board, signed off Nov 18, 2026: white ground, Studios red #B5232F for accents (the red on every Studios brief), yellow buttons, Vertical Life's grainy metallic black on dark bands, the family's 8px hard shadow on cards, square corners, work samples in color and people in black and white, Bebas Neue Pro (mixed case, -0.02em tracking, balanced scale) for headlines up to six words, Roboto body at 18px. The story leads with the mission (senior-led, apprentice-powered); every page ends at Book a call.

## Rules for anyone editing

- No prices, packages or turnaround promises. Every engagement is custom.
- Name real clients and show results only with the client's written approval.
- Never "the" directly before "Vertical Life".

## Go live

1. **GitHub.** `vertical-studios/Vertical-Studios-Website`, public, so Tina saves deploy on Vercel's free plan.
2. **Vercel.** Import the repo. Build command `npm run build`.
3. **TinaCMS.** Create a Tina Cloud project for the repo, then add `TINA_CLIENT_ID` and `TINA_TOKEN` in Vercel and redeploy. The editor appears at `/admin`.
4. **Analytics.** Add the Studios Google Tag Manager ID as `PUBLIC_GTM_ID`. Tags fire on verticalstudios.life, and on previews only when Tag Assistant is open.
5. **Fonts.** Bebas Neue Pro loads from the Adobe Fonts kit `mwa4arh` ("Vertical Studios Website"), licensed for verticalstudios.life, www.verticalstudios.life, *.vercel.app and localhost.
6. **HighLevel.** Trim the project form (`en3AEF87cemYpp7YXXny`) to name, email, organization and what you need; point its Privacy and Terms links at `/privacy-policy` and `/terms-of-service` (today they go to example.com); set its redirect to `/thank-you`. Turn off the chat widget. To make "Book a call" a real booking, add a HighLevel calendar for Gabe and swap it into the Book a call page.
7. **Domain.** Point www.verticalstudios.life at Vercel once images are moved off Squarespace. Old URLs redirect in `vercel.json`.

## Before switching the domain

- [ ] Move images and logos off Squarespace into `public/uploads/`, then swap the URLs in `/content`.
- [ ] Legal review of the new Privacy policy and Terms of service.
- [ ] Confirm client logo names (ISI Construction) and add the sixth logo once it's identified.
- [ ] Re-submit the sitemap in Google Search Console after launch.

## Running locally

```
npm install
npm run dev        # site + editor at localhost:4321/admin (local mode saves to your files)
npm run build      # full static build (runs inside `tinacms build`)
```

## Adding a new section type

1. Add a template in `tina/config.ts`
2. Add a component in `src/components/blocks/`
3. Register it in `src/components/BlockRenderer.astro`
4. Mark editable elements with `data-tina-field={tf(Astro.props, "fieldName")}` (and `tf(item, "field")` for list items). If a field uses `nameOverride`, pass the schema name.

## How click-to-edit works

- `src/lib/tina.ts` loads pages and posts through Tina's client and converts the result back to the file shape the components expect.
- `src/lib/islands.ts` lists the editable regions (page sections, blog articles). Each page wraps them in `<TinaIsland>`.
- `src/pages/tina-island/[name].ts` is the only on-demand route: it re-renders a region while someone types. Every other page is static HTML.
