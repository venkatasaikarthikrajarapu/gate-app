# scripts/generate_seed_builder.py
import json

subjects_data = [
    {
        "code": "GA", "name": "General Aptitude", "marks": 15, "color": "#f59e0b",
        "topics": [
            ("Verbal Ability", 8, "medium", "medium"),
            ("Numerical Ability", 10, "high", "medium"),
            ("Reasoning & Spatial Aptitude", 8, "medium", "medium")
        ]
    },
    {
        "code": "EM", "name": "Engineering Mathematics", "marks": 13, "color": "#3b82f6",
        "topics": [
            ("Linear Algebra", 12, "high", "medium"),
            ("Calculus", 10, "medium", "hard"),
            ("Probability & Statistics", 14, "high", "hard")
        ]
    },
    {
        "code": "DM", "name": "Discrete Mathematics", "marks": 0, "color": "#6366f1",
        "topics": [
            ("Propositional & First Order Logic", 10, "high", "medium"),
            ("Sets, Relations & Functions", 8, "high", "medium"),
            ("Graph Theory", 14, "high", "hard"),
            ("Combinatorics & Generating Functions", 10, "medium", "hard")
        ]
    },
    {
        "code": "DL", "name": "Digital Logic", "marks": 6, "color": "#10b981",
        "topics": [
            ("Boolean Algebra & Minimization", 8, "high", "easy"),
            ("Combinational Circuits", 10, "high", "medium"),
            ("Sequential Circuits & FSM", 12, "high", "hard"),
            ("Number Representations", 6, "medium", "easy")
        ]
    },
    {
        "code": "COA", "name": "Computer Organization & Architecture", "marks": 8, "color": "#06b6d4",
        "topics": [
            ("Machine Instructions & Addressing Modes", 10, "high", "medium"),
            ("ALU, Data Path & Control Unit", 12, "high", "hard"),
            ("Instruction Pipelining", 14, "high", "hard"),
            ("Memory Hierarchy & Cache Design", 14, "high", "hard"),
            ("I/O Interface & DMA", 8, "medium", "medium")
        ]
    },
    {
        "code": "PDS", "name": "Programming & Data Structures", "marks": 10, "color": "#8b5cf6",
        "topics": [
            ("C Programming & Pointers", 12, "high", "hard"),
            ("Recursion & Parameter Passing", 8, "high", "medium"),
            ("Arrays, Stacks & Queues", 10, "high", "medium"),
            ("Linked Lists", 8, "medium", "easy"),
            ("Trees & Binary Search Trees", 14, "high", "hard"),
            ("Heaps & Priority Queues", 8, "medium", "medium")
        ]
    },
    {
        "code": "ALGO", "name": "Algorithms", "marks": 9, "color": "#ec4899",
        "topics": [
            ("Asymptotic Analysis & Recurrences", 10, "high", "medium"),
            ("Divide and Conquer", 10, "high", "medium"),
            ("Greedy Algorithms", 10, "high", "medium"),
            ("Dynamic Programming", 16, "high", "very_hard"),
            ("Graph Search: BFS & DFS", 10, "high", "medium"),
            ("Shortest Paths & Minimum Spanning Trees", 12, "high", "hard")
        ]
    },
    {
        "code": "TOC", "name": "Theory of Computation", "marks": 8, "color": "#14b8a6",
        "topics": [
            ("Regular Expressions & Finite Automata", 14, "high", "medium"),
            ("Context-Free Grammars & Pushdown Automata", 12, "high", "hard"),
            ("Turing Machines & Decidability", 12, "high", "hard"),
            ("Chomsky Hierarchy", 6, "medium", "easy")
        ]
    },
    {
        "code": "CD", "name": "Compiler Design", "marks": 5, "color": "#f97316",
        "topics": [
            ("Lexical Analysis", 6, "medium", "easy"),
            ("Parsing: LL(1), LR(0), SLR, CLR, LALR", 14, "high", "hard"),
            ("Syntax Directed Translation", 10, "high", "hard"),
            ("Intermediate Code Generation", 8, "medium", "medium"),
            ("Data Flow Analysis & Code Optimization", 10, "medium", "hard")
        ]
    },
    {
        "code": "OS", "name": "Operating Systems", "marks": 9, "color": "#3b82f6",
        "topics": [
            ("Processes, Threads & Inter-Process Comm", 10, "high", "medium"),
            ("CPU Scheduling Algorithms", 10, "high", "medium"),
            ("Process Synchronization & Deadlocks", 16, "high", "hard"),
            ("Memory Management & Virtual Memory", 16, "high", "hard"),
            ("File Systems & Disk Scheduling", 8, "medium", "medium")
        ]
    },
    {
        "code": "DBMS", "name": "Databases", "marks": 8, "color": "#84cc16",
        "topics": [
            ("ER Model & Relational Algebra", 10, "high", "medium"),
            ("SQL & Complex Queries", 12, "high", "medium"),
            ("Functional Dependencies & Normalization", 14, "high", "hard"),
            ("Transactions, Concurrency & Serializability", 14, "high", "hard"),
            ("B and B+ Tree Indexing", 10, "high", "hard")
        ]
    },
    {
        "code": "CN", "name": "Computer Networks", "marks": 9, "color": "#0ea5e9",
        "topics": [
            ("OSI & TCP/IP Protocol Layers", 6, "medium", "easy"),
            ("Flow Control, Error Control & Framing", 10, "high", "medium"),
            ("Routing Algorithms & IP Addressing / Subnetting", 16, "high", "hard"),
            ("TCP / UDP & Congestion Control", 14, "high", "hard"),
            ("Application Layer: DNS, HTTP, SMTP", 8, "medium", "easy")
        ]
    }
]

print(f"Configured {len(subjects_data)} subjects.")
