export interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  keyPoints: string[];
  bookmarked: boolean;
}

export interface Formula {
  id: string;
  subject: string;
  name: string;
  formula: string;
  explanation: string;
  example: string;
}

export interface Trap {
  id: string;
  subject: string;
  trap: string;
  misconception: string;
  correctApproach: string;
}

export const DEMO_NOTES: Note[] = [
  {
    id: 'n1',
    subject: '#1 PDS',
    title: 'C Pointers, Recursion & Binary Tree Traversals',
    content: 'Mastering pointer arithmetic, recursion tree call stacks, and properties of binary trees (strict, complete, full, and AVL trees).',
    keyPoints: [
      'Pointer arithmetic: ptr + i increments by sizeof(*ptr) * i bytes.',
      'In a binary tree with n nodes, number of null pointers = n + 1.',
      'For any non-empty binary tree: n0 = n2 + 1 (leaves = nodes of degree 2 + 1).',
      'Given Inorder + Preorder OR Inorder + Postorder, a unique binary tree can be constructed. (Pre + Post alone does NOT give a unique binary tree).',
      'AVL Tree: Balance Factor |h_left - h_right| <= 1. Minimum nodes in AVL of height h: N(h) = N(h-1) + N(h-2) + 1 (where N(0)=1, N(1)=2).',
    ],
    bookmarked: true,
  },
  {
    id: 'n2',
    subject: '#2 Algo',
    title: 'Asymptotic Analysis, Master Theorem & Graph Shortest Paths',
    content: 'Master theorem cases, dynamic programming recurrence relations, and greedy vs DP graph algorithms.',
    keyPoints: [
      'Master Theorem: T(n) = aT(n/b) + f(n). Compare f(n) with n^(log_b a). Case 1: polynomial smaller -> Theta(n^(log_b a)). Case 2: equal -> Theta(n^(log_b a) * log n). Case 3: polynomial larger and regularity holds -> Theta(f(n)).',
      'Dijkstra: Single-source shortest path for non-negative weights using min-heap in O((V+E) log V). Fails for negative edge weights.',
      'Bellman-Ford: Handles negative weights and detects negative cycles in O(V * E).',
      'Floyd-Warshall: All-pairs shortest path in O(V^3) using Dynamic Programming.',
      'Prim vs Kruskal: Prim uses priority queue in O(E log V) (dense graphs), Kruskal uses Disjoint Set Union in O(E log E) (sparse graphs).',
    ],
    bookmarked: true,
  },
  {
    id: 'n3',
    subject: '#3 DL',
    title: 'Boolean Minimization, Multiplexers & Flip-Flops',
    content: 'Canonical SOP/POS forms, K-map grouping rules, universal gates, multiplexer implementations, and sequential flip-flop conversions.',
    keyPoints: [
      'NAND & NOR are universal gates. Minimal NAND gates for: NOT=1, AND=2, OR=3, XOR=4, XNOR=5.',
      'Multiplexer as universal logic generator: 2^n to 1 MUX can implement any boolean function of n+1 variables without extra gates.',
      'Flip-Flop Characteristic equations: JK: Q+ = J Q\' + K\' Q; D: Q+ = D; T: Q+ = T XOR Q.',
      'Mod-N ripple counter uses ceil(log2 N) flip-flops with frequency division f_out = f_in / N.',
    ],
    bookmarked: false,
  },
  {
    id: 'n4',
    subject: '#4 COA',
    title: 'Pipelining Hazards, Cache Mapping & Effective Memory Time',
    content: 'Pipeline throughput and speedup, structural/data/control hazards, Direct/Associative cache mapping, and hierarchical memory access.',
    keyPoints: [
      'Pipeline Speedup S = (n * k) / (k + n - 1 + stalls) where k = stages, n = instructions. Maximum ideal speedup = k.',
      'RAW hazard (Read After Write) is true data dependency. Forwarding/Bypassing eliminates stalls between EX and EX/MEM.',
      'Cache Tag Bits: Main Memory address bits = Tag + Set Index (log2 sets) + Block Offset (log2 block size).',
      'Simultaneous access EMAT = h * t_cache + (1 - h) * t_mem. Hierarchical access EMAT = t_cache + (1 - h) * t_mem.',
    ],
    bookmarked: true,
  },
  {
    id: 'n5',
    subject: '#5 CN',
    title: 'TCP Flow & Congestion Control, CIDR & Stop-and-Wait',
    content: 'Sliding window protocols, maximum window size, CIDR subnetting calculations, TCP slow start, and congestion avoidance.',
    keyPoints: [
      'Stop-and-Wait efficiency = 1 / (1 + 2a) where a = Propagation Delay (Tp) / Transmission Delay (Tt).',
      'Go-Back-N Window Size: Sender = N, Receiver = 1. Sequence numbers needed >= N + 1.',
      'Selective Repeat Window Size: Sender = 2^(k-1), Receiver = 2^(k-1). Sequence numbers needed >= 2 * W_sender.',
      'CIDR Host Formula: Usable IP addresses = 2^(32 - prefix) - 2 (subtract network ID and broadcast address).',
      'TCP Congestion: Slow start doubles cwnd every RTT. After threshold (ssthresh), congestion avoidance increases cwnd linearly (+1 MSS/RTT). On timeout: ssthresh = cwnd/2, cwnd = 1 MSS.',
    ],
    bookmarked: false,
  },
  {
    id: 'n6',
    subject: '#6 OS',
    title: 'CPU Scheduling, Semaphores & Paging Memory Management',
    content: 'Process synchronization, Peterson algorithm, counting/binary semaphores, deadlock avoidance, and multi-level page tables.',
    keyPoints: [
      'Counting Semaphore value S: Wait(S) decrements S. If S < 0, process is blocked. Signal(S) increments S. Positive S = free units; negative |S| = blocked processes.',
      'Deadlock: 4 necessary conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait). Banker Algorithm safe sequence check: Need = Max - Allocation <= Available.',
      'Page Table Size = Number of Pages * Page Table Entry (PTE) size = (Virtual Address Space / Page Size) * PTE.',
      'Belady Anomaly occurs in FIFO page replacement where increasing frame allocation increases page faults.',
    ],
    bookmarked: true,
  },
  {
    id: 'n7',
    subject: '#7 DBMS',
    title: 'Normalization (1NF-BCNF), Relational Algebra & Conflict Serializability',
    content: 'Closure of functional dependencies, minimal cover, lossless join vs dependency preserving decomposition, and 2-Phase Locking (2PL).',
    keyPoints: [
      '2NF: No partial dependency (proper subset of candidate key -> non-prime attribute).',
      '3NF: For every X -> A, either X is a superkey OR A is a prime attribute.',
      'BCNF: For every non-trivial X -> A, X MUST be a superkey.',
      'Conflict Serializability: Construct Precedence Graph where edge Ti -> Tj exists if Ti performs conflicting op before Tj. Schedule is conflict serializable iff graph has NO cycles.',
      'Strict 2PL prevents cascading rollbacks by holding exclusive locks until transaction commit/abort.',
    ],
    bookmarked: false,
  },
  {
    id: 'n8',
    subject: '#8 TOC',
    title: 'Finite Automata, Closure Properties & Decidability Hierarchy',
    content: 'DFA minimization (Myhill-Nerode), Regular/CFL/CSL/REC/RE language classes, and halting problem decidability table.',
    keyPoints: [
      'DFA and NFA have equal expressive power. Converting NFA (n states) to minimal DFA may require up to 2^n states.',
      'Regular languages are CLOSED under Union, Intersection, Complement, Concatenation, Kleene star, and Reversal.',
      'CFLs are NOT closed under Intersection or Complementation (but closed under union, concat, kleene star). DCFLs ARE closed under complementation.',
      'Emptiness problem is Decidable for Regular and CFL, but Undecidable for CSL and Turing Machines.',
      'Rice Theorem Part 1: Any non-trivial semantic property of RE languages (Turing machines) is Undecidable.',
    ],
    bookmarked: true,
  },
  {
    id: 'n9',
    subject: '#9 CD',
    title: 'Lexical Analysis, LL(1)/LR Parsers & Syntax-Directed Translation',
    content: 'FIRST and FOLLOW computation, LL(1) parse table conflicts, LR(0)/SLR(1)/LALR(1)/CLR(1) state comparisons, and SDT attribute types.',
    keyPoints: [
      'LL(1) Grammar Condition: For A -> alpha | beta, FIRST(alpha) INTERSECT FIRST(beta) = empty, and if epsilon in FIRST(alpha), then FIRST(beta) INTERSECT FOLLOW(A) = empty.',
      'Parser Power: LR(0) < SLR(1) < LALR(1) < CLR(1) < LL(1) / Non-LR.',
      'LALR(1) merges LR(1) states with identical LR(0) cores. LALR(1) can NEVER introduce Shift-Reduce conflicts, but CAN introduce Reduce-Reduce conflicts.',
      'S-attributed definitions use ONLY synthesized attributes (evaluated bottom-up during LR parsing). L-attributed allows synthesized + inherited from left siblings/parent.',
    ],
    bookmarked: false,
  },
  {
    id: 'n10',
    subject: '#10 Maths',
    title: 'Linear Algebra, Probability, Calculus & Graph Combinatorics',
    content: 'Eigenvalues and Eigenvectors, Bayes theorem, conditional expectation, binomial/poisson distributions, and graph Euler/Hamiltonian properties.',
    keyPoints: [
      'Matrix Properties: Sum of eigenvalues = Trace of matrix. Product of eigenvalues = Determinant of matrix. Eigenvalues of triangular matrix = diagonal elements.',
      'Bayes Theorem: P(A|B) = [P(B|A) * P(A)] / P(B).',
      'Poisson Distribution: P(X=k) = (lambda^k * e^(-lambda)) / k!. Mean = Variance = lambda.',
      'Graph Theory: A connected planar graph with V vertices, E edges, R regions satisfies Euler Formula: V - E + R = 2. Maximum edges in planar graph: E <= 3V - 6 (for V >= 3).',
      'Handshaking Lemma: Sum of degrees of all vertices = 2 * E. Number of odd degree vertices is always EVEN.',
    ],
    bookmarked: true,
  },
  {
    id: 'n11',
    subject: '#11 Apti',
    title: 'Quantitative Shortcuts, Logical Syllogisms & Spatial Reasoning',
    content: 'Speed-Time-Distance, Work-Rate formulas, Permutation/Combination tricks, Venn diagrams, and spatial transformations.',
    keyPoints: [
      'Work & Time: If A does work in X days, B in Y days, together they complete in (X*Y)/(X+Y) days.',
      'Relative Speed: When moving in opposite directions, relative speed = S1 + S2. Same direction = |S1 - S2|.',
      'Percentage change: If a value increases by x% and then decreases by x%, net decrease = (x^2 / 100)%.',
      'Syllogism Rules: "All A are B" + "All B are C" => "All A are C". Two negative premises yield NO valid definite conclusion.',
    ],
    bookmarked: false,
  },
];

export const DEMO_FORMULAS: Formula[] = [
  {
    id: 'f1',
    subject: '#1 PDS',
    name: 'AVL Tree Minimum Nodes Recurrence',
    formula: 'N(h) = N(h-1) + N(h-2) + 1',
    explanation: 'Calculates the minimum number of nodes required to construct an AVL tree of height h (where N(0)=1, N(1)=2). Maximum height for n nodes is h <= 1.44 * log2(n).',
    example: 'For height h=4: N(4) = N(3) + N(2) + 1 = 7 + 4 + 1 = 12 nodes minimum.',
  },
  {
    id: 'f2',
    subject: '#2 Algo',
    name: "Master Theorem for Divide & Conquer",
    formula: 'T(n) = a*T(n/b) + Theta(n^k * log^p n)',
    explanation: 'If log_b(a) > k => T(n) = Theta(n^(log_b a)). If log_b(a) == k: if p > -1 => Theta(n^k * log^(p+1) n). If log_b(a) < k: if p >= 0 => Theta(n^k * log^p n).',
    example: 'Merge Sort: T(n) = 2T(n/2) + Theta(n) => a=2, b=2, k=1, p=0. log_2(2) = 1 == k => T(n) = Theta(n log n).',
  },
  {
    id: 'f3',
    subject: '#3 DL',
    name: 'Dual & Self-Dual Boolean Function Cardinality',
    formula: 'Self-Dual Functions = 2^(2^(n-1))',
    explanation: 'Dual is obtained by swapping AND <-> OR and 0 <-> 1 (leaving variables uncomplemented). A function with n variables can form 2^(2^(n-1)) self-dual functions.',
    example: 'For n=3 variables: Total boolean functions = 2^(2^3) = 256. Number of self-dual functions = 2^(2^2) = 2^4 = 16.',
  },
  {
    id: 'f4',
    subject: '#4 COA',
    name: 'Pipeline Speedup with Hazard Stalls',
    formula: 'Speedup = (n * k) / (k + n - 1 + Stalls)',
    explanation: 'Where n = number of instructions, k = number of stages. Ideal Speedup as n -> infinity is k. CPI_pipeline = 1 + (Stalls / n).',
    example: 'k=5 stages, n=1000 instructions, 200 hazard stalls: Speedup = (1000 * 5) / (5 + 999 + 200) = 5000 / 1204 = 4.15x.',
  },
  {
    id: 'f5',
    subject: '#5 CN',
    name: 'Sliding Window Maximum Throughput',
    formula: 'Throughput = (W * Frame_Size) / (Tt + 2*Tp) <= Bandwidth',
    explanation: 'Where W = window size, Tt = transmission delay (L/B), Tp = propagation delay (d/v). For 100% link utilization, W >= 1 + 2*a where a = Tp / Tt.',
    example: 'Tt = 1ms, Tp = 49.5ms => a = 49.5. For 100% utilization: Window size W >= 1 + 2*(49.5) = 100 frames.',
  },
  {
    id: 'f6',
    subject: '#6 OS',
    name: 'Multi-Level Paging Effective Memory Access Time (EMAT)',
    formula: 'EMAT = h * (t_TLB + t_mem) + (1 - h) * (t_TLB + (k + 1) * t_mem)',
    explanation: 'Where h = TLB hit ratio, t_TLB = TLB lookup time, t_mem = main memory latency, k = number of paging levels.',
    example: 'h=0.9, t_TLB=10ns, t_mem=80ns, 2-level paging (k=2): EMAT = 0.9*(10+80) + 0.1*(10 + 3*80) = 0.9*(90) + 0.1*(250) = 81 + 25 = 106 ns.',
  },
  {
    id: 'f7',
    subject: '#7 DBMS',
    name: 'B+ Tree Order & Maximum Key/Pointer Capacity',
    formula: 'Node Order p: p * P_block + (p - 1) * Key_Size <= Block_Size',
    explanation: 'In B+ tree of order p, an internal node contains at most p block pointers and (p - 1) search keys. Leaf node: p_leaf * (Key + Record_Pointer) + P_block <= Block_Size.',
    example: 'Block Size = 512B, Key = 8B, Pointer = 6B: p*6 + (p-1)*8 <= 512 => 14p - 8 <= 512 => 14p <= 520 => p = 37 (Order of internal node).',
  },
  {
    id: 'f8',
    subject: '#8 TOC',
    name: 'Pumping Lemma for Regular Languages',
    formula: 's = xyz where |xy| <= p, |y| >= 1, and x * (y^i) * z in L for all i >= 0',
    explanation: 'If L is regular, any string s with length |s| >= p (pumping length) can be split such that pumping y any number of times maintains language membership.',
    example: 'L = {0^n 1^n | n >= 0}. Let s = 0^p 1^p. Since |xy| <= p, y contains only 0s. Pumping i=2 produces 0^(p+|y|) 1^p not in L => L is NOT regular.',
  },
  {
    id: 'f9',
    subject: '#9 CD',
    name: 'LR Parser State Count Comparison',
    formula: 'States: LR(0) == SLR(1) == LALR(1) <= CLR(1)',
    explanation: 'LR(0), SLR(1), and LALR(1) parsing tables have the exact same number of states. CLR(1) has more states because it differentiates states by LR(1) lookaheads.',
    example: 'Grammar with 12 LR(0) states will have 12 SLR(1) states, 12 LALR(1) states, and typically 18-24 CLR(1) states.',
  },
  {
    id: 'f10',
    subject: '#10 Maths',
    name: 'Planar Graph Euler Formula & Edge Bounds',
    formula: 'V - E + R = 2  and  E <= 3*V - 6 (for V >= 3)',
    explanation: 'For any connected planar simple graph with V vertices, E edges, and R regions (including outer face). If graph is bipartite/triangle-free, E <= 2*V - 4.',
    example: 'K5 (Complete graph on 5 vertices): V=5, E=10. Maximum planar edges = 3(5) - 6 = 9. Since E=10 > 9, K5 is strictly NON-planar.',
  },
  {
    id: 'f11',
    subject: '#11 Apti',
    name: 'Relative Speed & Train Crossing Time',
    formula: 'Time = (Length1 + Length2) / (Speed1 +- Speed2)',
    explanation: 'Opposite direction: add speeds (+). Same direction: subtract speeds (-). Convert km/h to m/s by multiplying by (5/18).',
    example: 'Train 150m at 54 km/h (15 m/s) crosses train 100m at 36 km/h (10 m/s) in opposite direction: Time = (150 + 100) / (15 + 10) = 250 / 25 = 10 seconds.',
  },
];

export const DEMO_TRAPS: Trap[] = [
  {
    id: 't1',
    subject: '#1 PDS',
    trap: 'Pointer Increments vs Dereference Precedence in C',
    misconception: 'Assuming *ptr++ increments the value pointed to by ptr.',
    correctApproach: 'Postfix ++ has higher precedence than unary *. Hence, *ptr++ dereferences the original pointer address first, then increments the pointer address itself! To increment the value, write (*ptr)++.',
  },
  {
    id: 't2',
    subject: '#2 Algo',
    trap: 'Applying Master Theorem when a < 1 or b <= 1 or non-polynomial difference',
    misconception: 'Attempting Master theorem on T(n) = 2T(n/2) + n/log n or T(n) = 2^n T(n/2).',
    correctApproach: 'Master theorem strictly requires a >= 1, b > 1, and polynomial difference n^epsilon. For T(n) = 2T(n/2) + n/log n, difference is logarithmic; use substitution or extended Master Theorem case 2 (p = -1 => Theta(n log log n)).',
  },
  {
    id: 't3',
    subject: '#3 DL',
    trap: 'Race Around Condition in JK Flip-Flop',
    misconception: 'Believing race-around condition occurs when clock pulse width is very small.',
    correctApproach: 'Race around condition occurs in level-triggered JK flip-flops when J=1, K=1 AND clock pulse width t_p > propagation delay of flip-flop t_pd. Solved by using edge triggering or Master-Slave JK flip-flop.',
  },
  {
    id: 't4',
    subject: '#4 COA',
    trap: 'Branch Penalty Calculation with Target Address Computation',
    misconception: 'Assuming branch penalty is always fixed to 1 clock cycle stall.',
    correctApproach: 'Branch penalty depends on which stage the branch outcome and target address are resolved. If target is determined in Decode (ID), penalty = 1 stall. If determined in Execute (EX), penalty = 2 stalls. If in Memory (MEM), penalty = 3 stalls.',
  },
  {
    id: 't5',
    subject: '#5 CN',
    trap: 'Subnet Usable Host Calculation for Point-to-Point Links',
    misconception: 'Always blindly subtracting 2 from total host addresses in all scenarios.',
    correctApproach: 'Standard subnetting subtracts 2 (Network ID and Broadcast). However, for /31 subnet (RFC 3021) in dedicated point-to-point links, all 2 addresses (2^(32-31) = 2) are usable. Read the question carefully for "standard IPv4 subnet" vs "point-to-point link".',
  },
  {
    id: 't6',
    subject: '#6 OS',
    trap: 'Resource Allocation Graph Cycle vs Deadlock Equivalence',
    misconception: 'Assuming a cycle in any Resource Allocation Graph always guarantees a deadlock.',
    correctApproach: 'Cycle is necessary AND sufficient for deadlock ONLY if every resource type has exactly 1 single instance. If resource types have multiple instances, a cycle is necessary but NOT sufficient (processes outside cycle may release needed instances).',
  },
  {
    id: 't7',
    subject: '#7 DBMS',
    trap: 'SQL NULL with Aggregate Functions & Comparisons',
    misconception: 'Believing COUNT(col) and COUNT(*) give the same result on tables with NULL values.',
    correctApproach: 'COUNT(*) counts every row including NULL rows. COUNT(col) ignores rows where col IS NULL. Also, NULL = NULL evaluates to UNKNOWN, not TRUE. Always use IS NULL.',
  },
  {
    id: 't8',
    subject: '#8 TOC',
    trap: 'CFL Closure under Complementation and Intersection',
    misconception: 'Assuming Context-Free Languages (CFL) are closed under intersection or complementation.',
    correctApproach: 'CFLs are NOT closed under intersection (e.g., L1 = {a^n b^n c^m} INTERSECT L2 = {a^m b^n c^n} gives non-CFL {a^n b^n c^n}) and NOT closed under complement. Deterministic CFLs (DCFLs) ARE closed under complementation.',
  },
  {
    id: 't9',
    subject: '#9 CD',
    trap: 'LALR(1) Parsing Table Conflict Creation',
    misconception: 'Thinking that merging states in LALR(1) can create Shift-Reduce (S-R) conflicts.',
    correctApproach: 'Merging states in LALR(1) can NEVER produce new Shift-Reduce conflicts because shift actions depend only on the LR(0) core item. However, merging CAN produce Reduce-Reduce (R-R) conflicts if two reductions have differing lookaheads that overlap after merging.',
  },
  {
    id: 't10',
    subject: '#10 Maths',
    trap: 'Eigenvalues of Non-Square Matrices or Determinant Properties',
    misconception: 'Attempting to calculate eigenvalues or determinant for rectangular (m x n, m != n) matrices.',
    correctApproach: 'Eigenvalues and determinants are defined ONLY for square matrices. For rectangular matrices, Singular Value Decomposition (SVD) and singular values are used instead.',
  },
  {
    id: 't11',
    subject: '#11 Apti',
    trap: 'Average Speed in Two-Way Travel with Equal Distance',
    misconception: 'Calculating average speed as the arithmetic mean: (S1 + S2) / 2.',
    correctApproach: 'When distances are equal, average speed is the Harmonic Mean: (2 * S1 * S2) / (S1 + S2). Arithmetic mean is only valid if time spent at each speed is equal.',
  },
];
