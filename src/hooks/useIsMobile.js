import { useEffect, useState } from "react";

/**
 * Returns true when the viewport width is at or below the given breakpoint.
 * Uses a single shared event listener regardless of how many components
 * consume this hook — eliminates the N-listeners-per-card antipattern.
 *
 * @param {number} breakpoint - Pixel width threshold (default 768).
 * @returns {boolean}
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
}
