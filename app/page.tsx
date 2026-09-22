"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Clock3, HeartHandshake, MapPin, Menu, MoveUpRight, ShieldCheck, Target, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

const cohorts = [
  { year: 2012, level: "Consolidare", focus: "Inteligență de joc, tactică și autonomie." },
  { year: 2013, level: "Consolidare", focus: "Decizii rapide și construcția jocului." },
  { year: 2014, level: "Dezvoltare", focus: "Tehnică individuală și joc colectiv." },
  { year: 2015, level: "Dezvoltare", focus: "Controlul mingii, pase și finalizare." },
  { year: 2016, level: "Dezvoltare", focus: "Dribling, orientare și colaborare." },
  { year: 2017, level: "Inițiere", focus: "Primele combinații și bucuria jocului." },
  { year: 2018, level: "Inițiere", focus: "Coordonare și descoperirea mingii." },
  { year: 2019, level: "Primii pași", focus: "Echilibru, mișcare și jocuri cu mingea." },
  { year: 2020, level: "Primii pași", focus: "Motricitate și încredere prin joacă." },
  { year: 2021, level: "Primii pași", focus: "Jocuri simple și plăcerea de a face mișcare." },
];
const benefits = [
  { icon: ShieldCheck, name: "Disciplină", text: "Învățăm să respectăm regulile, colegii și efortul. Pas cu pas, la fiecare antrenament." },
  { icon: Target, name: "Un corp în mișcare", text: "Coordonare, echilibru și condiție fizică. Obiceiuri sănătoase care cresc odată cu ei." },
  { icon: Users, name: "O echipă. Prieteni noi.", text: "Bucuria unei pase reușite și curajul de a conta unii pe alții. Pe teren și în afara lui." },
  { icon: HeartHandshake, name: "Antrenori implicați", text: "Răbdare, atenție și încurajare. Fiecare copil merită să fie văzut și susținut." },
];
const story = [
  { title: "Primul antrenament", intro: "PUȚINE EMOȚII. MULTĂ CURIOZITATE.", text: "Un teren nou. Câțiva colegi pe care încă nu îi cunoaște. Un antrenor care îi spune pe nume. Așa începe încrederea.", caption: "Curajul de a încerca", image: "/images/training-golden-kids.webp", position: "50% 50%" },
  { title: "Primele pase", intro: "DIN ÎNCERCARE ÎN REUȘITĂ.", text: "Mingea nu ajunge mereu unde își dorește. Dar încearcă din nou. Și descoperă că progresul vine din răbdare și exercițiu.", caption: "Bucuria unui pas înainte", image: "/images/passing-golden-kids.webp", position: "15% 50%" },
  { title: "Primul meci", intro: "EMOȚII CARE NE FAC MAI PUTERNICI.", text: "Învață să ia decizii, să câștige cu respect și să piardă cu fruntea sus. Pentru că fiecare meci are ceva de oferit.", caption: "Mai mult decât un rezultat", image: "/images/pitch-golden-kids.webp", position: "70% 50%" },
  { title: "Prima echipă", intro: "DE LA «EU» LA «NOI».", text: "O pasă oferită la timp. O mână întinsă după o cădere. Bucuria împărțită cu ceilalți. Aici, fotbalul devine o lecție de viață.", caption: "Locul în care aparține", image: "/images/team-golden-kids.webp", position: "50% 40%" },
];
const sessions = [
  { years: "2012-2013", from: 2012, to: 2013, days: "Luni · Miercuri · Vineri", time: "18:00-19:30", level: "Consolidare" },
  { years: "2014-2016", from: 2014, to: 2016, days: "Marți · Joi · Sâmbătă", time: "17:30-19:00", level: "Dezvoltare" },
  { years: "2017-2018", from: 2017, to: 2018, days: "Luni · Miercuri", time: "17:00-18:00", level: "Inițiere" },
  { years: "2019-2021", from: 2019, to: 2021, days: "Marți · Joi", time: "16:30-17:30", level: "Primii pași" },
];
const nav = [{ href: "#despre", text: "De ce noi" }, { href: "#grupe", text: "Grupe de vârstă" }, { href: "#program", text: "Program" }, { href: "#galerie", text: "Pe teren" }];

function Brand() {
  return <a href="#acasa" className="brand" aria-label="Academia de Fotbal, începutul paginii"><span className="brand-mark" aria-hidden="true">AF<span>↗</span></span><span className="brand-name">ACADEMIA<span>DE FOTBAL</span></span></a>;
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [trialOpen, setTrialOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState("2017");
  const [scheduleYear, setScheduleYear] = useState("all");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const gallery = [
    { image: "/images/training-golden-kids.webp", title: "Fiecare pas contează.", alt: "Copii în echipament galben exersând driblingul pe teren", className: "gallery-main" },
    { image: "/images/pitch-golden-kids.webp", title: "Aici începe povestea.", alt: "Teren de fotbal la apus, pregătit pentru antrenament", className: "gallery-pitch" },
    { image: "/images/goalkeeper-golden-kids.webp", title: "Curaj la fiecare minge.", alt: "Copil portar în bluză verde și șort negru, pregătit să apere poarta", className: "gallery-team" },
  ];
  const openTrial = (selected?: number) => { if (selected) setYear(String(selected)); setTrialOpen(true); };
  const selectedCohort = cohorts.find(c => c.year === Number(year))!;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let frame = 0, alive = true, visible = true, last = 0;
    let x = 0, y = 0, tx = 0, ty = 0, scroll = 0;
    const hero = heroRef.current!, ball = ballRef.current!, background = backgroundRef.current!;
    const onPointer = (e: PointerEvent) => {
      if (reduced.matches || !fine.matches) return;
      const r = hero.getBoundingClientRect();
      tx = (e.clientX / r.width - .76) * r.width * .65;
      ty = ((e.clientY - r.top) / r.height - .48) * r.height * .50;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    const animate = (time: number) => {
      frame = 0;
      if (!alive || !visible || document.hidden || reduced.matches) return;
      const dt = Math.min(time - (last || time - 16), 40); last = time;
      if (!fine.matches) { tx = Math.sin(time * .00035) * 22; ty = Math.cos(time * .0005) * 18; }
      const ease = 1 - Math.pow(.92, dt / 16.67);
      x += (tx - x) * ease; y += (ty - y) * ease;
      ball.style.transform = `translate3d(${x}px,${y - scroll * .06}px,0) rotate(${x * .055}deg)`;
      background.style.transform = `translate3d(${x * -.025}px,${scroll * .18 + y * -.02}px,0) scale(1.06)`;
      frame = requestAnimationFrame(animate);
    };
    const start = () => { if (!frame && !reduced.matches && visible && !document.hidden) { last = 0; frame = requestAnimationFrame(animate); } };
    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0; scroll = window.scrollY;
      if (storyRef.current && !reduced.matches && window.innerHeight > 740) {
        const r = storyRef.current.getBoundingClientRect();
        const length = Math.max(1, r.height - window.innerHeight);
        const progress = Math.max(0, Math.min(.999, -r.top / length));
        setActiveStory(Math.min(3, Math.floor(progress * 4)));
      }
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
    const onMotion = () => { if (reduced.matches) { cancelAnimationFrame(frame); frame = 0; ball.style.transform = "none"; background.style.transform = "none"; setActiveStory(0); } else start(); };
    const heroObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; } });
    heroObserver.observe(hero);
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); revealObserver.unobserve(entry.target); } }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach(element => { element.classList.add("will-reveal"); revealObserver.observe(element); });
    hero.addEventListener("pointermove", onPointer); hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", start); reduced.addEventListener("change", onMotion);
    updateScroll(); start();
    return () => { alive = false; cancelAnimationFrame(frame); cancelAnimationFrame(scrollFrame); heroObserver.disconnect(); revealObserver.disconnect(); hero.removeEventListener("pointermove", onPointer); hero.removeEventListener("pointerleave", onLeave); window.removeEventListener("scroll", onScroll); document.removeEventListener("visibilitychange", start); reduced.removeEventListener("change", onMotion); };
  }, []);

  const jumpStory = (index: number) => {
    const el = storyRef.current; if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top + (el.offsetHeight - window.innerHeight) * (index / 4 + .02);
    window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };

  return <>
    <a className="skip-link" href="#continut">Mergi la conținut</a>
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Navigare principală">{nav.map(n => <a key={n.href} href={n.href}>{n.text}</a>)}</nav>
      <Button className="button header-cta" onClick={() => openTrial()}>Vino la o probă <ArrowUpRight size={18} /></Button>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger asChild><Button className="menu-button" variant="ghost" size="icon" aria-label="Deschide meniul"><Menu /></Button></SheetTrigger>
        <SheetContent className="mobile-menu" showCloseButton={false}>
          <SheetTitle className="mobile-title">Academia de Fotbal</SheetTitle><SheetDescription className="sr-only">Navigarea paginii</SheetDescription>
          <SheetClose asChild><Button className="close-button" variant="ghost" size="icon" aria-label="Închide meniul"><X /></Button></SheetClose>
          <nav aria-label="Navigare pe mobil">{nav.map((n,i) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}><span>0{i+1}</span>{n.text}<ArrowUpRight /></a>)}</nav>
          <Button className="button" onClick={() => { setMenuOpen(false); openTrial(); }}>Vino la o probă <ArrowRight /></Button><p>Fotbal pentru copii.<br />Caracter pentru viață.</p>
        </SheetContent>
      </Sheet>
    </header>
    <main id="continut">
      <section className="hero" id="acasa" ref={heroRef} aria-labelledby="hero-title">
        <img className="hero-background" ref={backgroundRef} src="/images/pitch-golden-kids.webp" alt="" fetchPriority="high" />
        <div className="hero-shade" /><div ref={ballRef} className="hero-ball" aria-hidden="true"><img src="/images/ball.webp" alt="" /></div>
        <div className="hero-content container">
          <div className="eyebrow hero-eyebrow"><span className="badge">GRUPE 2012-2021</span><span>UN ÎNCEPUT CARE CONTEAZĂ.</span></div>
          <h1 id="hero-title">Fotbal pentru copii.<br /><span>Caracter</span> pentru viață.</h1>
          <p className="hero-description">Antrenamente pentru grupele 2012-2021, într-un mediu sigur, disciplinat și plin de energie.</p>
          <div className="hero-actions"><Button className="button" onClick={() => openTrial()}>Înscrie copilul la o probă <ArrowUpRight /></Button><a className="text-link" href="#grupe">Vezi grupele de vârstă <ArrowDown size={17} /></a></div>
        </div>
        <div className="hero-bottom container"><a className="scroll-cue" href="#despre"><span><ArrowDown size={18} /></span>POVESTEA ÎNCEPE AICI</a><p>Antrenamente structurate <span>•</span> Dezvoltare fizică <span>•</span> Spirit de echipă</p><span className="hero-index" aria-hidden="true">01 / 09</span></div>
        <div className="side-label" aria-hidden="true">MAI MULT DECÂT UN JOC.</div>
      </section>
      <div className="values-ribbon" aria-hidden="true"><span>PASIUNE</span><span className="ribbon-star">✳</span><span>DISCIPLINĂ</span><span className="ribbon-star">✳</span><span>ÎNCREDERE</span><span className="ribbon-star">✳</span><span>ECHIPĂ</span><span className="ribbon-star">✳</span><span>BUCURIA JOCULUI</span><span className="ribbon-star">✳</span></div>
      <section className="section benefits-section" id="despre"><div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">01</span> MAI MULT DECÂT FOTBAL</p><h2>De ce fotbal<br /><span className="yellow">la noi?</span></h2></div><p>Nu fiecare copil va deveni fotbalist.<br />Dar fiecare copil poate deveni mai încrezător, mai perseverent și un coleg mai bun.</p></div>
        <div className="benefits-grid">{benefits.map((b,i) => <article className="benefit" key={b.name} data-reveal><div className="benefit-top"><b.icon strokeWidth={1.3} /><span>0{i+1}</span></div><h3>{b.name}</h3><p>{b.text}</p></article>)}</div>
      </div></section>
      <section className="section cohorts-section" id="grupe"><div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">02</span> FIECARE VÂRSTĂ, RITMUL EI</p><h2>Locul lui e<br /><span className="yellow">într-o echipă.</span></h2></div><div className="section-copy"><h3>Grupe de vârstă</h3><p>De la primele atingeri ale mingii la un joc tot mai sigur. Alege anul nașterii și descoperă ce exersăm împreună.</p></div></div>
        <div className="cohorts-grid">{cohorts.map(c => <button key={c.year} className="cohort-card" onClick={() => openTrial(c.year)} data-reveal aria-label={`Grupa ${c.year}, ${c.level}. Vezi detalii despre probă`}><div className="cohort-top"><span>ANUL NAȘTERII</span><ArrowUpRight size={20} /></div><h3>{c.year}</h3><span className="level-pill">{c.level}</span><p>{c.focus}</p></button>)}</div>
        <p className="section-footnote"><span className="small-line" /> Experiența anterioară nu este obligatorie. Ritmul potrivit se stabilește împreună cu antrenorul.</p>
      </div></section>
      <section className="story-section" ref={storyRef} aria-label="Povestea unui început în fotbal"><div className="story-sticky">
        <div className="story-photo" aria-hidden="true">{story.map((s,i) => <img key={s.title} src={s.image} className={i === activeStory ? "active" : ""} style={{objectPosition:s.position}} alt="" loading="lazy" />)}<div className="story-photo-shade" /><span className="story-photo-label">{story[activeStory].caption}</span><span className="story-photo-number">0{activeStory+1}</span></div>
        <div className="story-content"><p className="eyebrow"><span className="section-number">03</span> PAȘI MICI. SCHIMBĂRI MARI.</p><div className="story-beats">{story.map((s,i) => <article key={s.title} className={`story-beat ${i === activeStory ? "active" : ""}`}><p className="story-intro">{s.intro}</p><h2>{s.title.split(" ")[0]}<br /><span className="yellow">{s.title.split(" ").slice(1).join(" ")}</span></h2><p className="story-text">{s.text}</p></article>)}</div><nav className="story-steps" aria-label="Etapele poveștii">{story.map((s,i) => <button key={s.title} onClick={() => jumpStory(i)} className={i === activeStory ? "active" : ""} aria-label={s.title} aria-current={i === activeStory ? "step" : undefined}><span>0{i+1}</span><i /></button>)}</nav><p className="story-scroll">Continuă să descoperi <ArrowDown size={15} /></p></div>
      </div></section>
      <section className="section schedule-section" id="program"><div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">04</span> FACEM LOC MIȘCĂRII</p><h2>Program<br /><span className="yellow">antrenamente.</span></h2></div><div className="section-copy"><p>Un ritm constant. Timp pentru progres, timp pentru școală, timp pentru copilărie.</p><label htmlFor="schedule-year">Alege anul nașterii</label><NativeSelect id="schedule-year" value={scheduleYear} onChange={e => setScheduleYear(e.target.value)} className="schedule-select"><NativeSelectOption value="all">Toate grupele</NativeSelectOption>{cohorts.map(c => <NativeSelectOption key={c.year} value={c.year}>{c.year}</NativeSelectOption>)}</NativeSelect></div></div>
        <div className="schedule-notice"><span className="example-pill">PROGRAM ORIENTATIV</span><p>Zilele, orele și locația de mai jos sunt exemple. Programul final va fi confirmat de club.</p></div>
        <div className="schedule-table"><div className="schedule-table-head"><span>GRUPA</span><span>ZILE DE ANTRENAMENT</span><span>INTERVAL ORAR</span><span>NIVEL</span></div>{sessions.filter(s => scheduleYear === "all" || (Number(scheduleYear) >= s.from && Number(scheduleYear) <= s.to)).map(s => <div className="schedule-row" key={s.years}><strong>{s.years}</strong><span>{s.days}</span><span className="session-time"><Clock3 size={16} />{s.time}</span><span className="session-level">{s.level}</span></div>)}</div>
        <div className="schedule-location"><MapPin size={19} /><div><strong>Terenul de antrenament</strong><span>Locația și adresa vor fi anunțate de club.</span></div><span className="location-decoration" aria-hidden="true">NE VEDEM PE TEREN.</span></div>
      </div></section>
      <section className="development-section" id="dezvoltare">
        <div className="development-image"><img src="/images/coaching-golden-kids.webp" alt="Antrenor oferind îndrumare individuală unui copil în echipamentul Golden Kids" loading="lazy" /><div className="image-note"><span>PROGRESUL SE CONSTRUIEȘTE.</span><strong>Un antrenament<br />după altul.</strong></div></div>
        <div className="development-content" data-reveal><p className="eyebrow"><span className="section-number">05</span> O BAZĂ SOLIDĂ PENTRU VIITOR</p><h2>Ce primește<br /><span className="yellow">copilul.</span></h2><div className="development-list">{[
          ["Antrenamente adaptate vârstei", "Exerciții și provocări potrivite etapei în care se află."],
          ["Dezvoltare tehnică", "Controlul mingii, pase, dribling și finalizare, cu răbdare și repetiție."],
          ["Jocuri și competiții", "Ocazii de a pune în practică ce învață și de a se bucura de echipă."],
          ["Feedback pentru părinți", "O perspectivă clară asupra progresului și a pașilor următori."],
        ].map(([title,desc],i) => <div key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{desc}</p></div><Check size={19} /></div>)}</div></div>
      </section>
      <section className="section gallery-section" id="galerie"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">06</span> ENERGIE CARE SE VEDE</p><h2>Mai puține ecrane.<br /><span className="yellow">Mai mult teren.</span></h2></div><p>Mingi în mișcare. Genunchi pe iarbă.<br />Bucurii care nu încap într-un scor.</p></div><div className="gallery-grid">{gallery.map((g,i) => <button className={`gallery-item ${g.className}`} key={g.title} onClick={() => setGalleryIndex(i)} aria-label={`Mărește fotografia: ${g.title}`} data-reveal><img src={g.image} alt={g.alt} loading="lazy" /><div><span>0{i+1} / PE TEREN</span><h3>{g.title}</h3></div><span className="gallery-expand"><MoveUpRight size={21} /></span></button>)}</div><p className="image-disclosure">Imagini ilustrative. Fotografiile clubului vor fi adăugate înainte de lansare.</p></div></section>
      <section className="section testimonials-section"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow"><span className="section-number">07</span> PRIVIT PRIN OCHII PĂRINȚILOR</p><h2>Progres pe teren.<br /><span className="yellow">Bucurie acasă.</span></h2></div><p>Exemple de mărturii pentru prezentare.<br />Vor fi înlocuite cu experiențele reale ale părinților.</p></div><div className="testimonials-grid">{[
        ["La început era timid și stătea mai mult pe margine. Acum își pregătește singur echipamentul și abia așteaptă să își vadă colegii.", "Părinte · grupa 2017", "01"],
        ["Apreciez că nu este vorba doar despre rezultat. Învață să fie atent, să respecte regulile și să nu renunțe când ceva nu îi iese din prima.", "Părinte · grupa 2014", "02"],
        ["Pentru noi contează să vină cu drag și să plece cu un zâmbet. Se mișcă mai mult, are mai mult curaj și a găsit un loc în care se simte bine.", "Părinte · grupa 2019", "03"],
      ].map(([quote,parent,index]) => <figure className="testimonial" key={index} data-reveal><div className="quote-mark" aria-hidden="true">“</div><blockquote>{quote}</blockquote><figcaption><span className="parent-initial" aria-hidden="true">{index}</span><div>{parent}<span>Exemplu ilustrativ</span></div></figcaption></figure>)}</div></div></section>
      <section className="final-cta" id="proba"><div className="container" data-reveal><p className="eyebrow"><span className="section-number">08</span> PRIMUL PAS E CEL MAI IMPORTANT</p><h2>Hai să vedem cum<br />se descurcă <span>pe teren.</span></h2><div className="final-cta-bottom"><p>Nu trebuie să știe deja fotbal.<br />E suficient să vrea să încerce.</p><Button className="button button-dark" onClick={() => openTrial()}>Programează o probă <ArrowUpRight /></Button></div></div><span className="final-watermark" aria-hidden="true">ÎMPREUNĂ.</span></section>
    </main>
    <footer className="site-footer container"><div className="footer-top"><Brand /><p>Fotbal pentru copii.<br />Caracter pentru viață.</p><a href="#acasa" className="back-top">Înapoi sus <ArrowUpRight size={20} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Academia de Fotbal</span><span>Concept de prezentare · Grupe 2012-2021</span><span>Cu pasiune pentru joc.</span></div></footer>
    <Dialog open={trialOpen} onOpenChange={setTrialOpen}><DialogContent className="trial-dialog" showCloseButton={false}><DialogClose asChild><Button variant="ghost" size="icon" className="close-button" aria-label="Închide detaliile probei"><X /></Button></DialogClose><p className="eyebrow">NE VEDEM PE TEREN</p><DialogTitle className="modal-title">Un început<br /><span className="yellow">cu încredere.</span></DialogTitle><DialogDescription className="modal-description">Alege anul nașterii copilului și descoperă grupa potrivită pentru primul antrenament.</DialogDescription><label htmlFor="trial-year">Anul nașterii copilului</label><NativeSelect id="trial-year" value={year} onChange={e => setYear(e.target.value)}>{cohorts.map(c => <NativeSelectOption key={c.year} value={c.year}>{c.year}</NativeSelectOption>)}</NativeSelect><div className="trial-group"><strong>Grupa {year}</strong><span className="level-pill">{selectedCohort.level}</span><p>{selectedCohort.focus}</p></div><div className="trial-checklist"><p>Pentru prima întâlnire:</p><span><Check size={17} /> Echipament sportiv comod</span><span><Check size={17} /> Încălțăminte potrivită terenului</span><span><Check size={17} /> Apă și poftă de joacă</span></div><p className="trial-notice">Programările nu sunt încă disponibile. Datele de contact și programul final vor fi anunțate de club. Nu se înregistrează nicio rezervare pe această pagină.</p><Button className="button" onClick={() => { setScheduleYear(year); setTrialOpen(false); setTimeout(() => document.getElementById("program")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }), 80); }}>Vezi programul orientativ <ArrowRight /></Button></DialogContent></Dialog>
    <Dialog open={galleryIndex !== null} onOpenChange={open => { if (!open) setGalleryIndex(null); }}><DialogContent className="gallery-dialog" showCloseButton={false}><DialogTitle className="sr-only">{galleryIndex !== null ? gallery[galleryIndex].title : "Fotografii de pe teren"}</DialogTitle><DialogDescription className="sr-only">Fotografie ilustrativă de la antrenament.</DialogDescription><DialogClose asChild><Button variant="ghost" size="icon" className="close-button" aria-label="Închide fotografia"><X /></Button></DialogClose>{galleryIndex !== null && <><img src={gallery[galleryIndex].image} alt={gallery[galleryIndex].alt} /><div className="gallery-dialog-bottom"><Button variant="ghost" size="icon" aria-label="Fotografia anterioară" onClick={() => setGalleryIndex((galleryIndex + 2) % 3)}><ChevronLeft /></Button><span>{gallery[galleryIndex].title} <small>{galleryIndex+1} / 3</small></span><Button variant="ghost" size="icon" aria-label="Fotografia următoare" onClick={() => setGalleryIndex((galleryIndex + 1) % 3)}><ChevronRight /></Button></div></>}</DialogContent></Dialog>
  </>;
}
