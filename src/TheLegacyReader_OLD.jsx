import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Moon, Sun, Menu, X, Type, ChevronLeft, ChevronRight, Smartphone, Globe, Download, ExternalLink, ArrowLeft, BookOpen, User, Maximize, Minimize, Search, Clock, Share, FileText, Mic, MessageSquare, Star, Play, Pause, SkipForward, SkipBack, Volume2, Table, Languages, Headphones } from 'lucide-react';

/* ==================================================================================
   ⬇️ CONFIGURATION & TRANSLATION ZONE ⬇️
   ================================================================================== */

const TRANSLATIONS = {
  en: {
    enterLibrary: "ENTER LIBRARY",
    legacyArchitect: "LEGACY ARCHITECT",
    audioBooks: "AUDIO BOOKS",
    reviews: "REVIEWS",
    installIcon: "INSTALL APP ICON",
    moduleIndex: "MODULE INDEX",
    home: "HOME",
    searchPlaceholder: "Search in this book...",
    loading: "LOADING SYSTEM...",
    minRead: "MIN READ",
    comingSoon: "Coming Soon",
    contentMissing: "Content coming soon.",
    impactReflections: "Impact & Reflections",
    submitReview: "SUBMIT YOUR REVIEW",
    dedication: "DEDICATION",
    systemArch: "SYSTEM ARCHITECTURE",
    dailyWisdom: "DAILY WISDOM",
    listen: "LISTEN",
    stop: "STOP AUDIO"
  },
  ml: {
    enterLibrary: "ലൈബ്രറിയിൽ പ്രവേശിക്കുക",
    legacyArchitect: "ലഗസി ആർക്കിടെക്റ്റ്",
    audioBooks: "ഓഡിയോ ബുക്കുകൾ",
    reviews: "അഭിപ്രായങ്ങൾ",
    installIcon: "ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യുക",
    moduleIndex: "മൊഡ്യൂൾ സൂചിക",
    home: "ഹോം",
    searchPlaceholder: "തിരയുക...",
    loading: "ലോഡുചെയ്യുന്നു...",
    minRead: "മിനിറ്റ് വായന",
    comingSoon: "ഉടൻ വരുന്നു",
    contentMissing: "ഉള്ളടക്കം ഉടൻ ലഭ്യമാകും.",
    impactReflections: "അഭിപ്രായങ്ങളും ചിന്തകളും",
    submitReview: "നിങ്ങളുടെ അഭിപ്രായം രേഖപ്പെടുത്തുക",
    dedication: "സമർപ്പണം",
    systemArch: "സിസ്റ്റം ആർക്കിടെക്ചർ",
    dailyWisdom: "ദിവസത്തെ ചിന്ത",
    listen: "കേൾക്കുക",
    stop: "നിർത്തുക"
  }
};

const CONFIG = {
  author: "KC FIROZ", 
  logoPath: "/icon-v2.png",   
  reviewEmail: "adv.firoz@kc-capitals.com",
  authorWebsite: "https://author.kc-capitals.com",
  
  // IMAGES
  seriesCover: "/cover.png",   
  profileCover: "/cover1.png", 
  audioCover: "/cover-audio.png", 
  reviewsCover: "/cover-reviews.png",
  
  // DATA
  profilePdfPath: "/profile.pdf",
  audioDataPath: "/data/audio.json",
  reviewsDataPath: "/data/reviews.json",

  // LIBRARY
  library: [
    { id: 0, title: "Micro Book 0", subtitle: "The Legacy OS (Master Map)", file: "/book-0.md", cover: "/cover-0.png?v=4", section: "master_launch", releaseDate: "01-01-2026" },
    { id: 1, title: "Micro Book 1", subtitle: "My Life: 10% Destiny, 90% Creation", file: "/book-1.md", cover: "/cover-1.png", section: "phase_1", releaseDate: "01-01-2026" },
    { id: 2, title: "Micro Book 2", subtitle: "The Age 33 Reset", file: "/book-2.md", cover: "/cover-2.png", section: "phase_1", releaseDate: "01-02-2026" },
    { id: 3, title: "Micro Book 3", subtitle: "The Blueprint", file: "/book-3.md", cover: "/cover-3.png", section: "phase_1", releaseDate: "01-03-2026" },
    { id: 4, title: "Micro Book 4", subtitle: "Emotional Governance", file: "/book-4.md", cover: "/cover-4.png", section: "phase_1", releaseDate: "01-04-2026" },
    { id: 5, title: "Micro Book 5", subtitle: "Legal Clarity Framework", file: "/book-5.md", cover: "/cover-5.png", section: "phase_2", releaseDate: "01-05-2026" },
    { id: 6, title: "Micro Book 6", subtitle: "The Wealth Kernel 1.0", file: "/book-6.md", cover: "/cover-6.png", section: "phase_2", releaseDate: "01-06-2026" },
    { id: 7, title: "Micro Book 7", subtitle: "The Family Constitution", file: "/book-7.md", cover: "/cover-7.png", section: "phase_2", releaseDate: "01-07-2026" },
    { id: 8, title: "Micro Book 8", subtitle: "The Trauma Alchemy Manual", file: "/book-8.md", cover: "/cover-8.png", section: "phase_2", releaseDate: "01-08-2026" },
    { id: 9, title: "Micro Book 9", subtitle: "The 90-Day OS Upgrade", file: "/book-9.md", cover: "/cover-9.png", section: "phase_3", releaseDate: "01-09-2026" },
    { id: 10, title: "Micro Book 10", subtitle: "The Generational OS", file: "/book-10.md", cover: "/cover-10.png", section: "phase_3", releaseDate: "01-10-2026" },
    { id: 11, title: "Micro Book 11", subtitle: "The Firewall", file: "/book-11.md", cover: "/cover-11.png", section: "phase_3", releaseDate: "01-11-2026" },
    { id: 12, title: "Micro Book 12", subtitle: "My Legacy", file: "/book-12.md", cover: "/cover-12.png", section: "phase_3", releaseDate: "01-12-2026" },
    { id: 13, title: "Master Book", subtitle: "THE LEGACY OS MASTER BOOK", file: "/book-master.md", cover: "/cover-14.png", section: "master_book", releaseDate: "01-01-2027" },
  ],

  // RANDOM QUOTES FOR LANDING PAGE
  wisdomQuotes: [
    "We do not build for today. We build for the years we will not see.",
    "Legacy is not what you leave for people, it is what you leave in people.",
    "A nuclear dynasty is built on clarity, not just capital.",
    "Silence is the language of the architect.",
    "Protect the core. Expand the perimeter."
  ]
};

const SECTIONS = [
  { id: "master_launch", title: "1. Master Map — Launch Edition" },
  { id: "phase_1", title: "2. Phase I: The Foundation & The Rebuild" },
  { id: "phase_2", title: "3. Phase II: Building Capability & Resources" },
  { id: "phase_3", title: "4. Phase III: Scaling & Legacy" },
  { id: "master_book", title: "5. THE LEGACY OS MASTER BOOK" },
];

// --- UTILS ---
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// --- MARKDOWN ENGINE ---
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
             return `<div class="my-8 flex justify-center"><img src="${imgMatch[2]}" alt="${imgMatch[1]}" class="max-w-full h-auto rounded-sm border border-stone-800 shadow-lg" /></div>`;
          }
        }
        if (p.startsWith('> ')) return `<blockquote class="border-l-4 border-amber-600 pl-6 italic text-stone-400 my-8 text-xl font-serif">${p.replace(/^> /, '')}</blockquote>`;
        if (p === '---' || p === '***') return `<hr class="border-amber-900/30 my-10" />`;
        p = p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-200 font-bold">$1</strong>');
        p = p.replace(/\*(.*?)\*/g, '<em class="text-amber-600/80">$1</em>');
        if (p.startsWith('- ') || p.startsWith('* ')) {
             const items = p.split('\n').map(item => `<li class="ml-4 list-disc text-stone-400 marker:text-amber-600">${item.replace(/^[-*] /, '')}</li>`).join('');
             return `<ul class="space-y-3 my-6 pl-4">${items}</ul>`;
        }
        return `<p class="mb-4">${p}</p>`;
      }).join('');
      
    if (htmlContent) {
        chapters.push({ id: chapters.length + 1, title: title, subtitle: `SECTION ${chapters.length + 1}`, content: htmlContent });
    }
  });
  return chapters;
};

// --- ANIMATED CARD ---
const AnimatedCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setTimeout(() => setIsVisible(true), delay); observer.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>{children}</div>;
};

// --- COMPONENTS ---

const LanguageToggle = ({ lang, setLang }) => (
  <div className="flex items-center justify-center space-x-4 mb-6 animate-fade-in">
    <div className="bg-zinc-900/80 backdrop-blur-md p-1 rounded-full border border-stone-800 flex items-center relative">
      <button 
        onClick={() => setLang('en')} 
        className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${lang === 'en' ? 'bg-amber-600 text-black shadow-lg shadow-amber-900/20' : 'text-stone-500 hover:text-stone-300'}`}
      >
        ENGLISH
      </button>
      <button 
        onClick={() => setLang('ml')} 
        className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 ${lang === 'ml' ? 'bg-amber-600 text-black shadow-lg shadow-amber-900/20' : 'text-stone-500 hover:text-stone-300'}`}
      >
        മലയാളം
      </button>
    </div>
  </div>
);

const LandingPortal = ({ lang, setLang, onEnterSeries, onEnterProfile, onEnterAudio, onEnterReviews }) => {
  const [quote, setQuote] = useState("");
  
  useEffect(() => {
    setQuote(CONFIG.wisdomQuotes[Math.floor(Math.random() * CONFIG.wisdomQuotes.length)]);
  }, []);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background FX */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-zinc-950 to-zinc-950"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="z-10 w-full max-w-7xl mx-auto flex flex-col items-center animate-fade-in pb-20 pt-10">
            
            {/* 1. LANGUAGE TOGGLE (ENTRY POINT) */}
            <LanguageToggle lang={lang} setLang={setLang} />
            
            <div className="mb-20 text-center space-y-6">
                <div className="relative inline-block group mb-6">
                    <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full"></div>
                    <img src={CONFIG.logoPath} alt="Logo" className="relative w-24 h-24 mx-auto object-contain drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]" />
                </div>
                
                <h1 className="text-3xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-600 font-bold tracking-tight leading-tight px-4">
                    THE LEGACY OS
                </h1>
                
                <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-stone-400 uppercase">
                   Digital Heritage Archive
                </p>

                {/* Daily Wisdom Widget */}
                <div className="mt-8 max-w-lg mx-auto border-t border-b border-stone-800/50 py-4 px-8">
                    <p className="font-serif italic text-stone-500 text-sm md:text-base leading-relaxed">"{quote}"</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl px-4">
                <AnimatedCard delay={100}>
                    <div onClick={onEnterSeries} className="group cursor-pointer relative aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-600/50 transition-all hover:-translate-y-1 shadow-2xl">
                        <img src={CONFIG.seriesCover} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-6 left-0 w-full text-center">
                            <span className="bg-amber-600 text-black text-[10px] font-bold px-4 py-2 rounded-full tracking-widest group-hover:bg-white transition-colors shadow-lg">
                                {t.enterLibrary}
                            </span>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={200}>
                    <div onClick={onEnterProfile} className="group cursor-pointer relative aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-600/50 transition-all hover:-translate-y-1 shadow-2xl">
                        <img src={CONFIG.profileCover} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-stone-600 text-4xl">👤</div>`; }} />
                        <div className="absolute bottom-6 left-0 w-full text-center">
                            <span className="bg-stone-800 text-stone-300 text-[10px] font-bold px-4 py-2 rounded-full tracking-widest group-hover:bg-white group-hover:text-black transition-colors shadow-lg">
                                {t.legacyArchitect}
                            </span>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={300}>
                    <div onClick={onEnterAudio} className="group cursor-pointer relative aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-600/50 transition-all hover:-translate-y-1 shadow-2xl">
                        <img src={CONFIG.audioCover} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-stone-600 text-4xl">🎙️</div>`; }} />
                        <div className="absolute bottom-6 left-0 w-full text-center">
                            <span className="bg-stone-800 text-stone-300 text-[10px] font-bold px-4 py-2 rounded-full tracking-widest group-hover:bg-white group-hover:text-black transition-colors shadow-lg">
                                {t.audioBooks}
                            </span>
                        </div>
                    </div>
                </AnimatedCard>

                <AnimatedCard delay={400}>
                    <div onClick={onEnterReviews} className="group cursor-pointer relative aspect-[3/4] bg-zinc-900 rounded-lg overflow-hidden border border-stone-800 hover:border-amber-600/50 transition-all hover:-translate-y-1 shadow-2xl">
                        <img src={CONFIG.reviewsCover} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-stone-600 text-4xl">★</div>`; }} />
                        <div className="absolute bottom-6 left-0 w-full text-center">
                            <span className="bg-stone-800 text-stone-300 text-[10px] font-bold px-4 py-2 rounded-full tracking-widest group-hover:bg-white group-hover:text-black transition-colors shadow-lg">
                                {t.reviews}
                            </span>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
            
            <div className="mt-16 text-[10px] font-mono text-stone-600 uppercase tracking-widest opacity-50">
                Version 3.1 • Digital Heritage Edition
            </div>
        </div>
    </div>
  );
};

const LibraryGrid = ({ lang, onSelectBook, onBack }) => {
  const t = TRANSLATIONS[lang];
  
  // Group books by section
  const groupedBooks = useMemo(() => {
    const groups = {};
    SECTIONS.forEach(sec => groups[sec.id] = CONFIG.library.filter(b => b.section === sec.id));
    return groups;
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-stone-300 p-6 md:p-12 animate-fade-in">
        {/* Nav */}
        <div className="fixed top-6 left-6 z-50">
            <button onClick={onBack} className="flex items-center space-x-2 text-stone-500 hover:text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur border border-white/5 transition-colors">
                <ArrowLeft size={16} /> <span className="text-xs font-mono tracking-widest">{t.home}</span>
            </button>
        </div>

        <div className="max-w-6xl mx-auto mt-20 pb-20 space-y-24">
            <div className="text-center border-b border-stone-800 pb-12">
                <h2 className="text-4xl font-serif text-amber-600 mb-2">{t.systemArch}</h2>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-[0.3em]">The Legacy Series • 2026-2027</p>
            </div>
            
            {SECTIONS.map((section) => (
                <div key={section.id} className="space-y-8">
                    <h3 className="text-xl font-serif text-stone-200 border-l-4 border-amber-800 pl-4">{section.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {groupedBooks[section.id]?.map((book) => (
                            <button key={book.id} onClick={() => onSelectBook(book)} className="group text-left space-y-4">
                                <div className="aspect-[2/3] bg-zinc-900 border border-stone-800 relative overflow-hidden shadow-lg group-hover:shadow-amber-900/20 group-hover:border-amber-600/50 transition-all">
                                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-[10px] font-mono text-amber-500 bg-black/50 px-2 py-1 rounded border border-amber-900">{t.minRead}</span>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-stone-300 group-hover:text-amber-500 font-serif leading-tight transition-colors">{book.title}</h4>
                                    <p className="text-[10px] text-stone-600 font-mono mt-2 uppercase tracking-wide">{book.subtitle}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

const ReaderView = ({ lang, bookData, onBack }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSize, setFontSize] = useState(20);
  const [theme, setTheme] = useState('dark');
  const [showControls, setShowControls] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  
  // VOICE SYSTEM STATES
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        let filePath = bookData.file;
        if (lang === 'ml') {
            filePath = filePath.replace('.md', '-ml.md');
        }
        
        const res = await fetch(`${filePath}?t=${Date.now()}`);
        if (!res.ok) throw new Error("File missing");
        const text = await res.text();
        const parsed = parseMarkdown(text);
        
        if (parsed.length > 0) setChapters(parsed);
        else throw new Error("Empty");
      } catch (err) {
        setChapters([{ 
            id: 0, 
            title: t.comingSoon, 
            subtitle: "404", 
            content: `<p class="text-center text-stone-500 mt-10 italic">${t.contentMissing}</p>` 
        }]);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
    
    // Stop audio if unmounting (going back)
    return () => {
        if(synth) synth.cancel();
    }
  }, [bookData, lang]);

  // Stop audio when changing chapters
  useEffect(() => {
     if(synth) synth.cancel();
     setIsSpeaking(false);
  }, [currentChapterIndex]);

  // VOICE LOGIC
  const toggleVoice = () => {
    if (isSpeaking) {
        synth.cancel();
        setIsSpeaking(false);
    } else {
        const currentChapter = chapters[currentChapterIndex];
        if(!currentChapter) return;
        
        // Strip HTML tags to get raw text
        const rawText = currentChapter.content.replace(/<[^>]+>/g, '');
        const utterance = new SpeechSynthesisUtterance(rawText);
        
        // Attempt to set language
        utterance.lang = lang === 'ml' ? 'ml-IN' : 'en-US';
        
        // Rate adjustment for natural reading
        utterance.rate = 0.9; 

        utterance.onend = () => setIsSpeaking(false);
        synth.speak(utterance);
        setIsSpeaking(true);
    }
  };

  const filteredChapters = useMemo(() => {
    if (!searchTerm) return [];
    return chapters.filter(c => c.content.toLowerCase().includes(searchTerm.toLowerCase()) || c.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, chapters]);

  const currentChapter = chapters[currentChapterIndex] || {};
  const readingTime = calculateReadingTime(currentChapter.content || "");

  const proseClass = `prose prose-lg md:prose-xl mx-auto font-serif leading-loose text-justify hyphens-auto 
  ${theme === 'dark' ? 'prose-invert text-stone-300' : 'text-stone-800'} 
  first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-bold first-letter:text-amber-600`;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-[#fdfbf7]'}`}>
       
       <header className={`fixed top-0 w-full z-40 transition-transform duration-500 ${zenMode ? '-translate-y-full' : 'translate-y-0'} ${theme === 'dark' ? 'bg-zinc-950/95 border-b border-zinc-800' : 'bg-white/95 border-b border-stone-200'}`}>
         <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:text-amber-600 transition-colors"><ArrowLeft size={20} className={theme === 'dark' ? 'text-stone-400' : 'text-stone-600'} /></button>
            
            <div className="text-center">
                <h1 className={`text-xs font-bold font-mono uppercase tracking-widest ${theme === 'dark' ? 'text-stone-500' : 'text-stone-400'}`}>{bookData.title}</h1>
            </div>

            <div className="flex items-center gap-1">
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-stone-500 hover:text-amber-600"><Search size={18} /></button>
                <button onClick={() => setZenMode(true)} className="p-2 text-stone-500 hover:text-amber-600"><Maximize size={18} /></button>
                <button onClick={() => setShowControls(!showControls)} className="p-2 text-stone-500 hover:text-amber-600"><Type size={18} /></button>
            </div>
         </div>

         {searchOpen && (
             <div className="border-t border-stone-800 bg-zinc-900 p-4 absolute w-full shadow-2xl">
                 <input 
                    type="text" 
                    placeholder={t.searchPlaceholder} 
                    className="w-full bg-black border border-stone-700 p-3 text-stone-200 rounded focus:border-amber-600 outline-none"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                 />
                 {searchTerm && (
                     <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
                         {filteredChapters.map((ch, idx) => (
                             <button key={idx} onClick={() => { setCurrentChapterIndex(chapters.indexOf(ch)); setSearchOpen(false); }} className="block w-full text-left p-2 hover:bg-zinc-800 text-xs text-stone-400 truncate">
                                 {ch.title}
                             </button>
                         ))}
                     </div>
                 )}
             </div>
         )}
         
         {showControls && (
            <div className="absolute top-16 right-4 bg-zinc-900 border border-stone-700 p-4 rounded shadow-xl w-64 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-stone-500">THEME</span>
                    <div className="flex bg-zinc-800 rounded-full p-1">
                        <button onClick={() => setTheme('light')} className={`p-2 rounded-full ${theme === 'light' ? 'bg-white text-black' : 'text-stone-500'}`}><Sun size={14}/></button>
                        <button onClick={() => setTheme('dark')} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'text-stone-500'}`}><Moon size={14}/></button>
                    </div>
                </div>
                <div>
                    <span className="text-xs font-mono text-stone-500 mb-2 block">SIZE: {fontSize}px</span>
                    <input type="range" min="16" max="28" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-amber-600 bg-zinc-800 h-1 rounded appearance-none" />
                </div>
            </div>
         )}
       </header>

       <main className={`max-w-3xl mx-auto px-6 transition-all duration-700 ${zenMode ? 'pt-20' : 'pt-32'} pb-32`}>
            {zenMode && <button onClick={() => setZenMode(false)} className="fixed top-6 right-6 z-50 p-2 bg-black/20 rounded-full text-stone-400 hover:text-white"><Minimize size={20} /></button>}
            
            {loading ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <div className="w-12 h-12 border-2 border-amber-600/30 border-t-amber-600 rounded-full animate-spin"></div>
                    <p className="text-xs font-mono text-stone-500">{t.loading}</p>
                </div>
            ) : (
                <article className="animate-fade-in">
                    <div className="text-center mb-16 space-y-4">
                        <span className="text-amber-600 font-mono text-xs tracking-[0.3em] uppercase">{currentChapter.subtitle}</span>
                        <h2 className={`text-3xl md:text-5xl font-serif font-bold ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>{currentChapter.title}</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto opacity-50"></div>
                        
                        <div className="flex items-center justify-center gap-6">
                            <p className="text-[10px] font-mono text-stone-500">{readingTime} {t.minRead}</p>
                            
                            {/* VOICE BUTTON */}
                            <button 
                                onClick={toggleVoice} 
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all text-[10px] font-bold tracking-widest ${isSpeaking ? 'bg-amber-600 border-amber-600 text-black animate-pulse' : 'bg-transparent border-stone-700 text-stone-500 hover:text-white hover:border-amber-600'}`}
                            >
                                {isSpeaking ? <Pause size={12} /> : <Headphones size={12} />}
                                {isSpeaking ? t.stop : t.listen}
                            </button>
                        </div>
                    </div>

                    <div className={proseClass} style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
                </article>
            )}
       </main>

       {!zenMode && (
           <footer className={`fixed bottom-0 w-full border-t backdrop-blur z-40 ${theme === 'dark' ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-stone-200'}`}>
               <div className="max-w-4xl mx-auto flex items-center justify-between h-16 px-4">
                   <button 
                     onClick={() => { if(currentChapterIndex > 0) { setCurrentChapterIndex(c => c - 1); window.scrollTo(0,0); } }}
                     disabled={currentChapterIndex === 0}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === 0 ? 'opacity-0' : 'hover:bg-amber-600/10 text-stone-500 hover:text-amber-600'}`}
                   >
                       <ChevronLeft size={16} /> <span className="text-xs font-bold hidden md:inline">PREV</span>
                   </button>
                   
                   <span className="text-[10px] font-mono text-stone-500">{(currentChapterIndex + 1)} / {chapters.length}</span>
                   
                   <button 
                     onClick={() => { if(currentChapterIndex < chapters.length - 1) { setCurrentChapterIndex(c => c + 1); window.scrollTo(0,0); } }}
                     disabled={currentChapterIndex === chapters.length - 1}
                     className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === chapters.length - 1 ? 'opacity-0' : 'hover:bg-amber-600/10 text-stone-500 hover:text-amber-600'}`}
                   >
                       <span className="text-xs font-bold hidden md:inline">NEXT</span> <ChevronRight size={16} />
                   </button>
               </div>
           </footer>
       )}
    </div>
  );
};

// --- MAIN CONTROLLER ---
export default function TheLegacyReader() {
  const [view, setView] = useState('landing');
  const [lang, setLang] = useState('en'); 
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      {view === 'landing' && (
        <LandingPortal 
          lang={lang}
          setLang={setLang}
          onEnterSeries={() => setView('library')}
          onEnterProfile={() => setView('profile')} 
          onEnterAudio={() => setView('audio')}     
          onEnterReviews={() => setView('reviews')} 
        />
      )}

      {view === 'library' && (
        <LibraryGrid 
            lang={lang} 
            onSelectBook={(book) => { setSelectedBook(book); setView('reader'); }} 
            onBack={() => setView('landing')} 
        />
      )}

      {view === 'reader' && selectedBook && (
        <ReaderView 
            lang={lang}
            bookData={selectedBook}
            onBack={() => setView('library')}
        />
      )}

      {(view === 'profile' || view === 'audio' || view === 'reviews') && (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-stone-500">
            <h2 className="text-2xl font-serif text-amber-600 mb-4">{TRANSLATIONS[lang].comingSoon}</h2>
            <button onClick={() => setView('landing')} className="text-xs font-mono hover:text-white border border-stone-800 px-4 py-2 rounded-full">RETURN HOME</button>
        </div>
      )}
    </>
  );
}