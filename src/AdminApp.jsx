import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function AdminApp() {

  // access gate
  const [authorized, setAuthorized] = useState(false);

  // data models
  const [audioList, setAudioList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [currentBookId, setCurrentBookId] = useState(0);
  const [currentLang, setCurrentLang] = useState("en");
  const [status, setStatus] = useState("");

  // verify ?key=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    if (key === "legacyroot") setAuthorized(true);
  }, []);

  // load json files
  useEffect(() => {
    if (!authorized) return;

    fetch("/data/audio.json").then(r => r.json()).then(setAudioList);
    fetch("/data/reviews.json").then(r => r.json()).then(setReviews);
  }, [authorized]);

  // load markdown file into editor
  const loadBook = async () => {
    const path =
      currentLang === "ml"
        ? `/book-${currentBookId}-ml.md`
        : `/book-${currentBookId}.md`;

    try {
      const res = await fetch(path);
      const text = await res.text();
      setEditorContent(text);
      setStatus(`Loaded ${path}`);
    } catch {
      setEditorContent("# New book file");
    }
  };

  // download markdown from browser
  const downloadBook = () => {
    const filename =
      currentLang === "ml"
        ? `book-${currentBookId}-ml.md`
        : `book-${currentBookId}.md`;

    const blob = new Blob([editorContent], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  };

  // download updated json
  const downloadJSON = (obj, name) => {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
  };

  if (!authorized)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>404</h1>
        <p>Not Found</p>
      </div>
    );

  // UI
  return (
    <div style={{ padding: 20 }}>
      <h1>LEGACY OS — ADMIN DASHBOARD</h1>
      <p>Hidden panel — UI untouched</p>
      <p style={{ color: "yellow" }}>{status}</p>

      {/* BOOK EDITOR */}
      <section style={{ marginTop: 30 }}>
        <h2>📚 Book Editor</h2>

        <div>
          Book ID:
          <input
            type="number"
            value={currentBookId}
            onChange={e => setCurrentBookId(parseInt(e.target.value))}
            style={{ width: 70, marginLeft: 10 }}
          />

          Language:
          <select
            value={currentLang}
            onChange={e => setCurrentLang(e.target.value)}
            style={{ marginLeft: 10 }}
          >
            <option value="en">English</option>
            <option value="ml">Malayalam</option>
          </select>

          <button onClick={loadBook} style={{ marginLeft: 10 }}>
            Load
          </button>

          <button onClick={downloadBook} style={{ marginLeft: 10 }}>
            Download Updated File
          </button>
        </div>

        <textarea
          value={editorContent}
          onChange={e => setEditorContent(e.target.value)}
          style={{ width: "100%", height: 300, marginTop: 10, background: "#111", color: "white" }}
        />
      </section>

      {/* AUDIO */}
      <section style={{ marginTop: 30 }}>
        <h2>🎧 Audio Manager</h2>
        <pre>{JSON.stringify(audioList, null, 2)}</pre>

        <button onClick={() => downloadJSON(audioList, "audio.json")}>
          Download Updated audio.json
        </button>
      </section>

      {/* REVIEWS */}
      <section style={{ marginTop: 30 }}>
        <h2>⭐ Review Manager</h2>
        <pre>{JSON.stringify(reviews, null, 2)}</pre>

        <button onClick={() => downloadJSON(reviews, "reviews.json")}>
          Download Updated reviews.json
        </button>
      </section>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
