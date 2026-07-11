import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, FileText, MessageSquare, Target, BarChart3, 
  RefreshCw, Layers, CheckCircle2, AlertCircle 
} from "lucide-react";

export default function Reports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const compileReports = () => {
    setIsSyncing(true);
    
    // Slight delay to simulate a fresh database read
    setTimeout(() => {
      const history = [];

      // Resume Check
      const resumeData = localStorage.getItem("ra_parsed_data") || localStorage.getItem("resume_analysis");
      history.push({
        id: "resume",
        type: "resume",
        title: "Resume Review Report",
        description: resumeData ? "Resume structure successfully analyzed." : "No resume data found.",
        status: resumeData ? "Ready" : "Inactive",
        color: resumeData ? "text-emerald-400" : "text-zinc-500",
        bg: resumeData ? "bg-emerald-500/10" : "bg-zinc-900",
        icon: FileText,
        route: "/resume"
      });

      // Interview Check
      const interviewSession = localStorage.getItem("ib_transcript") || localStorage.getItem("interview_session");
      history.push({
        id: "interview",
        type: "interview",
        title: "Interview Feedback",
        description: interviewSession ? "Conversation logs and grading ready." : "No interview logs detected.",
        status: interviewSession ? "Ready" : "Inactive",
        color: interviewSession ? "text-purple-400" : "text-zinc-500",
        bg: interviewSession ? "bg-purple-500/10" : "bg-zinc-900",
        icon: MessageSquare,
        route: "/interview"
      });

      // Skill Gap Check
      const skillGapData = localStorage.getItem("sg_analysis_data");
      history.push({
        id: "skills",
        type: "skillgap",
        title: "Skill Gap Insights",
        description: skillGapData ? "Priority development targets identified." : "No skill analysis requirements set.",
        status: skillGapData ? "Ready" : "Inactive",
        color: skillGapData ? "text-amber-400" : "text-zinc-500",
        bg: skillGapData ? "bg-amber-500/10" : "bg-zinc-900",
        icon: Target,
        route: "/skills"
      });

      // Analytics Check
      const analyticsMetrics = localStorage.getItem("pa_metrics");
      history.push({
        id: "analytics",
        type: "analytics",
        title: "Performance Overview",
        description: analyticsMetrics ? "System telemetry and trend analysis." : "Awaiting user activity logs.",
        status: analyticsMetrics ? "Live" : "Inactive",
        color: analyticsMetrics ? "text-cyan-400" : "text-zinc-500",
        bg: analyticsMetrics ? "bg-cyan-500/10" : "bg-zinc-900",
        icon: BarChart3,
        route: "/analytics"
      });

      setReports(history);
      setIsSyncing(false);
    }, 600);
  };

  useEffect(() => {
    compileReports();
  }, []);

  const clearData = () => {
    const keys = ["ra_parsed_data", "resume_analysis", "ib_transcript", "interview_session", "sg_analysis_data", "pa_metrics"];
    keys.forEach(key => localStorage.removeItem(key));
    compileReports();
  };

  const filteredReports = activeTab === "all" 
    ? reports 
    : reports.filter(r => r.type === activeTab);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto border-b border-zinc-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-cyan-400 transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-white">Your Activity Reports</h1>
        </div>
        
        <div className="flex gap-3">
          <button onClick={compileReports} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium transition-all">
            <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin" : ""}`} /> Sync
          </button>
          <button onClick={clearData} className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-900/50 hover:text-red-400 rounded-lg text-xs font-medium transition-all">
            Reset Data
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-3 space-y-2">
          <div className="text-[10px] font-bold tracking-wider text-zinc-600 uppercase px-3 mb-2 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5" /> Navigation
          </div>
          {[
            { id: "all", label: "All Activity" },
            { id: "resume", label: "Resume Reports" },
            { id: "interview", label: "Interview Feedback" },
            { id: "skillgap", label: "Skill Analysis" },
            { id: "analytics", label: "Performance Summary" }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3 text-xs font-medium rounded-lg transition-all border ${activeTab === tab.id ? "bg-zinc-900 border-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300 border-transparent"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="col-span-9 space-y-4">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-zinc-900/40 border border-zinc-900 p-5 rounded-xl flex items-center justify-between hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${report.bg} ${report.color}`}>
                  <report.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{report.title}</h3>
                  <p className="text-xs text-zinc-400 mt-1">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`text-[10px] font-bold uppercase flex items-center gap-1.5 ${report.color}`}>
                  {report.status === "Ready" || report.status === "Live" ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  {report.status}
                </span>
                <button onClick={() => navigate(report.route)} className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}