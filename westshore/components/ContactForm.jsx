"use client";

import { useState } from "react";

// DEMO ONLY — this form does not send anywhere yet.
// Wire it to an API route, Formspree, Resend, or the client's CRM at build-out.
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="eyebrow">Request received</span>
        <h3 className="display" style={{ fontSize: "2rem" }}>
          Thank you — we&rsquo;ll be in touch.
        </h3>
        <p>(Demo form — no data was sent.)</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Full name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-community">Community of interest</label>
        <select id="cf-community" name="community" defaultValue="">
          <option value="" disabled>
            Select a community…
          </option>
          <option>Westshore Pines Ranches</option>
          <option>Cypress Bend</option>
          <option>Sandhill Trail</option>
          <option>Not sure yet — send me everything</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message (optional)</label>
        <textarea id="cf-message" name="message" rows={4} />
      </div>
      <button type="submit" className="btn btn-flag">
        Request Property Info
      </button>
    </form>
  );
}
