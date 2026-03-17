This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Kada korisnik klikne na EN/SR dugme u Navbar → LanguageContext menja jezik
Jezik se čuva u cookie: lang=sr ili lang=en
Sve stranice automatski čitaju izbor jezika iz cookies
Bez URL parametara - čistiji URL-ovi
Bez prop drilling - jezik se čuva globalno



Globalni jezik i cookie logika su u I18nProvider.tsx (context + lang cookie).
Server čitanje cookie‑ja je u locale.ts i koristi se u layoutu i svim server stranicama.
Layout sada postavlja <html lang> iz cookie‑ja i prosledjuje initialLang u provider layout.tsx.
Navbar menja jezik bez query parametara i radi router.refresh() Navbar.tsx.
Sve studentske strane i akcije uzimaju jezik iz cookie‑ja, bez hidden lang polja i bez lang u URL‑u page.tsx, page.tsx, page.tsx, student.ts.
Helperi za redirecte vise ne dodaju lang query formHelpers.ts.
next-intl request config sada cita cookie request.ts.

tvoj cookie-based


npm run eslint -- --fix

lsof -ti:3000 | xargs kill -9
lsof -ti:3003 | xargs kill -9

