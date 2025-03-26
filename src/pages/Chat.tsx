'use client';
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

type Message = {
  role: 'user' | 'model';
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: 'model', content: '' },
    ]);

    const genAI = new GoogleGenerativeAI(
      'AIzaSyA4QZlQYBLL3Ms9KO-TUG4PyQn8RRp-V-Q'
    );
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const systemPrompt = `You are MixMaster AI, a virtual bartender. You are an expert in making drinks and can suggest, explain, and recommend cocktails, mocktails, or any drink-related information. Stay in character as a bartender and only provide responses related to drinks. Do not respond to queries unrelated to bartending.`;

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...messages.map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      ],
    });

    let response = '';
    const result = await chat.sendMessageStream(input);

    for await (const chunk of result.stream) {
      response += chunk.text();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'model', content: response },
      ]);
    }

    setInput('');
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-full p-4 bg-black text-white">
      <div
        className="flex-1 overflow-y-auto space-y-4 pr-2"
        style={{ scrollbarWidth: 'none' }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-lg p-3 rounded-lg shadow-md ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-700 text-white mr-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 justify-center items-center shadow-md fixed bottom-2 p-4 w-full"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-80 p-2 border rounded-lg focus:outline-none bg-gray-800 text-white"
          placeholder="Ask your virtual bartender..."
          disabled={isLoading}
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
