// src/utils/analytics.js
class Analytics {
  constructor() {
    this.userId = this.getUserId();
    this.sessionId = this.getSessionId();
    this.init();
  }

  // Initialize analytics tools
  init() {
    // Initialize Google Analytics
    if (typeof window !== 'undefined' && window.gtag && process.env.REACT_APP_GA_ID) {
      window.gtag('config', process.env.REACT_APP_GA_ID, {
        user_id: this.userId,
        session_id: this.sessionId,
      });
    }

    // Initialize Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq && process.env.REACT_APP_FB_PIXEL_ID) {
      window.fbq('init', process.env.REACT_APP_FB_PIXEL_ID);
      window.fbq('set', 'userId', this.userId);
    }

    // Track initial page view
    this.trackPageView(window.location.pathname, document.title);
  }

  // Get or create persistent user ID
  getUserId() {
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  // Get or create session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  // Track page views
  trackPageView(pagePath, pageTitle) {
    const pageData = {
      page_path: pagePath,
      page_title: pageTitle,
      user_id: this.userId,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    };

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag && process.env.REACT_APP_GA_ID) {
      window.gtag('config', process.env.REACT_APP_GA_ID, {
        page_path: pagePath,
        page_title: pageTitle,
        user_id: this.userId,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Send to backend
    this.sendToBackend('page_view', pageData);
  }

  // Track events
  trackEvent(eventName, eventData = {}) {
    const enrichedData = {
      ...eventData,
      user_id: this.userId,
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    };

    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, enrichedData);
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      // Map standard events to Facebook's standard events
      const fbEventMap = {
        'donation': 'Purchase',
        'sermon_watch': 'WatchVideo',
        'page_view': 'PageView',
        'event_registration': 'CompleteRegistration',
        'prayer_request': 'SubmitApplication',
      };

      const fbEvent = fbEventMap[eventName] || 'Custom';
      
      if (fbEvent === 'Custom') {
        window.fbq('trackCustom', eventName, enrichedData);
      } else {
        window.fbq('track', fbEvent, enrichedData);
      }
    }

    // Send to backend
    this.sendToBackend(eventName, enrichedData);

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}:`, enrichedData);
    }
  }

  // Send to your backend API
  async sendToBackend(eventName, data) {
    try {
      // Don't send in development unless specified
      if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_ANALYTICS_DEBUG) {
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/analytics/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: eventName,
          data: data,
          userId: this.userId,
          sessionId: this.sessionId,
          timestamp: data.timestamp,
        }),
      });

      if (!response.ok) {
        console.warn('Analytics backend error:', response.status);
      }
    } catch (error) {
      // Silently fail - don't disrupt user experience
      if (process.env.NODE_ENV === 'development') {
        console.warn('Analytics backend unavailable:', error);
      }
    }
  }

  // Track donations specifically
  trackDonation(amount, method, purpose = 'general') {
    this.trackEvent('donation', {
      amount,
      method,
      purpose,
      currency: 'NGN',
      transaction_id: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    });
  }

  // Track sermon watching
  trackSermonWatch(sermonId, sermonTitle, duration, completed = false) {
    this.trackEvent('sermon_watch', {
      sermon_id: sermonId,
      sermon_title: sermonTitle,
      duration_seconds: duration,
      completed,
      progress_percentage: completed ? 100 : (duration / (sermonDuration || 3600)) * 100,
    });

    // Track engagement if watched > 5 minutes
    if (duration > 300) {
      this.trackEvent('sermon_engagement', {
        sermon_id: sermonId,
        sermon_title: sermonTitle,
        duration_seconds: duration,
      });
    }
  }

  // Track event registration
  trackEventRegistration(eventId, eventTitle, eventType) {
    this.trackEvent('event_registration', {
      event_id: eventId,
      event_title: eventTitle,
      event_type: eventType,
    });
  }

  // Track prayer requests
  trackPrayerRequest(isPrivate = true) {
    this.trackEvent('prayer_request', {
      is_private: isPrivate,
    });
  }

  // Track newsletter subscription
  trackNewsletterSubscription(email) {
    this.trackEvent('newsletter_subscription', {
      email_hash: this.hashEmail(email),
    });
  }

  // Track search queries
  trackSearch(query, resultsCount) {
    this.trackEvent('search', {
      query,
      results_count: resultsCount,
    });
  }

  // Track sermon downloads
  trackSermonDownload(sermonId, sermonTitle, format = 'audio') {
    this.trackEvent('sermon_download', {
      sermon_id: sermonId,
      sermon_title: sermonTitle,
      format,
    });
  }

  // Track user engagement time
  startEngagementTracking() {
    let startTime = Date.now();
    
    const trackEngagement = () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      if (duration >= 30) { // Only track if > 30 seconds
        this.trackEvent('engagement_time', {
          duration_seconds: duration,
          page_url: window.location.href,
        });
      }
    };

    window.addEventListener('beforeunload', trackEngagement);
    
    // Also track on page hide (for single-page apps)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEngagement();
        startTime = Date.now();
      } else {
        startTime = Date.now();
      }
    });
  }

  // Helper: Hash email for privacy
  hashEmail(email) {
    // Simple hash for privacy - in production, use a proper hashing library
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = ((hash << 5) - hash) + email.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  // Track outbound link clicks
  setupOutboundLinkTracking() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.startsWith(window.location.origin)) {
        this.trackEvent('outbound_link_click', {
          url: link.href,
          text: link.innerText,
        });
      }
    });
  }

  // Track scroll depth
  setupScrollTracking() {
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.floor(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
          this.trackEvent('scroll_depth', {
            percentage: maxScroll,
            page_url: window.location.href,
          });
        }
      }
    };

    window.addEventListener('scroll', trackScroll);
    window.addEventListener('resize', trackScroll);
  }

  // Initialize all tracking
  initAllTracking() {
    this.startEngagementTracking();
    this.setupOutboundLinkTracking();
    this.setupScrollTracking();
  }
}

// Create and export singleton instance
const analytics = new Analytics();

// Initialize tracking
if (typeof window !== 'undefined') {
  analytics.initAllTracking();
}

export default analytics;