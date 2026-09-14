'use client';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLanding = pathname === '/';

    return (
        <ThemeProvider>
            <Navbar />
            <main className={isLanding ? '' : 'pt-16'}>
                {children}
            </main>
            {/* Disclaimer banner */}
            {!isLanding && (
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface-overlay)] backdrop-blur-md border-t border-[var(--border)] px-4 py-2 text-center">
                    <p className="text-xs text-[var(--text-muted)]">
                        ⚖️ This tool provides general information, not legal advice. Consult a qualified attorney for specific situations.
                    </p>
                </div>
            )}
        </ThemeProvider>
    );
}
