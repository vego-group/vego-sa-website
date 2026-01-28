"use client";

import ContactHero from "./ContactHero";

import ContactIntro from "./ContactIntro";
import ContactCards from "./ContactCards";
import LocationSection from "./LocationSection";
import ContactForm from "./ContactForm";

function Contact() {
  return (
    <div className="bg-white">
      {/* Hero stays on top */}
      <ContactHero />

      {/* Contact Content */}
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24 lg:py-28 font-arabic" dir="rtl">
        <ContactIntro />

        <ContactCards />

        <LocationSection />

        <div className="mt-24">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

export default Contact;
