'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  ClipboardList,
  Clock,
  HelpCircle,
  Trophy,
  BarChart2,
  Calendar,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface MockTemplate {
  id: string;
  title: string;
  questions: number;
  duration: number; // minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subjects: string;
  description: string;
}

interface MockHistory {
  id: string;
  title: string;
  date: string;
  score: number;
  total: number;
  accuracy: number;
  status: 'Completed' | 'In Progress' | 'Abandoned';
}

const DEMO_TEMPLATES: MockTemplate[] = [
  {
    id: 'full-1',
    title: 'GATE CSE 2025 Full Length Mock 1',
    questions: 65,
    duration: 180,
    difficulty: 'Hard',
    subjects: 'Complete Syllabus (Core CS + Aptitude + Engg Math)',
    description: 'Exact GATE 2025 standard test pattern with sectional division, 1-mark and 2-mark negative scoring.',
  },
  {
    id: 'ds-algo',
    title: 'Data Structures & Algorithms Sectional',
    questions: 30,
    duration: 90,
    difficulty: 'Medium',
    subjects: 'DSA, Trees, Graphs, DP, Sorting',
    description: 'High-yield conceptual & problem-solving drill covering tree rotations, recurrence relations, and graph traversals.',
  },
  {
    id: 'os-cn',
    title: 'Operating Systems & Networks Drill',
    questions: 30,
    duration: 90,
    difficulty: 'Medium',
    subjects: 'OS, Networks, Paging, TCP/IP, CIDR',
    description: 'Deep-dive questions focusing on CPU scheduling, virtual memory calculation, subnet masks, and sliding windows.',
  },
  {
    id: 'dbms-toc',
    title: 'DBMS + TOC + COA Mastery',
    questions: 30,
    duration: 90,
    difficulty: 'Hard',
    subjects: 'Relational Algebra, SQL, DFA/Turing, Pipelines',
    description: 'Rigorous assessment on closure sets, normalization, DFA state minimization, and pipelining speedup formulas.',
  },
];

const DEMO_HISTORY: MockHistory[] = [
  {
    id: 'h1',
    title: 'GATE CSE 2025 Full Length Mock 1',
    date: '2026-09-10',
    score: 64.5,
    total: 100,
    accuracy: 76,
    status: 'Completed',
  },
  {
    id: 'h2',
    title: 'Data Structures & Algorithms Sectional',
    date: '2026-09-07',
    score: 52.0,
    total: 60,
    accuracy: 86,
    status: 'Completed',
  },
  {
    id: 'h3',
    title: 'Operating Systems & Networks Drill',
    date: '2026-09-03',
    score: 38.0,
    total: 60,
    accuracy: 68,
    status: 'Completed',
  },
];

export default function MockTestsPage() {
  const [templates, setTemplates] = useState<MockTemplate[]>(DEMO_TEMPLATES);
  const [history, setHistory] = useState<MockHistory[]>(DEMO_HISTORY);

  useEffect(() => {
    fetch('/api/mocks')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.templates) setTemplates(data.templates);
        if (data?.history) setHistory(data.history);
      })
      .catch(() => {
        // Fallback to demo data
      });
  }, []);

  const totalAttempted = history.length;
  const bestScore = history.reduce((max, h) => Math.max(max, (h.score / h.total) * 100), 0);
  const avgScore =
    history.length > 0
      ? Math.round(history.reduce((acc, h) => acc + (h.score / h.total) * 100, 0) / history.length)
      : 0;

  return (
    <div className="flex-1">
      <Header
        title="Mock Test Arena"
        subtitle="Simulate real GATE Computer Science environment with timed assessments and rank analytics"
      />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Top KPI Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex items-center gap-4 bg-slate-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Tests Attempted</p>
              <p className="text-2xl font-bold text-slate-100">{totalAttempted}</p>
              <p className="text-xs text-emerald-400 font-medium mt-0.5">All scored under GATE standard</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-slate-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Best Mock Score</p>
              <p className="text-2xl font-bold text-slate-100">{bestScore.toFixed(1)}%</p>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Top 5% candidate percentile</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4 bg-slate-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <BarChart2 size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Average Performance</p>
              <p className="text-2xl font-bold text-slate-100">{avgScore}%</p>
              <p className="text-xs text-indigo-400 font-medium mt-0.5">+8% improvement this month</p>
            </div>
          </Card>
        </div>

        {/* Available Test Templates Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Standard Test Series</h2>
              <p className="text-xs text-slate-400">
                Full-length papers and sectional drills timed with accurate GATE negative marking
              </p>
            </div>
            <Badge variant="info">
              <Sparkles size={12} className="mr-1 inline" /> 2025 Syllabus Aligned
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((test) => (
              <Card
                key={test.id}
                className="flex flex-col justify-between hover:border-indigo-500/50 transition-all bg-slate-900/80 border-slate-800"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-slate-100">{test.title}</h3>
                    <Badge
                      variant={
                        test.difficulty === 'Hard'
                          ? 'error'
                          : test.difficulty === 'Medium'
                          ? 'warning'
                          : 'success'
                      }
                    >
                      {test.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{test.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-300 mb-4 py-2 border-y border-slate-800/60">
                    <span className="flex items-center gap-1.5">
                      <HelpCircle size={14} className="text-indigo-400" />
                      {test.questions} Questions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-400" />
                      {test.duration} Minutes
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      Subjects: <strong className="text-slate-200">{test.subjects}</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">GATE Standard Scientific Calc Enabled</span>
                  <Link href={`/mocks/${test.id}`}>
                    <Button variant="primary" size="md">
                      Start Test <ArrowRight size={15} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Mock Results Table */}
        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader
            title="Past Test Attempts & Analysis"
            subtitle="Review your score breakdown, speed metrics, and mistake trends"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {history.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-200">{row.title}</td>
                    <td className="py-3.5 px-4 text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} /> {row.date}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-100">
                        {row.score} / {row.total}
                      </span>
                      <span className="text-slate-500 ml-1">
                        ({Math.round((row.score / row.total) * 100)}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={row.accuracy >= 75 ? 'success' : 'warning'}>
                        {row.accuracy}%
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/mocks/${row.id}`}>
                        <button className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-0.5 transition-colors">
                          Review <ChevronRight size={14} />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
