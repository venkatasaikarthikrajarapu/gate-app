'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Bookmark,
  Sparkles,
  RotateCw,
  Search,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import clsx from 'clsx';

interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  keyPoints: string[];
  bookmarked: boolean;
}

interface Formula {
  id: string;
  subject: string;
  name: string;
  formula: string;
  explanation: string;
  example: string;
}

interface Trap {
  id: string;
  subject: string;
  trap: string;
  misconception: string;
  correctApproach: string;
}

const DEMO_NOTES: Note[] = [
  {
    id: 'n1',
    subject: 'Data Structures',
    title: 'AVL Tree Self-Balancing Rotations',
    content: 'An AVL tree is a BST where the difference between heights of left and right subtrees (Balance Factor = hL - hR) cannot be more than 1 for all nodes.',
    keyPoints: [
      'LL Rotation: Right rotation at unbalanced node (after insertion in left subtree of left child)',
      'RR Rotation: Left rotation at unbalanced node (after insertion in right subtree of right child)',
      'LR Rotation: Left rotate left child, then right rotate unbalanced node',
      'RL Rotation: Right rotate right child, then left rotate unbalanced node',
      'Maximum height of AVL tree with n nodes is bounded by 1.44 * log2(n)',
    ],
    bookmarked: true,
  },
  {
    id: 'n2',
    subject: 'Computer Networks',
    title: 'TCP Connection States & Flow Control',
    content: 'TCP uses a 3-way handshake for connection establishment (SYN, SYN-ACK, ACK) and 4-way termination (FIN, ACK, FIN, ACK).',
    keyPoints: [
      'TIME_WAIT state lasts for 2 * MSL (Maximum Segment Lifetime) to ensure final ACK was received',
      'Effective Window Size = min(Congestion Window, Receiver Advertised Window)',
      'Silley Window Syndrome avoidance: Nagle algorithm (sender side), Clark solution (receiver side)',
    ],
    bookmarked: false,
  },
  {
    id: 'n3',
    subject: 'DBMS',
    title: 'Relational Normalization Criteria',
    content: 'Normalization eliminates update, deletion, and insertion anomalies by decomposing relations into higher normal forms.',
    keyPoints: [
      '1NF: Attributes contain only atomic (indivisible) values',
      '2NF: 1NF + No partial dependency (no proper subset of candidate key determines non-prime attribute)',
      '3NF: 2NF + No transitive dependency (for every X -> A, either X is superkey or A is prime attribute)',
      'BCNF: For every non-trivial FD X -> A, X must be a superkey',
    ],
    bookmarked: true,
  },
  {
    id: 'n4',
    subject: 'Operating Systems',
    title: 'Coffman Deadlock Conditions & Banker Algorithm',
    content: 'Deadlock arises when multiple processes compete for limited resources and remain blocked indefinitely.',
    keyPoints: [
      'Four simultaneous conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait',
      'Resource-Allocation Graph with single instance per type: Cycle is necessary AND sufficient for deadlock',
      'Multiple instances: Cycle is necessary but NOT sufficient',
      'Banker algorithm checks safe state: Need = Max - Allocation <= Available',
    ],
    bookmarked: false,
  },
];

const DEMO_FORMULAS: Formula[] = [
  {
    id: 'f1',
    subject: 'Computer Organization',
    name: 'Pipelining Speedup Ratio',
    formula: 'Speedup = (n * k) / (k + n - 1)',
    explanation: 'Where n = number of instructions and k = number of pipeline stages. As n approaches infinity, maximum speedup = k.',
    example: 'For k=5 stages and n=100 instructions: Speedup = 500 / 104 = 4.81x',
  },
  {
    id: 'f2',
    subject: 'Operating Systems',
    name: 'Effective Memory Access Time (EMAT)',
    formula: 'EMAT = h * (t_TLB + t_mem) + (1 - h) * (t_TLB + (k + 1) * t_mem)',
    explanation: 'Where h = TLB hit ratio, t_TLB = TLB access time, t_mem = main memory access time, and k = number of levels in multi-level paging.',
    example: 'h=0.9, t_TLB=20ns, t_mem=100ns, 1-level paging: EMAT = 0.9*(120) + 0.1*(220) = 130 ns',
  },
  {
    id: 'f3',
    subject: 'Algorithms',
    name: "Amdahl's Law for Parallel Speedup",
    formula: 'Speedup = 1 / (s + (1 - s) / p)',
    explanation: 'Where s = fraction of code that is strictly serial, and p = number of parallel processors.',
    example: 's=0.25 (25% serial), p=4 processors: Speedup = 1 / (0.25 + 0.75/4) = 1 / 0.4375 = 2.28x',
  },
  {
    id: 'f4',
    subject: 'Computer Networks',
    name: 'Sliding Window Minimum Frame Size',
    formula: 'Frame_size >= 2 * Bandwidth * Propagation_Delay',
    explanation: 'To detect collisions in CSMA/CD, transmission time (Tt) must be at least twice the propagation time (Tp): Tt >= 2 * Tp.',
    example: 'Bandwidth = 10 Mbps, Tp = 25.6 µs: Minimum frame size = 2 * 10^7 * 25.6 * 10^-6 = 512 bits = 64 bytes',
  },
];

const DEMO_TRAPS: Trap[] = [
  {
    id: 't1',
    subject: 'Theory of Computation',
    trap: 'Assuming Closure Properties for Non-Deterministic Languages',
    misconception: 'Assuming that deterministic and non-deterministic versions always have identical closure properties.',
    correctApproach: 'Deterministic Context-Free Languages (DCFLs) are CLOSED under complementation, but NOT closed under union or intersection. General CFLs are closed under union, but NOT closed under complement or intersection!',
  },
  {
    id: 't2',
    subject: 'DBMS',
    trap: 'SQL NULL Arithmetic and Comparisons',
    misconception: 'Writing WHERE col = NULL or assuming NULL != 5 includes NULL values.',
    correctApproach: 'Any arithmetic or comparison with NULL produces UNKNOWN (except IS NULL / IS NOT NULL). In COUNT(column), NULL rows are ignored; in COUNT(*), NULL rows are included.',
  },
  {
    id: 't3',
    subject: 'Data Structures',
    trap: 'Binary Search Tree Deletion of 2-Child Node',
    misconception: 'Replacing node with arbitrary child instead of in-order predecessor/successor.',
    correctApproach: 'Always replace with in-order predecessor (maximum in left subtree) or in-order successor (minimum in right subtree), then recursively delete that leaf/single-child node.',
  },
  {
    id: 't4',
    subject: 'Computer Networks',
    trap: 'Subnet Host Calculation Edge Cases',
    misconception: 'Forgetting to subtract 2 for network ID and broadcast address.',
    correctApproach: 'Usable hosts = 2^(32 - prefix) - 2. For /31 and /32 subnets, standard host address formula has special RFC 3021 exceptions, but in GATE always follow standard -2 unless point-to-point link is specified.',
  },
];

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<'notes' | 'formulas' | 'traps'>('notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNotes = DEMO_NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFormulas = DEMO_FORMULAS.filter(
    (f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTraps = DEMO_TRAPS.filter(
    (t) =>
      t.trap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1">
      <Header
        title="High-Yield Revision Vault"
        subtitle="Curated short notes, formula flashcard decks, and GATE exam trap rules"
      />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Navigation Tabs and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('notes')}
              className={clsx(
                'px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all',
                activeTab === 'notes'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Short Notes ({DEMO_NOTES.length})
            </button>
            <button
              onClick={() => setActiveTab('formulas')}
              className={clsx(
                'px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all',
                activeTab === 'formulas'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Formula Flashcards ({DEMO_FORMULAS.length})
            </button>
            <button
              onClick={() => setActiveTab('traps')}
              className={clsx(
                'px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all',
                activeTab === 'traps'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              Trap Rules ({DEMO_TRAPS.length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search concepts, formulas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Tab 1: Short Notes */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="bg-slate-900/80 border-slate-800 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="info">{note.subject}</Badge>
                    <button className={clsx('transition-colors', note.bookmarked ? 'text-amber-400' : 'text-slate-600')}>
                      <Bookmark size={18} fill={note.bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <h3 className="text-base font-semibold text-slate-100">{note.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{note.content}</p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      High-Yield Exam Takeaways
                    </p>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {note.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Tab 2: Formula Flashcards (Active Recall) */}
        {activeTab === 'formulas' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Click any flashcard to toggle between mathematical formula and detailed derivation context.
              </p>
              <Badge variant="purple">Active Recall Mode</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFormulas.map((f) => {
                const isFlipped = flippedCards[f.id];
                return (
                  <div
                    key={f.id}
                    onClick={() => toggleFlip(f.id)}
                    className="cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-indigo-500/60 p-5 rounded-2xl transition-all shadow-md min-h-[200px] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <Badge variant="default">{f.subject}</Badge>
                        <span className="text-[11px] text-indigo-400 inline-flex items-center gap-1">
                          <RotateCw size={12} /> {isFlipped ? 'Show Formula' : 'Show Explanation'}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-slate-100 mb-2">{f.name}</h4>

                      {!isFlipped ? (
                        <div className="my-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                          <code className="text-sm md:text-base font-mono font-bold text-indigo-300 tracking-wide">
                            {f.formula}
                          </code>
                        </div>
                      ) : (
                        <div className="space-y-2 my-2 text-xs">
                          <p className="text-slate-300 leading-relaxed">{f.explanation}</p>
                          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400">
                            <strong className="text-emerald-400">GATE Example:</strong> {f.example}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 flex justify-between items-center pt-2 border-t border-slate-800/60">
                      <span>Standard GATE CSE Reference</span>
                      <span className="text-slate-400 font-medium">Click to flip</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Trap Rules */}
        {activeTab === 'traps' && (
          <div className="space-y-4">
            <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertTriangle size={16} className="flex-shrink-0" />
              <span>
                These trap rules are synthesized from the top 100 negative-marked questions in GATE history.
                Review them before every mock exam!
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTraps.map((trap) => (
                <Card key={trap.id} className="bg-slate-900/80 border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="error">{trap.subject}</Badge>
                    <span className="text-xs text-red-400 font-medium">Common Trap</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{trap.trap}</h4>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-1 text-xs">
                    <p className="text-red-400 font-medium">❌ Frequent Student Blunder:</p>
                    <p className="text-slate-400">{trap.misconception}</p>
                  </div>

                  <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 space-y-1 text-xs">
                    <p className="text-emerald-400 font-medium">✅ The Ironclad Correct Approach:</p>
                    <p className="text-slate-300 leading-relaxed">{trap.correctApproach}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
