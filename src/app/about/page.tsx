'use client';
import { motion } from 'framer-motion';
import { Scale, Lock, Zap, FileText, Bot, Layers, Network, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 pt-8"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--accent-soft)] mb-6">
                        <Scale className="w-8 h-8 text-[var(--accent)]" />
                    </div>
                    <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
                        About LexClarity
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)]">Democratizing access to legal understanding through Artificial Intelligence.</p>
                </motion.div>

                {/* Content */}
                <div className="space-y-16">

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-secondary)]"
                    >
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Mission</h2>
                        <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                            Legal documents are notoriously dense, confusing, and designed for lawyers, not for the people signing them.
                            LexClarity was built to bridge this gap. We believe that everyone should understand what they are signing
                            without needing to pay thousands of dollars in retainer fees.
                        </p>
                        <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                            Using state-of-the-art Generative AI (LLMs), LexClarity parses complex legal jargon and transforms it into
                            human-readable, actionable intelligence. It acts as your co-pilot, helping you spot risks, compare versions,
                            and clarify confusing terms instantly.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">How It Works Behind The Scenes</h2>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-[var(--surface-raised)] rounded-2xl p-6 border border-[var(--border)]">
                                <FileText className="w-8 h-8 text-[var(--accent)] mb-4" />
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">1. Layout Parsing</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    When you upload a PDF or DOCX file, our system parses the physical layout, extracting structured text, headers, and bullet points without losing the context of the document.
                                </p>
                            </div>
                            <div className="bg-[var(--surface-raised)] rounded-2xl p-6 border border-[var(--border)]">
                                <Layers className="w-8 h-8 text-purple-500 mb-4" />
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">2. Semantic Chunking</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    The document is divided into logical "clauses". This allows the AI to analyze the contract section by section rather than getting overwhelmed by the entire text at once.
                                </p>
                            </div>
                            <div className="bg-[var(--surface-raised)] rounded-2xl p-6 border border-[var(--border)]">
                                <Bot className="w-8 h-8 text-amber-500 mb-4" />
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">3. LLM Analysis</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    We use prompt-engineered Large Language Models designed strictly for legal syntax processing. They summarize, assign risk scores (High/Medium/Low), and extract key actionable entities.
                                </p>
                            </div>
                            <div className="bg-[var(--surface-raised)] rounded-2xl p-6 border border-[var(--border)]">
                                <Network className="w-8 h-8 text-blue-500 mb-4" />
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">4. Vector Search (RAG)</h3>
                                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                    When you ask a question in the AI chat, we use semantic search against the specific contract's embeddings to guarantee the answers are directly cited from your text.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-[var(--surface-raised)] to-[var(--accent-soft)] rounded-3xl p-8 sm:p-12 border border-[var(--border)]"
                    >
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Data Privacy & Security</h2>
                            <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                                Legal documents contain sensitive data. LexClarity is built on a zero-retention framework.
                                Your files are processed in-memory and are immediately destroyed. We never use user data to train our foundational models, and all transmissions are encrypted via AES-256.
                            </p>
                            <div className="flex justify-center gap-6 text-sm font-medium text-[var(--text-primary)]">
                                <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-[var(--accent)]" /> Encrypted</div>
                                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[var(--accent)]" /> Zero-Retention</div>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <div className="text-center pt-8">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-colors"
                        >
                            Start Analyzing Documents
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
