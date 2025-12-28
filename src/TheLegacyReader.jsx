import React, { useState, useEffect, useRef } from 'react';
import { Book, Moon, Sun, Settings, ChevronLeft, ChevronRight, Menu, X, Share2, Type } from 'lucide-react';

/**
 * THE LEGACY OS - EBOOK READER
 * * Design Principles:
 * - Distraction-free
 * - Typography-first (Merriweather for body, Inter for UI)
 * - Chapter-based navigation
 * - Dark/Light mode alignment with "Legacy" branding
 */

/* ==================================================================================
   ⬇️ AUTHOR CONTENT ZONE - EDIT YOUR BOOK HERE ⬇️
   ================================================================================== */

const BOOK_DATA = {
  title: "THE LEGACY OS",
  subtitle: "Rebooting the Human Operating System",
  author: "Architect",
  // Ensure your cover image is in the 'public' folder of your project
  coverImage: "cover.jpg", 
  
  chapters: [
    {
      id: 1,
      title: "The System Reset",
      subtitle: "Chapter I",
      content: `
        <p>The screen of the modern mind is cluttered. We wake up to notifications, we sleep to the blue light of infinite scrolls, and in between, we process terabytes of noise that we mistake for information. It is time for a hard reset.</p>
        <p>To build a legacy is not to add more, but to subtract the unessential. It is the art of deletion. Just as an operating system accumulates cache files, error logs, and bloatware over time, our lives accumulate habits and commitments that no longer serve the kernel—our core purpose.</p>
        <p>This book is not a manual for adding new apps to your life. It is a guide to formatting the drive. It is about identifying the source code of your character and rewriting the corrupted lines that have led to crashes, freezes, and performance throttles.</p>
        <p>We begin not by doing, but by stopping. The first command in The Legacy OS is not 'Run', but 'Pause'.</p>
      `
    },
    {
      id: 2,
      title: "Kernel of Truth",
      subtitle: "Chapter II",
      content: `
        <p>Deep beneath the user interface of your personality lies the kernel. In computing, the kernel is the core program that manages everything else. If the kernel is unstable, no application can run smoothly.</p>
        <p>Most people spend their lives tweaking the UI. They buy new clothes, change jobs, or seek status signals. These are cosmetic updates. They look good on the surface, but the system still lags. Why? Because the kernel remains untouched.</p>
        <p>Your kernel consists of your fundamental axioms—the truths you hold to be self-evident. If you believe the world is hostile, your system runs defense protocols that drain your battery. If you believe you are insufficient, your system constantly searches for external validation updates that never complete.</p>
        <p>We must access the root directory. We must look at the raw code of your beliefs. This process is dangerous. It requires administrator privileges that you may have surrendered to society, parents, or fear.</p>
      `
    },
    {
      id: 3,
      title: "The Architecture of Silence",
      subtitle: "Chapter III",
      content: `
        <p>Silence is not the absence of sound. It is the presence of clarity. In a world screaming for attention, silence is the ultimate luxury, the ultimate rebellion.</p>
        <p>The Legacy OS thrives in silence. It is in the quiet moments that the system optimizes itself. We will build an architecture of silence around your daily routine. Not an escape, but a fortress.</p>
        <p>Imagine a room with nothing in it but a chair and a window. This is the mental space we are constructing. A place where you can process data without interference. A place where the signal-to-noise ratio is infinite.</p>
      `
    }
    // 💡 COPY & PASTE A BLOCK ABOVE TO ADD CHAPTER 4 HERE
  ]
};

/* ==================================================================================
   ⬆️ END OF CONTENT ZONE ⬆️
   ================================================================================== */


// --- COMPONENTS ---

const CoverPage = ({ onStart }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-stone-200 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-zinc-950 to-zinc-950"></div>
      <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </div>

    <div className="z-10 text-center px-6 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="w-24 h-24 mx-auto border-2 border-amber-600/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(217,119,6,0.2)]">
        <span className="text-4xl font-serif text-amber-500">L</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-serif tracking-tight font-bold text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-500">
        {BOOK_DATA.title}
      </h1>
      
      <p className="text-lg md:text-xl text-amber-600/80 font-mono tracking-widest uppercase">
        {BOOK_DATA.subtitle}
      </p>

      <div className="w-16 h-1 bg-amber-700/50 mx-auto my-8"></div>

      <p className="text-stone-500 font-sans tracking-wide text-sm">
        BY {BOOK_DATA.author.toUpperCase()}
      </p>

      <button 
        onClick={onStart}
        className="mt-12 group relative px-8 py-4 bg-transparent border border-stone-700 hover:border-amber-600 text-stone-300 transition-all duration-500 ease-out overflow-hidden"
      >
        <span className="absolute inset-0 w-full h-full bg-amber-900/10 group-hover:bg-amber-900/20 transition-all duration-500 transform translate-y-full group-hover:translate-y-0"></span>
        <span className="relative font-mono tracking-widest text-sm group-hover:text-amber-500">INITIALIZE READING SEQUENCE</span>
      </button>
    </div>
    
    <div className="absolute bottom-8 text-stone-700 text-xs font-mono">
      v1.0.4 SYSTEM READY
    </div>
  </div>
);

const ProgressBar = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
    <div 
      className="h-full bg-amber-600 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(217,119,6,0.5)]"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const TableOfContents = ({ chapters, activeChapter, onSelect, onClose }) => (
  <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fade-in">
    <button onClick={onClose} className="absolute top-6 right-6 text-stone-400 hover:text-white">
      <X size={32} strokeWidth={1} />
    </button>
    
    <h2 className="text-2xl font-serif text-amber-600 mb-12 tracking-wider">TABLE OF CONTENTS</h2>
    
    <nav className="space-y-6 w-full max-w-md text-center">
      {chapters.map((chapter, index) => (
        <button
          key={chapter.id}
          onClick={() => onSelect(index)}
          className={`w-full py-4 text-lg md:text-xl font-serif transition-colors duration-300 border-b border-stone-800/50 ${
            activeChapter === index 
              ? 'text-white' 
              : 'text-stone-500 hover:text-stone-300'
          }`}
        >
          <span className="block text-xs font-mono text-amber-700 mb-1 uppercase tracking-widest">{chapter.subtitle}</span>
          {chapter.title}
        </button>
      ))}
    </nav>
  </div>
);

const Controls = ({ theme, toggleTheme, fontSize, setFontSize }) => (
  <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xl rounded-sm p-4 w-64 animate-slide-up z-50">
    <div className="space-y-6">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-sans uppercase tracking-wider text-stone-500 dark:text-stone-400">Theme</span>
        <div className="flex bg-stone-100 dark:bg-zinc-800 rounded-full p-1">
          <button 
            onClick={() => theme === 'dark' && toggleTheme()}
            className={`p-2 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-amber-600' : 'text-stone-400'}`}
          >
            <Sun size={16} />
          </button>
          <button 
            onClick={() => theme === 'light' && toggleTheme()}
            className={`p-2 rounded-full transition-all ${theme === 'dark' ? 'bg-zinc-700 shadow-sm text-amber-400' : 'text-stone-400'}`}
          >
            <Moon size={16} />
          </button>
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-stone-500 dark:text-stone-400">
          <span className="text-xs font-sans uppercase tracking-wider">Size</span>
          <span className="text-xs font-mono">{fontSize}px</span>
        </div>
        <input 
          type="range" 
          min="16" 
          max="24" 
          value={fontSize} 
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="w-full h-1 bg-stone-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
        />
        <div className="flex justify-between text-stone-400 text-xs font-serif">
          <span>Aa</span>
          <span className="text-lg">Aa</span>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

export default function TheLegacyReader() {
  const [view, setView] = useState('cover'); // cover, reader
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(19);
  const [showControls, setShowControls] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'reader') return;
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const scrollPercentage = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      
      // Calculate total book progress:
      // Each chapter is roughly 1 segment. 
      // This is a simplified "per chapter" progress for the bar, but you could normalize it across all chapters.
      const chapterBase = (currentChapterIndex / BOOK_DATA.chapters.length) * 100;
      const chapterProgress = (scrollPercentage / BOOK_DATA.chapters.length);
      
      setProgress(chapterBase + chapterProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view, currentChapterIndex]);

  // Toggle Dark Mode on HTML element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const nextChapter = () => {
    if (currentChapterIndex < BOOK_DATA.chapters.length - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const currentChapter = BOOK_DATA.chapters[currentChapterIndex];

  // Fonts injection
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  if (view === 'cover') {
    return <CoverPage onStart={() => setView('reader')} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900 text-stone-300' : 'bg-stone-50 text-stone-800'}`}>
      
      {/* Top Progress Bar */}
      <ProgressBar progress={progress} />

      {/* Navigation Header */}
      <header className={`fixed top-0 w-full z-30 transition-all duration-300 border-b backdrop-blur-md ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-stone-200'}`}>
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setShowTOC(true)} className="p-2 -ml-2 hover:text-amber-600 transition-colors">
            <Menu size={20} />
          </button>
          
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setShowTOC(true)}>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 opacity-80">
              {BOOK_DATA.title}
            </span>
            <span className={`text-xs font-serif ${theme === 'dark' ? 'text-stone-400' : 'text-stone-500'}`}>
              {currentChapter.subtitle}
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowControls(!showControls)}
              className={`p-2 -mr-2 transition-colors ${showControls ? 'text-amber-600' : 'hover:text-amber-600'}`}
            >
              <Type size={20} />
            </button>
            {showControls && (
              <Controls 
                theme={theme} 
                toggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                fontSize={fontSize}
                setFontSize={setFontSize}
              />
            )}
          </div>
        </div>
      </header>

      {/* Main Reader Content */}
      <main className="max-w-2xl mx-auto px-6 pt-32 pb-32">
        <article className="animate-fade-in">
          <header className="mb-12 text-center">
            <span className="block text-amber-600 font-mono text-sm tracking-widest mb-4 uppercase">
              {currentChapter.subtitle}
            </span>
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-8 ${theme === 'dark' ? 'text-stone-100' : 'text-stone-900'}`}>
              {currentChapter.title}
            </h2>
            <div className="w-12 h-1 bg-stone-300 dark:bg-stone-700 mx-auto"></div>
          </header>

          <div 
            className="prose dark:prose-invert prose-lg md:prose-xl mx-auto font-serif leading-relaxed"
            style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
          >
            {/* Using dangerouslySetInnerHTML for mock content structure */}
            <div dangerouslySetInnerHTML={{ __html: currentChapter.content }} />
          </div>

          <div className="mt-16 flex items-center justify-center space-x-2 text-amber-600 opacity-60">
            <span>•</span><span>•</span><span>•</span>
          </div>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className={`fixed bottom-0 w-full z-30 border-t backdrop-blur-md transition-colors ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-stone-200'}`}>
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={prevChapter}
            disabled={currentChapterIndex === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === 0 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}
          >
            <ChevronLeft size={16} />
            <span className="text-sm font-sans font-medium hidden md:inline">Previous</span>
          </button>

          <span className="text-xs font-mono text-stone-500">
             {(currentChapterIndex + 1)} / {BOOK_DATA.chapters.length}
          </span>

          <button 
            onClick={nextChapter}
            disabled={currentChapterIndex === BOOK_DATA.chapters.length - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === BOOK_DATA.chapters.length - 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}
          >
            <span className="text-sm font-sans font-medium hidden md:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>

      {/* Overlays */}
      {showTOC && (
        <TableOfContents 
          chapters={BOOK_DATA.chapters} 
          activeChapter={currentChapterIndex} 
          onSelect={(idx) => { setCurrentChapterIndex(idx); setShowTOC(false); window.scrollTo(0,0); }}
          onClose={() => setShowTOC(false)}
        />
      )}

      {/* CSS for custom scrollbar and animations */}
      <style>{`
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        ::selection {
          background: #d97706; /* amber-600 */
          color: white;
        }
        .prose p {
          margin-bottom: 1.5em;
          text-align: left;
        }
        /* Hide scrollbar for clean look but allow functionality */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(120, 113, 108, 0.2);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(120, 113, 108, 0.4);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
}