
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
      text: 'Hi! I\'m your AI-powered learning assistant. I can help you with course recommendations, study tips, and answer your questions about technology and learning. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
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

    try {
      // Use Hugging Face API for intelligent responses
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer hf_demo_token', // Using demo token
        },
        body: JSON.stringify({
          inputs: inputText,
          parameters: {
            max_length: 100,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botText = Array.isArray(data) && data[0]?.generated_text 
        ? data[0].generated_text 
        : generateFallbackResponse(inputText);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      // Fallback to predefined responses if API fails
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFallbackResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if user is asking about a specific course
    const matchedCourse = courses.find((course) => {
      const titleWords = course.title.toLowerCase().split(/[\s&,/]+/);
      const idWords = course.id.toLowerCase().split('-');
      return (
        titleWords.some((word) => word.length > 2 && lowerMessage.includes(word)) ||
        idWords.some((word) => word.length > 2 && lowerMessage.includes(word))
      );
    });

    if (matchedCourse) {
      return `Yes! We have "${matchedCourse.title}" available. ${matchedCourse.description} You can enroll from the Courses page!`;
    }

    // If user seems to be asking about a course but it's not found
    const courseInquiryWords = ['is', 'are', 'do you have', 'available', 'there', 'course', 'learn', 'teach'];
    const isCourseQuery = courseInquiryWords.some((word) => lowerMessage.includes(word)) || lowerMessage.split(' ').length <= 4;
    if (isCourseQuery) {
      return `Sorry, we don't have a "${userMessage}" course yet. But we offer ${courses.length} courses including Data Science, Python, Machine Learning, AWS, Docker, DevOps, and more. Type "list all courses" to see everything!`;
    }

    // Total number of courses
    if (lowerMessage.includes('total') || lowerMessage.includes('how many') || lowerMessage.includes('number of')) {
      return `We currently offer ${courses.length} courses in total! Type "list all courses" to see the full list.`;
    }

    // List all courses
    if (lowerMessage.includes('list') || lowerMessage.includes('all course') || lowerMessage.includes('what course') || lowerMessage.includes('available')) {
      const courseList = courses.map((c) => `• ${c.title}`).join('\n');
      return `Here are all our available courses:\n\n${courseList}\n\nVisit the Courses page to enroll!`;
    }

    // Course-related responses
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      const courseList = courses.map((c) => c.title).join(', ');
      return `We offer ${courses.length} courses: ${courseList}. Visit the Courses page to explore and enroll!`;
    }

    // Pricing responses
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return 'Our pricing is designed to be accessible. Free courses are available, and premium courses start at $9.99. We also offer bundle discounts for multiple courses.';
    }

    // Enrollment responses
    if (lowerMessage.includes('enroll') || lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return 'To enroll in a course, simply click on any course card and select "Enroll Now". You\'ll need to create an account if you haven\'t already. The process takes just a few minutes!';
    }

    // Technical support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem')) {
      return 'I\'m here to help! Common issues can be resolved by clearing your browser cache or trying a different browser. For specific issues, please contact our support team.';
    }

    // Study tips
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('study')) {
      return 'Here are some study tips: 1) Set a consistent schedule, 2) Take notes while watching videos, 3) Practice with hands-on projects, 4) Join our community discussions, 5) Review previous lessons regularly.';
    }

    // Career guidance
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return 'Our courses are designed with career advancement in mind. We cover in-demand skills that employers seek. Many students have successfully transitioned to tech roles after completing our courses.';
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = [
        'Hello! Welcome to FutureSkills Academy. I\'m here to help you with your learning journey. What would you like to know?',
        'Hi there! I\'m excited to help you learn. Feel free to ask me anything about our courses or learning resources.',
        'Hey! Great to see you. I can help you find the right courses, answer questions, or provide study tips. What\'s on your mind?',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Thank you responses
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! I\'m always here to help. Feel free to ask if you have more questions!';
    }

    // Topic-specific responses
    if (lowerMessage.includes('data science') || lowerMessage.includes('data')) {
      return 'We have a great Data Science course covering Python, Pandas, NumPy, data visualization, and machine learning basics. You can find it on the Courses page!';
    }

    if (lowerMessage.includes('python')) {
      return 'Our Python course covers everything from basics to advanced topics like OOP, file handling, and libraries like NumPy and Pandas. Perfect for beginners and intermediate learners!';
    }

    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('ai')) {
      return 'Our Machine Learning & AI course covers supervised/unsupervised learning, neural networks, and real-world projects using scikit-learn and TensorFlow.';
    }

    if (lowerMessage.includes('cloud') || lowerMessage.includes('aws')) {
      return 'We offer AWS and Cloud Computing courses covering EC2, S3, Lambda, and cloud architecture. Great for DevOps and backend engineers!';
    }

    if (lowerMessage.includes('web') || lowerMessage.includes('frontend') || lowerMessage.includes('react')) {
      return 'Our Web Development courses cover HTML, CSS, JavaScript, React, and Next.js. Build real projects and deploy them to the web!';
    }

    if (lowerMessage.includes('yes') || lowerMessage.includes('ok') || lowerMessage.includes('sure') || lowerMessage.includes('find')) {
      return 'Great! Head over to our Courses page to browse all available courses. We have Data Science, Python, ML, AWS, Web Dev, DevOps and more. Click "Courses" in the navbar!';
    }

    if (lowerMessage.includes('no') || lowerMessage.includes('nope')) {
      return 'No problem! Feel free to ask me anything else. I am here to help anytime.';
    }

    // Default response
    return 'I can help you with course recommendations, enrollment, pricing, and study tips. Try asking about a specific topic like "Data Science", "Python", "AWS", or "Machine Learning"!';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300"
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

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] glass-effect rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
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
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
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

          {/* Input */}
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
