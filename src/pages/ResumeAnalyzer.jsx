import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, FileText, Upload, ShieldCheck, CheckCircle2, 
  AlertCircle, X, Award, Target, FileSearch, TrendingUp 
} from "lucide-react";

export default function ResumeAnalyzer() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Waiting for file upload.");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [report, setReport] = useState(null);

  const handleContainerClick = () => {
    if (!isProcessing) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setIsProcessing(true);
      setIsComplete(false);
      setReport(null);
      setStatus(`Analyzing: ${uploadedFile.name}...`);

      setTimeout(() => {
        setIsProcessing(false);
        setIsComplete(true);
        setStatus("Analysis Complete. See your results below.");
        
        setReport({
          score: 78,
          readability: "Optimal",
          foundKeywords: ["React", "Node.js", "PostgreSQL", "REST APIs", "Agile"],
          missingKeywords: ["Docker", "GraphQL", "CI/CD", "System Design"],
          structuralIssues: [
            "Action verbs missing in 2 bullet points under 'Experience'.",
            "Quantifiable metrics absent in your most recent role.",
            "Summary section exceeds recommended length (max 3-4 lines)."
          ],
          recommendations: [
            "Inject metrics: Instead of 'Improved performance', use 'Improved render speeds by 40%'.",
            "Add a 'Projects' section to explicitly highlight practical technical experience.",
            "Reformat dates to a standard MM/YYYY format for better readability."
          ]
        });
      }, 3000);
    }
  };

  const resetAnalyzer = () => {
    setFile(null);
    setStatus("Waiting for file upload.");
    setIsProcessing(false);
    setIsComplete(false);
    setReport(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans text-left">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
        <div>
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 m-0">Resume Analyzer</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
        
        {/* Upload Control */}
        <div className="md:col-span-1 bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex flex-col min-h-80 shadow-xl sticky top-6">
            <h3 className="text-sm font-semibold text-zinc-200 mb-4">Upload Resume</h3>
            
            {file ? (
                <div className="flex-1 border border-emerald-500/30 bg-emerald-500/5 rounded-lg flex flex-col items-center justify-center gap-2 p-4">
                    <FileText className="w-8 h-8 text-emerald-400" />
                    <p className="text-xs text-emerald-300 font-mono truncate max-w-full text-center">{file.name}</p>
                    <button onClick={resetAnalyzer} className="mt-2 text-zinc-500 hover:text-red-400 cursor-pointer" disabled={isProcessing}>
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div 
                  onClick={handleContainerClick}
                  className="flex-1 border-2 border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-emerald-500/50 transition-colors"
                >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept=".pdf,.docx" 
                      onChange={handleFileChange} 
                    />
                    <Upload className="w-8 h-8 text-zinc-600" />
                    <p className="text-xs text-zinc-500 max-w-50 text-center leading-relaxed px-4">
                        Click to upload your resume (PDF/DOCX)
                    </p>
                </div>
            )}
        </div>

        {/* Results Area */}
        <div className="md:col-span-3 flex flex-col gap-6">
            
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-5 flex items-center justify-between shadow-xl">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-200">Current Status</h3>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">{status}</p>
                </div>
                <div className="flex gap-2">
                     <span className="px-3 py-1 bg-zinc-950 border border-zinc-900 rounded-full text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-amber-500 animate-pulse' : isComplete ? 'bg-emerald-500' : 'bg-zinc-600'}`} /> 
                        {isProcessing ? 'SCANNING...' : isComplete ? 'COMPLETE' : 'READY'}
                     </span>
                </div>
            </div>

            {isProcessing && (
                <div className="bg-zinc-900/20 border border-zinc-900 border-dashed rounded-xl p-12 flex flex-col items-center justify-center min-h-96">
                   <FileSearch className="w-10 h-10 text-amber-500/50 animate-pulse mb-4" />
                   <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Scanning your resume...</p>
                </div>
            )}

            {isComplete && report && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 shadow-xl flex flex-col justify-between">
                            <div className="flex items-center gap-2 text-zinc-400 mb-6">
                                <Award className="w-4 h-4 text-emerald-400" />
                                <h4 className="text-sm font-medium text-zinc-200">Resume Strength Score</h4>
                            </div>
                            <div className="flex items-end gap-4 mb-4">
                                <span className={`text-6xl font-bold tracking-tighter ${report.score >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                    {report.score}
                                </span>
                                <span className="text-zinc-500 font-mono text-sm mb-2">/ 100</span>
                            </div>
                            <div className="w-full bg-zinc-950 rounded-full h-2 border border-zinc-800">
                                <div className={`h-full rounded-full ${report.score >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${report.score}%` }}></div>
                            </div>
                            <p className="text-xs text-zinc-500 mt-4 font-mono uppercase tracking-wide">
                                Overall Readability: <span className="text-zinc-300">{report.readability}</span>
                            </p>
                        </div>

                        <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 shadow-xl">
                            <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                <Target className="w-4 h-4 text-cyan-400" />
                                <h4 className="text-sm font-medium text-zinc-200">Keywords</h4>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Skills Found</p>
                                    <div className="flex flex-wrap gap-2">
                                        {report.foundKeywords.map((kw, i) => (
                                            <span key={i} className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-md">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Missing Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {report.missingKeywords.map((kw, i) => (
                                            <span key={i} className="px-2 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-md">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                    <AlertCircle className="w-4 h-4 text-red-400" />
                                    <h4 className="text-sm font-medium text-zinc-200">Layout & Structure</h4>
                                </div>
                                <ul className="space-y-3">
                                    {report.structuralIssues.map((issue, i) => (
                                        <li key={i} className="flex gap-3 text-xs text-zinc-400 leading-relaxed">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500/50 shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                    <h4 className="text-sm font-medium text-zinc-200">Improvement Tips</h4>
                                </div>
                                <ul className="space-y-3">
                                    {report.recommendations.map((rec, i) => (
                                        <li key={i} className="flex gap-3 text-xs text-zinc-400 leading-relaxed">
                                            <div className="mt-1 flex items-center justify-center shrink-0">
                                               <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                            </div>
                                            {rec}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isProcessing && !isComplete && (
                <div className="bg-zinc-900/10 border border-zinc-900 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center min-h-96">
                    <ShieldCheck className="w-8 h-8 text-zinc-700 mb-3" />
                    <h3 className="text-sm font-medium text-zinc-400 mb-1">Upload to start</h3>
                    <p className="text-xs text-zinc-500 max-w-sm">Upload your resume to get feedback on your score, keywords, and layout.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}