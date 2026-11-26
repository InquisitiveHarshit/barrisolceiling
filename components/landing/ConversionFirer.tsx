"use client";
import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

/**
 * ConversionFirer
 * Drop this into any Server Component page to fire the Google Ads + GA4
 * conversion event the moment that page mounts in the browser.
 *
 * Used on /landing-page/thankyou so the conversion fires exactly once
 * when the thank-you URL is opened — not on every form interaction.
 */
export default function ConversionFirer() {
  useEffect(() => {
    analytics.trackLead({ formName: "landing_page_hero_form" });
  }, []);

  return null;
}
