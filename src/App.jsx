import React, { useState, useEffect } from "react";
import FolderSelector from "./components/FolderSelector";
import StudyMode from "./components/StudyMode";
import Stats from "./components/Stats";
import TagFilter from "./components/TagFilter";

function App() {
  const [allFlashcards, setAllFlashcards] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState("folder"); // 'folder', 'tags', 'study'
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
    setAllFlashcards(cards);
    setFilteredFlashcards(cards);
    setSelectedTags([]);
    setCurrentIndex(0);
    setCurrentScreen("tags"); // Ir a selección de tags
  };

  const handleTagsSelected = (tags) => {
    setSelectedTags(tags);

    if (tags.length === 0) {
      setFilteredFlashcards(allFlashcards);
    } else {
      const filtered = allFlashcards.filter((card) =>
        card.tags.some((tag) => tags.includes(tag)),
      );
      setFilteredFlashcards(filtered);
    }

    setCurrentIndex(0);
  };

  const handleStartStudy = () => {
    if (filteredFlashcards.length > 0) {
      setCurrentScreen("study");
    }
  };

  const handleBackToTags = () => {
    setCurrentScreen("tags");
  };

  const handleBackToFolder = () => {
    setAllFlashcards([]);
    setFilteredFlashcards([]);
    setSelectedTags([]);
    setCurrentScreen("folder");
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredFlashcards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length,
    );
  };

  const handleShuffle = () => {
    const shuffled = [...filteredFlashcards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setFilteredFlashcards(shuffled);
    setCurrentIndex(0);
  };

  // Pantalla de selección de carpeta
  if (currentScreen === "folder") {
    return (
      <>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <FolderSelector onFolderLoaded={handleFolderLoaded} />
      </>
    );
  }

  // Pantalla de selección de tags
  if (currentScreen === "tags") {
    return (
      <>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <TagFilter
          flashcards={allFlashcards}
          selectedTags={selectedTags}
          onTagsSelected={handleTagsSelected}
          onStartStudy={handleStartStudy}
          onBack={handleBackToFolder}
        />
      </>
    );
  }

  // Modo estudio
  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <Stats
        current={currentIndex + 1}
        total={filteredFlashcards.length}
        onShuffle={handleShuffle}
        onBack={handleBackToTags}
        selectedTags={selectedTags}
      />
      <StudyMode
        flashcard={filteredFlashcards[currentIndex]}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
}

export default App;
