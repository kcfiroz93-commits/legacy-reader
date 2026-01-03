import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function AdminApp() {

  const [authorized, setAuthorized] = useState(false);
  const [books, setBooks] = useState({});
  const [reviews, setReviews] = useState([]);
  const [audio, setAudio] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");

    // Simple hidden gate - In a real app, use proper auth!
    if (key === "legacyroot") {
      setAuthorized(true);
    }
  }, []);

  useEffect(() => {
    if (!authorized) return;

    // preload data
    fetch("/data/reviews.json")
      .then(r => r.json())
      .then(setReviews)
      .catch(() => setReviews([]));

    fetch("/data/audio.json")
      .then(r => r.json())
      .then(setAudio)
      .catch(() => setAudio([]));
  }, [authorized]);


  if (!authorized) {
    return (
      <div style={{padding: "40px", textAlign: "center", color: "#666", fontFamily: "monospace"}}>
        <h1>401</h1>
        <p>Access Denied</p>
      </div>
    );
  }

  return (
    <div style={{padding: "40px", fontFamily: "monospace", maxWidth: "800px", margin: "0 auto"}}>
      <h1 style={{color: "#d97706"}}>LEGACY OS — ADMIN DASHBOARD</h1>
      <p style={{color: "#666", borderBottom: "1px solid #333", paddingBottom: "20px"}}>
        Status: <span style={{color: "#10b981"}}>Online</span> | Key: Verified
      </p>

      {/* ---------------- BOOKS ---------------- */}
      <section style={{marginTop: "40px"}}>
        <h2 style={{fontSize: "1.2rem", marginBottom: "10px"}}>📚 Books (Content)</h2>
        <div style={{background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #333"}}>
            <p style={{marginBottom: "15px", fontSize: "0.9rem", color: "#999"}}>
                Content is managed via Markdown files in <code>/public</code>.
            </p>
            <div style={{display: "flex", gap: "10px", flexWrap: "wrap"}}>
                <button
                    style={btnStyle}
                    onClick={() => window.open("/book-0.md", "_blank")}
                >
                    View Book 0 (EN)
                </button>
                <button
                    style={btnStyle}
                    onClick={() => window.open("/book-1.md", "_blank")}
                >
                    View Book 1 (EN)
                </button>
            </div>
        </div>
      </section>

      {/* ---------------- AUDIO ---------------- */}
      <section style={{marginTop: "40px"}}>
        <h2 style={{fontSize: "1.2rem", marginBottom: "10px"}}>🎧 Audio Tracks</h2>
        <div style={{background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #333"}}>
            <textarea 
                style={textAreaStyle}
                value={JSON.stringify(audio, null, 2)}
                onChange={(e) => {
                    try {
                        setAudio(JSON.parse(e.target.value));
                    } catch(err) {
                        // ignore parse error while typing
                    }
                }}
            />
            <div style={{marginTop: "10px", display: "flex", justifyContent: "flex-end"}}>
                <button
                style={actionBtnStyle}
                onClick={() => downloadJSON(audio, "audio.json")}
                >
                Download updated audio.json
                </button>
            </div>
        </div>
      </section>

      {/* ---------------- REVIEWS ---------------- */}
      <section style={{marginTop: "40px"}}>
        <h2 style={{fontSize: "1.2rem", marginBottom: "10px"}}>⭐ Reviews</h2>
        <div style={{background: "#111", padding: "20px", borderRadius: "8px", border: "1px solid #333"}}>
            <textarea 
                style={textAreaStyle}
                value={JSON.stringify(reviews, null, 2)}
                onChange={(e) => {
                    try {
                        setReviews(JSON.parse(e.target.value));
                    } catch(err) {
                        // ignore
                    }
                }}
            />
            <div style={{marginTop: "10px", display: "flex", justifyContent: "flex-end"}}>
                <button
                style={actionBtnStyle}
                onClick={() => downloadJSON(reviews, "reviews.json")}
                >
                Download updated reviews.json
                </button>
            </div>
        </div>
      </section>

    </div>
  );
}

// --- Styles ---
const btnStyle = {
    background: "#222",
    color: "#fff",
    border: "1px solid #444",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem"
};

const actionBtnStyle = {
    ...btnStyle,
    background: "#d97706",
    color: "#000",
    fontWeight: "bold",
    border: "none"
};

const textAreaStyle = {
    width: "100%",
    height: "200px",
    background: "#000",
    color: "#0f0",
    border: "1px solid #333",
    padding: "10px",
    fontFamily: "monospace",
    fontSize: "0.85rem",
    borderRadius: "4px"
};

// --- Utils ---
const downloadJSON = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
};

const root = ReactDOM.createRoot(document.getElementById("admin-root"));
root.render(<AdminApp />);