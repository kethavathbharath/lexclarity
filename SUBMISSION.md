# AI for Legal Assistance & Access - Technical Architecture

## Problem Statement Alignment
LexClarity directly addresses the 'AI for Legal Assistance & Access' hackathon challenge by democratizing legal literacy for marginalized communities. We leverage Generative AI (Gemini 1.5 Flash) to translate impenetrable legal jargon into accessible, reading-level appropriate language, significantly lowering the barrier to access to justice. 

## Problem Statement
Legal information is complex, heavily jargonized, and difficult for the average person to navigate without expensive professional assistance. 

## Security Architecture
All API calls to GenAI services are securely proxied through a Next.js server-side backend API route ('/api/chat/route.ts'). This ensures zero leakage of private API keys to the client browser, maintaining strict compliance with modern web security standards.

## Efficiency & Scalability
The frontend is built using Next.js 16 App Router for optimized server-side rendering, drastically improving Core Web Vitals. React components like the ChatPanel utilize localized state and conditional rendering to maintain a lightweight DOM footprint.

## Testing & Accessibility
We implemented a robust Jest testing suite ('npm run test') covering our DOM rendering logic, ensuring stable releases. The UI heavily utilizes ARIA attributes ('aria-label'), semantic HTML5 tags, and high-contrast glassmorphism to guarantee WCAG accessibility compliance (a11y) for visually impaired users.
