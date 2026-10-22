"use client";

import { useEffect, useRef } from "react";
import { adsEnabled, adsenseClient } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

// One responsive AdSense unit, clearly labelled and kept out of the conversation itself.
// Renders nothing until the publisher ID and a slot ID are configured.
export function AdSlot({ slot, label }: { slot: string; label: string }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!adsEnabled || !slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and slow script loads end up here. The page works without ads.
    }
  }, [slot]);

  if (!adsEnabled || !slot) return null;

  return (
    <aside className="my-12 border-y border-rule py-4" aria-label={label}>
      <p className="label mb-3">{label}</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
