export interface DailyScheduleItem {
  day: number;
  subjectCode: string;
  subjectName: string;
  subjectOrder: number;
  phase: string;
  topicTitle: string;
  subtopics: string[];
  estimatedHours: number;
  highYieldPoints: string[];
  tasks: {
    id: string;
    label: string;
    completed: boolean;
  }[];
}

export const GATE_125_DAY_SCHEDULE: DailyScheduleItem[] = [
  {
    "day": 1,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "C Pointers, Pointer Arithmetic & Dynamic Memory",
    "subtopics": [
      "Pointers & dereferencing",
      "Pointer arithmetic & sizeof",
      "malloc, calloc, realloc, free",
      "Dangling pointers & memory leaks"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "ptr + i increments by sizeof(*ptr)*i bytes.",
      "(*ptr)++ increments value, *ptr++ increments address."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for C Pointers, Pointer Arithmetic & Dynamic Memory",
        "completed": true
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 2,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Functions, Recursion Call Stack & Parameter Passing",
    "subtopics": [
      "Pass by value vs reference",
      "Activation records & stack frames",
      "Tail recursion & call trees",
      "Static variables in recursion"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "C is strictly pass-by-value.",
      "Static local variables retain values across recursive invocations."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Functions, Recursion Call Stack & Parameter Passing",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 3,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Arrays, Row-Major / Column-Major Mapping & Structs",
    "subtopics": [
      "1D/2D arrays memory indexing",
      "Row-Major vs Column-Major formulas",
      "Pointer decay in multi-arrays",
      "Structure padding & alignment"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Row-Major: Base + ((i-LBR)*C + (j-LBC))*size",
      "Column-Major: Base + ((j-LBC)*R + (i-LBR))*size"
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Arrays, Row-Major / Column-Major Mapping & Structs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 4,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Linked Lists (Singly, Doubly, Circular & Fast/Slow)",
    "subtopics": [
      "Singly/Doubly insertions & deletions",
      "In-place reversal with 3 pointers",
      "Floyd cycle detection algorithm",
      "Finding middle node in O(n)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Floyd algorithm: slow moves 1, fast moves 2.",
      "Deletion given pointer takes O(1) by copying next node."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Linked Lists (Singly, Doubly, Circular & Fast/Slow)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 5,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Stacks, Infix / Postfix / Prefix & Expression Evaluation",
    "subtopics": [
      "Stack implementations",
      "Infix to Postfix precedence conversion",
      "Postfix evaluation algorithm",
      "Balanced parentheses matching"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Valid stack permutations for n pushes = Catalan number C(n)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Stacks, Infix / Postfix / Prefix & Expression Evaluation",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 6,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Queues, Circular Queues, Deque & Priority Queues",
    "subtopics": [
      "Circular queue modulo arithmetic",
      "Full condition (Rear+1)%N == Front",
      "Deque input/output restricted",
      "Queue using two stacks"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Circular queue of size N holds at most N-1 elements."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Queues, Circular Queues, Deque & Priority Queues",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 7,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Binary Trees, Strict/Complete/Full & Tree Traversals",
    "subtopics": [
      "Full, Complete, Perfect binary trees",
      "Inorder, Preorder, Postorder traversals",
      "Unique reconstruction (Inorder mandatory)",
      "Null pointer count = n + 1"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In any non-empty binary tree: n0 = n2 + 1."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Binary Trees, Strict/Complete/Full & Tree Traversals",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 8,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Binary Search Trees (BST), Insertion, Deletion & Search",
    "subtopics": [
      "BST property & sorted inorder traversal",
      "Insertion and search O(h)",
      "BST Deletion 0/1/2 child cases",
      "Distinct BSTs for n keys = Catalan C(n)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Inorder traversal of BST always produces sorted ascending order."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Binary Search Trees (BST), Insertion, Deletion & Search",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 9,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "AVL Trees, Balance Factors, Rotations & Height Bounds",
    "subtopics": [
      "Balance factor BF in {-1, 0, +1}",
      "LL, RR, LR, RL single/double rotations",
      "Min nodes N(h)=N(h-1)+N(h-2)+1",
      "Max height h <= 1.44*log2(n)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "After insertion, only lowest unbalanced node needs rotation."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for AVL Trees, Balance Factors, Rotations & Height Bounds",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 10,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Binary Heaps (Min/Max), Heapify & Priority Queue",
    "subtopics": [
      "Array indexing: Left=2i+1, Right=2i+2",
      "Build-Heap in linear O(n) time",
      "Insert & Extract-Max in O(log n)",
      "K-th largest element using min-heap"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Building a heap takes O(n) time, not O(n log n)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Binary Heaps (Min/Max), Heapify & Priority Queue",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 11,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Hashing, Hash Functions & Collision Resolution",
    "subtopics": [
      "Division & multiplication hash methods",
      "Separate Chaining & load factor lambda",
      "Open addressing: Linear/Quadratic/Double",
      "Clustering phenomena"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Separate Chaining expected search time is O(1 + lambda)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Hashing, Hash Functions & Collision Resolution",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 12,
    "subjectCode": "PDS",
    "subjectName": "#1 Programming & Data Structures",
    "subjectOrder": 1,
    "phase": "Phase 1: Foundations & Core Data Structures",
    "topicTitle": "Subject #1 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive PDS review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test",
      "Error log entry"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all PDS trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #1 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 13,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Asymptotic Notations & Function Rankings",
    "subtopics": [
      "O, Omega, Theta, o, omega definitions",
      "Transitivity & symmetry properties",
      "Standard growth rate hierarchy"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "log(n!) = Theta(n log n) by Stirling approximation."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Asymptotic Notations & Function Rankings",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 14,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Recurrences, Master Theorem & Substitution",
    "subtopics": [
      "Master theorem 3 cases & extensions",
      "Recursion tree analysis",
      "Variable substitution technique"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Master theorem requires polynomial difference."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Recurrences, Master Theorem & Substitution",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 15,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Divide & Conquer: Merge Sort & Quick Sort",
    "subtopics": [
      "Merge Sort O(n log n) stable",
      "Quick Sort best/worst case",
      "Binary Search invariants"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Merge sort is stable; Quick sort and Heap sort are not."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Divide & Conquer: Merge Sort & Quick Sort",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 16,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Linear Sorting & Comparison Lower Bound",
    "subtopics": [
      "Omega(n log n) decision tree bound",
      "Counting Sort O(n+k)",
      "Radix & Bucket Sort"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Comparison sorting requires at least Omega(n log n) comparisons."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Linear Sorting & Comparison Lower Bound",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 17,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Greedy Strategy: Knapsack, Activity Selection & Huffman",
    "subtopics": [
      "Fractional Knapsack ratio sorting",
      "Activity selection by finish time",
      "Huffman prefix-free codes"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Huffman tree creates 2n-1 total nodes for n symbols."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Greedy Strategy: Knapsack, Activity Selection & Huffman",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 18,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Dynamic Programming: 0/1 Knapsack, LCS & MCM",
    "subtopics": [
      "0/1 Knapsack O(nW) pseudo-polynomial",
      "LCS table recurrence O(mn)",
      "Matrix Chain Catalan counts"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Matrix parenthesizations = Catalan number C(n-1)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Dynamic Programming: 0/1 Knapsack, LCS & MCM",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 19,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Dynamic Programming: OBST, Subsets & Floyd-Warshall",
    "subtopics": [
      "Optimal BST recurrence",
      "Subset Sum problem",
      "Floyd-Warshall all-pairs shortest paths O(V^3)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Floyd-Warshall detects negative cycles when diagonal d[i][i] < 0."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Dynamic Programming: OBST, Subsets & Floyd-Warshall",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 20,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Graph Traversal: BFS, DFS & Topological Sorting",
    "subtopics": [
      "BFS queue shortest paths",
      "DFS timestamps & edge types",
      "DAG Topological sorting"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Directed graph has a cycle iff DFS produces a Back edge."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Graph Traversal: BFS, DFS & Topological Sorting",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 21,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Minimum Spanning Trees: Prim and Kruskal with DSU",
    "subtopics": [
      "Prim min-heap O(E log V)",
      "Kruskal with DSU union by rank",
      "MST uniqueness property"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "If all edge weights are distinct, MST is strictly unique."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Minimum Spanning Trees: Prim and Kruskal with DSU",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 22,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Single-Source Shortest Paths: Dijkstra & Bellman-Ford",
    "subtopics": [
      "Dijkstra non-negative weights",
      "Bellman-Ford V-1 passes",
      "Negative cycle detection"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Dijkstra fails on negative weights; Bellman-Ford detects negative cycles."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Single-Source Shortest Paths: Dijkstra & Bellman-Ford",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 23,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Complexity Classes: P, NP, NP-Complete & Reductions",
    "subtopics": [
      "P vs NP polynomial verification",
      "Polynomial time reductions A <=p B",
      "Canonical NP-complete problems"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "If any NP-complete problem is in P, then P = NP."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Complexity Classes: P, NP, NP-Complete & Reductions",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 24,
    "subjectCode": "Algo",
    "subjectName": "#2 Algorithms",
    "subjectOrder": 2,
    "phase": "Phase 2: Algorithms & Complexity Analysis",
    "topicTitle": "Subject #2 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive Algo review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review Master theorem non-applicability cases before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #2 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 25,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Number Systems, Complements & Fixed/Floating Point",
    "subtopics": [
      "Radix conversions",
      "1s/2s complement range & overflow",
      "IEEE 754 32/64-bit float formats"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Range of n-bit 2s complement: -2^(n-1) to +(2^(n-1) - 1)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Number Systems, Complements & Fixed/Floating Point",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 26,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Boolean Algebra, Universal Gates & Self-Dual Functions",
    "subtopics": [
      "Boolean postulates & De Morgan laws",
      "NAND/NOR minimal gate counts",
      "Self-dual count 2^(2^(n-1))"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Minimal NAND gates: NOT=1, AND=2, OR=3, XOR=4, XNOR=5."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Boolean Algebra, Universal Gates & Self-Dual Functions",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 27,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Karnaugh Maps (K-Maps), Implicants & Minimization",
    "subtopics": [
      "Gray code ordering",
      "Prime & Essential Prime Implicants",
      "Don\t Care conditions & hazards"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Essential prime implicants cover at least one unique minterm."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Karnaugh Maps (K-Maps), Implicants & Minimization",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 28,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Combinational Circuits: Adders & Carry Lookahead",
    "subtopics": [
      "Half/Full Adders",
      "Ripple carry delay",
      "Carry Lookahead Adder generate/propagate"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Carry lookahead adder computes all carry bits in O(1) time."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Combinational Circuits: Adders & Carry Lookahead",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 29,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Decoders, Encoders & Priority Encoders",
    "subtopics": [
      "n-to-2^n decoders with enable",
      "Decoder cascading",
      "Priority encoders with valid bit"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Decoder units = 2^(N-n) + control units."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Decoders, Encoders & Priority Encoders",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 30,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Multiplexers (MUX) as Universal Logic Generators",
    "subtopics": [
      "2:1, 4:1, 8:1 Multiplexers",
      "Implementing n+1 variable functions",
      "MUX cascading tree"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "2^n to 1 MUX can implement any function of n+1 variables."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Multiplexers (MUX) as Universal Logic Generators",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 31,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Sequential Circuits: Latches, Flip-Flops & Conversions",
    "subtopics": [
      "SR, JK, D, T flip-flops",
      "Characteristic equations",
      "Excitation table conversions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Setup time is before clock edge; Hold time is after clock edge."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Sequential Circuits: Latches, Flip-Flops & Conversions",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 32,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Race Around Condition & Master-Slave Flip-Flops",
    "subtopics": [
      "Race around condition root cause",
      "Master-Slave JK clock inversion",
      "Max clock frequency equations"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Clock period T_clk >= t_FF + t_comb + t_setup."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Race Around Condition & Master-Slave Flip-Flops",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 33,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Counters: Synchronous, Ripple, Ring & Johnson Counters",
    "subtopics": [
      "Asynchronous ripple delay",
      "Mod-N synchronous design",
      "Ring (N states) vs Johnson (2N states)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "n-bit Johnson counter provides 2n states with N flip-flops."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Counters: Synchronous, Ripple, Ring & Johnson Counters",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 34,
    "subjectCode": "DL",
    "subjectName": "#3 Digital Logic",
    "subjectOrder": 3,
    "phase": "Phase 3: Digital Logic & Hardware Circuits",
    "topicTitle": "Subject #3 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive DL review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review DL trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #3 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 35,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Machine Instructions, Formats & Opcode Expansion",
    "subtopics": [
      "0/1/2/3-address formats",
      "Expanding opcode capacity",
      "Instruction cycle stages"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Expanding opcode: Free opcodes * 2^(bits) = next capacity."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Machine Instructions, Formats & Opcode Expansion",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 36,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Addressing Modes (Immediate, Direct, Relative, Indexed)",
    "subtopics": [
      "Addressing classifications",
      "PC-Relative & Base Register",
      "Effective address formulas"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "PC-relative addressing facilitates position-independent code."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Addressing Modes (Immediate, Direct, Relative, Indexed)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 37,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "ALU, Data-Path & Control Unit Design",
    "subtopics": [
      "Bus datapath timing",
      "Hardwired vs Microprogrammed",
      "Horizontal vs Vertical microinstructions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Horizontal microprogramming uses 1 bit per control line without decoding delay."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for ALU, Data-Path & Control Unit Design",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 38,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Instruction Pipelining, Throughput & Ideal Speedup",
    "subtopics": [
      "Stage and latch delays, clock period = max(delay)+latch",
      "Time = (k+n-1)*t_clk",
      "Speedup approaching k stages"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Ideal pipeline throughput = 1 instruction per cycle (CPI = 1)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Instruction Pipelining, Throughput & Ideal Speedup",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 39,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Data Hazards: RAW, WAR, WAW & Operand Forwarding",
    "subtopics": [
      "RAW true dependency",
      "WAR/WAW dependencies",
      "Operand forwarding bypassing",
      "Load-use stall cycles"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Operand forwarding resolves ALU-ALU dependencies; Load-ALU still takes 1 stall."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Data Hazards: RAW, WAR, WAW & Operand Forwarding",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 40,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Branch Hazards, Branch Prediction & Branch Penalty",
    "subtopics": [
      "Control hazard penalty by resolution stage",
      "Static & Dynamic 2-bit prediction",
      "Delayed branch slot filling"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Branch penalty = (Target ready stage - Branch fetch stage) - 1."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Branch Hazards, Branch Prediction & Branch Penalty",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 41,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Memory Hierarchy, Locality & Cache Principles",
    "subtopics": [
      "Temporal vs Spatial locality",
      "Block size trade-offs",
      "Hit/miss ratio definitions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Excessive block sizes increase miss penalty and later miss rate."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Memory Hierarchy, Locality & Cache Principles",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 42,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Cache Mapping: Direct, Fully & Set-Associative",
    "subtopics": [
      "Direct mapped tag/line/offset",
      "k-way set associative tag/set/offset",
      "Tag directory size in bits"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Tag bits = Physical Address bits - log2(Sets) - log2(BlockSize)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Cache Mapping: Direct, Fully & Set-Associative",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 43,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Cache Write Policies, Replacement & Multi-Level",
    "subtopics": [
      "Write Through vs Write Back",
      "Write Allocate vs No-Write Allocate",
      "LRU replacement & multi-level EMAT"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Global Miss Rate L2 = Miss Rate L1 * Local Miss Rate L2."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Cache Write Policies, Replacement & Multi-Level",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 44,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Virtual Memory, Multi-Level Paging & TLB EMAT",
    "subtopics": [
      "Virtual to physical translation",
      "Page table size = (VAS/PageSize)*PTE",
      "TLB hit/miss EMAT formula"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "EMAT = h*(t_TLB + t_mem) + (1-h)*(t_TLB + (k+1)*t_mem)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Virtual Memory, Multi-Level Paging & TLB EMAT",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 45,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "I/O Organization: Interrupts, Vectoring & DMA",
    "subtopics": [
      "Programmed I/O vs Interrupts",
      "Vectored daisy-chain priority",
      "DMA Burst vs Cycle Stealing CPU slowdown %"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Cycle stealing DMA CPU slowdown % = (Transfer time / Cycle time) * 100."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for I/O Organization: Interrupts, Vectoring & DMA",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 46,
    "subjectCode": "COA",
    "subjectName": "#4 Computer Organization & Architecture",
    "subjectOrder": 4,
    "phase": "Phase 4: Computer Architecture & Memory Systems",
    "topicTitle": "Subject #4 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive COA review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all COA trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #4 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 47,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "OSI 7-Layer vs TCP/IP Protocol Stack",
    "subtopics": [
      "Layer functionalities & PDU units",
      "Byte/bit framing & stuffing",
      "End-to-end vs Hop-by-hop delivery"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Data link layer does hop-to-hop; Transport layer does process-to-process."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for OSI 7-Layer vs TCP/IP Protocol Stack",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 48,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Data Link Layer: Framing, Parity & CRC Polynomials",
    "subtopics": [
      "CRC divisor generation & error detection",
      "Hamming distance (d >= 2e+1)",
      "Checksum algorithms"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "To detect e errors: d_min >= e + 1. To correct e errors: d_min >= 2e + 1."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Data Link Layer: Framing, Parity & CRC Polynomials",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 49,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Flow Control: Stop-and-Wait Protocol Efficiency",
    "subtopics": [
      "Transmission delay (Tt) vs Propagation delay (Tp)",
      "Efficiency eta = 1 / (1 + 2a)",
      "Throughput calculations"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Efficiency = 1 / (1 + 2a) where a = Tp/Tt."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Flow Control: Stop-and-Wait Protocol Efficiency",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 50,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Sliding Window: Go-Back-N & Selective Repeat",
    "subtopics": [
      "GBN: Sender=N, Receiver=1, seq >= N+1",
      "SR: Sender=N, Receiver=N, seq >= 2N",
      "Efficiency = N / (1 + 2a)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In Selective Repeat, minimum sequence numbers required = 2 * WindowSize."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Sliding Window: Go-Back-N & Selective Repeat",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 51,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Medium Access Control: CSMA/CD & Collision Detection",
    "subtopics": [
      "Pure ALOHA (18.4%) vs Slotted ALOHA (36.8%)",
      "CSMA/CD minimum frame size: L >= 2*B*Tp",
      "Exponential backoff algorithm"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In CSMA/CD: Tt >= 2 * Tp is mandatory for collision detection."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Medium Access Control: CSMA/CD & Collision Detection",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 52,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "IPv4 Addressing, Subnetting, Supernetting & CIDR",
    "subtopics": [
      "CIDR prefix masks",
      "Subnet mask calculations (2^h - 2)",
      "VLSM address allocation"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Usable hosts in /k subnet = 2^(32-k) - 2."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for IPv4 Addressing, Subnetting, Supernetting & CIDR",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 53,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "IPv4 Header Format & Packet Fragmentation",
    "subtopics": [
      "IPv4 header fields",
      "Fragmentation offset (scaled by 8 bytes)",
      "DF and MF flags"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Fragment offset = (Starting byte number) / 8."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for IPv4 Header Format & Packet Fragmentation",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 54,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Routing: Distance Vector (RIP) & Link State (OSPF)",
    "subtopics": [
      "Distance Vector: Bellman-Ford, Count to infinity",
      "Link State: Dijkstra-based OSPF",
      "BGP exterior routing"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Distance Vector routing suffers from Count-to-Infinity."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Routing: Distance Vector (RIP) & Link State (OSPF)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 55,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Transport Layer: TCP 3-Way Handshake & Teardown",
    "subtopics": [
      "TCP header fields & pseudo-header checksum",
      "Connection establishment (SYN, SYN-ACK, ACK)",
      "4-way termination & TIME_WAIT (2*MSL)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "TIME_WAIT state lasts 2 * MSL to ensure final ACK is acknowledged."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Transport Layer: TCP 3-Way Handshake & Teardown",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 56,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "TCP Flow Control & Congestion Control Dynamics",
    "subtopics": [
      "Effective Window = min(cwnd, rwnd)",
      "Slow Start exponential doubling",
      "Congestion Avoidance additive increase",
      "Fast Retransmit & Recovery on 3 dup ACKs"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "On timeout: ssthresh = cwnd/2, cwnd = 1 MSS. On 3 dup ACKs: ssthresh = cwnd/2, cwnd = ssthresh + 3."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for TCP Flow Control & Congestion Control Dynamics",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 57,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Application Layer Protocols: DNS, DHCP, HTTP & SMTP",
    "subtopics": [
      "DNS iterative vs recursive resolution",
      "DHCP DORA process",
      "HTTP 1.0 vs 1.1 Persistent connections",
      "SMTP, POP3, IMAP protocols"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "DNS uses UDP port 53 for queries (< 512B) and TCP port 53 for zone transfers."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Application Layer Protocols: DNS, DHCP, HTTP & SMTP",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 58,
    "subjectCode": "CN",
    "subjectName": "#5 Computer Networks",
    "subjectOrder": 5,
    "phase": "Phase 5: Networks, Protocols & Layered Architectures",
    "topicTitle": "Subject #5 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive CN review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all CN trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #5 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 59,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "OS Structures, System Calls & Process Control Block",
    "subtopics": [
      "Dual-mode kernel vs user mode",
      "Process creation (fork() call tree)",
      "PCB attributes and context switching"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "fork() called n times creates 2^n - 1 child processes."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for OS Structures, System Calls & Process Control Block",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 60,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "CPU Scheduling: FCFS, SJF, SRTF & Priority",
    "subtopics": [
      "Preemptive vs Non-preemptive",
      "SRTF optimal average waiting time",
      "Priority scheduling and starvation aging"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "SRTF provides minimum average waiting time among all scheduling algorithms."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for CPU Scheduling: FCFS, SJF, SRTF & Priority",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 61,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Round Robin Scheduling & Multi-Level Feedback Queues",
    "subtopics": [
      "Time quantum trade-offs",
      "Context switch overhead impact",
      "Multi-Level Feedback Queue aging"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "If time quantum is very large, Round Robin degrades to FCFS."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Round Robin Scheduling & Multi-Level Feedback Queues",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 62,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Synchronization: Critical Section & Peterson Algorithm",
    "subtopics": [
      "Mutual Exclusion, Progress, Bounded Waiting",
      "Hardware atomic instructions (TestAndSet)",
      "Peterson 2-process solution"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Progress requirement: only processes trying to enter CS participate in entry decision."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Synchronization: Critical Section & Peterson Algorithm",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 63,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Semaphores & Classical Concurrency Problems",
    "subtopics": [
      "Binary vs Counting Semaphores",
      "Producer-Consumer bounded buffer",
      "Readers-Writers problem"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Counting semaphore value of -k indicates exactly k processes are waiting in queue."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Semaphores & Classical Concurrency Problems",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 64,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Deadlocks: Coffman Conditions & Resource Graphs",
    "subtopics": [
      "4 necessary conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait",
      "Resource Allocation Graph (RAG) single vs multiple instance"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In single-instance RAG, cycle is necessary and sufficient. In multiple-instance, cycle is not sufficient."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Deadlocks: Coffman Conditions & Resource Graphs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 65,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Deadlock Avoidance & Banker Algorithm",
    "subtopics": [
      "Safe state vs Unsafe state",
      "Banker Algorithm: Need = Max - Allocation <= Available",
      "Safety algorithm vector comparison"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "An unsafe state is not necessarily a deadlock state, but deadlock is always unsafe."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Deadlock Avoidance & Banker Algorithm",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 66,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Memory Management: Contiguous Allocation & Paging",
    "subtopics": [
      "First-Fit, Best-Fit, Worst-Fit",
      "Paging: Page number + Offset translation",
      "Internal vs External fragmentation"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Paging eliminates external fragmentation; internal fragmentation exists on last page."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Memory Management: Contiguous Allocation & Paging",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 67,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Multi-Level Paging, Inverted Page Tables & TLB",
    "subtopics": [
      "Paging levels calculation",
      "Inverted page table size = Frames * PTE",
      "TLB Effective Memory Access Time (EMAT)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Inverted page table size is proportional to Physical Memory, independent of VAS."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Multi-Level Paging, Inverted Page Tables & TLB",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 68,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Virtual Memory, Page Replacement & Belady Anomaly",
    "subtopics": [
      "Demand Paging & Page Faults",
      "FIFO, Optimal (MIN), LRU, Clock policies",
      "Belady Anomaly in FIFO"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Stack algorithms (LRU, Optimal) can never suffer from Belady anomaly."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Virtual Memory, Page Replacement & Belady Anomaly",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 69,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)",
    "subtopics": [
      "File allocation: Contiguous, Linked, Indexed (inode)",
      "Disk scheduling: FCFS, SSTF, SCAN, C-SCAN, LOOK"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "UNIX inode direct, single indirect, double indirect address capacity calculations."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 70,
    "subjectCode": "OS",
    "subjectName": "#6 Operating Systems",
    "subjectOrder": 6,
    "phase": "Phase 6: Operating Systems & Concurrency",
    "topicTitle": "Subject #6 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive OS review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all OS trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #6 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 71,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "ER Modeling & Relational Schema Conversion",
    "subtopics": [
      "Entities, Weak entities, Relationships",
      "Cardinality constraints (1:1, 1:N, M:N)",
      "Minimizing relational tables count"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "1:N relationship can be merged with N-side table without creating separate table."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for ER Modeling & Relational Schema Conversion",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 72,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Relational Algebra (Selection, Projection, Joins, Division)",
    "subtopics": [
      "Select, Project, Union, Difference, Cartesian",
      "Natural Join, Theta Join, Outer Joins",
      "Relational Division operator"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Relational Division R(A,B) / S(B) produces tuples in R matching all tuples in S."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Relational Algebra (Selection, Projection, Joins, Division)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 73,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "SQL Queries: GROUP BY, HAVING & Correlated Subqueries",
    "subtopics": [
      "Aggregate functions (COUNT, SUM, AVG)",
      "WHERE vs HAVING filtering",
      "Correlated subqueries with EXISTS"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "COUNT(*) counts NULL rows; COUNT(col) ignores NULLs. WHERE filters before grouping."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for SQL Queries: GROUP BY, HAVING & Correlated Subqueries",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 74,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Functional Dependencies & Candidate Keys Algorithm",
    "subtopics": [
      "Armstrong Axioms",
      "Attribute closure X+ algorithm",
      "Finding all candidate keys",
      "Minimal Cover / Canonical Cover"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Attribute not appearing on RHS of any FD must be present in every candidate key."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Functional Dependencies & Candidate Keys Algorithm",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 75,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Normalization: 1NF, 2NF, 3NF & BCNF Forms",
    "subtopics": [
      "1NF: Atomic values",
      "2NF: No partial dependency",
      "3NF: X superkey OR A prime",
      "BCNF: Every X must be superkey"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Every BCNF relation is in 3NF, but not every 3NF relation is in BCNF."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Normalization: 1NF, 2NF, 3NF & BCNF Forms",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 76,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Decomposition: Lossless Join & Dependency Preserving",
    "subtopics": [
      "Lossless join condition for 2 relations",
      "Dependency preservation check via closure",
      "3NF synthesis algorithm"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Any relation can be decomposed into 3NF such that it is both lossless and dependency preserving."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Decomposition: Lossless Join & Dependency Preserving",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 77,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Transactions, ACID Properties & Concurrent Schedules",
    "subtopics": [
      "Atomicity, Consistency, Isolation, Durability",
      "Read-Write conflict operations",
      "Recoverable vs Cascadeless vs Strict"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Strict schedules subset Cascadeless subset Recoverable subset All schedules."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Transactions, ACID Properties & Concurrent Schedules",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 78,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Conflict Serializability & Precedence Graphs",
    "subtopics": [
      "Precedence Graph cycle detection",
      "Topological sort order of equivalent serial schedule",
      "View serializability & Blind Writes"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Schedule S is conflict serializable iff its precedence graph has no cycles."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Conflict Serializability & Precedence Graphs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 79,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Concurrency Control: Two-Phase Locking (2PL)",
    "subtopics": [
      "Basic 2PL growing and shrinking phases",
      "Strict 2PL (holds exclusive locks to commit)",
      "Rigid 2PL (holds all locks to commit)",
      "Wait-Die vs Wound-Wait timestamp schemes"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Basic 2PL guarantees conflict serializability. Strict 2PL prevents cascading rollbacks."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Concurrency Control: Two-Phase Locking (2PL)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 80,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Database Recovery: WAL, Undo/Redo & Checkpoints",
    "subtopics": [
      "Write-Ahead Logging (WAL) rule",
      "Log records: <T, X, V_old, V_new>",
      "Checkpointing: Undo and Redo list resolution"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Uncommitted transactions before crash are UNDONE; committed ones are REDONE."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Database Recovery: WAL, Undo/Redo & Checkpoints",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 81,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "File Organization & B / B+ Tree Indexing Capacity",
    "subtopics": [
      "Primary, Secondary & Clustered Indexes",
      "B+ Tree order formula: p*P_block + (p-1)*Key <= BlockSize",
      "Block access counts for search and range queries"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In B+ trees, all data pointers reside in leaf nodes, linked sequentially for range queries."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for File Organization & B / B+ Tree Indexing Capacity",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 82,
    "subjectCode": "DBMS",
    "subjectName": "#7 Database Management Systems",
    "subjectOrder": 7,
    "phase": "Phase 7: Relational Databases & Transactions",
    "topicTitle": "Subject #7 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive DBMS review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all DBMS trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #7 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 83,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Deterministic Finite Automata (DFA) Design",
    "subtopics": [
      "Alphabets, strings & languages",
      "DFA 5-tuple formal definition",
      "Designing DFAs for modulo counting & substrings"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Minimum states in DFA accepting strings with remainder r modulo m is m."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Deterministic Finite Automata (DFA) Design",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 84,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "NFA, Epsilon-NFA & Subset Construction",
    "subtopics": [
      "NFA non-determinism",
      "Subset construction powerset 2^Q",
      "Epsilon-closure conversion"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "An n-state NFA may require up to 2^n states when converted to minimal DFA."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for NFA, Epsilon-NFA & Subset Construction",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 85,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "DFA State Minimization & Myhill-Nerode Theorem",
    "subtopics": [
      "Table-filling marking algorithm",
      "Myhill-Nerode equivalence relations",
      "Unique minimal DFA property"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Every regular language has a unique minimal state DFA up to state isomorphism."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for DFA State Minimization & Myhill-Nerode Theorem",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 86,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Regular Expressions & Arden Theorem",
    "subtopics": [
      "Regular expression operators (*, +, concat)",
      "Arden Theorem: R = Q + RP => R = QP*",
      "State elimination method"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "(a + b)* = (a* b*)* = (a* + b)*."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Regular Expressions & Arden Theorem",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 87,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Pumping Lemma for Regular Languages",
    "subtopics": [
      "Pumping lemma conditions: |xy|<=p, |y|>=1, xy^i z in L",
      "Proving non-regularity for {a^n b^n}, {a^(n^2)}"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Pumping lemma is necessary for regular languages but not sufficient to prove regularity."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Pumping Lemma for Regular Languages",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 88,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Regular Language Closure & Decision Properties",
    "subtopics": [
      "Closed under Union, Intersection, Complement, Concat, Star",
      "Decidable problems: Emptiness, Finiteness, Membership, Equivalence"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "All standard decision problems (Emptiness, Equivalence, Membership) are Decidable for Regular."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Regular Language Closure & Decision Properties",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 89,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Context-Free Grammars (CFG) & Ambiguity Analysis",
    "subtopics": [
      "CFG formal definition (V, T, P, S)",
      "Leftmost vs Rightmost derivations",
      "Ambiguous grammars & inherently ambiguous languages"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Testing whether an arbitrary CFG is ambiguous is Undecidable."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Context-Free Grammars (CFG) & Ambiguity Analysis",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 90,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "CFG Simplification & Chomsky Normal Form (CNF)",
    "subtopics": [
      "Eliminating null, unit & useless symbols",
      "Chomsky Normal Form: A -> BC or A -> a",
      "Derivation length in CNF takes exactly 2n - 1 steps"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In CNF, a string of length n takes exactly 2n - 1 derivation steps."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for CFG Simplification & Chomsky Normal Form (CNF)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 91,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Pushdown Automata (PDA): DPDA vs NPDA",
    "subtopics": [
      "PDA 7-tuple stack transitions",
      "Acceptance by final state vs empty stack",
      "DPDA defines DCFL (strictly less powerful than NPDA)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "DPDAs are strictly less powerful than NPDAs: DPDA cannot recognize {w w^R}."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Pushdown Automata (PDA): DPDA vs NPDA",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 92,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "CFL & DCFL Properties, Closure & Pumping Lemma",
    "subtopics": [
      "CFL closure: Closed under Union, Concat, Star; NOT Intersection or Complement",
      "DCFL closure: CLOSED under Complement; NOT Union or Intersection",
      "CFL Pumping Lemma: s = uvwxy"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "DCFL is closed under complementation, whereas general CFL is not closed under complementation."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for CFL & DCFL Properties, Closure & Pumping Lemma",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 93,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Turing Machines (TM) & Chomsky Hierarchy",
    "subtopics": [
      "Standard deterministic TM 7-tuple",
      "Multi-tape, Multi-track TMs equivalence",
      "Chomsky Hierarchy: Regular subset CFL subset CSL subset REC subset RE"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Multi-tape Turing machines have the exact same computational power as standard single-tape TMs."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Turing Machines (TM) & Chomsky Hierarchy",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 94,
    "subjectCode": "TOC",
    "subjectName": "#8 Theory of Computation",
    "subjectOrder": 8,
    "phase": "Phase 8: Automata, Grammars & Decidability",
    "topicTitle": "Decidability, Halting Problem & Rice Theorem",
    "subtopics": [
      "REC vs RE language definitions",
      "Halting Problem undecidability proof",
      "Rice Theorem Part 1 for semantic properties",
      "Post Correspondence Problem (PCP)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "If language L is RE and its complement is also RE, then L is REC (Decidable)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Decidability, Halting Problem & Rice Theorem",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 95,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Compiler Phases & Lexical Analysis (Tokens & Lexemes)",
    "subtopics": [
      "6 Phases: Lexical, Syntax, Semantic, Intermediate, Optimizer, Target",
      "Tokens, Patterns, Lexemes",
      "Input buffering & Lexical errors"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Symbol table is accessed by all compiler phases; Lexical analyzer strips comments."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Compiler Phases & Lexical Analysis (Tokens & Lexemes)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 96,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Top-Down Parsing: FIRST and FOLLOW Computation",
    "subtopics": [
      "FIRST set computation rules with epsilon",
      "FOLLOW set computation with $ marker",
      "Left recursion elimination & Left factoring"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "FOLLOW set can never contain epsilon. $ is always in FOLLOW(S)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Top-Down Parsing: FIRST and FOLLOW Computation",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 97,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "LL(1) Parsing Tables & LL(1) Grammar Conditions",
    "subtopics": [
      "Constructing M[A, a] table using FIRST and FOLLOW",
      "LL(1) condition: No multiple entries in table cell",
      "Left recursion or ambiguity prevents LL(1)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Grammar with left recursion or ambiguity can never be LL(1)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for LL(1) Parsing Tables & LL(1) Grammar Conditions",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 98,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Bottom-Up Parsing: LR(0) & SLR(1) Parsing Tables",
    "subtopics": [
      "Augmented grammar & LR(0) item closure",
      "GOTO transitions & Canonical items collection",
      "Shift-Reduce & Reduce-Reduce conflicts",
      "SLR(1) placing reductions in FOLLOW(LHS)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In SLR(1), reduce actions are placed only in columns corresponding to FOLLOW(A)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Bottom-Up Parsing: LR(0) & SLR(1) Parsing Tables",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 99,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "CLR(1) & LALR(1) Parsers & State Count Comparison",
    "subtopics": [
      "LR(1) items with lookaheads",
      "LALR(1) merging states with identical LR(0) cores",
      "Parser hierarchy: LR(0) < SLR(1) < LALR(1) < CLR(1)",
      "State count: LR(0) = SLR(1) = LALR(1) <= CLR(1)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Merging states in LALR(1) can never introduce Shift-Reduce conflicts, but can introduce Reduce-Reduce conflicts."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for CLR(1) & LALR(1) Parsers & State Count Comparison",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 100,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Syntax-Directed Translation (SDT): S vs L-Attributed",
    "subtopics": [
      "Synthesized attributes (bottom-up from children)",
      "Inherited attributes (from parent/left siblings)",
      "S-Attributed definitions (only synthesized)",
      "L-Attributed definitions (synthesized + inherited from left)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Every S-attributed definition is L-attributed, but not every L-attributed is S-attributed."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Syntax-Directed Translation (SDT): S vs L-Attributed",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 101,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Intermediate Code Generation: Three-Address Code & DAGs",
    "subtopics": [
      "Three-Address Code (TAC): Quadruples, Triples",
      "Syntax Trees and Directed Acyclic Graphs (DAG)",
      "Common subexpression elimination via DAG"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "DAG eliminates redundant computations by creating shared nodes for identical subexpressions."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Intermediate Code Generation: Three-Address Code & DAGs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 102,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Code Optimization: Basic Blocks & Flow Graphs",
    "subtopics": [
      "Identifying Basic Block leaders (First, Target, After jump)",
      "Constructing Control Flow Graphs (CFG)",
      "Dominators and natural loops"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "A leader is: 1) First statement, 2) Target of any branch, 3) Statement following any branch."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Code Optimization: Basic Blocks & Flow Graphs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 103,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Loop Optimizations, Data Flow & Code Generation",
    "subtopics": [
      "Loop invariant code motion & unrolling",
      "Dead code elimination & Constant folding/propagation",
      "Register allocation via graph coloring"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Constant folding evaluates operations at compile-time (2+3 -> 5)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Loop Optimizations, Data Flow & Code Generation",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 104,
    "subjectCode": "CD",
    "subjectName": "#9 Compiler Design",
    "subjectOrder": 9,
    "phase": "Phase 9: Compiler Architecture & Code Generation",
    "topicTitle": "Subject #9 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive CD review",
      "Negative marking trap analysis across Parsers and SDT",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all CD trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #9 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 105,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Propositional Logic: Equivalences & Normal Forms",
    "subtopics": [
      "Truth tables, Tautology, Contradiction",
      "Equivalences (p->q == ~p v q)",
      "CNF and DNF representations"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "p -> q is logically equivalent to ~q -> ~p (Contrapositive)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Propositional Logic: Equivalences & Normal Forms",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 106,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Predicate Logic: Quantifiers & Inference Rules",
    "subtopics": [
      "Universal (Forall) and Existential (Exists)",
      "Negation: ~(Forall x P(x)) == Exists x ~P(x)",
      "Validity and satisfiability of first-order formulas"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Quantifier order matters: Exists y Forall x P(x, y) => Forall x Exists y P(x, y), but converse is false."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Predicate Logic: Quantifiers & Inference Rules",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 107,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Sets, Relations, Equivalence & Closures",
    "subtopics": [
      "Power sets |P(A)| = 2^n",
      "Reflexive, Symmetric, Transitive relations",
      "Equivalence relations and Bell number partitions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Number of equivalence relations on n elements = Bell Number B(n)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Sets, Relations, Equivalence & Closures",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 108,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "POSET, Hasse Diagrams & Lattices",
    "subtopics": [
      "Partially Ordered Sets (POSET)",
      "Hasse Diagram construction",
      "Maximal, Minimal, GLB and LUB",
      "Lattice definition and Boolean Algebra conditions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "A bounded lattice is Boolean Algebra iff it is both Distributive and Complemented."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for POSET, Hasse Diagrams & Lattices",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 109,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Functions, Pigeonhole Principle & Group Theory",
    "subtopics": [
      "Injective, Surjective, Bijective functions",
      "Generalized Pigeonhole Principle",
      "Groups, Subgroups, Abelian, Lagrange Theorem"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Lagrange Theorem: Order of subgroup divides order of group."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Functions, Pigeonhole Principle & Group Theory",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 110,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Combinatorics: Permutations, Combinations & Recurrences",
    "subtopics": [
      "Permutations and combinations formulas",
      "Inclusion-Exclusion Principle",
      "Generating functions & Derangements D(n)"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Derangement formula D(n) = n! * [1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n/n!]."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Combinatorics: Permutations, Combinations & Recurrences",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 111,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Graph Theory: Connectivity, Euler & Hamiltonian Graphs",
    "subtopics": [
      "Handshaking Lemma: Sum of degrees = 2E",
      "Euler Path (0 or 2 odd vertices) vs Euler Circuit (all even)",
      "Hamiltonian paths and cycles"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Connected graph has Eulerian circuit iff every vertex has an even degree."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Graph Theory: Connectivity, Euler & Hamiltonian Graphs",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 112,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Graph Theory: Trees, Planar Graphs & Graph Coloring",
    "subtopics": [
      "Cayley formula: Spanning trees on K_n = n^(n-2)",
      "Euler Planar Formula: V - E + R = 2; E <= 3V - 6",
      "Bipartite graphs (no odd cycles) & Chromatic number"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "A graph is bipartite iff it contains no odd-length cycles. 2-colorable == bipartite."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Graph Theory: Trees, Planar Graphs & Graph Coloring",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 113,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Linear Algebra: Matrices, Determinants & Linear Systems",
    "subtopics": [
      "Matrix rank (Row Echelon Form)",
      "Linear systems AX = B: Unique, Infinite, No solution",
      "Determinant and Inverse properties"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Homogeneous system AX = 0 has a non-trivial solution iff det(A) = 0."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Linear Algebra: Matrices, Determinants & Linear Systems",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 114,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Linear Algebra: Eigenvalues & Cayley-Hamilton Theorem",
    "subtopics": [
      "Characteristic equation det(A - lambda I) = 0",
      "Sum = Trace(A); Product = Det(A)",
      "Cayley-Hamilton theorem: A satisfies own characteristic equation"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Symmetric matrix eigenvalues are strictly real. Skew-symmetric are 0 or purely imaginary."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Linear Algebra: Eigenvalues & Cayley-Hamilton Theorem",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 115,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Calculus: Limits, Continuity, Maxima & Minima",
    "subtopics": [
      "LHopital rule for 0/0 and inf/inf",
      "Rolle & Mean Value Theorems",
      "Maxima, Minima & Saddle points"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "For local minimum: f'(x) = 0 and f''(x) > 0. For local maximum: f'(x) = 0 and f''(x) < 0."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Calculus: Limits, Continuity, Maxima & Minima",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 116,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Probability: Conditional Probability & Bayes Theorem",
    "subtopics": [
      "Conditional probability P(A|B) = P(AB)/P(B)",
      "Independent events P(AB) = P(A)P(B)",
      "Bayes Theorem posterior computation"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Bayes theorem converts prior probabilities into posterior probabilities given evidence."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Probability: Conditional Probability & Bayes Theorem",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 117,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Random Variables & Distributions (Binomial, Poisson, Normal)",
    "subtopics": [
      "Expectation E[X] & Variance Var(X)",
      "Binomial: Mean = np, Var = np(1-p)",
      "Poisson: Mean = Var = lambda",
      "Uniform and Exponential memoryless distributions"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In a Poisson distribution, Mean and Variance are exactly equal to lambda."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Random Variables & Distributions (Binomial, Poisson, Normal)",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 118,
    "subjectCode": "Maths",
    "subjectName": "#10 Engineering & Discrete Mathematics",
    "subjectOrder": 10,
    "phase": "Phase 10: Discrete Math, Linear Algebra & Probability",
    "topicTitle": "Subject #10 Milestone Review, Trap Rules & 25-Q Test",
    "subtopics": [
      "Comprehensive Mathematics review",
      "Negative marking trap analysis",
      "25-Q Timed Milestone Test"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Review all Maths trap rules before test."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Subject #10 Milestone Review, Trap Rules & 25-Q Test",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 119,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Quantitative Aptitude: Percentages, Profit-Loss & Interest",
    "subtopics": [
      "Percentage change shortcuts",
      "Profit, Loss, Discount, Marked Price",
      "Simple Interest vs Compound Interest"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Net change of +x% and -x% is always a decrease of (x^2 / 100)%."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Quantitative Aptitude: Percentages, Profit-Loss & Interest",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 120,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Quantitative Aptitude: Ratio, Proportion, Mixtures & Work",
    "subtopics": [
      "Ratio & Proportion properties",
      "Alligations and mixtures rule",
      "Time & Work rate LCM method"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Total work is assumed to be LCM of individual completion times."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Quantitative Aptitude: Ratio, Proportion, Mixtures & Work",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 121,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Quantitative Aptitude: Speed, Distance, Trains & Clocks",
    "subtopics": [
      "Relative speed opposite (S1+S2) vs same (|S1-S2|)",
      "Boats & Streams (Down = u+v, Up = u-v)",
      "Clock angle formula |30H - 5.5M|"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Average speed over equal distances = (2*S1*S2)/(S1+S2) (Harmonic Mean)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Quantitative Aptitude: Speed, Distance, Trains & Clocks",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 122,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Analytical Reasoning: Syllogisms & Seating Arrangements",
    "subtopics": [
      "Categorical syllogisms (All, Some, No)",
      "Blood relations family trees",
      "Linear and circular seating constraints"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Use Venn diagrams to test all possible counterexamples in syllogisms."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Analytical Reasoning: Syllogisms & Seating Arrangements",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 123,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Spatial Aptitude: Paper Folding, Rotation & Projections",
    "subtopics": [
      "2D reflections & rotations (90, 180 deg)",
      "Paper folding & punching symmetries",
      "3D cube unfolding & elevations"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "In cube unfolding: Opposite faces never share a common edge or corner."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Spatial Aptitude: Paper Folding, Rotation & Projections",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 124,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Verbal Aptitude: Grammar, Vocabulary & Comprehension",
    "subtopics": [
      "Subject-verb agreement & Tenses",
      "Vocabulary: Synonyms, Antonyms, Analogies",
      "Reading comprehension strategies"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Read the question stem first before reading long comprehension passages."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Verbal Aptitude: Grammar, Vocabulary & Comprehension",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  },
  {
    "day": 125,
    "subjectCode": "Apti",
    "subjectName": "#11 General Aptitude",
    "subjectOrder": 11,
    "phase": "Phase 11: General Aptitude & Comprehensive Mocks",
    "topicTitle": "Grand Finale: 65-Question Full GATE Mock Simulator",
    "subtopics": [
      "Full 65-question, 100-marks CBT Mock Test",
      "Comprehensive coverage of all 11 subjects",
      "Detailed percentile & accuracy breakdown"
    ],
    "estimatedHours": 4,
    "highYieldPoints": [
      "Follow 3-round exam strategy: Round 1 (1-mark easy), Round 2 (2-mark solvable), Round 3 (tough)."
    ],
    "tasks": [
      {
        "id": "t1",
        "label": "Revise core theory and key formulas for Grand Finale: 65-Question Full GATE Mock Simulator",
        "completed": false
      },
      {
        "id": "t2",
        "label": "Solve 10 GATE practice questions for this topic",
        "completed": false
      },
      {
        "id": "t3",
        "label": "Review formula flashcard and trap rules in Vault",
        "completed": false
      }
    ]
  }
];
