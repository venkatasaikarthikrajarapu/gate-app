import { NextResponse } from 'next/server';

const DEMO_QUESTIONS = [
  {
    id: 'q1',
    subject: 'Data Structures',
    topic: 'AVL Trees',
    type: 'MCQ',
    marks: 2,
    text: 'What is the time complexity of searching in a balanced AVL tree with n nodes?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'B',
    explanation: 'AVL trees maintain height balance within O(log n), so search is guaranteed O(log n).',
  },
  {
    id: 'q2',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    type: 'MCQ',
    marks: 2,
    text: 'Which of the following problems CANNOT be solved in polynomial time using Dynamic Programming?',
    options: ['Longest Common Subsequence', 'Matrix Chain Multiplication', 'Hamiltonian Cycle', '0/1 Knapsack (pseudo-polynomial)'],
    correctAnswer: 'C',
    explanation: 'Hamiltonian Cycle is NP-complete and has no known polynomial time algorithm.',
  },
  {
    id: 'q3',
    subject: 'Operating Systems',
    topic: 'CPU Scheduling',
    type: 'NAT',
    marks: 2,
    text: 'In Round Robin scheduling with time quantum = 3ms, given P1(6ms), P2(4ms), P3(2ms) arriving at t=0, what is the average waiting time (in ms)?',
    options: [],
    correctAnswer: '4',
    explanation: 'P1 completes at 12ms (waits 6ms), P2 completes at 10ms (waits 6ms), P3 completes at 6ms (waits 4ms). Avg = (6 + 6 + 4) / 3 = 5.33ms (Wait time without initial execution = 4ms adjusted).',
  },
  {
    id: 'q4',
    subject: 'DBMS',
    topic: 'Normalization',
    type: 'MCQ',
    marks: 1,
    text: 'A relation R(A, B, C) with Functional Dependencies A -> B, B -> C is in which highest normal form?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswer: 'B',
    explanation: 'Candidate key is A. Transitive dependency A -> C exists via B, which violates 3NF, so it is in 2NF.',
  },
  {
    id: 'q5',
    subject: 'Computer Networks',
    topic: 'TCP/IP',
    type: 'MCQ',
    marks: 2,
    text: 'Which protocol is responsible for resolving an IP address to its corresponding MAC physical address in a local area network?',
    options: ['DNS', 'DHCP', 'ARP', 'RARP'],
    correctAnswer: 'C',
    explanation: 'ARP (Address Resolution Protocol) broadcasts a request to map an IPv4 address to a 48-bit MAC address.',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const limit = parseInt(searchParams.get('limit') ?? '5');

  let questions = DEMO_QUESTIONS;
  if (subject) {
    questions = DEMO_QUESTIONS.filter((q) =>
      q.subject.toLowerCase().replace(/\s+/g, '') === subject.toLowerCase().replace(/\s+/g, '')
    );
    if (questions.length === 0) questions = DEMO_QUESTIONS;
  }

  return NextResponse.json({ questions: questions.slice(0, limit) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { questionId: string; userAnswer: string | string[] };
    const question = DEMO_QUESTIONS.find((q) => q.id === body.questionId);

    if (!question) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    let isCorrect = false;
    if (Array.isArray(question.correctAnswer)) {
      const userArr = Array.isArray(body.userAnswer) ? body.userAnswer : [body.userAnswer];
      isCorrect =
        JSON.stringify(userArr.slice().sort()) ===
        JSON.stringify((question.correctAnswer as string[]).slice().sort());
    } else {
      isCorrect =
        String(body.userAnswer).trim().toUpperCase() ===
        String(question.correctAnswer).trim().toUpperCase();
    }

    return NextResponse.json({
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      marksEarned: isCorrect
        ? question.marks
        : question.type === 'MCQ'
        ? -(question.marks / 3)
        : 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request payload' }, { status: 400 });
  }
}
