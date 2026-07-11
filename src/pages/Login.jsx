import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { supabase } from "../services/supabase";
import { Terminal, Lock, Cpu, ShieldCheck, UserPlus, LogIn } from "lucide-react";

export default function Login() {
  const navigate = useNavigate(); // 2. Initialize navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) alert(error.message);
      else alert("Check your email for the verification link.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        alert(error.message);
      } else {
        // 3. This triggers the redirect to your dashboard
        navigate("/dashboard"); 
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6 font-sans selection:bg-purple-500/30">
      
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
            <Cpu className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight mb-2">Placement.ai</h1>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
          Secure Assessment Node // {isSignUp ? "Registration" : "Access"}
        </p>
      </div>

      <div className="w-full max-w-sm bg-zinc-900/40 border border-zinc-900 p-8 rounded-xl shadow-2xl backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              System Identification (Email)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-colors"
              placeholder="operator@placement.ai"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              Access Credentials (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-purple-500/50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            {loading ? (
              <Terminal className="w-4 h-4 animate-spin" />
            ) : isSignUp ? (
              <><UserPlus className="w-3.5 h-3.5" /> Initialize New Account</>
            ) : (
              <><LogIn className="w-3.5 h-3.5" /> Establish Connection</>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800 text-center">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[11px] font-mono text-zinc-400 hover:text-purple-400 transition-colors"
          >
            {isSignUp ? "Already have an access node? Login here." : "Need a new account? Sign up."}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" />
            256-BIT ENCRYPTION ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}