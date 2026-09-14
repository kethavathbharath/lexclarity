'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FileText,
  GitCompareArrows,
  ShieldAlert,
  MessageSquareText,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronRight,
  Mail,
} from 'lucide-react';
import Link from 'next/link';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden mx-4 sm:mx-6 lg:mx-8">

        {/* Subtle Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[var(--accent)]/10 to-transparent blur-3xl -z-10 rounded-full" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >

            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold uppercase tracking-wider mb-8">
              <ShieldAlert className="w-4 h-4" />
              <span>AI-Powered Legal Assistant</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] tracking-tight mb-8">
              Understand every <br className="hidden md:block" />
              <span className="font-serif italic font-normal text-[var(--navy-600)] dark:text-[var(--teal-300)] selection:bg-transparent">legal document</span> in minutes.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
              LexClarity uses advanced AI to simplify complex legal language, compare contract versions, and explain every clause — so you can make confident decisions without retaining expensive counsel for the basics.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dashboard" aria-label="Start analyzing legal documents for free" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
                Start Analyzing Free
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <Link href="#how-it-works" aria-label="Scroll to how it works section" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--surface-raised)] text-[var(--text-primary)] border border-[var(--border)] font-medium rounded-xl hover:bg-[var(--surface)] transition-colors">
                See How It Works
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-10 border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-[var(--text-muted)] uppercase tracking-widest mb-8">
            Built for security and confidentiality
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-60">
            <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold"><Lock className="w-5 h-5 text-[var(--accent)]" /> AES-256 Encrypted</div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold"><CheckCircle2 className="w-5 h-5 text-[var(--accent)]" /> Zero Data Retention</div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] font-semibold"><ShieldAlert className="w-5 h-5 text-[var(--accent)]" /> Non-trainable Models</div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">Three tools. Complete clarity.</h2>
          <p className="text-lg text-[var(--text-secondary)]">Everything you need to understand, compare, and question legal documents — powered by specialized legal language models.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} custom={0}
            className="group relative p-8 rounded-3xl bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-6 text-[var(--accent)]">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Simplify Documents</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Upload any PDF or DOCX and get an instant plain-language summary. Highlight any paragraph for an inline rewrite into 8th-grade reading level.
            </p>
            <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] group-hover:underline">
              Try it now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} custom={1}
            className="group relative p-8 rounded-3xl bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-6 text-[var(--accent)]">
              <GitCompareArrows className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Compare Contracts</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Upload two contract versions and instantly see color-coded semantic diffs accompanied by AI-generated risk assessments for every tiny change.
            </p>
            <Link href="/compare" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] group-hover:underline">
              Try it now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} custom={2}
            className="group relative p-8 rounded-3xl bg-[var(--surface-raised)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors overflow-hidden"
          >
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-6 text-[var(--accent)]">
              <MessageSquareText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Clarify Clauses</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Click any tricky clause to open a dedicated AI chat. Get a plain-English explanation, uncover hidden risks, and see suggested questions to ask your lawyer.
            </p>
            <Link href="/dashboard" className="inline-flex items-center text-sm font-semibold text-[var(--accent)] group-hover:underline">
              Try it now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* How it Works / Steps */}
      <section id="how-it-works" className="py-24 bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">From upload to understanding</h2>
            <p className="text-lg text-[var(--text-secondary)]">Three simple steps to decode any legal document.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative text-center">

            {/* Connecting lines between steps */}
            <div className="hidden md:block absolute top-[40px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--background)] border-2 border-[var(--accent)] flex items-center justify-center text-2xl font-bold text-[var(--accent)] mb-6 shadow-[0_0_20px_var(--accent-hover)]">1</div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">Upload</h4>
              <p className="text-[var(--text-secondary)]">Drag & drop your PDF, DOCX, or simply paste the raw text directly into LexClarity.</p>
            </div>

            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--background)] border-2 border-[var(--accent)] flex items-center justify-center text-2xl font-bold text-[var(--accent)] mb-6">2</div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">AI Analysis</h4>
              <p className="text-[var(--text-secondary)]">Our specialized models read, parse, and semantically link every clause to identify risks.</p>
            </div>

            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-full bg-[var(--background)] border-2 border-[var(--accent)] flex items-center justify-center text-2xl font-bold text-[var(--accent)] mb-6">3</div>
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-3">Get Clarity</h4>
              <p className="text-[var(--text-secondary)]">Review the side-by-side plain English summary and chat with the AI about specific sections.</p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--navy-900)] dark:bg-[var(--navy-950)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-[var(--teal-600)]/20 to-transparent blur-3xl rounded-full" />

        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to understand your contracts?</h2>
          <p className="text-xl text-[var(--slate-300)] mb-10 max-w-2xl mx-auto">
            Upload your first document and experience the power of AI-assisted legal analysis today.
          </p>
          <Link href="/dashboard" className="inline-flex items-center justify-center px-10 py-5 bg-white text-[var(--navy-900)] font-bold rounded-2xl hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-[var(--background)] py-10 border-t border-[var(--border)] text-center">
        <p className="text-sm text-[var(--text-muted)]">
          © {new Date().getFullYear()} LexClarity. This tool provides general information, not legal advice.<br className="md:hidden" />
          <span className="hidden md:inline"> | </span>Designed & Developed by <strong className="text-[var(--text-primary)]">K. Bharath Nayak</strong>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-5 text-sm font-medium text-[var(--text-secondary)]">
          <Link href="/about" className="hover:text-[var(--accent)] transition-colors">About the Developer</Link>
          <a href="mailto:kethavathbharathn@gmail.com" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <Mail className="w-4 h-4" /> kethavathbharathn@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/kethavath-bharath-b70a333a7" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            LinkedIn Profile
          </a>
        </div>
      </footer>

    </div>
  );
}
