export function parseJsonArray(content, fallback = []) {
  if (!content) return fallback;

  const fencedMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fencedMatch ? fencedMatch[1] : content;
  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]");

  if (start === -1 || end === -1 || end <= start) return fallback;

  try {
    const parsed = JSON.parse(raw.slice(start, end + 1));
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}
