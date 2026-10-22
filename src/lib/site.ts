// Public URL used for canonical links, the sitemap and Open Graph.
// On Vercel the production domain is filled in automatically; set NEXT_PUBLIC_SITE_URL once a custom domain is live.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
