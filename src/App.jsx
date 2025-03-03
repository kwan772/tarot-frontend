import React, { useState, useRef, useEffect } from 'react';
import { MessageSquarePlus, Sparkles, Send } from 'lucide-react';
import logoImage from '../images/logo.png';  // Adjust path based on your file structure

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const tarotCards = [
  { name: "The Fool", number: "0", type: "Major Arcana", image: "src/tarot_cards/the_fool.jpg" },
  { name: "The Magician", number: "1", type: "Major Arcana", image: "src/tarot_cards/the_magician.jpg" },
  { name: "The High Priestess", number: "2", type: "Major Arcana", image: "src/tarot_cards/the_high_priestess.jpg" },
  { name: "The Empress", number: "3", type: "Major Arcana", image: "src/tarot_cards/the_empress.jpg" },
  { name: "The Emperor", number: "4", type: "Major Arcana", image: "src/tarot_cards/the_emperor.jpg" },
  { name: "The Hierophant", number: "5", type: "Major Arcana", image: "src/tarot_cards/the_hierophant.jpg" },
  { name: "The Lovers", number: "6", type: "Major Arcana", image: "src/tarot_cards/the_lovers.jpg" },
  { name: "The Chariot", number: "7", type: "Major Arcana", image: "src/tarot_cards/the_chariot.jpg" },
  { name: "Strength", number: "8", type: "Major Arcana", image: "src/tarot_cards/strength.jpg" },
  { name: "The Hermit", number: "9", type: "Major Arcana", image: "src/tarot_cards/the_hermit.jpg" },
  { name: "Wheel of Fortune", number: "10", type: "Major Arcana", image: "src/tarot_cards/wheel_of_fortune.jpg" },
  { name: "Justice", number: "11", type: "Major Arcana", image: "src/tarot_cards/justice.jpg" },
  { name: "The Hanged Man", number: "12", type: "Major Arcana", image: "src/tarot_cards/the_hanged_man.jpg" },
  { name: "Death", number: "13", type: "Major Arcana", image: "src/tarot_cards/death.jpg" },
  { name: "Temperance", number: "14", type: "Major Arcana", image: "src/tarot_cards/temperance.jpg" },
  { name: "The Devil", number: "15", type: "Major Arcana", image: "src/tarot_cards/the_devil.jpg" },
  { name: "The Tower", number: "16", type: "Major Arcana", image: "src/tarot_cards/the_tower.jpg" },
  { name: "The Star", number: "17", type: "Major Arcana", image: "src/tarot_cards/the_star.jpg" },
  { name: "The Moon", number: "18", type: "Major Arcana", image: "src/tarot_cards/the_moon.jpg" },
  { name: "The Sun", number: "19", type: "Major Arcana", image: "src/tarot_cards/the_sun.jpg" },
  { name: "Judgment", number: "20", type: "Major Arcana", image: "src/tarot_cards/judgment.jpg" },
  { name: "The World", number: "21", type: "Major Arcana", image: "src/tarot_cards/the_world.jpg" },
  
  // Wands suit
  { name: "Ace of Wands", number: "1", type: "Minor Arcana", image: "src/tarot_cards/ace_of_wands.jpg" },
  { name: "Two of Wands", number: "2", type: "Minor Arcana", image: "src/tarot_cards/two_of_wands.jpg" },
  { name: "Three of Wands", number: "3", type: "Minor Arcana", image: "src/tarot_cards/three_of_wands.jpg" },
  { name: "Four of Wands", number: "4", type: "Minor Arcana", image: "src/tarot_cards/four_of_wands.jpg" },
  { name: "Five of Wands", number: "5", type: "Minor Arcana", image: "src/tarot_cards/five_of_wands.jpg" },
  { name: "Six of Wands", number: "6", type: "Minor Arcana", image: "src/tarot_cards/six_of_wands.jpg" },
  { name: "Seven of Wands", number: "7", type: "Minor Arcana", image: "src/tarot_cards/seven_of_wands.jpg" },
  { name: "Eight of Wands", number: "8", type: "Minor Arcana", image: "src/tarot_cards/eight_of_wands.jpg" },
  { name: "Nine of Wands", number: "9", type: "Minor Arcana", image: "src/tarot_cards/nine_of_wands.jpg" },
  { name: "Ten of Wands", number: "10", type: "Minor Arcana", image: "src/tarot_cards/ten_of_wands.jpg" },
  { name: "Page of Wands", number: "11", type: "Minor Arcana", image: "src/tarot_cards/page_of_wands.jpg" },
  { name: "Knight of Wands", number: "12", type: "Minor Arcana", image: "src/tarot_cards/knight_of_wands.jpg" },
  { name: "Queen of Wands", number: "13", type: "Minor Arcana", image: "src/tarot_cards/queen_of_wands.jpg" },
  { name: "King of Wands", number: "14", type: "Minor Arcana", image: "src/tarot_cards/king_of_wands.jpg" },
  
  // Cups suit
  { name: "Ace of Cups", number: "1", type: "Minor Arcana", image: "src/tarot_cards/ace_of_cups.jpg" },
  { name: "Two of Cups", number: "2", type: "Minor Arcana", image: "src/tarot_cards/two_of_cups.jpg" },
  { name: "Three of Cups", number: "3", type: "Minor Arcana", image: "src/tarot_cards/three_of_cups.jpg" },
  { name: "Four of Cups", number: "4", type: "Minor Arcana", image: "src/tarot_cards/four_of_cups.jpg" },
  { name: "Five of Cups", number: "5", type: "Minor Arcana", image: "src/tarot_cards/five_of_cups.jpg" },
  { name: "Six of Cups", number: "6", type: "Minor Arcana", image: "src/tarot_cards/six_of_cups.jpg" },
  { name: "Seven of Cups", number: "7", type: "Minor Arcana", image: "src/tarot_cards/seven_of_cups.jpg" },
  { name: "Eight of Cups", number: "8", type: "Minor Arcana", image: "src/tarot_cards/eight_of_cups.jpg" },
  { name: "Nine of Cups", number: "9", type: "Minor Arcana", image: "src/tarot_cards/nine_of_cups.jpg" },
  { name: "Ten of Cups", number: "10", type: "Minor Arcana", image: "src/tarot_cards/ten_of_cups.jpg" },
  { name: "Page of Cups", number: "11", type: "Minor Arcana", image: "src/tarot_cards/page_of_cups.jpg" },
  { name: "Knight of Cups", number: "12", type: "Minor Arcana", image: "src/tarot_cards/knight_of_cups.jpg" },
  { name: "Queen of Cups", number: "13", type: "Minor Arcana", image: "src/tarot_cards/queen_of_cups.jpg" },
  { name: "King of Cups", number: "14", type: "Minor Arcana", image: "src/tarot_cards/king_of_cups.jpg" },
  
  // Swords suit
  { name: "Ace of Swords", number: "1", type: "Minor Arcana", image: "src/tarot_cards/ace_of_swords.jpg" },
  { name: "Two of Swords", number: "2", type: "Minor Arcana", image: "src/tarot_cards/two_of_swords.jpg" },
  { name: "Three of Swords", number: "3", type: "Minor Arcana", image: "src/tarot_cards/three_of_swords.jpg" },
  { name: "Four of Swords", number: "4", type: "Minor Arcana", image: "src/tarot_cards/four_of_swords.jpg" },
  { name: "Five of Swords", number: "5", type: "Minor Arcana", image: "src/tarot_cards/five_of_swords.jpg" },
  { name: "Six of Swords", number: "6", type: "Minor Arcana", image: "src/tarot_cards/six_of_swords.jpg" },
  { name: "Seven of Swords", number: "7", type: "Minor Arcana", image: "src/tarot_cards/seven_of_swords.jpg" },
  { name: "Eight of Swords", number: "8", type: "Minor Arcana", image: "src/tarot_cards/eight_of_swords.jpg" },
  { name: "Nine of Swords", number: "9", type: "Minor Arcana", image: "src/tarot_cards/nine_of_swords.jpg" },
  { name: "Ten of Swords", number: "10", type: "Minor Arcana", image: "src/tarot_cards/ten_of_swords.jpg" },
  { name: "Page of Swords", number: "11", type: "Minor Arcana", image: "src/tarot_cards/page_of_swords.jpg" },
  { name: "Knight of Swords", number: "12", type: "Minor Arcana", image: "src/tarot_cards/knight_of_swords.jpg" },
  { name: "Queen of Swords", number: "13", type: "Minor Arcana", image: "src/tarot_cards/queen_of_swords.jpg" },
  { name: "King of Swords", number: "14", type: "Minor Arcana", image: "src/tarot_cards/king_of_swords.jpg" },
  
  // Pentacles suit
  { name: "Ace of Pentacles", number: "1", type: "Minor Arcana", image: "src/tarot_cards/ace_of_pentacles.jpg" },
  { name: "Two of Pentacles", number: "2", type: "Minor Arcana", image: "src/tarot_cards/two_of_pentacles.jpg" },
  { name: "Three of Pentacles", number: "3", type: "Minor Arcana", image: "src/tarot_cards/three_of_pentacles.jpg" },
  { name: "Four of Pentacles", number: "4", type: "Minor Arcana", image: "src/tarot_cards/four_of_pentacles.jpg" },
  { name: "Five of Pentacles", number: "5", type: "Minor Arcana", image: "src/tarot_cards/five_of_pentacles.jpg" },
  { name: "Six of Pentacles", number: "6", type: "Minor Arcana", image: "src/tarot_cards/six_of_pentacles.jpg" },
  { name: "Seven of Pentacles", number: "7", type: "Minor Arcana", image: "src/tarot_cards/seven_of_pentacles.jpg" },
  { name: "Eight of Pentacles", number: "8", type: "Minor Arcana", image: "src/tarot_cards/eight_of_pentacles.jpg" },
  { name: "Nine of Pentacles", number: "9", type: "Minor Arcana", image: "src/tarot_cards/nine_of_pentacles.jpg" },
  { name: "Ten of Pentacles", number: "10", type: "Minor Arcana", image: "src/tarot_cards/ten_of_pentacles.jpg" },
  { name: "Page of Pentacles", number: "11", type: "Minor Arcana", image: "src/tarot_cards/page_of_pentacles.jpg" },
  { name: "Knight of Pentacles", number: "12", type: "Minor Arcana", image: "src/tarot_cards/knight_of_pentacles.jpg" },
  { name: "Queen of Pentacles", number: "13", type: "Minor Arcana", image: "src/tarot_cards/queen_of_pentacles.jpg" },
  { name: "King of Pentacles", number: "14", type: "Minor Arcana", image: "src/tarot_cards/king_of_pentacles.jpg" }
];

const formatMessage = (text) => {
  if (!text) return '';
  
  return text
    // Handle headers (###)
    .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    
    // Handle bold (**text**)
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    
    // Handle bullet points (handle both - and •)
    .replace(/[•-] (.*?)(\n|$)/g, '<li class="ml-4">$1</li>')
    
    // Handle horizontal rules (---)
    .replace(/---/g, '<hr class="my-4 border-gray-700/30">')
    
    // Convert newlines to <br> tags
    .replace(/\n/g, '<br>');
};

function App() {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [input, setInput] = useState('');
  const [showQuickQuestions, setShowQuickQuestions] = useState(false);
  const [showReading, setShowReading] = useState(false);
  const [drawnCards, setDrawnCards] = useState([null, null, null]);
  const [showReadingResult, setShowReadingResult] = useState(false);
  const [messages, setMessages] = useState([]);
  const [readings, setReadings] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterpretingCards, setIsInterpretingCards] = useState(false);

  useEffect(() => {
    const initializeSession = async () => {
      setIsInitialized(true);
      
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "",
          session: null
        })
      });

      const reader = response.body.getReader();
      let accumulatedText = '';

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (!line.trim() || !line.startsWith('data: ')) continue;
            
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            
            try {
              const parsedData = JSON.parse(data);
              
              if (parsedData.content) {
                accumulatedText += parsedData.content;
                setMessages(prev => {
                  if (prev.length > 0 && prev[prev.length - 1].type === 'bot') {
                    return prev.map((msg, i) => 
                      i === prev.length - 1 ? { ...msg, text: accumulatedText } : msg
                    );
                  } else {
                    return [...prev, {
                      id: Date.now(),
                      type: 'bot',
                      text: accumulatedText,
                      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    }];
                  }
                });
              }
              
              if (parsedData.session) {
                localStorage.setItem('tarot_session', parsedData.session);
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error in stream processing:', error);
      }
    };

    if (!isInitialized) {
      initializeSession();
    }
  }, [isInitialized]);

  const scrollNewMessageToTop = () => {
    setTimeout(() => {  // Add small delay to ensure DOM is updated
      const messages = document.querySelectorAll('.message-box');
      if (messages.length < 2) return;
      const lastMessage = messages[messages.length - 2]; // Get the last user message
      const chatContainer = chatContainerRef.current;
      
      if (lastMessage && chatContainer) {
        const headerHeight = 72; // Height of your fixed header
        const messageTop = lastMessage.offsetTop;
        
        console.log('Last message position:', messageTop);
        console.log('Current scroll position:', chatContainer.scrollTop);
        console.log('Scrolling to:', messageTop - headerHeight - 20);
        
        chatContainer.scrollTo({
          top: messageTop - headerHeight - 20,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const isMessageVisible = () => {
    const messages = document.querySelectorAll('.message-box');
    const lastMessage = messages[messages.length - 1];
    const chatContainer = chatContainerRef.current;
    
    if (!lastMessage || !chatContainer) return false;
    
    const headerHeight = 72;
    const messageTop = lastMessage.offsetTop;
    return messageTop >= headerHeight && messageTop <= window.innerHeight;
  };

  const handleTextareaHeight = (element) => {
    if (!element) return;
    // Reset height to auto to get the correct scrollHeight
    element.style.height = 'auto';
    // Set new height based on scrollHeight
    element.style.height = `${element.scrollHeight}px`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Reset textarea height
    const textarea = e.target.querySelector('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
    }
    
    scrollNewMessageToTop();

    try {
      const response = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.text,
          session: localStorage.getItem('tarot_session'),
          preserveState: true
        })
      });

      const reader = response.body.getReader();
      let accumulatedText = '';
      let isFirstChunk = true;
      let readingId = Date.now(); // Add this for the reading ID

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        console.log('Raw chunk received:', chunk);
        
        const lines = chunk.split('\n');
        console.log('Split lines:', lines);
        
        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) {
            console.log('Skipping line:', line);
            continue;
          }
          
          const data = line.slice(6).trim();
          console.log('Processed data:', data);
          
          if (data === '[DONE]') {
            console.log('Received DONE signal');
            continue;
          }

          try {
            const parsedData = JSON.parse(data);
            console.log('Parsed JSON data:', parsedData);
            
            if (parsedData.content) {
              accumulatedText += parsedData.content;
              console.log('Accumulated text:', accumulatedText);
              if (isFirstChunk) {
                setIsLoading(false);
                isFirstChunk = false;
                setMessages(prev => [...prev, {
                  type: 'bot',
                  text: accumulatedText
                }]);
              } else {
                setMessages(prev => prev.map((msg, i) => 
                  i === prev.length - 1 ? { ...msg, text: accumulatedText } : msg
                ));
              }
            }

            // Handle showCards flag
            if (parsedData.showCards) {
              console.log('Received showCards flag');
              setMessages(prev => [...prev, {
                id: readingId,
                type: 'reading',
                drawnCards: [null, null, null],
                complete: false
              }]);
            }
            
            if (parsedData.session) {
              console.log('Received new session');
              localStorage.setItem('tarot_session', parsedData.session);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
            setIsLoading(false); // Hide loading on error
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const handleDrawCard = (readingId, cardIndex) => {
    console.log('handleDrawCard called with:', { readingId, cardIndex });
    
    const currentReading = messages.find(msg => msg.id === readingId);
    if (!currentReading) {
      console.log('No reading found with ID:', readingId);
      return;
    }

    // Prevent drawing if card is already drawn
    if (currentReading.drawnCards[cardIndex] !== null) {
      console.log('Card already drawn at index:', cardIndex);
      return;
    }

    const drawnCards = currentReading.drawnCards.filter(card => card !== null);
    const availableCards = tarotCards.filter(card => 
      !drawnCards.some(drawnCard => drawnCard.name === card.name)
    );
    
    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    console.log('Drawing card:', randomCard.name);
    
    // First update the cards
    setMessages(prev => {
      return prev.map(msg => {
        if (msg.id === readingId) {
          const newDrawnCards = [...msg.drawnCards];
          newDrawnCards[cardIndex] = randomCard;
          return {
            ...msg,
            drawnCards: newDrawnCards,
            complete: newDrawnCards.every(card => card !== null)
          };
        }
        return msg;
      });
    });

    // Then check if we should fetch interpretation
    const isComplete = currentReading.drawnCards.filter(card => card !== null).length === 2 
      && currentReading.drawnCards[cardIndex] === null;

    if (isComplete) {
      const allDrawnCards = [...currentReading.drawnCards];
      allDrawnCards[cardIndex] = randomCard;
      
      // Show loading animation with interpreting cards state
      setIsLoading(true);
      setIsInterpretingCards(true);
      
      // Scroll to bottom after a short delay to ensure cards are rendered
      setTimeout(() => {
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);

      fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "Cards drawn for the above user question, please interpret them.",
          session: localStorage.getItem('tarot_session'),
          drawnCards: allDrawnCards.map(card => card.name)
        })
      })
      .then(response => response.body.getReader())
      .then(reader => {
        let accumulatedText = '';

        function processText({ done, value }) {
          if (done) return;
          
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (!line.trim() || !line.startsWith('data: ')) continue;
            
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            
            try {
              const parsedData = JSON.parse(data);
              if (parsedData.session) {
                localStorage.setItem('tarot_session', parsedData.session);
              }
              
              if (parsedData.content) {
                // Hide loading animation on first content
                setIsLoading(false);
                setIsInterpretingCards(false);
                
                accumulatedText += parsedData.content;
                setMessages(prev => {
                  const lastMessage = prev[prev.length - 1];
                  if (lastMessage && lastMessage.type === 'bot') {
                    return prev.map((msg, i) => 
                      i === prev.length - 1 ? { ...msg, text: accumulatedText } : msg
                    );
                  } else {
                    return [...prev, {
                      type: 'bot',
                      text: accumulatedText
                    }];
                  }
                });
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
              setIsLoading(false);
              setIsInterpretingCards(false);
            }
          }
          
          return reader.read().then(processText);
        }
        
        return reader.read().then(processText);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
        setIsInterpretingCards(false);
      });
    }
  };

  const handleQuickQuestion = (question) => {
    const newMessage = {
      type: 'user',
      text: question,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setShowQuickQuestions(false);
  };

  const handleNewChat = async () => {
    // Reset all states immediately
    setMessages([]);
    setInput('');
    setShowQuickQuestions(false);
    setShowReading(false);
    setDrawnCards([null, null, null]);
    setShowReadingResult(false);
    setReadings([]);
    setIsGenerating(false);
    setIsLoading(false);
    setIsInterpretingCards(false);
    localStorage.removeItem('tarot_session');
    
    // Initialize new session with opening message
    const response = await fetch(`${API_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "",
        session: null  // This will create a new session with 'open' state
      })
    });

    const reader = response.body.getReader();
    let accumulatedText = '';

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data: ')) continue;
          
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          
          try {
            const parsedData = JSON.parse(data);
            
            if (parsedData.content) {
              accumulatedText += parsedData.content;
              setMessages(prev => {
                if (prev.length === 0) {
                  return [{
                    type: 'bot',
                    text: accumulatedText
                  }];
                } else {
                  return prev.map((msg, i) => 
                    i === 0 ? { ...msg, text: accumulatedText } : msg
                  );
                }
              });
            }
            
            if (parsedData.session) {
              localStorage.setItem('tarot_session', parsedData.session);
            }
          } catch (e) {
            console.error('Error parsing chunk:', e);
          }
        }
      }
    } catch (error) {
      console.error('Error in stream processing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#1a1b26] z-10 flex items-center justify-between p-4 border-b border-gray-700/30">
        <button 
          onClick={handleNewChat}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700/50 transition-colors"
          title="New Chat"
        >
          <MessageSquarePlus className="w-6 h-6 text-gray-400" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Mystic Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-xl font-semibold">Mystic</span>
        </div>
        <div className="w-8 h-8" /> {/* Empty div for balanced spacing */}
      </header>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="h-screen pt-[72px] pb-[80px] overflow-y-auto"
      >
        <div className="p-4 space-y-4">
          {/* Messages including reading sections */}
          <div className="space-y-6">
            {messages.map((message, index) => {
              if (message.type === 'bot') {
                return message.text ? (
                  <div key={index} className="message-box">
                    <div className="flex-1">
                      <div className="bg-gray-800/50 rounded-2xl p-4">
                        <p 
                          className="whitespace-pre-line"
                          dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null;
              } else if (message.type === 'user') {
                return (
                  <div key={index} className="flex gap-3 justify-end message-box">
                    <div className="flex-1 text-right">
                      <div className="bg-yellow-500 rounded-2xl p-4 inline-block max-w-[80%] ml-auto text-left text-[#1a1b26]">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </div>
                );
              } else if (message.type === 'reading') {
                return (
                  <div key={index} className="space-y-4">
                    <h2 className="text-yellow-500 text-2xl font-medium text-center">
                      {!message.complete ? "Click to draw cards" : "Your Three-Card Reading"}
                    </h2>
                    <div className="flex justify-center gap-4 my-4">
                      {message.drawnCards.map((card, cardIndex) => (
                        <div key={cardIndex} className="flex flex-col items-center w-[30%]">
                          <div 
                            className="relative w-full pb-[172.7%] rounded-lg overflow-hidden"
                          >
                            <div className="absolute inset-0">
                              {card ? (
                                <div className="w-full h-full">
                                  <img 
                                    src={card.image} 
                                    alt={card.name}
                                    className="w-full h-full object-cover animate-cardDraw"
                                  />
                                </div>
                              ) : (
                                <div 
                                  className="w-full h-full flex items-center justify-center text-center p-2 cursor-pointer hover:bg-gray-700/50 border rounded-lg"
                                  onClick={() => handleDrawCard(message.id, cardIndex)}
                                >
                                  <span className="text-gray-400 text-lg">Draw Card</span>
                                </div>
                              )}
                            </div>
                          </div>
                          {card && (
                            <div className="text-center mt-2">
                              <div className="text-xs font-medium text-white">{card.name}</div>
                              <div className="text-sm text-gray-500">{card.type}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            })}

            {/* Loading animation */}
            {isLoading && (
              <div className="message-box">
                <div className="flex-1">
                  <div className="flex items-center gap-4 p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-gray-400">
                      {isInterpretingCards ? "Interpreting your cards" : "Thinking"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Only show padding when generating */}
        {isGenerating && <div className="h-[calc(68vh-72px)]" />}
      </div>

      {/* Quick Questions - Fixed position */}
      {showQuickQuestions && (
        <div className="fixed bottom-[80px] left-0 right-0 p-4 bg-[#1a1b26]">
          <div className="flex flex-col items-start gap-2 max-w-[600px] mx-auto px-4">
            <button 
              onClick={() => handleQuickQuestion("Will I find love this year?")}
              className="inline-block bg-gray-800/50 rounded-full py-3 px-6 text-gray-300 hover:bg-gray-700/50 transition text-left"
            >
              Will I find love this year?
            </button>
            <button 
              onClick={() => handleQuickQuestion("What's blocking my growth?")}
              className="inline-block bg-gray-800/50 rounded-full py-3 px-6 text-gray-300 hover:bg-gray-700/50 transition text-left"
            >
              What's blocking my growth?
            </button>
            <button 
              onClick={() => handleQuickQuestion("What energy surrounds my love life right now, and how can I nurture it?")}
              className="inline-block bg-gray-800/50 rounded-full py-3 px-6 text-gray-300 hover:bg-gray-700/50 transition text-left"
            >
              What energy surrounds my love life right now, and how can I nurture it?
            </button>
            <button 
              onClick={() => handleQuickQuestion("What hidden strengths should I lean into for career growth?")}
              className="inline-block bg-gray-800/50 rounded-full py-3 px-6 text-gray-300 hover:bg-gray-700/50 transition text-left"
            >
              What hidden strengths should I lean into for career growth?
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1b26] border-t border-gray-700/30">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-[1200px] mx-auto">
          <textarea
            rows="1"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTextareaHeight(e.target);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const form = e.target.closest('form');
                // Reset height immediately
                e.target.style.height = 'auto';
                handleSubmit({ 
                  preventDefault: () => {},
                  target: form 
                });
              }
            }}
            placeholder="Ask a question..."
            className="flex-1 bg-gray-800/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500/50 resize-none max-h-[200px] overflow-y-auto"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-[#1a1b26] rounded-xl px-4 py-2 font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Add padding to main chat area to prevent content from being hidden */}
      <style jsx>{`
        .p-4.space-y-6 {
          padding-bottom: 160px;
        }

        @keyframes cardDraw {
          0% {
            transform: rotateY(0deg) scale(0.5);
            opacity: 0;
          }
          100% {
            transform: rotateY(720deg) scale(1);
            opacity: 1;
          }
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
        
        .animate-cardDraw {
          animation: cardDraw 1s ease-in-out;
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-in-out;
        }

        @keyframes cardReveal {
          // Add your card reveal animation styles here
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .card-flip {
          position: relative;
          transform-style: preserve-3d;
        }

        .card-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: cardFlip 1s ease-in-out forwards;
        }

        .card-front, .card-back {
          backface-visibility: hidden;
        }

        .card-back {
          background-image: linear-gradient(45deg, #4a90e2 25%, #357abd 25%, #357abd 50%, #4a90e2 50%, #4a90e2 75%, #357abd 75%, #357abd 100%);
          background-size: 56.57px 56.57px;
          transform: rotateY(180deg);
        }

        .card-front {
          transform: rotateY(0deg);
        }

        @keyframes cardFlip {
          0% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;