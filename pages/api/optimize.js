import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { resume } = req.body;

  if (!resume) {
    return res.status(400).json({ error: "No resume provided" });
  }

  const prompt = `
You are a professional resume coach. Analyze the following resume text and suggest specific improvements to make it more attractive for job applications. Focus on:

1. Skills gap analysis: Identify missing skills that are commonly required in the industry
2. Action verbs and achievement-focused phrasing
3. Formatting and structure improvements
4. Quantifiable achievements: Suggest how to add metrics where possible
5. Keywords optimization for ATS (Applicant Tracking Systems)

Format your response using Markdown with headers, bullet points, and emphasis where appropriate to create a well-structured document.

Resume:
${resume}

Provide your suggestions in a clear, structured format with specific examples from the resume text and proposed improvements.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const suggestions = completion.choices?.[0]?.message?.content || "No suggestions found.";

    res.status(200).json({ suggestions });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: "Failed to optimize resume" });
  }
}