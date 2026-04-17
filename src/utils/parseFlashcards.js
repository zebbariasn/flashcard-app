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

  // Hashtags - los convertimos en spans con clase (pero no los removemos)
  html = html.replace(/#(\w+)/g, '<span class="tag">#$1</span>');

  // Line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}

// Extrae tags del contenido
function extractTags(content) {
  const tagRegex = /#(\w+)/g;
  const tags = [];
  let match;
  while ((match = tagRegex.exec(content)) !== null) {
    if (!tags.includes(match[1])) {
      tags.push(match[1]);
    }
  }
  return tags;
}

export function parseMarkdownFile(content, fileName) {
  const flashcards = [];

  // Buscar bloques --- FRONT y --- BACK
  const blocks = content.split(/--- (FRONT|BACK)\n/i);

  let currentFront = null;
  let currentBack = null;

  for (let i = 1; i < blocks.length; i += 2) {
    const type = blocks[i].toUpperCase();
    const text = blocks[i + 1]?.trim();

    if (type === "FRONT") {
      currentFront = text;
    } else if (type === "BACK" && currentFront) {
      currentBack = text;

      // Extraer tags del contenido BACK
      const tags = extractTags(currentBack);

      flashcards.push({
        id: `${fileName}-${flashcards.length}`,
        front: markdownToHtml(currentFront),
        back: markdownToHtml(currentBack),
        rawBack: currentBack, // Guardamos el raw para mantener los tags originales
        tags: tags,
        sourceFile: fileName,
      });
      currentFront = null;
      currentBack = null;
    }
  }

  return flashcards;
}
