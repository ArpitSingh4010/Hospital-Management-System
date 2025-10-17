import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      type: 'bot',
      text: 'Hello! I\'m your Hospital Assistant. I can help you find the right department for your medical concerns. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(Date.now());

  // Hospital departments and their keywords
  const departmentKnowledge = {
    cardiology: {
      name: 'Cardiology',
      keywords: ['heart', 'chest pain', 'cardiac', 'blood pressure', 'bp', 'hypertension', 'palpitation', 'angina', 'cardiovascular', 'coronary', 'artery', 'valve', 'ecg', 'ekg', 'heart attack', 'cardiac arrest', 'cholesterol'],
      description: 'Our Cardiology department specializes in heart and cardiovascular system conditions.'
    },
    orthopedics: {
      name: 'Orthopedics',
      keywords: ['bone', 'joint', 'fracture', 'knee', 'hip', 'shoulder', 'back pain', 'spine', 'arthritis', 'ortho', 'ligament', 'tendon', 'sprain', 'muscle pain', 'sports injury', 'ankle', 'wrist', 'elbow', 'neck pain'],
      description: 'Our Orthopedics department handles bone, joint, and musculoskeletal issues.'
    },
    neurology: {
      name: 'Neurology',
      keywords: ['brain', 'headache', 'migraine', 'seizure', 'stroke', 'nervous', 'neuro', 'epilepsy', 'paralysis', 'numbness', 'tremor', 'parkinson', 'alzheimer', 'memory loss', 'dizziness', 'vertigo', 'nerve pain'],
      description: 'Our Neurology department treats disorders of the nervous system and brain.'
    },
    dermatology: {
      name: 'Dermatology',
      keywords: ['skin', 'rash', 'acne', 'eczema', 'psoriasis', 'derma', 'hair loss', 'nail', 'mole', 'wart', 'allergy', 'itching', 'burn', 'scar', 'pigmentation', 'vitiligo'],
      description: 'Our Dermatology department specializes in skin, hair, and nail conditions.'
    },
    ent: {
      name: 'ENT (Ear, Nose & Throat)',
      keywords: ['ear', 'nose', 'throat', 'ent', 'sinus', 'tonsil', 'hearing', 'deafness', 'voice', 'swallowing', 'snoring', 'smell', 'nasal', 'adenoid', 'vertigo', 'tinnitus'],
      description: 'Our ENT department treats ear, nose, throat, and related head and neck conditions.'
    },
    pediatrics: {
      name: 'Pediatrics',
      keywords: ['child', 'baby', 'infant', 'kid', 'pediatric', 'newborn', 'toddler', 'vaccination', 'immunization', 'growth', 'development', 'adolescent'],
      description: 'Our Pediatrics department provides comprehensive care for infants, children, and adolescents.'
    },
    oncology: {
      name: 'Oncology',
      keywords: ['cancer', 'tumor', 'oncology', 'chemotherapy', 'radiation', 'malignant', 'benign', 'biopsy', 'lymphoma', 'leukemia', 'carcinoma'],
      description: 'Our Oncology department specializes in cancer diagnosis and treatment.'
    },
    'general surgery': {
      name: 'General Surgery',
      keywords: ['surgery', 'operation', 'appendix', 'hernia', 'gallbladder', 'thyroid', 'surgical', 'laparoscopy', 'wound', 'abscess', 'cyst'],
      description: 'Our General Surgery department performs various surgical procedures.'
    },
    radiology: {
      name: 'Radiology',
      keywords: ['x-ray', 'xray', 'scan', 'ct', 'mri', 'ultrasound', 'imaging', 'radiology', 'mammography', 'fluoroscopy'],
      description: 'Our Radiology department provides medical imaging services.'
    },
    'physical therapy': {
      name: 'Physical Therapy',
      keywords: ['physiotherapy', 'physical therapy', 'rehabilitation', 'rehab', 'mobility', 'exercise', 'therapy', 'recovery'],
      description: 'Our Physical Therapy department helps patients recover mobility and strength.'
    },
    'general physician': {
      name: 'General Physician',
      keywords: ['fever', 'cold', 'cough', 'flu', 'general headache', 'common cold', 'physician', 'doctor', 'checkup', 'diabetes', 'sugar', 'thyroid', 'fatigue', 'weakness', 'infection', 'viral', 'bacterial', 'body pain', 'dehydration', 'stomach', 'stomachache', 'stomach pain', 'belly', 'abdomen', 'abdominal pain', 'loose motion', 'diarrhea', 'constipation', 'gastric', 'acidity', 'indigestion', 'vomiting', 'nausea', 'food poisoning', 'ulcer', 'digestive'],
      description: 'Our General Physician department provides primary healthcare and treats common illnesses including stomach problems, digestive issues, and general health concerns.'
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current && shouldAutoScroll) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle scroll detection to determine if user is viewing old messages
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      setShouldAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findDepartment = (userMessage) => {
    const messageLower = userMessage.toLowerCase();
    
    // Scan for department matches
    const matches = [];
    
    for (const dept of Object.values(departmentKnowledge)) {
      for (const keyword of dept.keywords) {
        if (messageLower.includes(keyword)) {
          matches.push(dept);
          break;
        }
      }
    }

    if (matches.length === 0) {
      return {
        text: "I'm sorry, I couldn't identify a specific department based on your query. Could you please describe your symptoms in more detail?\n\nFor example:\n• Joint or bone pain → Orthopedics\n• Chest pain or heart issues → Cardiology\n• Skin problems → Dermatology\n• Headaches or neurological issues → Neurology\n• Fever, cold, or general illness → General Physician\n\nYou can also contact our General Physician for an initial consultation."
      };
    } else if (matches.length === 1) {
      const dept = matches[0];
      return {
        text: `Based on your symptoms, I recommend visiting our ${dept.name} department.\n\n${dept.description}\n\nWould you like to book an appointment?`
      };
    } else {
      const deptList = matches.map(d => `• ${d.name}`).join('\n');
      return {
        text: `Your symptoms could relate to multiple departments:\n\n${deptList}\n\nI recommend starting with a consultation at our General Physician department, who can then refer you to the appropriate specialist if needed.`
      };
    }
  };

  const generateResponse = (userMessage) => {
    const messageLower = userMessage.toLowerCase();

    // Greeting responses
    if (messageLower.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return {
        text: "Hello! I'm here to help you find the right medical department. Please describe your symptoms or medical concern, and I'll guide you to the appropriate department."
      };
    }

    // Appointment queries
    if (messageLower.includes('appointment') || messageLower.includes('book')) {
      return {
        text: "You can book an appointment by clicking on the 'Appointment' link in the navigation menu, or I can help you identify which department you need first. What are your symptoms?"
      };
    }

    // Emergency queries
    if (messageLower.includes('emergency') || messageLower.includes('urgent')) {
      return {
        text: "⚠️ For medical emergencies, please call our emergency helpline immediately or visit the Emergency Department. For non-emergency consultations, I can help you find the right department."
      };
    }

    // Visiting hours
    if (messageLower.includes('visiting hours') || messageLower.includes('timings') || messageLower.includes('hours')) {
      return {
        text: "Our hospital operates 24/7 with emergency services always available. Regular OPD hours are typically 9 AM - 5 PM on weekdays. For specific department timings, please contact our reception."
      };
    }

    // Location/address
    if (messageLower.includes('location') || messageLower.includes('address') || messageLower.includes('where')) {
      return {
        text: "You can find our location details in the 'Contact Us' section. We're here to serve you!"
      };
    }

    // List departments
    if (messageLower.includes('department') && (messageLower.includes('list') || messageLower.includes('all') || messageLower.includes('available'))) {
      const deptList = Object.values(departmentKnowledge).map(d => `• ${d.name}`).join('\n');
      return {
        text: `We have the following departments:\n\n${deptList}\n\nPlease tell me about your symptoms, and I'll help you find the right one!`
      };
    }

    // Thank you
    if (messageLower.match(/^(thanks|thank you|appreciated)/)) {
      return {
        text: "You're welcome! Feel free to ask if you have any other questions. Stay healthy! 😊"
      };
    }

    // Default: try to find department
    return findDepartment(userMessage);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    // Enable auto-scroll when user sends a message
    setShouldAutoScroll(true);

    // Add user message
    const userMsg = {
      id: ++messageIdRef.current,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage);
      const botMsg = {
        id: ++messageIdRef.current,
        type: 'bot',
        text: botResponse.text,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <style>{`
        /* Global scrollbar hiding for chatbot */
        .chatbot-container .chatbot-messages::-webkit-scrollbar,
        .chatbot-container .chatbot-messages-wrapper::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        
        .chatbot-container .chatbot-messages,
        .chatbot-container .chatbot-messages-wrapper {
          -webkit-overflow-scrolling: touch !important;
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }

        /* Force hide all possible scrollbars in chatbot */
        .chatbot-container * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        
        .chatbot-container *::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
        }

        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }

        .chatbot-toggle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00D9FF 0%, #FF007A 100%);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        .chatbot-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 25px rgba(0, 217, 255, 0.6);
        }

        .chatbot-icon {
          width: 40px;
          height: 40px;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 4px 20px rgba(0, 217, 255, 0.4);
          }
          50% {
            box-shadow: 0 4px 30px rgba(255, 0, 122, 0.6);
          }
        }

        .chatbot-window {
          width: 380px;
          height: 550px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-header {
          background: linear-gradient(135deg, #00D9FF 0%, #FF007A 100%);
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        }

        .chatbot-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chatbot-header-icon {
          width: 42px;
          height: 42px;
        }

        .chatbot-header h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
        }

        .chatbot-status {
          font-size: 12px;
          opacity: 0.9;
        }

        .chatbot-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .chatbot-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chatbot-messages {
          flex: 1;
          overflow: hidden;
          padding: 20px;
          background: #F8FAFC;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 400px;
          min-height: 300px;
          position: relative;
        }

        .chatbot-messages-wrapper {
          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;
          width: 100%;
          padding-right: 20px;
          margin-right: -20px;
          /* Completely hide scrollbar for clean look */
          -ms-overflow-style: none !important;  /* IE and Edge */
          scrollbar-width: none !important;     /* Firefox */
        }

        /* Hide scrollbar for WebKit browsers (Chrome, Safari, Opera) */
        .chatbot-messages-wrapper::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          background: transparent !important;
        }

        .chatbot-messages-wrapper::-webkit-scrollbar-track {
          display: none !important;
        }

        .chatbot-messages-wrapper::-webkit-scrollbar-thumb {
          display: none !important;
        }

        /* Additional scrollbar hiding for nested elements */
        .chatbot-messages-wrapper * {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .chatbot-messages-wrapper *::-webkit-scrollbar {
          display: none !important;
        }

        .chatbot-message {
          display: flex;
          flex-direction: column;
          max-width: 80%;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .chatbot-message.bot {
          align-self: flex-start;
        }

        .chatbot-message.user {
          align-self: flex-end;
        }

        .chatbot-message-content {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-line;
          word-wrap: break-word;
          overflow-wrap: break-word;
          max-width: 100%;
        }

        .chatbot-message.bot .chatbot-message-content {
          background: white;
          color: #1E293B;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #E2E8F0;
        }

        .chatbot-message.user .chatbot-message-content {
          background: linear-gradient(135deg, #00D9FF 0%, #0099CC 100%);
          color: white;
        }

        .chatbot-message-time {
          font-size: 11px;
          color: #94A3B8;
          margin-top: 4px;
          padding: 0 4px;
        }

        .chatbot-typing {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }

        .chatbot-typing span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #94A3B8;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .chatbot-typing span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .chatbot-typing span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .chatbot-input-container {
          padding: 16px;
          background: white;
          border-top: 1px solid #E2E8F0;
          display: flex;
          gap: 8px;
        }

        .chatbot-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #E2E8F0;
          border-radius: 24px;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .chatbot-input:focus {
          border-color: #00D9FF;
        }

        .chatbot-send {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #00D9FF 0%, #0099CC 100%);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .chatbot-send:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 217, 255, 0.4);
        }

        .chatbot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100vw - 40px);
            height: calc(100vh - 40px);
            max-height: 600px;
          }
          
          .chatbot-container {
            bottom: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="chatbot-container">
        {/* Floating Chat Button */}
        {!isOpen && (
          <button className="chatbot-toggle" onClick={toggleChat} aria-label="Open chat">
            <div className="chatbot-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="28" fill="#E8F4F8"/>
                <circle cx="32" cy="32" r="24" fill="#5BA8C8"/>
                <path d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32C56 18.7 45.3 8 32 8Z" fill="url(#gradient1)"/>
                <circle cx="24" cy="28" r="3" fill="#1A3A52"/>
                <circle cx="40" cy="28" r="3" fill="#1A3A52"/>
                <path d="M32 38C35.5 38 38.5 36.5 40 34H24C25.5 36.5 28.5 38 32 38Z" fill="#1A3A52"/>
                <rect x="30" y="4" width="4" height="8" rx="2" fill="#1A3A52"/>
                <circle cx="32" cy="6" r="3" fill="#1A3A52"/>
                <ellipse cx="16" cy="32" rx="6" ry="8" fill="#1A3A52"/>
                <ellipse cx="48" cy="32" rx="6" ry="8" fill="#1A3A52"/>
                <defs>
                  <linearGradient id="gradient1" x1="32" y1="8" x2="32" y2="56">
                    <stop offset="0%" stopColor="#E8F4F8"/>
                    <stop offset="100%" stopColor="#A5D4E6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="chatbot-window">
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-content">
                <div className="chatbot-header-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="28" fill="white" opacity="0.9"/>
                    <circle cx="32" cy="32" r="24" fill="white"/>
                    <path d="M32 8C18.7 8 8 18.7 8 32C8 45.3 18.7 56 32 56C45.3 56 56 45.3 56 32C56 18.7 45.3 8 32 8Z" fill="white"/>
                    <circle cx="24" cy="28" r="3" fill="#00D9FF"/>
                    <circle cx="40" cy="28" r="3" fill="#00D9FF"/>
                    <path d="M32 38C35.5 38 38.5 36.5 40 34H24C25.5 36.5 28.5 38 32 38Z" fill="#00D9FF"/>
                    <rect x="30" y="4" width="4" height="8" rx="2" fill="white"/>
                    <circle cx="32" cy="6" r="3" fill="white"/>
                    <ellipse cx="16" cy="32" rx="6" ry="8" fill="white" opacity="0.9"/>
                    <ellipse cx="48" cy="32" rx="6" ry="8" fill="white" opacity="0.9"/>
                  </svg>
                </div>
                <div>
                  <h3>Hospital Assistant</h3>
                  <span className="chatbot-status">Online</span>
                </div>
              </div>
              <button className="chatbot-close" onClick={toggleChat} aria-label="Close chat">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              <div 
                className="chatbot-messages-wrapper"
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
              >
                {messages.map((msg) => (
                  <div key={msg.id} className={`chatbot-message ${msg.type}`}>
                    <div className="chatbot-message-content">
                      {formatMessage(msg.text)}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="chatbot-message bot">
                    <div className="chatbot-message-content">
                      <div className="chatbot-typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <form className="chatbot-input-container" onSubmit={handleSendMessage}>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your symptoms or question..."
                className="chatbot-input"
              />
              <button 
                type="submit" 
                className="chatbot-send" 
                aria-label="Send message"
                disabled={!inputMessage.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;