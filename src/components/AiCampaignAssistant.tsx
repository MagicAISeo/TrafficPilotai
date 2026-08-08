import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Zap,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { askAiAdvisor } from '../services/api';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  suggestions?: string[];
}

export const AiCampaignAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your TrafficPilot AI Campaign Advisor, powered by Gemini 3.6 Flash. How can I assist with your website traffic strategy, QA load testing, or analytics optimization today?',
      suggestions: [
        'How do I test my checkout funnel safely under peak load?',
        'What is the ideal page depth for e-commerce QA simulation?',
        'Explain how to separate QA test traffic from GA4 organic reports.',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (queryText?: string) => {
    const query = queryText || input;
    if (!query.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await askAiAdvisor(query);
      setMessages([...newMessages, { sender: 'ai', text: res.answer, suggestions: res.suggestions }]);
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: `I encountered an issue generating advice: ${err.message}. Please check your API configuration.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> AI Campaign Assistant
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gemini 3.6 Flash intelligence for traffic optimization, bottleneck analysis, and QA campaign strategy.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500" /> GEMINI 3.6 FLASH
        </span>
      </div>

      {/* Chat Messages Container */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[480px] flex flex-col justify-between space-y-6">
        <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>

                {/* AI Suggestions Pills */}
                {m.suggestions && m.suggestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" /> Suggested Follow-ups:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {m.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(sug)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 border border-slate-200 dark:border-slate-600 font-medium transition-colors text-[11px] cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <RotateCcw className="w-4 h-4 animate-spin text-amber-500" />
              <span>Gemini AI is analyzing campaign parameters...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask AI about traffic optimization, QA scenarios, or GA4 setup..."
            className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
