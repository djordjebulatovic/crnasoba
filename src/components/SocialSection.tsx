import { useScrollReveal } from "./useScrollReveal";
import { Youtube, Instagram, Music2 } from "lucide-react";
import microphoneImg from "@/assets/microphone.png";

const SocialSection = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section id="prati" className="py-24 md:py-32 px-4 relative" ref={ref}>
      {/* Cable line passing through the entire section, centered between the two blocks */}
      <div className="pointer-events-none hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-foreground -translate-x-1/2 z-0" style={{ marginLeft: "1px" }} />

      {/* Fade kabla iznad/ispod naslova — kao u EPIZODE */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-40 md:h-56 bg-gradient-to-b from-background via-background to-transparent z-[1]" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-16 md:mb-24 relative z-10 text-center -mt-[100px]">
        PRATI NAS
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.6s ease-out",
        }}
      >
        {/* YouTube Block */}
        <div className="border border-border p-8 md:p-10 group hover:border-accent transition-colors duration-500 bg-background">
          <Youtube className="w-12 h-12 text-foreground mb-6 group-hover:text-accent transition-colors" />
          <h3 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mb-3">YOUTUBE</h3>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-sm">
            Sve epizode na jednom mestu. Muzika, mrak, mikrofon.
          </p>


          <a
            href="https://www.youtube.com/@CrnaSoba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-foreground px-8 py-3 text-xs tracking-[0.3em] uppercase font-body text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            PRETPLATI SE
          </a>
        </div>

        {/* Instagram Block */}
        <div className="border border-border p-8 md:p-10 group hover:border-accent transition-colors duration-500 bg-background">
          <Instagram className="w-12 h-12 text-foreground mb-6 group-hover:text-accent transition-colors" />
          <h3 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mb-3">INSTAGRAM</h3>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-sm">
            Iza kulisa Crne Sobe. Priče koje ne staju u epizodu.
          </p>


          <a
            href="https://www.instagram.com/crna.soba/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-foreground px-8 py-3 text-xs tracking-[0.3em] uppercase font-body text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            ZAPRATI
          </a>
        </div>

        {/* TikTok Block */}
        <div className="border border-border p-8 md:p-10 group hover:border-accent transition-colors duration-500 bg-background">
          <Music2 className="w-12 h-12 text-foreground mb-6 group-hover:text-accent transition-colors" />
          <h3 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mb-3">TIKTOK</h3>
          <p className="text-muted-foreground font-body text-sm mb-8 max-w-sm">
            Najbolji momenti, kratki rezovi, mrak u 60 sekundi.
          </p>

          

          <a
            href="https://www.tiktok.com/@crnasoba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-foreground px-8 py-3 text-xs tracking-[0.3em] uppercase font-body text-foreground hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            ZAPRATI
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
