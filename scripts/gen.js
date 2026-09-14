const fs = require('fs');

const SUBJECT_CONFIGS = [
  { order: 1, code: 'PDS', name: '#1 Programming & Data Structures', phase: 'Phase 1: Foundations & Core Data Structures', hours: 4,
    topics: [
      { day: 1, title: 'C Pointers, Pointer Arithmetic & Dynamic Memory', sub: ['Pointers & dereferencing', 'Pointer arithmetic & sizeof', 'malloc, calloc, realloc, free', 'Dangling pointers & memory leaks'], pts: ['ptr + i increments by sizeof(*ptr)*i bytes.', '(*ptr)++ increments value, *ptr++ increments address.'] },
      { day: 2, title: 'Functions, Recursion Call Stack & Parameter Passing', sub: ['Pass by value vs reference', 'Activation records & stack frames', 'Tail recursion & call trees', 'Static variables in recursion'], pts: ['C is strictly pass-by-value.', 'Static local variables retain values across recursive invocations.'] },
      { day: 3, title: 'Arrays, Row-Major / Column-Major Mapping & Structs', sub: ['1D/2D arrays memory indexing', 'Row-Major vs Column-Major formulas', 'Pointer decay in multi-arrays', 'Structure padding & alignment'], pts: ['Row-Major: Base + ((i-LBR)*C + (j-LBC))*size', 'Column-Major: Base + ((j-LBC)*R + (i-LBR))*size'] },
      { day: 4, title: 'Linked Lists (Singly, Doubly, Circular & Fast/Slow)', sub: ['Singly/Doubly insertions & deletions', 'In-place reversal with 3 pointers', 'Floyd cycle detection algorithm', 'Finding middle node in O(n)'], pts: ['Floyd algorithm: slow moves 1, fast moves 2.', 'Deletion given pointer takes O(1) by copying next node.'] },
      { day: 5, title: 'Stacks, Infix / Postfix / Prefix & Expression Evaluation', sub: ['Stack implementations', 'Infix to Postfix precedence conversion', 'Postfix evaluation algorithm', 'Balanced parentheses matching'], pts: ['Valid stack permutations for n pushes = Catalan number C(n).'] },
      { day: 6, title: 'Queues, Circular Queues, Deque & Priority Queues', sub: ['Circular queue modulo arithmetic', 'Full condition (Rear+1)%N == Front', 'Deque input/output restricted', 'Queue using two stacks'], pts: ['Circular queue of size N holds at most N-1 elements.'] },
      { day: 7, title: 'Binary Trees, Strict/Complete/Full & Tree Traversals', sub: ['Full, Complete, Perfect binary trees', 'Inorder, Preorder, Postorder traversals', 'Unique reconstruction (Inorder mandatory)', 'Null pointer count = n + 1'], pts: ['In any non-empty binary tree: n0 = n2 + 1.'] },
      { day: 8, title: 'Binary Search Trees (BST), Insertion, Deletion & Search', sub: ['BST property & sorted inorder traversal', 'Insertion and search O(h)', 'BST Deletion 0/1/2 child cases', 'Distinct BSTs for n keys = Catalan C(n)'], pts: ['Inorder traversal of BST always produces sorted ascending order.'] },
      { day: 9, title: 'AVL Trees, Balance Factors, Rotations & Height Bounds', sub: ['Balance factor BF in {-1, 0, +1}', 'LL, RR, LR, RL single/double rotations', 'Min nodes N(h)=N(h-1)+N(h-2)+1', 'Max height h <= 1.44*log2(n)'], pts: ['After insertion, only lowest unbalanced node needs rotation.'] },
      { day: 10, title: 'Binary Heaps (Min/Max), Heapify & Priority Queue', sub: ['Array indexing: Left=2i+1, Right=2i+2', 'Build-Heap in linear O(n) time', 'Insert & Extract-Max in O(log n)', 'K-th largest element using min-heap'], pts: ['Building a heap takes O(n) time, not O(n log n).'] },
      { day: 11, title: 'Hashing, Hash Functions & Collision Resolution', sub: ['Division & multiplication hash methods', 'Separate Chaining & load factor lambda', 'Open addressing: Linear/Quadratic/Double', 'Clustering phenomena'], pts: ['Separate Chaining expected search time is O(1 + lambda).'] },
      { day: 12, title: 'Subject #1 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive PDS review', 'Negative marking trap analysis', '25-Q Timed Milestone Test', 'Error log entry'], pts: ['Review all PDS trap rules before test.'] }
    ]
  },
  { order: 2, code: 'Algo', name: '#2 Algorithms', phase: 'Phase 2: Algorithms & Complexity Analysis', hours: 4,
    topics: [
      { day: 13, title: 'Asymptotic Notations & Function Rankings', sub: ['O, Omega, Theta, o, omega definitions', 'Transitivity & symmetry properties', 'Standard growth rate hierarchy'], pts: ['log(n!) = Theta(n log n) by Stirling approximation.'] },
      { day: 14, title: 'Recurrences, Master Theorem & Substitution', sub: ['Master theorem 3 cases & extensions', 'Recursion tree analysis', 'Variable substitution technique'], pts: ['Master theorem requires polynomial difference.'] },
      { day: 15, title: 'Divide & Conquer: Merge Sort & Quick Sort', sub: ['Merge Sort O(n log n) stable', 'Quick Sort best/worst case', 'Binary Search invariants'], pts: ['Merge sort is stable; Quick sort and Heap sort are not.'] },
      { day: 16, title: 'Linear Sorting & Comparison Lower Bound', sub: ['Omega(n log n) decision tree bound', 'Counting Sort O(n+k)', 'Radix & Bucket Sort'], pts: ['Comparison sorting requires at least Omega(n log n) comparisons.'] },
      { day: 17, title: 'Greedy Strategy: Knapsack, Activity Selection & Huffman', sub: ['Fractional Knapsack ratio sorting', 'Activity selection by finish time', 'Huffman prefix-free codes'], pts: ['Huffman tree creates 2n-1 total nodes for n symbols.'] },
      { day: 18, title: 'Dynamic Programming: 0/1 Knapsack, LCS & MCM', sub: ['0/1 Knapsack O(nW) pseudo-polynomial', 'LCS table recurrence O(mn)', 'Matrix Chain Catalan counts'], pts: ['Matrix parenthesizations = Catalan number C(n-1).'] },
      { day: 19, title: 'Dynamic Programming: OBST, Subsets & Floyd-Warshall', sub: ['Optimal BST recurrence', 'Subset Sum problem', 'Floyd-Warshall all-pairs shortest paths O(V^3)'], pts: ['Floyd-Warshall detects negative cycles when diagonal d[i][i] < 0.'] },
      { day: 20, title: 'Graph Traversal: BFS, DFS & Topological Sorting', sub: ['BFS queue shortest paths', 'DFS timestamps & edge types', 'DAG Topological sorting'], pts: ['Directed graph has a cycle iff DFS produces a Back edge.'] },
      { day: 21, title: 'Minimum Spanning Trees: Prim and Kruskal with DSU', sub: ['Prim min-heap O(E log V)', 'Kruskal with DSU union by rank', 'MST uniqueness property'], pts: ['If all edge weights are distinct, MST is strictly unique.'] },
      { day: 22, title: 'Single-Source Shortest Paths: Dijkstra & Bellman-Ford', sub: ['Dijkstra non-negative weights', 'Bellman-Ford V-1 passes', 'Negative cycle detection'], pts: ['Dijkstra fails on negative weights; Bellman-Ford detects negative cycles.'] },
      { day: 23, title: 'Complexity Classes: P, NP, NP-Complete & Reductions', sub: ['P vs NP polynomial verification', 'Polynomial time reductions A <=p B', 'Canonical NP-complete problems'], pts: ['If any NP-complete problem is in P, then P = NP.'] },
      { day: 24, title: 'Subject #2 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive Algo review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review Master theorem non-applicability cases before test.'] }
    ]
  },
  { order: 3, code: 'DL', name: '#3 Digital Logic', phase: 'Phase 3: Digital Logic & Hardware Circuits', hours: 4,
    topics: [
      { day: 25, title: 'Number Systems, Complements & Fixed/Floating Point', sub: ['Radix conversions', '1s/2s complement range & overflow', 'IEEE 754 32/64-bit float formats'], pts: ['Range of n-bit 2s complement: -2^(n-1) to +(2^(n-1) - 1).'] },
      { day: 26, title: 'Boolean Algebra, Universal Gates & Self-Dual Functions', sub: ['Boolean postulates & De Morgan laws', 'NAND/NOR minimal gate counts', 'Self-dual count 2^(2^(n-1))'], pts: ['Minimal NAND gates: NOT=1, AND=2, OR=3, XOR=4, XNOR=5.'] },
      { day: 27, title: 'Karnaugh Maps (K-Maps), Implicants & Minimization', sub: ['Gray code ordering', 'Prime & Essential Prime Implicants', 'Don\t Care conditions & hazards'], pts: ['Essential prime implicants cover at least one unique minterm.'] },
      { day: 28, title: 'Combinational Circuits: Adders & Carry Lookahead', sub: ['Half/Full Adders', 'Ripple carry delay', 'Carry Lookahead Adder generate/propagate'], pts: ['Carry lookahead adder computes all carry bits in O(1) time.'] },
      { day: 29, title: 'Decoders, Encoders & Priority Encoders', sub: ['n-to-2^n decoders with enable', 'Decoder cascading', 'Priority encoders with valid bit'], pts: ['Decoder units = 2^(N-n) + control units.'] },
      { day: 30, title: 'Multiplexers (MUX) as Universal Logic Generators', sub: ['2:1, 4:1, 8:1 Multiplexers', 'Implementing n+1 variable functions', 'MUX cascading tree'], pts: ['2^n to 1 MUX can implement any function of n+1 variables.'] },
      { day: 31, title: 'Sequential Circuits: Latches, Flip-Flops & Conversions', sub: ['SR, JK, D, T flip-flops', 'Characteristic equations', 'Excitation table conversions'], pts: ['Setup time is before clock edge; Hold time is after clock edge.'] },
      { day: 32, title: 'Race Around Condition & Master-Slave Flip-Flops', sub: ['Race around condition root cause', 'Master-Slave JK clock inversion', 'Max clock frequency equations'], pts: ['Clock period T_clk >= t_FF + t_comb + t_setup.'] },
      { day: 33, title: 'Counters: Synchronous, Ripple, Ring & Johnson Counters', sub: ['Asynchronous ripple delay', 'Mod-N synchronous design', 'Ring (N states) vs Johnson (2N states)'], pts: ['n-bit Johnson counter provides 2n states with N flip-flops.'] },
      { day: 34, title: 'Subject #3 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive DL review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review DL trap rules before test.'] }
    ]
  }
];
SUBJECT_CONFIGS.push(
  { order: 4, code: 'COA', name: '#4 Computer Organization & Architecture', phase: 'Phase 4: Computer Architecture & Memory Systems', hours: 4,
    topics: [
      { day: 35, title: 'Machine Instructions, Formats & Opcode Expansion', sub: ['0/1/2/3-address formats', 'Expanding opcode capacity', 'Instruction cycle stages'], pts: ['Expanding opcode: Free opcodes * 2^(bits) = next capacity.'] },
      { day: 36, title: 'Addressing Modes (Immediate, Direct, Relative, Indexed)', sub: ['Addressing classifications', 'PC-Relative & Base Register', 'Effective address formulas'], pts: ['PC-relative addressing facilitates position-independent code.'] },
      { day: 37, title: 'ALU, Data-Path & Control Unit Design', sub: ['Bus datapath timing', 'Hardwired vs Microprogrammed', 'Horizontal vs Vertical microinstructions'], pts: ['Horizontal microprogramming uses 1 bit per control line without decoding delay.'] },
      { day: 38, title: 'Instruction Pipelining, Throughput & Ideal Speedup', sub: ['Stage and latch delays, clock period = max(delay)+latch', 'Time = (k+n-1)*t_clk', 'Speedup approaching k stages'], pts: ['Ideal pipeline throughput = 1 instruction per cycle (CPI = 1).'] },
      { day: 39, title: 'Data Hazards: RAW, WAR, WAW & Operand Forwarding', sub: ['RAW true dependency', 'WAR/WAW dependencies', 'Operand forwarding bypassing', 'Load-use stall cycles'], pts: ['Operand forwarding resolves ALU-ALU dependencies; Load-ALU still takes 1 stall.'] },
      { day: 40, title: 'Branch Hazards, Branch Prediction & Branch Penalty', sub: ['Control hazard penalty by resolution stage', 'Static & Dynamic 2-bit prediction', 'Delayed branch slot filling'], pts: ['Branch penalty = (Target ready stage - Branch fetch stage) - 1.'] },
      { day: 41, title: 'Memory Hierarchy, Locality & Cache Principles', sub: ['Temporal vs Spatial locality', 'Block size trade-offs', 'Hit/miss ratio definitions'], pts: ['Excessive block sizes increase miss penalty and later miss rate.'] },
      { day: 42, title: 'Cache Mapping: Direct, Fully & Set-Associative', sub: ['Direct mapped tag/line/offset', 'k-way set associative tag/set/offset', 'Tag directory size in bits'], pts: ['Tag bits = Physical Address bits - log2(Sets) - log2(BlockSize).'] },
      { day: 43, title: 'Cache Write Policies, Replacement & Multi-Level', sub: ['Write Through vs Write Back', 'Write Allocate vs No-Write Allocate', 'LRU replacement & multi-level EMAT'], pts: ['Global Miss Rate L2 = Miss Rate L1 * Local Miss Rate L2.'] },
      { day: 44, title: 'Virtual Memory, Multi-Level Paging & TLB EMAT', sub: ['Virtual to physical translation', 'Page table size = (VAS/PageSize)*PTE', 'TLB hit/miss EMAT formula'], pts: ['EMAT = h*(t_TLB + t_mem) + (1-h)*(t_TLB + (k+1)*t_mem).'] },
      { day: 45, title: 'I/O Organization: Interrupts, Vectoring & DMA', sub: ['Programmed I/O vs Interrupts', 'Vectored daisy-chain priority', 'DMA Burst vs Cycle Stealing CPU slowdown %'], pts: ['Cycle stealing DMA CPU slowdown % = (Transfer time / Cycle time) * 100.'] },
      { day: 46, title: 'Subject #4 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive COA review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review all COA trap rules before test.'] }
    ]
  },
  { order: 5, code: 'CN', name: '#5 Computer Networks', phase: 'Phase 5: Networks, Protocols & Layered Architectures', hours: 4,
    topics: [
      { day: 47, title: 'OSI 7-Layer vs TCP/IP Protocol Stack', sub: ['Layer functionalities & PDU units', 'Byte/bit framing & stuffing', 'End-to-end vs Hop-by-hop delivery'], pts: ['Data link layer does hop-to-hop; Transport layer does process-to-process.'] },
      { day: 48, title: 'Data Link Layer: Framing, Parity & CRC Polynomials', sub: ['CRC divisor generation & error detection', 'Hamming distance (d >= 2e+1)', 'Checksum algorithms'], pts: ['To detect e errors: d_min >= e + 1. To correct e errors: d_min >= 2e + 1.'] },
      { day: 49, title: 'Flow Control: Stop-and-Wait Protocol Efficiency', sub: ['Transmission delay (Tt) vs Propagation delay (Tp)', 'Efficiency eta = 1 / (1 + 2a)', 'Throughput calculations'], pts: ['Efficiency = 1 / (1 + 2a) where a = Tp/Tt.'] },
      { day: 50, title: 'Sliding Window: Go-Back-N & Selective Repeat', sub: ['GBN: Sender=N, Receiver=1, seq >= N+1', 'SR: Sender=N, Receiver=N, seq >= 2N', 'Efficiency = N / (1 + 2a)'], pts: ['In Selective Repeat, minimum sequence numbers required = 2 * WindowSize.'] },
      { day: 51, title: 'Medium Access Control: CSMA/CD & Collision Detection', sub: ['Pure ALOHA (18.4%) vs Slotted ALOHA (36.8%)', 'CSMA/CD minimum frame size: L >= 2*B*Tp', 'Exponential backoff algorithm'], pts: ['In CSMA/CD: Tt >= 2 * Tp is mandatory for collision detection.'] },
      { day: 52, title: 'IPv4 Addressing, Subnetting, Supernetting & CIDR', sub: ['CIDR prefix masks', 'Subnet mask calculations (2^h - 2)', 'VLSM address allocation'], pts: ['Usable hosts in /k subnet = 2^(32-k) - 2.'] },
      { day: 53, title: 'IPv4 Header Format & Packet Fragmentation', sub: ['IPv4 header fields', 'Fragmentation offset (scaled by 8 bytes)', 'DF and MF flags'], pts: ['Fragment offset = (Starting byte number) / 8.'] },
      { day: 54, title: 'Routing: Distance Vector (RIP) & Link State (OSPF)', sub: ['Distance Vector: Bellman-Ford, Count to infinity', 'Link State: Dijkstra-based OSPF', 'BGP exterior routing'], pts: ['Distance Vector routing suffers from Count-to-Infinity.'] },
      { day: 55, title: 'Transport Layer: TCP 3-Way Handshake & Teardown', sub: ['TCP header fields & pseudo-header checksum', 'Connection establishment (SYN, SYN-ACK, ACK)', '4-way termination & TIME_WAIT (2*MSL)'], pts: ['TIME_WAIT state lasts 2 * MSL to ensure final ACK is acknowledged.'] },
      { day: 56, title: 'TCP Flow Control & Congestion Control Dynamics', sub: ['Effective Window = min(cwnd, rwnd)', 'Slow Start exponential doubling', 'Congestion Avoidance additive increase', 'Fast Retransmit & Recovery on 3 dup ACKs'], pts: ['On timeout: ssthresh = cwnd/2, cwnd = 1 MSS. On 3 dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh + 3.'] },
      { day: 57, title: 'Application Layer Protocols: DNS, DHCP, HTTP & SMTP', sub: ['DNS iterative vs recursive resolution', 'DHCP DORA process', 'HTTP 1.0 vs 1.1 Persistent connections', 'SMTP, POP3, IMAP protocols'], pts: ['DNS uses UDP port 53 for queries (< 512B) and TCP port 53 for zone transfers.'] },
      { day: 58, title: 'Subject #5 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive CN review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review all CN trap rules before test.'] }
    ]
  },
  { order: 6, code: 'OS', name: '#6 Operating Systems', phase: 'Phase 6: Operating Systems & Concurrency', hours: 4,
    topics: [
      { day: 59, title: 'OS Structures, System Calls & Process Control Block', sub: ['Dual-mode kernel vs user mode', 'Process creation (fork() call tree)', 'PCB attributes and context switching'], pts: ['fork() called n times creates 2^n - 1 child processes.'] },
      { day: 60, title: 'CPU Scheduling: FCFS, SJF, SRTF & Priority', sub: ['Preemptive vs Non-preemptive', 'SRTF optimal average waiting time', 'Priority scheduling and starvation aging'], pts: ['SRTF provides minimum average waiting time among all scheduling algorithms.'] },
      { day: 61, title: 'Round Robin Scheduling & Multi-Level Feedback Queues', sub: ['Time quantum trade-offs', 'Context switch overhead impact', 'Multi-Level Feedback Queue aging'], pts: ['If time quantum is very large, Round Robin degrades to FCFS.'] },
      { day: 62, title: 'Synchronization: Critical Section & Peterson Algorithm', sub: ['Mutual Exclusion, Progress, Bounded Waiting', 'Hardware atomic instructions (TestAndSet)', 'Peterson 2-process solution'], pts: ['Progress requirement: only processes trying to enter CS participate in entry decision.'] },
      { day: 63, title: 'Semaphores & Classical Concurrency Problems', sub: ['Binary vs Counting Semaphores', 'Producer-Consumer bounded buffer', 'Readers-Writers problem'], pts: ['Counting semaphore value of -k indicates exactly k processes are waiting in queue.'] },
      { day: 64, title: 'Deadlocks: Coffman Conditions & Resource Graphs', sub: ['4 necessary conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait', 'Resource Allocation Graph (RAG) single vs multiple instance'], pts: ['In single-instance RAG, cycle is necessary and sufficient. In multiple-instance, cycle is not sufficient.'] },
      { day: 65, title: 'Deadlock Avoidance & Banker Algorithm', sub: ['Safe state vs Unsafe state', 'Banker Algorithm: Need = Max - Allocation <= Available', 'Safety algorithm vector comparison'], pts: ['An unsafe state is not necessarily a deadlock state, but deadlock is always unsafe.'] },
      { day: 66, title: 'Memory Management: Contiguous Allocation & Paging', sub: ['First-Fit, Best-Fit, Worst-Fit', 'Paging: Page number + Offset translation', 'Internal vs External fragmentation'], pts: ['Paging eliminates external fragmentation; internal fragmentation exists on last page.'] },
      { day: 67, title: 'Multi-Level Paging, Inverted Page Tables & TLB', sub: ['Paging levels calculation', 'Inverted page table size = Frames * PTE', 'TLB Effective Memory Access Time (EMAT)'], pts: ['Inverted page table size is proportional to Physical Memory, independent of VAS.'] },
      { day: 68, title: 'Virtual Memory, Page Replacement & Belady Anomaly', sub: ['Demand Paging & Page Faults', 'FIFO, Optimal (MIN), LRU, Clock policies', 'Belady Anomaly in FIFO'], pts: ['Stack algorithms (LRU, Optimal) can never suffer from Belady anomaly.'] },
      { day: 69, title: 'File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)', sub: ['File allocation: Contiguous, Linked, Indexed (inode)', 'Disk scheduling: FCFS, SSTF, SCAN, C-SCAN, LOOK'], pts: ['UNIX inode direct, single indirect, double indirect address capacity calculations.'] },
      { day: 70, title: 'Subject #6 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive OS review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review all OS trap rules before test.'] }
    ]
  },
  { order: 7, code: 'DBMS', name: '#7 Database Management Systems', phase: 'Phase 7: Relational Databases & Transactions', hours: 4,
    topics: [
      { day: 71, title: 'ER Modeling & Relational Schema Conversion', sub: ['Entities, Weak entities, Relationships', 'Cardinality constraints (1:1, 1:N, M:N)', 'Minimizing relational tables count'], pts: ['1:N relationship can be merged with N-side table without creating separate table.'] },
      { day: 72, title: 'Relational Algebra (Selection, Projection, Joins, Division)', sub: ['Select, Project, Union, Difference, Cartesian', 'Natural Join, Theta Join, Outer Joins', 'Relational Division operator'], pts: ['Relational Division R(A,B) / S(B) produces tuples in R matching all tuples in S.'] },
      { day: 73, title: 'SQL Queries: GROUP BY, HAVING & Correlated Subqueries', sub: ['Aggregate functions (COUNT, SUM, AVG)', 'WHERE vs HAVING filtering', 'Correlated subqueries with EXISTS'], pts: ['COUNT(*) counts NULL rows; COUNT(col) ignores NULLs. WHERE filters before grouping.'] },
      { day: 74, title: 'Functional Dependencies & Candidate Keys Algorithm', sub: ['Armstrong Axioms', 'Attribute closure X+ algorithm', 'Finding all candidate keys', 'Minimal Cover / Canonical Cover'], pts: ['Attribute not appearing on RHS of any FD must be present in every candidate key.'] },
      { day: 75, title: 'Normalization: 1NF, 2NF, 3NF & BCNF Forms', sub: ['1NF: Atomic values', '2NF: No partial dependency', '3NF: X superkey OR A prime', 'BCNF: Every X must be superkey'], pts: ['Every BCNF relation is in 3NF, but not every 3NF relation is in BCNF.'] },
      { day: 76, title: 'Decomposition: Lossless Join & Dependency Preserving', sub: ['Lossless join condition for 2 relations', 'Dependency preservation check via closure', '3NF synthesis algorithm'], pts: ['Any relation can be decomposed into 3NF such that it is both lossless and dependency preserving.'] },
      { day: 77, title: 'Transactions, ACID Properties & Concurrent Schedules', sub: ['Atomicity, Consistency, Isolation, Durability', 'Read-Write conflict operations', 'Recoverable vs Cascadeless vs Strict'], pts: ['Strict schedules subset Cascadeless subset Recoverable subset All schedules.'] },
      { day: 78, title: 'Conflict Serializability & Precedence Graphs', sub: ['Precedence Graph cycle detection', 'Topological sort order of equivalent serial schedule', 'View serializability & Blind Writes'], pts: ['Schedule S is conflict serializable iff its precedence graph has no cycles.'] },
      { day: 79, title: 'Concurrency Control: Two-Phase Locking (2PL)', sub: ['Basic 2PL growing and shrinking phases', 'Strict 2PL (holds exclusive locks to commit)', 'Rigid 2PL (holds all locks to commit)', 'Wait-Die vs Wound-Wait timestamp schemes'], pts: ['Basic 2PL guarantees conflict serializability. Strict 2PL prevents cascading rollbacks.'] },
      { day: 80, title: 'Database Recovery: WAL, Undo/Redo & Checkpoints', sub: ['Write-Ahead Logging (WAL) rule', 'Log records: <T, X, V_old, V_new>', 'Checkpointing: Undo and Redo list resolution'], pts: ['Uncommitted transactions before crash are UNDONE; committed ones are REDONE.'] },
      { day: 81, title: 'File Organization & B / B+ Tree Indexing Capacity', sub: ['Primary, Secondary & Clustered Indexes', 'B+ Tree order formula: p*P_block + (p-1)*Key <= BlockSize', 'Block access counts for search and range queries'], pts: ['In B+ trees, all data pointers reside in leaf nodes, linked sequentially for range queries.'] },
      { day: 82, title: 'Subject #7 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive DBMS review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review all DBMS trap rules before test.'] }
    ]
  }
);
SUBJECT_CONFIGS.push(
  { order: 8, code: 'TOC', name: '#8 Theory of Computation', phase: 'Phase 8: Automata, Grammars & Decidability', hours: 4,
    topics: [
      { day: 83, title: 'Deterministic Finite Automata (DFA) Design', sub: ['Alphabets, strings & languages', 'DFA 5-tuple formal definition', 'Designing DFAs for modulo counting & substrings'], pts: ['Minimum states in DFA accepting strings with remainder r modulo m is m.'] },
      { day: 84, title: 'NFA, Epsilon-NFA & Subset Construction', sub: ['NFA non-determinism', 'Subset construction powerset 2^Q', 'Epsilon-closure conversion'], pts: ['An n-state NFA may require up to 2^n states when converted to minimal DFA.'] },
      { day: 85, title: 'DFA State Minimization & Myhill-Nerode Theorem', sub: ['Table-filling marking algorithm', 'Myhill-Nerode equivalence relations', 'Unique minimal DFA property'], pts: ['Every regular language has a unique minimal state DFA up to state isomorphism.'] },
      { day: 86, title: 'Regular Expressions & Arden Theorem', sub: ['Regular expression operators (*, +, concat)', 'Arden Theorem: R = Q + RP => R = QP*', 'State elimination method'], pts: ['(a + b)* = (a* b*)* = (a* + b)*.'] },
      { day: 87, title: 'Pumping Lemma for Regular Languages', sub: ['Pumping lemma conditions: |xy|<=p, |y|>=1, xy^i z in L', 'Proving non-regularity for {a^n b^n}, {a^(n^2)}'], pts: ['Pumping lemma is necessary for regular languages but not sufficient to prove regularity.'] },
      { day: 88, title: 'Regular Language Closure & Decision Properties', sub: ['Closed under Union, Intersection, Complement, Concat, Star', 'Decidable problems: Emptiness, Finiteness, Membership, Equivalence'], pts: ['All standard decision problems (Emptiness, Equivalence, Membership) are Decidable for Regular.'] },
      { day: 89, title: 'Context-Free Grammars (CFG) & Ambiguity Analysis', sub: ['CFG formal definition (V, T, P, S)', 'Leftmost vs Rightmost derivations', 'Ambiguous grammars & inherently ambiguous languages'], pts: ['Testing whether an arbitrary CFG is ambiguous is Undecidable.'] },
      { day: 90, title: 'CFG Simplification & Chomsky Normal Form (CNF)', sub: ['Eliminating null, unit & useless symbols', 'Chomsky Normal Form: A -> BC or A -> a', 'Derivation length in CNF takes exactly 2n - 1 steps'], pts: ['In CNF, a string of length n takes exactly 2n - 1 derivation steps.'] },
      { day: 91, title: 'Pushdown Automata (PDA): DPDA vs NPDA', sub: ['PDA 7-tuple stack transitions', 'Acceptance by final state vs empty stack', 'DPDA defines DCFL (strictly less powerful than NPDA)'], pts: ['DPDAs are strictly less powerful than NPDAs: DPDA cannot recognize {w w^R}.'] },
      { day: 92, title: 'CFL & DCFL Properties, Closure & Pumping Lemma', sub: ['CFL closure: Closed under Union, Concat, Star; NOT Intersection or Complement', 'DCFL closure: CLOSED under Complement; NOT Union or Intersection', 'CFL Pumping Lemma: s = uvwxy'], pts: ['DCFL is closed under complementation, whereas general CFL is not closed under complementation.'] },
      { day: 93, title: 'Turing Machines (TM) & Chomsky Hierarchy', sub: ['Standard deterministic TM 7-tuple', 'Multi-tape, Multi-track TMs equivalence', 'Chomsky Hierarchy: Regular subset CFL subset CSL subset REC subset RE'], pts: ['Multi-tape Turing machines have the exact same computational power as standard single-tape TMs.'] },
      { day: 94, title: 'Decidability, Halting Problem & Rice Theorem', sub: ['REC vs RE language definitions', 'Halting Problem undecidability proof', 'Rice Theorem Part 1 for semantic properties', 'Post Correspondence Problem (PCP)'], pts: ['If language L is RE and its complement is also RE, then L is REC (Decidable).'] }
    ]
  },
  { order: 9, code: 'CD', name: '#9 Compiler Design', phase: 'Phase 9: Compiler Architecture & Code Generation', hours: 4,
    topics: [
      { day: 95, title: 'Compiler Phases & Lexical Analysis (Tokens & Lexemes)', sub: ['6 Phases: Lexical, Syntax, Semantic, Intermediate, Optimizer, Target', 'Tokens, Patterns, Lexemes', 'Input buffering & Lexical errors'], pts: ['Symbol table is accessed by all compiler phases; Lexical analyzer strips comments.'] },
      { day: 96, title: 'Top-Down Parsing: FIRST and FOLLOW Computation', sub: ['FIRST set computation rules with epsilon', 'FOLLOW set computation with $ marker', 'Left recursion elimination & Left factoring'], pts: ['FOLLOW set can never contain epsilon. $ is always in FOLLOW(S).'] },
      { day: 97, title: 'LL(1) Parsing Tables & LL(1) Grammar Conditions', sub: ['Constructing M[A, a] table using FIRST and FOLLOW', 'LL(1) condition: No multiple entries in table cell', 'Left recursion or ambiguity prevents LL(1)'], pts: ['Grammar with left recursion or ambiguity can never be LL(1).'] },
      { day: 98, title: 'Bottom-Up Parsing: LR(0) & SLR(1) Parsing Tables', sub: ['Augmented grammar & LR(0) item closure', 'GOTO transitions & Canonical items collection', 'Shift-Reduce & Reduce-Reduce conflicts', 'SLR(1) placing reductions in FOLLOW(LHS)'], pts: ['In SLR(1), reduce actions are placed only in columns corresponding to FOLLOW(A).'] },
      { day: 99, title: 'CLR(1) & LALR(1) Parsers & State Count Comparison', sub: ['LR(1) items with lookaheads', 'LALR(1) merging states with identical LR(0) cores', 'Parser hierarchy: LR(0) < SLR(1) < LALR(1) < CLR(1)', 'State count: LR(0) = SLR(1) = LALR(1) <= CLR(1)'], pts: ['Merging states in LALR(1) can never introduce Shift-Reduce conflicts, but can introduce Reduce-Reduce conflicts.'] },
      { day: 100, title: 'Syntax-Directed Translation (SDT): S vs L-Attributed', sub: ['Synthesized attributes (bottom-up from children)', 'Inherited attributes (from parent/left siblings)', 'S-Attributed definitions (only synthesized)', 'L-Attributed definitions (synthesized + inherited from left)'], pts: ['Every S-attributed definition is L-attributed, but not every L-attributed is S-attributed.'] },
      { day: 101, title: 'Intermediate Code Generation: Three-Address Code & DAGs', sub: ['Three-Address Code (TAC): Quadruples, Triples', 'Syntax Trees and Directed Acyclic Graphs (DAG)', 'Common subexpression elimination via DAG'], pts: ['DAG eliminates redundant computations by creating shared nodes for identical subexpressions.'] },
      { day: 102, title: 'Code Optimization: Basic Blocks & Flow Graphs', sub: ['Identifying Basic Block leaders (First, Target, After jump)', 'Constructing Control Flow Graphs (CFG)', 'Dominators and natural loops'], pts: ['A leader is: 1) First statement, 2) Target of any branch, 3) Statement following any branch.'] },
      { day: 103, title: 'Loop Optimizations, Data Flow & Code Generation', sub: ['Loop invariant code motion & unrolling', 'Dead code elimination & Constant folding/propagation', 'Register allocation via graph coloring'], pts: ['Constant folding evaluates operations at compile-time (2+3 -> 5).'] },
      { day: 104, title: 'Subject #9 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive CD review', 'Negative marking trap analysis across Parsers and SDT', '25-Q Timed Milestone Test'], pts: ['Review all CD trap rules before test.'] }
    ]
  },
  { order: 10, code: 'Maths', name: '#10 Engineering & Discrete Mathematics', phase: 'Phase 10: Discrete Math, Linear Algebra & Probability', hours: 4,
    topics: [
      { day: 105, title: 'Propositional Logic: Equivalences & Normal Forms', sub: ['Truth tables, Tautology, Contradiction', 'Equivalences (p->q == ~p v q)', 'CNF and DNF representations'], pts: ['p -> q is logically equivalent to ~q -> ~p (Contrapositive).'] },
      { day: 106, title: 'Predicate Logic: Quantifiers & Inference Rules', sub: ['Universal (Forall) and Existential (Exists)', 'Negation: ~(Forall x P(x)) == Exists x ~P(x)', 'Validity and satisfiability of first-order formulas'], pts: ['Quantifier order matters: Exists y Forall x P(x, y) => Forall x Exists y P(x, y), but converse is false.'] },
      { day: 107, title: 'Sets, Relations, Equivalence & Closures', sub: ['Power sets |P(A)| = 2^n', 'Reflexive, Symmetric, Transitive relations', 'Equivalence relations and Bell number partitions'], pts: ['Number of equivalence relations on n elements = Bell Number B(n).'] },
      { day: 108, title: 'POSET, Hasse Diagrams & Lattices', sub: ['Partially Ordered Sets (POSET)', 'Hasse Diagram construction', 'Maximal, Minimal, GLB and LUB', 'Lattice definition and Boolean Algebra conditions'], pts: ['A bounded lattice is Boolean Algebra iff it is both Distributive and Complemented.'] },
      { day: 109, title: 'Functions, Pigeonhole Principle & Group Theory', sub: ['Injective, Surjective, Bijective functions', 'Generalized Pigeonhole Principle', 'Groups, Subgroups, Abelian, Lagrange Theorem'], pts: ['Lagrange Theorem: Order of subgroup divides order of group.'] },
      { day: 110, title: 'Combinatorics: Permutations, Combinations & Recurrences', sub: ['Permutations and combinations formulas', 'Inclusion-Exclusion Principle', 'Generating functions & Derangements D(n)'], pts: ['Derangement formula D(n) = n! * [1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n!].'] },
      { day: 111, title: 'Graph Theory: Connectivity, Euler & Hamiltonian Graphs', sub: ['Handshaking Lemma: Sum of degrees = 2E', 'Euler Path (0 or 2 odd vertices) vs Euler Circuit (all even)', 'Hamiltonian paths and cycles'], pts: ['Connected graph has Eulerian circuit iff every vertex has an even degree.'] },
      { day: 112, title: 'Graph Theory: Trees, Planar Graphs & Graph Coloring', sub: ['Cayley formula: Spanning trees on K_n = n^(n-2)', 'Euler Planar Formula: V - E + R = 2; E <= 3V - 6', 'Bipartite graphs (no odd cycles) & Chromatic number'], pts: ['A graph is bipartite iff it contains no odd-length cycles. 2-colorable == bipartite.'] },
      { day: 113, title: 'Linear Algebra: Matrices, Determinants & Linear Systems', sub: ['Matrix rank (Row Echelon Form)', 'Linear systems AX = B: Unique, Infinite, No solution', 'Determinant and Inverse properties'], pts: ['Homogeneous system AX = 0 has a non-trivial solution iff det(A) = 0.'] },
      { day: 114, title: 'Linear Algebra: Eigenvalues & Cayley-Hamilton Theorem', sub: ['Characteristic equation det(A - lambda I) = 0', 'Sum = Trace(A); Product = Det(A)', 'Cayley-Hamilton theorem: A satisfies own characteristic equation'], pts: ['Symmetric matrix eigenvalues are strictly real. Skew-symmetric are 0 or purely imaginary.'] },
      { day: 115, title: 'Calculus: Limits, Continuity, Maxima & Minima', sub: ['L\Hopital rule for 0/0 and inf/inf', 'Rolle & Mean Value Theorems', 'Maxima, Minima & Saddle points'], pts: ['For local minimum: f\'(x) = 0 and f\'\'(x) > 0. For local maximum: f\'(x) = 0 and f\'\'(x) < 0.'] },
      { day: 116, title: 'Probability: Conditional Probability & Bayes Theorem', sub: ['Conditional probability P(A|B) = P(AB)/P(B)', 'Independent events P(AB) = P(A)P(B)', 'Bayes Theorem posterior computation'], pts: ['Bayes theorem converts prior probabilities into posterior probabilities given evidence.'] },
      { day: 117, title: 'Random Variables & Distributions (Binomial, Poisson, Normal)', sub: ['Expectation E[X] & Variance Var(X)', 'Binomial: Mean = np, Var = np(1-p)', 'Poisson: Mean = Var = lambda', 'Uniform and Exponential memoryless distributions'], pts: ['In a Poisson distribution, Mean and Variance are exactly equal to lambda.'] },
      { day: 118, title: 'Subject #10 Milestone Review, Trap Rules & 25-Q Test', sub: ['Comprehensive Mathematics review', 'Negative marking trap analysis', '25-Q Timed Milestone Test'], pts: ['Review all Maths trap rules before test.'] }
    ]
  },
  { order: 11, code: 'Apti', name: '#11 General Aptitude', phase: 'Phase 11: General Aptitude & Comprehensive Mocks', hours: 4,
    topics: [
      { day: 119, title: 'Quantitative Aptitude: Percentages, Profit-Loss & Interest', sub: ['Percentage change shortcuts', 'Profit, Loss, Discount, Marked Price', 'Simple Interest vs Compound Interest'], pts: ['Net change of +x% and -x% is always a decrease of (x^2 / 100)%.'] },
      { day: 120, title: 'Quantitative Aptitude: Ratio, Proportion, Mixtures & Work', sub: ['Ratio & Proportion properties', 'Alligations and mixtures rule', 'Time & Work rate LCM method'], pts: ['Total work is assumed to be LCM of individual completion times.'] },
      { day: 121, title: 'Quantitative Aptitude: Speed, Distance, Trains & Clocks', sub: ['Relative speed opposite (S1+S2) vs same (|S1-S2|)', 'Boats & Streams (Down = u+v, Up = u-v)', 'Clock angle formula |30H - 5.5M|'], pts: ['Average speed over equal distances = (2*S1*S2)/(S1+S2) (Harmonic Mean).'] },
      { day: 122, title: 'Analytical Reasoning: Syllogisms & Seating Arrangements', sub: ['Categorical syllogisms (All, Some, No)', 'Blood relations family trees', 'Linear and circular seating constraints'], pts: ['Use Venn diagrams to test all possible counterexamples in syllogisms.'] },
      { day: 123, title: 'Spatial Aptitude: Paper Folding, Rotation & Projections', sub: ['2D reflections & rotations (90, 180 deg)', 'Paper folding & punching symmetries', '3D cube unfolding & elevations'], pts: ['In cube unfolding: Opposite faces never share a common edge or corner.'] },
      { day: 124, title: 'Verbal Aptitude: Grammar, Vocabulary & Comprehension', sub: ['Subject-verb agreement & Tenses', 'Vocabulary: Synonyms, Antonyms, Analogies', 'Reading comprehension strategies'], pts: ['Read the question stem first before reading long comprehension passages.'] },
      { day: 125, title: 'Grand Finale: 65-Question Full GATE Mock Simulator', sub: ['Full 65-question, 100-marks CBT Mock Test', 'Comprehensive coverage of all 11 subjects', 'Detailed percentile & accuracy breakdown'], pts: ['Follow 3-round exam strategy: Round 1 (1-mark easy), Round 2 (2-mark solvable), Round 3 (tough).'] }
    ]
  }
);

const allDays = [];
for (const sub of SUBJECT_CONFIGS) {
  for (const t of sub.topics) {
    allDays.push({
      day: t.day,
      subjectCode: sub.code,
      subjectName: sub.name,
      subjectOrder: sub.order,
      phase: sub.phase,
      topicTitle: t.title,
      subtopics: t.sub,
      estimatedHours: sub.hours,
      highYieldPoints: t.pts,
      tasks: [
        { id: 't1', label: 'Revise core theory and key formulas for ' + t.title, completed: t.day === 1 },
        { id: 't2', label: 'Solve 10 GATE practice questions for this topic', completed: false },
        { id: 't3', label: 'Review formula flashcard and trap rules in Vault', completed: false }
      ]
    });
  }
}

const outContent = 'export interface DailyScheduleItem {\n' +
  '  day: number;\n' +
  '  subjectCode: string;\n' +
  '  subjectName: string;\n' +
  '  subjectOrder: number;\n' +
  '  phase: string;\n' +
  '  topicTitle: string;\n' +
  '  subtopics: string[];\n' +
  '  estimatedHours: number;\n' +
  '  highYieldPoints: string[];\n' +
  '  tasks: {\n' +
  '    id: string;\n' +
  '    label: string;\n' +
  '    completed: boolean;\n' +
  '  }[];\n' +
  '}\n\n' +
  'export const GATE_125_DAY_SCHEDULE: DailyScheduleItem[] = ' + JSON.stringify(allDays, null, 2) + ';\n';

fs.writeFileSync('src/lib/schedule-data.ts', outContent, 'utf8');
console.log('SUCCESS: Generated ' + allDays.length + ' days across all 11 subjects!');
