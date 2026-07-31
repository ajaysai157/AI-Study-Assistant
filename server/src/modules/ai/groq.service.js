import Groq from "groq-sdk";
import { config } from "../../config/env.js";
import { parseJsonArray } from "../../utils/json.js";

const MAX_INPUT_CHARS = 18000;

function getClient() {
  if (!config.groqApiKey) {
    throw new Error("AI summary generation is not configured.");
  }

  return new Groq({
    apiKey: config.groqApiKey,
  });
}

export async function generateSummary(text) {
  try {
    const cleanText = text?.trim();
    if (!cleanText) {
      throw new Error("No text was extracted from the document.");
    }

    const studyMaterial =
      cleanText.length > MAX_INPUT_CHARS
        ? cleanText.slice(0, MAX_INPUT_CHARS)
        : cleanText;

    const prompt = `
You are an AI study assistant.

Read the study material below and generate a concise, well-structured summary.

Requirements:
- Use simple language.
- Keep the summary between 200 and 300 words.
- Use headings and bullet points.
- Highlight only the important concepts.
- Do not add information that is not present in the document.

Study Material:

${studyMaterial}
`;

    const response = await getClient().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 600,
    });

    return response.choices?.[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Groq Summary Error:", error);
    throw new Error("Failed to generate summary.");
  }
}

export async function generateFlashcards(text, count = 10) {
  const cleanText = text?.trim();
  if (!cleanText) throw new Error("No text was extracted from the document.");

  const studyMaterial = cleanText.slice(0, MAX_INPUT_CHARS);
  const response = await getClient().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Create ${count} study flashcards from this material. Return only a JSON array. Each item must have "question" and "answer" strings.

Material:
${studyMaterial}`,
      },
    ],
    temperature: 0.2,
    max_tokens: 1200,
  });

  const cards = parseJsonArray(response.choices?.[0]?.message?.content);
  return cards
    .filter((card) => card?.question && card?.answer)
    .slice(0, count)
    .map((card) => ({
      question: String(card.question).trim(),
      answer: String(card.answer).trim(),
    }));
}

export async function generateQuizQuestions(text, count = 6) {
  const cleanText = text?.trim();
  if (!cleanText) throw new Error("No text was extracted from the document.");

  const studyMaterial = cleanText.slice(0, MAX_INPUT_CHARS);
  const response = await getClient().chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `Create ${count} multiple-choice quiz questions from this material. Return only a JSON array. Each item must have "question", "options" as exactly 4 strings, "correctAnswer" matching one option, "explanation", and "difficulty".

Material:
${studyMaterial}`,
      },
    ],
    temperature: 0.25,
    max_tokens: 1800,
  });

  const questions = parseJsonArray(response.choices?.[0]?.message?.content);
  return questions
    .filter(
      (item) =>
        item?.question &&
        Array.isArray(item.options) &&
        item.options.length === 4 &&
        item.correctAnswer &&
        item.explanation
    )
    .slice(0, count)
    .map((item) => ({
      question: String(item.question).trim(),
      options: item.options.map((option) => String(option).trim()),
      correctAnswer: String(item.correctAnswer).trim(),
      explanation: String(item.explanation).trim(),
      difficulty: String(item.difficulty || "Medium").trim(),
    }));
}
