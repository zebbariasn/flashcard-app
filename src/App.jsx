import React, { useState, useEffect } from "react";
import FolderSelector from "./components/FolderSelector";
import StudyMode from "./components/StudyMode";
import Stats from "./components/Stats";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyStarted, setStudyStarted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFolderLoaded = (cards) => {
    setFlashcards(cards);
    setCurrentIndex(0);
    setStudyStarted(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + flashcards.length) % flashcards.length,
    );
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFlashcards(shuffled);
    setCurrentIndex(0);
  };

  if (!studyStarted) {
    return (
      <>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <FolderSelector onFolderLoaded={handleFolderLoaded} />
      </>
    );
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <Stats
        current={currentIndex + 1}
        total={flashcards.length}
        onShuffle={handleShuffle}
        onBack={() => setStudyStarted(false)}
      />
      <StudyMode
        flashcard={flashcards[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}

export default App;
