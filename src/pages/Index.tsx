import { useEffect, useState, useRef, useCallback } from "react";
import MicrophoneSidebar from "@/components/MicrophoneSidebar";
import MobileNav from "@/components/MobileNav";
import EventsTimeline from "@/components/EventsTimeline";
import TeamSection from "@/components/TeamSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import RadioPlayer from "@/components/RadioPlayer";
import microphoneImg from "@/assets/microphone.svg";
import logoImg from "@/assets/logo.jpg";

const Index = () => {
  const [dropped, setDropped] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDropped(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate mic position: starts at initial drop position, moves down with scroll
  const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
  const initialMicTop = heroHeight * 0.5 + window.innerHeight * 0.2; // calc(50% + 20vh)
  
  // Mic moves down with scroll from its initial position
  const micTop = initialMicTop + scrollY;
  
  // Timeline cable top position (absolute in page coordinates)
  const timelineTop = timelineRef.current?.getBoundingClientRect().top 
    ? timelineRef.current.getBoundingClientRect().top + window.scrollY 
    : heroHeight;

  // Cable + mic fade out from the bottom as they approach TIM, over FADE_PX, matching the
  // pace at which TeamSection's gradient fades the cable back in below TIM. The cable's
  // BOTTOM is faded by the hero bottom gradient (only the bottom, not the whole line); the
  // mic fades uniformly in lockstep so the two dissolve together (no floating mic).
  const FADE_PX = 200;
  const fadeOut = Math.max(0, Math.min(1, (timelineTop - micTop) / FADE_PX));
  const micOpacity = dropped ? fadeOut : 0;

  const cableHeight = Math.min(micTop, timelineTop);
  const cableOpacity = dropped ? 1 : 0;

  return (
    <div className="grain min-h-screen bg-background">
      <MobileNav />
      <RadioPlayer />

      <MicrophoneSidebar />

      <main className="max-w-5xl mx-auto relative">
          {/* Hero Section */}
          <section
            ref={heroRef}
            className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 lg:pt-0"
          >
            {/* Cable from top - grows with scroll to follow mic */}
            <div
              className="pointer-events-none hidden lg:block absolute left-1/2 top-0 w-[2.5px] bg-foreground -translate-x-1/2 z-[5]"
              style={{
                marginLeft: "1.7px",
                height: dropped ? `${cableHeight}px` : "0px",
                opacity: cableOpacity,
                transition: dropped && scrollY === 0
                  ? "height 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, opacity 0.8s ease-out 0.3s"
                  : "opacity 0.15s ease-out",
              }}
            />

            {/* Fades only the BOTTOM of the cable as it nears TIM (height matches FADE_PX),
                so the cable dissolves from the bottom up — same pace it fades back in below
                TIM. z-10 covers the hero cable (z-5) but stays under the mic (z-20). */}
            <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[200px] bg-gradient-to-t from-background to-transparent z-10" />

            <div
              className="pointer-events-none hidden lg:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center"
              style={{
                top: dropped ? `${micTop}px` : "-200px",
                opacity: micOpacity,
                transition: dropped && scrollY === 0
                  ? "top 1s cubic-bezier(0.22, 1, 0.36, 1) 0.4s"
                  : "none",
              }}
            >
              <img
                src={microphoneImg}
                alt="Studijski mikrofon Crne Sobe"
                className="w-28 md:w-36 h-auto opacity-85"
              />
            </div>

            <h1 className="sr-only">Crna Soba — Alternativni muzički šou iz Beograda</h1>
            {/* Logo image instead of text */}
            <img
              src={logoImg}
              alt="Crna Soba — logo alternativnog muzičkog šoua iz Beograda"
              className="relative z-[1] w-[clamp(280px,50vw,600px)] h-auto"
              style={{
                opacity: dropped ? 1 : 0,
                transition: "opacity 0.8s ease-out 0.6s",
              }}
            />
          </section>

          {/* Ref marker for timeline top */}
          <div ref={timelineRef} />

          <TeamSection />
          <SocialSection />
          <EventsTimeline />
          <ContactSection />
          <FooterSection />
        </main>
    </div>
  );
};

export default Index;
