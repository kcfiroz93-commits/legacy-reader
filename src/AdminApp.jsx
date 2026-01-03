import React, { useState, useEffect } from "react";
import { marked } from "marked";

// ============== UI SHELL ==============
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 16px",
      marginRight: 10,
      borderRadius: 10,
      border: active ? "1px solid #d4af37" : "1px solid #333",
      background: active ? "#111" : "#000",
      color: active ? "#d4af37" : "white",
      cursor: "pointer"
    }}
  >
    {children}
  </button>
);

// ============== MAIN APP ==============
function AdminApp() {

  // --------------- Auth ---------------
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("key");
    if (key === "legacyroot") setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div style={{ background: "black", color: "white", height: "100vh", display: "grid", placeItems: "center" }}>
        <h2>404 — Not Found</h2>
      </div>
    );
  }

  // --------------- Tabs ---------------
  const [tab, setTab] = useState("dashboard");

  // --------------- Data Stores ---------------
  const [audioList, setAudioList] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Books
  const [bookId, setBookId] = useState(0);
  const [language, setLanguage] = useState("en");
  const [markdown, setMarkdown] = useState("");

  // --------------- Load json on mount ---------------
  useEffect(() => {
    fetch("/data/audio.json").then(r => r.json()).then(setAudioList).catch(() => setAudioList([]));
    fetch("/data/reviews.json").then(r => r.json()).then(setReviews).catch(() => setReviews([]));
  }, []);

  // --------------- BOOKS ---------------
  const loadBook = async () => {
    const file =
      language === "ml"
        ? `/book-${bookId}-ml.md`
        : `/book-${bookId}.md`;

    try {
      const txt = await (await fetch(file)).text();
      setMarkdown(txt);
    } catch {
      setMarkdown("# New Book");
    }
  };

  const downloadBook = () => {
    const filename =
      language === "ml"
        ? `book-${bookId}-ml.md`
        : `book-${bookId}.md`;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  // --------------- AUDIO ---------------
  const addAudioTrack = () => {
    const id = prompt("Book ID?");
    if (!id) return;
    const title = prompt("Audio Title?");
    setAudioList([...audioList, { id: Number(id), title }]);
  };

  // --------------- REVIEWS ---------------
  const addReview = () => {
    const name = prompt("Reviewer name");
    const role = prompt("Role");
    const type = prompt("Type: text / image / audio / video");

    if (type === "text") {
      const content = prompt("Enter text review");
      setReviews([...reviews, { id: Date.now(), name, role, type, content }]);
    }

    if (type === "image") {
      const image = prompt("File name e.g., review_1.png");
      setReviews([...reviews, { id: Date.now(), name, role, type, image }]);
    }

    if (type === "audio") {
      const audio = prompt("File name e.g., audio-review-1.mp3");
      setReviews([...reviews, { id: Date.now(), name, role, type, audio }]);
    }

    if (type === "video") {
      const videoUrl = prompt("Paste video link");
      setReviews([...reviews, { id: Date.now(), name, role, type, videoUrl }]);
    }
  };

  const downloadJSON = (obj, name) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  };

  // --------------- STYLE ---------------
  const card = {
    background: "#0A0A0A",
    border: "1px solid #222",
    padding: 20,
    marginTop: 18,
    borderRadius: 14
  };

  const gold = "#d4af37";

  return (
    <div style={{ background: "black", minHeight: "100vh", color: "white", padding: 20 }}>
      <h1 style={{ color: gold }}>LEGACY OS — ADMIN DASHBOARD</h1>

      {/* TABS */}
      <div style={{ marginTop: 10 }}>
        <TabButton active={tab === "dashboard"} onClick={() => setTab("dashboard")}>Dashboard</TabButton>
        <TabButton active={tab === "books"} onClick={() => setTab("books")}>Books</TabButton>
        <TabButton active={tab === "audio"} onClick={() => setTab("audio")}>Audio</TabButton>
        <TabButton active={tab === "reviews"} onClick={() => setTab("reviews")}>Reviews</TabButton>
        <TabButton active={tab === "upload"} onClick={() => setTab("upload")}>Upload Assistant</TabButton>
      </div>

      {/* ================= DASHBOARD ================= */}
      {tab === "dashboard" && (
        <div style={card}>
          <h2 style={{ color: gold }}>Welcome, Administrator</h2>
          <p>You can manage the ENTIRE Legacy OS content from here without touching code.</p>

          <ul>
            <li>Write books → Download markdown → push</li>
            <li>Manage audio tracks</li>
            <li>Manage reviews</li>
            <li>Ensure filenames are correct before upload</li>
          </ul>
        </div>
      )}

      {/* ================= BOOKS ================= */}
      {tab === "books" && (
        <div style={card}>
          <h2 style={{ color: gold }}>📚 Book Editor with Live Preview</h2>

          <div>
            Book ID:
            <input value={bookId} onChange={e => setBookId(e.target.value)} style={{ width: 60, marginLeft: 6 }} />

            Language:
            <select value={language} onChange={e => setLanguage(e.target.value)} style={{ marginLeft: 6 }}>
              <option value="en">English</option>
              <option value="ml">Malayalam</option>
            </select>

            <button onClick={loadBook} style={{ marginLeft: 8 }}>Load</button>
            <button onClick={downloadBook} style={{ marginLeft: 8, color: gold }}>Download</button>
          </div>

          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            style={{ width: "100%", height: 260, marginTop: 10, background: "#111", color: "white" }}
          />

          <div style={{ marginTop: 10, padding: 10, background: "#0f0f0f" }}>
            <div style={{ color: gold }}>Live Preview</div>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown || "") }} />
          </div>
        </div>
      )}

      {/* ================= AUDIO ================= */}
      {tab === "audio" && (
        <div style={card}>
          <h2 style={{ color: gold }}>🎧 Audio Manager</h2>

          <button onClick={addAudioTrack}>Add Track</button>
          <button onClick={() => downloadJSON(audioList, "audio.json")} style={{ marginLeft: 10 }}>
            Download audio.json
          </button>

          <pre style={{ marginTop: 10 }}>{JSON.stringify(audioList, null, 2)}</pre>

          <p>
            Audio files go in <span style={{ color: gold }}>/public/audio/</span><br />
            Naming: <b>audio-0-en.mp3, audio-3-ml.mp3</b>
          </p>
        </div>
      )}

      {/* ================= REVIEWS ================= */}
      {tab === "reviews" && (
        <div style={card}>
          <h2 style={{ color: gold }}>⭐ Review Manager</h2>

          <button onClick={addReview}>Add Review</button>
          <button onClick={() => downloadJSON(reviews, "reviews.json")} style={{ marginLeft: 10 }}>
            Download reviews.json
          </button>

          <pre style={{ marginTop: 10 }}>{JSON.stringify(reviews, null, 2)}</pre>

          <p>
            Image reviews → <span style={{ color: gold }}>/public/reviews/images/</span><br />
            Audio reviews → <span style={{ color: gold }}>/public/reviews/audio/</span>
          </p>
        </div>
      )}

      {/* ================= UPLOAD ASSISTANT ================= */}
      {tab === "upload" && (
        <div style={card}>
          <h2 style={{ color: gold }}>🖼 Upload & Naming Assistant</h2>

          <ul>
            <li>Books → book-0.md / book-0-ml.md</li>
            <li>Covers → cover-0.png</li>
            <li>Audio EN → audio-0-en.mp3</li>
            <li>Audio ML → audio-0-ml.mp3</li>
            <li>Review image → review_1.png</li>
            <li>Review audio → audio-review-1.mp3</li>
          </ul>

          <p style={{ opacity: 0.8 }}>
            This admin does NOT upload directly — it prepares files correctly so your Git workflow stays safe and clean.
          </p>
        </div>
      )}

    </div>
  );
}

export default AdminApp;
