import { useEffect, useRef, useState } from "react";

/**
 * useCopyToClipboard — copies text and exposes a short-lived `copied` flag.
 * Fails quietly (e.g. insecure context or blocked permission) instead of throwing.
 */
export function useCopyToClipboard(resetMs = 2400) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetMs);
    } catch {
      setCopied(false);
    }
  };

  return { copied, copy };
}
