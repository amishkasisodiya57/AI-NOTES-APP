import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = async () => {
    if (!title || !body) return;

    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-type": "application/json" },
    });

    const data = await res.json();
    setNotes([data, ...notes]);
    setTitle("");
    setBody("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const summarize = (text) => {
    return text.split(" ").slice(0, 10).join(" ") + "...";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      padding: "30px",
      fontFamily: "Arial"
    }}>
      <h1 style={{
        color: "white",
        textAlign: "center",
        marginBottom: "20px"
      }}>
        🧠 AI Notes App
      </h1>

      {/* Input Box */}
      <div style={{
        maxWidth: "500px",
        margin: "auto",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
      }}>
        <input
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <textarea
          placeholder="WRITE HERE..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            height: "80px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={addNote}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ➕ Add Note
        </button>
      </div>

      {/* Notes */}
      <div style={{
        marginTop: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px"
      }}>
        {notes.map((note) => (
          <div key={note.id} style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
          }}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>

            <button
              onClick={() => deleteNote(note.id)}
              style={{
                background: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                marginRight: "5px"
              }}
            >
              Delete
            </button>

            <button
              onClick={() => setSummary(summarize(note.body))}
              style={{
                background: "#00c853",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px"
              }}
            >
              Summarize
            </button>

            <p style={{ marginTop: "10px", color: "#555" }}>
              <b>Summary:</b> {summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;