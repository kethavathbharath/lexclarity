'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload,
    Search,
    Filter,
    FileText,
    Clock,
    MoreVertical,
    CheckCircle2,
    Trash2,
    AlertCircle,
    FileArchive,
    FilePlus2,
    ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { sampleDocuments, typeLabels, typeColors } from '@/lib/mockData';

export default function Dashboard() {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStep, setUploadStep] = useState(0);
    const [search, setSearch] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const uploadSteps = [
        'Parsing document...',
        'Extracting clauses...',
        'Analyzing risks...',
        'Generating summary...',
    ];

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleUpload = (e?: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e.target.files.length === 0) return;

        setIsUploading(true);
        setUploadProgress(0);
        setUploadStep(0);

        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsUploading(false);
                        router.push('/document/doc-new');
                    }, 1000);
                    return 100;
                }
                const newProgress = prev + 5;
                if (newProgress === 25) setUploadStep(1);
                if (newProgress === 50) setUploadStep(2);
                if (newProgress === 75) setUploadStep(3);
                return newProgress;
            });
        }, 150);
    };

    const filteredDocs = sampleDocuments.filter(doc =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Dashboard</h1>
                        <p className="text-[var(--text-secondary)]">Manage and analyze your legal documents.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/compare"
                            className="px-4 py-2.5 rounded-xl border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-colors inline-flex items-center gap-2"
                        >
                            <FilePlus2 className="w-4 h-4" />
                            Compare Contracts
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content - Document List */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Toolbar */}
                        <div className="flex items-center justify-between gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
                                />
                            </div>
                            <button className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Document List */}
                        <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                            {filteredDocs.map((doc, idx) => (
                                <motion.div
                                    key={doc.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <Link
                                        href={`/document/${doc.id}`}
                                        className="block bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl p-5 hover:shadow-md hover:border-[var(--accent)] transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                                                    <FileText className="w-5 h-5 text-[var(--accent)]" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1.5 group-hover:text-[var(--accent)] transition-colors">
                                                        {doc.name}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                                                        <span className={`px-2 py-0.5 rounded-md font-medium ${typeColors[doc.type]}`}>
                                                            {typeLabels[doc.type]}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            {doc.uploadedAt}
                                                        </span>
                                                        <span>{doc.size}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 sm:flex-shrink-0">
                                                {doc.status === 'processing' ? (
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-400 rounded-lg border border-amber-200 dark:border-amber-800">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                                                        Processing
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 rounded-lg border border-green-200 dark:border-green-800">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Processed
                                                    </span>
                                                )}
                                                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </div>

                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* Sidebar - Upload */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                            <div
                                className={`bg-[var(--surface-raised)] border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${isUploading
                                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                                    : 'border-[var(--border-strong)] hover:border-[var(--accent)] focus-within:border-[var(--accent)]'
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {!isUploading ? (
                                        <motion.div
                                            key="upload-ready"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center cursor-pointer"
                                            onClick={triggerFileSelect}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept=".pdf,.doc,.docx,.txt"
                                                onChange={handleUpload}
                                            />
                                            <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] shadow-sm border border-[var(--border)] flex items-center justify-center mb-6 text-[var(--accent)]">
                                                <Upload className="w-7 h-7" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Upload Document</h3>
                                            <p className="text-sm text-[var(--text-secondary)] mb-6">
                                                Drag and drop your PDF or DOCX file here, or click to browse.
                                            </p>
                                            <button className="px-5 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                                                Browse Files
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="uploading"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center py-4"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-[var(--surface)] shadow-sm border border-[var(--border)] flex items-center justify-center mb-6 pointer-events-none relative overflow-hidden">
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-[var(--accent-soft)] transition-all duration-300"
                                                    style={{ height: `${uploadProgress}%` }}
                                                />
                                                <FileArchive className="w-7 h-7 text-[var(--accent)] relative z-10" />
                                            </div>

                                            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                                                {uploadProgress === 100 ? 'Upload Complete!' : 'Processing...'}
                                            </h3>

                                            <div className="w-full bg-[var(--border)] h-2 rounded-full mb-4 overflow-hidden">
                                                <div
                                                    className="bg-[var(--accent)] h-full transition-all duration-300 ease-out"
                                                    style={{ width: `${uploadProgress}%` }}
                                                />
                                            </div>

                                            <p className="text-xs font-medium text-[var(--accent)] animate-pulse h-4 mt-2">
                                                {uploadProgress < 100 ? uploadSteps[uploadStep] : 'Redirecting...'}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-8 bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
                                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Usage Stats</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                                            <span>Documents Analyzed</span>
                                            <span className="font-medium text-[var(--text-primary)]">12 / 50</span>
                                        </div>
                                        <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[var(--accent)] h-full w-[24%]" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                                            <span>Comparisons</span>
                                            <span className="font-medium text-[var(--text-primary)]">3 / 10</span>
                                        </div>
                                        <div className="w-full bg-[var(--border)] h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-[var(--amber-500)] h-full w-[30%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
