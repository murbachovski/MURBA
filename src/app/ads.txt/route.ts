import { adsenseClient, adsEnabled } from "@/lib/ads";

// Served at /ads.txt. AdSense needs this line to confirm that we authorize Google to sell our ad space.
// The value is read at build time, so redeploy after setting NEXT_PUBLIC_ADSENSE_CLIENT in Vercel.
export function GET() {
  if (!adsEnabled) return new Response("Not found\n", { status: 404 });
  const publisherId = adsenseClient.replace(/^ca-/, "");
  return new Response(`google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
