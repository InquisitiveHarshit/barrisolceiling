/**
 * Centralized Event-Driven Analytics System
 * 
 * Declares all trackable events in a centralized registry array (TRACKED_EVENTS)
 * and dispatches them to GA4 while logging session events in an array for inspection.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __ANALYTICS_EVENTS__?: Array<{
      event: string;
      payload: Record<string, any>;
      timestamp: string;
    }>;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-F8JDH2R0ML";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GADS_ID || "AW-18383636220";

/**
 * 1. Centralized Event Definitions Array
 * All tracked events across the application are registered here.
 */
export const TRACKED_EVENTS = [
  {
    name: "generate_lead",
    category: "Engagement",
    isConversion: true,
    description: "Fires upon successful submission of a contact or inquiry form.",
  },
  {
    name: "conversion",
    category: "Google Ads",
    isConversion: true,
    description: "Fires Google Ads conversion event for AW-18383636220 upon lead form submission.",
  },
  {
    name: "cta_click",
    category: "Engagement",
    isConversion: false,
    description: "Fires when a user clicks a major CTA button (e.g. Schedule Survey, Book Site Survey).",
  },
  {
    name: "phone_call_click",
    category: "Contact",
    isConversion: false,
    description: "Fires when a user clicks a direct phone call link or button.",
  },
  {
    name: "whatsapp_click",
    category: "Contact",
    isConversion: false,
    description: "Fires when a user clicks a WhatsApp button, capturing originating page and destination.",
  },
  {
    name: "user_navigation",
    category: "Navigation",
    isConversion: false,
    description: "Fires whenever a user navigates between pages/URLs, capturing from_url, to_url, and duration.",
  },
  {
    name: "page_view",
    category: "Navigation",
    isConversion: false,
    description: "Fires automatically when a page is visited.",
  },
] as const;

export type EventName = typeof TRACKED_EVENTS[number]["name"];
export type TrackedEventDefinition = typeof TRACKED_EVENTS[number];

export interface LeadEventParams {
  formName: string;
  category?: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}

export interface ClickEventParams {
  location: string;
  label?: string;
  [key: string]: any;
}

export interface CtaEventParams {
  ctaText: string;
  location: string;
  destinationUrl?: string;
  [key: string]: any;
}

export interface WhatsAppEventParams extends ClickEventParams {
  pagePath?: string;
  pageTitle?: string;
  targetUrl?: string;
}

export interface NavigationEventParams {
  fromUrl: string;
  toUrl: string;
  pageTitle?: string;
  timeSpentSeconds?: number;
  [key: string]: any;
}

export interface FiredEventRecord {
  event: string;
  payload: Record<string, any>;
  timestamp: string;
}

/**
 * 2. Centralized Analytics Manager
 */
class AnalyticsManager {
  private trackingId: string;
  private isDevelopment: boolean;
  public eventHistory: FiredEventRecord[] = [];

  constructor() {
    this.trackingId = GA_MEASUREMENT_ID;
    this.isDevelopment = process.env.NODE_ENV !== "production";
    this.syncWindowHistory();
  }

  private syncWindowHistory() {
    if (typeof window !== "undefined") {
      window.__ANALYTICS_EVENTS__ = this.eventHistory;
    }
  }

  /**
   * Returns the list of all registered events in the app.
   */
  public getRegisteredEvents(): readonly TrackedEventDefinition[] {
    return TRACKED_EVENTS;
  }

  /**
   * Returns only conversion / key events from the registry.
   */
  public getConversionEvents(): TrackedEventDefinition[] {
    return TRACKED_EVENTS.filter((e) => e.isConversion);
  }

  /**
   * Returns the history array of all events fired in the current session.
   */
  public getHistory(): FiredEventRecord[] {
    return this.eventHistory;
  }

  /**
   * Safe getter for gtag function with dataLayer fallback queue.
   */
  private getGtag(): (...args: any[]) => void {
    if (typeof window === "undefined") {
      return () => {};
    }

    window.dataLayer = window.dataLayer || [];

    if (typeof window.gtag === "function") {
      return window.gtag;
    }

    const gtag = function () {
      window.dataLayer!.push(arguments);
    };
    window.gtag = gtag;
    return gtag;
  }

  /**
   * Core dispatcher: records event to history array and fires to GA4.
   */
  public track(eventName: EventName | string, params: Record<string, any> = {}) {
    if (typeof window === "undefined") return;

    try {
      const gtag = this.getGtag();
      const payload = {
        send_to: this.trackingId,
        ...params,
      };

      // 1. Dispatch to GA4
      gtag("event", eventName, payload);

      // 2. Record to session array
      const record: FiredEventRecord = {
        event: eventName,
        payload,
        timestamp: new Date().toISOString(),
      };
      this.eventHistory.push(record);
      this.syncWindowHistory();

      // 3. Dev logger
      if (this.isDevelopment) {
        console.groupCollapsed(`[Analytics] 📊 Event Fired: ${eventName}`);
        console.log("Registered Definition:", TRACKED_EVENTS.find((e) => e.name === eventName) || "Custom Event");
        console.log("Payload:", payload);
        console.log("Total Events Fired This Session:", this.eventHistory.length);
        console.groupEnd();
      }
    } catch (err) {
      if (this.isDevelopment) {
        console.error(`[Analytics] ❌ Failed to dispatch event "${eventName}":`, err);
      }
    }
  }

  /**
   * Conversion Event: Lead Submission (Fires both GA4 generate_lead and Google Ads conversion)
   */
  public trackLead({ formName, category = "Engagement", value, currency = "INR", ...extra }: LeadEventParams) {
    // 1. GA4 recommended conversion event
    this.track("generate_lead", {
      event_category: category,
      event_label: formName,
      form_name: formName,
      ...(value !== undefined ? { value, currency } : {}),
      send_to: [this.trackingId, GOOGLE_ADS_ID],
      ...extra,
    });

    // 2. Google Ads conversion action event
    this.track("conversion", {
      send_to: GOOGLE_ADS_ID,
      event_category: "Leads",
      event_label: formName,
      ...(value !== undefined ? { value, currency } : {}),
    });
  }

  /**
   * Major Call To Action (CTA) Button Clicks
   */
  public trackCtaClick({ ctaText, location, destinationUrl, ...extra }: CtaEventParams) {
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
    this.track("cta_click", {
      event_category: "Engagement",
      event_label: ctaText,
      cta_text: ctaText,
      click_location: location,
      from_page: currentPath,
      ...(destinationUrl ? { destination_url: destinationUrl } : {}),
      ...extra,
    });
  }

  /**
   * Phone Call Clicks
   */
  public trackPhoneClick({ location, ...extra }: ClickEventParams) {
    this.track("phone_call_click", {
      event_category: "Contact",
      event_label: location,
      click_location: location,
      ...extra,
    });
  }

  /**
   * WhatsApp Chat Clicks (includes originating page and destination)
   */
  public trackWhatsAppClick({
    location,
    pagePath,
    pageTitle,
    targetUrl,
    ...extra
  }: WhatsAppEventParams) {
    const currentPath = pagePath || (typeof window !== "undefined" ? window.location.pathname : "");
    const currentTitle = pageTitle || (typeof window !== "undefined" ? document.title : "");

    this.track("whatsapp_click", {
      event_category: "Contact",
      event_label: location,
      click_location: location,
      from_page: currentPath,
      page_title: currentTitle,
      ...(targetUrl ? { target_url: targetUrl } : {}),
      ...extra,
    });
  }

  /**
   * User Navigation Activity: Tracks when a user moves from one URL to another
   */
  public trackNavigation({
    fromUrl,
    toUrl,
    pageTitle,
    timeSpentSeconds,
    ...extra
  }: NavigationEventParams) {
    this.track("user_navigation", {
      event_category: "Navigation",
      from_url: fromUrl,
      to_url: toUrl,
      page_title: pageTitle || (typeof window !== "undefined" ? document.title : ""),
      ...(timeSpentSeconds !== undefined ? { time_on_previous_page_seconds: timeSpentSeconds } : {}),
      ...extra,
    });
  }

  /**
   * Page View Tracking
   */
  public trackPageView(path?: string, title?: string) {
    const currentPath = path || (typeof window !== "undefined" ? window.location.pathname : "");
    this.track("page_view", {
      page_path: currentPath,
      ...(title ? { page_title: title } : {}),
    });
  }
}

export const analytics = new AnalyticsManager();
