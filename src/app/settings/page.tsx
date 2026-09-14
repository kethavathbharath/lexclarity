'use client';
import { useTheme } from '@/components/ThemeProvider';
import { Settings, User, Bell, Shield, Key, DownloadCloud, Sun, Moon, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SettingsView() {
    const { theme, toggleTheme } = useTheme();
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    // Profile state pre-filled with developer details
    const [firstName, setFirstName] = useState('Bharath');
    const [lastName, setLastName] = useState('Nayak');
    const [email, setEmail] = useState('kethavathbharathn@gmail.com');
    const [role, setRole] = useState('Developer');

    // API Key state
    const [geminiKey, setGeminiKey] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('lexclarity-profile');
        if (saved) {
            const p = JSON.parse(saved);
            setFirstName(p.firstName || 'Bharath');
            setLastName(p.lastName || 'Nayak');
            setEmail(p.email || 'kethavathbharathn@gmail.com');
            setRole(p.role || 'Developer');
        }
        const key = localStorage.getItem('lexclarity-api-key');
        if (key) setGeminiKey(key);
    }, []);

    const handleSave = () => {
        localStorage.setItem('lexclarity-profile', JSON.stringify({ firstName, lastName, email, role }));
        if (geminiKey) localStorage.setItem('lexclarity-api-key', geminiKey);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'preferences', label: 'Preferences', icon: Settings },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'api', label: 'API Keys', icon: Key },
    ];

    return (
        <div className="min-h-screen bg-[var(--background)] pt-8 pb-20">

            {/* Toast Notification */}
            {saved && (
                <div className="fixed top-20 right-6 z-50 flex items-center gap-3 px-5 py-3 bg-green-600 text-white rounded-xl shadow-xl animate-fade-up">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">Settings saved successfully!</span>
                </div>
            )}

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
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Main Panel */}
                    <div className="flex-1">
                        <div className="bg-[var(--surface-raised)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-sm">

                            {/* PROFILE TAB */}
                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Profile Information</h2>
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-hover)] text-white flex items-center justify-center text-2xl font-bold shadow-md">
                                                BN
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
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={e => setFirstName(e.target.value)}
                                                    className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={e => setLastName(e.target.value)}
                                                    className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Role / Title</label>
                                                <input
                                                    type="text"
                                                    value={role}
                                                    onChange={e => setRole(e.target.value)}
                                                    className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-[var(--border)] flex justify-end gap-3">
                                        <button
                                            onClick={() => {
                                                setFirstName('Bharath');
                                                setLastName('Nayak');
                                                setEmail('kethavathbharathn@gmail.com');
                                                setRole('Developer');
                                            }}
                                            className="px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface)] transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm active:scale-95"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* PREFERENCES TAB */}
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
                                                className={`p-2 rounded-md transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
                                            >
                                                <Sun className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => theme !== 'dark' && toggleTheme()}
                                                className={`p-2 rounded-md transition-colors ${theme === 'dark' ? 'bg-[var(--surface-raised)] shadow-sm text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}
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

                                    <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                                        <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm active:scale-95">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* API KEYS TAB */}
                            {activeTab === 'api' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">API Keys</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Google Gemini API Key</label>
                                            <input
                                                type="password"
                                                value={geminiKey}
                                                onChange={e => setGeminiKey(e.target.value)}
                                                placeholder="AQ. or AIzaSy..."
                                                className="w-full px-4 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm font-mono focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
                                            />
                                            <p className="text-xs text-[var(--text-muted)] mt-1.5">Powers the Live AI chat assistant. Get a free key at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">aistudio.google.com</a>.</p>
                                        </div>
                                        {geminiKey.length > 10 && <p className="text-xs text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Live GenAI Connected</p>}
                                    </div>
                                    <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                                        <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm active:scale-95">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* SECURITY TAB */}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-5">Security & Privacy</h2>
                                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 flex gap-4">
                                        <Shield className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">Data Privacy Guarantee</h3>
                                            <p className="text-xs text-amber-700/80 dark:text-amber-500/80 leading-relaxed">
                                                LexClarity uses enterprise-grade encryption. Your uploaded documents are processed securely and are <strong>never used to train AI models</strong>. They are automatically deleted after your session ends.
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

                            {/* NOTIFICATIONS TAB */}
                            {activeTab === 'notifications' && (
                                <div className="py-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-[var(--surface)] flex items-center justify-center mb-4 text-[var(--text-muted)]">
                                        <Bell className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">Coming Soon</h3>
                                    <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                                        Notification settings will be available in the next release.
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