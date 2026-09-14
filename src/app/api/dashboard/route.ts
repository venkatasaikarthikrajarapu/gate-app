import { NextResponse } from 'next/server';

const DEMO_DASHBOARD = {
  stats: {
    streak: 7,
    questionsToday: 28,
    accuracyToday: 82,
    studyHours: 3.5,
    daysToGATE: 148,
  },
  weekAccuracy: [
    { day: 'Mon', accuracy: 62 },
    { day: 'Tue', accuracy: 71 },
    { day: 'Wed', accuracy: 58 },
    { day: 'Thu', accuracy: 80 },
    { day: 'Fri', accuracy: 74 },
    { day: 'Sat', accuracy: 88 },
    { day: 'Sun', accuracy: 82 },
  ],
  subjects: [
    { name: 'Data Structures', progress: 78, accuracy: 82, color: 'indigo' },
    { name: 'Algorithms', progress: 65, accuracy: 71, color: 'indigo' },
    { name: 'Operating Systems', progress: 52, accuracy: 63, color: 'indigo' },
    { name: 'DBMS', progress: 45, accuracy: 58, color: 'indigo' },
    { name: 'Computer Networks', progress: 38, accuracy: 54, color: 'indigo' },
    { name: 'Theory of Computation', progress: 30, accuracy: 48, color: 'indigo' },
  ],
  todayPlan: [
    { subject: 'Data Structures', topic: 'AVL Trees', duration: 45, done: true },
    { subject: 'Algorithms', topic: 'Dynamic Programming', duration: 60, done: false },
    { subject: 'DBMS', topic: 'SQL Joins & Aggregations', duration: 45, done: false },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(DEMO_DASHBOARD);
  } catch (error) {
    return NextResponse.json(DEMO_DASHBOARD);
  }
}
