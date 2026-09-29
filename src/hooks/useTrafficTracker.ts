'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useTrafficTracker() {
  const pathname = usePathname();
  const trackedPaths = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pathname) return;

    // Optional: Avoid tracking same path multiple times in one strict mode session
    if (trackedPaths.current.has(pathname)) return;
    trackedPaths.current.add(pathname);

    // Extract adSlug if it's an ad details page
    let adSlug = null;
    if (pathname.startsWith('/ad/')) {
      const parts = pathname.split('/');
      if (parts.length >= 3) {
        adSlug = parts[2];
      }
    }

    // Send tracking request in background
    fetch('http://localhost:5000/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: pathname,
        adSlug
      }),
    }).catch(err => {
      // Silently ignore tracking errors
      console.error('Failed to track visit', err);
    });

  }, [pathname]);
}
