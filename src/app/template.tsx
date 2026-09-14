'use client';
import AppShell from '@/components/AppShell';

export default function Template({ children }: { children: React.ReactNode }) {
    return <AppShell>{children}</AppShell>;
}
