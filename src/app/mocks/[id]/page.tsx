'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Flag,
  Award,
  BookOpen,
} from 'lucide-react';
import clsx from 'clsx';

interface Question {
  id: string;
  section: 'General Aptitude' | 'Computer Science';
  type: 'MCQ' | 'MSQ' | 'NAT';
  marks: number;
  negativeMarks: number;
  questionNumber: number;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

const EXAM_QUESTIONS: Question[] = [
  {
    id: 'q1',
    section: 'General Aptitude',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    questionNumber: 1,
    text: 'Choose the word that is opposite in meaning to the given word: METICULOUS',
    options: ['Careful', 'Careless', 'Thorough', 'Painstaking'],
    correctAnswer: 'B',
    explanation: 'Meticulous means showing great attention to detail. Careless is its direct antonym.',
  },
  {
    id: 'q2',
    section: 'General Aptitude',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    questionNumber: 2,
    text: 'A sum of money doubles itself in 5 years at simple interest. In how many years will it become 4 times itself?',
    correctAnswer: '15',
    explanation: 'Principal P becomes 2P in 5 years, so Simple Interest = P in 5 years (rate = 20%). To become 4P, interest needed is 3P. Time = 3 * 5 = 15 years.',
  },
  {
    id: 'q3',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    questionNumber: 3,
    text: 'What is the recurrence relation for the worst-case running time of QuickSort with the last element chosen as pivot on an already sorted array?',
    options: ['T(n) = 2T(n/2) + O(n)', 'T(n) = T(n-1) + O(n)', 'T(n) = 2T(n/2) + O(1)', 'T(n) = T(n/2) + O(n)'],
    correctAnswer: 'B',
    explanation: 'When partitioned on the extreme element of a sorted list, subproblems are of sizes 0 and n-1, giving T(n) = T(n-1) + cn = O(n^2).',
  },
  {
    id: 'q4',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    questionNumber: 4,
    text: 'Consider a paging system where page table is stored in memory. If memory access time is 100ns and TLB access time is 20ns with a 90% hit ratio, what is Effective Memory Access Time (EMAT) in ns?',
    options: ['120 ns', '130 ns', '140 ns', '220 ns'],
    correctAnswer: 'B',
    explanation: 'EMAT = Hit*(TLB + Mem) + Miss*(TLB + 2*Mem) = 0.90*(20+100) + 0.10*(20+200) = 0.90*120 + 0.10*220 = 108 + 22 = 130 ns.',
  },
  {
    id: 'q5',
    section: 'Computer Science',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    questionNumber: 5,
    text: 'In a 5-stage non-pipelined processor, instruction execution takes 5 cycles of 2ns each. In a pipelined version, each stage takes 2ns with a 0.2ns latch delay. For 1000 instructions, what is the speedup ratio achieved (round to 2 decimal places)?',
    correctAnswer: '4.53',
    explanation: 'Non-pipelined time = 1000 * 10ns = 10000ns. Pipelined clock cycle = 2 + 0.2 = 2.2ns. Pipelined time = (1000 + 5 - 1) * 2.2 = 1004 * 2.2 = 2208.8ns. Speedup = 10000 / 2208.8 = 4.53.',
  },
  {
    id: 'q6',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    questionNumber: 6,
    text: 'Given a relational schema R(A, B, C, D, E) with Functional Dependencies F = { A -> B, BC -> D, E -> C }. What is the Candidate Key of R?',
    options: ['A', 'AE', 'ABC', 'ADE'],
    correctAnswer: 'B',
    explanation: 'Closure of (AE): (AE)+ = {A, E}. From A->B: {A, B, E}. From E->C: {A, B, C, E}. From BC->D: {A, B, C, D, E} = R. No proper subset determines all attributes, so AE is candidate key.',
  },
  {
    id: 'q7',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    questionNumber: 7,
    text: 'Which of the following problems is decidable for Context-Free Grammars (CFGs)?',
    options: ['Emptiness: Is L(G) = ∅?', 'Universality: Is L(G) = Σ*?', 'Equivalence: Is L(G1) = L(G2)?', 'Ambiguity: Is G ambiguous?'],
    correctAnswer: 'A',
    explanation: 'Emptiness and finiteness of CFGs are decidable using graph reachability of generating non-terminals. Universality, equivalence, and ambiguity are undecidable.',
  },
  {
    id: 'q8',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 2,
    negativeMarks: 0.66,
    questionNumber: 8,
    text: 'In TCP congestion control, suppose the slow start threshold is 16 MSS and the current congestion window is 32 MSS. When a timeout occurs, what are the new values of ssthresh and cwnd respectively (in MSS)?',
    options: ['16, 1', '16, 16', '8, 1', '8, 16'],
    correctAnswer: 'A',
    explanation: 'On timeout: new ssthresh = max(cwnd / 2, 2) = 32 / 2 = 16 MSS. cwnd is reset to 1 MSS.',
  },
  {
    id: 'q9',
    section: 'Computer Science',
    type: 'MCQ',
    marks: 1,
    negativeMarks: 0.33,
    questionNumber: 9,
    text: 'The Boolean function F(A, B, C) = Σm(0, 2, 4, 6) is equal to:',
    options: ["A'", "B'", "C'", "A + B'"],
    correctAnswer: 'C',
    explanation: 'Binary minterms: 000, 010, 100, 110. Here A and B take both 0 and 1, but C is always 0. Hence F = C\'.',
  },
  {
    id: 'q10',
    section: 'Computer Science',
    type: 'NAT',
    marks: 2,
    negativeMarks: 0,
    questionNumber: 10,
    text: 'Consider an IPv4 network with subnet mask 255.255.252.0 (/22). How many usable host IP addresses are available in this subnet?',
    correctAnswer: '1022',
    explanation: 'Subnet mask has 22 network bits, leaving 32 - 22 = 10 host bits. Total IPs = 2^10 = 1024. Usable hosts = 1024 - 2 (network and broadcast) = 1022.',
  },
];

export default function LiveMockTestPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [visited, setVisited] = useState<Set<string>>(new Set(['q1']));
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 3 hours in seconds
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [testResult, setTestResult] = useState<{
    score: number;
    maxScore: number;
    correct: number;
    wrong: number;
    unattempted: number;
  } | null>(null);

  const currentQ = EXAM_QUESTIONS[currentIdx];

  // Countdown timer
  useEffect(() => {
    if (testResult) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [testResult]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (optLetter: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optLetter }));
  };

  const handleClearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  const goToQuestion = (idx: number) => {
    const nextQ = EXAM_QUESTIONS[idx];
    setVisited((prev) => new Set(prev).add(nextQ.id));
    setCurrentIdx(idx);
  };

  const handleNext = () => {
    if (currentIdx < EXAM_QUESTIONS.length - 1) {
      goToQuestion(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      goToQuestion(currentIdx - 1);
    }
  };

  const handleSubmitTest = () => {
    let score = 0;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const maxScore = EXAM_QUESTIONS.reduce((sum, q) => sum + q.marks, 0);

    EXAM_QUESTIONS.forEach((q) => {
      const userAns = answers[q.id];
      if (!userAns) {
        unattempted++;
      } else if (userAns.trim().toUpperCase() === q.correctAnswer.trim().toUpperCase()) {
        correct++;
        score += q.marks;
      } else {
        wrong++;
        score -= q.negativeMarks;
      }
    });

    setTestResult({
      score: Math.max(0, Math.round(score * 100) / 100),
      maxScore,
      correct,
      wrong,
      unattempted,
    });
    setIsSubmitModalOpen(false);
  };

  // Status helper for question palette
  const getQuestionStatusClass = (q: Question) => {
    const isAnswered = Boolean(answers[q.id]);
    const isMarked = markedForReview.has(q.id);
    const isCurrent = q.id === currentQ.id;

    if (isMarked && isAnswered) return 'bg-purple-600 text-white border-purple-400';
    if (isMarked) return 'bg-amber-600 text-white border-amber-400';
    if (isAnswered) return 'bg-emerald-600 text-white border-emerald-400';
    if (visited.has(q.id)) return 'bg-red-600 text-white border-red-400';
    return 'bg-slate-800 text-slate-400 border-slate-700';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Exam Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
            GATE
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold text-slate-100">
              GATE CSE Standard CBT Simulator
            </h1>
            <p className="text-xs text-slate-400">
              Session ID: <span className="font-mono text-indigo-400">{params.id}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock size={16} className={timeLeft < 600 ? 'text-red-400 animate-pulse' : 'text-amber-400'} />
            <span className="font-mono font-bold text-sm md:text-base text-slate-100">
              {formatTime(timeLeft)}
            </span>
          </div>

          <Button
            variant="success"
            size="sm"
            onClick={() => setIsSubmitModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <Send size={14} />
            <span>Submit Test</span>
          </Button>
        </div>
      </header>

      {/* Main Examination Body */}
      {testResult ? (
        /* Result Screen */
        <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/15 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto">
              <Award size={36} />
            </div>
            <h2 className="text-2xl font-bold text-slate-100">Test Submitted Successfully!</h2>
            <p className="text-sm text-slate-400">
              Here is your comprehensive score breakdown based on official GATE 2025 grading formulas.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Your Score</p>
                <p className="text-2xl font-bold text-indigo-400">
                  {testResult.score} / {testResult.maxScore}
                </p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Correct</p>
                <p className="text-2xl font-bold text-emerald-400">{testResult.correct}</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Wrong</p>
                <p className="text-2xl font-bold text-red-400">{testResult.wrong}</p>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Unattempted</p>
                <p className="text-2xl font-bold text-slate-400">{testResult.unattempted}</p>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Button variant="primary" onClick={() => router.push('/mocks')}>
                Return to Mock Hub
              </Button>
              <Button variant="secondary" onClick={() => router.push('/analytics')}>
                View Performance Analytics
              </Button>
            </div>
          </div>
        </main>
      ) : (
        /* Question Answering View */
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Question Pane */}
          <main className="flex-1 flex flex-col justify-between p-4 md:p-6 overflow-y-auto">
            <div className="space-y-4 max-w-4xl mx-auto w-full">
              {/* Question Metadata Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="info">{currentQ.section}</Badge>
                  <span className="text-xs text-slate-400">
                    Question {currentQ.questionNumber} of {EXAM_QUESTIONS.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400 font-medium">+{currentQ.marks} Marks</span>
                  {currentQ.negativeMarks > 0 && (
                    <span className="text-red-400 font-medium">-{currentQ.negativeMarks} Negative</span>
                  )}
                  <Badge variant="default">{currentQ.type}</Badge>
                </div>
              </div>

              {/* Question Text */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5">
                <p className="text-base text-slate-100 leading-relaxed whitespace-pre-wrap font-medium">
                  {currentQ.text}
                </p>
              </div>

              {/* Answer Input Area */}
              <div className="space-y-3 pt-2">
                {currentQ.type === 'NAT' ? (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <label className="block text-xs text-slate-400 mb-2">
                      Enter your numerical answer (use dot for decimal values):
                    </label>
                    <input
                      type="text"
                      value={answers[currentQ.id] || ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))
                      }
                      placeholder="e.g. 15 or 4.53"
                      className="w-full max-w-xs bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-base font-mono text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentQ.options?.map((opt, i) => {
                      const letter = String.fromCharCode(65 + i);
                      const isSelected = answers[currentQ.id] === letter;
                      return (
                        <button
                          key={letter}
                          onClick={() => handleSelectOption(letter)}
                          className={clsx(
                            'w-full text-left p-3.5 rounded-xl border flex items-center gap-3 transition-all',
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-slate-100'
                              : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                          )}
                        >
                          <span
                            className={clsx(
                              'w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0',
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-800 text-slate-400 border border-slate-700'
                            )}
                          >
                            {letter}
                          </span>
                          <span className="text-sm">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Question Controls Toolbar */}
            <div className="border-t border-slate-800 pt-4 mt-6 flex flex-wrap items-center justify-between gap-2 max-w-4xl mx-auto w-full">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleReview}
                  className="flex items-center gap-1.5"
                >
                  <Bookmark size={14} />
                  <span>
                    {markedForReview.has(currentQ.id) ? 'Unmark Review' : 'Mark for Review'}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearResponse}
                  className="flex items-center gap-1.5 text-slate-400"
                >
                  <RotateCcw size={14} />
                  <span>Clear Response</span>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={currentIdx === 0}
                  onClick={handlePrev}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> Previous
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentIdx === EXAM_QUESTIONS.length - 1}
                  className="flex items-center gap-1"
                >
                  Save & Next <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </main>

          {/* Right: Question Palette Sidebar */}
          <aside className="w-full md:w-80 bg-slate-900/90 border-t md:border-t-0 md:border-l border-slate-800 p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-semibold text-slate-200">Question Palette</h3>
                <span className="text-xs text-slate-400 font-mono">
                  {Object.keys(answers).length}/{EXAM_QUESTIONS.length} Answered
                </span>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600" /> Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-red-600" /> Not Answered
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-600" /> Marked Review
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700" /> Not Visited
                </div>
              </div>

              {/* Numbered Grid */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {EXAM_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={clsx(
                      'h-9 rounded-lg font-bold text-xs flex items-center justify-center border transition-all',
                      getQuestionStatusClass(q),
                      idx === currentIdx && 'ring-2 ring-indigo-400 ring-offset-1 ring-offset-slate-900'
                    )}
                  >
                    {q.questionNumber}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Button
                variant="success"
                size="md"
                onClick={() => setIsSubmitModalOpen(true)}
                className="w-full flex items-center justify-center gap-2"
              >
                <Flag size={16} />
                <span>Finish Examination</span>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      <Modal
        open={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Confirm Test Submission"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Are you sure you want to end your exam session? Your answers will be locked and graded instantly.
          </p>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Answered:</span>
              <strong className="text-emerald-400">{Object.keys(answers).length}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Marked for Review:</span>
              <strong className="text-amber-400">{markedForReview.size}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Remaining Unanswered:</span>
              <strong className="text-red-400">
                {EXAM_QUESTIONS.length - Object.keys(answers).length}
              </strong>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsSubmitModalOpen(false)}>
              Resume Exam
            </Button>
            <Button variant="primary" onClick={handleSubmitTest}>
              Yes, Submit Now
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
