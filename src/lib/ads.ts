// Google AdSense settings. The publisher ID is public (it appears in every page's source),
// so MURBA's own ID is the default; NEXT_PUBLIC_ADSENSE_CLIENT can override it.
export const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-4907615583667816";

// Ad units appear only once their slot IDs (created after AdSense approval) are set.
// Until then, Auto ads can be switched on from the AdSense dashboard instead.
export const adSlots = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
  phrases: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PHRASES ?? "",
  tutor: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TUTOR ?? "",
  play: process.env.NEXT_PUBLIC_ADSENSE_SLOT_PLAY ?? "",
};

export const adsEnabled = /^ca-pub-\d{10,20}$/.test(adsenseClient);
