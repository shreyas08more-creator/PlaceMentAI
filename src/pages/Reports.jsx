import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, MessageSquare, Target, BarChart3, RefreshCw, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "../services/supabase";

export default function Reports() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [reports, setReports] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchDatabaseStatus = async () => {
    setIsSyncing(true);
    
    try {
      const { count: resumeCount } = await supabase.from('resume_growth').select('*', { count: 'exact', head: true });
      const { count: interviewCount } = await supabase.from('interview_performance').select('*', { count: 'exact', head: true });
      const { count: statsCount } = await supabase.from('user_stats').select('*', { count: 'exact', head: true });

      const history = [
        {
          id: "resume",
          type: "resume",
          title: "Resume Review Report",
          description: resumeCount > 0 ? "Resume structure successfully analyzed." : "No resume data found in database.",
          status: resumeCount > 0 ? "Ready" : "Inactive",
          color: resumeCount > 0 ? "text-emerald-400" : "text-zinc-500",
          bg: resumeCount > 0 ? "bg-emerald-500/10" : "bg-zinc-900",
          icon: FileText,
          route: "/resume"
        },
        {
          id: "interview",
          type: "interview",
          title: "Interview Feedback",
          description: interviewCount > 0 ? "Conversation logs and grading ready." : "No interview logs detected in database.",
          status: interviewCount > 0 ? "Ready" : "Inactive",
          color: interviewCount > 0 ? "text-purple-400" : "text-zinc-500",
          bg: interviewCount > 0 ? "bg-purple-500/10" : "bg-zinc-900",
          icon: MessageSquare,
          route: "/interview"
        },
        {
          id: "skills",
          type: "skillgap",
          title: "Skill Gap Insights",
          description: "Priority development targets identified.", 
          status: "Ready", 
          color: "text-amber-400",
          bg: "bg-amber-500/10",
          icon: Target,
          route: "/skills"
        },
        {
          id: "analytics",
          type: "analytics",
          title: "Performance Overview",
          description: statsCount > 0 ? "System telemetry and trend analysis active." : "Awaiting user activity logs.",
          status: statsCount > 0 ? "Live" : "Inactive",
          color: statsCount > 0 ? "text-cyan-400" : "text-zinc-500",
          bg: statsCount > 0 ? "bg-cyan-500/10" : "bg-zinc-900",
          icon: BarChart3,
          route: "/analytics"
        }
      ];

      setReports(history);
    } catch (err) {
      console.error("Error fetching reports status:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchDatabaseStatus();
  }, []);

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
        
        <button onClick={fetchDatabaseStatus} className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-lg text-xs font-medium transition-all">
          <RefreshCw className={`w-3 h-3 ${isSyncing ? "animate-spin" : ""}`} /> Sync Database
        </button>
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