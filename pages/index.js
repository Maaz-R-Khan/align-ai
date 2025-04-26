import { useState } from "react";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');

  async function fetchJobs() {
    const res = await fetch(`/api/jobs?query=${query}`);
    const data = await res.json();
    setJobs(data);
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
