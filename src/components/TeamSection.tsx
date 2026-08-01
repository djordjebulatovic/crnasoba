import { useScrollReveal } from "./useScrollReveal";
import team1 from "@/assets/veljan.jpg";
import team2 from "@/assets/team2.jpg";

const team = [
  { name: "Vasilije Vasic", role: "Režija", bio: "Vidi u mraku bolje nego iko.", image: team1 },
  { name: "Veljko Stamenkovic", role: "Produkcija", bio: "Drži sve konce. Bukvalno.", image: team2 },
  { name: "Nikola Todorovic", role: "Kamera", bio: "Snima tamu kao niko drugi.", image: team1 },
  { name: "Relja Svilar", role: "Social Media", bio: "Crna Soba, ali online.", image: team1 },
];

const TeamSection = () => {
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <section id="tim" className="py-24 md:py-32 px-4 relative" ref={ref}>
      {/* The cable continues */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-foreground -translate-x-1/2 z-0" style={{ marginLeft: "1px" }} />

      {/* Fade kabla iznad/ispod naslova — kao u EPIZODE */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-40 md:h-56 bg-gradient-to-b from-background via-background to-transparent z-[1]" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-32 md:h-40 bg-gradient-to-t from-background to-transparent z-[1]" />

      <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-16 md:mb-24 text-center relative z-10 -mt-[100px]">
        TIM
      </h2>

      <div className="relative max-w-3xl mx-auto">
        {team.map((member, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={member.name}
              className={`flex items-center mb-16 md:mb-20 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.6s ease-out",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Content side */}
              <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} flex justify-center md:block`}>
                <div className={`flip-card inline-block ${isLeft ? "md:ml-auto" : ""}`}>
                  <div className={`flex items-center gap-4 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} flex-col`}>
                    <div className="flip-card w-48 h-48 md:w-60 md:h-60 cursor-pointer flex-shrink-0">
                      <div className="flip-card-inner relative w-full h-full">
                        {/* Front */}
                        <div className="flip-card-front absolute inset-0">
                          <div className="w-full h-full rounded-full overflow-hidden border border-border">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        {/* Back */}
                        <div className="flip-card-back absolute inset-0">
                          <div className="w-full h-full rounded-full bg-secondary flex flex-col items-center justify-center px-3 border border-border">
                            <p className="text-accent text-[10px] tracking-[0.2em] uppercase font-body mb-1">{member.role}</p>
                            <p className="text-muted-foreground text-[10px] font-body text-center italic">{member.bio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-body font-medium tracking-wide">{member.name}</p>
                  </div>
                </div>
              </div>

              {/* Center dot on the cable - w-0 keeps it centered on the line */}
              <div className="hidden md:flex items-center justify-center w-0 relative z-10">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              </div>

              {/* Empty side */}
              <div className="hidden md:block flex-1" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TeamSection;
