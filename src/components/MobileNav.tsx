import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "TIM", href: "#tim" },
  { label: "KONTAKT", href: "#kontakt" },
  { label: "EPIZODE", href: "#epizode" },
];

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between p-4 bg-background/90 backdrop-blur-sm">
        <span className="font-display text-2xl tracking-wider text-foreground">CRNA SOBA</span>
        <button
          onClick={() => setOpen(!open)}
          className="text-foreground p-2"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="bg-background/95 backdrop-blur-sm border-b border-border px-6 pb-6 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted-foreground hover:text-foreground text-sm tracking-[0.3em] uppercase transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MobileNav;
