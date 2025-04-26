import { useState } from "react";


export default function Home() {
  const [resume, setResume] = useState('');
const [optimizationSuggestions, setOptimizationSuggestions] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');

  async function fetchJobs() {
    const res = await fetch(`/api/jobs?query=${query}`);
    const data = await res.json();
    setJobs(data);
  }

  async function optimizeResume() {
    if (!resume) {
      alert("Please paste your resume first!");
      return;
    }
  
    const res = await fetch('/api/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resume })
    });
  
    const data = await res.json();
    setOptimizationSuggestions(data.suggestions);
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Job Board</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search for jobs..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border px-4 py-2 mr-2 rounded"
        />
        <button onClick={fetchJobs} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search Jobs
        </button>
      </div>

      <div className="mb-6">
  <h2 className="text-xl font-semibold mb-2">Paste Your Resume</h2>
  <textarea 
    className="w-full border rounded p-2 h-40"
    placeholder="Paste your resume here..."
    value={resume}
    onChange={(e) => setResume(e.target.value)}
  ></textarea>
  <button 
    onClick={optimizeResume}
    className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
  >
    Optimize Resume
  </button>
</div>

{optimizationSuggestions && (
  <div className="mt-6 p-4 border rounded bg-gray-50">
    <h2 className="text-xl font-semibold mb-2">Optimization Suggestions:</h2>
    <p className="whitespace-pre-line text-black">{optimizationSuggestions}</p>
  </div>
)}


      {/* Job Listings */}
      <div className="mt-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">{job.company.display_name}</p>
            <p className="text-gray-500">{job.location.display_name}</p>
            <p className="text-sm mt-2">{job.description?.substring(0, 150)}...</p>
            <a href={job.redirect_url} target="_blank" rel="noreferrer" className="text-blue-500 underline mt-2 block">
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
