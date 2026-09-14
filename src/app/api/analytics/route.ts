import { NextResponse } from 'next/server';

const ANALYTICS_DATA = {
  overallAccuracy: 74,
  questionsSolved: 482,
  mockPercentile: 91.4,
  timePerQuestion: 2.1,
  weeklyTrend: [
    { day: 'Mon', accuracy: 65, count: 25 },
    { day: 'Tue', accuracy: 72, count: 35 },
    { day: 'Wed', accuracy: 68, count: 20 },
    { day: 'Thu', accuracy: 81, count: 45 },
    { day: 'Fri', accuracy: 75, count: 30 },
    { day: 'Sat', accuracy: 85, count: 50 },
    { day: 'Sun', accuracy: 79, count: 40 },
  ],
  subjectPerformance: [
    { subject: 'Data Structures', accuracy: 84, target: 85 },
    { subject: 'Algorithms', accuracy: 78, target: 80 },
    { subject: 'Operating Systems', accuracy: 71, target: 75 },
    { subject: 'DBMS', accuracy: 68, target: 75 },
    { subject: 'Computer Networks', accuracy: 59, target: 70 },
    { subject: 'Theory of Computation', accuracy: 52, target: 70 },
    { subject: 'Digital Logic', accuracy: 81, target: 80 },
    { subject: 'Computer Organization', accuracy: 62, target: 75 },
  ],
  radarData: [
    { subject: 'DSA', score: 84 },
    { subject: 'Algo', score: 78 },
    { subject: 'OS', score: 71 },
    { subject: 'DBMS', score: 68 },
    { subject: 'CN', score: 59 },
    { subject: 'TOC', score: 52 },
    { subject: 'DL', score: 81 },
    { subject: 'COA', score: 62 },
  ],
  weakTopics: [
    {
      topic: 'Context-Free Grammars & Pumping Lemma',
      subject: 'Theory of Computation',
      accuracy: 38,
      attempts: 24,
      trap: 'Failure to split string into uvwxy satisfying conditions properly',
      recommendation: 'Revisit Ogden’s Lemma and standard pumping proofs for regular vs context-free languages.',
    },
    {
      topic: 'Subnetting & CIDR Address Allocation',
      subject: 'Computer Networks',
      accuracy: 42,
      attempts: 31,
      trap: 'Subnet ID and Broadcast address subtraction omitted in host calculations',
      recommendation: 'Practice 2-mark GATE questions on variable-length subnet masking (VLSM) hierarchies.',
    },
    {
      topic: 'Pipeline Hazard Stall Cycle Penalties',
      subject: 'Computer Organization',
      accuracy: 48,
      attempts: 19,
      trap: 'Miscalculating branch penalty when target address is computed in EX vs MEM stage',
      recommendation: 'Draw time-space Gantt charts for RAW data hazards and delayed branch strategies.',
    },
    {
      topic: 'Transaction Conflict Serializability & Precedence Graphs',
      subject: 'DBMS',
      accuracy: 54,
      attempts: 28,
      trap: 'Confusing blind writes (View serializability) with Conflict serializability topological sorting',
      recommendation: 'Construct cycle-detection graphs on read/write ordering for concurrent schedules.',
    },
  ],
};

export async function GET() {
  return NextResponse.json(ANALYTICS_DATA);
}
