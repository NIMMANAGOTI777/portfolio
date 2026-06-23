import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, FileText, ArrowRight } from 'lucide-react';

export default function KarthikAIChatbot({ onTriggerContact, onTriggerResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi! I'm Karthik's AI assistant. To help you better, what brings you to my portfolio today?",
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
    // 1. Add User message
    const userMsg = {
      sender: 'user',
      text: option,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 2. Simulate Bot reply with slight latency
    setTimeout(() => {
      let botText = "";
      let actionType = null; // 'resume', 'contact', or null

      switch (option) {
        case '👔 Recruiter / Hiring Manager':
          botText = "Great to meet you! Karthik is actively looking for Fullstack Developer, Product Engineering, or SMM roles. Would you like to review his Resume or discuss potential roles right away?";
          actionType = 'recruiter-options';
          break;
        case '🚀 Startup Founder / Builder':
          botText = "Awesome! Karthik loves building MVPs, managing communities, and setting up tech hackathons. Let's collaborate on your next venture.";
          actionType = 'contact-trigger';
          break;
        case '🎓 Student / Learner':
          botText = "Welcome! Karthik regularly mentors students and runs 'The Event Circle' community. Be sure to check out the Academy section for micro-courses!";
          actionType = 'academy-tip';
          break;
        case '👋 General Visitor':
          botText = "Thanks for visiting! Feel free to explore the interactive showcases. If you want to say hi or ask a question, let's connect!";
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
    }, 850);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[450px] sm:w-96 rounded-2xl glass-panel shadow-2xl flex flex-col mb-4 overflow-hidden border border-white/10 animate-scale-in relative">
          {/* Chat Glow */}
          <div className="glow-indigo -top-20 -left-20"></div>

          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-sm block">KarthikAI</span>
                <span className="text-[10px] text-indigo-200">Portfolio Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/40 relative z-10">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-indigo-400" />
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    
                    {/* Action Triggers based on category */}
                    {msg.action === 'recruiter-options' && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onTriggerResume();
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition cursor-pointer"
                        >
                          <FileText size={12} />
                          <span>View Resume</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onTriggerContact('Hire Me');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition cursor-pointer"
                        >
                          <span>Hire Form</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    )}

                    {msg.action === 'contact-trigger' && (
                      <div className="mt-3">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onTriggerContact('Other');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition cursor-pointer"
                        >
                          <span>Open Contact Form</span>
                          <ArrowRight size={10} />
                        </button>
                      </div>
                    )}

                    {msg.action === 'academy-tip' && (
                      <div className="mt-3">
                        <a
                          href="#growth"
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition"
                        >
                          <span>Explore Academy</span>
                          <ArrowRight size={10} />
                        </a>
                      </div>
                    )}
                  </div>
                  <span className={`text-[8px] text-slate-500 mt-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                  <Bot size={12} className="text-indigo-400" />
                </div>
                <div className="bg-slate-900 border border-white/5 p-3 rounded-2xl rounded-tl-none max-w-[70%]">
                  <div className="flex gap-1.5 items-center justify-center h-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Option Selectors */}
          <div className="p-3 bg-slate-900/80 border-t border-white/10 grid grid-cols-1 gap-2 relative z-10">
            <p className="text-[10px] font-semibold text-slate-400 px-1 mb-1">Select your profile to interact:</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleUserReply('👔 Recruiter / Hiring Manager')}
                className="text-[10px] text-left px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-indigo-650/10 border border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-white transition duration-200 cursor-pointer truncate"
              >
                👔 Recruiter
              </button>
              <button 
                onClick={() => handleUserReply('🚀 Startup Founder / Builder')}
                className="text-[10px] text-left px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-indigo-650/10 border border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-white transition duration-200 cursor-pointer truncate"
              >
                🚀 Founder
              </button>
              <button 
                onClick={() => handleUserReply('🎓 Student / Learner')}
                className="text-[10px] text-left px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-indigo-650/10 border border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-white transition duration-200 cursor-pointer truncate"
              >
                🎓 Student
              </button>
              <button 
                onClick={() => handleUserReply('👋 General Visitor')}
                className="text-[10px] text-left px-2.5 py-2 rounded-xl bg-slate-950 hover:bg-indigo-650/10 border border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-white transition duration-200 cursor-pointer truncate"
              >
                👋 Just Visiting
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition duration-300 hover:scale-105 flex items-center justify-center relative group cursor-pointer"
        aria-label="Toggle chatbot"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-0 group-hover:opacity-10 group-hover:animate-ping -inset-0"></span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
}
