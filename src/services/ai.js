import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// =======================
// GROQ API
// =======================
export async function askGroq(prompt) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key missing in .env");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error(data);
    throw new Error(data.error?.message || "Groq request failed");
  }

  return data.choices[0].message.content;
}

// =======================
// PDF TEXT EXTRACTOR
// =======================
export async function extractTextFromPDF(file) {
  if (!file) throw new Error("No PDF selected");

  try {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await getDocument({
      data: arrayBuffer,
      useWorkerFetch: false,
      isEvalSupported: false,
    }).promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      fullText += pageText + "\n";
    }

    fullText = fullText.trim();

    if (!fullText || fullText.length < 100) {
      throw new Error(
        "PDF text extraction failed. This PDF may be scanned or image-based."
      );
    }

    return fullText;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error(
      "Could not read PDF properly. Please upload a text-based resume PDF or paste resume manually."
    );
  }
}