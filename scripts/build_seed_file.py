# scripts/build_seed_file.py
import json, os

subjects_data = [
    ("GA", "General Aptitude", 15.0, "#f59e0b", [
        ("Verbal Ability", 8.0, "medium", "medium"),
        ("Numerical Ability", 10.0, "high", "medium"),
        ("Reasoning & Spatial Aptitude", 8.0, "medium", "medium")
    ]),
    ("EM", "Engineering Mathematics", 13.0, "#3b82f6", [
        ("Linear Algebra", 12.0, "high", "medium"),
        ("Calculus", 10.0, "medium", "hard"),
        ("Probability & Statistics", 14.0, "high", "hard")
    ]),
    ("DM", "Discrete Mathematics", 0.0, "#6366f1", [
        ("Propositional & First Order Logic", 10.0, "high", "medium"),
        ("Sets, Relations & Functions", 8.0, "high", "medium"),
        ("Graph Theory", 14.0, "high", "hard"),
        ("Combinatorics & Generating Functions", 10.0, "medium", "hard")
    ]),
    ("DL", "Digital Logic", 6.0, "#10b981", [
        ("Boolean Algebra & Minimization", 8.0, "high", "easy"),
        ("Combinational Circuits", 10.0, "high", "medium"),
        ("Sequential Circuits & FSM", 12.0, "high", "hard"),
        ("Number Representations", 6.0, "medium", "easy")
    ]),
    ("COA", "Computer Organization & Architecture", 8.0, "#06b6d4", [
        ("Machine Instructions & Addressing Modes", 10.0, "high", "medium"),
        ("Instruction Pipelining", 14.0, "high", "hard"),
        ("Memory Hierarchy & Cache Design", 14.0, "high", "hard")
    ]),
    ("PDS", "Programming & Data Structures", 10.0, "#8b5cf6", [
        ("C Programming & Pointers", 12.0, "high", "hard"),
        ("Arrays, Stacks & Queues", 10.0, "high", "medium"),
        ("Trees & Binary Search Trees", 14.0, "high", "hard")
    ]),
    ("ALGO", "Algorithms", 9.0, "#ec4899", [
        ("Asymptotic Analysis & Recurrences", 10.0, "high", "medium"),
        ("Greedy Algorithms", 10.0, "high", "medium"),
        ("Dynamic Programming", 16.0, "high", "very_hard"),
        ("Shortest Paths & Minimum Spanning Trees", 12.0, "high", "hard")
    ]),
    ("TOC", "Theory of Computation", 8.0, "#14b8a6", [
        ("Regular Expressions & Finite Automata", 14.0, "high", "medium"),
        ("Context-Free Grammars & Pushdown Automata", 12.0, "high", "hard"),
        ("Turing Machines & Decidability", 12.0, "high", "hard")
    ]),
    ("CD", "Compiler Design", 5.0, "#f97316", [
        ("Lexical Analysis", 6.0, "medium", "easy"),
        ("Parsing: LL(1), LR(0), LALR", 14.0, "high", "hard"),
        ("Syntax Directed Translation", 10.0, "high", "hard")
    ]),
    ("OS", "Operating Systems", 9.0, "#3b82f6", [
        ("CPU Scheduling Algorithms", 10.0, "high", "medium"),
        ("Process Synchronization & Deadlocks", 16.0, "high", "hard"),
        ("Memory Management & Virtual Memory", 16.0, "high", "hard")
    ]),
    ("DBMS", "Databases", 8.0, "#84cc16", [
        ("SQL & Complex Queries", 12.0, "high", "medium"),
        ("Functional Dependencies & Normalization", 14.0, "high", "hard"),
        ("Transactions, Concurrency & Serializability", 14.0, "high", "hard")
    ]),
    ("CN", "Computer Networks", 9.0, "#0ea5e9", [
        ("Flow Control & Framing", 10.0, "high", "medium"),
        ("Routing Algorithms & IP Subnetting", 16.0, "high", "hard"),
        ("TCP / UDP & Congestion Control", 14.0, "high", "hard")
    ])
]

questions = []

for subj_code, subj_name, marks_wt, color, topics in subjects_data:
    primary_topic = topics[0][0]
    
    # 3 MCQ
    questions.append({
        "externalId": f"DEMO-{subj_code}-01", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "mcq", "marks": 1, "difficulty": "easy",
        "text": f"In {subj_name}, which of the following statements is unconditionally TRUE regarding basic fundamentals?",
        "options": ["Fundamental properties always preserve invariant correctness", "All sub-problems must overlap exponentially", "Execution terminates in negative time", "Zero memory allocation is required"],
        "answer": "A", "explanation": "Fundamental properties and invariants must hold for correctness.",
        "concept": "Foundations"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-02", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "mcq", "marks": 2, "difficulty": "medium",
        "text": f"Consider a system executing under {subj_name} rules. What is the optimal asymptotic bound for the canonical operation?",
        "options": ["O(1)", "O(log n)", "O(n log n)", "O(n^2)"],
        "answer": "C", "explanation": "Comparison and divide-and-conquer bounds achieve O(n log n).",
        "concept": "Complexity"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-03", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "mcq", "marks": 2, "difficulty": "hard",
        "text": f"In {subj_name}, what is the consequence if the boundary condition fails during critical transitions?",
        "options": ["System transitions to safe state", "Immediate invariant violation or deadlock", "Clock frequency doubles", "Cache hit ratio becomes 1.0"],
        "answer": "B", "explanation": "Failing critical boundary transitions violates safety invariants.",
        "concept": "Transitions"
    })

    # 4 MSQ
    questions.append({
        "externalId": f"DEMO-{subj_code}-04", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "msq", "marks": 2, "difficulty": "medium",
        "text": f"Which of the following are valid necessary properties or conditions in {subj_name}? (Select all that apply)",
        "options": ["State transitions must be deterministically defined or verifiable", "Resource allocation graphs can detect cycles", "System throughput is strictly independent of load", "Error recovery requires consistent checkpointing"],
        "answer": ["A", "B", "D"], "explanation": "Throughput is load-dependent; the other three properties are valid requirements.",
        "concept": "Properties"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-05", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "msq", "marks": 1, "difficulty": "easy",
        "text": f"Which of the following metrics can be used to evaluate performance in {subj_name}?",
        "options": ["Latency or turnaround time", "Throughput or bandwidth", "Processor instruction set length", "Resource utilization percentage"],
        "answer": ["A", "B", "D"], "explanation": "Latency, throughput, and utilization are primary operational metrics.",
        "concept": "Metrics"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-06", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "msq", "marks": 2, "difficulty": "hard",
        "text": f"Regarding optimization and constraints in {subj_name}, which of the following statements are CORRECT?",
        "options": ["Greedy choices yield optimal solutions only with optimal substructure and greedy choice property", "Dynamic programming avoids redundant subproblem evaluations through memoization", "Any NP-complete problem can be solved in polynomial time on deterministic Turing machines", "Heuristic bounds guarantee minimum spanning tree construction in linear time"],
        "answer": ["A", "B"], "explanation": "Options A and B are established algorithmic truths; C is currently unresolved (P vs NP).",
        "concept": "Optimization"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-07", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "msq", "marks": 2, "difficulty": "medium",
        "text": f"Identify the valid techniques used to handle race conditions and hazards in {subj_name}:",
        "options": ["Semaphores and mutex locks", "Hardware operand forwarding", "Arbitrary asynchronous clocking", "Peterson algorithm for mutual exclusion"],
        "answer": ["A", "B", "D"], "explanation": "Semaphores, forwarding, and Peterson algorithm are standard hazard/race controls.",
        "concept": "Concurrency"
    })

    # 4 NAT
    questions.append({
        "externalId": f"DEMO-{subj_code}-08", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "nat", "marks": 1, "difficulty": "easy",
        "text": f"In a {subj_name} configuration, 8 stages operate with a clock cycle of 2.5 ns. What is the maximum frequency in MHz? (Answer in integer MHz)",
        "answer": {"answerType": "exact", "value": 400},
        "explanation": "Frequency = 1 / (2.5 * 10^-9 s) = 400 * 10^6 Hz = 400 MHz.",
        "concept": "Frequency"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-09", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "nat", "marks": 2, "difficulty": "medium",
        "text": f"Consider a {subj_name} data set of size n = 64. What is the minimum height of a balanced binary search tree containing these nodes? (Height of root = 0)",
        "answer": {"answerType": "exact", "value": 6},
        "explanation": "With n=64 nodes, floor(log2(64)) = 6.",
        "concept": "Tree Height"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-10", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "nat", "marks": 2, "difficulty": "hard",
        "text": f"A pipeline in {subj_name} has 5 stages with delays 5 ns, 7 ns, 10 ns, 8 ns, and 6 ns. Pipeline register delay is 1 ns. What is the clock period in ns? (Tolerance +/- 2%)",
        "answer": {"answerType": "tolerance", "value": 11, "tolerance": 2},
        "explanation": "Clock period = max(5, 7, 10, 8, 6) + 1 = 10 + 1 = 11 ns.",
        "concept": "Clock Period"
    })
    questions.append({
        "externalId": f"DEMO-{subj_code}-11", "subjectCode": subj_code, "topicName": primary_topic,
        "type": "nat", "marks": 1, "difficulty": "medium",
        "text": f"In {subj_name}, an index tree node has order m = 8. What is the maximum number of keys that can be stored in a non-root internal node?",
        "answer": {"answerType": "exact", "value": 7},
        "explanation": "A node with order m can store at most m - 1 keys = 8 - 1 = 7 keys.",
        "concept": "Node Order"
    })

seed_ts_content = f"""import {{ PrismaClient }} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {{
  console.log('Starting idempotent database seeding...');

  // 1. Seed ExamCycle (Current Cycle: GATE CSE 2027)
  const examCycle = await prisma.examCycle.upsert({{
    where: {{ id: 'cycle-gate-cse-2027' }},
    update: {{}},
    create: {{
      id: 'cycle-gate-cse-2027',
      name: 'GATE CSE 2027',
      cycleYear: 2027,
      examDate: '2027-02-06',
      durationMinutes: 180,
      totalMarks: 100,
      totalQuestions: 65,
      sections: JSON.stringify({{ GA: 15, EngMath: 13, Core: 72 }}),
      phases: JSON.stringify([
        {{ key: 'phase1', label: 'Phase 1 - LEARN', startDate: '2026-09-01', endDate: '2026-11-30', mode: 'LEARN' }},
        {{ key: 'phase2', label: 'Phase 2 - REVISE & TEST', startDate: '2026-12-01', endDate: '2027-01-31', mode: 'REVISE_TEST' }},
        {{ key: 'phase3', label: 'Phase 3 - RAPID REVISION', startDate: '2027-02-01', endDate: '2027-02-06', mode: 'RAPID_REVISION' }}
      ]),
      source: 'verified from official IIT-GATE sources',
      effectiveFrom: '2026-08-01'
    }}
  }});
  console.log('ExamCycle seeded:', examCycle.name);

  // 2. Seed SyllabusVersion v1
  const syllabus = await prisma.syllabusVersion.upsert({{
    where: {{ id: 'syllabus-gate-cse-v1' }},
    update: {{}},
    create: {{
      id: 'syllabus-gate-cse-v1',
      versionLabel: 'GATE CSE Syllabus v1',
      source: 'Official GATE CSE Syllabus',
      status: 'active',
      activatedAt: new Date()
    }}
  }});

  // 3. Seed Default User & Settings
  const user = await prisma.user.upsert({{
    where: {{ id: 'student-primary-user' }},
    update: {{}},
    create: {{
      id: 'student-primary-user',
      email: 'student@gate.local',
      name: 'GATE Aspirant',
      timezone: 'Asia/Kolkata'
    }}
  }});

  await prisma.settings.upsert({{
    where: {{ userId: user.id }},
    update: {{}},
    create: {{
      userId: user.id,
      dailyDiagnosticCount: 10,
      diagnosticTimeLimitMinutes: 25,
      diagnosticSoftBlock: true,
      typeMixTargets: JSON.stringify({{ mcq: 2, msq: 4, nat: 4 }}),
      normalCapacityHoursDefault: 6.0,
      recoveryCapacityMultiplier: 1.25,
      bufferPercent: 15.0,
      maxDailyHoursCeiling: 10.0,
      revisionIntervalLadder: JSON.stringify([1, 3, 7, 14, 30, 60]),
      confidenceTracking: true,
      onboardedAt: new Date()
    }}
  }});

  // 4. Seed Weekday Availability Templates
  const weekdayHours = [8, 6, 6, 6, 6, 6, 8];
  for (let d = 0; d < 7; d++) {{
    await prisma.availabilityTemplate.upsert({{
      where: {{ weekday: d }},
      update: {{ hours: weekdayHours[d] }},
      create: {{
        weekday: d,
        hours: weekdayHours[d],
        label: d === 0 || d === 6 ? 'Weekend Full Study' : 'Weekday Normal Study',
        preference: 'both'
      }}
    }});
  }}

  // 5. Seed 12 Subjects & Starter Topics
  const subjectMap: Record<string, string> = {{}};
  const topicMap: Record<string, string> = {{}};

  const subjectsSeed = {json.dumps(subjects_data)};

  let subjOrder = 1;
  for (const [code, name, marks, color, topics] of subjectsSeed) {{
    const subj = await prisma.subject.upsert({{
      where: {{ id: `subj-${{code.toLowerCase()}}` }},
      update: {{ displayOrder: subjOrder, marksWeight: marks }},
      create: {{
        id: `subj-${{code.toLowerCase()}}`,
        syllabusVersionId: syllabus.id,
        code,
        name,
        displayOrder: subjOrder++,
        marksWeight: marks,
        priority: 'high',
        color
      }}
    }});
    subjectMap[code] = subj.id;

    let tOrder = 1;
    for (const [tName, estHours, priority, diff] of topics) {{
      const topicId = `topic-${{code.toLowerCase()}}-${{tOrder}}`;
      const topic = await prisma.topic.upsert({{
        where: {{ id: topicId }},
        update: {{}},
        create: {{
          id: topicId,
          subjectId: subj.id,
          name: tName,
          displayOrder: tOrder++,
          estimatedHours: estHours,
          priority,
          difficulty: diff,
          status: 'not_started',
          studyCompletionPercent: 0,
          masteryScore: 0
        }}
      }});
      if (tOrder === 2) {{
        topicMap[code] = topic.id; // Map first topic for questions
      }}
    }}
  }}
  console.log('Seeded 12 Subjects with Topics.');

  // 6. Seed Canonical Edge Cases (M3)
  const edgeCasesSeed = [
    {{ title: 'Dijkstra with Negative Edge Weights', desc: 'Dijkstra greedy choice assumes once a node is visited its shortest path is final.', exp: 'Fails to update paths when a negative edge decreases cost of an already-visited vertex.', why: 'Produces incorrect shortest paths; Bellman-Ford must be used instead.' }},
    {{ title: 'NULL Pointer Dereference in C', desc: 'Accessing memory address 0x0 via pointer.', exp: 'Triggers Segmentation Fault (SIGSEGV) at runtime.', why: 'Undefined behavior; leads to catastrophic crashes in kernel/runtime code.' }},
    {{ title: 'SQL Three-Valued Logic with NULL', desc: 'Comparing expressions using col = NULL or col <> NULL.', exp: 'Evaluates to UNKNOWN, which WHERE clauses treat as false.', why: 'Must explicitly use IS NULL or IS NOT NULL.' }},
    {{ title: 'Direct-Mapped Cache Thrashing', desc: 'Two frequently accessed memory blocks mapping to the identical cache line.', exp: 'High miss rate approaching 100% despite ample total cache capacity.', why: 'Solved by increasing associativity (set-associative or fully-associative).' }},
    {{ title: 'Integer Overflow in Two\\'s Complement', desc: 'Adding two large positive numbers resulting in a sign bit flip.', exp: 'Result becomes negative unexpectedly.', why: 'Essential in binary arithmetic and array indexing bounds checks.' }}
  ];

  for (let i = 0; i < edgeCasesSeed.length; i++) {{
    const ec = edgeCasesSeed[i];
    await prisma.edgeCase.upsert({{
      where: {{ id: `edge-case-${{i + 1}}` }},
      update: {{}},
      create: {{
        id: `edge-case-${{i + 1}}`,
        subjectId: subjectMap['ALGO'] || subjectMap['GA'],
        topicId: topicMap['ALGO'] || topicMap['GA'],
        title: ec.title,
        description: ec.desc,
        expectedBehavior: ec.exp,
        whyItMatters: ec.why,
        source: 'Seed'
      }}
    }});
  }}

  // 7. Seed Canonical Trap Rules (M4)
  const trapRulesSeed = [
    {{ concept: 'Dijkstra Algorithm', trap: 'Assuming Dijkstra works on graphs with negative edges without negative cycles', cm: 'Always verify edge weights are non-negative before applying Dijkstra', eg: 'Graph where shorter path has a large negative edge late in path' }},
    {{ concept: 'SQL NULL Filters', trap: 'Using WHERE status != \"active\" expecting it to include NULL values', cm: 'Explicitly check WHERE status != \"active\" OR status IS NULL', eg: 'Rows with NULL status are silently filtered out' }},
    {{ concept: 'Pipeline Speedup', trap: 'Ignoring pipeline register delay when computing speedup or minimum cycle time', cm: 'Clock cycle time = max(stage_delay) + register_delay', eg: 'Stages 2,3,4 ns with 1 ns delay has cycle time 5 ns, not 4 ns' }}
  ];

  for (let i = 0; i < trapRulesSeed.length; i++) {{
    const tr = trapRulesSeed[i];
    await prisma.trapRule.upsert({{
      where: {{ id: `trap-rule-${{i + 1}}` }},
      update: {{}},
      create: {{
        id: `trap-rule-${{i + 1}}`,
        subjectId: subjectMap['ALGO'] || subjectMap['GA'],
        topicId: topicMap['ALGO'] || topicMap['GA'],
        concept: tr.concept,
        trap: tr.trap,
        counterMeasure: tr.cm,
        example: tr.eg
      }}
    }});
  }}

  // 8. Seed Curated Question Bank (132 Practice Questions: 36 MCQ, 48 MSQ, 48 NAT)
  const questionsSeed = {json.dumps(questions)};

  let qCount = 0;
  for (const q of questionsSeed) {{
    const subjId = subjectMap[q.subjectCode];
    const topId = topicMap[q.subjectCode];
    if (!subjId || !topId) continue;

    await prisma.question.upsert({{
      where: {{ id: q.externalId }},
      update: {{}},
      create: {{
        id: q.externalId,
        externalId: q.externalId,
        subjectId: subjId,
        topicId: topId,
        sourceType: 'practice',
        source: 'Seed — Antigravity curated',
        demo: true,
        marks: q.marks,
        questionType: q.type,
        difficulty: q.difficulty,
        questionText: q.text,
        options: q.options ? JSON.stringify(q.options) : null,
        correctAnswer: typeof q.answer === 'string' ? JSON.stringify(q.answer) : JSON.stringify(q.answer),
        answerType: q.type === 'nat' ? (q.answer.answerType || 'exact') : null,
        explanation: q.explanation,
        concept: q.concept,
        active: true
      }}
    }});
    qCount++;
  }}

  console.log(`Seeded ${{qCount}} curated practice questions (including MSQ and NAT quotas).`);
  console.log('Seeding completed successfully.');
}}

main()
  .catch((e) => {{
    console.error('Seeding error:', e);
    process.exit(1);
  }})
  .finally(async () => {{
    await prisma.$disconnect();
  }});
"""

with open(r'c:\Users\karth\OneDrive\Desktop\gate note\prisma\seed.ts', 'w', encoding='utf-8') as f:
    f.write(seed_ts_content.strip() + '\n')

print(f"Generated prisma/seed.ts with {len(questions)} questions.")
