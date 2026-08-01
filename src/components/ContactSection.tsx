import { useState } from "react";
import { useScrollReveal } from "./useScrollReveal";
import microphoneImg from "@/assets/microphone.svg";

const ContactSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - would send email
    alert("Hvala! Javićemo ti se uskoro.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="kontakt" className="relative py-24 md:py-32 px-4" ref={ref}>
      {/* Central cable that runs from the epizode section down into the microphone head.
          Solid (no fade) so it never breaks; vh-based so it overlaps the epizode cable on
          any screen height. z-[25] keeps it above the epizode bottom gradient (z-20) but
          behind the head (z-30). It starts below the centered episode thumbnail (~70vh)
          and reaches the mic top (~-70px). */}
      <div
        className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[2.5px] bg-foreground z-[25] pointer-events-none"
        style={{ marginLeft: "2px", top: "-30vh", height: "calc(30vh - 70px)" }}
      />

      {/* Microphone head — terminates the central cable above the contact section.
          z-30 keeps it above all section gradients (max z-20) and always fully solid. */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 -top-16 md:-top-20 z-30 pointer-events-none">
        <img
          src={microphoneImg}
          alt="Studijski mikrofon iznad kontakt sekcije"
          className="w-24 md:w-32 h-auto opacity-100 drop-shadow-[0_0_25px_rgba(0,0,0,0.6)]"
        />
      </div>

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-8 relative z-[1]">
        KONTAKT
      </h2>

      <div
        className="max-w-2xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        <p className="text-muted-foreground font-body text-sm md:text-base mb-4 leading-relaxed">
          Ako imaš nešto što pripada Crnoj Sobi, javi se.
        </p>
        <p className="text-muted-foreground font-body text-sm md:text-base mb-12 leading-relaxed">
          Tražimo muzičare, saradnike, prostore. Sve što diše u mraku.
        </p>

        <a
          href="mailto:crnasoba@email.com"
          className="text-foreground font-body text-lg md:text-xl tracking-wide hover:text-accent transition-colors duration-300 border-b border-border hover:border-accent pb-1"
        >
          crnasoba@email.com
        </a>

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label htmlFor="contact-name" className="sr-only">Ime</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Ime"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border px-0 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border px-0 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">Poruka</label>
            <textarea
              id="contact-message"
              placeholder="Poruka"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border px-0 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="border border-foreground px-8 py-3 text-xs tracking-[0.3em] uppercase font-body text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            POŠALJI
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
