'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    FileText,
    Upload,
    AlertTriangle,
    FileArchive,
    RefreshCw,
    Info,
    Scale
} from 'lucide-react';
import { sampleDiffChanges, DiffChange } from '@/lib/mockData';

export default function CompareView() {
    const [doc1Name, setDoc1Name] = useState('Standard_SaaS_Agreement_v1.pdf');
    const [doc2Name, setDoc2Name] = useState('Standard_SaaS_Agreement_v2_Redlined.pdf');
    const [isComparing, setIsComparing] = useState(false);
    const [showResults, setShowResults] = useState(true);

    const v1InputRef = useRef<HTMLInputElement>(null);
    const v2InputRef = useRef<HTMLInputElement>(null);

    // Stats derived from diff
    const added = sampleDiffChanges.filter(d => d.type === 'added').length;
    const removed = sampleDiffChanges.filter(d => d.type === 'removed').length;
    const modified = sampleDiffChanges.filter(d => d.type === 'modified').length;
    const highRisks = sampleDiffChanges.filter(d => d.impact === 'high').length;

    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 animate-fade-up">
                    <Link
                        href="/dashboard"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--surface-raised)] border border-[var(--border)] hover:bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--text-primary)] transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">Contract Comparison</h1>
                        <p className="text-sm text-[var(--text-secondary)]">Upload two versions to see what changed and why it matters.</p>
                    </div>
                </div>

                {/* Upload Panels */}
                <div className="grid md:grid-cols-2 gap-6 mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>

                    <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl p-6">
                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-[var(--slate-200)] dark:bg-[var(--slate-700)] text-[var(--text-primary)] flex items-center justify-center text-xs">V1</span>
                            Original Version
                        </h3>
                        <div
                            className="border-2 border-dashed border-[var(--border-strong)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors cursor-pointer bg-[var(--surface)]"
                            onClick={() => v1InputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={v1InputRef}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setDoc1Name(e.target.files[0].name);
                                    }
                                }}
                            />
                            <FileText className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3" />
                            <p className="text-sm font-medium text-[var(--text-primary)] truncate px-4">{doc1Name}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">Click to change file</p>
                        </div>
                    </div>

                    <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl p-6 relative">

                        {/* The "VS" badge */}
                        <div className="absolute top-1/2 -left-3 sm:-left-3 transform -translate-y-1/2 w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold z-10 hidden md:flex border-4 border-[var(--background)] shadow-sm">
                            VS
                        </div>

                        <h3 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center text-xs">V2</span>
                            New Version
                        </h3>
                        <div
                            className="border-2 border-dashed border-[var(--border-strong)] rounded-xl p-6 text-center hover:border-[var(--accent)] transition-colors cursor-pointer bg-[var(--surface)]"
                            onClick={() => v2InputRef.current?.click()}
                        >
                            <input
                                type="file"
                                ref={v2InputRef}
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setDoc2Name(e.target.files[0].name);
                                        // Auto-refresh simulation when V2 is updated
                                        setShowResults(false);
                                        setTimeout(() => setShowResults(true), 800);
                                    }
                                }}
                            />
                            <FileText className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3" />
                            <p className="text-sm font-medium text-[var(--text-primary)] truncate px-4">{doc2Name}</p>
                            <p className="text-xs text-[var(--text-muted)] mt-1">Click to change file</p>
                        </div>
                    </div>

                </div>

                {/* Results Area */}
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Summary AI Banner */}
                        <div className="bg-gradient-to-r from-[var(--surface-raised)] to-[var(--accent-soft)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center flex-shrink-0 shadow-md shadow-[var(--accent)]/20">
                                    <Scale className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                                        AI Comparison Summary
                                        {highRisks > 0 && (
                                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                                                {highRisks} High-Risk Changes
                                            </span>
                                        )}
                                    </h2>
                                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-4xl">
                                        The new version introduces <strong>{sampleDiffChanges.length} significant changes</strong>. Mostly, the changes are favorable to you: the liability cap was increased (2x), late payment penalties were reduced (1%), and a Data Processing Addendum was added. However, the governing law clause was removed entirely, which leaves jurisdiction ambiguous and should be addressed.
                                    </p>

                                    <div className="flex gap-6 mt-4">
                                        <div className="flex gap-2">
                                            <span className="text-sm font-semibold text-[var(--diff-add)]">+{added}</span>
                                            <span className="text-xs text-[var(--text-muted)] self-end pb-0.5">Added</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-sm font-semibold text-[var(--diff-modify)]">~{modified}</span>
                                            <span className="text-xs text-[var(--text-muted)] self-end pb-0.5">Modified</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className="text-sm font-semibold text-[var(--diff-remove)]">-{removed}</span>
                                            <span className="text-xs text-[var(--text-muted)] self-end pb-0.5">Removed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Diffs List */}
                        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
                            <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--surface-raised)] flex justify-between items-center">
                                <h3 className="font-semibold text-[var(--text-primary)]">Clause-by-Clause Analysis</h3>
                                <span className="text-xs text-[var(--text-muted)]">{sampleDiffChanges.length} changes detected</span>
                            </div>

                            <div className="divide-y divide-[var(--border)]">
                                {sampleDiffChanges.map((diff, index) => (
                                    <div key={diff.id} className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h4 className="font-semibold text-[var(--text-primary)] text-lg">{diff.clauseTitle}</h4>
                                            {diff.impact === 'high' && <span className="risk-badge risk-high flex-shrink-0 ml-4">High Impact</span>}
                                            {diff.impact === 'medium' && <span className="risk-badge risk-medium flex-shrink-0 ml-4">Medium Impact</span>}
                                            {diff.impact === 'low' && <span className="risk-badge risk-low text-[var(--text-secondary)] border border-[var(--border)] flex-shrink-0 ml-4">Low Impact</span>}
                                        </div>

                                        <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-xl p-4 mb-4 text-sm text-[var(--text-secondary)] flex gap-3">
                                            <Info className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                                            <p>{diff.aiExplanation}</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            {/* V1 Code block */}
                                            <div className="rounded-lg border border-[var(--border)] overflow-hidden">
                                                <div className="bg-[var(--surface-raised)] border-b border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                                                    Version 1
                                                </div>
                                                <div className={`p-4 text-sm legal-text leading-relaxed min-h-[100px] bg-[var(--surface)] ${diff.type === 'removed' || diff.type === 'modified' ? 'diff-removed' : 'text-[var(--text-muted)] italic'}`}>
                                                    {diff.originalText || "Clause did not exist in Version 1."}
                                                </div>
                                            </div>

                                            {/* V2 Code block */}
                                            <div className="rounded-lg border border-[var(--border)] overflow-hidden">
                                                <div className="bg-[var(--surface-raised)] border-b border-[var(--border)] px-4 py-2 text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                                                    Version 2
                                                </div>
                                                <div className={`p-4 text-sm legal-text leading-relaxed min-h-[100px] bg-[var(--surface)] ${diff.type === 'added' ? 'diff-added' : diff.type === 'modified' ? 'diff-modified' : 'bg-[var(--surface-raised)] text-[var(--text-muted)] italic'}`}>
                                                    {diff.newText || "Clause was removed in Version 2."}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                )}
            </div>
        </div>
    );
}
