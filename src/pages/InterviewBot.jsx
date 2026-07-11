import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Send, Bot, User, ShieldCheck, Mic, MicOff, 
  Activity, Brain, Target, MessageSquare, TrendingUp 
} from "lucide-react";

// Sequential interview questions
const INTERVIEW_QUESTION_POOL = [
  "Let's get started. Could you describe a recent complex system or project you designed?",
  "How did you approach potential issues like race conditions or data synchronization?",
  "How did you optimize your database queries or caching strategies to reduce latency?",
  "Tell me about a time you handled a failure in a critical system component. How did you ensure resilience?",
  "If you had to rebuild that system from scratch today, what is the single biggest change you would make?",
  "Practice session complete. Great job! Review your performance metrics on the right."
];

export default function InterviewBot() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("bot_session_step");
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("bot_session_messages");
    return saved ? JSON.parse(saved) : [
      { sender: "bot", text: INTERVIEW_QUESTION_POOL[0] }
    ];
  });
  
  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem("bot_session_metrics");
    return saved ? JSON.parse(saved) : null;
  });

  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("bot_session_messages", JSON.stringify(messages));
    localStorage.setItem("bot_session_step", currentStep.toString());
  }, [messages, currentStep]);

  useEffect(() => {
    if (metrics) localStorage.setItem("bot_session_metrics", JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        setInput(event.results[0][0].transcript);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition is not supported in this browser.");
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
  };

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    setTimeout(() => {
      const nextStep = Math.min(currentStep + 1, INTERVIEW_QUESTION_POOL.length - 1);
      setCurrentStep(nextStep);

      setMessages((prev) => [
        ...prev, 
        { sender: "bot", text: INTERVIEW_QUESTION_POOL[nextStep] }
      ]);
      
      const keywordVariations = [
        ["Architecture", "Scalability", "Throughput", "Latency"],
        ["Concurrency", "Deadlocks", "Race Conditions", "Mutex"],
        ["Redis", "Indexing", "Optimization", "Sharding"],
        ["Circuit Breaker", "Failover", "Degradation", "Resilience"],
        ["Refactoring", "Microservices", "Decoupling", "Technical Debt"]
      ];

      const currentKeywordSet = keywordVariations[Math.min(currentStep, keywordVariations.length - 1)];

      setMetrics({
        technicalScore: Math.floor(Math.random() * 12) + 84, 
        clarityScore: Math.floor(Math.random() * 15) + 80,
        keywords: currentKeywordSet,
        feedback: nextStep === INTERVIEW_QUESTION_POOL.length - 1 
          ? "Great session. You demonstrated strong knowledge of system architecture and resilience patterns."
          : `Good answer. Continue providing specific examples to improve your score on key topics.`
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const resetSession = () => {
    localStorage.removeItem("bot_session_messages");
    localStorage.removeItem("bot_session_metrics");
    localStorage.removeItem("bot_session_step");
    setCurrentStep(0);
    setMetrics(null);
    setMessages([{ sender: "bot", text: INTERVIEW_QUESTION_POOL[0] }]);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans text-left">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-6 mb-8">
        <div>
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors mb-2 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 m-0">Interview Practice</h1>
        </div>
        <button 
          onClick={resetSession}
          className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 text-xs font-mono rounded-lg transition-all cursor-pointer"
        >
          Reset Session
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
        <div className="lg:col-span-2 bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 flex flex-col shadow-xl h-[150]">
          <div className="w-full flex items-center justify-between mb-6 pb-4 border-b border-zinc-900">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-zinc-200">Practice Session</h2>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Ready to practice</p>
                </div>
             </div>
             <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-mono bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure
             </div>
          </div>

          <div className="flex-1 bg-zinc-900/30 border border-zinc-900 rounded-xl flex flex-col shadow-xl overflow-hidden mb-4">
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'bot' && (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-cyan-500/20">
                                <Bot className="w-4 h-4 text-cyan-400" />
                            </div>
                        )}
                        <div className={`p-4 rounded-xl max-w-[80%] text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-600/20 border border-cyan-500/20 text-cyan-100 rounded-tr-none' : 'bg-zinc-800/50 border border-zinc-800 text-zinc-300 rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                        {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-zinc-400" />
                            </div>
                        )}
                    </div>
                ))}
                
                {isProcessing && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-cyan-500/20">
                            <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-800 text-zinc-400 rounded-tl-none flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-cyan-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
          </div>

          <div className="flex gap-2">
              <button 
                  onClick={toggleListening}
                  className={`p-4 rounded-xl border transition-all cursor-pointer shadow-lg ${isListening ? 'bg-red-500/20 border-red-500/50 text-red-400 animate-pulse' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30'}`}
              >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isProcessing || currentStep === INTERVIEW_QUESTION_POOL.length - 1}
                  placeholder={isListening ? "Listening..." : currentStep === INTERVIEW_QUESTION_POOL.length - 1 ? "Session complete." : "Type your answer..."}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-sm text-zinc-200 focus:outline-none focus:border-cyan-500/50 disabled:opacity-40"
              />
              
              <button 
                  onClick={handleSend}
                  disabled={isProcessing || !input.trim() || currentStep === INTERVIEW_QUESTION_POOL.length - 1}
                  className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-40 shadow-lg"
              >
                  <Send className="w-4 h-4" /> Send
              </button>
          </div>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6 sticky top-6">
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-6 shadow-xl h-[150]">
                <div className="flex items-center gap-2 text-zinc-400 mb-6 pb-4 border-b border-zinc-900">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-semibold text-zinc-200">Performance Summary</h3>
                </div>

                {metrics ? (
                    <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-2">
                                    <Brain className="w-3.5 h-3.5 text-emerald-400" /> Technical Proficiency
                                </span>
                                <span className="text-sm font-bold text-zinc-200">{metrics.technicalScore}%</span>
                            </div>
                            <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-800 overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${metrics.technicalScore}%` }} />
                            </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-mono text-zinc-400 uppercase flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Communication
                                </span>
                                <span className="text-sm font-bold text-zinc-200">{metrics.clarityScore}%</span>
                            </div>
                            <div className="w-full bg-zinc-900 rounded-full h-1.5 border border-zinc-800 overflow-hidden">
                                <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${metrics.clarityScore}%` }} />
                            </div>
                        </div>

                        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase mb-3">
                                <Target className="w-3.5 h-3.5 text-amber-400" /> Key Concepts Covered
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {metrics.keywords.map((kw, i) => (
                                    <span key={i} className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] uppercase font-mono rounded">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 flex-1">
                            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase mb-3">
                                <TrendingUp className="w-3.5 h-3.5" /> AI Feedback
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                                {metrics.feedback}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                        <Brain className="w-12 h-12 text-zinc-600 mb-4" />
                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Ready to start</h4>
                        <p className="text-xs text-zinc-500 max-w-50">
                            Metrics will appear here as you answer questions.
                        </p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}