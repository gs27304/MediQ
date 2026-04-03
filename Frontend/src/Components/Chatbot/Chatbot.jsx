import React, { useState } from 'react';
import ChatbotIcon from "../../assets/images/chatbot-icon.png";
import { BASE_URL } from '../../config';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [currentOption, setCurrentOption] = useState(null);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      if (currentOption === 'searchMedicine') {
        const lowerCaseInput = input.toLowerCase().trim();
        const medicine = symptomMedicineMapping[lowerCaseInput] || 'No matching data found. Please consult a verified specialist for pharmacological guidance.';
        setMessages(prevMessages => [...prevMessages, { text: medicine, sender: 'bot' }]);
        setInput('');
      } else {
        try {
          const response = await fetch(`${BASE_URL}/gemini/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: input
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const botMessage = { text: data.botReply, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
          } else {
            setMessages(prevMessages => [...prevMessages, { text: 'Neural link interrupted. Please try again.', sender: 'bot' }]);
          }
        } catch (error) {
          setMessages(prevMessages => [...prevMessages, { text: 'Unable to reach MediQ Intelligence servers.', sender: 'bot' }]);
        }

        setInput('');
      }
    }
  };

  const handleOptionSelect = (option) => {
    setCurrentOption(option);
    setMessages([]); 
  };

  return (
    <div className={`fixed bottom-6 right-6 transition-all duration-500 z-50 ${isOpen ? 'w-[350px] h-[500px]' : 'w-16 h-16'} flex flex-col`}>
      
      {/* Floating Action Button (Closed State) */}
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform duration-300 border-2 border-white/20"
        >
          <img src={ChatbotIcon} alt="MediQ Bot" className="w-10 h-10 rounded-full" />
        </div>
      )}

      {/* Chat Window (Open State) */}
      {isOpen && (
        <div className="flex flex-col h-full bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={ChatbotIcon} alt="Bot" className="w-8 h-8 rounded-full border border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#0f172a]"></div>
              </div>
              <div>
                <h3 className="text-white text-sm font-bold">MediQ Intelligence</h3>
                <p className="text-[10px] text-cyan-400 uppercase tracking-tighter">AI Systems Online</p>
              </div>
            </div>
            <button 
              onClick={() => { setIsOpen(false); setCurrentOption(null); }}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            
            {/* Options Menu */}
            {!currentOption && (
              <div className="p-6 space-y-3 flex flex-col justify-center h-full">
                <p className="text-gray-400 text-xs text-center mb-4 uppercase tracking-widest">Select an Operations Module</p>
                <button
                  onClick={() => handleOptionSelect('symptomChecker')}
                  className="group flex items-center justify-between w-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 p-4 rounded-xl transition-all duration-300"
                >
                  <span className="text-white font-medium">Neural Symptom Scan</span>
                  <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button
                  onClick={() => handleOptionSelect('searchMedicine')}
                  className="group flex items-center justify-between w-full bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/50 p-4 rounded-xl transition-all duration-300"
                >
                  <span className="text-white font-medium">Pharma Intelligence</span>
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button
                  onClick={() => handleOptionSelect('faqs')}
                  className="group flex items-center justify-between w-full bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 p-4 rounded-xl transition-all duration-300"
                >
                  <span className="text-white font-medium">System Protocols (FAQs)</span>
                  <span className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              </div>
            )}

            {/* Dynamic Chat Sections */}
            {currentOption && (
              <div className="flex flex-col h-full">
                {/* Back Button */}
                <button 
                  onClick={() => setCurrentOption(null)}
                  className="text-[10px] text-cyan-400 p-2 hover:bg-white/5 w-fit ml-2 mt-2 rounded transition-colors uppercase font-bold tracking-widest"
                >
                  ← Return to Hub
                </button>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                  {currentOption === 'faqs' ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-cyan-400 text-xs font-bold mb-1">Q: Interface Purpose?</p>
                        <p className="text-gray-300 text-xs">A: MediQ AI is designed for preliminary neural scanning and pharmacology data retrieval.</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-cyan-400 text-xs font-bold mb-1">Q: Symptom Accuracy?</p>
                        <p className="text-gray-300 text-xs">A: All scans use the Gemini AI engine but must be verified by a human clinician.</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                {currentOption !== 'faqs' && (
                  <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={currentOption === 'searchMedicine' ? "Search Pharmacopoeia..." : "Enter Neural Feed..."}
                      className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:border-cyan-500 outline-none transition-all"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                    >
                      Process
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Chatbot;