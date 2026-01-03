import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Moon, Sun, Menu, X, Type, ChevronLeft, ChevronRight, Smartphone, Globe, Download, ExternalLink, ArrowLeft, BookOpen, User, Maximize, Minimize, Search, Clock, Share, FileText, Mic, MessageSquare, Star, Play, Pause, SkipForward, SkipBack, Volume2, Table, Headphones, Gauge, Lock } from 'lucide-react';

/* ==================================================================================
   ⬇️ CONFIGURATION ZONE ⬇️
   ================================================================================== */

const CONFIG = {
  author: "KC FIROZ", 
  logoPath: "/icon-v2.png",   
  
  // LANDING PAGE IMAGES
  seriesCover: "/cover.png",   
  profileCover: "/cover1.png", 
  audioCover: "/cover-audio.png", 
  reviewsCover: "/cover-reviews.png",

  // EXTERNAL LINKS
  authorWebsite: "https://author.kc-capitals.com",
  profilePdfPath: "/profile.pdf",
  reviewEmail: "adv.firoz@kc-capitals.com",

  // DATA PATHS
  audioDataPath: "/data/audio.json", 
  reviewsDataPath: "/data/reviews.json",

  // MICRO BOOK DEFINITIONS
  library: [
    { id: 0, title: "Micro Book 0", subtitle: "The Legacy OS (Master Map)", cover: "/cover-0.png?v=4", section: "master_launch", releaseDate: "01-01-2026" },
    { id: 1, title: "Micro Book 1", subtitle: "10% Destiny, 90% Creation", cover: "/cover-1.png", section: "phase_1", releaseDate: "01-01-2026" },
    { id: 2, title: "Micro Book 2", subtitle: "The Age 33 Reset", cover: "/cover-2.png", section: "phase_1", releaseDate: "01-02-2026" },
    { id: 3, title: "Micro Book 3", subtitle: "The Blueprint", cover: "/cover-3.png", section: "phase_1", releaseDate: "01-03-2026" },
    { id: 4, title: "Micro Book 4", subtitle: "Emotional Governance", cover: "/cover-4.png", section: "phase_1", releaseDate: "01-04-2026" },
    { id: 5, title: "Micro Book 5", subtitle: "Legal Clarity Framework", cover: "/cover-5.png", section: "phase_2", releaseDate: "01-05-2026" },
    { id: 6, title: "Micro Book 6", subtitle: "The Wealth Kernel 1.0", cover: "/cover-6.png", section: "phase_2", releaseDate: "01-06-2026" },
    { id: 7, title: "Micro Book 7", subtitle: "The Family Constitution", cover: "/cover-7.png", section: "phase_2", releaseDate: "01-07-2026" },
    { id: 8, title: "Micro Book 8", subtitle: "The Trauma Alchemy Manual", cover: "/cover-8.png", section: "phase_2", releaseDate: "01-08-2026" },
    { id: 9, title: "Micro Book 9", subtitle: "The 90-Day OS Upgrade", cover: "/cover-9.png", section: "phase_3", releaseDate: "01-09-2026" },
    { id: 10, title: "Micro Book 10", subtitle: "The Generational OS", cover: "/cover-10.png", section: "phase_3", releaseDate: "01-10-2026" },
    { id: 11, title: "Micro Book 11", subtitle: "The Firewall", cover: "/cover-11.png", section: "phase_3", releaseDate: "01-11-2026" },
    { id: 12, title: "Micro Book 12", subtitle: "My Legacy", cover: "/cover-12.png", section: "phase_3", releaseDate: "01-12-2026" },
    { id: 13, title: "Master Book", subtitle: "THE LEGACY OS MASTER BOOK", cover: "/cover-14.png", section: "master_book", releaseDate: "01-01-2027" },
  ],

  // UI TRANSLATIONS
  translations: {
    en: {
        title: "EXPLORE THE LEGACY E-BOOK SERIES",
        subtitle: "From the world's first LEGACY ARCHITECT",
        enterLib: "ENTER LIBRARY",
        architect: "THE LEGACY ARCHITECT",
        audio: "AUDIO BOOKS",
        reviews: "REVIEWS",
        install: "INSTALL APP ICON",
        home: "HOME",
        index: "MODULE INDEX",
        read: "READ E-BOOK",
        listen: "LISTEN AUDIO",
        selectLang: "SELECT LANGUAGE",
        eng: "ENGLISH",
        mal: "MALAYALAM",
        comingSoon: "Coming Soon...",
        contentMissing: "Content Missing",
        dedicationTitle: "Dedication",
        fromMasterMap: "FROM THE LEGACY OS MASTER MAP",
        authorTitle: "The Legacy Architect",
        authorDesc: "Access the professional profile, download the legacy dossier, or view dedications.",
        visitWebsite: "LEGACY ARCHITECT",
        downloadProfile: "DOWNLOAD PROFILE",
        readDedications: "READ DEDICATIONS",
        selectAudioLang: "SELECT AUDIO LANGUAGE"
    },
    ml: {
        title: "ലെഗസി ഇ-ബുക്ക് സീരീസ്", 
        subtitle: "ലോകത്തിലെ ആദ്യത്തെ ലെഗസി ആർക്കിടെക്റ്റിൽ നിന്ന്",
        enterLib: "ലൈബ്രറി",
        architect: "ആർക്കിടെക്റ്റ്",
        audio: "ഓഡിയോ",
        reviews: "അഭിപ്രായങ്ങൾ",
        install: "ഇൻസ്റ്റാൾ ചെയ്യുക",
        home: "ഹോം",
        index: "സൂചിക",
        read: "വായിക്കുക",
        listen: "കേൾക്കുക",
        selectLang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
        eng: "ഇംഗ്ലീഷ്",
        mal: "മലയാളം",
        comingSoon: "ഉടൻ വരുന്നു...",
        contentMissing: "ഉള്ളടക്കം ലഭ്യമല്ല",
        dedicationTitle: "സമർപ്പണം",
        fromMasterMap: "ലെഗസി ഒഎസ് മാസ്റ്റർ മാപ്പിൽ നിന്ന്",
        authorTitle: "ലെഗസി ആർക്കിടെക്റ്റ്",
        authorDesc: "പ്രൊഫഷണൽ പ്രൊഫൈൽ ആക്സസ് ചെയ്യുക, ലെഗസി ഡോഷിയർ ഡൗൺലോഡ് ചെയ്യുക, അല്ലെങ്കിൽ സമർപ്പണങ്ങൾ കാണുക.",
        visitWebsite: "ലെഗസി ആർക്കിടെക്റ്റ്",
        downloadProfile: "പ്രൊഫൈൽ ഡൗൺലോഡ്",
        readDedications: "സമർപ്പണങ്ങൾ വായിക്കുക",
        selectAudioLang: "ഓഡിയോ ഭാഷ തിരഞ്ഞെടുക്കുക"
    }
  },

  // MODULE INDEX DATA
  moduleIndex: [
    { phase: "I", module: "My Life", function: "Core philosophy" },
    { phase: "I", module: "Age 33 Reset", function: "Identity reboot" },
    { phase: "I", module: "The Blueprint", function: "Life design" },
    { phase: "I", module: "Emotional Governance", function: "Internal control" },
    { phase: "II", module: "Trauma Alchemy", function: "Pain integration" },
    { phase: "II", module: "90-Day OS Upgrade", function: "Identity recalibration" },
    { phase: "II", module: "Legal Clarity", function: "Protection" },
    { phase: "II", module: "Wealth Kernel", function: "Money architecture" },
    { phase: "III", module: "Family Constitution", function: "Governance" },
    { phase: "III", module: "Firewall", function: "Risk defense" },
    { phase: "III", module: "Generational OS", function: "Dynasty systems" },
    { phase: "III", module: "My Legacy", function: "Succession" },
  ]
};

const SECTIONS = [
  { id: "master_launch", title: "1. Master Map — Launch Edition" },
  { id: "phase_1", title: "2. Phase I: The Foundation & The Rebuild" },
  { id: "phase_2", title: "3. Phase II: Building Capability & Resources" },
  { id: "phase_3", title: "4. Phase III: Scaling & Legacy" },
  { id: "master_book", title: "5. THE LEGACY OS MASTER BOOK" },
];

const DEDICATIONS_CONTENT = {
  en: [
    {
      title: "To my parents — ALAVI KC & AMINA K",
      content: `
        <p>Umma and Uppa,</p>
        <p>you are the first architects of our lives and the foundation beneath everything we are attempting to build. Your sacrifices were quiet, your love unconditional, and your prayers constant. Whatever strength, resilience, and purpose I have today is rooted in the values you lived every single day without fanfare.</p>
      `
    },
    // ... [Content abbreviated for brevity, but include all original dedications here] ...
    {
      title: "To my son, Fateh Shah KC —",
      content: `
        <p>You arrived in this world carrying both love and loss in the same moment, and you changed the entire architecture of my life. You did not just make me a father; you made me a custodian of legacy — of my parents, of your Ummi Shanu, of your Ammi Innu, and of everything our families stand for.</p>
        <p>This life is my responsibility.<br/>The future is yours.</p>
        <p>I am building systems so you do not merely inherit assets, but inherit clarity, courage, and character. I want your operating system to be calibrated for wisdom, integrity, compassion, and strength. I want you to stand tall without arrogance, to be kind without being weak, and to be resilient enough to rebuild yourself whenever life resets your plans.</p>
        <p>Your name carries your roadmap:<br/><strong>Fateh</strong> — victory through purpose<br/><strong>Shah</strong> — heritage, dignity, and lineage<br/><strong>KC</strong> — roots, responsibility, and continuity</p>
        <p>You are not expected to be perfect. You are expected to be honest, accountable, and unafraid of becoming yourself. If one day you lead our enterprises and our institutions, let it be because you earned it by competence and character — not because it was handed to you.</p>
        <p>Everything I write, build, protect, and endure now anchors back to you.<br/>Not to control your life, but to empower your choices.</p>
        <p>If life allows, one day you will read this as a man. When you do, know this:<br/>Your mother loved you before she saw you.<br/>Your family stands behind you.<br/>And my greatest legacy is not what I built — it is who you become.</p>
        <p>With love, discipline, and unwavering faith,<br/>— Your Abba</p>
      `
    }
  ],
  ml: [
    // ... [Include Malayalam Dedications Here] ...
    {
      title: "എൻ്റെ മകൻ, ഫാതഹ് ഷാ KC —",
      content: `
        <p>നീ ഈ ലോകത്തേക്ക് വന്നത് ഒരേ നിമിഷത്തിൽ സ്നേഹവും നഷ്ടവും കൈയിൽ പിടിച്ചുകൊണ്ടാണ്, അത് എന്റെ മുഴുവൻ ജീവിതത്തിന്റെ ആർക്കിടെക്ചർ മാറ്റിക്കളഞ്ഞു. നീ എന്നെ അച്ഛനാക്കിയതുമാത്രമല്ല; നീ എന്നെ ഒരു പാരമ്പര്യത്തിന്റെ സംരക്ഷകനാക്കി.</p>
        <p>ഈ ജീവിതം എന്റെ ഉത്തരവാദിത്വമാണ്.<br/>ഭാവി നിനക്കുദ്ദേശിച്ചിട്ടുള്ളതാണ്.</p>
        <p>നിനക്കു കൈമാറുന്നത് സ്വത്തുകളെ മാത്രമാക്കാതെ, വ്യക്തതയും ധൈര്യവും സ്വഭാവവും കൈമാറാൻ ഞാൻ സിസ്റ്റങ്ങൾ പണിയുന്നു. നിന്റെ ഓപ്പറേറ്റിംഗ് സിസ്റ്റം ജ്ഞാനം, നന്മ, കരുണ, ശക്തി എന്നിവയ്ക്കായി കലിബ്രേറ്റ് ചെയ്തിരിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു.</p>
        <p>നിന്റെ പേര് തന്നെയാണ് നിന്റെ റോഡ്‌മാപ്പ്:<br/><strong>ഫതഹ്</strong> — ലക്ഷ്യബോധത്തിലൂടെ വിജയം<br/><strong>ഷാ</strong> — പൈതൃകം, മാന്യത, വംശപരമ്പര്യം<br/><strong>KC</strong> — വേരുകൾ, ഉത്തരവാദിത്വം, തുടർച്ച</p>
        <p>നിന്നിൽ നിന്നെക്കുറിച്ചുള്ള എന്റെ പ്രതീക്ഷ പരിപൂർണ്ണതയല്ല. നിഷ്ഠയോടെ, ഉത്തരവാദിത്തത്തോടെയും നിനക്കു തന്നെ ആവാൻ ഭയമില്ലാത്തവനായി നീ മാറുക എന്നതാണ് എന്റെ പ്രതീക്ഷ.</p>
        <p>ഇപ്പോൾ ഞാൻ എഴുതുന്നതും പണിയുന്നതും സംരക്ഷിക്കുന്നതും ഭരിക്കുന്നതും എല്ലാം നിന്നിലേക്ക് ബന്ധിപ്പിച്ചിരിക്കുന്നു.<br/>നിന്റെ ജീവിതത്തെ നിയന്ത്രിക്കാനല്ല, നിന്റെ തിരഞ്ഞെടുപ്പുകൾക്ക് ശക്തി നൽകാനാണ്.</p>
        <p>ജീവൻ അനുവദിച്ചാൽ, ഒരുദിവസം നീ ഇത് ഒരു പുരുഷനായിട്ടാണ് വായിക്കുക. അന്ന് ഇതറിയുക:<br/>നിന്റെ അമ്മ നിന്നെ കാണുന്നതിന് മുമ്പ് തന്നെ നിന്നെ സ്നേഹിച്ചിരുന്നു.<br/>നിന്റെ കുടുംബം എല്ലായ്പ്പോഴും നിന്റെ പിന്നാലെ നിൽക്കുന്നു.<br/>ഞാൻ പണിതതാണ് എന്റെ ഏറ്റവും വലിയ പാരമ്പര്യം അല്ല — നീ ആകുന്ന ആളാണ്.</p>
        <p>സ്നേഹത്തോടും ശിക്ഷണത്തോടും അചഞ്ചലമായ വിശ്വാസത്തോടും കൂടി,<br/>— നിന്റെ അಬ್ಬ</p>
      `
    }
  ]
};

// --- UTILS ---
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// --- MARKDOWN PARSER ENGINE V2.2 (Robust & Forgiving) ---
const parseMarkdown = (text) => {
  if (!text) return [];
  const parts = text.split(/(?=^#{1,3}\s+)/gm);
  const chapters = [];
  
  parts.forEach(part => {
    const match = part.match(/^(#{1,3})\s+(.+)$/m);
    if (!match) return; 
    
    const title = match[2].trim();
    const rawContent = part.replace(/^(#{1,3})\s+(.+)$/m, '').trim();
    
    if (!rawContent) return;

    let htmlContent = rawContent.split(/\n\s*\n/).map(para => {
        let p = para.trim();
        if (!p) return '';
        if (p.startsWith('![') && p.includes('](')) {
          const imgMatch = p.match(/!\[(.*?)\]\((.*?)\)/);
          if (imgMatch) {
             let src = imgMatch[2];
             return `<div class="my-8 flex justify-center"><img src="${src}" alt="${imgMatch[1]}" class="max-w-full h-auto rounded-sm border border-stone-800" onError="this.style.display='none'" /></div>`;
          }
        }
        // STYLE UPDATE: Manifesto Blockquote
        if (p.startsWith('> ')) {
            return `<div class="my-10 p-8 border-l-4 border-amber-600 bg-zinc-900/50 text-stone-300 font-serif text-lg leading-relaxed shadow-lg">${p.replace(/^> /, '')}</div>`;
        }
        if (p === '---' || p === '***') return `<hr class="border-stone-800 my-8 opacity-50" />`;
        p = p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-200 font-bold">$1</strong>');
        p = p.replace(/\*(.*?)\*/g, '<em class="text-amber-600/80">$1</em>');
        if (p.startsWith('- ') || p.startsWith('* ')) {
             const items = p.split('\n').map(item => `<li class="ml-4 list-disc text-stone-400">${item.replace(/^[-*] /, '')}</li>`).join('');
             return `<ul class="space-y-2 my-4">${items}</ul>`;
        }
        return `<p>${p}</p>`;
      }).join('');
      
    if (htmlContent) {
        chapters.push({ id: chapters.length + 1, title: title, subtitle: `SECTION ${chapters.length + 1}`, content: htmlContent });
    }
  });

  return chapters;
};

// --- ANIMATED CARD COMPONENT ---
const AnimatedCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      {children}
    </div>
  );
};

// --- SYSTEM TOUR COMPONENT (The "Architect's Briefing") ---
const SystemTour = ({ onClose, t }) => {
  const [step, setStep] = useState(0);

  const TOUR_STEPS = [
    {
      title: "SYSTEM INITIALIZATION",
      content: "Welcome to The Legacy OS. This is not a standard ebook reader. It is a tool for installing a new operating system for your life. Do not consume it. Execute it."
    },
    {
      title: "SEQUENTIAL INSTALLATION",
      content: "The system is locked for a reason. You cannot build the roof before the foundation. Complete each Micro Book to unlock the next layer of architecture."
    },
    {
      title: "AUDIO ARCHITECTURE",
      content: "Listen to the 'Legacy Architect' audio files. Designed for 1.25x efficiency. Use this when you need to reinforce the structure while moving."
    },
    {
      title: "THE SOURCE CODE",
      content: "Access the author's dossier and dedications here. Understanding the architect helps you understand the architecture."
    },
    {
      title: "BEGIN OPERATION",
      content: "Your old operating system ends today. Click 'Finish' to enter the environment."
    }
  ];

  const currentStep = TOUR_STEPS[step];

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onClose(); 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm"></div>
      
      <div className="relative z-[110] max-w-md w-full bg-zinc-900 border-2 border-amber-600 p-8 shadow-[0_0_50px_rgba(217,119,6,0.2)]">
        <div className="flex items-center justify-between mb-6 border-b border-stone-800 pb-4">
          <span className="text-[10px] font-mono text-amber-600 tracking-widest uppercase">
            STEP {step + 1} / {TOUR_STEPS.length}
          </span>
          <div className="flex gap-1">
            {TOUR_STEPS.map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${i === step ? 'bg-amber-600' : 'bg-stone-800'}`}></div>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-serif text-white mb-4 tracking-wide">
          {currentStep.title}
        </h3>
        <p className="text-sm font-mono text-stone-400 leading-relaxed mb-8">
          {currentStep.content}
        </p>

        <div className="flex justify-between items-center">
          <button 
            onClick={onClose}
            className="text-[10px] font-bold text-stone-600 hover:text-stone-400 uppercase tracking-widest"
          >
            Skip Briefing
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-white text-black text-xs font-bold tracking-widest uppercase transition-all"
          >
            {step === TOUR_STEPS.length - 1 ? "INITIALIZE SYSTEM" : "NEXT PHASE"}
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const InstallGuide = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white"><X size={24} /></button>
    <div className="max-w-sm w-full space-y-8 text-center">
      <div className="mx-auto w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center border border-amber-600/30 mb-4">
        <Smartphone size={32} className="text-amber-600" />
      </div>
      <h2 className="text-xl font-serif text-stone-200">Install to Home Screen</h2>
      <div className="space-y-6 text-left bg-zinc-900/50 p-6 rounded border border-stone-800">
        <div className="flex gap-4">
          <div className="text-2xl">🍎</div>
          <div><h3 className="text-sm font-bold text-stone-300 mb-1">iPhone (iOS)</h3><p className="text-xs text-stone-500 leading-relaxed">1. Tap the <strong>Share</strong> button (box with arrow).<br/>2. Scroll down and tap <strong>"Add to Home Screen"</strong>.</p></div>
        </div>
        <div className="h-px bg-stone-800"></div>
        <div className="flex gap-4">
          <div className="text-2xl">🤖</div>
          <div><h3 className="text-sm font-bold text-stone-300 mb-1">Android</h3><p className="text-xs text-stone-500 leading-relaxed">1. Tap the <strong>Menu</strong> (three dots).<br/>2. Tap <strong>"Add to Home screen"</strong> or "Install App".</p></div>
        </div>
      </div>
      <button onClick={onClose} className="text-xs font-mono text-stone-500 hover:text-white mt-8">CLOSE GUIDE</button>
    </div>
  </div>
);

const ReviewModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white"><X size={24} /></button>
    <div className="max-w-md w-full space-y-8 text-center">
      <div className="mx-auto w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center border border-amber-600/30 mb-4">
        <Star size={32} className="text-amber-600 fill-amber-600/20" />
      </div>
      <h2 className="text-2xl font-serif text-amber-500">Submit Your Review</h2>
      <p className="text-stone-400 text-sm leading-relaxed px-4">
        Your feedback shapes the legacy. Please send your audio, video, or text reviews directly to the author.
      </p>
      <div className="bg-zinc-900 p-6 rounded border border-stone-800 flex flex-col items-center space-y-4">
        <span className="text-xs font-mono text-stone-500 uppercase tracking-widest">SEND TO</span>
        <a href={`mailto:${CONFIG.reviewEmail}`} className="text-lg font-bold text-white hover:text-amber-500 transition-colors border-b border-stone-700 pb-1">{CONFIG.reviewEmail}</a>
        <p className="text-[10px] text-stone-600 mt-4 max-w-xs">*Reviews are curated. Selected reviews will be featured in the public gallery.</p>
      </div>
      <button onClick={onClose} className="text-xs font-mono text-stone-500 hover:text-white mt-8">RETURN TO PORTAL</button>
    </div>
  </div>
);

const ModuleIndexView = ({ onBack, t }) => (
    <div className="min-h-screen bg-zinc-950 flex flex-col p-6 animate-fade-in text-stone-300">
        <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white"><X size={32} strokeWidth={1} /></button>
        <div className="max-w-3xl w-full mx-auto mt-12 space-y-12">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif text-amber-600">{t.index}</h2>
                <p className="text-xs font-mono text-stone-500">QUICK REFERENCE PAGE</p>
            </div>
            
            <div className="bg-zinc-900/50 rounded border border-stone-800 overflow-hidden">
                <table className="w-full text-left text-sm text-stone-400">
                    <thead className="bg-zinc-900 text-stone-300 font-bold uppercase text-xs border-b border-stone-800">
                        <tr>
                            <th className="p-4 w-1/4">Phase</th>
                            <th className="p-4 w-1/2">Module</th>
                            <th className="p-4 w-1/4">Function</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/50">
                        {CONFIG.moduleIndex.map((item, index) => (
                            <tr key={index} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="p-4 font-mono text-amber-600/80">{item.phase}</td>
                                <td className="p-4 text-stone-200 font-medium">{item.module}</td>
                                <td className="p-4 italic">{item.function}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const LandingPortal = ({ onEnterSeries, onEnterProfile, onEnterAudio, onEnterReviews, onShowInstall, t, lang, setLang }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-800/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
    
    <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-center animate-fade-in relative pb-32">
      <div className="mb-8 text-center space-y-4 pt-12">
        <div className="flex justify-center gap-6 mb-12">
            <button 
                onClick={() => setLang('en')} 
                className={`px-8 py-3 rounded-full text-lg font-bold tracking-widest transition-all border-2 ${lang === 'en' ? 'bg-amber-600 text-black border-amber-600 shadow-[0_0_25px_rgba(217,119,6,0.6)] scale-110' : 'bg-transparent text-stone-500 border-stone-800 hover:border-amber-600/50 hover:text-stone-300'}`}
            >
                ENGLISH
            </button>
            <button 
                onClick={() => setLang('ml')} 
                className={`px-8 py-3 rounded-full text-lg font-bold tracking-widest transition-all border-2 ${lang === 'ml' ? 'bg-amber-600 text-black border-amber-600 shadow-[0_0_25px_rgba(217,119,6,0.6)] scale-110' : 'bg-transparent text-stone-500 border-stone-800 hover:border-amber-600/50 hover:text-stone-300'}`}
            >
                മലയാളം
            </button>
        </div>

        <div className="relative inline-block group">
            <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full group-hover:bg-amber-500/30 transition-all duration-500"></div>
            <img src={CONFIG.logoPath} alt="Logo" className="relative w-20 h-20 mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-500 mb-4 drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]" />
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 tracking-tight leading-tight drop-shadow-[0_0_10px_rgba(217,119,6,0.5)] font-bold">{t.title}</h1>
        <p className="text-sm md:text-lg font-mono tracking-widest text-stone-300 uppercase opacity-90">{t.subtitle}</p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto rounded-full mt-6 opacity-80"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4 mt-4">
        
        <AnimatedCard>
            <div onClick={onEnterSeries} className="tour-library group relative cursor-pointer w-full aspect-[3/4] bg-zinc-900 border border-stone-800/50 hover:border-amber-500/50 transition-all duration-500 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] hover:-translate-y-2">
            <img src={CONFIG.seriesCover} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center pb-8"><span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white bg-amber-600/90 group-hover:bg-amber-500 text-black px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">{t.enterLib}</span></div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={200}>
            <div onClick={onEnterProfile} className="tour-profile group relative cursor-pointer w-full aspect-[3/4] bg-zinc-900 border border-stone-800/50 hover:border-amber-500/50 transition-all duration-500 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] hover:-translate-y-2">
            <img src={CONFIG.profileCover} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " flex items-center justify-center"; e.target.parentNode.innerHTML += `<div class="text-center p-4"><div class="text-2xl mb-2 text-stone-600">👤</div><div class="text-xs text-stone-500">Upload cover1.png</div></div>`; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center pb-8"><span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white bg-stone-800/90 group-hover:bg-white group-hover:text-black px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">{t.architect}</span></div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={400}>
            <div onClick={onEnterAudio} className="tour-audio group relative cursor-pointer w-full aspect-[3/4] bg-zinc-900 border border-stone-800/50 hover:border-amber-500/50 transition-all duration-500 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] hover:-translate-y-2">
            <img src={CONFIG.audioCover} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " flex items-center justify-center bg-zinc-900"; e.target.parentNode.innerHTML += `<div class="text-center p-4"><div class="text-2xl mb-2 text-stone-600">🎙️</div><div class="text-xs text-stone-500">Upload cover-audio.png</div></div>`; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center pb-8"><span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white bg-stone-800/90 group-hover:bg-amber-600 px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">{t.audio}</span></div>
            </div>
        </AnimatedCard>

        <AnimatedCard delay={600}>
            <div onClick={onEnterReviews} className="group relative cursor-pointer w-full aspect-[3/4] bg-zinc-900 border border-stone-800/50 hover:border-amber-500/50 transition-all duration-500 rounded-lg overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(217,119,6,0.15)] hover:-translate-y-2">
            <img src={CONFIG.reviewsCover} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " flex items-center justify-center bg-zinc-900"; e.target.parentNode.innerHTML += `<div class="text-center p-4"><div class="text-2xl mb-2 text-stone-600">★</div><div class="text-xs text-stone-500">Upload cover-reviews.png</div></div>`; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end justify-center pb-8"><span className="font-mono text-[10px] font-bold tracking-[0.2em] text-white bg-stone-800/90 group-hover:bg-amber-600 px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">{t.reviews}</span></div>
            </div>
        </AnimatedCard>

      </div>

      <button onClick={onShowInstall} className="mt-20 flex items-center gap-2 text-[10px] font-mono tracking-widest text-stone-500 hover:text-amber-500 transition-all px-5 py-2 border border-stone-800 rounded-full hover:border-amber-600/50 hover:bg-amber-950/10"><Download size={14} /> {t.install}</button>
    </div>
  </div>
);

// --- AUDIO & REVIEWS VIEWS ---

const AudioView = ({ onBack }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    fetch(CONFIG.audioDataPath).then(res => res.json()).then(data => {
        setTracks(data);
        setLoading(false);
    }).catch(err => {
        console.warn("Audio JSON missing, using empty list");
        setLoading(false);
    });
  }, []);

  const playTrack = (track) => {
    if (currentTrack?.id === track.id) {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    } else {
        setCurrentTrack(track);
        setIsPlaying(true);
        setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col p-6 animate-fade-in text-stone-300">
      <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white"><X size={32} strokeWidth={1} /></button>
      <div className="max-w-xl w-full mx-auto mt-12 space-y-8">
        <div className="text-center space-y-2"><h2 className="text-2xl font-serif text-amber-600">Spoken Legacy</h2><p className="text-xs font-mono text-stone-500">AUDIO ARCHIVE • VOLUME 1</p></div>
        
        {loading ? <div className="text-center text-xs font-mono text-stone-500">LOADING TRACKS...</div> : (
             <div className="space-y-4">
                {tracks.length === 0 ? <div className="text-center text-xs text-stone-600 italic py-10">No audio tracks found. Upload audio.json to public/data/</div> : tracks.map((track) => (
                    <div key={track.id} onClick={() => playTrack(track)} className={`p-4 rounded border cursor-pointer transition-all flex items-center justify-between group ${currentTrack?.id === track.id ? 'bg-zinc-900 border-amber-600' : 'border-stone-800 hover:bg-zinc-900 hover:border-stone-700'}`}>
                        <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentTrack?.id === track.id ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-500 group-hover:text-stone-300'}`}>{currentTrack?.id === track.id && isPlaying ? <Pause size={16} /> : <Play size={16} />}</div><div><h3 className={`text-sm font-bold ${currentTrack?.id === track.id ? 'text-amber-500' : 'text-stone-300'}`}>{track.title}</h3><p className="text-[10px] text-stone-500 font-mono">DURATION: {track.duration}</p></div></div>
                        {currentTrack?.id === track.id && <div className="text-amber-600 animate-pulse"><Volume2 size={16} /></div>}
                    </div>
                ))}
            </div>
        )}
        
        {currentTrack && (<div className="fixed bottom-0 left-0 w-full bg-zinc-900 border-t border-stone-800 p-4 flex items-center justify-between z-50"><div className="flex items-center gap-4"><button onClick={() => playTrack(currentTrack)} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">{isPlaying ? <Pause size={20} /> : <Play size={20} />}</button><div><p className="text-xs font-mono text-amber-600">NOW PLAYING</p><p className="text-sm font-bold text-white">{currentTrack.title}</p></div></div><audio ref={audioRef} src={currentTrack.file} onEnded={() => setIsPlaying(false)} /></div>)}
      </div>
    </div>
  );
};

const ReviewsView = ({ onBack, onReviewClick }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CONFIG.reviewsDataPath).then(res => res.json()).then(data => {
        setReviews(data);
        setLoading(false);
    }).catch(err => {
        console.warn("Reviews JSON missing, using empty list");
        setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col p-6 animate-fade-in text-stone-300">
        <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white"><X size={32} strokeWidth={1} /></button>
        <div className="max-w-4xl w-full mx-auto mt-12 space-y-12">
            <div className="text-center space-y-2"><h2 className="text-2xl font-serif text-amber-600">Impact & Reflections</h2><p className="text-xs font-mono text-stone-500">COMMUNITY REVIEWS</p></div>
            
            {loading ? <div className="text-center text-xs font-mono text-stone-500">LOADING REVIEWS...</div> : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.length === 0 ? <div className="col-span-2 text-center text-xs text-stone-600 italic py-10">No reviews yet. Upload reviews.json to public/data/</div> : reviews.map((review) => (
                        <div key={review.id} className="p-6 bg-zinc-900/50 border border-stone-800 rounded-sm hover:border-stone-700 transition-all">
                            {review.type === 'video' ? (<div className="aspect-video bg-black rounded mb-4 flex items-center justify-center border border-stone-800 relative group cursor-pointer"><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-amber-600 transition-colors"><Play size={20} className="text-white ml-1" /></div><p className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/50 px-2 py-1 rounded">VIDEO REVIEW</p></div>) : (<div className="mb-4"><Star size={16} className="text-amber-600 mb-2" /><p className="text-sm text-stone-400 italic leading-relaxed">"{review.content}"</p></div>)}
                            <div className="flex items-center gap-3 mt-4 border-t border-stone-800/50 pt-4"><div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center text-[10px] font-bold text-stone-500">{review.name.charAt(0)}</div><div><p className="text-xs font-bold text-stone-200">{review.name}</p><p className="text-[10px] text-stone-600 uppercase">{review.role}</p></div></div>
                        </div>
                    ))}
                </div>
            )}
            <div className="text-center pt-12"><button onClick={onReviewClick} className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-black text-xs font-bold tracking-widest rounded-full hover:bg-white transition-colors"><MessageSquare size={16} /> SUBMIT YOUR REVIEW</button></div>
        </div>
    </div>
  );
};

// --- LIBRARY GRID WITH LOCKING LOGIC ---

const LibraryGrid = ({ onSelectBook, onBack, progressData, onShowIndex, t }) => (
  <div className="min-h-screen bg-zinc-950 text-stone-300 p-6 md:p-12 animate-fade-in">
    <div className="fixed top-6 left-6 z-50 flex gap-4">
        <button onClick={onBack} className="flex items-center space-x-2 text-stone-500 hover:text-amber-500 transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
            <ArrowLeft size={16} /> <span className="text-xs font-mono tracking-widest">{t.home}</span>
        </button>
    </div>
    
    <div className="fixed top-6 right-6 z-50">
        <button onClick={onShowIndex} className="flex items-center space-x-2 text-amber-500 hover:text-white transition-colors bg-amber-900/20 hover:bg-amber-900/40 px-4 py-2 rounded-full backdrop-blur-md border border-amber-500/20">
            <Table size={16} /> <span className="text-xs font-mono tracking-widest">{t.index}</span>
        </button>
    </div>

    <div className="max-w-6xl mx-auto mt-20 space-y-20 pb-20">
      <div className="text-center space-y-2 mb-16">
        <h2 className="text-3xl font-serif text-amber-600">The Legacy Series</h2>
        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">SYSTEM ARCHITECTURE</p>
      </div>
      
      {SECTIONS.map((section) => {
        const sectionBooks = CONFIG.library.filter(b => b.section === section.id);
        if (sectionBooks.length === 0) return null;

        return (
            <div key={section.id} className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="h-px bg-stone-800 flex-grow"></div>
                    <h3 className="text-lg font-serif text-stone-400 uppercase tracking-widest">{section.title}</h3>
                    <div className="h-px bg-stone-800 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sectionBooks.map((book) => {
                        // SEQUENTIAL LOCKING LOGIC
                        const globalIndex = CONFIG.library.findIndex(b => b.id === book.id);
                        const prevBookId = globalIndex > 0 ? CONFIG.library[globalIndex - 1].id : null;
                        const prevBookProgress = prevBookId !== null ? progressData[prevBookId] : { current: 1, total: 1 };
                        
                        const isUnlocked = globalIndex === 0 || (prevBookProgress && prevBookProgress.current >= prevBookProgress.total - 1);
                        
                        const bookProgress = progressData[book.id] || { current: 0, total: 1 };
                        const percent = Math.round(((bookProgress.current + 1) / bookProgress.total) * 100);

                        return (
                            <button 
                                key={book.id} 
                                onClick={() => isUnlocked ? onSelectBook(book) : null} 
                                className={`group flex flex-col text-left space-y-3 relative ${!isUnlocked ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                            >
                                <div className={`aspect-[2/3] w-full bg-zinc-900 border rounded-sm relative overflow-hidden transition-all shadow-lg ${isUnlocked ? 'border-stone-800 group-hover:border-amber-600/50 group-hover:shadow-amber-900/10' : 'border-stone-900'}`}>
                                    
                                    {!isUnlocked && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
                                            <div className="w-12 h-12 rounded-full border border-stone-600 flex items-center justify-center text-stone-500">
                                                <Lock size={20} />
                                            </div>
                                        </div>
                                    )}

                                    <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " bg-gradient-to-br from-zinc-800 to-black p-4 flex flex-col justify-between"; e.target.parentNode.innerHTML = `<div class="text-[10px] font-mono text-stone-500 border border-stone-700 w-fit px-2 py-1 rounded">${String(book.id).padStart(2, '0')}</div><div class="w-8 h-8 rounded-full border border-stone-600 mb-2 flex items-center justify-center text-stone-600">L</div>`; }} />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-amber-900/10 transition-colors"></div>
                                    
                                    {isUnlocked && progressData[book.id] && (
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-stone-800">
                                            <div className="h-full bg-amber-600 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-sm font-bold font-serif leading-tight ${isUnlocked ? 'text-stone-300 group-hover:text-white' : 'text-stone-600'}`}>
                                            {book.title}
                                        </h3>
                                    </div>
                                    <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-1 line-clamp-1">{book.subtitle}</p>
                                    {!isUnlocked && <p className="text-[9px] text-red-900/50 font-mono mt-2">COMPLETE PREVIOUS MODULE</p>}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
      })}
    </div>
  </div>
);

const DedicationView = ({ onBack, t, lang }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative animate-fade-in">
    <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>
    <div className="max-w-2xl w-full mx-auto space-y-12 py-12">
      <h2 className="text-3xl font-serif text-amber-600 text-center tracking-wide border-b border-stone-800 pb-6 mb-8">{t.dedicationTitle}</h2>
      <div className="grid grid-cols-1 gap-8">
        {DEDICATIONS_CONTENT[lang].map((item, index) => (
          <div key={index} className="space-y-4 text-center">
            <h3 className="text-xl font-bold text-stone-200 font-serif">{item.title}</h3>
            <div className="text-stone-400 font-serif leading-relaxed italic text-sm md:text-base px-4" dangerouslySetInnerHTML={{ __html: item.content }} />
            {index < DEDICATIONS_CONTENT[lang].length - 1 && <div className="w-12 h-px bg-stone-800 mx-auto mt-8 opacity-50"></div>}
          </div>
        ))}
      </div>
      <div className="text-center pt-12"><p className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">{t.fromMasterMap}</p></div>
    </div>
  </div>
);

const ProfileOptions = ({ onBack, onShowDedications, t }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative">
    <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>
    <div className="max-w-md w-full space-y-8 animate-slide-up text-center">
      <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border border-amber-600/30 flex items-center justify-center mb-8"><User size={40} className="text-amber-600" /></div>
      <h2 className="text-3xl font-serif text-stone-200">{t.authorTitle}</h2>
      <p className="text-stone-500 text-sm leading-relaxed px-4">{t.authorDesc}</p>
      <div className="space-y-4 pt-8">
        <a href={CONFIG.authorWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-6 bg-zinc-900 border border-stone-800 hover:border-amber-600 hover:bg-zinc-800 transition-all rounded-sm group"><span className="font-mono text-sm tracking-widest text-stone-300 group-hover:text-amber-500">{t.visitWebsite}</span><ExternalLink size={18} className="text-stone-600 group-hover:text-amber-500" /></a>
        <a href={CONFIG.profilePdfPath} download className="flex items-center justify-between w-full p-6 bg-zinc-900 border border-stone-800 hover:border-amber-600 hover:bg-zinc-800 transition-all rounded-sm group"><span className="font-mono text-sm tracking-widest text-stone-300 group-hover:text-amber-500">{t.downloadProfile}</span><Download size={18} className="text-stone-600 group-hover:text-amber-500" /></a>
        <button onClick={onShowDedications} className="flex items-center justify-between w-full p-6 bg-zinc-900 border border-stone-800 hover:border-amber-600 hover:bg-zinc-800 transition-all rounded-sm group">
          <span className="font-mono text-sm tracking-widest text-stone-300 group-hover:text-amber-500">{t.readDedications}</span>
          <FileText size={18} className="text-stone-600 group-hover:text-amber-500" />
        </button>
      </div>
    </div>
  </div>
);

const FormatSelectionModal = ({ onClose, onSelect, t }) => (
  <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white"><X size={24} /></button>
    <div className="max-w-lg w-full space-y-12 text-center">
        <h2 className="text-3xl font-serif text-amber-500">{t.selectLang}</h2>
        <div className="grid grid-cols-2 gap-8">
            <button onClick={() => onSelect('read')} className="group flex flex-col items-center gap-4 p-8 bg-zinc-900 border border-stone-800 rounded-xl hover:border-amber-600 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-stone-800 group-hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                    <BookOpen size={32} />
                </div>
                <span className="text-sm font-bold tracking-widest text-stone-300 group-hover:text-white">{t.read}</span>
            </button>
            <button onClick={() => onSelect('listen')} className="group flex flex-col items-center gap-4 p-8 bg-zinc-900 border border-stone-800 rounded-xl hover:border-amber-600 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-stone-800 group-hover:bg-amber-600 flex items-center justify-center text-white transition-colors">
                    <Headphones size={32} />
                </div>
                <span className="text-sm font-bold tracking-widest text-stone-300 group-hover:text-white">{t.listen}</span>
            </button>
        </div>
    </div>
  </div>
);

const AudioPlayerView = ({ bookData, onBack, language, t }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const audioRef = useRef(null);
    const [error, setError] = useState(false);

    const audioFile = `/audio-${bookData.id}-${language}.mp3`;

    const togglePlay = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const changeSpeed = () => {
        // Updated Speed Cycle including 1.25x
        const newRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
        setPlaybackRate(newRate);
        if(audioRef.current) audioRef.current.playbackRate = newRate;
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative animate-fade-in text-stone-300">
            <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white flex items-center gap-2"><ArrowLeft size={20} /></button>
            
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="relative aspect-square w-64 mx-auto rounded-lg overflow-hidden border border-stone-800 shadow-2xl">
                    <img src={CONFIG.logoPath} alt="Audio Cover" className="w-full h-full object-cover p-8 opacity-90" />
                    <div className={`absolute inset-0 bg-black/10 rounded-full m-4 border-2 border-white/5 ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-serif text-white">{bookData.title}</h2>
                    <p className="text-xs font-mono text-amber-600 uppercase tracking-widest">{bookData.subtitle}</p>
                    <p className="text-xs text-stone-500 mt-2 uppercase">{language === 'en' ? 'ENGLISH AUDIO' : 'MALAYALAM AUDIO'}</p>
                </div>

                {error ? (
                    <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-xs font-mono">
                        AUDIO FILE NOT FOUND<br/>({audioFile})
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-center gap-8">
                            <button className="text-stone-500 hover:text-white transition-colors"><SkipBack size={24} /></button>
                            <button onClick={togglePlay} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors shadow-xl scale-110">
                                {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                            </button>
                            <button className="text-stone-500 hover:text-white transition-colors"><SkipForward size={24} /></button>
                        </div>
                        
                        <button onClick={changeSpeed} className="mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-stone-800 text-xs font-mono text-amber-600 hover:border-amber-600 transition-all">
                           <Gauge size={14} /> SPEED: {playbackRate}x
                        </button>
                    </div>
                )}
                
                <audio 
                    ref={audioRef} 
                    src={audioFile} 
                    onError={() => setError(true)}
                    onEnded={() => setIsPlaying(false)}
                />
            </div>
             <style>{`
                .animate-spin-slow { animation: spin 10s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

const ReaderView = ({ bookData, onBack, initialProgress, onProgressUpdate, language, t }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialProgress || 0);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(19);
  const [showControls, setShowControls] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const baseName = `/book-${bookData.id}`;
        const targetFile = `${baseName}-${language}.md`;
        let response = await fetch(`${targetFile}?t=${Date.now()}`);
        
        if (!response.ok) {
             response = await fetch(`${baseName}-en.md?t=${Date.now()}`);
             if(!response.ok) response = await fetch(`${bookData.file}?t=${Date.now()}`);
        }

        if (!response.ok) throw new Error("File not found");
        
        const text = await response.text();
        let parsed = parseMarkdown(text);
        
        if (language === 'ml' && t.originalNote && parsed.length > 0) {
             parsed[0].content = `<div class="p-4 mb-8 bg-amber-900/20 border border-amber-600/30 rounded text-amber-500 text-xs font-mono">${t.originalNote}</div>` + parsed[0].content;
        }

        if (parsed.length > 0) setChapters(parsed);
        else setChapters([{ id: 0, title: "Empty File", subtitle: "Warning", content: `<p>The file was found but appears empty.</p>` }]);

      } catch (err) {
         setChapters([{ id: 0, title: t.contentMissing, subtitle: "404", content: `<p>${t.contentMissing}</p>` }]);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [bookData, language, t]);

  useEffect(() => {
    if (chapters.length > 0) onProgressUpdate(bookData.id, currentChapterIndex, chapters.length);
  }, [currentChapterIndex, chapters, bookData.id]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 3) return [];
    return chapters.map((chap, idx) => {
        const text = chap.content.replace(/<[^>]*>/g, ' ');
        if (text.toLowerCase().includes(searchQuery.toLowerCase())) return { ...chap, index: idx };
        return null;
    }).filter(Boolean);
  }, [searchQuery, chapters]);

  const currentChapter = chapters[currentChapterIndex] || { title: "Loading...", content: "" };
  const readingTime = calculateReadingTime(currentChapter.content || "");

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900 text-stone-300' : 'bg-stone-50 text-stone-800'}`}>
      {!zenMode && (
        <header className={`fixed top-0 w-full z-30 transition-all duration-300 border-b backdrop-blur-md ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800/50' : 'bg-white/95 border-stone-200/50'}`}>
            <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={onBack} className="p-2 -ml-2 hover:text-amber-600 transition-colors flex items-center gap-2"><ArrowLeft size={20} /></button>
            <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowTOC(true)}>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 opacity-80">{bookData.title}</span>
                <span className={`text-xs font-serif ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>{currentChapter.subtitle || "READING"}</span>
            </div>
            <div className="flex items-center space-x-1">
                <button onClick={() => setShowSearch(!showSearch)} className="p-2 hover:text-amber-600 transition-colors"><Search size={18} /></button>
                <button onClick={() => setZenMode(true)} className="p-2 hover:text-amber-600 transition-colors"><Maximize size={18} /></button>
                <div className="relative">
                    <button onClick={() => setShowControls(!showControls)} className={`p-2 transition-colors ${showControls ? 'text-amber-600' : 'hover:text-amber-600'}`}><Type size={20} /></button>
                    {showControls && (
                        <div className="absolute top-full right-0 mt-4 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xl rounded-sm p-5 w-64 animate-slide-up z-50">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between"><span className="text-xs font-sans uppercase text-stone-500">Mode</span><div className="flex bg-stone-100 dark:bg-zinc-800 rounded-full p-1"><button onClick={() => setTheme('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-white text-amber-600 shadow' : 'text-stone-400'}`}><Sun size={14} /></button><button onClick={() => setTheme('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700 text-amber-400 shadow' : 'text-stone-400'}`}><Moon size={14} /></button></div></div>
                                <div className="space-y-3"><div className="flex items-center justify-between text-stone-500"><span className="text-xs font-sans uppercase">Size</span><span className="text-xs font-mono">{fontSize}px</span></div><input type="range" min="16" max="26" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full h-1 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-600" /></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
            {showSearch && (
                <div className="border-t border-stone-800 bg-zinc-950/95 backdrop-blur p-4 animate-slide-up">
                    <div className="max-w-xl mx-auto">
                        <input type="text" placeholder="Search in this book..." className="w-full bg-zinc-900 border border-stone-700 p-3 text-sm text-white focus:border-amber-600 focus:outline-none rounded-sm mb-4" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                        {searchResults.length > 0 && (
                            <div className="max-h-40 overflow-y-auto space-y-2">
                                {searchResults.map(res => (
                                    <button key={res.id} onClick={() => { setCurrentChapterIndex(res.index); setShowSearch(false); }} className="w-full text-left p-3 hover:bg-stone-900 rounded border border-transparent hover:border-stone-800">
                                        <div className="text-xs text-amber-600 font-mono">{res.subtitle}</div>
                                        <div className="text-sm text-stone-300 font-serif">{res.title}</div>
                                    </button>
                                ))}
                            </div>
                        )}
                        {searchQuery.length > 0 && searchResults.length === 0 && <div className="text-center text-stone-500 text-xs py-2">No results found</div>}
                    </div>
                </div>
            )}
        </header>
      )}

      <main className={`max-w-2xl mx-auto px-6 pb-32 transition-all duration-500 ${zenMode ? 'pt-20 cursor-text' : 'pt-32'}`}>
        <article className="animate-fade-in">
          {zenMode && (
              <button onClick={() => setZenMode(false)} className="fixed top-6 right-6 p-2 bg-black/20 hover:bg-black/50 text-stone-500 hover:text-white rounded-full transition-colors z-50"><Minimize size={20} /></button>
          )}
          {loading ? (
             <div className="flex justify-center py-20 text-stone-500 font-mono text-xs animate-pulse">LOADING SYSTEM...</div>
          ) : (
            <>
                <header className="mb-12 text-center">
                    <span className="block text-amber-600 font-mono text-xs tracking-[0.2em] mb-4 uppercase">{currentChapter.subtitle}</span>
                    <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-6 ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>{currentChapter.title}</h2>
                    <div className="flex items-center justify-center space-x-2 text-stone-500 text-[10px] font-mono mb-8 opacity-60">
                        <Clock size={12} />
                        <span>{readingTime} MIN READ</span>
                    </div>
                    <div className="w-8 h-[1px] bg-amber-600/50 mx-auto"></div>
                </header>
                <div className="prose dark:prose-invert prose-lg md:prose-xl mx-auto font-serif leading-loose" style={{ fontSize: `${fontSize}px` }}>
                    <div dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
                </div>
            </>
          )}
        </article>
      </main>

      {!zenMode && (
        <footer className={`fixed bottom-0 w-full z-30 border-t backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-zinc-900/95 border-zinc-800/50' : 'bg-white/95 border-stone-200/50'}`}>
            <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={() => { if(currentChapterIndex > 0) { setCurrentChapterIndex(prev => prev - 1); window.scrollTo(0,0); } }} disabled={currentChapterIndex === 0} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}><ChevronLeft size={16} /><span className="text-sm font-sans font-medium hidden md:inline">Previous</span></button>
            <span className="text-[10px] font-mono text-stone-500 tracking-wider">{(currentChapterIndex + 1)} / {chapters.length}</span>
            <button 
                onClick={() => { 
                    if(currentChapterIndex < chapters.length - 1) { 
                        setCurrentChapterIndex(prev => prev + 1); 
                        window.scrollTo(0,0); 
                    } else {
                        // EXIT FUNCTIONALITY
                        onBack();
                    }
                }} 
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all hover:bg-stone-100 dark:hover:bg-zinc-800`}
            >
                {currentChapterIndex === chapters.length - 1 ? (
                    <span className="text-sm font-sans font-bold text-amber-600">COMPLETE & EXIT</span>
                ) : (
                    <>
                        <span className="text-sm font-sans font-medium hidden md:inline">Next</span>
                        <ChevronRight size={16} />
                    </>
                )}
            </button>
            </div>
        </footer>
      )}

      {showTOC && (
        <div className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-fade-in">
            <button onClick={() => setShowTOC(false)} className="absolute top-6 right-6 text-stone-400 hover:text-white transition-colors p-2"><X size={32} strokeWidth={1} /></button>
            <h2 className="text-2xl font-serif text-amber-600 mb-12 tracking-wider border-b border-amber-900/30 pb-4">INDEX</h2>
            <nav className="space-y-4 w-full max-w-md text-center max-h-[70vh] overflow-y-auto">
            {chapters.map((chapter, index) => (
                <button key={chapter.id} onClick={() => { setCurrentChapterIndex(index); setShowTOC(false); window.scrollTo(0,0); }} className={`w-full py-4 px-4 text-lg md:text-xl font-serif transition-all duration-300 rounded-sm ${currentChapterIndex === index ? 'bg-amber-900/10 text-amber-500 border border-amber-900/20' : 'text-stone-500 hover:text-stone-200 hover:bg-stone-900'}`}>
                <span className="block text-[10px] font-mono text-stone-600 mb-1 uppercase tracking-widest">{chapter.subtitle}</span>
                {chapter.title}
                </button>
            ))}
            </nav>
        </div>
      )}
    </div>
  );
};

// --- MAIN CONTROLLER ---
export default function TheLegacyReader() {
  const [view, setView] = useState('landing');
  const [selectedBook, setSelectedBook] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [lang, setLang] = useState('en');
  const [showTour, setShowTour] = useState(false); // NEW STATE FOR TOUR
  const [formatModal, setFormatModal] = useState(null); 

  useEffect(() => {
    const saved = localStorage.getItem('legacy_os_progress');
    if (saved) setProgressData(JSON.parse(saved));

    // CHECK TOUR STATUS
    const tourCompleted = localStorage.getItem('legacy_os_tour_complete');
    if (!tourCompleted) {
      setTimeout(() => setShowTour(true), 1500); 
    }
  }, []);

  const updateProgress = (bookId, chapterIndex, totalChapters) => {
    const newProgress = { ...progressData, [bookId]: { current: chapterIndex, total: totalChapters, lastRead: Date.now() } };
    setProgressData(newProgress);
    localStorage.setItem('legacy_os_progress', JSON.stringify(newProgress));
  };

  const completeTour = () => {
    setShowTour(false);
    localStorage.setItem('legacy_os_tour_complete', 'true');
  };

  const goHome = () => setView('landing');
  const goGallery = () => setView('gallery');
  const goProfile = () => setView('profile');
  const goAudio = () => setView('audio');
  const goReviews = () => setView('reviews');
  const goDedications = () => setView('dedications');
  const goIndex = () => setView('index');

  const onBookClick = (book) => {
    setFormatModal(book);
  };

  const handleFormatSelect = (format) => {
     if (format === 'read') {
         setSelectedBook(formatModal);
         setView('reader');
     } else if (format === 'listen') {
         setSelectedBook(formatModal);
         setView('audio_player'); 
     }
     setFormatModal(null);
  };

  const t = CONFIG.translations[lang] || CONFIG.translations['en'];

  return (
    <>
      {showTour && <SystemTour onClose={completeTour} t={t} />}

      {view === 'landing' && (
        <LandingPortal 
          onEnterSeries={goGallery} 
          onEnterProfile={goProfile} 
          onEnterAudio={goAudio}
          onEnterReviews={goReviews}
          onShowInstall={() => setShowInstallGuide(true)}
          t={t}
          lang={lang}
          setLang={setLang}
        />
      )}
      
      {showInstallGuide && <InstallGuide onClose={() => setShowInstallGuide(false)} />}
      {showReviewModal && <ReviewModal onClose={() => setShowReviewModal(false)} />}
      
      {formatModal && (
          <FormatSelectionModal 
            onClose={() => setFormatModal(null)} 
            onSelect={handleFormatSelect} 
            t={t}
          />
      )}

      {view === 'gallery' && <LibraryGrid onSelectBook={onBookClick} onBack={goHome} progressData={progressData} onShowIndex={goIndex} t={t} />}
      {view === 'profile' && <ProfileOptions onBack={goHome} onShowDedications={goDedications} t={t} />}
      {view === 'dedications' && <DedicationView onBack={goProfile} t={t} lang={lang} />}
      
      {view === 'index' && <ModuleIndexView onBack={goGallery} t={t} />}

      {view === 'audio' && <AudioView onBack={goHome} t={t} onSelectBook={onBookClick} />}
      
      {view === 'audio_player' && selectedBook && <AudioPlayerView bookData={selectedBook} onBack={goGallery} language={lang} t={t} />}

      {view === 'reviews' && <ReviewsView onBack={goHome} onReviewClick={() => setShowReviewModal(true)} />}

      {view === 'reader' && selectedBook && (
        <ReaderView 
          bookData={selectedBook} 
          onBack={goGallery} 
          initialProgress={progressData[selectedBook.id]?.current || 0}
          onProgressUpdate={updateProgress}
          language={lang}
          t={t}
        />
      )}
      <style>{`
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        ::selection { background: #d97706; color: white; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(120, 113, 108, 0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(120, 113, 108, 0.4); }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}