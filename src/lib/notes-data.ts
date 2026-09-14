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
    id: "n1_1",
    subject: "#1 PDS",
    title: "C Operators, Precedence and Bitwise Tricks",
    content: "C operator precedence hierarchy, short-circuit evaluation, type promotion and bitwise tricks for GATE.",
    keyPoints: [
      "Precedence (high to low): Postfix > Unary > Multiplicative > Additive > Shift > Relational > Equality > Bitwise AND > XOR > OR > Logical AND > Logical OR > Ternary > Assignment > Comma.",
      "Short-circuit AND: if left operand is 0 the right operand is NEVER evaluated. Short-circuit OR: if left is non-zero right is NEVER evaluated.",
      "Power-of-2 test: (n > 0) and ((n and (n-1)) == 0) is true only when n is a power of 2.",
      "Clear lowest set bit: n = n and (n-1) removes the rightmost 1-bit in O(1). Count of iterations to reach 0 equals the number of set bits.",
      "Comma operator evaluates left-to-right and returns the rightmost value. Example: int x = (1, 2, 3) sets x to 3."
    ],
    bookmarked: true,
  },
  {
    id: "n1_2",
    subject: "#1 PDS",
    title: "Storage Classes: auto / register / static / extern",
    content: "Memory segment, initialization, scope, linkage and lifetime of each C storage class.",
    keyPoints: [
      "auto: Stack segment. Garbage-initialized. Block scope. Destroyed on function exit. Default for all local variables.",
      "register: CPU register requested (compiler may ignore). Cannot use address-of operator. Garbage-initialized. Block scope.",
      "static local: BSS or Data segment. Zero-initialized once at program start. Retains its value across ALL calls including recursive ones.",
      "static global: Data segment. File-level (internal) scope only. Prevents name collisions across translation units.",
      "extern: No memory allocated. Only a declaration that links to a definition in another translation unit. External linkage."
    ],
    bookmarked: true,
  },
  {
    id: "n1_3",
    subject: "#1 PDS",
    title: "Functions, Activation Records and Recursion Call Stack",
    content: "C pass-by-value semantics, stack frame layout, recursive call tree tracing, and tail recursion optimization.",
    keyPoints: [
      "C is strictly call-by-value: formal parameters receive copies of actual arguments. Simulate pass-by-reference by passing pointer values.",
      "Activation Record contains: Return Address, Saved Frame Pointer, Local Variables, Saved Registers, Formal Parameters.",
      "Static local variable in recursion: all recursive frames share ONE memory location. Modifications accumulate globally across all calls.",
      "Tail recursion: recursive call is the last action before return. Compiler can reuse the same stack frame (Tail Call Optimization with -O2).",
      "Trace strategy: draw call tree top-down and annotate return values bottom-up during the unwind phase."
    ],
    bookmarked: true,
  },
  {
    id: "n1_4",
    subject: "#1 PDS",
    title: "Pointers, Pointer Arithmetic and Complex Declarations",
    content: "Byte-scaled pointer arithmetic, double pointers, function pointers, void pointers, and reading complex C declarations.",
    keyPoints: [
      "Scaling rule: ptr + k computes address as (ptr address) + k multiplied by sizeof(element type). Pointer subtraction gives element count not byte count.",
      "Operator precedence: *p++ dereferences then advances the pointer. (*p)++ increments the value stored. *++p advances then dereferences.",
      "int *arr[10] is an array of 10 integer pointers. int (*arr)[10] is a single pointer to an array of 10 integers.",
      "Function pointer: int (*fp)(int, int); assigns fp = add; call as fp(2,3). Used for callbacks and dispatch tables.",
      "void pointer can hold any address but cannot be dereferenced or used in arithmetic without an explicit typecast."
    ],
    bookmarked: true,
  },
  {
    id: "n1_5",
    subject: "#1 PDS",
    title: "Arrays, 2-D Memory Mapping and String Handling",
    content: "Row-Major vs Column-Major address formulas, array-pointer equivalence, string literals vs char arrays, strlen vs sizeof.",
    keyPoints: [
      "Array equivalence: arr[i] equals *(arr+i) and i[arr]. For 2-D arrays: arr[i][j] equals *(*(arr+i)+j).",
      "Row-Major address: Base + [(i minus LBR) times C plus (j minus LBC)] times ElementSize where C is the number of columns.",
      "Column-Major address: Base + [(j minus LBC) times R plus (i minus LBR)] times ElementSize where R is the number of rows.",
      "char pointer to literal points to read-only text segment. Modifying it causes segfault. char array copies literal to mutable stack memory.",
      "strlen counts characters before the null terminator. sizeof on a char array includes the null terminator byte in its total."
    ],
    bookmarked: true,
  },
  {
    id: "n1_6",
    subject: "#1 PDS",
    title: "Structures, Padding, Unions and Dynamic Memory",
    content: "Struct memory layout, alignment padding rules, bit-fields, union memory sharing model, and malloc/calloc/realloc/free lifecycle.",
    keyPoints: [
      "Alignment rule: each member offset must be a multiple of its own sizeof. Total struct size rounds up to the largest member size.",
      "Bit-fields pack bits within integer boundaries. You cannot take the address of a bit-field member.",
      "Union: all members share the same base address. sizeof a union equals the largest member size rounded to its alignment.",
      "malloc returns uninitialized memory. calloc zero-initializes. realloc may move the block to a new address if resizing.",
      "After free the pointer is dangling and dereferencing it is undefined behaviour. Always assign NULL to the pointer after calling free."
    ],
    bookmarked: true,
  },
  {
    id: "n1_7",
    subject: "#1 PDS",
    title: "Linked Lists, Stacks, Queues and Binary Tree Identities",
    content: "Floyd cycle detection, Catalan stack permutations, circular queue arithmetic, and key binary tree structural formulas.",
    keyPoints: [
      "Floyd cycle detection: slow pointer moves 1 step, fast pointer moves 2 steps. If they meet, a cycle exists.",
      "Valid push-pop orderings of n elements equals Catalan number C(n) = (2n)! divided by ((n+1)! times n!).",
      "Circular queue of size N holds at most N-1 elements. Full condition: (rear + 1) mod N equals front.",
      "Binary tree identity: leaf count n0 equals degree-2 node count n2 plus 1. Null pointer count equals n plus 1.",
      "Unique tree reconstruction requires Inorder plus either Preorder or Postorder. Preorder plus Postorder alone is not sufficient."
    ],
    bookmarked: true,
  },
  {
    id: "n1_8",
    subject: "#1 PDS",
    title: "BST, AVL Trees, Heaps and Hashing Formulas",
    content: "BST operations, AVL rotation cases and height bounds, heap array indexing, build-heap complexity, and hashing theory.",
    keyPoints: [
      "BST inorder traversal yields elements in sorted ascending order. Search and Insert operations are O(h).",
      "AVL balance factor must be in the set {-1, 0, +1}. Min nodes N(h) = N(h-1) + N(h-2) + 1 with N(0)=1, N(1)=2. Max height <= 1.44 times log2(n).",
      "Heap array indexing (0-based): parent index is (i-1)/2, left child is 2i+1, right child is 2i+2. Build-Heap is O(n).",
      "Heap Insert: add at tail then sift-up in O(log n). Extract-Min: replace root with last element then sift-down in O(log n).",
      "Separate chaining expected search time is O(1 + lambda). Linear probing causes primary clustering. Quadratic probing causes secondary clustering."
    ],
    bookmarked: true,
  },
  {
    id: "n2",
    subject: "#2 Algo",
    title: "Asymptotic Analysis, Sorting and Graph Algorithms",
    content: "Master theorem cases, sorting complexities, shortest path algorithms and MST algorithm comparison.",
    keyPoints: [
      "Master Theorem T(n) = aT(n/b) + f(n): compare f(n) with n raised to log base b of a to find the theta bound.",
      "Dijkstra O((V+E) log V): works only for non-negative weights. Bellman-Ford O(V times E): handles negative weights and detects negative cycles.",
      "Floyd-Warshall O(V cubed): computes all-pairs shortest paths. Handles negative weights but not negative cycles.",
      "Prim with priority queue O(E log V) suits dense graphs. Kruskal with Union-Find O(E log E) suits sparse graphs. Both produce a minimum spanning tree.",
      "DP requires overlapping subproblems and optimal substructure. Greedy requires that locally optimal choices lead to a globally optimal solution."
    ],
    bookmarked: true,
  },
  {
    id: "n3",
    subject: "#3 DL",
    title: "Boolean Algebra, K-Maps, Gates and Sequential Circuits",
    content: "SOP and POS canonical forms, K-map prime implicants, universal gates, MUX-based logic, and flip-flop excitation equations.",
    keyPoints: [
      "NAND and NOR are universal gates. NAND implementations: NOT needs 1 gate, AND needs 2, OR needs 3, XOR needs 4.",
      "A 2^n to 1 MUX can implement any boolean function of (n+1) variables without additional gates.",
      "Flip-flop characteristic equations: JK: Q+ = J times Qbar + Kbar times Q. D: Q+ = D. T: Q+ = T XOR Q.",
      "Mod-N ripple counter needs ceil(log2 N) flip-flops. Output frequency equals input frequency divided by N.",
      "K-map grouping: all group sizes must be powers of 2. Always choose the largest possible prime implicant groups."
    ],
    bookmarked: false,
  },
  {
    id: "n4",
    subject: "#4 COA",
    title: "Pipelining, Cache Mapping and Memory Performance",
    content: "Pipeline speedup formula, hazard types and resolution, cache address partitioning, and EMAT derivation.",
    keyPoints: [
      "Pipeline Speedup = (n times k) / (k + n - 1 + stalls). CPI = 1 + stalls divided by n. Ideal max speedup approaches k as n grows.",
      "RAW hazard: data forwarding eliminates execute-to-execute stalls but a load-use hazard still requires 1 stall cycle.",
      "Cache address partitioning: Total address bits = Tag bits + Set Index bits + Block Offset bits.",
      "Simultaneous access EMAT = h times Tc + (1-h) times Tm. Hierarchical EMAT = Tc + (1-h) times Tm.",
      "Belady anomaly: FIFO page replacement can give more page faults with more frames. LRU and OPT are immune to Belady anomaly."
    ],
    bookmarked: true,
  },
  {
    id: "n5",
    subject: "#5 CN",
    title: "Sliding Windows, TCP Congestion Control and Subnetting",
    content: "Link utilisation efficiency formulas, window protocol comparison, TCP congestion phases, and CIDR subnetting.",
    keyPoints: [
      "Stop-and-Wait efficiency = 1 divided by (1 + 2a) where a equals propagation delay divided by transmission delay.",
      "Go-Back-N: sender window = N, requires at least N+1 sequence numbers. Selective Repeat: each side window = 2 raised to (k-1).",
      "Usable hosts per subnet = 2 raised to (32 minus prefix) minus 2. Exception: /31 for point-to-point links per RFC 3021.",
      "TCP Slow Start: cwnd doubles each RTT. After ssthresh threshold: linear increase of 1 MSS per RTT. On timeout: ssthresh = cwnd/2 and cwnd resets to 1.",
      "TCP is full-duplex, reliable, byte-stream, and connection-oriented. UDP is connectionless and unreliable but has low overhead."
    ],
    bookmarked: false,
  },
  {
    id: "n6",
    subject: "#6 OS",
    title: "Semaphores, Deadlock, CPU Scheduling and Paging",
    content: "Semaphore semantics, deadlock conditions, Banker algorithm, scheduling algorithm comparison, and paging EMAT.",
    keyPoints: [
      "Semaphore Wait(S): S decrements; block if S < 0. Signal(S): S increments; wake a process if S <= 0. The magnitude of negative S equals the number of blocked processes.",
      "Deadlock requires all 4 conditions: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Removing any one prevents deadlock.",
      "Banker algorithm safety check: Need = Max minus Allocation. Simulate granting resources to processes whose Need <= Available, then reclaim their Allocation.",
      "Page Table Size = (Virtual Address Space / Page Size) times bytes per Page Table Entry.",
      "EMAT with TLB: h times (t_TLB + t_mem) + (1-h) times (t_TLB + (k+1) times t_mem) for a k-level page table."
    ],
    bookmarked: true,
  },
  {
    id: "n7",
    subject: "#7 DBMS",
    title: "Normalization, FDs, Relational Algebra and Transactions",
    content: "Normal forms 1NF to BCNF, functional dependency closure, conflict serializability, and 2-Phase Locking.",
    keyPoints: [
      "2NF: No partial dependency. No non-prime attribute may depend on a proper subset of any candidate key.",
      "3NF: For every X to A, either X is a superkey OR A is a prime attribute.",
      "BCNF: For every non-trivial X to A, X must be a superkey. Stricter than 3NF and may not preserve all functional dependencies.",
      "A schedule is conflict serializable if and only if its Precedence Graph contains no directed cycle.",
      "Strict 2PL holds all exclusive locks until commit or abort. This prevents cascading rollbacks."
    ],
    bookmarked: false,
  },
  {
    id: "n8",
    subject: "#8 TOC",
    title: "Automata, Language Hierarchy and Decidability",
    content: "DFA and NFA equivalence, language hierarchy closure properties, pumping lemmas, and decidability chart.",
    keyPoints: [
      "DFA and NFA are equally expressive. An NFA with n states may require up to 2 raised to n states after subset construction to DFA.",
      "Regular languages are closed under union, intersection, complement, concatenation, Kleene star, and reversal.",
      "CFLs are closed under union, concatenation, and Kleene star. NOT closed under intersection or complement.",
      "Emptiness is decidable for Regular and CFL languages. Undecidable for CSL and Turing Machine languages.",
      "Rice Theorem: any non-trivial semantic property of Turing Machine languages is undecidable."
    ],
    bookmarked: true,
  },
  {
    id: "n9",
    subject: "#9 CD",
    title: "Lexing, Parsing, FIRST and FOLLOW Sets and SDT",
    content: "FIRST and FOLLOW computation, LL(1) grammar conditions, LR parser hierarchy, and attribute grammar types.",
    keyPoints: [
      "LL(1) condition: for A producing alpha or beta, their FIRST sets must be disjoint. If alpha can derive epsilon then FIRST of beta and FOLLOW of A must be disjoint.",
      "Parser power ordering: LR(0) < SLR(1) < LALR(1) < CLR(1). More lookahead reduces the number of conflicts.",
      "LALR(1) merging can create Reduce-Reduce conflicts but can NEVER create new Shift-Reduce conflicts.",
      "S-attributed definitions use only synthesized attributes and are evaluated bottom-up during LR parsing.",
      "Maximal munch rule: the lexer always selects the longest possible token. Reserved keywords take precedence over identifiers."
    ],
    bookmarked: false,
  },
  {
    id: "n10",
    subject: "#10 Maths",
    title: "Linear Algebra, Probability, Combinatorics and Graph Theory",
    content: "Eigenvalues and eigenvectors, Bayes theorem, probability distributions, combinatorics, and planar graph formulas.",
    keyPoints: [
      "Eigenvalues: their sum equals Trace(A) and their product equals det(A). Eigenvalues of a triangular matrix equal the diagonal elements.",
      "Bayes Theorem: P(A|B) = P(B|A) times P(A) divided by P(B).",
      "Poisson distribution: P(X=k) = lambda raised to k times e to the negative lambda divided by k factorial. Mean equals Variance equals lambda.",
      "Euler formula for connected planar graphs: V minus E plus R equals 2. Max edges: E <= 3V minus 6. For bipartite: E <= 2V minus 4.",
      "Handshaking lemma: sum of all vertex degrees equals 2 times E. The number of odd-degree vertices is always even."
    ],
    bookmarked: true,
  },
  {
    id: "n11",
    subject: "#11 Apti",
    title: "Quantitative, Logical and Verbal Reasoning Shortcuts",
    content: "Speed-distance-time, work-rate, profit-loss, permutation and combination tricks, and syllogism rules.",
    keyPoints: [
      "Combined work rate: if A takes X days and B takes Y days, together they finish in (X times Y) divided by (X plus Y) days.",
      "Relative speed in opposite directions: add the speeds. Same direction: take the absolute difference. Convert km/h to m/s by multiplying by 5/18.",
      "Percentage trap: increasing by x percent then decreasing by x percent gives a net decrease of x squared divided by 100 percent.",
      "Syllogism: two negative premises yield NO definite conclusion. All A are B plus All B are C implies All A are C.",
      "Circular arrangements of n distinct objects: (n minus 1) factorial distinct arrangements."
    ],
    bookmarked: false,
  }
];

export const DEMO_FORMULAS: Formula[] = [
  {
    id: "f1_1",
    subject: "#1 PDS",
    name: "Row-Major 2D Array Address",
    formula: "Addr(A[i][j]) = Base + [(i - LBR) * C + (j - LBC)] * ElementSize",
    explanation: "C = total columns. LBR and LBC are lower bounds. C stores 2D arrays row-by-row.",
    example: "A[0..4][0..9], Base=1000, 4 bytes each: Addr(A[3][5]) = 1000 + [3*10+5]*4 = 1260.",
  },
  {
    id: "f1_2",
    subject: "#1 PDS",
    name: "Column-Major 2D Array Address",
    formula: "Addr(A[i][j]) = Base + [(j - LBC) * R + (i - LBR)] * ElementSize",
    explanation: "R = total rows. Column-major stores arrays column-by-column. Used in Fortran and MATLAB.",
    example: "A[0..9][0..4], Base=1000, 4 bytes each: Addr(A[3][5]) = 1000 + [5*10+3]*4 = 1212.",
  },
  {
    id: "f1_3",
    subject: "#1 PDS",
    name: "Structure Alignment and Padding Rule",
    formula: "Offset(member_i) mod sizeof(member_i) == 0  AND  Total mod MaxMemberSize == 0",
    explanation: "Each member starts at an offset divisible by its own size. Total struct size rounds up to the largest member size.",
    example: "struct {char a; int b; short c;}: 1+3pad+4+2+2pad = 12 bytes total (aligned to 4).",
  },
  {
    id: "f1_4",
    subject: "#1 PDS",
    name: "AVL Tree Minimum Nodes Recurrence",
    formula: "N(h) = N(h-1) + N(h-2) + 1  where N(0)=1 and N(1)=2",
    explanation: "N(h) is the minimum number of nodes needed for an AVL tree of height h. Maximum height for n nodes is at most 1.44 times log2(n+2).",
    example: "N(2)=4, N(3)=7, N(4)=12. An AVL tree of height 4 requires at least 12 nodes.",
  },
  {
    id: "f1_5",
    subject: "#1 PDS",
    name: "Catalan Number for BSTs and Stack Permutations",
    formula: "C(n) = (1/(n+1)) * C(2n,n) = (2n)! / ((n+1)! * n!)",
    explanation: "Counts distinct BST shapes for n keys, valid push-pop sequences of n elements, and balanced bracket pair arrangements.",
    example: "C(3) = 5. Three distinct keys have 5 possible BST shapes and 5 valid pop orderings.",
  },
  {
    id: "f2",
    subject: "#2 Algo",
    name: "Master Theorem Extended Form",
    formula: "T(n) = aT(n/b) + Theta(n^k * log^p n)  with  c = log_b(a)",
    explanation: "c > k: Theta(n^c). c == k and p > -1: Theta(n^k log^(p+1) n). c < k and p >= 0: Theta(n^k log^p n).",
    example: "Merge Sort T(n)=2T(n/2)+n: a=2, b=2, k=1, p=0, c=1=k => Theta(n log n).",
  },
  {
    id: "f3",
    subject: "#3 DL",
    name: "Self-Dual Boolean Function Count",
    formula: "Self-dual functions of n variables = 2^(2^(n-1))",
    explanation: "Dual swaps AND with OR and 0 with 1. A self-dual function equals its own dual. Out of 2^(2^n) total n-variable functions.",
    example: "n=3: Total functions = 256. Self-dual count = 2^4 = 16 functions.",
  },
  {
    id: "f4",
    subject: "#4 COA",
    name: "Pipeline Speedup with Hazard Stalls",
    formula: "Speedup = (n * k) / (k + n - 1 + Stalls)",
    explanation: "n = instruction count, k = pipeline stages. Ideal CPI = 1. Actual CPI = 1 + Stalls/n. Max speedup equals k as n grows.",
    example: "k=5, n=1000, stalls=200: Speedup = 5000 / 1204 = 4.15x.",
  },
  {
    id: "f5",
    subject: "#5 CN",
    name: "Sliding Window Link Utilisation",
    formula: "Efficiency = W / (1 + 2a)  where  a = Tp / Tt",
    explanation: "W = window size, a = propagation to transmission delay ratio. Need W >= 1+2a for 100 percent utilisation.",
    example: "Tp=49.5ms, Tt=1ms, a=49.5, W=100: Efficiency = 100/100 = 100 percent. Stop-and-Wait W=1: 1 percent.",
  },
  {
    id: "f6",
    subject: "#6 OS",
    name: "TLB plus Multi-Level Paging EMAT",
    formula: "EMAT = h*(t_TLB + t_mem) + (1-h)*(t_TLB + (k+1)*t_mem)",
    explanation: "h = TLB hit ratio, k = page table levels. TLB hit costs 1 TLB plus 1 RAM. Miss costs 1 TLB plus k page table accesses plus 1 data access.",
    example: "h=0.9, TLB=10ns, RAM=80ns, k=2: EMAT = 0.9*90 + 0.1*250 = 81+25 = 106 ns.",
  },
  {
    id: "f7",
    subject: "#7 DBMS",
    name: "B+ Tree Internal Node Order",
    formula: "p * PtrSize + (p-1) * KeySize <= BlockSize",
    explanation: "p = tree order (max child pointers per internal node). Solve for p to find the maximum fan-out.",
    example: "Block=512B, Ptr=6B, Key=8B: 14p - 8 <= 512 => p = 37. Max 36 keys per internal node.",
  },
  {
    id: "f8",
    subject: "#8 TOC",
    name: "Pumping Lemma for Regular Languages",
    formula: "s = xyz  with  |xy| <= p, |y| >= 1, xy^i z in L for all i >= 0",
    explanation: "If L is regular there exists a pumping length p. Strings longer than p can be pumped. Contrapositive proves non-regularity.",
    example: "L = {0^n 1^n}: s = 0^p 1^p, y contains only 0s. Pumping i=2 produces too many 0s so s is not in L meaning L is not regular.",
  },
  {
    id: "f9",
    subject: "#9 CD",
    name: "LR Parser State Count Relationship",
    formula: "State count: LR(0) == SLR(1) == LALR(1) <= CLR(1)",
    explanation: "LR(0), SLR(1) and LALR(1) share the same canonical LR(0) item sets. CLR(1) splits states by lookahead giving more states.",
    example: "Grammar with 12 LR(0) states gives 12 LALR(1) states and typically 18 to 24 CLR(1) states.",
  },
  {
    id: "f10",
    subject: "#10 Maths",
    name: "Planar Graph Euler Formula",
    formula: "V - E + R = 2  with  E <= 3V-6  and  E <= 2V-4 for bipartite graphs",
    explanation: "V = vertices, E = edges, R = faces including the outer face. Violating these bounds proves a graph is non-planar.",
    example: "K5: V=5, E=10. Limit = 9. E > 9 so K5 is non-planar. K3,3: bipartite limit = 8. E=9 > 8 so K3,3 is non-planar.",
  },
  {
    id: "f11",
    subject: "#11 Apti",
    name: "Train Crossing Time Formula",
    formula: "Time = (L1+L2) / (S1+S2) for opposite directions  or  (L1+L2) / |S1-S2| for same direction",
    explanation: "Distance covered when two trains pass equals the sum of both lengths. Convert km/h to m/s by multiplying by 5 divided by 18.",
    example: "Train A 150m at 15 m/s and Train B 100m at 10 m/s in opposite directions: Time = 250/25 = 10 seconds.",
  }
];

export const DEMO_TRAPS: Trap[] = [
  {
    id: "t1_1",
    subject: "#1 PDS",
    trap: "*p++ vs (*p)++ \u2014 Postfix Precedence Trap",
    misconception: "Thinking that *p++ increments the integer value stored at address p.",
    correctApproach: "Postfix ++ binds tighter than unary *. So *p++ dereferences the current address then advances the pointer. To increment the value write (*p)++.",
  },
  {
    id: "t1_2",
    subject: "#1 PDS",
    trap: "Short-Circuit OR Skips the Second Operand Side Effects",
    misconception: "In the expression (a++ or b++) assuming both a and b always increment.",
    correctApproach: "If a was 1 then a++ yields 1 (true) and the OR short-circuits. b++ is never executed and b stays unchanged.",
  },
  {
    id: "t1_3",
    subject: "#1 PDS",
    trap: "Macro Without Parentheses Causes Wrong Expansion",
    misconception: "Writing SQUARE(x) as x*x and expecting SQUARE(2+3) to produce 25.",
    correctApproach: "Textual substitution gives 2+3*2+3 which equals 11. Always write SQUARE(x) as ((x)*(x)) to guard arguments and the result.",
  },
  {
    id: "t1_4",
    subject: "#1 PDS",
    trap: "sizeof Array Parameter Returns Pointer Size Inside Function",
    misconception: "Believing sizeof(arr) inside void f(int arr[10]) returns 40 bytes.",
    correctApproach: "Array parameters decay to pointers immediately. sizeof(arr) inside the function equals sizeof(int*) which is 4 or 8 bytes.",
  },
  {
    id: "t1_5",
    subject: "#1 PDS",
    trap: "Writing to a String Literal via a char Pointer",
    misconception: "Expecting s[0] assignment to work when s is a char pointer to a string literal.",
    correctApproach: "String literals are in the read-only text segment. Writing through the pointer is undefined behaviour and causes a segfault. Use char s[] for a mutable stack copy.",
  },
  {
    id: "t1_6",
    subject: "#1 PDS",
    trap: "Static Local Variable Reinitializes on Every Recursive Call",
    misconception: "Assuming static int count = 0 resets to zero on each recursive invocation.",
    correctApproach: "Static local variables are initialized exactly once at program startup. All recursive frames share ONE memory location so increments accumulate globally.",
  },
  {
    id: "t2",
    subject: "#2 Algo",
    trap: "Applying Master Theorem to a Non-Polynomial Difference",
    misconception: "Using Master Theorem on T(n) = 2T(n/2) + n/log n.",
    correctApproach: "Master Theorem requires a polynomial difference. For f(n) = n/log n use the extended case where p = -1 giving Theta(n log log n).",
  },
  {
    id: "t3",
    subject: "#3 DL",
    trap: "Race-Around Condition Occurs With a Short Clock Pulse",
    misconception: "Believing race-around in JK flip-flop happens when the clock pulse is very short.",
    correctApproach: "Race-around occurs when J=K=1 and clock pulse width exceeds the flip-flop propagation delay in a level-triggered design. Fix: use edge-triggered or master-slave configuration.",
  },
  {
    id: "t4",
    subject: "#4 COA",
    trap: "Branch Penalty Is Always 1 Pipeline Stall",
    misconception: "Assuming every branch always causes exactly 1 stall cycle.",
    correctApproach: "Branch penalty equals stages between Fetch and the stage that resolves the branch. ID resolution: 1 stall. EX: 2 stalls. MEM: 3 stalls.",
  },
  {
    id: "t5",
    subject: "#5 CN",
    trap: "Always Subtract 2 Hosts From Every Subnet",
    misconception: "Subtracting 2 from usable hosts even for a /31 point-to-point subnet.",
    correctApproach: "RFC 3021 allows /31 subnets for point-to-point links where both addresses are usable. Standard subnets subtract 2. Read the question carefully.",
  },
  {
    id: "t6",
    subject: "#6 OS",
    trap: "A Cycle in the Resource Allocation Graph Always Means Deadlock",
    misconception: "Assuming any cycle in a Resource Allocation Graph guarantees a deadlock.",
    correctApproach: "Cycle is necessary AND sufficient only when every resource type has exactly one instance. With multiple instances a cycle is necessary but not sufficient.",
  },
  {
    id: "t7",
    subject: "#7 DBMS",
    trap: "COUNT(*) and COUNT(col) Give the Same Result",
    misconception: "Believing COUNT(*) and COUNT(col) produce identical counts on tables with NULL values.",
    correctApproach: "COUNT(*) counts every row. COUNT(col) skips rows where col IS NULL. Also NULL = NULL evaluates to UNKNOWN not TRUE so use IS NULL for null checks.",
  },
  {
    id: "t8",
    subject: "#8 TOC",
    trap: "CFLs Are Closed Under Intersection and Complement",
    misconception: "Assuming Context-Free Languages are closed under both intersection and complementation like regular languages.",
    correctApproach: "CFLs are NOT closed under intersection or complement. Deterministic CFLs ARE closed under complement.",
  },
  {
    id: "t9",
    subject: "#9 CD",
    trap: "LALR(1) State Merging Creates Shift-Reduce Conflicts",
    misconception: "Thinking that merging LR(1) states in LALR(1) construction can introduce new Shift-Reduce conflicts.",
    correctApproach: "Merging can NEVER create new Shift-Reduce conflicts because shift actions depend only on the LR(0) core. Merging CAN create Reduce-Reduce conflicts when lookaheads overlap.",
  },
  {
    id: "t10",
    subject: "#10 Maths",
    trap: "Eigenvalues Are Defined for Non-Square Matrices",
    misconception: "Trying to compute eigenvalues or determinant for a rectangular m-by-n matrix where m differs from n.",
    correctApproach: "Eigenvalues and determinants are defined ONLY for square matrices. Use Singular Value Decomposition and singular values for rectangular matrices.",
  },
  {
    id: "t11",
    subject: "#11 Apti",
    trap: "Using Arithmetic Mean Instead of Harmonic Mean for Average Speed",
    misconception: "Computing average speed as (S1+S2)/2 when traveling equal distances at two different speeds.",
    correctApproach: "When distances are equal the correct average speed is the Harmonic Mean: (2*S1*S2)/(S1+S2). Arithmetic mean applies only when equal time is spent at each speed.",
  }
];