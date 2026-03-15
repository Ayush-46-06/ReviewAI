const { Groq } = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

exports.generateAIReviews = async (stars, business) => {
  const { businessName, category, city, services, language, tone } = business;

  const prompt = `
Write 3 natural Google reviews like human (40-60 words each).

Business: ${businessName}
Category: ${category}
Location: ${city}
Services: ${services?.join(", ")}
Language: ${language?.join(", ")}
Tone: ${tone}
Rating experience: ${stars} star customer experience.
Rules:
- Each review must be 40–60 words
- Sound like a real customer
- Mention a service if possible
- Find company in on google and add details from google reviews (if available)
- DO NOT write "Review 1", "1.", "5 stars", or any numbering
- DO NOT add headings or bullet points
- Separate each review with one blank line
`;

  try {
    const response = await groq.chat.completions.create({
      model: "groq/compound", // best Groq model for text
      messages: [
        { role: "system", content: "You write realistic customer reviews." },
        { role: "user", content: prompt }
      ],
      temperature: 0.6,
      max_tokens: 400
    });

    const text = response.choices?.[0]?.message?.content || "";

    return text
      .split("\n\n")
      .map(r => r.trim())
      .filter(r => r.split(" ").length >= 40); // ensures minimum words

  } catch (error) {
    console.error("Groq Error:", error.message);
    return [];
  }
};