import React, { useState, useEffect, useRef } from "react";
import ChatbotIcon from "../../assets/images/chatbot-icon.png";
import { BASE_URL } from "../../config";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";

const symptomMedicineMapping = {
  headache:
    "Commonly managed with Paracetamol or Ibuprofen. Ensure rest and hydration.",
  fever: "Paracetamol is standard. Monitor temperature and stay hydrated.",
  cough:
    "Over-the-counter suppressants like Dextromethorphan, or honey and ginger.",
  cold: "Antihistamines and decongestants. Rest is vital.",
  migraine:
    "Sumatriptan or specialized NSAIDs. Consult a neurologist for chronic cases.",
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentOption, setCurrentOption] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ FREE Browser Voice
  const speakText = (text) => {
    if (isMuted || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentInput = input;
    const userMessage = { text: currentInput, sender: "user" };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    if (currentOption === "searchMedicine") {
      const lowerCaseInput = currentInput.toLowerCase().trim();
      const medicine =
        symptomMedicineMapping[lowerCaseInput] ||
        "No matching data found in local pharmacopoeia.";

      const botText = medicine;
      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
      speakText(botText);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/gemini/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: currentInput,
        }),
      });

      const data = await response.json();

      const botText =
        data.botReply ||
        data.message ||
        "Unable to process neural medical scan.";

      setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);

      // ✅ FREE voice response
      speakText(botText);
    } catch (error) {
      const errorText = "Unable to reach MediQ Intelligence servers.";
      setMessages((prev) => [...prev, { text: errorText, sender: "bot" }]);
      speakText(errorText);
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
      ? "fixed top-[90px] bottom-6 left-6 right-6 z-50"
      : "fixed bottom-6 right-6 w-[350px] h-[500px] z-50"
    : "fixed bottom-6 right-6 w-16 h-16 z-50";

  return (
    <div
      className={`${containerClasses} transition-all duration-500 flex flex-col font-sans`}
    >
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 transition-transform duration-300 border-2 border-white/20"
        >
          <img
            src={ChatbotIcon}
            alt="MediQ Bot"
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}

      {isOpen && (
        <div className="flex flex-col h-full bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={ChatbotIcon}
                alt="Bot"
                className="w-8 h-8 rounded-full border border-indigo-400"
              />
              <div>
                <h3 className="text-white text-sm font-bold">
                  MediQ Intelligence
                </h3>
                <p className="text-[10px] text-indigo-400 uppercase font-black">
                  Voice-Enabled AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-indigo-400"
              >
                {isMuted ? <BiVolumeMute size={20} /> : <BiVolumeFull size={20} />}
              </button>

              <button
                onClick={toggleFullScreen}
                className="text-gray-400 hover:text-indigo-400"
              >
                ⛶
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsFullScreen(false);
                  setCurrentOption(null);
                  window.speechSynthesis.cancel();
                }}
                className="text-gray-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {!currentOption && (
              <div className="p-6 space-y-3 flex flex-col justify-center h-full">
                <button
                  onClick={() => handleOptionSelect("symptomChecker")}
                  className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-slate-200"
                >
                  Neural Symptom Scan
                </button>

                <button
                  onClick={() => handleOptionSelect("searchMedicine")}
                  className="bg-[#0f172a] border border-slate-800 p-5 rounded-2xl text-slate-200"
                >
                  Pharma Intelligence
                </button>
              </div>
            )}

            {currentOption && (
              <div className="flex flex-col h-full bg-[#0f172a]">
                <button
                  onClick={() => setCurrentOption(null)}
                  className="text-[10px] text-indigo-400 p-3"
                >
                  ← Return to Hub
                </button>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                          msg.sender === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-[#1e293b] text-slate-200"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-[#1e293b]/50 border-t border-slate-800">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Enter Neural Feed..."
                      className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl px-5 py-3 text-white"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl"
                    >
                      Process
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;