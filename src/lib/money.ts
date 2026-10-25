// Revenue links that need no backend. Each one stays hidden until its URL is set in Vercel.
// NEXT_PUBLIC_SUPPORT_URL: a tip page such as Ko-fi, Buy Me a Coffee or a Stripe Payment Link.
export const supportUrl = process.env.NEXT_PUBLIC_SUPPORT_URL ?? "";

// NEXT_PUBLIC_PHRASEBOOK_URL: the checkout page for the travel phrasebook PDF (Gumroad, Lemon Squeezy…).
export const phrasebookUrl = process.env.NEXT_PUBLIC_PHRASEBOOK_URL ?? "";

// NEXT_PUBLIC_DISCORD_URL: a permanent Discord invite link (discord.gg/…).
export const discordUrl = process.env.NEXT_PUBLIC_DISCORD_URL ?? "";
