import React, { useEffect } from "react";
import Flashcard from "./Flashcard";

function StudyMode({ flashcard, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  if (!flashcard) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
      }}
    >
      <button
        onClick={onPrev}
        style={{
          position: "absolute",
          left: "1rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        ←
      </button>

      <Flashcard front={flashcard.front} back={flashcard.back} />

      <button
        onClick={onNext}
        style={{
          position: "absolute",
          right: "1rem",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "1.5rem",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        →
      </button>

      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
        }}
      >
        ← → o clicks para navegar
      </div>
    </div>
  );
}

export default StudyMode;
