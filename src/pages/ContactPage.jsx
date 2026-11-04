import React, { Suspense, lazy } from "react";
import SEO from "../components/common/SEO";
import ContactCelestialHero from "../components/contact/ContactCelestialHero";
import ContactTrustBar from "../components/contact/ContactTrustBar";
import styles from "./ContactPage.module.scss";

// Lazy-load below-the-fold channels, 3-stage scoping matrix, and voice dispatcher
const ContactChannelsSection = lazy(() => import("../components/contact/ContactChannelsSection"));
const ContactScopingSection = lazy(() => import("../components/contact/ContactScopingSection"));
const ContactDirectSection = lazy(() => import("../components/contact/ContactDirectSection"));

const SectionFallback = () => <div style={{ minHeight: "220px" }} aria-hidden="true" />;

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <SEO
        title="Contact & Technical Discovery | RogueAI"
        description="Engage RogueAI for high-performance web systems, fluid mobile apps, and custom AI agents. Direct architect consultations and comprehensive technical scoping."
      />

      {/* Monumental Liquid Chrome Hero (Eager LCP) */}
      <ContactCelestialHero />

      {/* 4 Architectural Standards Trust Chips */}
      <ContactTrustBar />

      {/* Direct Studio Channels & Live Availability */}
      <Suspense fallback={<SectionFallback />}>
        <ContactChannelsSection />
      </Suspense>

      {/* Interactive Project Scoping Matrix & Live Receipt */}
      <Suspense fallback={<SectionFallback />}>
        <ContactScopingSection />
      </Suspense>

      {/* Fast-Track Direct Architecture Inquiry (Voice & Prompt Dispatcher) */}
      <Suspense fallback={<SectionFallback />}>
        <ContactDirectSection />
      </Suspense>
    </div>
  );
};

export default ContactPage;
