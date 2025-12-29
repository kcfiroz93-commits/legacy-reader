import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, Menu, X, Type, ChevronLeft, ChevronRight, Smartphone, Globe, Download, ExternalLink, ArrowLeft, BookOpen, User, Maximize, Minimize, Search, Clock } from 'lucide-react';

/* ==================================================================================
   ⬇️ CONFIGURATION ZONE ⬇️
   ================================================================================== */

const CONFIG = {
  author: "KC FIROZ", 
  logoPath: "/icon-v2.png",   
  
  // LANDING PAGE IMAGES
  seriesCover: "/cover.png",   
  profileCover: "/cover1.png", 

  // EXTERNAL LINKS
  authorWebsite: "https://author.kc-capitals.com",
  profilePdfPath: "/profile.pdf",

  // MICRO BOOK DEFINITIONS
  library: [
    { id: 0, title: "Micro Book 0", subtitle: "The Legacy OS (Master Map)", file: "/book-0.md", cover: "/cover-0.png" }, 
    { id: 1, title: "Micro Book 1", subtitle: "10% Destiny, 90% Creation", file: "/book-1.md", cover: "/cover-1.png" },
    { id: 2, title: "Micro Book 2", subtitle: "The Age 33 Reset", file: "/book-2.md", cover: "/cover-2.png" },
    { id: 3, title: "Micro Book 3", subtitle: "The Blueprint", file: "/book-3.md", cover: "/cover-3.png" },
    { id: 4, title: "Micro Book 4", subtitle: "Emotional Governance", file: "/book-4.md", cover: "/cover-4.png" },
    { id: 5, title: "Micro Book 5", subtitle: "Legal Clarity Framework", file: "/book-5.md", cover: "/cover-5.png" },
    { id: 6, title: "Micro Book 6", subtitle: "The Wealth Kernel 1.0", file: "/book-6.md", cover: "/cover-6.png" },
    { id: 7, title: "Micro Book 7", subtitle: "The Family Constitution", file: "/book-7.md", cover: "/cover-7.png" },
    { id: 8, title: "Micro Book 8", subtitle: "The Trauma Alchemy Manual", file: "/book-8.md", cover: "/cover-8.png" },
    { id: 9, title: "Micro Book 9", subtitle: "The 90-Day OS Upgrade", file: "/book-9.md", cover: "/cover-9.png" },
    { id: 10, title: "Micro Book 10", subtitle: "The Generational OS", file: "/book-10.md", cover: "/cover-10.png" },
    { id: 11, title: "Micro Book 11", subtitle: "The Firewall", file: "/book-11.md", cover: "/cover-11.png" },
    { id: 12, title: "Micro Book 12", subtitle: "My Legacy", file: "/book-12.md", cover: "/cover-12.png" },
  ]
};

// --- UTILS ---
const calculateReadingTime = (text) => {
  const wordsPerMinute = 200;
  const words = text.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// --- MARKDOWN PARSER ENGINE V2.0 ---
const parseMarkdown = (text) => {
  if (!text) return [];
  const parts = text.split(/^#{1,3}\s+(.+)$/gm);
  const chapters = [];
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const rawContent = parts[i + 1];
    if (!title || !rawContent) continue;
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
        if (p.startsWith('> ')) return `<blockquote class="border-l-2 border-amber-600 pl-4 italic text-stone-400 my-6">${p.replace(/^> /, '')}</blockquote>`;
        if (p === '---' || p === '***') return `<hr class="border-stone-800 my-8 opacity-50" />`;
        p = p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-stone-200 font-bold">$1</strong>');
        p = p.replace(/\*(.*?)\*/g, '<em class="text-amber-600/80">$1</em>');
        if (p.startsWith('- ') || p.startsWith('* ')) {
             const items = p.split('\n').map(item => `<li class="ml-4 list-disc text-stone-400">${item.replace(/^[-*] /, '')}</li>`).join('');
             return `<ul class="space-y-2 my-4">${items}</ul>`;
        }
        return `<p>${p}</p>`;
      }).join('');
    chapters.push({ id: i, title: title, subtitle: `SECTION ${chapters.length + 1}`, content: htmlContent });
  }
  return chapters;
};

// --- SUB-COMPONENTS ---

// 1. LANDING PORTAL
const LandingPortal = ({ onEnterSeries, onEnterProfile }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-zinc-950 to-zinc-950 z-0"></div>
    
    <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center animate-fade-in">
      <div className="mb-12 text-center space-y-4">
        <img src={CONFIG.logoPath} alt="Logo" className="w-20 h-20 mx-auto object-contain opacity-80 mb-6" />
        <h1 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-stone-100 to-stone-500 tracking-tight">
          EXPLORE THE LEGACY E-BOOK SERIES
        </h1>
        <div className="w-24 h-1 bg-amber-700/50 mx-auto rounded-full mt-6"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center items-center">
        <div onClick={onEnterSeries} className="group relative cursor-pointer w-full max-w-sm aspect-[3/4] bg-zinc-900 border border-stone-800 hover:border-amber-600/50 transition-all duration-500 rounded-sm overflow-hidden shadow-2xl hover:shadow-amber-900/20">
          <img src={CONFIG.seriesCover} alt="Series Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end justify-center pb-8">
            <span className="font-mono text-xs tracking-[0.2em] text-stone-400 group-hover:text-amber-500 transition-colors bg-black/50 px-4 py-2 backdrop-blur-md rounded-full border border-white/10">ENTER LIBRARY</span>
          </div>
        </div>

        <div onClick={onEnterProfile} className="group relative cursor-pointer w-full max-w-sm aspect-[3/4] bg-zinc-900 border border-stone-800 hover:border-amber-600/50 transition-all duration-500 rounded-sm overflow-hidden shadow-2xl hover:shadow-amber-900/20">
          <img src={CONFIG.profileCover} alt="Author Cover" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " flex items-center justify-center"; e.target.parentNode.innerHTML += `<div class="text-center p-6"><div class="text-4xl mb-4 text-stone-600">👤</div><div class="text-stone-500 font-serif">Upload cover1.png</div></div>`; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end justify-center pb-8">
            <span className="font-mono text-xs tracking-[0.2em] text-stone-400 group-hover:text-amber-500 transition-colors bg-black/50 px-4 py-2 backdrop-blur-md rounded-full border border-white/10">THE ARCHITECT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 2. LIBRARY GRID VIEW WITH PROGRESS
const LibraryGrid = ({ onSelectBook, onBack, progressData }) => (
  <div className="min-h-screen bg-zinc-950 text-stone-300 p-6 md:p-12 animate-fade-in">
    <button onClick={onBack} className="fixed top-6 left-6 z-50 flex items-center space-x-2 text-stone-500 hover:text-amber-500 transition-colors bg-black/50 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
      <ArrowLeft size={16} /> <span className="text-xs font-mono tracking-widest">HOME</span>
    </button>

    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-2xl font-serif text-amber-600 mb-2">The Legacy Series</h2>
      <p className="text-stone-500 font-mono text-xs tracking-wider mb-12">SYSTEM ARCHITECTURE</p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CONFIG.library.map((book) => {
          const bookProgress = progressData[book.id] || { current: 0, total: 1 };
          const percent = Math.round(((bookProgress.current + 1) / bookProgress.total) * 100);
          const isStarted = progressData[book.id] !== undefined;
          
          return (
            <button key={book.id} onClick={() => onSelectBook(book)} className="group flex flex-col text-left space-y-3 relative">
              <div className="aspect-[2/3] w-full bg-zinc-900 border border-stone-800 rounded-sm relative overflow-hidden group-hover:border-amber-600/50 transition-all shadow-lg group-hover:shadow-amber-900/10">
                <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" onError={(e) => { e.target.style.display='none'; e.target.parentNode.className += " bg-gradient-to-br from-zinc-800 to-black p-4 flex flex-col justify-between"; e.target.parentNode.innerHTML = `<div class="text-[10px] font-mono text-stone-500 border border-stone-700 w-fit px-2 py-1 rounded">${String(book.id).padStart(2, '0')}</div><div class="w-8 h-8 rounded-full border border-stone-600 mb-2 flex items-center justify-center text-stone-600">L</div>`; }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-amber-900/10 transition-colors"></div>
                {isStarted && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-stone-800">
                    <div className="h-full bg-amber-600 transition-all duration-500" style={{ width: `${percent}%` }}></div>
                  </div>
                )}
              </div>
              <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-stone-300 group-hover:text-white font-serif leading-tight">{book.title}</h3>
                    {isStarted && <span className="text-[9px] font-mono text-amber-600/80">{percent}%</span>}
                </div>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider mt-1 line-clamp-1">{book.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

// 3. PROFILE OPTIONS VIEW
const ProfileOptions = ({ onBack }) => (
  <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative">
    <button onClick={onBack} className="absolute top-6 left-6 text-stone-500 hover:text-white transition-colors"><X size={32} strokeWidth={1} /></button>
    <div className="max-w-md w-full space-y-8 animate-slide-up text-center">
      <div className="w-24 h-24 mx-auto bg-zinc-900 rounded-full border border-amber-600/30 flex items-center justify-center mb-8"><User size={40} className="text-amber-600" /></div>
      <h2 className="text-3xl font-serif text-stone-200">The Architect</h2>
      <p className="text-stone-500 text-sm leading-relaxed px-4">Access the professional profile or download the legacy dossier.</p>
      <div className="space-y-4 pt-8">
        <a href={CONFIG.authorWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full p-6 bg-zinc-900 border border-stone-800 hover:border-amber-600 hover:bg-zinc-800 transition-all rounded-sm group"><span className="font-mono text-sm tracking-widest text-stone-300 group-hover:text-amber-500">LEGACY ARCHITECT</span><ExternalLink size={18} className="text-stone-600 group-hover:text-amber-500" /></a>
        <a href={CONFIG.profilePdfPath} download className="flex items-center justify-between w-full p-6 bg-zinc-900 border border-stone-800 hover:border-amber-600 hover:bg-zinc-800 transition-all rounded-sm group"><span className="font-mono text-sm tracking-widest text-stone-300 group-hover:text-amber-500">DOWNLOAD PROFILE</span><Download size={18} className="text-stone-600 group-hover:text-amber-500" /></a>
      </div>
    </div>
  </div>
);

// 4. READER COMPONENT
const ReaderView = ({ bookData, onBack, initialProgress, onProgressUpdate }) => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(initialProgress || 0);
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(19);
  const [showControls, setShowControls] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [language, setLanguage] = useState('en');
  const [zenMode, setZenMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Load Content
  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        let filePath = bookData.file;
        if (language === 'ml') filePath = filePath.replace('.md', '-ml.md');
        
        // Add cache busting
        const fetchUrl = `${filePath}?t=${Date.now()}`;
        console.log(`Fetching: ${fetchUrl}`);

        const response = await fetch(fetchUrl);
        if (!response.ok) throw new Error(`Status: ${response.status}`); // Pass status code
        const text = await response.text();
        const parsed = parseMarkdown(text);
        if (parsed.length > 0) setChapters(parsed);
        else setChapters([{ id: 0, title: "Empty File", subtitle: "Warning", content: `<p>The file <strong>${filePath}</strong> was found but appears to be empty or has no '#' headers.</p>` }]);
      } catch (err) {
        let errorMessage = `<p>System could not load the book content.</p><p class="text-xs font-mono text-red-400 mt-4">Error details: ${err.message}</p>`;
        
        if (language === 'ml') {
             setChapters([{ id: 0, title: "Unavailable", subtitle: "Language", content: "<p>Malayalam version coming soon.</p>" }]);
        } else {
             // Specific error for English to help user debug
             setChapters([{ 
                 id: 0, 
                 title: "Content Missing", 
                 subtitle: "404 Error", 
                 content: `${errorMessage}<p class="mt-4">Please ensure you have uploaded a file named <strong>${bookData.file.replace('/', '')}</strong> to your 'public' folder.</p>` 
             }]);
        }
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [bookData, language]);

  // Update Progress
  useEffect(() => {
    if (chapters.length > 0) {
        onProgressUpdate(bookData.id, currentChapterIndex, chapters.length);
    }
  }, [currentChapterIndex, chapters, bookData.id]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [theme]);

  // Search Logic
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
                                <div className="flex items-center justify-between"><span className="text-xs font-sans uppercase text-stone-500">Lang</span><div className="flex bg-stone-100 dark:bg-zinc-800 rounded-full p-1"><button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded-full text-[10px] ${language === 'en' ? 'bg-white text-amber-600 shadow' : 'text-stone-400'}`}>EN</button><button onClick={() => setLanguage('ml')} className={`px-3 py-1 rounded-full text-[10px] ${language === 'ml' ? 'bg-zinc-700 text-amber-400 shadow' : 'text-stone-400'}`}>ML</button></div></div>
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

      {/* CONTENT */}
      <main className={`max-w-2xl mx-auto px-6 pb-32 transition-all duration-500 ${zenMode ? 'pt-20 cursor-text' : 'pt-32'}`}>
        <article className="animate-fade-in">
          {zenMode && (
              <button onClick={() => setZenMode(false)} className="fixed top-6 right-6 p-2 bg-black/20 hover:bg-black/50 text-stone-500 hover:text-white rounded-full transition-colors z-50">
                  <Minimize size={20} />
              </button>
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
            <button onClick={() => { if(currentChapterIndex < chapters.length - 1) { setCurrentChapterIndex(prev => prev + 1); window.scrollTo(0,0); } }} disabled={currentChapterIndex === chapters.length - 1} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${currentChapterIndex === chapters.length - 1 ? 'opacity-0 pointer-events-none' : 'hover:bg-stone-100 dark:hover:bg-zinc-800'}`}><span className="text-sm font-sans font-medium hidden md:inline">Next</span><ChevronRight size={16} /></button>
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

// --- MAIN CONTROLLER (THE BRAIN) ---
export default function TheLegacyReader() {
  const [view, setView] = useState('landing');
  const [selectedBook, setSelectedBook] = useState(null);
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('legacy_os_progress');
    if (saved) setProgressData(JSON.parse(saved));
  }, []);

  const updateProgress = (bookId, chapterIndex, totalChapters) => {
    const newProgress = { ...progressData, [bookId]: { current: chapterIndex, total: totalChapters, lastRead: Date.now() } };
    setProgressData(newProgress);
    localStorage.setItem('legacy_os_progress', JSON.stringify(newProgress));
  };

  const goHome = () => setView('landing');
  const goGallery = () => setView('gallery');
  const goProfile = () => setView('profile');
  const openBook = (book) => {
    setSelectedBook(book);
    setView('reader');
  };

  return (
    <>
      {view === 'landing' && <LandingPortal onEnterSeries={goGallery} onEnterProfile={goProfile} />}
      {view === 'gallery' && <LibraryGrid onSelectBook={openBook} onBack={goHome} progressData={progressData} />}
      {view === 'profile' && <ProfileOptions onBack={goHome} />}
      {view === 'reader' && selectedBook && (
        <ReaderView 
          bookData={selectedBook} 
          onBack={goGallery} 
          initialProgress={progressData[selectedBook.id]?.current || 0}
          onProgressUpdate={updateProgress}
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