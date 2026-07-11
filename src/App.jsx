import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./services/supabase";
import ProtectedRoute from "./components/ProtectedRoute";
import { Cpu } from "lucide-react";

// Synchronize with layout style frameworks at the root of /src
import "./App.css";

// Application Route Workspace Manifest
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import InterviewBot from "./pages/InterviewBot";
import SkillGap from "./pages/SkillGap";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      {/* 
        Conditional Top-Bar Matrix: 
        Only visible when an active enterprise verification session exists.
      */}
      {session && (
        <header className="global-app-header">
          <div className="header-brand-group">
            <div className="header-brand-icon">
              <Cpu size={15} strokeWidth={2.5} />
            </div>
            <span className="header-brand-text">Placement.ai</span>
          </div>
          
          <div className="system-status-indicator">
            <div className="status-node-pulse" />
            <span>Secure Node Connected</span>
          </div>
        </header>
      )}

      {/* Main Framework Content Body Panel */}
      <div className={`main-app-container ${!session ? "full-viewport" : ""}`}>
        <Routes>
          {/* Public Gateway Vector */}
          <Route path="/" element={<Login />} />

          {/* Secure Route Implementations */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute session={session}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resume"
            element={
              <ProtectedRoute session={session}>
                <ResumeAnalyzer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview"
            element={
              <ProtectedRoute session={session}>
                <InterviewBot />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skills"
            element={
              <ProtectedRoute session={session}>
                <SkillGap />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <ProtectedRoute session={session}>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoute session={session}>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Global Mismatch Routing Reset Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;