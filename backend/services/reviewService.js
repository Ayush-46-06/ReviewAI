const { Groq } = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.generateAIReviews = async (stars, business) => {
  const { businessName, category, city, services } = business;

  // Concise prompt – saves ~30–50% input tokens
  const prompt = `
Generate 4 realistic Google reviews (50-80 words each) for:
Business: ${businessName} (${category}, ${city})
Services: ${services?.join(", ")}
Rating: ${stars} stars
Rules:
- Write naturally, mention specific services
- Output ONLY the reviews, each separated by a blank line
`;

  const response = await groq.chat.completions.create({
    model: "groq/compound",  // confirm this model is correct; consider "llama2-70b-4096" if allowed
    messages: [
      { role: "system", content: "You write realistic Google reviews." },
      { role: "user", content: prompt }
    ],
    temperature: 0.5,
    max_completion_tokens: 500,  // reduced for 4 reviews
    // Remove compound_custom if not required – it may not affect token count but can be omitted
  });

  const text = response.choices[0]?.message?.content;
  if (!text) return [];

  return text
    .split("\n\n")
    .map(r => r.trim())
    .filter(r => r.length > 40);
};