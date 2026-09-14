import { NextResponse } from 'next/server';

const MOCK_TEMPLATES = [
  {
    id: 'full-1',
    title: 'GATE CSE 2025 Full Length Mock 1',
    questions: 65,
    duration: 180,
    difficulty: 'Hard',
    subjects: 'Complete Syllabus',
    description: 'Exact GATE 2025 standard test pattern with sectional division and negative marking.',
  },
  {
    id: 'ds-algo',
    title: 'Data Structures & Algorithms Sectional',
    questions: 30,
    duration: 90,
    difficulty: 'Medium',
    subjects: 'DSA, Trees, Graphs, DP',
    description: 'High-yield conceptual drill covering tree rotations and recurrence relations.',
  },
  {
    id: 'os-cn',
    title: 'Operating Systems & Networks Drill',
    questions: 30,
    duration: 90,
    difficulty: 'Medium',
    subjects: 'OS, Networks, CIDR',
    description: 'Deep-dive questions focusing on CPU scheduling and TCP sliding window.',
  },
  {
    id: 'dbms-toc',
    title: 'DBMS + TOC + COA Mastery',
    questions: 30,
    duration: 90,
    difficulty: 'Hard',
    subjects: 'Relational, DFA, Pipelines',
    description: 'Rigorous assessment on closure sets, normalization, and pipelining speedup.',
  },
];

const MOCK_HISTORY = [
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

export async function GET() {
  return NextResponse.json({ templates: MOCK_TEMPLATES, history: MOCK_HISTORY });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { templateId: string };
    const template = MOCK_TEMPLATES.find((t) => t.id === body.templateId);
    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    return NextResponse.json({
      sessionId: `cbt-${Date.now()}`,
      template,
      startTime: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
