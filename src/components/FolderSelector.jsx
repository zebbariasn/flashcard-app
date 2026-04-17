import React, { useState } from "react";
import { parseMarkdownFile } from "../utils/parseFlashcards";

function FolderSelector({ onFolderLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectFolder = async () => {
    try {
      setLoading(true);
      setError("");

      // Verificar si el navegador soporta la API
      if (!("showDirectoryPicker" in window)) {
        throw new Error(
          "Tu navegador no soporta selección de carpetas. Usa Chrome, Edge o Brave.",
        );
      }

      const directoryHandle = await window.showDirectoryPicker();
      const flashcards = [];

      // Leer todos los archivos .md recursivamente
      async function readMdFiles(dirHandle, path = "") {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === "file" && entry.name.endsWith(".md")) {
            const file = await entry.getFile();
            const content = await file.text();
            const parsed = parseMarkdownFile(content, entry.name);
            flashcards.push(...parsed);
          } else if (entry.kind === "directory") {
            await readMdFiles(entry, `${path}/${entry.name}`);
          }
        }
      }

      await readMdFiles(directoryHandle);

      if (flashcards.length === 0) {
        throw new Error(
          "No se encontraron archivos .md con el formato --- FRONT / --- BACK",
        );
      }

      onFolderLoaded(flashcards);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          background: "var(--bg-secondary)",
          padding: "3rem",
          borderRadius: "20px",
          boxShadow: "var(--shadow)",
        }}
      >
        <h1 style={{ marginBottom: "1rem", fontSize: "2.5rem" }}>
          📚 Flashcard Study
        </h1>
        <p style={{ marginBottom: "2rem", color: "var(--text-secondary)" }}>
          Seleccioná la carpeta que contiene tus archivos .md
          <br />
          con el formato <strong>--- FRONT</strong> y <strong>--- BACK</strong>
        </p>

        <button
          onClick={handleSelectFolder}
          disabled={loading}
          style={{
            background: "var(--accent)",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "12px",
            fontSize: "1.1rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
          onMouseEnter={(e) =>
            (e.target.style.background = "var(--accent-hover)")
          }
          onMouseLeave={(e) => (e.target.style.background = "var(--accent)")}
        >
          {loading ? "📂 Leyendo archivos..." : "📂 Seleccionar carpeta"}
        </button>

        {error && (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              background: "#fee2e2",
              color: "#991b1b",
              borderRadius: "8px",
              fontSize: "0.9rem",
            }}
          >
            ❌ {error}
          </div>
        )}

        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "var(--bg-primary)",
            borderRadius: "8px",
            textAlign: "left",
            fontSize: "0.85rem",
          }}
        >
          <strong>📝 Formato esperado:</strong>
          <pre
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem",
              background: "var(--bg-secondary)",
              borderRadius: "4px",
              overflow: "auto",
            }}
          >
            {`--- FRONT
# 你好
### Nǐ hǎo

--- BACK
- Hola informal
- #saludos #basico`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default FolderSelector;
