import React, { useState } from "react";

function Flashcard({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "400px",
        cursor: "pointer",
        perspective: "1000px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          textAlign: "center",
          transition: "transform 0.6s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            boxShadow: "var(--shadow)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            overflow: "auto",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--accent)",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            📖 FRONT
          </div>
          <div dangerouslySetInnerHTML={{ __html: front }} />
        </div>

        {/* BACK */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            boxShadow: "var(--shadow)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            transform: "rotateY(180deg)",
            overflow: "auto",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--accent)",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            💡 BACK
          </div>
          <div dangerouslySetInnerHTML={{ __html: back }} />
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
