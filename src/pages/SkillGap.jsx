import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Terminal, Cpu, Target, Sparkles, Sliders, RefreshCw, Paperclip } from "lucide-react";

export default function SkillGap() {
  const navigate = useNavigate();
  
  const [jobDescription, setJobDescription] = useState(() => localStorage.getItem("sg_description") || "");
  const [showMatrix, setShowMatrix] = useState(() => localStorage.getItem("sg_show_matrix") === "true");
  const [analysisData, setAnalysisData] = useState(() => {
    const saved = localStorage.getItem("sg_analysis_data");
    return saved ? JSON.parse(saved) : [];
  });
  const [roadmap, setRoadmap] = useState(() => {
    return localStorage.getItem("sg_roadmap") || "Submit a job description to get a personalized learning plan.";
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    localStorage.setItem("sg_description", jobDescription);
  }, [jobDescription]);

  useEffect(() => {
    localStorage.setItem("sg_show_matrix", showMatrix);
    localStorage.setItem("sg_analysis_data", JSON.stringify(analysisData));
    localStorage.setItem("sg_roadmap", roadmap);
  }, [showMatrix, analysisData, roadmap]);

  const executeAnalysis = (e) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsProcessing(true);
    setShowMatrix(false);
    
    setTimeout(() => {
      const lowerInput = jobDescription.toLowerCase();
      
      let calculatedMetrics = [
        { name: "System Architecture", current: 45, target: 90, state: "Needs Attention", color: "text-red-400", bar: "bg-red-500" },
        { name: "Containerization", current: 30, target: 80, state: "Focus Area", color: "text-amber-400", bar: "bg-amber-500" },
        { name: "Real-time Processing", current: 65, target: 85, state: "Developing", color: "text-cyan-400", bar: "bg-cyan-500" },
        { name: "Deployment Verification", current: 80, target: 85, state: "Proficient", color: "text-emerald-400", bar: "bg-emerald-500" }
      ];

      let generatedRoadmap = "Based on the requirements, we recommend starting with a containerization course, followed by a review of microservices architecture patterns.";

      if (lowerInput.includes("frontend") || lowerInput.includes("react") || lowerInput.includes("typescript")) {
        calculatedMetrics = [
          { name: "State Management", current: 75, target: 95, state: "Focus Area", color: "text-amber-400", bar: "bg-amber-500" },
          { name: "TypeScript", current: 85, target: 90, state: "Proficient", color: "text-emerald-400", bar: "bg-emerald-500" },
          { name: "Async Rendering", current: 40, target: 85, state: "Needs Attention", color: "text-red-400", bar: "bg-red-500" },
          { name: "Component Testing", current: 60, target: 75, state: "Developing", color: "text-cyan-400", bar: "bg-cyan-500" }
        ];
        generatedRoadmap = "To improve your frontend profile, focus on mastering asynchronous rendering techniques and optimizing state management patterns.";
      } else if (lowerInput.includes("backend") || lowerInput.includes("database") || lowerInput.includes("api")) {
        calculatedMetrics = [
          { name: "Query Optimization", current: 35, target: 90, state: "Needs Attention", color: "text-red-400", bar: "bg-red-500" },
          { name: "Concurrency", current: 50, target: 80, state: "Focus Area", color: "text-amber-400", bar: "bg-amber-500" },
          { name: "API Design", current: 70, target: 85, state: "Developing", color: "text-cyan-400", bar: "bg-cyan-500" },
          { name: "Session Security", current: 90, target: 90, state: "Proficient", color: "text-emerald-400", bar: "bg-emerald-500" }
        ];
        generatedRoadmap = "For backend roles, we recommend prioritizing database query optimization and learning advanced caching strategies.";
      }

      setAnalysisData(calculatedMetrics);
      setRoadmap(generatedRoadmap);
      setIsProcessing(false);
      setShowMatrix(true);
    }, 2000);
  };

  const resetAnalysis = () => {
    localStorage.removeItem("sg_description");
    localStorage.removeItem("sg_show_matrix");
    localStorage.removeItem("sg_analysis_data");
    localStorage.removeItem("sg_roadmap");
    setJobDescription("");
    setShowMatrix(false);
    setAnalysisData([]);
    setRoadmap("Submit a job description to get a personalized learning plan.");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans text-left">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
        <div>
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-2 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 m-0">Skill Gap Analyzer</h1>
        </div>
        <button 
          onClick={resetAnalysis}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-2"
        >
          <RefreshCw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto items-stretch">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2 px-1">
            <Terminal className="w-3.5 h-3.5" /> Input
          </div>
          <form onSubmit={executeAnalysis} className="flex-1 bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between min-h-[100] shadow-xl">
            <div className="flex-1 flex flex-col gap-3 mb-6">
              <label className="text-[11px] font-mono uppercase text-zinc-400 tracking-wide">Job Description</label>
              <textarea 
                value={jobDescription} 
                onChange={(e) => setJobDescription(e.target.value)} 
                placeholder="Paste the job requirements here..." 
                className="w-full flex-1 min-h-[50] bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs font-mono text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isProcessing || !jobDescription.trim()} 
              className="w-full py-3.5 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-zinc-300 hover:text-emerald-400 disabled:opacity-40 rounded-xl font-mono text-xs tracking-wider uppercase font-medium transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Cpu className={`w-4 h-4 ${isProcessing ? "animate-spin text-emerald-400" : ""}`} />
              {isProcessing ? "Analyzing..." : "Analyze Skills"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2 px-1">
            <Sliders className="w-3.5 h-3.5" /> Results
          </div>
          
          {isProcessing ? (
            <div className="flex-1 bg-zinc-900/20 border border-zinc-900 rounded-xl flex flex-col items-center justify-center gap-4 min-h-[100]">
              <div className="flex items-end gap-1 h-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <p className="text-xs font-mono text-zinc-400 tracking-wide animate-pulse">Analyzing your skills...</p>
            </div>
          ) : showMatrix ? (
            <div className="flex-1 flex flex-col gap-4 animate-in fade-in duration-500">
              <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 space-y-5 shadow-xl">
                {analysisData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-zinc-200">{skill.name}</span>
                      <span className={`text-[10px] font-mono tracking-wide px-2 py-0.5 bg-zinc-950 border border-zinc-900 rounded uppercase font-semibold ${skill.color}`}>
                        {skill.state}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-zinc-950 rounded-full relative overflow-hidden border border-zinc-900">
                      <div className="absolute top-0 bottom-0 w-0.5 bg-zinc-700 z-10" style={{ left: `${skill.target}%` }} />
                      <div className={`h-full rounded-full transition-all duration-1000 ${skill.bar}`} style={{ width: `${skill.current}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                      <span>Level: {skill.current}%</span><span>Target: {skill.target}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-5 bg-linear-to-b from-zinc-900/80 to-zinc-900/20 border border-zinc-900 rounded-xl shadow-xl">
                <div className="flex items-center gap-2 text-xs font-mono tracking-wide text-zinc-300 mb-3">
                  <Paperclip className="w-4 h-4 text-emerald-400" /> Learning Roadmap
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {roadmap}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center min-h-[100]">
              <Target className="w-8 h-8 text-zinc-700 mb-3" />
              <h3 className="text-sm font-medium text-zinc-400 mb-1">Waiting for input</h3>
              <p className="text-xs text-zinc-500 max-w-xs">
                Paste the job requirements to generate your skill gap analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}