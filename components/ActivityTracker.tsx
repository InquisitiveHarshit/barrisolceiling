"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";

function NavigationWatcher() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevUrlRef = useRef<string | null>(null);
  const pageEnterTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const query = searchParams?.toString();
    const currentUrl = query ? `${pathname}?${query}` : pathname;
    const now = Date.now();

    // Skip first mount — GA4 script already fires page_view on initial load.
    // Only fire for genuine client-side navigations (prev url exists and differs).
    if (prevUrlRef.current !== null && prevUrlRef.current !== currentUrl) {
      const timeSpentSeconds = Math.max(1, Math.round((now - pageEnterTimeRef.current) / 1000));

      // Track user_navigation event (from → to with time spent)
      analytics.trackNavigation({
        fromUrl: prevUrlRef.current,
        toUrl: currentUrl,
        pageTitle: typeof document !== "undefined" ? document.title : "",
        timeSpentSeconds,
      });

      // Client-side page_view for subsequent navigations only
      analytics.trackPageView(currentUrl, typeof document !== "undefined" ? document.title : "");
    }

    prevUrlRef.current = currentUrl;
    pageEnterTimeRef.current = now;
  }, [pathname, searchParams]);

  return null;
}

export default function ActivityTracker() {
  return (
    <Suspense fallback={null}>
      <NavigationWatcher />
    </Suspense>
  );
}

