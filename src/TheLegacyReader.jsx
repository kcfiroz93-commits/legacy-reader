// FINAL STABLE CORE – The Legacy OS Reader
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Moon, Sun, Menu, X, Type, ChevronLeft, ChevronRight, Smartphone, Globe,
  Download, ExternalLink, ArrowLeft, BookOpen, User, Maximize, Minimize,
  Search, Clock, Share, FileText, Mic, MessageSquare, Star, Play, Pause,
  SkipForward, SkipBack, Volume2, Table, Headphones, Gauge
} from "lucide-react";

/* ============================================================================
   CONFIGURATION
   ==========================================================================*/

const CONFIG = {
  author: "Advocate Firoz KC",
  logoPath: "/icon-v2.png",

  seriesCover: "/cover.png",
  profileCover: "/cover1.png",
  audioCover: "/cover-audio.png",
  reviewsCover: "/cover-reviews.png",

  audioDataPath: "/data/audio.json",
  reviewsDataPath: "/data/reviews.json",

  library: [
    { id: 0, title: "Micro Book 0", subtitle: "The Legacy OS", cover: "/cover-0.png", section: "master_launch" },
    { id: 1, title: "Micro Book 1", subtitle: "10% Destiny 90% Creation", cover: "/cover-1.png", section: "phase_1" },
    { id: 2, title: "Micro Book 2", subtitle: "Age 33 Reset", cover: "/cover-2.png", section: "phase_1" },
    { id: 3, title: "Micro Book 3", subtitle: "The Blueprint", cover: "/cover-3.png", section: "phase_1" },
    { id: 4, title: "Micro Book 4", subtitle: "Emotional Governance", cover: "/cover-4.png", section: "phase_1" }
  ],

  translations: {
    en: {
      home: "HOME",
      index: "INDEX",
      read: "READ",
      listen: "LISTEN",
      contentMissing: "Content not available",
      originalNote: "Malayalam edition coming soon. Showing English version temporarily."
    },
    ml: {
      home: "ഹോം",
      index: "സൂചിക",
      read: "വായിക്കുക",
      listen: "കേൾക്കുക",
      contentMissing: "ഉള്ളടക്കം ലഭ്യമല്ല",
      originalNote: "മലയാളം പതിപ്പ് തയ്യാറാക്കുന്നു. താൽക്കാലികമായി ഇംഗ്ലീഷ് പതിപ്പ് പ്രദർശിപ്പിക്കുന്നു."
    }
  }
};

/* ============================================================================
   UTILS
   ==========================================================================*/

const calculateReadingTime = (text) => {
  const wpm = 200;
  const words = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wpm);
};

const parseMarkdown = (text) => {
  if (!text) return [];
  const parts = text.split(/(?=^#{1,3}\s+)/gm);
  const chapters = [];

  parts.forEach((part) => {
    const match = part.match(/^(#{1,3})\s+(.+)$/m);
    if (!match) return;

    const title = match[2].trim();
    const raw = part.replace(/^(#{1,3})\s+(.+)$/m, "").trim();
    if (!raw) return;

    const html = raw
      .split(/\n\s*\n/)
      .map((p) => `<p>${p}</p>`)
      .join("");

    chapters.push({
      id: chapters.length,
      title,
      subtitle: `Section ${chapters.length + 1}`,
      content: html
    });
  });

  return chapters;
};

/* ============================================================================
   AUDIO PLAYER VIEW
   ==========================================================================*/

const AudioPlayerView = ({ bookData, onBack, language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef(null);

  const audioFile = `/audio-${bookData.id}-${language}.mp3`;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <button onClick={onBack} className="absolute top-6 left-6">
        <ArrowLeft />
      </button>

      <audio
        ref={audioRef}
        src={audioFile}
        onError={() => setError(true)}
        controls
        autoPlay
      />

      {error && (
        <div>Audio not found: {audioFile}</div>
      )}
    </div>
  );
};

/* ============================================================================
   READER VIEW
   ==========================================================================*/

const ReaderView = ({ bookData, onBack, language, onProgressUpdate }) => {
  const [chapters, setChapters] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const load = async () => {
      const base = `/book-${bookData.id}`;
      let res = await fetch(`${base}-${language}.md`);

      if (!res.ok) res = await fetch(`${base}-en.md`);
      if (!res.ok) return;

      const txt = await res.text();
      const parsed = parseMarkdown(txt);
      setChapters(parsed);
    };
    load();
  }, [bookData, language]);

  useEffect(() => {
    if (chapters.length)
      onProgressUpdate(bookData.id, current, chapters.length);
  }, [current, chapters]);

  const chapter = chapters[current] || {};

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button onClick={onBack}><ArrowLeft /></button>

      <h2>{chapter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: chapter.content }} />

      <button disabled={current === 0} onClick={() => setCurrent(c => c - 1)}>Prev</button>
      <button disabled={current === chapters.length - 1} onClick={() => setCurrent(c => c + 1)}>Next</button>
    </div>
  );
};

/* ============================================================================
   MAIN CONTROLLER
   ==========================================================================*/

export default function TheLegacyReader() {
  const [view, setView] = useState("landing");
  const [selectedBook, setSelectedBook] = useState(null);
  const [lang, setLang] = useState("en");
  const [progress, setProgress] = useState({});

  const updateProgress = (bookId, current, total) => {
    const next = { ...progress, [bookId]: { current, total, ts: Date.now() } };
    setProgress(next);
    localStorage.setItem("legacy_os_progress", JSON.stringify(next));
  };

  return (
    <>
      {view === "landing" && (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <button onClick={() => setView("gallery")}>ENTER SERIES</button>
        </div>
      )}

      {view === "gallery" && (
        <div className="p-6">
          {CONFIG.library.map(b => (
            <button key={b.id} onClick={() => { setSelectedBook(b); setView("reader"); }}>
              {b.title}
            </button>
          ))}
        </div>
      )}

      {view === "reader" && selectedBook && (
        <ReaderView
          bookData={selectedBook}
          onBack={() => setView("gallery")}
          language={lang}
          onProgressUpdate={updateProgress}
        />
      )}

      {view === "audio_player" && selectedBook && (
        <AudioPlayerView
          bookData={selectedBook}
          onBack={() => setView("gallery")}
          language={lang}
        />
      )}
    </>
  );
}
