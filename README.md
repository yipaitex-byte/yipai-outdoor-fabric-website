# YIPAI Textile website

Next.js App Router site for YIPAI TEXTILE's performance outdoor fabric collection. Product, application and performance content lives in `src/data/site.ts`; detail routes render from those data objects.

## Development

```bash
pnpm install
pnpm dev
```

## Checks and production build

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Optional integrations

Set `NEXT_PUBLIC_GA_ID` to enable Google Analytics, `NEXT_PUBLIC_META_PIXEL_ID` to enable Meta Pixel, and `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to add the Search Console verification value. Sample and contact forms prepare an email in the visitor's email application; configure a form endpoint or CRM integration for direct server-side lead delivery.

The catalog download destination is intentionally a contact link until YIPAI supplies the PDF catalog. Fabric specifications display editable project placeholders until the business provides verified values.
