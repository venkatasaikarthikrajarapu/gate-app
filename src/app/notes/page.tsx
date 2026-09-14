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
  Filter,
} from 'lucide-react';
import clsx from 'clsx';
import { DEMO_NOTES, DEMO_FORMULAS, DEMO_TRAPS, Note, Formula, Trap } from '@/lib/notes-data';

const ROADMAP_SUBJECTS = [
  'All',
  '#1 PDS',
  '#2 Algo',
  '#3 DL',
  '#4 COA',
  '#5 CN',
  '#6 OS',
  '#7 DBMS',
  '#8 TOC',
  '#9 CD',
  '#10 Maths',
  '#11 Apti',
];

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<'notes' | 'formulas' | 'traps'>('notes');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const matchesSubject = (itemSubject: string) => {
    if (selectedSubject === 'All') return true;
    return itemSubject.toLowerCase().includes(selectedSubject.toLowerCase());
  };

  const filteredNotes = DEMO_NOTES.filter(
    (n) =>
      matchesSubject(n.subject) &&
      (n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFormulas = DEMO_FORMULAS.filter(
    (f) =>
      matchesSubject(f.subject) &&
      (f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.formula.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTraps = DEMO_TRAPS.filter(
    (t) =>
      matchesSubject(t.subject) &&
      (t.trap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.misconception.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex-1">
      <Header
        title="High-Yield Daily Notes Vault"
        subtitle="Curated short notes, formula flashcard decks, and GATE exam trap rules across all 11 roadmap subjects"
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
              Short Notes ({filteredNotes.length})
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
              Formula Flashcards ({filteredFormulas.length})
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
              Trap Rules ({filteredTraps.length})
            </button>
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search concepts, formulas, traps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* 11-Subject Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1 flex-shrink-0">
            <Filter size={12} /> Filter:
          </span>
          {ROADMAP_SUBJECTS.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={clsx(
                'px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0',
                selectedSubject === sub
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              )}
            >
              {sub}
            </button>
          ))}
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
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {note.keyPoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{pt}</span>
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
                These trap rules are synthesized from the top negative-marked questions in GATE CSE history across all 11 subjects.
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
                    <p className="text-red-400 font-medium">? Frequent Student Blunder:</p>
                    <p className="text-slate-400">{trap.misconception}</p>
                  </div>

                  <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 space-y-1 text-xs">
                    <p className="text-emerald-400 font-medium">? The Ironclad Correct Approach:</p>
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
