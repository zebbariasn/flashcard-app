import React from "react";

function Stats({ current, total, onShuffle, onBack, selectedTags = [] }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "1rem",
        left: "1rem",
        right: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        zIndex: 100,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        ← Cambiar tags
      </button>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {selectedTags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {selectedTags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--accent)",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            background: "var(--bg-secondary)",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            fontSize: "0.9rem",
          }}
        >
          📊 {current} / {total}
        </div>
      </div>

      <button
        onClick={onShuffle}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "var(--text-primary)",
          cursor: "pointer",
        }}
      >
        🎲 Barajar
      </button>
    </div>
  );
}

export default Stats;
