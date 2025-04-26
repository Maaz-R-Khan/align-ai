export default async function handler(req, res) {
  const { query, location = 'Long Island' } = req.query; // keyword search with optional location
  
  const app_id = process.env.ADZUNA_APP_ID || '72565419';
  const app_key = process.env.ADZUNA_APP_KEY || '37fe454deae80002e9d24cc8e6cd0f9f';
  
  try {
      const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&what=${query || ''}&where=${location}&results_per_page=10`);
      
      if (!response.ok) {
          throw new Error(`Adzuna API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Add a check for results
      if (!data.results || !Array.isArray(data.results)) {
          return res.status(200).json([]);
      }
      
      res.status(200).json(data.results); // only send back job results
  } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
  }
}