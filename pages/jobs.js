import { useState, useRef } from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

export default function Jobs() {
  const [resume, setResume] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState('');
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [location, setLocation] = useState('New York');
  const [isLoading, setIsLoading] = useState({
    jobs: false,
    optimize: false,
    match: false,
    upload: false
  });
  const [activeTab, setActiveTab] = useState('search');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const fileInputRef = useRef(null);

  async function fetchJobs() {
    setIsLoading(prev => ({ ...prev, jobs: true }));
    try {
      const res = await fetch(`/api/jobs?query=${query}&location=${encodeURIComponent(location)}`);
      const data = await res.json();
      setJobs(data);
      setCurrentPage(1); // Reset to first page when new search is performed
    } catch (error) {
      console.error("Error fetching jobs:", error);
      alert("Failed to fetch jobs. Please try again.");
    } finally {
      setIsLoading(prev => ({ ...prev, jobs: false }));
    }
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF or Word document (.doc, .docx)");
      return;
    }
    
    setResumeFile(file);
    
    // Show file is being processed
    setIsLoading(prev => ({ ...prev, upload: true }));
    
    // Create FormData
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Upload and parse the file
      const res = await fetch('/api/parseResume', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error('Failed to parse resume');
      }
      
      const data = await res.json();
      setResume(data.text);
    } catch (error) {
      console.error("Error parsing resume file:", error);
      alert("Failed to parse resume file. Please try pasting the text instead.");
    } finally {
      setIsLoading(prev => ({ ...prev, upload: false }));
    }
  }

  async function optimizeResume() {
    if (!resume) {
      alert("Please paste your resume or upload a file first!");
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
      setActiveTab('matches'); // Switch to matches tab after matching
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

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const router = useRouter();
  const { tab } = router.query;

  // When tab changes in URL, update activeTab
  useEffect(() => {
    if (tab === "resume") {
      setActiveTab("resume");
    } else if (tab === "matches") {
      setActiveTab("matches");
    } else {
      setActiveTab("search"); // Default
    }
  }, [tab]);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="relative z-10 flex-grow max-w-7xl mx-auto py-8 px-4">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'search' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('search')}
          >
            Job Listings
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'resume' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('resume')}
          >
            Resume Optimizer
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'matches' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('matches')}
            disabled={matches.length === 0}
          >
            Job Matches
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {/* Job Listings Tab */}
          {activeTab === 'search' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Available Jobs ({jobs.length})</h2>
                {jobs.length > 0 && resume && (
                  <button 
                    onClick={matchJobs}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={isLoading.match}
                  >
                    {isLoading.match ? "Matching..." : "Match with Resume"}
                  </button>
                )}
              </div>

              {/* Search form in tab */}
              <div className="bg-gray-900 p-6 rounded mb-6">
                <div className="flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Job title or keywords..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded flex-grow"
                  />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded md:w-1/3"
                  />
                  <button 
                    onClick={fetchJobs}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    disabled={isLoading.jobs}
                  >
                    {isLoading.jobs ? "Searching..." : "Search Jobs"}
                  </button>
                </div>
              </div>

              {/* Filter sidebar and job listings */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Filters */}
                <div className="w-full md:w-64 bg-gray-900 p-4 rounded">
                  <h3 className="font-bold text-lg mb-4 text-white">Filters</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-gray-300">Job Type</h4>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <input type="checkbox" id="full-time" className="mr-2" />
                        <label htmlFor="full-time">Full-time</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="part-time" className="mr-2" />
                        <label htmlFor="part-time">Part-time</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="contract" className="mr-2" />
                        <label htmlFor="contract">Contract</label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-gray-300">Work Arrangement</h4>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <input type="checkbox" id="On-site" className="mr-2" />
                        <label htmlFor="On-site">On-site</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="Hybrid" className="mr-2" />
                        <label htmlFor="Hybrid">Hybrid</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="Remote" className="mr-2" />
                        <label htmlFor="Remote">Remote</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-gray-300">Experience Level</h4>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <input type="checkbox" id="entry-level" className="mr-2" />
                        <label htmlFor="entry-level">Entry Level</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="mid-level" className="mr-2" />
                        <label htmlFor="mid-level">Mid-Level</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="senior-level" className="mr-2" />
                        <label htmlFor="senior-level">Senior Level</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Job Listings */}
                <div className="flex-1">
                  {jobs.length === 0 ? (
                    <div className="bg-gray-900 p-8 rounded text-center">
                      <p className="text-gray-400">Search for jobs to see listings</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 gap-4">
                        {currentJobs.map((job) => (
                          <div key={job.id} className="bg-gray-900 p-6 rounded hover:bg-gray-800 transition">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-blue-400">{job.title}</h3>
                                <p className="text-gray-300">{job.company?.display_name}</p>
                                <p className="text-gray-400 text-sm">{job.location?.display_name}</p>
                              </div>
                              {matches.some(m => m.job_id?.replace('job-', '') == jobs.indexOf(job)) && (
                                <div className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                                  Matched!
                                </div>
                              )}
                            </div>
                            <p className="text-sm mt-4 line-clamp-3 text-gray-300">{job.description}</p>
                            <div className="mt-4 flex justify-between items-center">
                              <a 
                                href={job.redirect_url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-blue-400 hover:underline font-medium"
                              >
                                View Details
                              </a>
                              <span className="text-gray-400 text-sm">Posted: {job.created || 'Recently'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center mt-6">
                          <nav className="flex items-center space-x-2">
                            <button 
                              onClick={() => paginate(currentPage - 1)}
                              disabled={currentPage === 1}
                              className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                              Prev
                            </button>
                            
                            {[...Array(totalPages)].map((_, index) => (
                              <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                              >
                                {index + 1}
                              </button>
                            ))}
                            
                            <button 
                              onClick={() => paginate(currentPage + 1)}
                              disabled={currentPage === totalPages}
                              className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-800 text-gray-500' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                            >
                              Next
                            </button>
                          </nav>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Resume Optimizer Tab */}
          {activeTab === 'resume' && (
            <div id="resume-optimizer">
              <h2 id="resumeOptimizer" className="text-2xl font-bold mb-6 text-white">Resume Optimizer</h2>
              <div className="bg-gray-900 p-6 rounded">
                <p className="mb-4 text-gray-300">Paste your resume below or upload a file to get AI-powered optimization suggestions</p>
                
                {/* File Upload Component */}
                <div className="mb-6">
                  <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                    
                    {resumeFile ? (
                      <div className="text-center">
                        <p className="text-gray-300">{resumeFile.name}</p>
                        <p className="text-sm text-gray-400">{Math.round(resumeFile.size / 1024)} KB</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center">
                        <p className="text-gray-300 mb-2">
                          {isLoading.upload ? "Processing file..." : "Drag & drop your resume file or"}
                        </p>
                        <button 
                          onClick={handleBrowseClick}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                          disabled={isLoading.upload}
                        >
                          Browse Files
                        </button>
                        <p className="text-sm text-gray-400 mt-2">PDF, DOC, or DOCX (Max 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex-grow h-px bg-gray-700"></div>
                  <p className="px-4 text-gray-400">OR</p>
                  <div className="flex-grow h-px bg-gray-700"></div>
                </div>
                
                <textarea 
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded p-4 h-64 mb-4"
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                ></textarea>
                
                <button 
                  onClick={optimizeResume}
                  className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700"
                  disabled={isLoading.optimize || !resume}
                >
                  {isLoading.optimize ? "Analyzing..." : "Optimize Resume"}
                </button>
                
                {optimizationSuggestions && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-white">Optimization Tips:</h3>
                    <div className="bg-gray-800 border border-gray-700 p-6 rounded">
                      <div className="whitespace-pre-line text-gray-300">
                        {optimizationSuggestions}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Matches Tab */}
          {activeTab === 'matches' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Your Job Matches</h2>
              
              {matches.length === 0 ? (
                <div className="bg-gray-900 p-8 rounded text-center">
                  <p className="text-gray-400">No job matches yet. Search for jobs and use the "Match with Resume" button to see your matches.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.map((match, index) => {
                    const job = getJobById(match.job_id);
                    if (!job) return null;
                    
                    return (
                      <div key={index} className="bg-gray-900 p-6 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-blue-400">{job.title}</h3>
                            <p className="text-gray-300">{job.company?.display_name}</p>
                            <p className="text-gray-400 text-sm">{job.location?.display_name}</p>
                          </div>
                          <div className="ml-4">
                            <div className={`text-white font-bold text-xl rounded-full w-20 h-20 flex items-center justify-center
                              ${match.match >= 80 ? 'bg-green-600' : 
                                match.match >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`}>
                              {match.match}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-green-400 mb-2">Strengths:</h4>
                            <p className="bg-gray-800 border border-green-900 p-4 rounded text-gray-300">{match.strengths || "None specified"}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-red-400 mb-2">Areas to improve:</h4>
                            <p className="bg-gray-800 border border-red-900 p-4 rounded text-gray-300">{match.weaknesses || "None specified"}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <a 
                            href={job.redirect_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                          >
                            Apply Now
                          </a>
                          <span className="text-gray-400 text-sm">Posted: {job.created || 'Recently'}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}