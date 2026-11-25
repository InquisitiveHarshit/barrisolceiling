/**
 * Backward compatibility layer for gtag imports.
 * Routes all event calls to the centralized AnalyticsManager.
 */

import { analytics, TRACKED_EVENTS, GA_MEASUREMENT_ID, GOOGLE_ADS_ID, WhatsAppEventParams } from "./analytics";

export const GA_TRACKING_ID = GA_MEASUREMENT_ID;
export { TRACKED_EVENTS, analytics, GOOGLE_ADS_ID };

export const trackFormSubmission = (formName: string = "contact_form") => {
  analytics.trackLead({ formName });
};

export const trackPhoneClick = (location: string = "unknown") => {
  analytics.trackPhoneClick({ location });
};

export const trackWhatsAppClick = (
  location: string = "unknown",
  extra?: Partial<WhatsAppEventParams>
) => {
  analytics.trackWhatsAppClick({ location, ...extra });
};

export const trackCtaClick = (
  ctaText: string,
  location: string = "unknown",
  destinationUrl?: string
) => {
  analytics.trackCtaClick({ ctaText, location, destinationUrl });
};
