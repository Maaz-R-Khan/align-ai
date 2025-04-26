// matchJobs.js - Backend API handler
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { resume, jobs } = req.body;

  if (!resume || !jobs || !Array.isArray(jobs)) {
    return res.status(400).json({ error: "Resume or job list missing/invalid." });
  }

  const cleanedJobs = jobs.map((job, index) => ({
    id: job.id || `job-${index}`,
    title: job.title || "Unknown Title",
    company: job.company || "Unknown Company",
    location: job.location || "Unknown Location",
    description: job.description?.substring(0, 500) || "No description provided."
  }));

  const prompt = `
You are an expert career advisor AI.

The candidate's resume is below:
""" 
${resume}
"""

You are given a list of job descriptions. For each job, based on the resume, RATE how strong a match the candidate is, on a scale from 0 (terrible match) to 100 (perfect match).

ONLY respond with a strict JSON array as follows:
[
  {"job_id": "job-0", "match": 85, "strengths": "5+ years of React experience, strong frontend skills", "weaknesses": "No experience with the required AWS services"},
  {"job_id": "job-1", "match": 75, "strengths": "JavaScript expertise, team leadership", "weaknesses": "Less experience with Python than required"}
]

For each job, provide brief "strengths" (what makes the candidate a good fit) and "weaknesses" (what the candidate is missing).

Here are the jobs:
${cleanedJobs.map((job, index) => `
Job ${index}:
ID: ${job.id}
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Description: ${job.description}
`).join('\n')}
`;

  try {
    console.log("Prompt sent to OpenAI:", prompt);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const matchesText = completion.choices?.[0]?.message?.content || "[]";
    console.log("Raw matchesText from OpenAI:", matchesText);

    let matches = [];
    try {
      // Extract JSON array from response (handles cases where AI adds extra text)
      const jsonMatch = matchesText.match(/\[[\s\S]*?\]/);
      if (jsonMatch) {
        matches = JSON.parse(jsonMatch[0]);
      } else {
        console.error("No valid JSON found in response:", matchesText);
        matches = [];
      }
    } catch (err) {
      console.error("Failed to parse matches:", err);
      matches = [];
    }

    res.status(200).json({ matches });

  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(500).json({ error: "Failed to match jobs" });
  }
}