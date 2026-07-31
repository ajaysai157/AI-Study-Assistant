import fs from "fs/promises";
import pdf from "pdf-parse/lib/pdf-parse.js";

export async function extractPdfText(filePath) {
  try {
    const buffer = await fs.readFile(filePath);

    const data = await pdf(buffer);
    const text = data.text.trim();

    if (!text) {
      throw new Error("No readable text found in PDF.");
    }

    return {
      text,
      pages: data.numpages,
    };
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
}
