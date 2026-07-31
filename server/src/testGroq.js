import dotenv from "dotenv";

dotenv.config();

async function test() {
  console.log("Groq Key:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

  const { generateSummary } = await import("./modules/ai/groq.service.js");

  const text = `
Operating Systems manage computer hardware and software resources.

Process Management
Memory Management
CPU Scheduling
File Systems
Security
`;

  const summary = await generateSummary(text);

  console.log("\n===== AI SUMMARY =====\n");
  console.log(summary);
}

test();