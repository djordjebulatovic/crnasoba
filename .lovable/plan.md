## Plan: EPIZODE kao vertikalni scroll-snap slider

### Cilj
Sekcija EPIZODE se ne razvlači beskonačno — postaje fiksne visine sa internim vertikalnim skrolovanjem (scroll-snap), tako da staje neograničen broj epizoda. Sve epizode u jednoj listi, hronološki, sa badge-om za status (Završeno / Uskoro).

### UX ponašanje
- Sekcija visine `100vh` (desktop) / `90vh` (mobile), sticky-stil prikaz dok korisnik skroluje stranicu kroz nju.
- Unutar sekcije: vertikalni kontejner sa `overflow-y: auto` i `scroll-snap-type: y mandatory`.
- Svaka epizoda = jedan snap blok (`scroll-snap-align: center`), prikazana kao kartica sa thumbnail krugom + naslov/datum/opis (zadržava postojeći stil iz `EventsTimeline.tsx`).
- Točak miša / swipe pomera epizode jednu po jednu. Kada se dođe do kraja liste, skrol se "oslobađa" i nastavlja na sledeću sekciju (KONTAKT).
- Centralni kabl prolazi kroz sredinu sekcije kao i do sada; aktivna epizoda ima naglašen marker (akcent boja), ostale prigušen.
- Levo/desno alternacija ostaje (parna levo, neparna desno).

### Vizuelne naznake
- Gore i dole unutar slidera blagi fade gradient (od `background` ka transparent) da se vidi da ima još sadržaja.
- Mali indikator sa strane: vertikalne tačkice (jedna po epizodi) koje pokazuju poziciju; aktivna je akcent.
- Hronološki redosled (najstarija → najnovija ili obrnuto — default: najnovija prva).
- Status badge na svakoj kartici: "ZAVRŠENO" (muted) ili "USKORO" (akcent).

### Tehnički detalji
- Fajl: `src/components/EventsTimeline.tsx` — refaktor.
- Ukloniti `pastEvents`/`futureEvents` split i "SADA" marker; jedan niz `events` sortiran po datumu.
- Struktura:
  ```
  <section id="epizode" class="relative h-screen overflow-hidden">
    <h2>EPIZODE</h2>
    <div class="cable" />               // centralna vertikala
    <div class="snap-container          // overflow-y-auto, snap-y mandatory
                scrollbar-hide">
      {events.map(ep => <EpisodeSlide />)}
    </div>
    <div class="fade-top" /> <div class="fade-bottom" />
    <ol class="dots-indicator" />       // desno fiksno unutar sekcije
  </section>
  ```
- Aktivna epizoda: `IntersectionObserver` na svakom slide-u (threshold ~0.6) postavlja `activeId` state — koristi se za bold marker i za dots indicator.
- Sticky-feel: koristiti običan `h-screen` blok; pošto je scroll lokalni (unutrašnji `overflow-y-auto`), spoljnji page-scroll prirodno ide dalje kada unutrašnji dođe do dna (default browser behavior, bez extra JS-a).
- `scrollbar-hide` utility (Tailwind: `[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`).
- Kabl i postojeća tipografija/dimenzije thumbova ostaju nepromenjeni.

### Fajlovi koji se menjaju
- `src/components/EventsTimeline.tsx` — kompletan refaktor sekcije.
- `mem://features/episodes-timeline` — update opisa (slider umesto past/future split).
- `mem://index.md` — update reference za EPIZODE.

### Šta ostaje isto
- Pozicija sekcije u page order (TIM → PRATI NAS → EPIZODE → KONTAKT).
- Centralni kabl, alternacija levo/desno, font i boje (semantic tokens).
- Postojeći podaci/slike epizoda.