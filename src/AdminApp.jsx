import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function AdminApp() {

  // ---------- ACCESS GATE ----------
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get("key");
    if (k === "legacyroot") setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <div style={{ color: "white", background: "black", height: "100vh", display: "grid", placeItems: "center" }}>
        <div>404 — Not Found</div>
      </div>
    );
  }

  // ---------- DATA MODELS ----------
  const [audioList, setAudioList] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [bookId, setBookId] = useState(0);
  const [lang, setLang] = useState("en");
  const [markdown, setMarkdown] = useState("");
  const [status, setStatus] = useState("");

  // ---------- LOAD DATA ----------
  useEffect(() => {
    fetch("/data/audio.json").then(r => r.json()).then(setAudioList).catch(() => setAudioList([]));
    fetch("/data/reviews.json").then(r => r.json()).then(setReviews).catch(() => setReviews([]));
  }, []);

  // ---------- LOAD BOOK ----------
  const loadBook = async () => {
    const path = lang === "ml" ? `/book-${bookId}-ml.md` : `/book-${bookId}.md`;
    try {
      const t = await (await fetch(path)).text();
      setMarkdown(t);
      setStatus("Loaded " + path);
    } catch {
      setMarkdown("# New book file");
      setStatus("File does not exist yet, starting new.");
    }
  };

  // ---------- DOWNLOAD BOOK ----------
  const downloadBook = () => {
    const f = lang === "ml" ? `book-${bookId}-ml.md` : `book-${bookId}.md`;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = f;
    a.click();
  };

  // ---------- JSON DOWNLOAD ----------
  const downloadJSON = (obj, name) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  };

  // ---------- ADD AUDIO ----------
  const addAudio = () => {
    const id = prompt("Track ID (number only)");
    const title = prompt("Enter title");
    if (!id || !title) return;
    setAudioList([...audioList, { id: Number(id), title }]);
  };

  // ---------- ADD REVIEW ----------
  const addReview = () => {
    const name = prompt("Reviewer name");
    const role = prompt("Role / relation");
    const type = prompt("Type: text / audio / image / video");

    if (type === "text") {
      const content = prompt("Enter review text");
      setReviews([...reviews, { id: Date.now(), name, role, type, content }]);
    }

    if (type === "audio") {
      const audio = prompt("Audio file name (audio-review-#.mp3)");
      setReviews([...reviews, { id: Date.now(), name, role, type, audio }]);
    }

    if (type === "image") {
      const image = prompt("Image file name (review_#.png)");
      setReviews([...reviews, { id: Date.now(), name, role, type, image }]);
    }

    if (type === "video") {
      const videoUrl = prompt("Paste video URL");
      setReviews([...reviews, { id: Date.now(), name, role, type, videoUrl }]);
    }
  };

  // ---------- STYLE ----------
  const card = {
    background: "#0c0c0c",
    border: "1px solid #2a2a2a",
    borderRadius: 12,
    padding: 18,
    marginTop: 20
  };

  const gold = "#d4af37";

  return (
    <div style={{ background: "black", minHeight: "100vh", color: "white", padding: 20 }}>

      <h1 style={{ color: gold }}>LEGACY OS — ADMIN DASHBOARD</h1>
      <div style={{ opacity: .7 }}>{status}</div>

      {/* ------------ BOOK EDITOR ------------ */}
      <div style={card}>
        <h2 style={{ color: gold }}>📚 Book Editor (WYSIWYG + Markdown)</h2>

        <div>
          Book ID:
          <input type="number" value={bookId} onChange={e => setBookId(e.target.value)} style={{ width: 60, marginLeft: 10 }} />

          Language:
          <select value={lang} onChange={e => setLang(e.target.value)} style={{ marginLeft: 10 }}>
            <option value="en">English</option>
            <option value="ml">Malayalam</option>
          </select>

          <button onClick={loadBook} style={{ marginLeft: 10 }}>Load</button>
          <button onClick={downloadBook} style={{ marginLeft: 10, color: gold }}>Download Updated File</button>
        </div>

        <textarea
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          style={{ width: "100%", height: 260, marginTop: 10, background: "#111", color: "white" }}
        />

        <div style={{ marginTop: 10, padding: 10, background: "#111" }}>
          <div style={{ color: gold }}>Live Preview</div>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(markdown || "") }} />
        </div>
      </div>

      {/* ------------ AUDIO MANAGER ------------ */}
      <div style={card}>
        <h2 style={{ color: gold }}>🎧 Audio Manager</h2>

        <button onClick={addAudio}>Add New Track</button>
        <button onClick={() => downloadJSON(audioList, "audio.json")} style={{ marginLeft: 10 }}>Download audio.json</button>

        <pre style={{ marginTop: 10 }}>{JSON.stringify(audioList, null, 2)}</pre>

        <div style={{ opacity: .8, marginTop: 5 }}>
          Upload audio files to <span style={{ color: gold }}>/public/audio/</span><br />
          File names: <b>audio-0-en.mp3, audio-5-ml.mp3</b>
        </div>
      </div>

      {/* ------------ REVIEW MANAGER ------------ */}
      <div style={card}>
        <h2 style={{ color: gold }}>⭐ Review Manager</h2>

        <button onClick={addReview}>Add Review</button>
        <button onClick={() => downloadJSON(reviews, "reviews.json")} style={{ marginLeft: 10 }}>Download reviews.json</button>

        <pre style={{ marginTop: 10 }}>{JSON.stringify(reviews, null, 2)}</pre>

        <div style={{ opacity: .8, marginTop: 5 }}>
          Review images → <span style={{ color: gold }}>/public/reviews/images/</span><br />
          Review audio → <span style={{ color: gold }}>/public/reviews/audio/</span>
        </div>
      </div>

      {/* ------------ MEDIA ASSISTANT ------------ */}
      <div style={card}>
        <h2 style={{ color: gold }}>🖼 Media Upload Assistant</h2>

        <ul>
          <li>Covers → cover-0.png</li>
          <li>Book English → book-0.md</li>
          <li>Book Malayalam → book-0-ml.md</li>
          <li>Audio EN → audio-0-en.mp3</li>
          <li>Audio ML → audio-0-ml.mp3</li>
          <li>Review image → review_1.png</li>
          <li>Review audio → audio-review-1.mp3</li>
        </ul>
      </div>

    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
