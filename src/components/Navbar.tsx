'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    Scale,
    LayoutDashboard,
    FileText,
    GitCompareArrows,
    Settings,
    Sun,
    Moon,
    Menu,
    X,
    Info,
    Mail,
} from 'lucide-react';

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/document/doc-1', label: 'Simplify', icon: FileText },
    { href: '/compare', label: 'Compare', icon: GitCompareArrows },
    { href: '/about', label: 'About', icon: Info },
    { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLanding = pathname === '/';

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLanding
                ? 'bg-transparent'
                : 'bg-[var(--surface-overlay)] backdrop-blur-xl border-b border-[var(--border)]'
                }`}
            style={{ WebkitBackdropFilter: 'blur(20px)' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image
                            src="/logo.png"
                            alt="LexClarity Logo"
                            width={160}
                            height={60}
                            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive =
                                pathname === link.href || pathname.startsWith(link.href.split('/').slice(0, 2).join('/') + '/');
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                        ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* User Profile */}
                        <div className="hidden sm:flex items-center gap-3 pl-4 mr-4 border-l border-[var(--border)]">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)] flex items-center justify-center text-white text-sm font-bold ring-2 ring-white dark:ring-[var(--surface-raised)] shadow-sm">
                                BN
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-[var(--text-primary)] leading-tight mb-0.5">Bharath Nayak</span>
                                <a href="mailto:kethavathbharathn@gmail.com" className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors leading-tight">
                                    <Mail className="w-3 h-3" />
                                    kethavathbharathn@gmail.com
                                </a>
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)] transition-all duration-150"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={theme}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
                                </motion.div>
                            </AnimatePresence>
                        </button>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)] transition-all duration-150"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-[var(--surface-overlay)] backdrop-blur-xl border-b border-[var(--border)] overflow-hidden"
                    >
                        <div className="px-4 py-3 space-y-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
                                            ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
