import { useEffect, useState } from "react";

const sections = [
  { label: "TIM", id: "tim" },
  { label: "PRATI NAS", id: "prati" },
  { label: "EPIZODE", id: "epizode" },
  { label: "KONTAKT", id: "kontakt" },
];

const externalLinks = [
  { label: "INSTAGRAM", href: "https://www.instagram.com/crna.soba/" },
  { label: "YOUTUBE", href: "https://www.youtube.com/@CrnaSoba" },
  { label: "TIKTOK", href: "https://www.tiktok.com/@crnasoba" },
];

const MicrophoneSidebar = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoverKontakt, setHoverKontakt] = useState(false);

  useEffect(() => {
    const ratios: Record<string, number> = {};
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios[(e.target as HTMLElement).id] = e.intersectionRatio;
        });
        let bestId = "";
        let best = 0;
        for (const [id, r] of Object.entries(ratios)) {
          if (r > best) {
            best = r;
            bestId = id;
          }
        }
        if (bestId) setActiveSection(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const showExternals = activeSection === "prati" || hoverKontakt;

  const renderLink = (item: { label: string; id: string }) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`text-xs tracking-[0.3em] uppercase transition-colors duration-300 writing-vertical ${
        activeSection === item.id
          ? "text-foreground font-bold"
          : "text-muted-foreground hover:text-foreground font-body"
      }`}
      style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
    >
      {item.label}
    </a>
  );

  return (
    <aside className="hidden lg:flex flex-col items-center justify-center w-[180px] fixed left-0 top-0 h-screen z-40">
      <nav className="flex flex-col gap-5 items-center">
        {renderLink(sections[0])}

        {/* KONTAKT + externals — jedna hover zona */}
        <div
          className="flex flex-col gap-5 items-center"
          onMouseEnter={() => setHoverKontakt(true)}
          onMouseLeave={() => setHoverKontakt(false)}
        >
          {renderLink(sections[1])}
          <div
            className="overflow-hidden transition-all duration-500 ease-out flex flex-col items-center gap-5"
            style={{
              maxHeight: showExternals ? "360px" : "0px",
              opacity: showExternals ? 1 : 0,
            }}
          >
            <div className="w-6 h-px bg-muted-foreground/30 rotate-90 my-1 self-center" />
            {externalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs font-body tracking-[0.3em] uppercase transition-colors duration-300 writing-vertical"
                style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {renderLink(sections[2])}
        {renderLink(sections[3])}
      </nav>
    </aside>
  );
};

export default MicrophoneSidebar;
