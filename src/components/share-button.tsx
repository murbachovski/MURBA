"use client";

import { useState } from "react";

// Uses the phone's share sheet where there is one (KakaoTalk, Instagram, Messages…),
// and falls back to copying the link on desktop.
export function ShareButton({ title, label, copiedLabel }: { title: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // The person closed the share sheet. Nothing to do.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked; the address bar still has the link.
    }
  }

  return (
    <button type="button" onClick={share} className="ink-link text-sm">
      {copied ? copiedLabel : label}
    </button>
  );
}
