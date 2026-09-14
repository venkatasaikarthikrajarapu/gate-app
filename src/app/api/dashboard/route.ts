import { NextResponse } from 'next/server';

const FRESH_DASHBOARD = {
  stats: {
    streak: 1,
    questionsToday: 0,
    accuracyToday: 0,
    studyHours: 0.0,
    daysToGATE: 150,
    currentStage: 1,
    currentSubjectCode: 'PDS',
    currentSubjectName: 'Programming & Data Structures',
    totalSubjects: 11,
    completedSubjects: 0,
  },
  weekAccuracy: [
    { day: 'Mon', accuracy: 0 },
    { day: 'Tue', accuracy: 0 },
    { day: 'Wed', accuracy: 0 },
    { day: 'Thu', accuracy: 0 },
    { day: 'Fri', accuracy: 0 },
    { day: 'Sat', accuracy: 0 },
    { day: 'Today', accuracy: 0 },
  ],
  subjects: [
    { order: 1, code: 'PDS', name: 'Programming & Data Structures', progress: 0, accuracy: 0, color: 'emerald', status: 'active' },
    { order: 2, code: 'Algo', name: 'Algorithms', progress: 0, accuracy: 0, color: 'emerald', status: 'upcoming' },
    { order: 3, code: 'DL', name: 'Digital Logic', progress: 0, accuracy: 0, color: 'emerald', status: 'upcoming' },
    { order: 4, code: 'COA', name: 'Computer Organization & Architecture', progress: 0, accuracy: 0, color: 'sky', status: 'upcoming' },
    { order: 5, code: 'CN', name: 'Computer Networks', progress: 0, accuracy: 0, color: 'sky', status: 'upcoming' },
    { order: 6, code: 'OS', name: 'Operating Systems', progress: 0, accuracy: 0, color: 'purple', status: 'upcoming' },
    { order: 7, code: 'DBMS', name: 'Database Management Systems', progress: 0, accuracy: 0, color: 'red', status: 'upcoming' },
    { order: 8, code: 'TOC', name: 'Theory of Computation', progress: 0, accuracy: 0, color: 'amber', status: 'upcoming' },
    { order: 9, code: 'CD', name: 'Compiler Design', progress: 0, accuracy: 0, color: 'emerald', status: 'upcoming' },
    { order: 10, code: 'Maths', name: 'Engineering & Discrete Mathematics', progress: 0, accuracy: 0, color: 'emerald', status: 'upcoming' },
    { order: 11, code: 'Apti', name: 'General Aptitude', progress: 0, accuracy: 0, color: 'emerald', status: 'upcoming' },
  ],
  todayPlan: [
    {
      subject: '#1 PDS',
      topic: 'C Pointers, Arrays & Dynamic Memory Allocation (malloc/free)',
      duration: 45,
      done: false,
      recommended: true,
    },
    {
      subject: '#1 PDS',
      topic: 'Singly & Doubly Linked List Operations & Reversals',
      duration: 45,
      done: false,
      recommended: true,
    },
    {
      subject: '#1 PDS',
      topic: 'Stack Applications: Infix to Postfix Conversion & Evaluation',
      duration: 30,
      done: false,
      recommended: false,
    },
  ],
};

export async function GET() {
  try {
    return NextResponse.json(FRESH_DASHBOARD);
  } catch (error) {
    return NextResponse.json(FRESH_DASHBOARD);
  }
}
