import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, FileText, Mic, Target, Trophy, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    stats: { resumeReports: 0, totalInterviews: 0, avgAtsScore: 0, bestScore: 0 },
    resumeData: [],
    interviewData: []
  });

  useEffect(() => {
    // Replace '/api/analytics' with your actual backend endpoint
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/analytics');
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button 
          onClick={() => navigate("/dashboard")} 
          className="flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-cyan-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Analytics Dashboard</h1>
            <p className="text-zinc-400 text-sm">Live data stream connected to your performance metrics.</p>
          </div>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
            <Mail className="w-4 h-4 text-cyan-400" /> Email Analytics Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Resume Reports", value: analytics.stats.resumeReports, icon: FileText, color: "text-blue-400" },
          { label: "Total Interviews", value: analytics.stats.totalInterviews, icon: Mic, color: "text-purple-400" },
          { label: "Average ATS Score", value: analytics.stats.avgAtsScore, icon: Target, color: "text-emerald-400" },
          { label: "Best Resume Score", value: analytics.stats.bestScore, icon: Trophy, color: "text-amber-400" },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div className={`mb-4 p-2 w-fit rounded-lg bg-zinc-950 border border-zinc-800 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-zinc-400 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{loading ? "..." : stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6">
        {loading ? (
          <div className="h-[150] flex items-center justify-center text-zinc-500">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <>
            {/* Resume Growth Chart */}
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold mb-6">Resume Growth</h2>
              <div className="h-[75] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.resumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Interview Performance Chart */}
            <div className="bg-zinc-900/40 border border-zinc-900 p-6 rounded-2xl shadow-xl">
              <h2 className="text-lg font-semibold mb-6">Interview Performance</h2>
              <div className="h-[75] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.interviewData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" axisLine={false} tickLine={false} domain={[0, 10]} />
                    <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}