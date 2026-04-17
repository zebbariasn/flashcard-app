import React from "react";

function Stats({ current, total, onShuffle, onBack }) {
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
        }}
      >
        ← Cambiar carpeta
      </button>

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

      <button
        onClick={onShuffle}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "var(--text-primary)",
        }}
      >
        🎲 Barajar
      </button>
    </div>
  );
}

export default Stats;
