import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'LexClarity | AI Legal Assistant',
  description: 'AI-powered legal platform to simplify, compare, and clarify complex legal documents. Built for accessibility and rapid understanding.',
  keywords: ['LegalTech', 'AI', 'Contract Simplification', 'GenAI', 'Legal Assistant'],
  authors: [{ name: 'K. Bharath Nayak' }],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'LexClarity | AI Legal Assistant',
    description: 'Democratizing access to legal understanding through Generative AI.',
    type: 'website',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              if (localStorage.getItem('lexclarity-theme') === 'dark' || (!('lexclarity-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch (_) {}
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
