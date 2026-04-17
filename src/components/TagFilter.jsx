import React, { useState } from "react";

function TagFilter({
  flashcards,
  selectedTags,
  onTagsSelected,
  onStartStudy,
  onBack,
}) {
  const [tempSelectedTags, setTempSelectedTags] = useState(selectedTags);

  // Contar cuántas flashcards tienen cada tag
  const tagCounts = {};
  flashcards.forEach((card) => {
    card.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = Object.keys(tagCounts).sort();

  const toggleTag = (tag) => {
    if (tempSelectedTags.includes(tag)) {
      setTempSelectedTags(tempSelectedTags.filter((t) => t !== tag));
    } else {
      setTempSelectedTags([...tempSelectedTags, tag]);
    }
  };

  const handleStart = () => {
    onTagsSelected(tempSelectedTags);
    onStartStudy();
  };

  const getFilteredCount = () => {
    if (tempSelectedTags.length === 0) return flashcards.length;
    return flashcards.filter((card) =>
      card.tags.some((tag) => tempSelectedTags.includes(tag)),
    ).length;
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
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "var(--bg-secondary)",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ← Seleccionar otra carpeta
          </button>
        </div>

        <h2 style={{ marginBottom: "0.5rem" }}>
          🏷️ Seleccioná los temas a estudiar
        </h2>
        <p
          style={{
            marginBottom: "2rem",
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
          }}
        >
          {flashcards.length} flashcards disponibles
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                background: tempSelectedTags.includes(tag)
                  ? "var(--accent)"
                  : "var(--bg-primary)",
                color: tempSelectedTags.includes(tag)
                  ? "white"
                  : "var(--text-primary)",
                border: `1px solid ${tempSelectedTags.includes(tag) ? "var(--accent)" : "var(--border)"}`,
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontSize: "0.9rem",
              }}
            >
              #{tag} ({tagCounts[tag]})
            </button>
          ))}
        </div>

        {allTags.length === 0 && (
          <div
            style={{
              padding: "1rem",
              background: "var(--bg-primary)",
              borderRadius: "8px",
              marginBottom: "2rem",
              color: "var(--text-secondary)",
            }}
          >
            ⚠️ No se encontraron tags en tus flashcards. Agregá #tags en el
            contenido BACK.
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            📊 {getFilteredCount()} flashcards seleccionadas
          </div>

          <button
            onClick={handleStart}
            disabled={getFilteredCount() === 0}
            style={{
              background:
                getFilteredCount() === 0 ? "var(--border)" : "var(--accent)",
              color:
                getFilteredCount() === 0 ? "var(--text-secondary)" : "white",
              padding: "0.75rem 2rem",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: getFilteredCount() === 0 ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
          >
            📚 Comenzar estudio
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          maxWidth: "600px",
          background: "var(--bg-secondary)",
          borderRadius: "12px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
        }}
      >
        <strong>💡 Tip:</strong> Agregá tags en el contenido BACK usando
        #ejemplo. Ejemplo: #chino #basico #saludos
      </div>
    </div>
  );
}

export default TagFilter;
