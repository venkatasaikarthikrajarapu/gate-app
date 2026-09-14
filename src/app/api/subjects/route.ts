import { NextResponse } from 'next/server';

const GATE_SUBJECTS = [
  { id: 'ds', name: 'Data Structures', topics: 18, progress: 78, color: 'indigo' },
  { id: 'algo', name: 'Algorithms', topics: 22, progress: 65, color: 'purple' },
  { id: 'os', name: 'Operating Systems', topics: 20, progress: 52, color: 'emerald' },
  { id: 'dbms', name: 'DBMS', topics: 16, progress: 45, color: 'amber' },
  { id: 'cn', name: 'Computer Networks', topics: 18, progress: 38, color: 'sky' },
  { id: 'toc', name: 'Theory of Computation', topics: 14, progress: 30, color: 'red' },
  { id: 'dl', name: 'Digital Logic', topics: 12, progress: 60, color: 'orange' },
  { id: 'coa', name: 'Computer Organization', topics: 15, progress: 42, color: 'pink' },
];

export async function GET() {
  return NextResponse.json({ subjects: GATE_SUBJECTS });
}
