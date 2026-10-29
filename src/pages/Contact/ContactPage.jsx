import React from "react";
import SEO from "../../components/common/SEO";
import ContactCelestialHero from "../../components/common/ContactCelestialHero";
import ContactTrustBar from "../../components/common/ContactTrustBar";
import ContactChannelsSection from "../../components/common/ContactChannelsSection";
import ContactScopingSection from "../../components/common/ContactScopingSection";
import ContactDirectSection from "../../components/common/ContactDirectSection";
import styles from "./ContactPage.module.scss";

const ContactPage = () => {
  return (
    <div className={styles.contactPage}>
      <SEO
        title="Contact & Technical Discovery | RogueAI"
        description="Engage RogueAI for high-performance web systems, fluid mobile apps, and custom AI agents. Direct architect consultations and comprehensive technical scoping."
      />

      {/* Monumental Liquid Chrome Hero */}
      <ContactCelestialHero />

      {/* 4 Architectural Standards Trust Chips */}
      <ContactTrustBar />

      {/* Direct Studio Channels & Live Availability */}
      <ContactChannelsSection />

      {/* Interactive Project Scoping Matrix & Live Receipt */}
      <ContactScopingSection />

      {/* Fast-Track Direct Architecture Inquiry */}
      <ContactDirectSection />
    </div>
  );
};

export default ContactPage;
