export interface Document {
    id: string;
    name: string;
    type: 'nda' | 'lease' | 'employment' | 'tos' | 'contract' | 'other';
    uploadedAt: string;
    size: string;
    status: 'processed' | 'processing' | 'error';
    readingLevel?: { original: number; simplified: number };
    summary?: string;
}

export interface Clause {
    id: string;
    index: number;
    title: string;
    originalText: string;
    simplifiedText: string;
    explanation: string;
    risks: string[];
    lawyerQuestions: string[];
    importance: 'low' | 'medium' | 'high';
}

export interface DiffChange {
    id: string;
    clauseTitle: string;
    type: 'added' | 'removed' | 'modified';
    originalText: string;
    newText: string;
    impact: 'low' | 'medium' | 'high';
    aiExplanation: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: { clauseId: string; text: string }[];
    timestamp: string;
}

export const sampleDocuments: Document[] = [
    {
        id: 'doc-1',
        name: 'Software License Agreement - Acme Corp',
        type: 'contract',
        uploadedAt: '2026-09-08',
        size: '2.4 MB',
        status: 'processed',
        readingLevel: { original: 18, simplified: 8 },
        summary: 'Software licensing agreement between Acme Corp and the licensee, covering usage rights, restrictions, intellectual property, and liability limitations.',
    },
    {
        id: 'doc-2',
        name: 'Non-Disclosure Agreement - TechStart Inc',
        type: 'nda',
        uploadedAt: '2026-09-07',
        size: '1.1 MB',
        status: 'processed',
        readingLevel: { original: 16, simplified: 7 },
        summary: 'Mutual NDA between parties for sharing confidential business information during partnership evaluation.',
    },
    {
        id: 'doc-3',
        name: 'Residential Lease - 42 Elm Street',
        type: 'lease',
        uploadedAt: '2026-09-05',
        size: '3.8 MB',
        status: 'processed',
        readingLevel: { original: 17, simplified: 9 },
        summary: 'Residential lease agreement for property at 42 Elm Street with a 12-month term, covering rent, maintenance, and termination clauses.',
    },
    {
        id: 'doc-4',
        name: 'Employment Contract - Senior Developer',
        type: 'employment',
        uploadedAt: '2026-09-04',
        size: '1.9 MB',
        status: 'processed',
        readingLevel: { original: 15, simplified: 8 },
        summary: 'Employment agreement for a senior developer position including compensation, benefits, IP assignment, and non-compete provisions.',
    },
    {
        id: 'doc-5',
        name: 'Terms of Service - CloudApp Platform',
        type: 'tos',
        uploadedAt: '2026-09-02',
        size: '5.2 MB',
        status: 'processing',
    },
];

export const sampleClauses: Clause[] = [
    {
        id: 'clause-1',
        index: 0,
        title: '1. Grant of License',
        originalText: 'Subject to the terms and conditions of this Agreement, Licensor hereby grants to Licensee a non-exclusive, non-transferable, revocable license to use the Software solely for Licensee\'s internal business purposes. This license does not include any right to sublicense, modify, adapt, translate, reverse engineer, decompile, disassemble, or create derivative works based on the Software, except to the extent that such activity is expressly permitted by applicable law notwithstanding this limitation.',
        simplifiedText: 'You get permission to use this software for your own business. You cannot share this permission with others, and it can be taken away. You are not allowed to change the software, take it apart to see how it works, or make new products from it, unless the law specifically says you can.',
        explanation: 'This clause gives you a limited right to use the software. Think of it as renting, not owning. The key restrictions are: you can\'t share it, modify it, or try to figure out how it works internally.',
        risks: [
            'The license is revocable — meaning the company could theoretically end your access',
            'Very broad restrictions on modification could limit your ability to integrate the software',
            'No sublicensing means you cannot let contractors or subsidiaries use it',
        ],
        lawyerQuestions: [
            'Under what circumstances can the license be revoked?',
            'Can we negotiate for a non-revocable license?',
            'Does the restriction on derivative works affect our ability to build integrations?',
        ],
        importance: 'high',
    },
    {
        id: 'clause-2',
        index: 1,
        title: '2. Intellectual Property Rights',
        originalText: 'All right, title, and interest in and to the Software, including without limitation all intellectual property rights therein and thereto, are and shall remain the exclusive property of Licensor. Licensee acknowledges that the Software and all copies thereof are proprietary to Licensor and title thereto remains in Licensor. All applicable rights to patents, copyrights, trademarks, and trade secrets in the Software are and shall remain in Licensor.',
        simplifiedText: 'The company that made the software owns everything about it — the code, the design, the brand, and any ideas behind it. Even though you can use the software, you don\'t own any part of it. Any copies you make still belong to the company.',
        explanation: 'This is a standard ownership clause. It makes clear that you\'re paying for the right to use the software, not to own it. The company keeps all patents, copyrights, trademarks, and trade secrets.',
        risks: [
            'Any improvements or customizations you suggest could become the company\'s property',
            'Broad IP retention means any data models or configurations might be claimed by licensor',
        ],
        lawyerQuestions: [
            'Does this affect ownership of our own data processed through the software?',
            'If we contribute ideas for features, who owns those?',
        ],
        importance: 'medium',
    },
    {
        id: 'clause-3',
        index: 2,
        title: '3. Payment Terms',
        originalText: 'Licensee shall pay to Licensor the license fees as set forth in Exhibit A attached hereto. All fees are due and payable within thirty (30) days of the date of invoice. Late payments shall bear interest at the rate of one and one-half percent (1.5%) per month, or the maximum rate permitted by applicable law, whichever is less. Licensee shall be responsible for all taxes, duties, and governmental assessments related to this Agreement, excluding taxes based on Licensor\'s net income.',
        simplifiedText: 'You need to pay the fees listed in Exhibit A within 30 days of receiving the bill. If you pay late, you\'ll be charged 1.5% interest per month (or whatever maximum the law allows). You\'re also responsible for paying any taxes related to this agreement, but not the company\'s income taxes.',
        explanation: 'This tells you how and when to pay. The key numbers to watch are the 30-day payment window and the 1.5% monthly late fee, which adds up to 18% annually — significantly above typical rates.',
        risks: [
            'The 1.5% monthly late fee (18% annually) is aggressive — this could become expensive',
            'Tax responsibility is shifted to you, which could include sales tax, VAT, etc.',
            'No mention of dispute resolution for billing errors',
        ],
        lawyerQuestions: [
            'Can we negotiate the late payment interest rate?',
            'Is there a grace period or dispute mechanism for billing errors?',
            'What specific taxes might we be liable for?',
        ],
        importance: 'high',
    },
    {
        id: 'clause-4',
        index: 3,
        title: '4. Confidentiality',
        originalText: 'Each party agrees that it will not disclose to any third party, or use for any purpose other than as contemplated by this Agreement, any confidential or proprietary information of the other party ("Confidential Information"). Confidential Information shall include, but not be limited to, the terms of this Agreement, trade secrets, technical data, product plans, and business operations information. This obligation shall survive termination of this Agreement for a period of five (5) years.',
        simplifiedText: 'Both sides promise to keep each other\'s private information secret and only use it for the purposes of this agreement. "Private information" includes the details of this agreement, technical secrets, product plans, and business information. This promise lasts for 5 years, even after the agreement ends.',
        explanation: 'A mutual confidentiality clause — both parties agree to protect each other\'s sensitive information. The 5-year survival period is standard for commercial agreements.',
        risks: [
            'Broad definition of "Confidential Information" could restrict how you talk about the partnership',
            'Five-year obligation extends well beyond the agreement itself',
        ],
        lawyerQuestions: [
            'Are there standard carve-outs for information that becomes publicly available?',
            'What constitutes a breach, and what are the remedies?',
        ],
        importance: 'medium',
    },
    {
        id: 'clause-5',
        index: 4,
        title: '5. Limitation of Liability',
        originalText: 'IN NO EVENT SHALL LICENSOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SOFTWARE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SOFTWARE; (III) ANY CONTENT OBTAINED FROM THE SOFTWARE; AND (IV) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT. IN NO EVENT SHALL LICENSOR\'S TOTAL LIABILITY EXCEED THE AMOUNT PAID BY LICENSEE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.',
        simplifiedText: 'The company is not responsible for any indirect damages like lost profits, lost data, or damage to your reputation from using (or being unable to use) the software. The most the company will ever pay you for any claim is the amount you paid them in the past 12 months.',
        explanation: 'This is the most protective clause for the vendor. It caps their financial exposure and eliminates liability for any "indirect" damages — which in practice means almost all real-world business losses.',
        risks: [
            'If the software causes a major business disruption, you cannot claim lost profits',
            'The liability cap may be very low relative to potential damages',
            'Essentially all meaningful damages are categorized as "indirect" and excluded',
        ],
        lawyerQuestions: [
            'Can we negotiate a higher liability cap?',
            'Should we push for carve-outs for data breaches or gross negligence?',
            'Is there cyber insurance that covers gaps in this limitation?',
        ],
        importance: 'high',
    },
    {
        id: 'clause-6',
        index: 5,
        title: '6. Termination',
        originalText: 'Either party may terminate this Agreement upon thirty (30) days\' prior written notice to the other party. Licensor may terminate this Agreement immediately upon written notice if Licensee breaches any material term or condition of this Agreement and fails to cure such breach within fifteen (15) days after receiving written notice thereof. Upon termination, Licensee shall immediately cease all use of the Software and destroy all copies thereof in its possession.',
        simplifiedText: 'Either side can end this agreement by giving 30 days\' written notice. However, if you break an important rule and don\'t fix it within 15 days of being told, the company can end the agreement immediately. When the agreement ends, you must stop using the software and delete all copies.',
        explanation: 'This outlines how the agreement can be ended. Notable is the asymmetry — the vendor can terminate immediately for breach, while routine termination requires 30 days notice from either side.',
        risks: [
            'Immediate termination for breach gives the vendor significant leverage',
            'You must destroy all copies — consider data migration needs',
            'No mention of data export rights upon termination',
        ],
        lawyerQuestions: [
            'Can we negotiate for a longer cure period?',
            'What happens to our data stored in the software upon termination?',
            'Can we add a transition period to migrate to another solution?',
        ],
        importance: 'high',
    },
];

export const sampleDiffChanges: DiffChange[] = [
    {
        id: 'diff-1',
        clauseTitle: '1. Grant of License',
        type: 'modified',
        originalText: '...non-exclusive, non-transferable, revocable license...',
        newText: '...non-exclusive, non-transferable, irrevocable license for the Term...',
        impact: 'high',
        aiExplanation: 'The license changed from "revocable" to "irrevocable for the Term." This is a significant improvement for the licensee — the vendor can no longer arbitrarily revoke access during the contract period.',
    },
    {
        id: 'diff-2',
        clauseTitle: '3. Payment Terms',
        type: 'modified',
        originalText: '...interest at the rate of one and one-half percent (1.5%) per month...',
        newText: '...interest at the rate of one percent (1.0%) per month...',
        impact: 'medium',
        aiExplanation: 'The late payment interest rate was reduced from 1.5% to 1.0% per month (12% annually vs 18% annually). This is a favorable change that reduces the financial penalty for late payments.',
    },
    {
        id: 'diff-3',
        clauseTitle: '5. Limitation of Liability',
        type: 'modified',
        originalText: '...TOTAL LIABILITY EXCEED THE AMOUNT PAID BY LICENSEE IN THE TWELVE (12) MONTHS...',
        newText: '...TOTAL LIABILITY EXCEED TWO TIMES (2X) THE AMOUNT PAID BY LICENSEE IN THE TWELVE (12) MONTHS...',
        impact: 'high',
        aiExplanation: 'The liability cap doubled from 1x to 2x the annual fees paid. This provides significantly more protection for the licensee in case of software failure or breach.',
    },
    {
        id: 'diff-4',
        clauseTitle: '7. Data Processing Addendum',
        type: 'added',
        originalText: '',
        newText: 'Licensor shall process personal data only in accordance with the Data Processing Addendum attached hereto as Exhibit B. Licensor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of processing.',
        impact: 'high',
        aiExplanation: 'A new Data Processing Addendum was added. This is critical for GDPR/data privacy compliance and establishes specific obligations for how the vendor handles your data.',
    },
    {
        id: 'diff-5',
        clauseTitle: '4. Confidentiality (Survival)',
        type: 'modified',
        originalText: '...survive termination of this Agreement for a period of five (5) years.',
        newText: '...survive termination of this Agreement for a period of three (3) years.',
        impact: 'low',
        aiExplanation: 'The confidentiality survival period was reduced from 5 years to 3 years. This is a relatively minor change — the shorter obligation is slightly more favorable for both parties.',
    },
    {
        id: 'diff-6',
        clauseTitle: '8. Governing Law',
        type: 'removed',
        originalText: 'This Agreement shall be governed by the laws of the State of Delaware without regard to its conflict of laws provisions. Any disputes shall be resolved exclusively in the courts of Delaware.',
        newText: '',
        impact: 'medium',
        aiExplanation: 'The Delaware governing law clause was removed. This may need to be replaced with an alternative jurisdiction clause or could leave the governing law ambiguous, which is a risk.',
    },
];

export const sampleChatHistory: ChatMessage[] = [
    {
        id: 'msg-1',
        role: 'assistant',
        content: 'Hello! I\'ve analyzed your Software License Agreement with Acme Corp. I found 6 key clauses. What would you like to know about this document?',
        timestamp: '2026-09-09T10:00:00',
    },
];

export const typeLabels: Record<string, string> = {
    nda: 'NDA',
    lease: 'Lease',
    employment: 'Employment',
    tos: 'Terms of Service',
    contract: 'Contract',
    other: 'Other',
};

export const typeColors: Record<string, string> = {
    nda: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    lease: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    employment: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    tos: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    contract: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
    other: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-300',
};

export function getAIResponse(question: string, clauses: Clause[]): { content: string; citations: { clauseId: string; text: string }[] } {
    const q = question.toLowerCase();

    // Helper to find clauses dynamically
    const findRelevantClauses = (keywords: string[]) => {
        return clauses.filter(c =>
            keywords.some(k => c.originalText.toLowerCase().includes(k) || c.title.toLowerCase().includes(k))
        );
    };

    // Intent: Identity / Personal / Greeting
    if (q.includes('hello') || q.includes('hi') || q.includes('who are you') || q.includes('name') || q.includes('how are you')) {
        return {
            content: `Hello! 👋 I am **LexClarity AI**, your personal AI legal assistant built for PromptWars: Virtual.\n\nI specialize in advanced semantic chunking and RAG (Retrieval-Augmented Generation) to analyze complex legal documents, simplify clauses into plain English, and identify hidden liabilities.\n\nI can't feel emotions, but I am *highly* enthusiastic about saving you from bad contracts! How can I help you analyze a document today?`,
            citations: [],
        };
    }

    // Intent: Risk Analysis
    if (q.includes('risk') || q.includes('danger') || q.includes('concern') || q.includes('red flag')) {
        const highRiskClauses = clauses.filter(c => c.importance === 'high');
        const citations = highRiskClauses.map(c => ({ clauseId: c.id, text: c.title }));

        return {
            content: `Based on my semantic analysis of this agreement, I have identified **${highRiskClauses.length} critical high-risk areas** that require your immediate attention:\n\n` +
                highRiskClauses.map(c => `• **${c.title}**: ${c.risks[0]}`).join('\n') +
                `\n\n**Strategic Recommendation:** I strongly advise renegotiating the limitation of liability and termination rights. These currently heavily favor the vendor. Would you like me to draft proposed redlines for these sections?`,
            citations: citations,
        };
    }

    // Intent: Payment & Financials
    if (q.includes('payment') || q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('money')) {
        const paymentClauses = findRelevantClauses(['payment', 'fee', 'tax', 'invoice']);
        const citations = paymentClauses.map(c => ({ clauseId: c.id, text: c.title }));

        return {
            content: `I've reviewed the financial structure of the agreement.\n\n**Financial Obligations & Penalties:**\n- **Payment Window:** You have a strict 30-day net payment period upon receipt of invoice.\n- **Late Penalty:** There is an aggressive **1.5% monthly interest rate (18% API)** on late payments, which is significantly above the market standard of 12% API.\n- **Taxes:** The burden of all taxes (except the vendor's net income taxes) falls entirely on you.\n\n⚠️ **Warning:** The agreement lacks a formal dispute resolution mechanism for billing errors. You must pay disputed invoices to avoid the substantial 1.5% penalty.`,
            citations: citations.length > 0 ? citations : [{ clauseId: 'clause-3', text: 'Section 3: Payment Terms' }],
        };
    }

    // Intent: Termination / Exit
    if (q.includes('terminat') || q.includes('cancel') || q.includes('end') || q.includes('exit')) {
        const exitClauses = findRelevantClauses(['terminat', 'cease', 'survive']);
        const citations = exitClauses.map(c => ({ clauseId: c.id, text: c.title }));

        return {
            content: `The exit provisions in this agreement pose a structural disadvantage to you.\n\n**Key Termination Rules:**\n1. **Without Cause:** Either party may terminate with 30 days' written notice.\n2. **With Cause (Breach):** The vendor can terminate **immediately** if you breach a material term and fail to remedy it within 15 days.\n\n🚨 **Critical Data Risk:** Upon termination, you are explicitly required to "destroy all copies" of the software and data. **There is no transition assistance provision or data export right.** If the vendor terminates you immediately for a breach, you could instantly lose access to all your operational data.`,
            citations: citations.length > 0 ? citations : [{ clauseId: 'clause-6', text: 'Section 6: Termination' }],
        };
    }

    // Intent: Confidentiality / Privacy
    if (q.includes('confidential') || q.includes('secret') || q.includes('privacy') || q.includes('data')) {
        const privacyClauses = findRelevantClauses(['confidential', 'proprietary', 'secret']);
        const citations = privacyClauses.map(c => ({ clauseId: c.id, text: c.title }));

        return {
            content: `This agreement enforces a **Mutual Non-Disclosure framework** with aggressive survival periods.\n\n- **Scope:** The definition of "Confidential Information" is exceptionally broad, spanning technical data, trade secrets, and general business operations.\n- **Survival:** Your obligation to maintain this secrecy lasts for **5 years after the agreement ends**.\n\nBecause of the broad scope, this could theoretically restrict your ability to publicly discuss using the vendor's software. I suggest carving out standard exceptions for information that is already legally in the public domain.`,
            citations: citations.length > 0 ? citations : [{ clauseId: 'clause-4', text: 'Section 4: Confidentiality' }],
        };
    }

    // Intent: IP & Ownership
    if (q.includes('ip') || q.includes('intellectual') || q.includes('owner') || q.includes('brand')) {
        const ipClauses = findRelevantClauses(['intellectual', 'property', 'patent', 'copyright']);
        const citations = ipClauses.map(c => ({ clauseId: c.id, text: c.title }));

        return {
            content: `The intellectual property framework here is highly restrictive.\n\n**Vendor IP Retention:**\nThe vendor explicitly retains all ownership, patents, copyrights, and trade secrets related to the software. You are granted a limited license, not ownership.\n\n⚠️ **Subtle Risk Identified:** Because the IP clause is so unilateral, if you suggest a feature improvement to the vendor, they fully own that intellectual property. Ensure this does not inadvertently sign away the rights to your own proprietary data models processed through the platform.`,
            citations: citations.length > 0 ? citations : [{ clauseId: 'clause-2', text: 'Section 2: Intellectual Property' }],
        };
    }

    // Intent: Farewells
    if (q.includes('bye') || q.includes('goodbye') || q.includes('see ya') || q.includes('cisco')) {
        return {
            content: `Goodbye! Feel free to upload another document or return anytime if you have more legal questions. Have a great day!`,
            citations: [],
        };
    }

    // Intent: Acknowledgements
    if (q === 'ok' || q === 'okay' || q.includes('thanks') || q.includes('thank you') || q === 'cool' || q === 'yes' || q === 'no' || q === 'nice') {
        return {
            content: `You're welcome! Is there anything else specific from the document you'd like me to clarify for you?`,
            citations: [],
        };
    }

    // Intent: General Analysis / Summarize (Catching "read it", "what about it", "summarize")
    if (q.includes('read') || q.includes('summarize') || q.includes('analyze') || q.includes('what about it') || q.includes('explain') || q.includes('tell me')) {
        return {
            content: `I've performed a comprehensive scan of the document.\n\nOverall, this is a standard agreement, but it carries a **moderate-to-high risk profile** for you. The most critical issues are buried in the **Payment Terms** (which carry aggressive late fees) and the **Limitation of Liability** (which heavily favors the vendor).\n\nIf you want to dive deeper, you can ask me to "explain the risks" or "what are the payment terms?"`,
            citations: [{ clauseId: clauses[0]?.id || 'clause-1', text: 'Executive Summary Overview' }],
        };
    }

    // Dynamic Fallback: Try to search through clauses for matching keywords
    const words = q.split(' ').filter(w => w.length > 3);
    if (words.length > 0) {
        const matchedClauses = findRelevantClauses(words);
        if (matchedClauses.length > 0) {
            const topClause = matchedClauses[0];
            return {
                content: `Based on your question, looking at **${topClause.title}** is most relevant.\n\n**Legal Translation:**\n${topClause.simplifiedText}\n\n**Why this matters dynamically:**\n${topClause.explanation}\n\nWould you like me to explicitly draft questions you should ask the opposing counsel regarding this clause?`,
                citations: [{ clauseId: topClause.id, text: topClause.title }]
            };
        }
    }

    // Default conversational fallback for unknown/short chatter
    if (q.split(' ').length < 4) {
        return {
            content: `I am currently focused on analyzing the legal document. Could you provide a bit more context, or specify which clause you are asking about?`,
            citations: [],
        };
    }

    // Default Advanced Response for longer unknown queries
    return {
        content: `I've analyzed the semantic context of your question against the agreement.\n\nCurrently, this document exhibits an overall **Pro-Vendor bias**. It contains ${clauses.length} primary clauses covering licensing rights, IP, payment, confidentiality, liability limits, and termination.\n\n**Where should we focus next?**\n• Type **"risks"** to see my breakdown of heavily biased clauses.\n• Type **"financials"** to review late fee structures.\n• Type **"exit"** to review the termination and data-loss policies.`,
        citations: [
            { clauseId: clauses[0]?.id || 'clause-1', text: clauses[0]?.title || 'Key Agreement Terms' }
        ],
    };
}
