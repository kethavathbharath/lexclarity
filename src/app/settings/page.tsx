'use client';
import { useTheme } from '@/components/ThemeProvider';
import { Settings, User, Bell, Shield, Key, DownloadCloud, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function SettingsView() {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'preferences', label: 'Preferences', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8 animate-fade-up">Settings</h1>

                <div className="flex flex-col md:flex-row gap-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>

                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                        ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                <tab.icon className="w-4.5 h-4.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Panel */}
                    <div className="flex-1">
                        <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">

                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Profile Information</h2>
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="w-20 h-20 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-2xl font-bold">
                                                JD
                                            </div>
                                            <div>
                                                <button className="px-4 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors mb-2">
                                                    Change Avatar
                                                </button>
                                                <p className="text-xs text-[var(--text-muted)]">JPG, GIF or PNG. Max size of 800K</p>
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">First Name</label>
                                                <input type="text" defaultValue="Jane" className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Last Name</label>
                                                <input type="text" defaultValue="Doe" className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none" />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
                                                <input type="email" defaultValue="jane.doe@example.com" className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3">
                                        <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors">
                                            Cancel
                                        </button>
                                        <button className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">App Preferences</h2>

                                    <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                                        <div>
                                            <h3 className="text-sm font-medium text-[var(--text-primary)]">Theme</h3>
                                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Customize the appearance of LexClarity</p>
                                        </div>
                                        <div className="flex bg-[var(--surface)] p-1 rounded-lg border border-[var(--border)]">
                                            <button
                                                onClick={() => theme !== 'light' && toggleTheme()}
                                                className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white dark:bg-[var(--navy-700)] shadow-sm text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
                                            >
                                                <Sun className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => theme !== 'dark' && toggleTheme()}
                                                className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-white dark:bg-[var(--navy-700)] shadow-sm text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
                                            >
                                                <Moon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-[var(--border)]">
                                        <div>
                                            <h3 className="text-sm font-medium text-[var(--text-primary)]">Export Format</h3>
                                            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Default format for downloaded summaries</p>
                                        </div>
                                        <select className="px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:outline-none">
                                            <option>PDF Document</option>
                                            <option>Markdown</option>
                                            <option>Word (DOCX)</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Security & Privacy</h2>

                                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 flex gap-4">
                                        <Shield className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">Data Privacy Guarantee</h3>
                                            <p className="text-xs text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
                                                LexClarity uses enterprise-grade encryption. Your uploaded documents are processed securely in memory and are <strong>never used to train our AI models</strong>. They are automatically deleted after your session ends unless you explicitly choose to save them to your library.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <button className="flex items-center justify-between w-full p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-muted)] transition-colors text-left">
                                            <div>
                                                <h4 className="text-sm font-medium text-[var(--text-primary)]">Download My Data</h4>
                                                <p className="text-xs text-[var(--text-secondary)] mt-0.5">Get a copy of all your saved summaries and account data</p>
                                            </div>
                                            <DownloadCloud className="w-5 h-5 text-[var(--text-muted)]" />
                                        </button>

                                        <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors p-2 text-left">
                                            Delete Account & All Data
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Placeholder for other tabs */}
                            {(activeTab === 'notifications' || activeTab === 'api') && (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mb-4 text-[var(--text-muted)]">
                                        {activeTab === 'notifications' ? <Bell className="w-8 h-8" /> : <Key className="w-8 h-8" />}
                                    </div>
                                    <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">Comming Soon</h3>
                                    <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                                        This settings module is currently under development and will be available in the next release.
                                    </p>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
