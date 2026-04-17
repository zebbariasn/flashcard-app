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
  const [currentScreen, setCurrentScreen] = useState("folder");
  const [colorTheme, setColorTheme] = useState("blue");

  useEffect(() => {
    const savedColorTheme = localStorage.getItem("colorTheme") || "blue";
    setColorTheme(savedColorTheme);
    document.documentElement.setAttribute("data-theme", savedColorTheme);
  }, []);

  const changeColorTheme = (newTheme) => {
    setColorTheme(newTheme);
    localStorage.setItem("colorTheme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleFolderLoaded = (cards) => {
    setAllFlashcards(cards);
    setFilteredFlashcards(cards);
    setSelectedTags([]);
    setCurrentIndex(0);
    setCurrentScreen("tags");
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

  // Selector de temas (versión simple)
  const themes = [
    { name: "blue", color: "#3b82f6", label: "Azul" },
    { name: "gray", color: "#6b7280", label: "Gris" },
    { name: "pink", color: "#ec489a", label: "Rosa" },
    { name: "purple", color: "#8b5cf6", label: "Morado" },
    { name: "red", color: "#dc2626", label: "Rojo" },
  ];

  // Pantalla de selección de carpeta
  if (currentScreen === "folder") {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
            background: "var(--bg-secondary)",
            padding: "0.5rem",
            borderRadius: "30px",
            border: "1px solid var(--border)",
            zIndex: 100,
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => changeColorTheme(theme.name)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: theme.color,
                border:
                  colorTheme === theme.name
                    ? "2px solid white"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={theme.label}
            />
          ))}
        </div>
        <FolderSelector onFolderLoaded={handleFolderLoaded} />
      </>
    );
  }

  // Pantalla de selección de tags
  if (currentScreen === "tags") {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
            background: "var(--bg-secondary)",
            padding: "0.5rem",
            borderRadius: "30px",
            border: "1px solid var(--border)",
            zIndex: 100,
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => changeColorTheme(theme.name)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: theme.color,
                border:
                  colorTheme === theme.name
                    ? "2px solid white"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              title={theme.label}
            />
          ))}
        </div>
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
      <div
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          display: "flex",
          gap: "0.5rem",
          background: "var(--bg-secondary)",
          padding: "0.5rem",
          borderRadius: "30px",
          border: "1px solid var(--border)",
          zIndex: 100,
        }}
      ></div>
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
