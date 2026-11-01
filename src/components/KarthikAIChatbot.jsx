import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, FileText, ArrowRight, Sparkles } from 'lucide-react';

export default function KarthikAIChatbot({ onTriggerContact, onTriggerResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Karthik's AI assistant. How can I help you explore his work, experience, or collaborate today?",
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleUserReply = (option) => {
    const userMsg = {
      sender: 'user',
      text: option,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let botText = "";
      let actionType = null;

      switch (option) {
        case '👔 Recruiter / Hiring':
          botText = "Great to connect! Karthik specializes in Community Building, Event Operations, Web Development (React/Next.js/Supabase), and Content Strategy. Would you like to review his official Resume or discuss roles directly?";
          actionType = 'recruiter-options';
          break;
        case '🚀 Startup / Founder':
          botText = "Awesome! Karthik actively collaborates on building MVPs, architecting high-density hackathons, and designing digital branding. Let's start an inquiry.";
          actionType = 'contact-trigger';
          break;
        case '🎓 Student / Mentorship':
          botText = "Welcome! Karthik regularly mentors collegiate engineers, leads the Teach AI for India initiative, and served as President of Influencers Club NIAT. Be sure to check out his College Achievements!";
          actionType = 'achievements-tip';
          break;
        case '👋 General Inquiry':
          botText = "Thanks for visiting! Feel free to explore the PanIIT Summit 2026 case study, Behind the Lens photography, and verified projects. Ready to connect?";
          actionType = 'contact-trigger';
          break;
        default:
          botText = "How else can I assist you in exploring Karthik's portfolio?";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: botText,
        action: actionType,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[480px] rounded-3xl glass-panel shadow-2xl flex flex-col mb-4 overflow-hidden border border-white/10 animate-scale-in relative bg-[#171717]">
          {/* Subtle Orange Glow */}
          <div className="glow-orange -top-20 -left-20"></div>

          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#FF5A1F] via-[#FF7A18] to-[#D9361E] p-4 text-white flex justify-between items-center relative z-10 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black/25 backdrop-blur-md flex items-center justify-center border border-white/15">
                <Bot size={17} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-sm block leading-tight">KarthikAI</span>
                <span className="text-[10px] text-white/80 font-medium">Assistant • Online</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-black/20 rounded-full transition cursor-pointer text-white/90 hover:text-white"
              aria-label="Close chatbot"
            >
              <X size={17} />
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#111111]/80 relative z-10 text-xs">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white rounded-br-none shadow-md font-medium' 
                      : 'bg-[#1C1C1C] text-slate-200 border border-white/10 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                
                {/* Embedded Actions */}
                {msg.action === 'recruiter-options' && (
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      onClick={() => onTriggerResume?.()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252525] hover:bg-[#303030] border border-white/10 rounded-xl text-[11px] font-bold text-white transition cursor-pointer shadow-sm"
                    >
                      <FileText size={12} className="text-[#FF7A18]" />
                      <span>Open Resume</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onTriggerContact?.('Hire Me (Full-Time)');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white rounded-xl text-[11px] font-bold transition shadow-sm cursor-pointer"
                    >
                      <span>Let's Talk</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}

                {msg.action === 'contact-trigger' && (
                  <div className="mt-2.5">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onTriggerContact?.('General Collaboration');
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white rounded-xl text-[11px] font-bold transition shadow-sm cursor-pointer"
                    >
                      <span>Send an Inquiry</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}

                {msg.action === 'achievements-tip' && (
                  <div className="mt-2.5">
                    <a
                      href="#achievements"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#252525] hover:bg-[#303030] border border-white/10 rounded-xl text-[11px] font-bold text-[#FFA87D] transition"
                    >
                      <Sparkles size={12} className="text-[#FF5A1F]" />
                      <span>View Honors & Awards</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-2 bg-[#1C1C1C] rounded-2xl w-16 border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A18] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9361E] animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Prompts */}
          <div className="p-3 bg-[#171717] border-t border-white/10 flex flex-wrap gap-1.5 z-10">
            {['👔 Recruiter / Hiring', '🚀 Startup / Founder', '🎓 Student / Mentorship', '👋 General Inquiry'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleUserReply(opt)}
                className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-[#222222] hover:bg-[#2C2C2C] border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#D9361E] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 group cursor-pointer focus:outline-none"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} className="group-hover:rotate-12 transition-transform duration-300" />}
      </button>

    </div>
  );
}
