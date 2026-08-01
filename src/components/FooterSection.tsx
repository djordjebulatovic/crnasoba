import { Youtube, Instagram } from "lucide-react";

const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
  </svg>
);

const socials = [
  { icon: Youtube, href: "https://www.youtube.com/@CrnaSoba", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/crna.soba/", label: "Instagram" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@crnasoba", label: "TikTok" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-2xl tracking-wider text-foreground">CRNA SOBA</span>

        <div className="flex items-center gap-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <a
            href="mailto:crnasoba@email.com"
            className="text-muted-foreground hover:text-foreground text-xs font-body tracking-wide transition-colors"
          >
            crnasoba@email.com
          </a>
          <p className="text-muted-foreground/50 text-xs font-body mt-2">
            © 2026 Crna Soba. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
