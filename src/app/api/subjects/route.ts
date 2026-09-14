import { NextResponse } from 'next/server';

interface SubjectItem {
  id: string;
  order: number;
  code: string;
  name: string;
  topics: number;
  progress: number;
  color: string;
  description: string;
  status: 'active' | 'upcoming' | 'completed';
}

const GATE_SUBJECTS: SubjectItem[] = [
  {
    id: 'pds',
    order: 1,
    code: 'PDS',
    name: 'Programming & Data Structures',
    topics: 16,
    progress: 0,
    color: 'emerald',
    description: 'C programming, pointers, recursion, arrays, linked lists, stacks, queues, trees, heaps, graphs.',
    status: 'active',
  },
  {
    id: 'algo',
    order: 2,
    code: 'Algo',
    name: 'Algorithms',
    topics: 18,
    progress: 0,
    color: 'emerald',
    description: 'Asymptotic analysis, divide & conquer, greedy, dynamic programming, graph algorithms, NP-completeness.',
    status: 'upcoming',
  },
  {
    id: 'dl',
    order: 3,
    code: 'DL',
    name: 'Digital Logic',
    topics: 12,
    progress: 0,
    color: 'emerald',
    description: 'Boolean algebra, K-maps, combinational circuits (adders, mux), sequential circuits (flip-flops, counters).',
    status: 'upcoming',
  },
  {
    id: 'coa',
    order: 4,
    code: 'COA',
    name: 'Computer Organization & Architecture',
    topics: 15,
    progress: 0,
    color: 'sky',
    description: 'Machine instructions, addressing modes, ALU, data-path, pipelining, memory hierarchy, cache, I/O.',
    status: 'upcoming',
  },
  {
    id: 'cn',
    order: 5,
    code: 'CN',
    name: 'Computer Networks',
    topics: 18,
    progress: 0,
    color: 'sky',
    description: 'OSI/TCP-IP models, packet switching, framing, flow/error control, routing, IP addressing, CIDR, transport protocols.',
    status: 'upcoming',
  },
  {
    id: 'os',
    order: 6,
    code: 'OS',
    name: 'Operating Systems',
    topics: 16,
    progress: 0,
    color: 'purple',
    description: 'Processes, threads, CPU scheduling, synchronization, semaphores, deadlocks, virtual memory, paging, file systems.',
    status: 'upcoming',
  },
  {
    id: 'dbms',
    order: 7,
    code: 'DBMS',
    name: 'Database Management Systems',
    topics: 15,
    progress: 0,
    color: 'red',
    description: 'ER-models, relational algebra, SQL, integrity constraints, normal forms, indexing, transactions, serializability.',
    status: 'upcoming',
  },
  {
    id: 'toc',
    order: 8,
    code: 'TOC',
    name: 'Theory of Computation',
    topics: 14,
    progress: 0,
    color: 'amber',
    description: 'Regular expressions, finite automata (DFA/NFA), context-free grammars, pushdown automata, Turing machines, undecidability.',
    status: 'upcoming',
  },
  {
    id: 'cd',
    order: 9,
    code: 'CD',
    name: 'Compiler Design',
    topics: 12,
    progress: 0,
    color: 'emerald',
    description: 'Lexical analysis, top-down & bottom-up parsing (LL, LR, LALR), syntax-directed translation, runtime environments, code optimization.',
    status: 'upcoming',
  },
  {
    id: 'maths',
    order: 10,
    code: 'Maths',
    name: 'Engineering & Discrete Mathematics',
    topics: 20,
    progress: 0,
    color: 'emerald',
    description: 'Propositional logic, sets, relations, functions, groups, combinatorics, graph theory, linear algebra, calculus, probability.',
    status: 'upcoming',
  },
  {
    id: 'apti',
    order: 11,
    code: 'Apti',
    name: 'General Aptitude',
    topics: 12,
    progress: 0,
    color: 'emerald',
    description: 'Verbal reasoning, reading comprehension, quantitative aptitude, data interpretation, spatial reasoning.',
    status: 'upcoming',
  },
];

export async function GET() {
  return NextResponse.json({ subjects: GATE_SUBJECTS });
}
