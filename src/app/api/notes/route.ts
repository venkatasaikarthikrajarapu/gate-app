import { NextResponse } from 'next/server';

const DEMO_NOTES = [
  {
    id: 'n1',
    subject: 'Data Structures',
    title: 'AVL Tree Self-Balancing Rotations',
    content: 'An AVL tree is a BST where the difference between heights of left and right subtrees (Balance Factor = hL - hR) cannot be more than 1 for all nodes.',
    keyPoints: [
      'LL Rotation: Right rotation at unbalanced node',
      'RR Rotation: Left rotation at unbalanced node',
      'LR Rotation: Left rotate left child, then right rotate unbalanced node',
      'RL Rotation: Right rotate right child, then left rotate unbalanced node',
    ],
    bookmarked: true,
  },
  {
    id: 'n2',
    subject: 'Computer Networks',
    title: 'TCP Connection States & Flow Control',
    content: 'TCP uses a 3-way handshake for connection establishment (SYN, SYN-ACK, ACK) and 4-way termination.',
    keyPoints: [
      'TIME_WAIT state lasts for 2 * MSL',
      'Effective Window Size = min(Congestion Window, Receiver Advertised Window)',
    ],
    bookmarked: false,
  },
];

const DEMO_FORMULAS = [
  {
    id: 'f1',
    subject: 'Computer Organization',
    name: 'Pipelining Speedup Ratio',
    formula: 'Speedup = (n * k) / (k + n - 1)',
    explanation: 'Where n = number of instructions and k = number of pipeline stages.',
    example: 'For k=5 stages and n=100 instructions: Speedup = 500 / 104 = 4.81x',
  },
  {
    id: 'f2',
    subject: 'Operating Systems',
    name: 'Effective Memory Access Time (EMAT)',
    formula: 'EMAT = h * (t_TLB + t_mem) + (1 - h) * (t_TLB + (k + 1) * t_mem)',
    explanation: 'Where h = TLB hit ratio, t_TLB = TLB access time, t_mem = main memory access time.',
    example: 'h=0.9, t_TLB=20ns, t_mem=100ns: EMAT = 130 ns',
  },
];

const DEMO_TRAPS = [
  {
    id: 't1',
    subject: 'Theory of Computation',
    trap: 'Assuming Closure Properties for Non-Deterministic Languages',
    misconception: 'Assuming that deterministic and non-deterministic versions always have identical closure properties.',
    correctApproach: 'DCFLs are CLOSED under complementation, but NOT closed under union or intersection.',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'notes';

  if (type === 'formulas') return NextResponse.json({ formulas: DEMO_FORMULAS });
  if (type === 'traps') return NextResponse.json({ traps: DEMO_TRAPS });
  return NextResponse.json({ notes: DEMO_NOTES });
}
