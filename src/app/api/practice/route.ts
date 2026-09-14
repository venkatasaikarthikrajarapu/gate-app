import { NextResponse } from 'next/server';

interface PracticeQuestion {
  id: string;
  subjectCode: string;
  subjectOrder: number;
  subject: string;
  topic: string;
  type: 'MCQ' | 'MSQ' | 'NAT';
  marks: number;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

const ROADMAP_QUESTIONS: PracticeQuestion[] = [
  // 1. PDS (Programming & Data Structures)
  {
    id: 'pds-1',
    subjectCode: 'PDS',
    subjectOrder: 1,
    subject: '#1 PDS (Programming & DS)',
    topic: 'Pointers & Arrays',
    type: 'MCQ',
    marks: 1,
    text: 'What will be the output of the following C code snippet?\n\nint arr[] = {10, 20, 30, 40, 50};\nint *ptr = arr;\nprintf("%d", *(ptr + 3) - *(ptr + 1));',
    options: ['10', '20', '30', '40'],
    correctAnswer: 'B',
    explanation: '*(ptr + 3) accesses arr[3] = 40. *(ptr + 1) accesses arr[1] = 20. 40 - 20 = 20.',
  },
  {
    id: 'pds-2',
    subjectCode: 'PDS',
    subjectOrder: 1,
    subject: '#1 PDS (Programming & DS)',
    topic: 'Binary Search Trees & AVL',
    type: 'NAT',
    marks: 2,
    text: 'What is the maximum number of nodes in a strictly binary tree with 12 leaves?',
    options: [],
    correctAnswer: '23',
    explanation: 'In a strictly binary tree, total nodes N = 2L - 1 where L is the number of leaf nodes. N = 2(12) - 1 = 23.',
  },

  // 2. Algo (Algorithms)
  {
    id: 'algo-1',
    subjectCode: 'Algo',
    subjectOrder: 2,
    subject: '#2 Algo (Algorithms)',
    topic: 'Asymptotic Analysis & Recurrences',
    type: 'MCQ',
    marks: 2,
    text: 'What is the solution of the recurrence relation T(n) = 2T(n/2) + n*log(n) using Master Theorem / Recursion Tree?',
    options: ['Θ(n log n)', 'Θ(n log² n)', 'Θ(n²)', 'Θ(n)'],
    correctAnswer: 'B',
    explanation: 'Here a=2, b=2, so n^(log_b a) = n^1. Since f(n) = n*log(n) = Θ(n^(log_b a) * log^k n) with k=1, by Extended Case 2 of Master Theorem, T(n) = Θ(n * log^(k+1) n) = Θ(n log² n).',
  },

  // 3. DL (Digital Logic)
  {
    id: 'dl-1',
    subjectCode: 'DL',
    subjectOrder: 3,
    subject: '#3 DL (Digital Logic)',
    topic: 'Combinational Circuits',
    type: 'NAT',
    marks: 1,
    text: 'How many 2-to-1 Multiplexers are required to construct an 8-to-1 Multiplexer?',
    options: [],
    correctAnswer: '7',
    explanation: 'To build 2^k to 1 MUX using 2 to 1 MUX, we need 2^k - 1 units. For 8-to-1: Stage 1 takes 4, Stage 2 takes 2, Stage 3 takes 1. Total = 4 + 2 + 1 = 7.',
  },

  // 4. COA (Computer Organization & Architecture)
  {
    id: 'coa-1',
    subjectCode: 'COA',
    subjectOrder: 4,
    subject: '#4 COA (Computer Organization)',
    topic: 'Pipelining Hazards',
    type: 'NAT',
    marks: 2,
    text: 'A 5-stage pipeline has stage delays of 150ps, 120ps, 160ps, 140ps, and 110ps. The latch delay is 10ps. What is the clock cycle time in ps?',
    options: [],
    correctAnswer: '170',
    explanation: 'Clock period in a synchronous pipeline = max(stage delays) + latch delay = max(150, 120, 160, 140, 110) + 10 = 160 + 10 = 170 ps.',
  },

  // 5. CN (Computer Networks)
  {
    id: 'cn-1',
    subjectCode: 'CN',
    subjectOrder: 5,
    subject: '#5 CN (Computer Networks)',
    topic: 'CIDR & Subnetting',
    type: 'MCQ',
    marks: 2,
    text: 'An ISP has been assigned the block 200.10.0.0/16. The ISP wants to create 64 equal-sized subnets. What is the subnet mask for each subnet?',
    options: ['255.255.192.0', '255.255.252.0', '255.255.255.0', '255.255.254.0'],
    correctAnswer: 'B',
    explanation: 'To make 64 = 2^6 subnets, we borrow 6 bits from host field. New prefix = 16 + 6 = 22 bits. Third byte has 6 ones: 11111100 in binary = 252. Mask is 255.255.252.0.',
  },

  // 6. OS (Operating Systems)
  {
    id: 'os-1',
    subjectCode: 'OS',
    subjectOrder: 6,
    subject: '#6 OS (Operating Systems)',
    topic: 'Virtual Memory & Page Replacement',
    type: 'MCQ',
    marks: 2,
    text: 'Which page replacement algorithm suffers from Belady’s Anomaly (where increasing the number of page frames may increase the number of page faults)?',
    options: ['Optimal Replacement', 'LRU (Least Recently Used)', 'FIFO (First In First Out)', 'Clock Policy'],
    correctAnswer: 'C',
    explanation: 'FIFO does not satisfy the stack property, meaning the set of pages in memory of size n is not always a subset of memory of size n+1. Hence FIFO suffers from Belady’s anomaly.',
  },

  // 7. DBMS (Database Management Systems)
  {
    id: 'dbms-1',
    subjectCode: 'DBMS',
    subjectOrder: 7,
    subject: '#7 DBMS (Database Management)',
    topic: 'Serializability & Concurrency',
    type: 'MSQ',
    marks: 2,
    text: 'Which of the following statements regarding transaction schedules are TRUE? (Select all that apply)',
    options: [
      'Every conflict-serializable schedule is view-serializable',
      'Every view-serializable schedule is conflict-serializable',
      'Strict 2PL prevents cascading rollbacks and guarantees serializability',
      'Testing conflict serializability is NP-complete',
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Conflict serializability is a strict subset of View serializability (A is true, B is false). Strict 2PL guarantees recoverability and avoids cascading aborts (C is true). Conflict serializability uses topological sort on precedence graph in O(V+E) polynomial time (D is false).',
  },

  // 8. TOC (Theory of Computation)
  {
    id: 'toc-1',
    subjectCode: 'TOC',
    subjectOrder: 8,
    subject: '#8 TOC (Theory of Computation)',
    topic: 'Chomsky Hierarchy & Closure',
    type: 'MCQ',
    marks: 1,
    text: 'Which of the following languages is NOT Context-Free?',
    options: [
      'L = { aⁿ bⁿ | n ≥ 0 }',
      'L = { w wᴿ | w ∈ {a,b}* }',
      'L = { aⁿ bⁿ cⁿ | n ≥ 0 }',
      'L = { aⁿ bᵐ | n, m ≥ 0 }',
    ],
    correctAnswer: 'C',
    explanation: 'L = { aⁿ bⁿ cⁿ | n ≥ 0 } requires coordinating three counts simultaneously, which exceeds single-stack pushdown automata. It is a Context-Sensitive Language, not Context-Free.',
  },

  // 9. CD (Compiler Design)
  {
    id: 'cd-1',
    subjectCode: 'CD',
    subjectOrder: 9,
    subject: '#9 CD (Compiler Design)',
    topic: 'Syntax Analysis & Parsers',
    type: 'MCQ',
    marks: 2,
    text: 'Which of the following bottom-up parsing techniques has the greatest expressive language power?',
    options: ['LR(0)', 'SLR(1)', 'LALR(1)', 'CLR(1) / Canonical LR(1)'],
    correctAnswer: 'D',
    explanation: 'The power hierarchy of bottom-up parsers is: LR(0) < SLR(1) < LALR(1) < CLR(1). CLR(1) retains distinct lookahead states and parses all LR(1) grammars.',
  },

  // 10. Maths (Engineering & Discrete Math)
  {
    id: 'maths-1',
    subjectCode: 'Maths',
    subjectOrder: 10,
    subject: '#10 Maths (Engineering Mathematics)',
    topic: 'Linear Algebra & Eigenvalues',
    type: 'NAT',
    marks: 2,
    text: 'If matrix A has eigenvalues 2, 3, and 5, what is the determinant of matrix A²',
    options: [],
    correctAnswer: '900',
    explanation: 'Determinant of A is product of eigenvalues: det(A) = 2 * 3 * 5 = 30. det(A²) = (det(A))² = 30² = 900.',
  },

  // 11. Apti (General Aptitude)
  {
    id: 'apti-1',
    subjectCode: 'Apti',
    subjectOrder: 11,
    subject: '#11 Apti (General Aptitude)',
    topic: 'Quantitative Aptitude',
    type: 'MCQ',
    marks: 1,
    text: 'A train 150 meters long passes a telegraph post in 12 seconds. What is the speed of the train in km/hr?',
    options: ['40 km/hr', '45 km/hr', '50 km/hr', '54 km/hr'],
    correctAnswer: 'B',
    explanation: 'Speed = Distance / Time = 150 / 12 = 12.5 m/s. Convert to km/hr: 12.5 * (18 / 5) = 45 km/hr.',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject') || searchParams.get('subjectId');
  const limit = parseInt(searchParams.get('limit') ?? '10');

  let questions = ROADMAP_QUESTIONS;
  if (subject && subject !== 'All') {
    const cleanSubj = subject.toLowerCase().replace(/[^a-z0-9]/g, '');
    questions = ROADMAP_QUESTIONS.filter((q) => {
      const qCode = q.subjectCode.toLowerCase();
      const qSubj = q.subject.toLowerCase().replace(/[^a-z0-9]/g, '');
      return qCode === cleanSubj || qSubj.includes(cleanSubj) || cleanSubj.includes(qCode);
    });
    if (questions.length === 0) questions = ROADMAP_QUESTIONS;
  }

  return NextResponse.json({ questions: questions.slice(0, limit) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as { questionId: string; userAnswer: string | string[] };
    const question = ROADMAP_QUESTIONS.find((q) => q.id === body.questionId);

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
