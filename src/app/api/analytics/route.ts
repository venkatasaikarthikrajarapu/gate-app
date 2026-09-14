import { NextResponse } from 'next/server';

const ANALYTICS_DATA = {
  overallAccuracy: 0,
  questionsSolved: 0,
  mockPercentile: 0,
  timePerQuestion: 0,
  weeklyTrend: [
    { day: 'Mon', accuracy: 0, count: 0 },
    { day: 'Tue', accuracy: 0, count: 0 },
    { day: 'Wed', accuracy: 0, count: 0 },
    { day: 'Thu', accuracy: 0, count: 0 },
    { day: 'Fri', accuracy: 0, count: 0 },
    { day: 'Sat', accuracy: 0, count: 0 },
    { day: 'Sun', accuracy: 0, count: 0 },
  ],
  subjectPerformance: [
    { subject: 'PDS',   accuracy: 0, target: 80 },
    { subject: 'Algo',  accuracy: 0, target: 80 },
    { subject: 'DL',    accuracy: 0, target: 80 },
    { subject: 'COA',   accuracy: 0, target: 80 },
    { subject: 'CN',    accuracy: 0, target: 80 },
    { subject: 'OS',    accuracy: 0, target: 80 },
    { subject: 'DBMS',  accuracy: 0, target: 80 },
    { subject: 'TOC',   accuracy: 0, target: 80 },
    { subject: 'CD',    accuracy: 0, target: 80 },
    { subject: 'Maths', accuracy: 0, target: 80 },
    { subject: 'Apti',  accuracy: 0, target: 80 },
  ],
  radarData: [
    { subject: 'PDS',   score: 0 },
    { subject: 'Algo',  score: 0 },
    { subject: 'DL',    score: 0 },
    { subject: 'COA',   score: 0 },
    { subject: 'CN',    score: 0 },
    { subject: 'OS',    score: 0 },
    { subject: 'DBMS',  score: 0 },
    { subject: 'TOC',   score: 0 },
    { subject: 'CD',    score: 0 },
    { subject: 'Maths', score: 0 },
    { subject: 'Apti',  score: 0 },
  ],
  weakTopics: [],
};

export async function GET() {
  return NextResponse.json(ANALYTICS_DATA);
}
