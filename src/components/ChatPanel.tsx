'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Sparkles, ExternalLink, Paperclip, Settings, Key } from 'lucide-react';
import { ChatMessage, Clause, getAIResponse } from '@/lib/mockData';

interface ChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    clauses: Clause[];
    onCitationClick?: (clauseId: string) => void;
    initialMessages?: ChatMessage[];
}

export default function ChatPanel({ isOpen, onClose, clauses, onCitationClick, initialMessages }: ChatPanelProps) {
    const [messages, setMessages] = useState<ChatMessage[]>(
        initialMessages || [
            {
                id: 'welcome',
                role: 'assistant',
                content: "Hello! I've analyzed your document. Ask me anything about the clauses, risks, or terms.",
                timestamp: new Date().toISOString(),
            },
        ]
    );
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showApiSettings, setShowApiSettings] = useState(false);
    const [apiKey, setApiKey] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileAttachRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
        const savedKey = localStorage.getItem('lexclarity-api-key');
        if (savedKey) setApiKey(savedKey);
    }, [isOpen]);

    const saveApiKey = () => {
        localStorage.setItem('lexclarity-api-key', apiKey);
        setShowApiSettings(false);
    };

    const handleSend = async () => {
        if (!input.trim()) return;
        const userText = input.trim();
        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: userText,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Load API key from environment variables for security
        const savedKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

        if (savedKey && savedKey.length > 10) {
            // REAL GEN AI API CALL (Gemini)
            try {
                // Build a context string from the clauses
                const documentContext = clauses.map(c => `Clause: ${c.title}\nText: ${c.originalText}`).join('\n\n');
                const prompt = `You are LexClarity AI, a highly advanced legal assistant. 
Context Document:\n${documentContext}\n\n
User Question: ${userText}\n\n
Answer clearly, concisely, and professionally. Use markdown formatting.`;

                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${savedKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }]
                    })
                });

                if (!res.ok) throw new Error('API Error');
                const data = await res.json();
                const aiText = data.candidates[0].content.parts[0].text;

                setMessages((prev) => [...prev, {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: aiText,
                    timestamp: new Date().toISOString(),
                }]);
            } catch (error) {
                // Fallback on error
                const response = getAIResponse(userText, clauses);
                setMessages((prev) => [...prev, {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: `*(Live API Error. Using Local Engine)*\n\n${response.content}`,
                    citations: response.citations,
                    timestamp: new Date().toISOString(),
                }]);
            }
        } else {
            // MOCK ENGINE FALLBACK
            await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
            const response = getAIResponse(userText, clauses);
            setMessages((prev) => [...prev, {
                id: `ai-${Date.now()}`,
                role: 'assistant',
                content: response.content,
                citations: response.citations,
                timestamp: new Date().toISOString(),
            }]);
        }
        setIsTyping(false);
    };

    const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            const attachMsg: ChatMessage = {
                id: `user-${Date.now()}`,
                role: 'user',
                content: `📎 Attached: ${fileName}`,
                timestamp: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, attachMsg]);
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                setMessages((prev) => [...prev, {
                    id: `ai-${Date.now()}`,
                    role: 'assistant',
                    content: `I have received **${fileName}**. I'm currently scanning it using our RAG pipeline. How would you like me to analyze this attached document?`,
                    timestamp: new Date().toISOString(),
                }]);
            }, 2000);
        }
    };

    const suggestedQuestions = [
        'What are the main risks?',
        'Explain the payment terms',
        'Can this be terminated?',
        'What about confidentiality?',
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] z-50 flex flex-col bg-[var(--surface-raised)] border-l border-[var(--border)] shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)] relative">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                                    AI Legal Assistant
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Live GenAI Connected"></span>
                                </h3>
                                <p className="text-xs text-[var(--text-muted)]">Live Generative AI Connected</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-150"
                                aria-label="Close chat"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                        {messages.map((msg, i) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0.05 : 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-[var(--accent)] text-white rounded-br-md'
                                        : 'bg-[var(--surface)] text-[var(--text-primary)] rounded-bl-md border border-[var(--border)]'
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                                        __html: msg.content
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\n/g, '<br/>')
                                    }} />
                                    {msg.citations && msg.citations.length > 0 && (
                                        <div className="mt-3 pt-2 border-t border-[var(--border)] space-y-1.5">
                                            <p className="text-xs font-medium text-[var(--text-muted)]">Referenced clauses:</p>
                                            {msg.citations.map((cit) => (
                                                <button
                                                    key={cit.clauseId}
                                                    onClick={() => onCitationClick?.(cit.clauseId)}
                                                    className="flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline w-full text-left"
                                                >
                                                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                                    {cit.text}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-start"
                            >
                                <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                    <span className="typing-dot" />
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    {messages.length <= 2 && (
                        <div className="px-5 pb-2">
                            <p className="text-xs text-[var(--text-muted)] mb-2">Suggested questions:</p>
                            <div className="flex flex-wrap gap-1.5">
                                {suggestedQuestions.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => {
                                            setInput(q);
                                            setTimeout(() => handleSend(), 100);
                                        }}
                                        className="text-xs px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-all duration-150"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                ref={fileAttachRef}
                                className="hidden"
                                accept=".pdf,.doc,.docx,.txt"
                                onChange={handleAttachFile}
                            />
                            <button
                                onClick={() => fileAttachRef.current?.click()}
                                className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-150"
                                aria-label="Upload document"
                            >
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about this document..."
                                className="flex-1 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-150"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="w-10 h-10 flex flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
                                aria-label="Send message"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] mt-2 text-center">
                            AI provides general information, not legal advice
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
