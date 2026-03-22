// src/utils/emailService.js
import emailjs from '@emailjs/browser';

class EmailService {
  constructor() {
    // Initialize EmailJS with your public key
    this.publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    this.serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    this.templateIds = {
      prayer: process.env.REACT_APP_EMAILJS_PRAYER_TEMPLATE,
      contact: process.env.REACT_APP_EMAILJS_CONTACT_TEMPLATE,
      eventRegistration: process.env.REACT_APP_EMAILJS_EVENT_TEMPLATE,
      newsletter: process.env.REACT_APP_EMAILJS_NEWSLETTER_TEMPLATE
    };
    
    emailjs.init(this.publicKey);
  }

  async sendPrayerRequest(data) {
    const templateParams = {
      to_email: 'prayer@dominioncity.org',
      from_name: data.name,
      from_email: data.email,
      prayer_request: data.prayer,
      is_private: data.isPrivate ? 'Yes' : 'No',
      date: new Date().toLocaleString()
    };

    try {
      await emailjs.send(this.serviceId, this.templateIds.prayer, templateParams);
      
      // Send confirmation to user
      await emailjs.send(this.serviceId, this.templateIds.prayer, {
        to_email: data.email,
        from_name: 'Dominion City Prayer Team',
        subject: 'Prayer Request Received',
        message: `Dear ${data.name},\n\nThank you for submitting your prayer request. Our prayer team will stand with you in prayer.\n\nMay God bless you abundantly.\n\nDominion City Prayer Team`
      });
      
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }
  }

  async sendContactMessage(data) {
    const templateParams = {
      to_email: 'info@dominioncity.org',
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      date: new Date().toLocaleString()
    };

    try {
      await emailjs.send(this.serviceId, this.templateIds.contact, templateParams);
      
      // Send confirmation to user
      await emailjs.send(this.serviceId, this.templateIds.contact, {
        to_email: data.email,
        from_name: 'Dominion City Church',
        subject: 'We Received Your Message',
        message: `Dear ${data.name},\n\nThank you for contacting us. We will get back to you within 24-48 hours.\n\nGod bless you!\n\nDominion City Church`
      });
      
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }
  }

  async sendEventRegistration(data) {
    const templateParams = {
      to_email: data.email,
      from_name: 'Dominion City Events',
      event_name: data.eventName,
      event_date: data.eventDate,
      event_time: data.eventTime,
      event_location: data.eventLocation,
      registration_id: data.registrationId,
      attendee_name: data.name,
      attendee_email: data.email,
      attendee_phone: data.phone
    };

    try {
      await emailjs.send(this.serviceId, this.templateIds.eventRegistration, templateParams);
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }
  }

  async subscribeNewsletter(data) {
    const templateParams = {
      to_email: data.email,
      from_name: 'Dominion City Newsletter',
      name: data.name,
      subscribe_date: new Date().toLocaleString()
    };

    try {
      await emailjs.send(this.serviceId, this.templateIds.newsletter, templateParams);
      
      // Also notify admin
      await emailjs.send(this.serviceId, this.templateIds.newsletter, {
        to_email: 'newsletter@dominioncity.org',
        from_name: data.name,
        from_email: data.email,
        subject: 'New Newsletter Subscriber',
        message: `${data.name} (${data.email}) subscribed to the newsletter.`
      });
      
      return { success: true };
    } catch (error) {
      console.error('Email error:', error);
      return { success: false, error };
    }
  }
}

export default new EmailService();