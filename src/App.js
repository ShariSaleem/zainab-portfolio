import React, { useState, useEffect, useRef } from 'react';
import {
  FaLinkedin, FaEnvelope, FaPhone,
  FaCheckCircle, FaBug, FaClipboardCheck, FaSearch,
  FaWordpress, FaFlask, FaArrowRight, FaBolt
} from 'react-icons/fa';
import { SiPostman, SiJira } from 'react-icons/si';
import {
  HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker,
  HiOutlineArrowNarrowRight, HiOutlineArrowNarrowDown,
  HiOutlineUserGroup, HiOutlineClock,
  HiOutlineLightBulb, HiOutlineChat,
  HiOutlineMenuAlt4, HiOutlineX
} from 'react-icons/hi';

/* -------------------- DATA -------------------- */

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const STATS = [
  { value: '1+', label: 'Years Experience', color: '#A855F7' },
  { value: '7+', label: 'Testing Types', color: '#22D3EE' },
  { value: '8+', label: 'Tools Mastered', color: '#F472B6' },
  { value: '100%', label: 'Commitment', color: '#A3E635' },
];

const EXPERIENCE = [
  {
    title: 'Software Quality Analyst',
    company: 'Brantum Technologies',
    location: 'Rawalpindi, PK',
    period: 'Apr 2025 — Present',
    current: true,
    color: '#A855F7',
    points: [
      'Tested and validated WordPress-based CMS platforms across web and mobile flows.',
      'Designed and executed manual + automated test cases across functional, UI, regression, and smoke cycles.',
      'Performed API testing via Postman to validate backend functionality and data integrity.',
      'Maintained regression suites, QA dashboards, and structured test documentation.',
      'Led bug tracking end-to-end, ensuring fast triage and resolution.',
      'Collaborated with developers and PMs in Agile sprints to optimize QA coverage.',
    ],
  },
  {
    title: 'Teacher',
    company: 'Smart Lyceum School',
    location: 'Rawalpindi, PK',
    period: 'Sep 2024 — Feb 2025',
    current: false,
    color: '#22D3EE',
    points: [
      'Delivered structured lessons and assessments — building planning, documentation, and communication habits.',
      'Monitored progress and gave detail-focused feedback, reinforcing an analytical QA mindset.',
    ],
  },
];

const TESTING_SKILLS = [
  { name: 'Manual Testing', level: 95, color: '#A855F7' },
  { name: 'Test Automation', level: 82, color: '#22D3EE' },
  { name: 'Regression Testing', level: 90, color: '#F472B6' },
  { name: 'Smoke Testing', level: 92, color: '#A3E635' },
  { name: 'Functional Testing', level: 93, color: '#A855F7' },
  { name: 'UI Testing', level: 88, color: '#22D3EE' },
  { name: 'API Testing', level: 85, color: '#F472B6' },
];

const TOOLS = [
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'WordPress', icon: FaWordpress, color: '#21759B' },
  { name: 'Jira', icon: SiJira, color: '#0052CC' },
  { name: 'Agile / Scrum', icon: FaClipboardCheck, color: '#A855F7' },
  { name: 'SDLC / STLC', icon: FaFlask, color: '#22D3EE' },
  { name: 'Bug Tracking', icon: FaBug, color: '#F472B6' },
  { name: 'Test Docs', icon: FaSearch, color: '#A3E635' },
  { name: 'Reporting', icon: FaCheckCircle, color: '#A855F7' },
];

const SOFT_SKILLS = [
  { name: 'Communication', icon: HiOutlineChat, color: '#A855F7', description: 'Clear written and verbal communication with stakeholders at all levels.' },
  { name: 'Problem Solving', icon: HiOutlineLightBulb, color: '#22D3EE', description: 'Critical thinking and analytical approach to defect analysis.' },
  { name: 'Collaboration', icon: HiOutlineUserGroup, color: '#F472B6', description: 'Proven ability to work in fast-paced Agile environments.' },
  { name: 'Time Management', icon: HiOutlineClock, color: '#A3E635', description: 'Strong organizational skills and attention to detail.' },
];

const EDUCATION = [
  { degree: 'B.A. — Information Technology', institution: 'University of Punjab', location: 'Punjab, PK', period: '2021 — 2024' },
  { degree: 'ICS — Computer Science', institution: 'Board of Intermediate & Secondary Education', location: 'Pakistan', period: '2019 — 2021' },
];

const STRENGTHS = [
  'Clear written and verbal communication with stakeholders at all levels.',
  'Proven ability to work in fast-paced, collaborative Agile teams.',
  'Strong organizational skills and attention to detail.',
  'Empathetic, end-user-focused approach to product feedback.',
  'Adaptable and quick to learn new QA tools and workflows.',
  'Committed to continuous improvement and high-quality releases.',
];

const CONTACT = {
  phone: '+92 301 6226476',
  phoneHref: 'tel:+923016226476',
  email: 'zainabimran505@gmail.com',
  emailHref: 'mailto:zainabimran505@gmail.com',
  location: 'Rawalpindi, Pakistan',
  linkedin: 'https://linkedin.com',
};

/* -------------------- HOOKS -------------------- */

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const NeonBar = ({ level, color }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1400ms] ease-out"
        style={{
          width: visible ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          boxShadow: `0 0 10px ${color}80, 0 0 20px ${color}40`,
        }}
      />
    </div>
  );
};

/* -------------------- NAVBAR -------------------- */

const Navbar = ({ active, scrolled }) => {
  const [open, setOpen] = useState(false);
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#08070B]/80 backdrop-blur-xl border-b border-[#A855F7]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => go('home')} className="group flex items-center gap-3">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#22D3EE] opacity-90 group-hover:opacity-100 transition" />
                <div className="absolute inset-[1.5px] rounded-lg bg-[#08070B] flex items-center justify-center">
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#A855F7] to-[#22D3EE] text-base">
                    Z
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#22D3EE]/60">
                  Portfolio
                </span>
                <span className="text-white text-sm font-medium">
                  Zainab Imran
                </span>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`relative px-4 py-1.5 rounded-full text-[12px] font-medium tracking-wide transition-all duration-300 ${
                    active === id
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {active === id && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#A855F7]/30 to-[#22D3EE]/30 border border-[#A855F7]/40" />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </nav>

            <a
              href={CONTACT.emailHref}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold tracking-wider uppercase text-[#08070B] bg-gradient-to-r from-[#A855F7] to-[#22D3EE] hover:shadow-[0_0_20px_#A855F7aa] transition-all duration-500"
            >
              <FaBolt size={9} /> Hire Me
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {open ? <HiOutlineX size={22} /> : <HiOutlineMenuAlt4 size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[#08070B]/98 backdrop-blur-2xl" />
        <nav className="relative h-full flex flex-col justify-center px-8 gap-2">
          {NAV.map(({ id, label }, i) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`text-left py-3 transition-all duration-500 ${
                open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: `${i * 50 + 100}ms` }}
            >
              <span className="text-[10px] tracking-widest text-[#22D3EE] tabular-nums block mb-1">
                0{i + 1}
              </span>
              <span
                className={`font-serif text-4xl transition-colors ${
                  active === id ? 'text-[#A855F7]' : 'text-white'
                }`}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

/* -------------------- MAIN -------------------- */

const Portfolio = () => {
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 30);
        const pos = window.scrollY + 160;
        for (const { id } of NAV) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
            setActive(id);
            break;
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#08070B] text-white antialiased overflow-x-hidden selection:bg-[#A855F7]/40 selection:text-white">
      {/* Neon ambient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#A855F7]/[0.15] rounded-full blur-[120px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#22D3EE]/[0.12] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-[#F472B6]/[0.08] rounded-full blur-[120px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(#A855F7 1px, transparent 1px), linear-gradient(90deg, #22D3EE 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 90%)',
          }}
        />
      </div>

      <Navbar active={active} scrolled={scrolled} />

      {/* ================= HERO ================= */}
      <section id="home" className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 w-full py-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#A3E635]/10 border border-[#A3E635]/30 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3E635]" />
                  </span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#A3E635] font-medium">
                    Available for opportunities
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
                  <span className="block text-white">Zainab</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#F472B6] to-[#22D3EE]">
                    Imran
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px w-12 bg-gradient-to-r from-[#A855F7] to-transparent" />
                  <span className="text-sm sm:text-base tracking-[0.3em] uppercase text-[#22D3EE] font-medium">
                    Software Quality Analyst
                  </span>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <p className="mt-8 text-lg text-white/60 max-w-xl leading-relaxed font-light">
                  Detail-oriented SQA Analyst with hands-on experience across manual and
                  automated testing. I catch what others miss — turning
                  <span className="text-white"> chaos into clarity</span> for every release.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <button
                    onClick={() => go('experience')}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#22D3EE] text-[#08070B] font-semibold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-500 hover:-translate-y-0.5"
                  >
                    View My Work
                    <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => go('contact')}
                    className="px-7 py-3.5 rounded-xl border border-[#22D3EE]/40 text-[#22D3EE] text-sm font-semibold tracking-wide hover:bg-[#22D3EE]/10 hover:border-[#22D3EE] transition-all duration-500"
                  >
                    Get in Touch
                  </button>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-white/40">
                  <div className="flex items-center gap-2">
                    <HiOutlineMail className="text-[#A855F7]" />
                    <span>{CONTACT.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlinePhone className="text-[#22D3EE]" />
                    <span>{CONTACT.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-[#F472B6]" />
                    <span>{CONTACT.location}</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: stats panel */}
            <div className="lg:col-span-5">
              <Reveal delay={300}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-[#A855F7]/20 to-[#22D3EE]/20 rounded-3xl blur-2xl" />
                  <div className="relative grid grid-cols-2 gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur">
                    {STATS.map((stat, i) => (
                      <Reveal key={i} delay={400 + i * 80}>
                        <div
                          className="p-5 rounded-2xl bg-[#08070B]/60 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500 group"
                          style={{ boxShadow: `inset 0 0 40px ${stat.color}08` }}
                        >
                          <div
                            className="text-3xl sm:text-4xl font-black tracking-tight mb-1"
                            style={{
                              color: stat.color,
                              textShadow: `0 0 20px ${stat.color}80`,
                            }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-[10px] tracking-[0.15em] uppercase text-white/40">
                            {stat.label}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <button
            onClick={() => go('about')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#22D3EE] hover:text-[#A855F7] transition-colors animate-bounce"
            aria-label="Scroll down"
          >
            <HiOutlineArrowNarrowDown size={28} />
          </button>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="relative py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#A855F7] font-medium">
                01 — About
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-[#A855F7]/40 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-14 max-w-4xl">
              Quality isn't a phase.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] to-[#A855F7]">
                It's a mindset.
              </span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <Reveal delay={200}>
              <div className="space-y-6 text-lg text-white/70 leading-[1.8] font-light">
                <p>
                  Detail-oriented <span className="text-white font-normal">Software Quality Assurance Analyst</span> with
                  hands-on experience across manual and automated testing for web and
                  mobile applications, including WordPress-based CMS platforms.
                </p>
                <p>
                  Skilled in <span className="text-[#22D3EE]">API testing</span>,{' '}
                  <span className="text-[#F472B6]">regression suite maintenance</span>, and{' '}
                  <span className="text-[#A855F7]">end-to-end test case design</span> within
                  Agile delivery cycles.
                </p>
                <p>
                  Strong track record of defect lifecycle management and cross-functional
                  collaboration with developers and product managers to safeguard
                  release quality.
                </p>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#A855F7]/10 to-[#22D3EE]/5 border border-[#A855F7]/20">
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#A855F7] to-transparent" />
                <div className="flex items-center gap-2 mb-6">
                  <FaBolt className="text-[#A3E635]" />
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#A3E635] font-medium">
                    Core Focus
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Manual & Automated Testing', color: '#A855F7' },
                    { label: 'API Testing & Validation', color: '#22D3EE' },
                    { label: 'Regression Suites', color: '#F472B6' },
                    { label: 'Bug Lifecycle Mgmt', color: '#A3E635' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#08070B]/60 border border-white/[0.06] hover:border-white/[0.15] transition-all duration-500"
                    >
                      <div
                        className="w-2 h-2 rounded-full mb-3"
                        style={{
                          background: item.color,
                          boxShadow: `0 0 12px ${item.color}`,
                        }}
                      />
                      <div className="text-sm text-white/90 leading-snug">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE ================= */}
      <section id="experience" className="relative py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#22D3EE] font-medium">
                02 — Experience
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-[#22D3EE]/40 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-14 max-w-4xl">
              Where I've{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#22D3EE]">
                made an impact.
              </span>
            </h2>
          </Reveal>

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <Reveal key={i} delay={i * 150}>
                <div
                  className="relative grid lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden group"
                  style={{ boxShadow: `inset 0 0 60px ${exp.color}06` }}
                >
                  {/* Left accent */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(180deg, ${exp.color}, transparent)`,
                      boxShadow: `0 0 20px ${exp.color}`,
                    }}
                  />

                  {/* Meta */}
                  <div className="lg:col-span-4 flex lg:flex-col gap-4 lg:gap-2">
                    <div className="flex items-center gap-2">
                      {exp.current && (
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{
                            background: exp.color,
                            boxShadow: `0 0 10px ${exp.color}`,
                          }}
                        />
                      )}
                      <span
                        className="text-[10px] tracking-[0.25em] uppercase font-medium"
                        style={{ color: exp.color }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs text-white/40">{exp.location}</div>
                  </div>

                  <div className="lg:col-span-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-white/60">{exp.company}</p>
                  </div>

                  <div className="lg:col-span-5">
                    <ul className="space-y-2.5">
                      {exp.points.map((p, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-white/60 text-sm leading-relaxed"
                        >
                          <span
                            className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                            style={{
                              background: exp.color,
                              boxShadow: `0 0 6px ${exp.color}`,
                            }}
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SKILLS ================= */}
      <section id="skills" className="relative py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#F472B6] font-medium">
                03 — Skills
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-[#F472B6]/40 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-14 max-w-4xl">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#A855F7]">
                toolkit.
              </span>
            </h2>
          </Reveal>

          {/* Testing Proficiency */}
          <Reveal>
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Testing Proficiency
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 mb-16">
            {TESTING_SKILLS.map(({ name, level, color }, i) => (
              <Reveal key={name} delay={(i % 8) * 50}>
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-white text-sm font-medium">{name}</span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color, textShadow: `0 0 10px ${color}80` }}
                    >
                      {level}%
                    </span>
                  </div>
                  <NeonBar level={level} color={color} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tools */}
          <Reveal>
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Tools & Methods
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
            {TOOLS.map(({ name, icon: Icon, color }, i) => (
              <Reveal key={name} delay={i * 40}>
                <div
                  className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 hover:-translate-y-1 cursor-default"
                  style={{ '--glow': color }}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={22}
                      style={{ color }}
                      className="flex-shrink-0 group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="text-sm font-medium text-white/90 leading-tight">
                      {name}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Soft Skills */}
          <Reveal>
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Professional Strengths
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SOFT_SKILLS.map(({ name, icon: Icon, color, description }, i) => (
              <Reveal key={name} delay={i * 100}>
                <div className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-500 hover:-translate-y-1 h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border transition-all duration-500"
                    style={{
                      background: `${color}15`,
                      borderColor: `${color}40`,
                      boxShadow: `inset 0 0 20px ${color}10`,
                    }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{name}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}
      <section id="education" className="relative py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#A3E635] font-medium">
                04 — Education
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-[#A3E635]/40 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-14 max-w-4xl">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#22D3EE]">
                foundations.
              </span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {EDUCATION.map((e, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#A3E635]/40 transition-all duration-500 h-full">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#A3E635]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#A3E635] mb-4">
                    {e.period}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                    {e.degree}
                  </h3>
                  <p className="text-sm text-white/60 mb-2">{e.institution}</p>
                  <p className="text-xs tracking-widest uppercase text-white/30">
                    {e.location}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Key Strengths */}
          <Reveal>
            <div className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">
              Key Strengths
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STRENGTHS.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#A3E635]/30 transition-all duration-500">
                  <span
                    className="font-mono text-xs font-bold text-[#A3E635] pt-0.5 flex-shrink-0"
                    style={{ textShadow: '0 0 10px #A3E63580' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[11px] tracking-[0.4em] uppercase text-[#22D3EE] font-medium">
                05 — Contact
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-[#22D3EE]/40 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-14 max-w-4xl">
              Let's make it{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3EE] via-[#A855F7] to-[#F472B6]">
                flawless.
              </span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4">
              {[
                { label: 'Email', value: CONTACT.email, href: CONTACT.emailHref, icon: HiOutlineMail, color: '#A855F7' },
                { label: 'Phone', value: CONTACT.phone, href: CONTACT.phoneHref, icon: HiOutlinePhone, color: '#22D3EE' },
                { label: 'Location', value: CONTACT.location, href: null, icon: HiOutlineLocationMarker, color: '#F472B6' },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03] transition-all duration-500"
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                          style={{
                            background: `${item.color}15`,
                            borderColor: `${item.color}40`,
                          }}
                        >
                          <item.icon size={20} style={{ color: item.color }} />
                        </div>
                        <div>
                          <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                            {item.label}
                          </div>
                          <div className="text-white text-sm sm:text-base break-all">
                            {item.value}
                          </div>
                        </div>
                      </div>
                      <HiOutlineArrowNarrowRight
                        className="group-hover:translate-x-1 transition-transform duration-500 flex-shrink-0"
                        style={{ color: item.color }}
                      />
                    </a>
                  ) : (
                    <div className="flex items-center gap-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border"
                        style={{
                          background: `${item.color}15`,
                          borderColor: `${item.color}40`,
                        }}
                      >
                        <item.icon size={20} style={{ color: item.color }} />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                          {item.label}
                        </div>
                        <div className="text-white text-sm sm:text-base">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )}
                </Reveal>
              ))}
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={300}>
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#A855F7]/20 via-[#22D3EE]/10 to-[#F472B6]/20 border border-[#A855F7]/30 overflow-hidden h-full">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#22D3EE] to-transparent" />
                  <div className="flex items-center gap-3 mb-6">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3E635] opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#A3E635]" />
                    </span>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#A3E635] font-semibold">
                      Available Now
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                    Ready to work with a QA who obsesses over the details?
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed mb-8">
                    Let's talk about how I can safeguard your next release.
                  </p>
                  <a
                    href={CONTACT.emailHref}
                    className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-[#08070B] font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-500"
                  >
                    <HiOutlineMail size={16} />
                    Send an Email
                    <HiOutlineArrowNarrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative py-10 border-t border-white/[0.06]">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#22D3EE]" />
                <div className="absolute inset-[1.5px] rounded-lg bg-[#08070B] flex items-center justify-center">
                  <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-[#A855F7] to-[#22D3EE] text-sm">
                    Z
                  </span>
                </div>
              </div>
              <span className="text-white text-sm font-medium">Zainab Imran</span>
            </div>

            <div className="flex items-center gap-3">
              {[
                { href: CONTACT.linkedin, icon: FaLinkedin, label: 'LinkedIn', color: '#A855F7' },
                { href: CONTACT.emailHref, icon: FaEnvelope, label: 'Email', color: '#22D3EE' },
                { href: CONTACT.phoneHref, icon: FaPhone, label: 'Phone', color: '#F472B6' },
              ].map(({ href, icon: Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.1] text-white/50 hover:text-white transition-all duration-500"
                  style={{ '--hover-color': color }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}80`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>

            <div className="text-[10px] tracking-[0.25em] uppercase text-white/30">
              © {new Date().getFullYear()} — Built with <span className="text-[#A855F7]">♥</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;