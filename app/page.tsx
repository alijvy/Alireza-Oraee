'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import WebGLScene from './WebGLScene';

const content = {
  fa: {
    enter: 'ورود به جهان من',
    loading: 'تجربه تعاملی / ۲۰۲۶',
    nav: [
      ['درباره', '#about'],
      ['تجربه‌ها', '#experience'],
      ['کارها', '#work'],
      ['حرکت', '#athlete'],
      ['تماس', '#contact'],
    ],
    eyebrow: 'کریتور چندوجهی — تهران',
    nameTop: 'علیرضا',
    nameBottom: 'اورعی',
    lead: 'از ایده تا محتوا؛ از محتوا تا توجه، لید و فروش.',
    roles: ['استراتژیست خلاق', 'کریتور هوش مصنوعی', 'تولیدکننده محتوا', 'بیت‌پرودیوسر', 'ورزشکار کلیستنیکس'],
    scroll: 'برای ورود به داستان اسکرول کن',
    manifestoNote: 'یک روایت، پنج میدان',
    manifesto: ['مهارت را می‌سازم.', 'بدن را می‌سازم.', 'برند را می‌سازم.'],
    aboutKicker: 'فصل اول / هویت',
    aboutTitle: 'فقط یک ادیتور نیستم؛ کل مسیر را می‌بینم.',
    aboutBody: 'من علیرضا هستم؛ تولیدکننده محتوا و استراتژیست خلاق. از ایده‌پردازی و سناریونویسی تا فیلم‌برداری، تدوین، طراحی، انتشار و اتصال محتوا به فرایند فروش، روی تمام مسیر تولید محتوا کار می‌کنم. تجربه‌ام بازارهای B2C و B2B را پوشش می‌دهد و در کنار آن، کریتور هوش مصنوعی، بیت‌پرودیوسر و ورزشکار کلیستنیکس هستم.',
    pillars: [
      ['CREATOR', 'ایده، تصویر، صدا و اجرا'],
      ['STRATEGIST', 'محتوا، سیستم و اثر تجاری'],
      ['ATHLETE', 'قدرت، کنترل و انضباط'],
    ],
    facts: [
      ['۳۶۰°', 'فرایند خلاق'],
      ['B2B / B2C', 'تجربه بازار'],
      ['۰۴+', 'سال تمرین جدی'],
    ],
    experienceKicker: 'فصل دوم / تجربه',
    experienceTitle: 'وقتی خلاقیت به سیستم تبدیل می‌شود.',
    experiences: [
      ['اکنون', 'آقای تأسیسات', 'سرپرست تیم تولید محتوا', 'مدیریت صفر تا صد محتوا، کمپین، ویدیو، طراحی و اتصال اینستاگرام به CRM و تیم فروش.'],
      ['B2B', 'میتراوین', 'مدیر شبکه‌های اجتماعی و کریتور', 'ساخت محتوای آموزشی، صنعتی و محصول‌محور برای بازار تخصصی رنگ و لمینیت UPVC.'],
      ['SELECTED', 'ECU تهران / فرش فستیوال / آروان تراول', 'تولید محتوا و اجرا', 'سناریو، نریشن، مدیریت اینستاگرام و تولید محتوای پروژه‌ای در فضاهای متفاوت.'],
      ['SPORT', 'Irisin Sport Club', 'کریتور ورزشی', 'تولید محتوای کلیستنیکس و کراس‌فیت، آموزش حرکات و معرفی کلاس‌ها.'],
    ],
    workKicker: 'فصل سوم / کارهای منتخب',
    workTitle: 'زیبا، اما متصل به هدف.',
    workIntro: 'هر خروجی باید بخشی از یک سیستم بزرگ‌تر باشد؛ از Hook تا CTA و از ورودی تا پیگیری.',
    portfolioLabel: 'آرشیو نمونه‌کارها / ۱۲ دسته',
    portfolioTitle: 'نمونه‌کارها را بر اساس تخصص ببین.',
    portfolioNote: 'هر دسته یک فضای مستقل برای نمایش پروژه‌ها دارد؛ فایل‌های واقعی در مرحله بعد به همین آرشیو اضافه می‌شوند.',
    portfolioReady: 'فضای آماده برای افزودن نمونه‌کار',
    portfolioCategories: [
      ['نمونه‌کار تصویربرداری', 'CINEMATOGRAPHY'],
      ['نمونه‌کار ادیت ویدیو', 'VIDEO EDITING'],
      ['نمونه‌کار طراحی لوگو', 'LOGO DESIGN'],
      ['نمونه‌کار طراحی هویت بصری', 'VISUAL IDENTITY'],
      ['نمونه‌کار گرافیکی', 'GRAPHIC DESIGN'],
      ['نمونه‌کار طراحی بسته‌بندی', 'PACKAGING'],
      ['نمونه‌کار بنر و بیلبورد', 'OUTDOOR / OOH'],
      ['نمونه‌کار دیالوگ و Voice-over', 'VOICE / NARRATION'],
      ['نمونه‌کار اجرا جلوی دوربین', 'ON-CAMERA'],
      ['نمونه‌کار دستیار هوش مصنوعی', 'AI AGENT'],
      ['نمونه‌کار سیستم فروش و پیگیری CRM', 'CRM / FOLLOW-UP'],
      ['نمونه‌کار آهنگسازی', 'MUSIC PRODUCTION'],
    ],
    projects: [
      ['01', 'سیستم محتوا و فروش', 'آقای تأسیسات', 'طراحی جریان یکپارچه محتوا، فرم، پاک‌سازی لید، پرونده مشتری و توزیع ساخت‌یافته میان تیم فروش.', ['CONTENT SYSTEM', 'CRM', 'LEAD FLOW']],
      ['02', 'کمپین تعویض کولر', 'CREATIVE → CONVERSION', 'ایده کمپین، تیزر، کاروسل، لندینگ چهارمرحله‌ای و اتصال ورودی به فرایند پیگیری فروش.', ['CAMPAIGN', 'LANDING', 'CTA']],
      ['03', 'دستیار فروش هوش مصنوعی', 'R&D', 'طراحی جریان پاسخ‌گویی هوشمند دایرکت برای قیمت، انتخاب محصول، شرایط اقساط و تحویل لید به انسان.', ['AI CREATOR', 'AUTOMATION', 'R&D']],
    ],
    athleteKicker: 'فصل چهارم / بدن',
    athleteTitle: 'کنترل بدن، تمرین کنترل ذهن است.',
    athleteBody: 'حدود چهار سال تمرین جدی در قدرت و کنترل بدن. کلیستنیکس برای من فقط ورزش نیست؛ آزمایشگاه صبر، تکرار و ساختن است.',
    athleteLabels: ['HANDSTAND', 'STRENGTH', 'CONTROL', 'PROGRESS'],
    skillsKicker: 'فصل پنجم / جعبه‌ابزار',
    skillsTitle: 'استراتژی، دوربین، ادیت، صدا و سیستم.',
    skillGroups: [
      ['CREATE', ['Creative Direction', 'Scriptwriting', 'Videography', 'Video Editing', 'Graphic Design', 'Voice-over']],
      ['GROW', ['Content Strategy', 'Social Media', 'Campaigns', 'Hook & CTA', 'B2B / B2C', 'Lead Generation']],
      ['BUILD', ['AI Workflows', 'Google Sheets CRM', 'Make / Automation', 'Product Database', 'FL Studio', 'Calisthenics Coaching']],
    ],
    tools: 'Premiere Pro · DaVinci Resolve · After Effects · Photoshop · Illustrator · FL Studio · Google Sheets · Make · AI Tools',
    aiKicker: 'AI × SOUND',
    aiTitle: 'بین الگوریتم و ضرب.',
    aiBody: 'هوش مصنوعی را به‌عنوان یک همکار خلاق برای ایده، تصویر و سیستم تجربه می‌کنم؛ موسیقی را هم با FL Studio به فضای روایت اضافه می‌کنم. این بخش با پروژه‌های آینده رشد خواهد کرد.',
    contactKicker: 'آخرین فصل / شروع بعدی',
    contactTitle: 'بیایید چیزی بسازیم که دیده شود و اثر بگذارد.',
    contactBody: 'برای همکاری در استراتژی محتوا، تولید ویدیو، کمپین، سیستم‌های محتوا و پروژه‌های خلاق آماده‌ام.',
    linksNote: 'لینک شبکه‌ها در نسخه بعدی اضافه می‌شود.',
    networks: ['INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'LINKEDIN'],
    soundOn: 'صدا روشن',
    soundOff: 'صدا خاموش',
    footer: 'ساخته‌شده در تقاطع خلاقیت، عملکرد و تکنولوژی.',
  },
  en: {
    enter: 'ENTER MY WORLD',
    loading: 'INTERACTIVE EXPERIENCE / 2026',
    nav: [
      ['About', '#about'],
      ['Experience', '#experience'],
      ['Work', '#work'],
      ['Motion', '#athlete'],
      ['Contact', '#contact'],
    ],
    eyebrow: 'MULTIDISCIPLINARY CREATOR — TEHRAN',
    nameTop: 'ALI',
    nameBottom: 'OREI',
    lead: 'From ideas to content. From content to attention, leads, and sales.',
    roles: ['Creative Strategist', 'AI Creator', 'Content Creator', 'Beat Producer', 'Calisthenics Athlete'],
    scroll: 'SCROLL TO ENTER THE STORY',
    manifestoNote: 'ONE STORY, FIVE ARENAS',
    manifesto: ['BUILD SKILLS.', 'BUILD BODY.', 'BUILD BRAND.'],
    aboutKicker: 'CHAPTER ONE / IDENTITY',
    aboutTitle: 'I am not just an editor. I see the entire path.',
    aboutBody: "I'm Ali, a Content Creator and Creative Strategist. I work across the whole creative journey—from idea and script to shooting, editing, design, publishing, and connecting content to sales. My experience spans B2C and B2B work. I am also an AI creator, beat producer, and calisthenics athlete.",
    pillars: [
      ['CREATOR', 'Ideas, images, sound, and performance'],
      ['STRATEGIST', 'Content, systems, and business impact'],
      ['ATHLETE', 'Strength, control, and discipline'],
    ],
    facts: [
      ['360°', 'Creative process'],
      ['B2B / B2C', 'Market experience'],
      ['04+', 'Years of serious training'],
    ],
    experienceKicker: 'CHAPTER TWO / EXPERIENCE',
    experienceTitle: 'When creativity becomes a system.',
    experiences: [
      ['NOW', 'Mr. Taasisat', 'Content Lead', 'End-to-end content, campaigns, video, design, and the connection between Instagram, CRM, and the sales team.'],
      ['B2B', 'Mitrawin', 'Social Media Manager & Creator', 'Educational, industrial, and product-led content for the specialist UPVC color and lamination market.'],
      ['SELECTED', 'ECU Tehran / Farsh Festival / Arvan Travel', 'Content & Performance', 'Scripts, narration, social management, and project-based creative production across different industries.'],
      ['SPORT', 'Irisin Sport Club', 'Sports Content Creator', 'Calisthenics and CrossFit content, movement education, and class promotion.'],
    ],
    workKicker: 'CHAPTER THREE / SELECTED WORK',
    workTitle: 'Beautiful, but connected to a goal.',
    workIntro: 'Every output should be part of a larger system—from hook to CTA, and from incoming lead to follow-up.',
    portfolioLabel: 'PORTFOLIO ARCHIVE / 12 CATEGORIES',
    portfolioTitle: 'Explore the work by discipline.',
    portfolioNote: 'Each category has its own project space. Real case-study files can be connected to this archive in the next phase.',
    portfolioReady: 'READY FOR PORTFOLIO FILES',
    portfolioCategories: [
      ['Cinematography', 'CAMERA / DIRECTION'],
      ['Video Editing', 'EDIT / MOTION'],
      ['Logo Design', 'LOGO / MARK'],
      ['Visual Identity Design', 'BRAND / SYSTEM'],
      ['Graphic Design', 'GRAPHIC / VISUAL'],
      ['Packaging Design', 'PACK / PRODUCT'],
      ['Billboard & Banner Design', 'OUTDOOR / OOH'],
      ['Voice-over & Dialogue', 'VOICE / NARRATION'],
      ['On-camera Performance', 'CAMERA / TALENT'],
      ['AI Agent Development', 'AI / AUTOMATION'],
      ['Sales & CRM Systems', 'CRM / FOLLOW-UP'],
      ['Music Production', 'MUSIC / BEAT'],
    ],
    projects: [
      ['01', 'CONTENT & SALES SYSTEM', 'MR. TAASISAT', 'An integrated content, form, lead-cleaning, customer-record, and sales-distribution workflow.', ['CONTENT SYSTEM', 'CRM', 'LEAD FLOW']],
      ['02', 'AIR-COOLER EXCHANGE CAMPAIGN', 'CREATIVE → CONVERSION', 'Campaign idea, teasers, carousel, four-step landing flow, and structured sales follow-up.', ['CAMPAIGN', 'LANDING', 'CTA']],
      ['03', 'AI SALES ASSISTANT', 'R&D', 'A conversational direct-message flow for pricing, product guidance, installments, and human handoff.', ['AI CREATOR', 'AUTOMATION', 'R&D']],
    ],
    athleteKicker: 'CHAPTER FOUR / BODY',
    athleteTitle: 'Body control, practice for mind control.',
    athleteBody: 'Around four years of serious strength and body-control training. Calisthenics is more than sport to me—it is a laboratory for patience, repetition, and building.',
    athleteLabels: ['HANDSTAND', 'STRENGTH', 'CONTROL', 'PROGRESS'],
    skillsKicker: 'CHAPTER FIVE / TOOLKIT',
    skillsTitle: 'Strategy, camera, edit, sound, and systems.',
    skillGroups: [
      ['CREATE', ['Creative Direction', 'Scriptwriting', 'Videography', 'Video Editing', 'Graphic Design', 'Voice-over']],
      ['GROW', ['Content Strategy', 'Social Media', 'Campaigns', 'Hook & CTA', 'B2B / B2C', 'Lead Generation']],
      ['BUILD', ['AI Workflows', 'Google Sheets CRM', 'Make / Automation', 'Product Database', 'FL Studio', 'Calisthenics Coaching']],
    ],
    tools: 'Premiere Pro · DaVinci Resolve · After Effects · Photoshop · Illustrator · FL Studio · Google Sheets · Make · AI Tools',
    aiKicker: 'AI × SOUND',
    aiTitle: 'Between algorithm and beat.',
    aiBody: 'I explore AI as a creative collaborator for ideas, imagery, and systems—and use FL Studio to bring sound into the story. This space will grow with future experiments.',
    contactKicker: 'FINAL CHAPTER / THE NEXT START',
    contactTitle: "Let's build something people notice—and remember.",
    contactBody: 'Open to collaborations in content strategy, video production, campaigns, content systems, and ambitious creative work.',
    linksNote: 'Social links will be connected in the next revision.',
    networks: ['INSTAGRAM', 'YOUTUBE', 'FACEBOOK', 'LINKEDIN'],
    soundOn: 'SOUND ON',
    soundOff: 'SOUND OFF',
    footer: 'Built at the intersection of creativity, performance, and technology.',
  },
} as const;

const athleteImages = [
  '/images/ali-handstand-blocks.jpg',
  '/images/ali-handstand.jpg',
  '/images/ali-dip.jpg',
  '/images/ali-hang.jpg',
];

export default function Home() {
  const [language, setLanguage] = useState<'fa' | 'en'>('fa');
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState(0);
  const shellRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const soundRef = useRef<import('howler').Howl | null>(null);
  const isFa = language === 'fa';
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isFa ? 'rtl' : 'ltr';
  }, [isFa, language]);

  useEffect(() => {
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame || document.documentElement.dataset.performance === 'eco') return;
      pointerFrame = window.requestAnimationFrame(() => {
        const shell = shellRef.current;
        if (shell) {
          shell.style.setProperty('--mouse-x', `${pointerX}px`);
          shell.style.setProperty('--mouse-y', `${pointerY}px`);
        }
        pointerFrame = 0;
      });
    };
    const onScroll = () => {
      if (!progressRef.current) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progressRef.current.style.transform = `scaleX(${window.scrollY / max})`;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    if (!entered) return;
    let cleanup = () => undefined;
    let cancelled = false;

    void (async () => {
      const gsapModule = await import('gsap');
      const triggerModule = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = triggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        gsap.from('.hero-line', { yPercent: 120, duration: 1.25, stagger: 0.12, ease: 'power4.out' });
        gsap.from('.hero-support > *', { opacity: 0, y: 24, duration: 0.8, stagger: 0.08, delay: 0.5, ease: 'power3.out' });
        gsap.from('.hero-person', { opacity: 0, xPercent: isFa ? -10 : 10, scale: 1.06, duration: 1.5, ease: 'power3.out' });

        gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 70,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('.parallax-image').forEach((element) => {
          gsap.fromTo(element, { yPercent: -3 }, {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          });
        });

        if (window.innerWidth > 760) {
          gsap.to('.athlete-track', {
            xPercent: isFa ? -58 : 58,
            ease: 'none',
            scrollTrigger: { trigger: '.athlete-scroll', start: 'top top', end: 'bottom bottom', scrub: 1.15 },
          });
        }
      }, shellRef);

      window.setTimeout(() => ScrollTrigger.refresh(), 250);
      cleanup = () => {
        context.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [entered, isFa, language]);

  useEffect(() => () => soundRef.current?.unload(), []);

  const toggleSound = async () => {
    if (!soundRef.current) {
      const { Howl } = await import('howler');
      soundRef.current = new Howl({ src: ['/audio/go-time.m4a'], format: ['m4a'], loop: true, volume: 0, html5: true });
    }
    const sound = soundRef.current;
    if (soundOn) {
      sound.fade(sound.volume(), 0, 350);
      window.setTimeout(() => sound.pause(), 360);
      setSoundOn(false);
    } else {
      sound.play();
      sound.fade(sound.volume(), 0.2, 900);
      setSoundOn(true);
    }
  };

  return (
    <main ref={shellRef} className={`site-shell ${entered ? 'is-entered' : ''}`} dir={isFa ? 'rtl' : 'ltr'}>
      <WebGLScene />
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <div className="page-progress"><span ref={progressRef} /></div>

      <div className={`intro ${entered ? 'intro--hidden' : ''}`} aria-hidden={entered}>
        <div className="intro-orbit" />
        <p>{t.loading}</p>
        <div className="intro-mark">AO<span>®</span></div>
        <button type="button" onClick={() => setEntered(true)} tabIndex={entered ? -1 : 0}>
          <span>{t.enter}</span><i>↙</i>
        </button>
      </div>

      <header className="topbar">
        <a className="monogram" href="#top" aria-label="Ali Orei home">AO<span>®</span></a>
        <nav aria-label={isFa ? 'منوی اصلی' : 'Main navigation'}>
          {t.nav.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="top-actions">
          <button className="sound-button" type="button" onClick={toggleSound} aria-pressed={soundOn}>
            <span className={`sound-bars ${soundOn ? 'is-playing' : ''}`} aria-hidden="true"><i /><i /><i /></span>
            {soundOn ? t.soundOn : t.soundOff}
          </button>
          <button className="language-switch" type="button" onClick={() => setLanguage(isFa ? 'en' : 'fa')} aria-label={isFa ? 'Switch to English' : 'تغییر زبان به فارسی'}>
            {isFa ? 'EN' : 'فا'}
          </button>
        </div>
      </header>

      <section className="hero section" id="top">
        <div className="hero-support">
          <p className="eyebrow">{t.eyebrow}</p>
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-roles">{t.roles.map((role) => <span key={role}>{role}</span>)}</div>
        </div>
        <div className="hero-title" aria-label={`${t.nameTop} ${t.nameBottom}`}>
          <div className="hero-line-wrap"><h1 className="hero-line">{t.nameTop}</h1></div>
          <div className="hero-line-wrap"><h1 className="hero-line hero-line--accent">{t.nameBottom}</h1></div>
        </div>
        <div className="hero-person">
          <div className="hero-person-halo" />
          <img src="/images/ali-hero-transparent-v3.png" alt={isFa ? 'پرتره تمام‌قد علیرضا اورعی' : 'Full-length portrait of Ali Orei'} />
          <span className="hero-vertical">HIGH PERFORMANCE CREATOR</span>
        </div>
        <a className="scroll-cue" href="#manifesto"><i>↓</i><span>{t.scroll}</span></a>
        <div className="hero-counter"><span>01</span><i /><small>07</small></div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div>CREATOR&nbsp;&nbsp;•&nbsp;&nbsp;STRATEGIST&nbsp;&nbsp;•&nbsp;&nbsp;ATHLETE&nbsp;&nbsp;•&nbsp;&nbsp;AI CREATOR&nbsp;&nbsp;•&nbsp;&nbsp;BEAT PRODUCER&nbsp;&nbsp;•&nbsp;&nbsp;CREATOR&nbsp;&nbsp;•&nbsp;&nbsp;STRATEGIST&nbsp;&nbsp;•&nbsp;&nbsp;ATHLETE&nbsp;&nbsp;•&nbsp;&nbsp;</div>
      </div>

      <section className="manifesto section" id="manifesto">
        <p className="section-kicker reveal">{t.manifestoNote}</p>
        <div className="manifesto-lines">
          {t.manifesto.map((line, index) => <p className={`manifesto-line ${index === 2 ? 'accent' : ''}`} key={line}>{line}</p>)}
        </div>
        <span className="manifesto-code">ATTENTION → TRUST → AUTHORITY → OPPORTUNITY</span>
      </section>

      <section className="about section" id="about">
        <div className="about-media reveal">
          <div className="image-shell image-shell--portrait"><img className="parallax-image" src="/images/ali-heic.png" alt={isFa ? 'پرتره علیرضا در نور طبیعی' : 'Ali in natural light'} /></div>
          <span>IDENTITY / 001</span>
        </div>
        <div className="about-copy">
          <p className="section-kicker reveal">{t.aboutKicker}</p>
          <h2 className="section-title reveal">{t.aboutTitle}</h2>
          <p className="body-copy reveal">{t.aboutBody}</p>
          <div className="pillar-list reveal">
            {t.pillars.map(([title, body], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
        </div>
        <div className="facts-row reveal">
          {t.facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="experience section" id="experience">
        <div className="section-heading">
          <p className="section-kicker reveal">{t.experienceKicker}</p>
          <h2 className="section-title reveal">{t.experienceTitle}</h2>
        </div>
        <div className="experience-list">
          {t.experiences.map(([date, company, role, body], index) => (
            <article className="experience-row reveal" key={company}>
              <span className="experience-index">0{index + 1}</span>
              <span className="experience-date">{date}</span>
              <div><h3>{company}</h3><p className="experience-role">{role}</p></div>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="work section" id="work">
        <div className="work-heading">
          <p className="section-kicker reveal">{t.workKicker}</p>
          <h2 className="section-title reveal">{t.workTitle}</h2>
          <p className="body-copy reveal">{t.workIntro}</p>
        </div>
        <section className="portfolio-browser reveal" aria-label={t.portfolioLabel}>
          <header className="portfolio-browser-head">
            <div><span>{t.portfolioLabel}</span><h3>{t.portfolioTitle}</h3></div>
            <p>{t.portfolioNote}</p>
          </header>
          <div className="portfolio-index">
            {t.portfolioCategories.map(([title, code], index) => (
              <button
                type="button"
                className={activePortfolio === index ? 'is-active' : ''}
                aria-pressed={activePortfolio === index}
                onClick={() => setActivePortfolio(index)}
                key={code}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span><strong>{title}</strong><small>{code}</small></span>
                <i>↗</i>
              </button>
            ))}
          </div>
          <div className="portfolio-preview" aria-live="polite">
            <div className="portfolio-preview-copy">
              <span>{String(activePortfolio + 1).padStart(2, '0')} / 12</span>
              <h4>{t.portfolioCategories[activePortfolio][0]}</h4>
              <p>{t.portfolioReady}</p>
            </div>
            <div className="portfolio-preview-frame" aria-hidden="true">
              <span>{t.portfolioCategories[activePortfolio][1]}</span>
              <b>{String(activePortfolio + 1).padStart(2, '0')}</b>
              <i>＋</i>
            </div>
          </div>
        </section>
        <div className="project-grid">
          {t.projects.map(([number, title, client, body, tags]) => (
            <article className="project-card reveal" key={number}>
              <div className="project-top"><span>{number}</span><i>↗</i></div>
              <p>{client}</p><h3>{title}</h3><p className="project-body">{body}</p>
              <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="athlete-scroll" id="athlete">
        <div className="athlete-sticky">
          <div className="athlete-copy">
            <p className="section-kicker">{t.athleteKicker}</p>
            <h2>{t.athleteTitle}</h2>
            <p>{t.athleteBody}</p>
          </div>
          <div className="athlete-track">
            {athleteImages.map((src, index) => (
              <figure key={src}><img src={src} alt={t.athleteLabels[index]} /><figcaption><span>0{index + 1}</span>{t.athleteLabels[index]}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section className="skills section" id="skills">
        <div className="skills-heading">
          <p className="section-kicker reveal">{t.skillsKicker}</p>
          <h2 className="section-title reveal">{t.skillsTitle}</h2>
        </div>
        <div className="skill-groups">
          {t.skillGroups.map(([group, skills], index) => (
            <article className="skill-group reveal" key={group}>
              <div><span>0{index + 1}</span><h3>{group}</h3></div>
              <ul>{skills.map((skill) => <li key={skill}>{skill}<i>↗</i></li>)}</ul>
            </article>
          ))}
        </div>
        <p className="tool-ribbon reveal">{t.tools}</p>
      </section>

      <section className="ai-sound section">
        <div className="ai-visual reveal" aria-hidden="true">
          <div className="orbital orb-a" /><div className="orbital orb-b" />
          <div className="equalizer">{Array.from({ length: 34 }).map((_, index) => <i key={index} style={{ '--bar': (index % 9) + 2 } as React.CSSProperties} />)}</div>
          <span>55.0 Hz</span><strong>AI × SOUND</strong>
        </div>
        <div className="ai-copy">
          <p className="section-kicker reveal">{t.aiKicker}</p>
          <h2 className="section-title reveal">{t.aiTitle}</h2>
          <p className="body-copy reveal">{t.aiBody}</p>
          <button type="button" className="play-ambient reveal" onClick={toggleSound}><span>{soundOn ? 'II' : '▶'}</span>{soundOn ? t.soundOn : t.soundOff}</button>
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-photo reveal"><img className="parallax-image" src="/images/ali-athlete-portrait.jpg" alt={isFa ? 'پرتره ورزشی علیرضا' : 'Athletic portrait of Ali'} /></div>
        <div className="contact-copy">
          <p className="section-kicker reveal">{t.contactKicker}</p>
          <h2 className="section-title reveal">{t.contactTitle}</h2>
          <p className="body-copy reveal">{t.contactBody}</p>
          <p className="links-note reveal">{t.linksNote}</p>
          <div className="network-list reveal">
            {t.networks.map((network, index) => <span key={network}><i>0{index + 1}</i>{network}<b>↗</b></span>)}
          </div>
        </div>
      </section>

      <footer>
        <a className="monogram" href="#top">AO<span>®</span></a>
        <p>{t.footer}</p><span>© 2026</span>
      </footer>
    </main>
  );
}
