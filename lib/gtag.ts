declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Tracks lead form submissions in GA4
 * Event: generate_lead
 */
export const trackFormSubmission = (formName: string = "contact_form") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "generate_lead", {
      form_name: formName,
    });
  }
};

/**
 * Tracks phone call button clicks in GA4
 * Event: phone_call_click
 */
export const trackPhoneClick = (location: string = "unknown") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_call_click", {
      click_location: location,
    });
  }
};

/**
 * Tracks WhatsApp button clicks in GA4
 * Event: whatsapp_click
 */
export const trackWhatsAppClick = (location: string = "unknown") => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "whatsapp_click", {
      click_location: location,
    });
  }
};
