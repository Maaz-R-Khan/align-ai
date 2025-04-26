import { useState } from 'react';

export default function Jobs() {
  const [resume, setResume] = useState('');
  const [optimizationSuggestions, setOptimizationSuggestions] = useState('');
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [location, setLocation] = useState('Long Island');
  const [isLoading, setIsLoading] = useState({
    jobs: false,
    optimize: false,
    match: false,
  });

  async function fetchJobs() {
    setIsLoading(prev => ({ ...prev, jobs: true }));
    try {
      const res = await fetch(`/api/jobs?query=${query}&location=${encodeURIComponent(location)}`);
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(prev => ({ ...prev, jobs: false }));
    }
  }

  async function optimizeResume() {
    if (!resume) {
      alert("Please paste your resume first!");
      return;
    }

    setIsLoading(prev => ({ ...prev, optimize: true }));
    try {
      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume }),
      });

      const data = await res.json();
      setOptimizationSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error optimizing resume:", error);
      alert("Failed to optimize resume. Please try again.");
    } finally {
      setIsLoading(prev => ({ ...prev, optimize: false }));
    }
  }

  async function matchJobs() {
    if (!resume || jobs.length === 0) {
      alert("Please paste your resume and search for jobs first!");
      return;
    }

    const cleanedJobs = jobs.slice(0, 5).map(job => ({
      id: job.id,
      title: job.title,
      company: job.company?.display_name || "Unknown Company",
      location: job.location?.display_name || "Unknown Location",
      description: job.description || "No description provided."
    }));

    setIsLoading(prev => ({ ...prev, match: true }));
    try {
      const res = await fetch('/api/matchJobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobs: cleanedJobs }),
      });

      const data = await res.json();
      console.log("Matches received:", data.matches);
      setMatches(data.matches || []);
    } catch (error) {
      console.error("Error matching jobs:", error);
      alert("Failed to match jobs. Please try again.");
    } finally {
      setIsLoading(prev => ({ ...prev, match: false }));
    }
  }

  const getJobById = (jobId) => {
    const numericId = jobId.replace('job-', '');
    return jobs[parseInt(numericId)] || null;
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Job Match Assistant</h1>

      {/* 1. Search for Jobs */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Search for Jobs</h2>
        <div className="flex flex-col md:flex-row gap-2">
          <input 
            type="text" 
            placeholder="Job title or keywords..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-4 py-2 rounded flex-grow"
          />
          <input 
            type="text" 
            placeholder="Location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-4 py-2 rounded md:w-1/3"
          />
          <button 
            onClick={fetchJobs}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isLoading.jobs}
          >
            {isLoading.jobs ? "Searching..." : "Search Jobs"}
          </button>
        </div>
      </div>

      {/* 2. Paste Resume */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Paste Your Resume</h2>
        <textarea 
          className="w-full border rounded p-2 h-40"
          placeholder="Paste your resume here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        ></textarea>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={optimizeResume}
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={isLoading.optimize}
          >
            {isLoading.optimize ? "Optimizing..." : "Optimize Resume"}
          </button>
          <button 
            onClick={matchJobs}
            className="bg-purple-500 text-white px-4 py-2 rounded"
            disabled={isLoading.match || jobs.length === 0 || !resume}
          >
            {isLoading.match ? "Matching..." : "Match Jobs"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matches */}
        {matches.length > 0 && (
          <div className="p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Your Job Matches</h2>
            {matches.map((match, index) => {
              const job = getJobById(match.job_id);
              if (!job) return null;
              
              return (
                <div key={index} className="mb-6 p-4 border rounded bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{job.title}</h3>
                      <p className="text-gray-600">{job.company?.display_name}</p>
                      <p className="text-gray-500 text-sm">{job.location?.display_name}</p>
                    </div>
                    <div className="ml-4">
                      <div className={`text-white font-bold text-lg rounded-full w-16 h-16 flex items-center justify-center
                        ${match.match >= 80 ? 'bg-green-500' : 
                          match.match >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                        {match.match}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">
                    <p className="font-medium text-green-600">Strengths:</p>
                    <p>{match.strengths || "None specified"}</p>
                    <p className="font-medium text-red-600 mt-2">Areas to improve:</p>
                    <p>{match.weaknesses || "None specified"}</p>
                  </div>
                  <a 
                    href={job.redirect_url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-blue-500 underline mt-3 inline-block"
                  >
                    View Job
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Resume Optimization */}
        {optimizationSuggestions && (
          <div className="p-4 border rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Resume Optimization Tips:</h2>
            <div className="whitespace-pre-line bg-white p-4 rounded border">
              {optimizationSuggestions}
            </div>
          </div>
        )}
      </div>

      {/* Job Listings */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Available Jobs ({jobs.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="border p-4 rounded hover:shadow-md transition">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-gray-600">{job.company?.display_name}</p>
              <p className="text-gray-500 text-sm">{job.location?.display_name}</p>
              <p className="text-sm mt-2 line-clamp-3">{job.description}</p>
              <div className="flex justify-between mt-3">
                <a 
                  href={job.redirect_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-blue-500 underline"
                >
                  View Details
                </a>
                {matches.some(m => m.job_id?.replace('job-', '') == jobs.indexOf(job)) && (
                  <span className="text-green-500 text-sm">Matched!</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
