import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  MessageSquare, 
  Target, 
  LineChart, 
  Terminal, 
  Cpu, 
  Activity, 
  Layers, 
  LogOut,
  FileArchive 
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const modules = [
    { 
      title: "Resume Analyzer", 
      desc: "Upload and analyze your resume to find improvements and check your ATS match rating.", 
      path: "/resume", 
      icon: <FileText className="w-5 h-5 text-purple-400" />, 
      tag: "Resume Tracker" 
    },
    { 
      title: "Interview Bot", 
      desc: "Practice realistic mock interviews with interactive voice or text AI evaluations.", 
      path: "/interview", 
      icon: <MessageSquare className="w-5 h-5 text-cyan-400" />, 
      tag: "Interview Practice" 
    },
    { 
      title: "Skill Gap Analyzer", 
      desc: "Compare your current skills against target jobs to see what you need to learn next.", 
      path: "/skills", 
      icon: <Target className="w-5 h-5 text-emerald-400" />, 
      tag: "Skill Mapping" 
    },
    { 
      title: "Performance Analytics", 
      desc: "Track your overall preparation progress, test scores, and performance over time.", 
      path: "/analytics", 
      icon: <LineChart className="w-5 h-5 text-amber-400" />, 
      tag: "Dashboard Stats" 
    },
    { 
      title: "Reports Archive", 
      desc: "Look back at all your past resume reviews, interview histories, and saved progress files.", 
      path: "/reports", 
      icon: <FileArchive className="w-5 h-5 text-rose-400" />, 
      tag: "Saved Records" 
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans selection:bg-purple-500/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-purple-400 uppercase mb-1">
            <Terminal className="w-3.5 h-3.5" /> Workspace // Hub Overview
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 m-0 text-left">Placement & Interview Prep Dashboard</h1>
        </div>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wide text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer">
          <LogOut className="w-3.5 h-3.5" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto text-left">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2 px-1">
            <Layers className="w-3.5 h-3.5" /> Core Tools
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod, index) => (
              <div key={index} onClick={() => navigate(mod.path)} className="group relative flex flex-col justify-between p-5 bg-zinc-900/40 border border-zinc-900 rounded-xl hover:border-zinc-800 hover:bg-zinc-900/90 transition-all duration-300 cursor-pointer shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-800/60 rounded-lg">{mod.icon}</div>
                    <span className="text-[10px] font-mono tracking-wider text-zinc-500 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-md uppercase">{mod.tag}</span>
                  </div>
                  <h3 className="text-base font-medium text-zinc-200 group-hover:text-zinc-50 transition-colors mb-2">{mod.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-zinc-950/40 flex items-center justify-end text-xs font-mono text-zinc-500 group-hover:text-purple-400">Start &rarr;</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2 px-1">
              <Cpu className="w-3.5 h-3.5" /> Platform Briefing
            </div>
            <div className="p-5 bg-linear-to-b from-zinc-900/80 to-zinc-900/20 border border-zinc-900 rounded-xl shadow-xl">
              <p className="text-xs text-zinc-400 leading-relaxed">Welcome to your preparation dashboard. Use our built-in tools to improve your resume, run mock practice interviews, find missing target skills, and follow your preparation journey over time.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase flex items-center gap-2 px-1">
              <Activity className="w-3.5 h-3.5" /> Live Status
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900 rounded-xl divide-y divide-zinc-950 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-zinc-900/10"><span className="text-xs text-zinc-400 font-mono">Available Modules</span><span className="text-xl font-semibold font-mono text-purple-400">05</span></div>
              <div className="flex items-center justify-between p-4 bg-zinc-900/10"><span className="text-xs text-zinc-400 font-mono">Practice Question Pool</span><span className="text-xl font-semibold font-mono text-cyan-400">100+</span></div>
              <div className="flex items-center justify-between p-4 bg-zinc-900/10"><span className="text-xs text-zinc-400 font-mono">System Availability</span><div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-xl font-semibold font-mono text-emerald-400">Active</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}