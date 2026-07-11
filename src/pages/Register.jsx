import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, Terminal, ArrowRight } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsProcessing(true);

    // Bypassed email verification roadmap entirely
    setTimeout(() => {
      setIsProcessing(false);
      localStorage.setItem("auth_token", "session_active_" + Date.now());
      navigate("/dashboard"); // Auto-route directly to mainframe dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Branding Node */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter text-zinc-100 m-0 font-mono">
            Placement<span className="text-cyan-500">.ai</span>
          </h1>
          <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" /> Secure Assessment Node // Registration
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 left-0 right-0 h-[px] bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
          
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Operator Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Operator Identity</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Alex Mercer"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
                <UserPlus className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Ingestion Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Communication Ingestion Endpoint (Email)</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@domain.com"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
                <Mail className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Cryptographic Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider">Cryptographic Handshake Key (Password)</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-cyan-500/40 transition-colors"
                />
                <Lock className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Execution Control */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 mt-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-zinc-900 text-white disabled:text-zinc-600 rounded-xl font-medium text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed border disabled:border-zinc-800/80 border-transparent"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                  Generating System Profile...
                </>
              ) : (
                <>
                  Initialize Profile Core <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <p className="text-center text-xs text-zinc-600">
          Already mapped to the system?{" "}
          <button 
            type="button"
            onClick={() => navigate("/login")} 
            className="text-cyan-500/80 hover:text-cyan-400 font-medium underline underline-offset-4 cursor-pointer bg-transparent border-none p-0"
          >
            Authorize Session
          </button>
        </p>

      </div>
    </div>
  );
}