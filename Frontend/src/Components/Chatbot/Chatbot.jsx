import React, { useState, useEffect, useRef } from 'react';
import ChatbotIcon from "../../assets/images/chatbot-icon.png";
import { BASE_URL } from '../../config';
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi"; // For Mute/Unmute toggle

const symptomMedicineMapping = {
  "headache": "Commonly managed with Paracetamol or Ibuprofen. Ensure rest and hydration.",
  "fever": "Paracetamol is standard. Monitor temperature and stay hydrated.",
  "cough": "Over-the-counter suppressants like Dextromethorphan, or honey and ginger.",
  "cold": "Antihistamines and decongestants. Rest is vital.",
  "migraine": "Sumatriptan or specialized NSAIDs. Consult a neurologist for chronic cases."
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentOption, setCurrentOption] = useState(null);
  const [isMuted, setIsMuted] = useState(false); // Indian Dark Mode: Control for voice
  
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to play ElevenLabs Audio
  const playVoice = (base64Audio) => {
    if (isMuted || !base64Audio) return;
    
    try {
      const audioSrc = `data:audio/mp3;base64,${base64Audio}`;
      const audio = new Audio(audioSrc);
      audio.play();
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    const currentInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (currentOption === 'searchMedicine') {
      const lowerCaseInput = currentInput.toLowerCase().trim();
      const medicine = symptomMedicineMapping[lowerCaseInput] || 'No matching data found in local pharmacopoeia.';
      setMessages(prev => [...prev, { text: medicine, sender: 'bot' }]);
      // Note: Local mapping doesn't have voice unless you call a TTS route for it too.
    } else {
      try {
        const response = await fetch(`${BASE_URL}/gemini/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: currentInput }),
        });

        if (response.ok) {
          const data = await response.json();
          const botMessage = { text: data.botReply || data.message, sender: 'bot' };
          setMessages(prev => [...prev, botMessage]);
          
          // PLAY ELEVEN LABS VOICE
          if (data.audioData) {
            playVoice(data.audioData);
          }
        } else {
          setMessages(prev => [...prev, { text: 'Neural link interrupted. System status: 500.', sender: 'bot' }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { text: 'Unable to reach MediQ Intelligence servers.', sender: 'bot' }]);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setCurrentOption(option);
    setMessages([]); 
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const containerClasses = isOpen 
    ? isFullScreen 
      ? 'fixed top-[90px] bottom-6 left-6 right-6 z-50' 
      : 'fixed bottom-6 right-6 w-[350px] h-[500px] z-50' 
    : 'fixed bottom-6 right-6 w-16 h-16 z-50';

  return (
    <div className={`${containerClasses} transition-all duration-500 flex flex-col font-sans`}>
      
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 transition-transform duration-300 border-2 border-white/20"
        >
          <img src={ChatbotIcon} alt="MediQ Bot" className="w-10 h-10 rounded-full" />
        </div>
      )}

      {isOpen && (
        <div className="flex flex-col h-full bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={ChatbotIcon} alt="Bot" className="w-8 h-8 rounded-full border border-indigo-400" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#0f172a]"></div>
              </div>
              <div>
                <h3 className="text-white text-sm font-bold tracking-tight">MediQ Intelligence</h3>
                <p className="text-[10px] text-indigo-400 uppercase tracking-tighter font-black">Voice-Enabled AI</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Toggle */}
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-indigo-400 transition-colors p-1"
                title={isMuted ? "Unmute Voice" : "Mute Voice"}
              >
                {isMuted ? <BiVolumeMute size={20}/> : <BiVolumeFull size={20}/>}
              </button>

              <button 
                onClick={toggleFullScreen}
                className="text-gray-400 hover:text-indigo-400 transition-colors p-1"
              >
                {isFullScreen ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg>
                )}
              </button>

              <button 
                onClick={() => { setIsOpen(false); setIsFullScreen(false); setCurrentOption(null); }}
                className="text-gray-400 hover:text-red-500 transition-colors p-1"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {!currentOption && (
              <div className="p-6 space-y-3 flex flex-col justify-center h-full max-w-md mx-auto w-full">
                <p className="text-slate-500 text-[10px] font-black text-center mb-4 uppercase tracking-[0.2em]">Select Neural Module</p>
                <button
                  onClick={() => handleOptionSelect('symptomChecker')}
                  className="group flex items-center justify-between w-full bg-[#0f172a] hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <span className="text-slate-200 font-bold tracking-tight">Neural Symptom Scan</span>
                  <span className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                </button>
                <button
                  onClick={() => handleOptionSelect('searchMedicine')}
                  className="group flex items-center justify-between w-full bg-[#0f172a] hover:bg-emerald-500/10 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <span className="text-slate-200 font-bold tracking-tight">Pharma Intelligence</span>
                  <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                </button>
                <button
                  onClick={() => handleOptionSelect('faqs')}
                  className="group flex items-center justify-between w-full bg-[#0f172a] hover:bg-slate-700/30 border border-slate-800 hover:border-slate-600 p-5 rounded-2xl transition-all duration-300 shadow-lg"
                >
                  <span className="text-slate-200 font-bold tracking-tight">System Protocols (FAQs)</span>
                  <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">→</span>
                </button>
              </div>
            )}

            {currentOption && (
              <div className="flex flex-col h-full bg-[#0f172a]">
                <button 
                  onClick={() => setCurrentOption(null)}
                  className="text-[10px] text-indigo-400 p-3 hover:bg-white/5 w-fit ml-2 mt-2 rounded-xl transition-colors uppercase font-black tracking-widest"
                >
                  ← Return to Hub
                </button>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {currentOption === 'faqs' ? (
                    <div className="space-y-4 max-w-2xl mx-auto w-full">
                      <div className="p-4 bg-[#1e293b] border border-slate-800 rounded-2xl shadow-xl">
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Interface Purpose?</p>
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">MediQ AI is optimized for Bharat-centric neural scanning and pharmacology data retrieval.</p>
                      </div>
                    </div>
                  ) : (
                    <div className={isFullScreen ? "max-w-4xl mx-auto w-full" : ""}>
                      {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6`}>
                          <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                            msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-xl shadow-indigo-900/20' 
                            : 'bg-[#1e293b] text-slate-200 border border-slate-800 rounded-tl-none shadow-inner'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                  )}
                </div>

                {currentOption !== 'faqs' && (
                  <div className="p-4 bg-[#1e293b]/50 border-t border-slate-800 backdrop-blur-md">
                    <div className={`flex gap-3 ${isFullScreen ? "max-w-4xl mx-auto w-full" : ""}`}>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={currentOption === 'searchMedicine' ? "Search Pharmacopoeia..." : "Enter Neural Feed..."}
                        className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-3 text-white text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-600"
                      />
                      <button
                        onClick={handleSend}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40 active:scale-95"
                      >
                        Process
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;