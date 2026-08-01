import { useEffect, useState } from "react";
import microphoneImg from "@/assets/microphone.png";

const HeroSection = () => {
  const [dropped, setDropped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDropped(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 lg:pt-0 overflow-hidden">
      {/* Cable from top */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-0"
        style={{
          top: dropped ? 0 : "-100%",
          transition: dropped ? "top 1.2s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      >
        <div className="w-px bg-muted-foreground/40" style={{ height: "100vh" }} />
      </div>

      {/* Title */}
      <h1
        className="font-display text-[clamp(4rem,15vw,12rem)] leading-[0.85] tracking-wider text-foreground relative z-10"
        style={{
          opacity: dropped ? 1 : 0,
          transition: "opacity 0.8s ease-out 0.6s",
        }}
      >
        CRNA SOBA
      </h1>

      {/* Microphone - drops on load, then sticks and travels down the cable on scroll */}
      <div
        className="relative z-20 mt-8"
        style={{
          opacity: dropped ? 1 : 0,
          transform: dropped ? "translateY(0)" : "translateY(-200px)",
          transition: dropped
            ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.8s, opacity 0.3s ease-out 0.8s"
            : "none",
        }}
      >
        <div className="sticky top-[40vh]">
          <div className="flex flex-col items-center">
            <img
              src={microphoneImg}
              alt="Mikrofon"
              className="w-28 md:w-36 h-auto opacity-85"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
