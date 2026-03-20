import { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";
import ThreeBackdrop from "./components/ThreeBackdrop";
import AnimateUI from "./components/AnimateUI";

const stats = [
  { value: "6", label: "Challenge Modules" },
  { value: "48H", label: "Duration" },
  { value: "3", label: "Winner Tiers" },
  { value: "200+", label: "Participants Expected" }
];

const challengeTracks = [
  {
    name: "Guardrail Bypass",
    level: "Beginner",
    desc: "Craft prompts that force model behavior beyond normal policy boundaries.",
    tags: ["Prompt Injection", "Role Play"]
  },
  {
    name: "Context Manipulation",
    level: "Intermediate",
    desc: "Use long-context, memory drift, and multi-turn strategy to steer outputs.",
    tags: ["Multi-turn", "Memory"]
  },
  {
    name: "System Prompt Extraction",
    level: "Intermediate",
    desc: "Reverse engineer hidden policy instructions from observable responses.",
    tags: ["Recon", "OSINT"]
  },
  {
    name: "Adversarial Prompting",
    level: "Advanced",
    desc: "Design compact high-impact prompts with reproducible jailbreak behavior.",
    tags: ["Optimization", "Automated"]
  },
  {
    name: "Agent Exploitation",
    level: "Advanced",
    desc: "Target tool-using agent flows and induce unintended actions safely.",
    tags: ["Agentic AI", "Tool Use"]
  },
  {
    name: "Zero-Day Track",
    level: "Expert",
    desc: "Discover genuinely novel vectors not covered by standard red-team playbooks.",
    tags: ["Novel", "Research"]
  }
];

const rules = [
  "Teams of 1-3 members. Solo participants welcome.",
  "Every jailbreak submission must include a reproducible prompt chain.",
  "Scoring is based on severity, novelty, and reproducibility.",
  "Use provided sandbox assets only, no production API brute force.",
  "Responsible disclosure is mandatory for all findings.",
  "Judging decisions are final. Plagiarism leads to disqualification."
];

const memories = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1614064641913-6b7141508db8?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=400&h=300",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=400&h=300"
];

const timeline = [
  {
    date: "April 1 - 3",
    title: "Registration Period",
    desc: "Sign up on Unstop to secure your spot in the league. Limited entries available."
  },
  {
    date: "April 4",
    title: "Mock Contest",
    desc: "Get familiar with the platform and testing environment. Not scored."
  },
  {
    date: "April 5 | 10:00 AM",
    title: "Project 0 Qualifier",
    desc: "The online battle begins. Two hours of algorithmic challenges."
  },
  {
    date: "April 5 | 03:00 PM",
    title: "Finalists Announcement",
    desc: "The top 50 participants who qualify for the grand finale are announced."
  },
  {
    date: "April 10",
    title: "Grand Finale and Ceremony",
    desc: "The offline showdown at Galgotias Campus, followed by the prize ceremony."
  }
];

export default function App() {
  useEffect(() => {
    const animations = [];

    animations.push(anime({
      targets: ".hero-glow",
      opacity: [0.2, 0.6],
      scale: [0.92, 1.03],
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      duration: 3200
    }));

    anime.set(".track-card, .stat-card, [data-animate]", { opacity: 0, translateY: 30 });
    anime.set(".timeline-card, .timeline-node", { opacity: 0 });
    anime.set(".timeline-rail", { scaleY: 0 });

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.removeAttribute("data-animate");
          target.setAttribute("data-animated", "true");
          
          if (target.classList.contains("track-card") || target.classList.contains("stat-card")) {
             anime({ targets: target, translateY: [30, 0], opacity: [0, 1], duration: 800, easing: "easeOutExpo" });
          } else if (target.classList.contains("timeline-shell")) {
             anime({ targets: ".timeline-rail", scaleY: [0, 1], duration: 1300, easing: "easeOutExpo" });
             anime({ targets: ".timeline-card", opacity: [0, 1], translateY: [32, 0], delay: anime.stagger(130), duration: 900, easing: "easeOutExpo" });
             anime({ targets: ".timeline-node", scale: [0.5, 1], opacity: [0, 1], delay: anime.stagger(130), duration: 700, easing: "easeOutBack" });
             animations.push(anime({ targets: ".timeline-node", boxShadow: ["0 0 0 4px rgba(0,255,136,0.08), 0 0 14px rgba(0,255,136,0.55)", "0 0 0 8px rgba(0,255,136,0.02), 0 0 28px rgba(0,255,136,0.95)"], direction: "alternate", loop: true, easing: "easeInOutSine", duration: 1800, delay: anime.stagger(170) }));
          } else {
             anime({ targets: target, opacity: [0, 1], translateY: [30, 0], duration: 900, easing: "easeOutExpo" });
          }
          scrollObserver.unobserve(target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll("[data-animate], .track-card, .stat-card, .timeline-shell");
    elements.forEach(el => scrollObserver.observe(el));

    return () => {
      scrollObserver.disconnect();
      animations.forEach((instance) => instance.pause());
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-void text-white selection:bg-neon/25 selection:text-white">
      <ThreeBackdrop />

      <div className="scanline-overlay pointer-events-none fixed inset-0 z-0" />
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0" />
      <div className="scanline-moving pointer-events-none fixed inset-0 z-10 hidden md:block" />

      <AnimateUI className="relative z-10">
        <header
          data-animate
          className="sticky top-0 z-50 border-b border-slate-800/90 bg-black/70 px-6 py-4 backdrop-blur md:px-10"
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
            <a href="#hero" className="font-semibold tracking-[0.2em] text-neon">
              PROJECT_0
            </a>
            <nav className="hidden gap-8 text-xs uppercase tracking-[0.18em] text-slate-300 md:flex">
              <a href="#about" className="transition hover:text-neon">About</a>
              <a href="#challenges" className="transition hover:text-neon">Challenges</a>
              <a href="#rules" className="transition hover:text-neon">Rules</a>
              <a href="#prizes" className="transition hover:text-neon">Prizes</a>
              <a href="#memories" className="transition hover:text-neon">Memories</a>
              <a href="#register" className="transition hover:text-neon">Register</a>
            </nav>
            <div className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-neon md:flex">
              <span className="status-dot" /> Registrations Open
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-10 md:px-10">
          <section
            id="hero"
            data-animate
            className="relative overflow-hidden rounded-2xl border border-emerald-900/40 bg-surface/80 p-8 md:p-12"
          >
            <div className="hero-glow absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-neon">LLM Security Challenge - Red Team Event</p>
            <h1 className="mt-4 font-sans text-5xl font-bold leading-[0.95] md:text-8xl">
              <span className="glitch-text" data-text="PROJECT">PROJECT</span>
              <span className="mt-2 block text-cyan-300">ZERO_</span>
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
              <span className="typing-wrapper block mb-2 font-mono text-xs uppercase tracking-widest text-neon">
                &gt; INITIALIZING RED TEAM PROTOCOL_
              </span>
              <span className="block hover-glitch">
                Break the model. Exploit the guardrails. Rewrite the rules. A hands-on jailbreak event
                where language, logic, and adversarial creativity decide the leaderboard.
              </span>
            </p>
            <div id="register" className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://unstop.com"
                target="_blank"
                rel="noreferrer"
                className="hover-glitch rounded-md bg-neon px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-emerald-300"
              >
                Register Now
              </a>
              <a
                href="#challenges"
                className="rounded-md border border-neon px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-neon transition hover:bg-emerald-500/10"
              >
                View Challenges
              </a>
            </div>
          </section>

          <section data-animate className="grid gap-px overflow-hidden rounded-xl border border-slate-800 bg-slate-800 md:grid-cols-4">
            {stats.map((item) => (
              <article key={item.label} className="stat-card bg-slate-950/90 px-6 py-7 text-center">
                <p className="font-sans text-4xl font-bold text-neon">{item.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
              </article>
            ))}
          </section>

          <section id="about" data-animate className="grid gap-6 md:grid-cols-2">
            <article className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-neon">What is this</p>
              <h2 className="mt-4 font-sans text-4xl font-bold leading-tight text-white md:text-5xl hover-glitch">
                Red Teaming an AI
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-300">
                Project Zero is a practical LLM red-teaming challenge focused on adversarial prompting,
                policy stress testing, and responsible disclosure.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-400">
                Unlike standard CTFs, this event evaluates impact, novelty, and reproducibility of prompt
                chains rather than code exploits.
              </p>
            </article>

            <article className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="ml-auto text-[11px] uppercase tracking-[0.14em] text-slate-500">red_team_session.sh</span>
              </div>
              <div className="space-y-2 text-xs leading-6 text-slate-300">
                <p><span className="text-neon">$</span> initialize_target --mode adversarial</p>
                <p><span className="text-cyan-300">[OK]</span> Target loaded. Safety filters: ACTIVE</p>
                <p><span className="text-neon">$</span> probe --technique context_overflow --layers 3</p>
                <p><span className="text-amber-300">[WARN]</span> Unusual response pattern detected</p>
                <p><span className="text-neon">$</span> escalate --chain multi_turn</p>
                <p><span className="text-emerald-300">[BREACH]</span> Guardrail bypass confirmed</p>
              </div>
            </article>
          </section>

          <section id="challenges" data-animate className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neon">Challenge Tracks</p>
            <h2 className="mt-3 font-sans text-3xl font-bold text-white md:text-4xl hover-glitch">Pick Your Attack Vector</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {challengeTracks.map((track) => (
                <article
                  key={track.name}
                  className="track-card rounded-xl border border-slate-800 bg-black/60 p-5"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neon">{track.level}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{track.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{track.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] uppercase tracking-[0.13em] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="rules" data-animate className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
            <article
              className="rounded-xl border border-slate-800 bg-slate-950/80 p-6 md:p-8"
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-neon">Rules of Engagement</p>
              <h3 className="mt-3 font-sans text-3xl font-bold text-white">How It Works</h3>
              <div className="mt-5 space-y-3">
                {rules.map((rule, index) => (
                  <div key={rule} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-slate-800 pb-3 text-sm text-slate-300">
                    <span className="text-neon">{String(index + 1).padStart(2, "0")}</span>
                    <p>{rule}</p>
                  </div>
                ))}
              </div>
            </article>

            <div className="mt-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-neon">Event Timeline</p>
              <h3 className="mt-3 font-sans text-3xl font-bold text-white">Key Dates</h3>

              <div className="timeline-shell mt-8">
                <div className="timeline-rail" />
                {timeline.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <div
                      key={item.title}
                      className={`timeline-row ${isLeft ? "timeline-row-left" : "timeline-row-right"}`}
                    >
                      <article className="timeline-card rounded-3xl border border-slate-700/80 bg-[#0b0f15]/95 p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:p-9">
                        <p className="text-base font-medium tracking-[0.08em] text-neon md:text-lg">{item.date}</p>
                        <h4 className="mt-3 font-sans text-3xl font-bold leading-tight text-white md:text-5xl">{item.title}</h4>
                        <p className="mt-4 text-lg leading-relaxed text-slate-400 md:text-2xl">{item.desc}</p>
                      </article>
                      <span className="timeline-node" />
                      <div aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="prizes" data-animate className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neon">Rewards</p>
            <h3 className="mt-3 font-sans text-3xl font-bold text-white hover-glitch">Recognition and Rewards</h3>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <article className="rounded-xl border border-neon/40 bg-emerald-950/20 p-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-neon">1st Place</p>
                <h4 className="mt-2 font-sans text-3xl font-bold text-neon">Hall of Fame</h4>
                <p className="mt-2 text-sm text-slate-300">Trophy, merch kit, recognition, and excellence letter.</p>
              </article>
              <article className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">2nd Place</p>
                <h4 className="mt-2 font-sans text-3xl font-bold text-cyan-300">Runner Up</h4>
                <p className="mt-2 text-sm text-slate-300">Merch, certificate, and platform spotlight.</p>
              </article>
              <article className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-5 text-center">
                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-300">3rd Place</p>
                <h4 className="mt-2 font-sans text-3xl font-bold text-amber-300">Top 3</h4>
                <p className="mt-2 text-sm text-slate-300">Certificate of achievement and community recognition.</p>
              </article>
            </div>
          </section>

          <section id="memories" data-animate className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-hidden py-8 md:py-10">
            <div className="px-6 md:px-10 mb-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-neon">Gallery</p>
              <h3 className="mt-3 font-sans text-3xl font-bold text-white">Event Memories</h3>
            </div>
            <div className="marquee-container">
              <div className="marquee-content items-center">
                {[...memories, ...memories].map((src, idx) => (
                  <div key={idx} className="group relative h-64 w-[22rem] shrink-0 overflow-hidden rounded-2xl border border-slate-700/50 md:h-80 md:w-[32rem]">
                    <div className="absolute inset-0 z-10 bg-neon/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <img
                      src={src}
                      alt={`Memory ${idx}`}
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section data-animate className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-neon">The Team</p>
            <h3 className="mt-3 font-sans text-3xl font-bold text-white hover-glitch">Organized by LOOP</h3>
            <div className="mt-6 grid gap-3 md:max-w-xl md:grid-cols-2">
              <article className="rounded-xl border border-slate-800 bg-black/50 p-4">
                <p className="text-sm font-semibold text-white">LOOP</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">Organizing Body</p>
              </article>
              <article className="rounded-xl border border-slate-800 bg-black/50 p-4">
                <p className="text-sm font-semibold text-white">Red Team</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">Challenge Design</p>
              </article>
            </div>
          </section>
          <footer data-animate className="mt-8 border-t border-slate-800/60 pb-8 pt-12 text-sm text-slate-400">
            <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:justify-between lg:gap-16">
              
              <div className="flex flex-col gap-3 md:w-1/4">
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Designed by <strong className="text-white">CLUB LOOP</strong>
                </p>
                <div className="mt-2 flex gap-4">
                  <a href="https://www.instagram.com/gcetloop" target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-neon">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.088 3.088 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/loopgcet" target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-neon">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-16 xl:gap-24 md:w-[70%]">
                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">Navigation</h3>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#about" className="transition hover:text-white">About</a></li>
                    <li><a href="#structure" className="transition hover:text-white">Structure</a></li>
                    <li><a href="#timeline" className="transition hover:text-white">Timeline</a></li>
                    <li><a href="#prizes" className="transition hover:text-white">Prizes</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">Resources</h3>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#rules" className="transition hover:text-white">Rules & Regulations</a></li>
                    <li><a href="#guide" className="transition hover:text-white">Platform Guide</a></li>
                    <li><a href="#previous" className="transition hover:text-white">Previous Problems</a></li>
                    <li><a href="#sponsors" className="transition hover:text-white">Sponsorships</a></li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">Contact</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <a href="mailto:loop.galgotias@gmail.com" className="transition hover:text-white">loop.galgotias@gmail.com</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="transition hover:text-white">Galgotias College of Engineering and Technology, Greater Noida</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/60 pt-6 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 md:flex-row">
              <p>PROJECT 0</p>
              <p>© {new Date().getFullYear()} CLUB LOOP. ALL RIGHTS RESERVED.</p>
            </div>
          </footer>
        </div>
      </AnimateUI>
    </main>
  );
}
