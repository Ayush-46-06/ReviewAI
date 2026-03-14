const { Groq } = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.generateAIReviews = async (stars, business) => {

  const { businessName, category, city, services } = business;

  const prompt = `
You are writing Google reviews from the perspective of real customers.

Business Name: ${businessName}
Category: ${category}
City: ${city}
Services: ${services?.join(", ")}

Customer Rating: ${stars} stars

Write exactly 5 Google reviews.

Rules:
- Each review must be 50–80 words
- Write naturally like a real customer
- Mention services if relevant
- Do NOT explain anything
- Do NOT include reasoning
- Do NOT number the reviews
- Output ONLY the reviews
- Separate reviews with a blank line
`;

  const response = await groq.chat.completions.create({
    model: "groq/compound", // 🔹 CHANGED: using Groq Compound model instead of qwen/qwen3-32b

    messages: [
      {
        role: "system",
        content: "You generate realistic Google reviews."
      },
      {
        role: "user",
        content: prompt
      }
    ],

    temperature: 0.6,
    max_completion_tokens: 800, // 🔹 same parameter works for compound models

    compound_custom: { // 🔹 ADDED: enables compound model tools
      tools: {
        enabled_tools: [
          "web_search",
          "code_interpreter",
          "visit_website"
        ]
      }
    }
  });

  const text = response.choices[0].message.content;

  return text
    .split("\n\n")
    .map(r => r.trim())
    .filter(r => r.length > 40);
};