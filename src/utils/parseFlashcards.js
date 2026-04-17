function markdownToHtml(markdown) {
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold e italic
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Lists
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

  // Hashtags
  html = html.replace(
    /#(\w+)/g,
    '<span style="background: var(--accent); padding: 0.2rem 0.5rem; border-radius: 12px; font-size: 0.8rem;">#$1</span>',
  );

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

export function parseMarkdownFile(content, fileName) {
  const flashcards = [];

  // Buscar bloques --- FRONT y --- BACK
  const blocks = content.split(/--- (FRONT|BACK)\n/i);

  let currentFront = null;

  for (let i = 1; i < blocks.length; i += 2) {
    const type = blocks[i].toUpperCase();
    const text = blocks[i + 1]?.trim();

    if (type === "FRONT") {
      currentFront = text;
    } else if (type === "BACK" && currentFront) {
      flashcards.push({
        id: `${fileName}-${flashcards.length}`,
        front: markdownToHtml(currentFront),
        back: markdownToHtml(text),
        sourceFile: fileName,
      });
      currentFront = null;
    }
  }

  return flashcards;
}
