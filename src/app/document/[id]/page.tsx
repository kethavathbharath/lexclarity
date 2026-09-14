'use client';
import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Share2,
    Download,
    AlertTriangle,
    Info,
    SplitSquareHorizontal,
    ChevronRight,
    MessageSquareText,
    FileText,
    Sparkles,
    BookOpen
} from 'lucide-react';
import { sampleDocuments, sampleClauses, Clause } from '@/lib/mockData';
import ChatPanel from '@/components/ChatPanel';

export default function DocumentView({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [viewMode, setViewMode] = useState<'split' | 'simplified' | 'original'>('split');
    const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const clauseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const doc = sampleDocuments.find(d => d.id === resolvedParams.id) || sampleDocuments[0];

    const handleClauseClick = (clause: Clause) => {
        setSelectedClause(clause);
        setIsChatOpen(true);
    };

    const scrollToClause = (clauseId: string) => {
        const el = clauseRefs.current[clauseId];
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add temporary highlight class
            el.classList.add('clause-highlight');
            setTimeout(() => el.classList.remove('clause-highlight'), 2000);
        }
    };

    return (
        <div className="flex h-screen bg-[var(--background)] overflow-hidden pt-16">

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${isChatOpen ? 'mr-0 sm:mr-[420px]' : ''}`}>

                {/* Top Action Bar */}
                <div className="h-14 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] transition-colors"
                        >
                            <ArrowLeft className="w-4.5 h-4.5" />
                        </Link>
                        <div className="h-4 w-px bg-[var(--border)]" />
                        <h1 className="text-sm font-semibold text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-md">
                            {doc.name}
                        </h1>
                        {doc.readingLevel && (
                            <div className="hidden md:flex flex-col ml-4">
                                <p className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">Reading Level</p>
                                <p className="text-xs font-semibold text-[var(--text-primary)]">
                                    Grade {doc.readingLevel.original} → <span className="text-[var(--accent)] font-bold">Grade {doc.readingLevel.simplified}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden sm:flex p-1 bg-[var(--surface-raised)] border border-[var(--border)] rounded-lg mr-2">
                            <button
                                onClick={() => setViewMode('original')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === 'original' ? 'bg-white dark:bg-[var(--navy-700)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            >
                                Original
                            </button>
                            <button
                                onClick={() => setViewMode('split')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${viewMode === 'split' ? 'bg-white dark:bg-[var(--navy-700)] shadow-sm text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                            >
                                <SplitSquareHorizontal className="w-3.5 h-3.5" />
                                Split
                            </button>
                            <button
                                onClick={() => setViewMode('simplified')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${viewMode === 'simplified' ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent)]'}`}
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Simplified
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }}
                            className="w-8 h-8 hidden sm:flex items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] transition-colors cursor-pointer"
                            title="Share"
                        >
                            <Share2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="w-8 h-8 hidden sm:flex items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--surface-raised)] text-[var(--text-secondary)] transition-colors cursor-pointer"
                            title="Download PDF"
                        >
                            <Download className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            className={`px-3 h-8 flex items-center justify-center gap-2 rounded-lg border text-xs font-medium transition-colors ${isChatOpen
                                ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                                : 'bg-[var(--accent-soft)] border-transparent text-[var(--accent)] hover:border-[var(--accent)]/30'
                                }`}
                        >
                            <MessageSquareText className="w-4 h-4" />
                            <span className="hidden sm:inline">{isChatOpen ? 'Close Assistant' : 'AI Assistant'}</span>
                        </button>
                    </div>
                </div>

                {/* Scrollable View Area */}
                <div className="flex-1 overflow-hidden flex bg-[#f8fafc] dark:bg-[var(--navy-950)] relative">

                    {/* Summary Banner Overlay */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl bg-[var(--surface-overlay)] backdrop-blur-md border border-[var(--border)] shadow-lg rounded-xl p-4 z-20 flex gap-4 animate-fade-up">
                        <div className="w-10 h-10 rounded-full bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-[var(--accent)]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">AI Executive Summary</h3>
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{doc.summary}</p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto p-4 sm:p-8 pt-28 pb-32">
                        <div className="max-w-5xl mx-auto flex gap-6 sm:gap-12">

                            {/* Original Document Pane */}
                            {(viewMode === 'split' || viewMode === 'original') && (
                                <div className={`flex-1 ${viewMode === 'original' ? 'max-w-3xl mx-auto' : ''}`}>
                                    {viewMode === 'split' && <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-6 flex items-center gap-2"><FileText className="w-4 h-4" /> Original Contract</div>}
                                    <div className="space-y-8 legal-text text-[var(--text-primary)]">
                                        {sampleClauses.map((clause, idx) => (
                                            <div
                                                key={`orig-${clause.id}`}
                                                className={`p-4 rounded-xl transition-colors border border-transparent hover:border-[var(--border)] group cursor-pointer ${selectedClause?.id === clause.id ? 'bg-[var(--surface-raised)] border-l-4 border-l-[var(--accent)] shadow-sm' : ''}`}
                                                onClick={() => handleClauseClick(clause)}
                                            >
                                                <h4 className="font-bold mb-3 flex justify-between items-center">
                                                    {clause.title}
                                                    <span className="text-[10px] font-sans px-2 py-1 bg-[var(--surface)] border border-[var(--border)] rounded text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">Click to clarify</span>
                                                </h4>
                                                <p className="text-justify">{clause.originalText}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Simplified Document Pane */}
                            {(viewMode === 'split' || viewMode === 'simplified') && (
                                <div className={`flex-1 ${viewMode === 'simplified' ? 'max-w-3xl mx-auto' : ''}`}>
                                    {viewMode === 'split' && <div className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-6 flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI Simplified</div>}
                                    <div className="space-y-8 font-sans">
                                        {sampleClauses.map((clause, idx) => (
                                            <div
                                                key={`simp-${clause.id}`}
                                                ref={el => { clauseRefs.current[clause.id] = el }}
                                                className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer ${selectedClause?.id === clause.id
                                                    ? 'bg-[var(--accent-soft)] border-[var(--accent)] shadow-md'
                                                    : 'bg-white dark:bg-[var(--navy-900)] border-[var(--border)] hover:border-[var(--accent)] hover:shadow-sm'
                                                    }`}
                                                onClick={() => handleClauseClick(clause)}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-semibold text-sm text-[var(--text-primary)]">{clause.title}</h4>
                                                    {clause.importance === 'high' && (
                                                        <span className="risk-badge risk-high"><AlertTriangle className="w-3 h-3" /> High Risk</span>
                                                    )}
                                                    {clause.importance === 'medium' && (
                                                        <span className="risk-badge risk-medium"><Info className="w-3 h-3" /> Medium Risk</span>
                                                    )}
                                                </div>
                                                <p className="text-[var(--text-primary)] text-sm leading-relaxed mb-4">{clause.simplifiedText}</p>

                                                {/* Selected overlay card inline */}
                                                <AnimatePresence>
                                                    {selectedClause?.id === clause.id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="overflow-hidden border-t border-[var(--accent)]/20 mt-4 pt-4"
                                                        >
                                                            <div className="space-y-4 text-sm">
                                                                <div>
                                                                    <p className="text-xs font-bold text-[var(--accent)] mb-1 uppercase tracking-wider">Why it matters</p>
                                                                    <p className="text-[var(--text-secondary)]">{clause.explanation}</p>
                                                                </div>
                                                                <div className="grid sm:grid-cols-2 gap-4">
                                                                    <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                                                                        <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2">Key Risks</p>
                                                                        <ul className="list-disc pl-4 space-y-1 text-xs text-[var(--text-secondary)]">
                                                                            {clause.risks.map((r, i) => <li key={i}>{r}</li>)}
                                                                        </ul>
                                                                    </div>
                                                                    <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                                                        <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2">Ask a Lawyer</p>
                                                                        <ul className="list-disc pl-4 space-y-1 text-xs text-[var(--text-secondary)]">
                                                                            {clause.lawyerQuestions.map((q, i) => <li key={i}>{q}</li>)}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Chat Sidebar */}
            <ChatPanel
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                clauses={sampleClauses}
                onCitationClick={scrollToClause}
            />
        </div>
    );
}
