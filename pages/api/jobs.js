export default async function handler(req, res) {
    const { query } = req.query; // keyword search
    
    const app_id = '72565419';
    const app_key = '37fe454deae80002e9d24cc8e6cd0f9f';
    
    const response = await fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&what=${query || ''}&where=Long Island`);
    const data = await response.json();
  
    res.status(200).json(data.results); // only send back job results
  }