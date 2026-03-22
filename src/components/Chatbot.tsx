'use client';

import { useState, useRef, useEffect } from 'react';
import { courses } from '@/lib/courses';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your learning assistant. Ask me about our courses, pricing, or enrollment!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! Welcome to FutureSkills Academy. How can I help you today?';
    }

    // Thank you
    if (msg.includes('thank')) {
      return "You're welcome! Feel free to ask anything else!";
    }

    // Total / how many
    if (msg.includes('total') || msg.includes('how many') || msg.includes('number of')) {
      return `We currently offer ${courses.length} courses in total! Type "list all courses" to see the full list.`;
    }

    // List all courses
    if (msg.includes('list') || msg.includes('all course') || msg.includes('what course') || msg === 'courses' || msg === 'course') {
      const courseList = courses.map((c) => `• ${c.title}`).join('\n');
      return `Here are all our available courses:\n\n${courseList}\n\nVisit the Courses page to enroll!`;
    }

    // Pricing
    if (msg.includes('price') || msg.includes('cost') || msg.includes('fee') || msg === 'pricing' || msg === 'prices') {
      return 'Free courses are available, and premium courses start at $9.99. We also offer bundle discounts!';
    }

    // Enrollment
    if (msg.includes('enroll') || msg.includes('register') || msg.includes('sign up')) {
      return 'To enroll, click on any course card and select "Enroll Now". Create an account if you haven\'t already!';
    }

    // Study tips
    if (msg.includes('tip') || msg.includes('advice') || msg.includes('study')) {
      return 'Study tips: 1) Set a consistent schedule, 2) Take notes, 3) Practice with projects, 4) Review lessons regularly.';
    }

    // Career
    if (msg.includes('career') || msg.includes('job') || msg.includes('work')) {
      return 'Our courses are designed for career advancement. Many students have transitioned to tech roles after completing our courses!';
    }

    // Yes/Ok follow-ups
    if (msg.includes('yes') || msg.includes('ok') || msg.includes('sure') || msg.includes('find')) {
      return 'Great! Head over to our Courses page to browse all available courses. Click "Courses" in the navbar!';
    }

    // Check for irrelevant topics - but only if they're standalone words, not part of course-related phrases
    const irrelevantTopics = [
      'weather', 'politics', 'sports', 'news', 'joke', 'story', 'movie', 'music', 
      'game', 'food', 'restaurant', 'recipe', 'health', 'medical', 'travel', 
      'shopping', 'fashion', 'entertainment', 'celebrity', 'gossip', 'religion',
      'philosophy', 'history', 'geography', 'biology', 'chemistry', 'physics',
      'literature', 'art', 'dance', 'theater', 'fitness', 'exercise',
      'diet', 'nutrition', 'cooking', 'baking', 'gardening', 'pets', 'animals',
      'cars', 'vehicles', 'real estate', 'finance', 'investing', 'stocks',
      'cryptocurrency', 'bitcoin', 'dating', 'relationships', 'family',
      'parenting', 'children', 'baby', 'pregnancy', 'wedding', 'marriage',
      'time', 'date', 'day', 'year', 'month', 'hour', 'minute', 'second',
      'now', 'today', 'tomorrow', 'yesterday', 'week', 'weekend', 'holiday',
      'calendar', 'clock', 'schedule', 'appointment', 'alarm', 'reminder',
      'birthday', 'age', 'old', 'young', 'height', 'weight', 'measure',
      'temperature', 'forecast', 'rain', 'snow', 'wind', 'storm', 'sun'
    ];

    // Course-related keywords that should NOT be flagged as irrelevant
    const courseKeywords = ['course', 'learn', 'study', 'teach', 'education', 'training', 'skill', 'recommend', 'detail', 'enroll', 'price', 'cost', 'fee', 'list', 'available', 'offer'];

    // Check if message contains any course-related keywords
    const hasCourseKeyword = courseKeywords.some(keyword => msg.includes(keyword));

    // Only flag as irrelevant if no course keywords are present
    const foundIrrelevant = !hasCourseKeyword && irrelevantTopics.find(topic => msg.includes(topic));
    if (foundIrrelevant) {
      return `I'm a learning assistant focused on helping you with courses and education. I can help you with:\n\n• Finding the right course for your goals\n• Course recommendations and details\n• Enrollment and pricing information\n• Study tips and learning resources\n\nFor questions about ${foundIrrelevant}, please use a general search engine or specialist assistant.\n\nWould you like to explore our courses instead? Type "list all courses" to see what we offer!`;
    }

    // Check against real course list
    const matched = courses.find((course) => {
      const titleWords = course.title.toLowerCase().split(/[\s&,/]+/);
      const idWords = course.id.toLowerCase().split('-');
      return (
        titleWords.some((word) => word.length > 2 && msg.includes(word)) ||
        idWords.some((word) => word.length > 2 && msg.includes(word))
      );
    });

    if (matched) {
      return `Yes! We have "${matched.title}" available. ${matched.description} You can enroll from the Courses page!`;
    }

    // Not found
    return `Sorry, we don't have that course yet. We offer ${courses.length} courses including Data Science, Python, ML, AWS, Docker, DevOps and more. Type "list all courses" to see everything!`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass-effect rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Learning Assistant</h3>
                  <p className="text-sm text-blue-100">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
