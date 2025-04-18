'use client';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SendHorizontal, Bot, User, Copy, Check, Martini } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError('');

    // Placeholder for streaming response
    const aiMessagePlaceholder: Message = {
      id: crypto.randomUUID(),
      role: 'model',
      content: '', // Start with empty content
    };
    setMessages((prev) => [...prev, aiMessagePlaceholder]);

    try {
      // Use environment variable for API Key
      const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
      if (!apiKey) {
        throw new Error('API key is not configured. Please set VITE_GOOGLE_AI_API_KEY in your .env file.');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const chat = model.startChat({
        // Pass message history, excluding the placeholder
        history: messages
          .filter(m => m.id !== aiMessagePlaceholder.id)
          .map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.content }],
          })),
        generationConfig: {
          temperature: 0.7,
          topK: 1,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      });

      const prompt = `You are MixMaster AI, a virtual bartender. You are an expert in making drinks and can suggest, explain, and recommend cocktails, mocktails, or any drink-related information. Stay in character as a bartender and only provide responses related to drinks. Do not respond to queries unrelated to bartending. Always provide detailed recipes with ingredients and step-by-step instructions when asked about specific drinks. Format your responses using Markdown (e.g., use lists for ingredients/steps, bold for emphasis).

Current request: ${userMessage.content}

Please provide your response in a clear, friendly manner. If the request is for a drink recipe, include:
1.  **Ingredients:** (list with measurements)
2.  **Instructions:** (step-by-step list)
3.  **Garnish:** (suggestion)
4.  **Tips/Variations:** (optional)`;

      const result = await chat.sendMessageStream(prompt);

      // Stream the response
      let accumulatedText = '';
      for await (const chunk of result.stream) {
        accumulatedText += chunk.text();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessagePlaceholder.id
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }

    } catch (err) {
      console.error('AI Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Oops! The bartender had an issue: ${errorMessage}`);
      // Remove placeholder and user message on error
      setMessages((prev) => prev.filter(m => m.id !== userMessage.id && m.id !== aiMessagePlaceholder.id));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, messageId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    // Main container with video background
    <div className="relative flex flex-col h-screen text-white font-sans overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="/chat2.mp4" // Using chat2.mp4 video
      >
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60 z-0"></div> {/* Overlay */}

      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg p-4 shadow-xl border-b border-purple-600/30 sticky top-0 z-20">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 text-transparent bg-clip-text">
          MixMaster AI
        </h1>
        <p className="text-center text-xs text-purple-300/80 tracking-wider">Your Virtual Bartender</p>
      </div>

      {/* Chat Area */}
      <div
        className="flex-1 overflow-y-auto space-y-6 p-6 chat-area relative z-10"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#7e22ce transparent' }}
      >
        {/* Welcome Message */}
        {messages.length === 0 && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 animate-fade-in pointer-events-none">
            <div className="relative mb-6">
               <div className="absolute -inset-4 bg-purple-900/10 blur-xl rounded-full"></div>
               <Martini size={80} className="text-purple-400 drop-shadow-lg relative z-10 animate-pulse" />
            </div>
            <p className="text-2xl font-semibold text-gray-200 mb-2">Welcome to the Virtual Bar!</p>
            <p className="text-md text-gray-400">What cocktail creation can I whip up for you?</p>
          </div>
        )}
        
        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 animate-slide-in-bottom z-10 relative ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg border-2 border-purple-800/50">
                <Bot size={18} className="text-white" />
              </div>
            )}
            <div
              className={`relative group max-w-lg lg:max-w-xl p-4 rounded-2xl shadow-xl transition-all duration-300 prose prose-sm prose-invert prose-headings:my-2 prose-p:my-1 prose-li:my-0.5 prose-ul:my-1 prose-ol:my-1 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-700 to-cyan-600/90 text-white rounded-br-lg'
                  : 'bg-gradient-to-l from-gray-700/90 to-gray-800/80 backdrop-blur-sm text-gray-200 rounded-bl-lg'
              }`}
            >
              {msg.role === 'model' ? (
                 <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content || '...'}</ReactMarkdown>
              ) : (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              )}
              {msg.role === 'model' && msg.content && (
                <button 
                  onClick={() => handleCopy(msg.content, msg.id)}
                  title="Copy message"
                  className="absolute -top-2 -right-2 p-1 rounded-full bg-gray-600/80 hover:bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {copiedMessageId === msg.id ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
              {msg.role === 'model' && !msg.content && isLoading && (
                 <div className="flex space-x-1 items-center h-5">
                    <span className="block w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="block w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="block w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></span>
                 </div>
              )}
            </div>
             {msg.role === 'user' && (
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg border-2 border-cyan-700/50">
                <User size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Error Message */}
        {error && (
          <div className="sticky bottom-20 z-10 max-w-md mx-auto bg-red-800/80 backdrop-blur-sm border border-red-600 text-red-100 p-3 rounded-lg text-center text-xs animate-shake shadow-lg">
            <span className="font-semibold">Oops!</span> {error.replace('Oops! The bartender had an issue: ', '')}
          </div>
        )}
        <div ref={chatEndRef} className="h-1" />
      </div>

      {/* Input Form */}
      <div className="bg-gradient-to-t from-black/70 via-black/50 to-transparent p-4 sticky bottom-0 z-20">
        <form
          onSubmit={handleSend}
          className="max-w-3xl mx-auto flex gap-3 items-center bg-gradient-to-br from-gray-800/80 to-gray-900/70 backdrop-blur-md rounded-full p-2 border border-purple-800/50 focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500 transition-all duration-300 shadow-lg"
        >
           <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e as unknown as FormEvent<HTMLFormElement>); 
              }
            }}
            className="flex-1 bg-transparent focus:outline-none px-4 py-2 text-white placeholder-gray-500 text-sm resize-none overflow-hidden max-h-24"
            placeholder={isLoading ? "MixMaster is crafting a response..." : "Ask for a cocktail recipe..."}
            disabled={isLoading}
            rows={1}
            style={{ height: 'auto' }} 
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
          <button
            type="submit"
            title="Send Message"
            className={`self-end p-2.5 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center ${
              isLoading || !input.trim()
                ? 'bg-gray-600/50 text-gray-500 cursor-not-allowed scale-95'
                : 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white focus:ring-pink-500 transform hover:scale-110'
            }`}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-t-transparent border-purple-300 rounded-full animate-spin"></div>
            ) : (
              <SendHorizontal size={18} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
