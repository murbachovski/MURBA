// Google AdSense settings. Everything stays off until the publisher ID is set in Vercel,
// so the site can go live (and be reviewed by AdSense) before ads are approved.
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? ""; // e.g. ca-pub-1234567890123456

export const adSlots = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
  phrases: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PHRASES ?? "",
  tutor: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TUTOR ?? "",
};

export const adsEnabled = /^ca-pub-\d{10,20}$/.test(adsenseClient);
