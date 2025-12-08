"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect media query matches
 * @param query - The media query string to match against
 * @returns boolean - Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Create listener function
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/**
 * Predefined breakpoint hooks
 */
export const useIsMobile = () => useMediaQuery("(max-width: 768px)");
export const useIsSmallMobile = () => useMediaQuery("(max-width: 640px)");
export const useIsTablet = () =>
  useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
