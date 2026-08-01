import { useEffect, useRef, useState, useCallback } from "react";

// ─── YouTube konfiguracija ────────────────────────────────────────────────────
// Kredencijali se čitaju iz .env (šablon je u .env.example).
// Ako nisu postavljeni, komponenta ostaje na FALLBACK_EPISODES.
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
// ─────────────────────────────────────────────────────────────────────────────

type Episode = {
  id: string;
  title: string;
  desc: string;
  url: string;
  thumb: string;
  past: boolean;
};

const yt = (id: string) => ({
  url: `https://www.youtube.com/watch?v=${id}`,
  thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
});

const FALLBACK_EPISODES: Episode[] = [
  { id: "VTFbOcS7VSo", title: "Crna Soba — Epizoda", desc: "Pogledaj na YouTube", past: true, ...yt("VTFbOcS7VSo") },
  { id: "A2-F4sKXiJY", title: "Crna Soba — Epizoda", desc: "Pogledaj na YouTube", past: true, ...yt("A2-F4sKXiJY") },
  { id: "0hV5xed0SVM", title: "Crna Soba — Epizoda", desc: "Pogledaj na YouTube", past: true, ...yt("0hV5xed0SVM") },
];

async function fetchYouTubeEpisodes(channelId: string, apiKey: string): Promise<Episode[]> {
  // Uploads playlist ID = channel ID sa "UC" → "UU"
  const uploadsPlaylistId = "UU" + channelId.slice(2);

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${uploadsPlaylistId}&key=${apiKey}`
  );

  if (!res.ok) throw new Error(`YouTube API greška: ${res.status}`);

  const data = await res.json();

  return (data.items ?? []).map((item: {
    snippet: {
      resourceId: { videoId: string };
      title: string;
      description: string;
    };
  }) => {
    const videoId: string = item.snippet.resourceId.videoId;
    return {
      id: videoId,
      title: item.snippet.title,
      desc: "Pogledaj na YouTube",
      past: true,
      ...yt(videoId),
    };
  });
}

const EventsTimeline = () => {
  const [episodes, setEpisodes] = useState<Episode[]>(FALLBACK_EPISODES);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [progress, setProgress] = useState<number[]>(() => FALLBACK_EPISODES.map(() => 0));

  useEffect(() => {
    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return;

    fetchYouTubeEpisodes(YOUTUBE_CHANNEL_ID, YOUTUBE_API_KEY)
      .then((eps) => {
        setEpisodes(eps);
        setProgress(eps.map(() => 0));
      })
      .catch((err) => {
        console.error("Nije moguće učitati epizode sa YouTube-a:", err);
      });
  }, []);

  const update = useCallback(() => {
    const root = containerRef.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const centerY = rootRect.top + rootRect.height / 2;
    const next = slideRefs.current.map((el) => {
      if (!el) return 1;
      const r = el.getBoundingClientRect();
      const slideCenter = r.top + r.height / 2;
      const dist = Math.abs(slideCenter - centerY);
      const norm = Math.min(1, dist / (rootRect.height / 2));
      return norm;
    });
    setProgress(next);
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    update();
    root.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      root.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  return (
    <section id="epizode" className="relative h-screen overflow-hidden">
      <h2
        className="font-display text-5xl md:text-7xl tracking-wider text-foreground text-center mt-0 md:mt-2 relative z-30"
      >
        EPIZODE
      </h2>

      {/* Centralni kabl */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2.5px] bg-foreground -translate-x-1/2 z-0"
        style={{ marginLeft: "2px" }}
      />

      {/* Snap slider */}
      <div
        ref={containerRef}
        className="relative h-[calc(100vh-9rem)] md:h-[calc(100vh-11rem)] overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", perspective: "1200px" }}
      >
        {episodes.map((ep, i) => {
          const isLeft = i % 2 === 0;
          const p = progress[i] ?? 0;
          const scale = 1 - p * 0.55;
          const opacity = 1 - p * 0.95;
          const blur = p * 4;
          return (
            <div
              key={ep.id}
              data-id={ep.id}
              ref={(el) => (slideRefs.current[i] = el)}
              className="snap-center min-h-full flex items-center px-4"
            >
              <div className="relative w-full max-w-3xl mx-auto">
                <div
                  className={`flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    filter: `blur(${blur}px)`,
                    transformOrigin: "center center",
                    transition: "opacity 0.15s linear, transform 0.15s linear, filter 0.15s linear",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  <div className={`flex-1 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"} flex justify-center md:block`}>
                    <a
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center gap-2 md:gap-4 md:inline-flex ${isLeft ? "md:flex-row-reverse" : "md:flex-row"} group`}
                    >
                      <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_hsl(15,80%,50%,0.3)] flex-shrink-0">
                        <img src={ep.thumb} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="text-center md:text-left">
                        <p className="text-sm md:text-base text-foreground font-body font-medium">{ep.title}</p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">{ep.desc}</p>
                      </div>
                    </a>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fade u mrak — gore i dole */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-[40%] bg-gradient-to-b from-background via-background/85 to-transparent z-20" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[20%] bg-gradient-to-t from-background via-background/85 to-transparent z-20" />
    </section>
  );
};

export default EventsTimeline;
