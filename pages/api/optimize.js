import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // ✅ safer to use environment variable
});

export default async function handler(req, res) {
  const { resume } = req.body;

  if (!resume) {
    return res.status(400).json({ error: "No resume provided" });
  }

  const prompt = `
You are a professional resume coach. Analyze the following resume text and suggest specific improvements to make it more attractive for job applications. Focus on missing skills, formatting, phrasing, and action verbs.

Resume:
${resume}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // using gpt-4o-mini as you chose
      messages: [{ role: "user", content: prompt }],
    });

    const suggestions = completion.choices?.[0]?.message?.content || "No suggestions found.";

    res.status(200).json({ suggestions });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: "Failed to optimize resume" });
  }
}
