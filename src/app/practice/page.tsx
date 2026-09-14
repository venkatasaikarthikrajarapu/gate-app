'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Progress from '@/components/ui/Progress';
import { CheckCircle, XCircle, Clock, Target, BookOpen, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

type QuestionType = 'MCQ' | 'MSQ' | 'NAT';

interface Question {
  id: string;
  subject: string;
  topic: string;
  type: QuestionType;
  marks: number;
  text: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

const DEMO_QUESTIONS: Question[] = [
  {
    id: 'pds-1',
    subject: '#1 PDS',
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
    subject: '#1 PDS',
    topic: 'Trees & Recurrences',
    type: 'NAT',
    marks: 2,
    text: 'What is the maximum number of nodes in a strictly binary tree with 12 leaves?',
    correctAnswer: '23',
    explanation: 'In a strictly binary tree, total nodes N = 2L - 1 where L is the number of leaf nodes. N = 2(12) - 1 = 23.',
  },
  {
    id: 'algo-1',
    subject: '#2 Algo',
    topic: 'Master Theorem',
    type: 'MCQ',
    marks: 2,
    text: 'What is the solution of the recurrence relation T(n) = 2T(n/2) + n*log(n)?',
    options: ['Θ(n log n)', 'Θ(n log² n)', 'Θ(n²)', 'Θ(n)'],
    correctAnswer: 'B',
    explanation: 'Here a=2, b=2, so n^(log_b a) = n^1. Since f(n) = n*log(n), by Extended Master Theorem Case 2, T(n) = Θ(n log² n).',
  },
  {
    id: 'dl-1',
    subject: '#3 DL',
    topic: 'Multiplexers',
    type: 'NAT',
    marks: 1,
    text: 'How many 2-to-1 Multiplexers are required to construct an 8-to-1 Multiplexer?',
    correctAnswer: '7',
    explanation: 'For 2^k to 1 MUX using 2 to 1 MUX: (8 - 1) = 7 MUX units are required.',
  },
  {
    id: 'coa-1',
    subject: '#4 COA',
    topic: 'Pipeline Clock Period',
    type: 'NAT',
    marks: 2,
    text: 'A 5-stage pipeline has stage delays 150ps, 120ps, 160ps, 140ps, and 110ps with 10ps latch delay. What is the clock period in ps?',
    correctAnswer: '170',
    explanation: 'Clock cycle = max(150, 120, 160, 140, 110) + 10 = 160 + 10 = 170 ps.',
  },
  {
    id: 'cn-1',
    subject: '#5 CN',
    topic: 'CIDR Subnetting',
    type: 'MCQ',
    marks: 2,
    text: 'An ISP allocates block 200.10.0.0/16 and creates 64 equal subnets. What is the subnet mask?',
    options: ['255.255.192.0', '255.255.252.0', '255.255.255.0', '255.255.254.0'],
    correctAnswer: 'B',
    explanation: '64 subnets = 2^6. Prefix = 16 + 6 = 22 bits. Subnet mask is 255.255.252.0.',
  },
  {
    id: 'os-1',
    subject: '#6 OS',
    topic: 'Page Replacement',
    type: 'MCQ',
    marks: 2,
    text: 'Which page replacement algorithm suffers from Belady’s Anomaly?',
    options: ['Optimal Replacement', 'LRU', 'FIFO', 'Clock Policy'],
    correctAnswer: 'C',
    explanation: 'FIFO does not satisfy the inclusion/stack property, so increasing frames can increase page faults.',
  },
  {
    id: 'dbms-1',
    subject: '#7 DBMS',
    topic: 'Serializability',
    type: 'MSQ',
    marks: 2,
    text: 'Which of the following statements regarding schedules are TRUE? (Select all that apply)',
    options: [
      'Every conflict-serializable schedule is view-serializable',
      'Every view-serializable schedule is conflict-serializable',
      'Strict 2PL prevents cascading rollbacks',
      'Conflict serializability testing is NP-complete',
    ],
    correctAnswer: ['A', 'C'],
    explanation: 'Conflict serializability is a strict subset of View serializability (A is true). Strict 2PL prevents cascading aborts (C is true). Testing conflict serializability is polynomial O(V+E).',
  },
  {
    id: 'toc-1',
    subject: '#8 TOC',
    topic: 'Context-Free Languages',
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
    explanation: 'L = { aⁿ bⁿ cⁿ } requires two stacks to verify three simultaneous counts and is Context-Sensitive.',
  },
  {
    id: 'cd-1',
    subject: '#9 CD',
    topic: 'Parser Hierarchy',
    type: 'MCQ',
    marks: 2,
    text: 'Which bottom-up parser has the highest expressive power?',
    options: ['LR(0)', 'SLR(1)', 'LALR(1)', 'Canonical LR(1)'],
    correctAnswer: 'D',
    explanation: 'The power hierarchy is LR(0) < SLR(1) < LALR(1) < CLR(1).',
  },
  {
    id: 'maths-1',
    subject: '#10 Maths',
    topic: 'Eigenvalues & Determinants',
    type: 'NAT',
    marks: 2,
    text: 'If 3x3 matrix A has eigenvalues 2, 3, and 5, what is the determinant of A²?',
    correctAnswer: '900',
    explanation: 'det(A) = 2 * 3 * 5 = 30. det(A²) = 30² = 900.',
  },
  {
    id: 'apti-1',
    subject: '#11 Apti',
    topic: 'Speed, Time & Distance',
    type: 'MCQ',
    marks: 1,
    text: 'A train 150 meters long passes a pole in 12 seconds. What is the speed in km/hr?',
    options: ['40 km/hr', '45 km/hr', '50 km/hr', '54 km/hr'],
    correctAnswer: 'B',
    explanation: 'Speed = 150 / 12 = 12.5 m/s = 12.5 * (18/5) = 45 km/hr.',
  },
];

const SUBJECTS = [
  'All',
  '#1 PDS',
  '#2 Algo',
  '#3 DL',
  '#4 COA',
  '#5 CN',
  '#6 OS',
  '#7 DBMS',
  '#8 TOC',
  '#9 CD',
  '#10 Maths',
  '#11 Apti',
];

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

interface SessionStats {
  done: number;
  correct: number;
}

export default function PracticePage() {
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [questions, setQuestions] = useState<Question[]>(DEMO_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqAnswer, setMcqAnswer] = useState<string>('');
  const [msqAnswers, setMsqAnswers] = useState<string[]>([]);
  const [natAnswer, setNatAnswer] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [session, setSession] = useState<SessionStats>({ done: 0, correct: 0 });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [loading, setLoading] = useState(false);

  // Timer
  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => setTimeElapsed((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [submitted, currentIndex]);

  const fetchQuestions = useCallback(async (subjectId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/practice?subjectId=${encodeURIComponent(subjectId)}&limit=10`
      );
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
      } else {
        setQuestions(
          subjectId === 'All'
            ? DEMO_QUESTIONS
            : DEMO_QUESTIONS.filter((q) => q.subject === subjectId)
        );
      }
    } catch {
      setQuestions(
        subjectId === 'All'
          ? DEMO_QUESTIONS
          : DEMO_QUESTIONS.filter((q) => q.subject === subjectId)
      );
    } finally {
      setLoading(false);
      setCurrentIndex(0);
      resetAnswer();
      setSubmitted(false);
    }
  }, []);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    fetchQuestions(subject === 'All' ? '' : subject);
  };

  const resetAnswer = () => {
    setMcqAnswer('');
    setMsqAnswers([]);
    setNatAnswer('');
    setSubmitted(false);
    setTimeElapsed(0);
  };

  const currentQuestion = questions[currentIndex];

  const handleMsqToggle = (label: string) => {
    setMsqAnswers((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  };

  const checkAnswer = (): boolean => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === 'MCQ') {
      return mcqAnswer === currentQuestion.correctAnswer;
    }
    if (currentQuestion.type === 'MSQ') {
      const sorted = [...msqAnswers].sort();
      const correct = [...(currentQuestion.correctAnswer as string[])].sort();
      return JSON.stringify(sorted) === JSON.stringify(correct);
    }
    if (currentQuestion.type === 'NAT') {
      return natAnswer.trim() === String(currentQuestion.correctAnswer);
    }
    return false;
  };

  const handleSubmit = async () => {
    const correct = checkAnswer();
    setIsCorrect(correct);
    setSubmitted(true);
    setSession((prev) => ({
      done: prev.done + 1,
      correct: prev.correct + (correct ? 1 : 0),
    }));

    try {
      await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userAnswer:
            currentQuestion.type === 'MSQ'
              ? msqAnswers
              : currentQuestion.type === 'NAT'
              ? natAnswer
              : mcqAnswer,
          timeTaken: timeElapsed,
        }),
      });
    } catch {
      // Ignore API errors — demo mode
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setCurrentIndex(0);
    }
    resetAnswer();
  };

  const hasAnswer = () => {
    if (!currentQuestion) return false;
    if (currentQuestion.type === 'MCQ') return mcqAnswer !== '';
    if (currentQuestion.type === 'MSQ') return msqAnswers.length > 0;
    if (currentQuestion.type === 'NAT') return natAnswer.trim() !== '';
    return false;
  };

  const accuracy =
    session.done > 0 ? Math.round((session.correct / session.done) * 100) : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
      <Header title="Practice Mode" />

      {/* Session Stats */}
      <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2 text-sm">
          <BookOpen size={16} className="text-indigo-400" />
          <span className="text-slate-400">Questions:</span>
          <span className="text-white font-semibold">{session.done}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle size={16} className="text-emerald-400" />
          <span className="text-slate-400">Correct:</span>
          <span className="text-white font-semibold">{session.correct}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Target size={16} className="text-amber-400" />
          <span className="text-slate-400">Accuracy:</span>
          <span className="text-white font-semibold">{accuracy}%</span>
        </div>
        <div className="flex-1 max-w-xs">
          <Progress value={accuracy} className="h-2" />
        </div>
        {!submitted && (
          <div className="flex items-center gap-2 text-sm ml-auto">
            <Clock size={16} className="text-slate-400" />
            <span className="text-slate-400 font-mono">{formatTime(timeElapsed)}</span>
          </div>
        )}
      </div>

      {/* Subject Filter */}
      <div className="px-6 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubjectSelect(subject)}
              className={clsx(
                'px-3 py-1 rounded-full text-xs font-medium transition-all',
                selectedSubject === subject
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              )}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500" />
          </div>
        ) : questions.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-400">No questions found for this subject.</p>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Card className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
              {/* Question Header */}
              <div className="px-6 py-4 border-b border-slate-700 flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="bg-indigo-900/50 text-indigo-300">
                  {currentQuestion.subject}
                </Badge>
                <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                  {currentQuestion.topic}
                </Badge>
                <div className="ml-auto flex items-center gap-4 text-sm text-slate-400">
                  <span>
                    Q{currentIndex + 1} of {questions.length}
                  </span>
                  <span className="text-amber-400 font-medium">
                    {currentQuestion.marks} mark{currentQuestion.marks !== 1 ? 's' : ''}
                  </span>
                  <Badge
                    variant="secondary"
                    className={clsx(
                      'text-xs',
                      currentQuestion.type === 'MCQ'
                        ? 'bg-blue-900/50 text-blue-300'
                        : currentQuestion.type === 'MSQ'
                        ? 'bg-purple-900/50 text-purple-300'
                        : 'bg-orange-900/50 text-orange-300'
                    )}
                  >
                    {currentQuestion.type}
                  </Badge>
                </div>
              </div>

              {/* Question Body */}
              <div className="px-6 py-6">
                <p className="text-white text-lg leading-relaxed mb-6">
                  {currentQuestion.text}
                </p>

                {/* MCQ */}
                {currentQuestion.type === 'MCQ' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, idx) => {
                      const label = OPTION_LABELS[idx];
                      const isSelected = mcqAnswer === label;
                      const isCorrectOpt =
                        submitted && label === currentQuestion.correctAnswer;
                      const isWrongOpt =
                        submitted && isSelected && label !== currentQuestion.correctAnswer;

                      return (
                        <label
                          key={label}
                          className={clsx(
                            'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                            submitted
                              ? isCorrectOpt
                                ? 'border-emerald-500 bg-emerald-900/20'
                                : isWrongOpt
                                ? 'border-red-500 bg-red-900/20'
                                : 'border-slate-700 bg-slate-900/30 opacity-60'
                              : isSelected
                              ? 'border-indigo-500 bg-indigo-900/20'
                              : 'border-slate-700 bg-slate-900/30 hover:border-slate-500'
                          )}
                        >
                          <input
                            type="radio"
                            name="mcq"
                            disabled={submitted}
                            checked={isSelected}
                            onChange={() => setMcqAnswer(label)}
                            className="mt-0.5 accent-indigo-500"
                          />
                          <span className="text-slate-300">
                            <span className="font-semibold text-white mr-2">({label})</span>
                            {opt}
                          </span>
                          {submitted && isCorrectOpt && (
                            <CheckCircle size={18} className="ml-auto text-emerald-400 shrink-0" />
                          )}
                          {submitted && isWrongOpt && (
                            <XCircle size={18} className="ml-auto text-red-400 shrink-0" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* MSQ */}
                {currentQuestion.type === 'MSQ' && currentQuestion.options && (
                  <div className="space-y-3">
                    <p className="text-slate-400 text-xs mb-2">Select all that apply</p>
                    {currentQuestion.options.map((opt, idx) => {
                      const label = OPTION_LABELS[idx];
                      const isSelected = msqAnswers.includes(label);
                      const correctArr = currentQuestion.correctAnswer as string[];
                      const isCorrectOpt = submitted && correctArr.includes(label);
                      const isWrongOpt = submitted && isSelected && !correctArr.includes(label);

                      return (
                        <label
                          key={label}
                          className={clsx(
                            'flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all',
                            submitted
                              ? isCorrectOpt
                                ? 'border-emerald-500 bg-emerald-900/20'
                                : isWrongOpt
                                ? 'border-red-500 bg-red-900/20'
                                : 'border-slate-700 bg-slate-900/30 opacity-60'
                              : isSelected
                              ? 'border-indigo-500 bg-indigo-900/20'
                              : 'border-slate-700 bg-slate-900/30 hover:border-slate-500'
                          )}
                        >
                          <input
                            type="checkbox"
                            disabled={submitted}
                            checked={isSelected}
                            onChange={() => handleMsqToggle(label)}
                            className="mt-0.5 accent-indigo-500"
                          />
                          <span className="text-slate-300">
                            <span className="font-semibold text-white mr-2">({label})</span>
                            {opt}
                          </span>
                          {submitted && isCorrectOpt && (
                            <CheckCircle size={18} className="ml-auto text-emerald-400 shrink-0" />
                          )}
                          {submitted && isWrongOpt && (
                            <XCircle size={18} className="ml-auto text-red-400 shrink-0" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* NAT */}
                {currentQuestion.type === 'NAT' && (
                  <div>
                    <label className="text-slate-400 text-sm mb-2 block">
                      Enter your numerical answer:
                    </label>
                    <input
                      type="number"
                      disabled={submitted}
                      value={natAnswer}
                      onChange={(e) => setNatAnswer(e.target.value)}
                      className="w-48 px-4 py-3 rounded-lg bg-slate-900 border border-slate-600 text-white text-lg font-mono focus:outline-none focus:border-indigo-500 disabled:opacity-60"
                      placeholder="Enter value"
                    />
                  </div>
                )}

                {/* Submit Button */}
                {!submitted && (
                  <div className="mt-6">
                    <Button
                      onClick={handleSubmit}
                      disabled={!hasAnswer()}
                      className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5"
                    >
                      Submit Answer
                    </Button>
                  </div>
                )}

                {/* Result */}
                {submitted && (
                  <div className="mt-6 space-y-4">
                    <div
                      className={clsx(
                        'flex items-center gap-3 p-4 rounded-lg',
                        isCorrect
                          ? 'bg-emerald-900/30 border border-emerald-500/40'
                          : 'bg-red-900/30 border border-red-500/40'
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle size={24} className="text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle size={24} className="text-red-400 shrink-0" />
                      )}
                      <div>
                        <p
                          className={clsx(
                            'font-semibold text-lg',
                            isCorrect ? 'text-emerald-400' : 'text-red-400'
                          )}
                        >
                          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-slate-300 mt-1">
                            Correct answer:{' '}
                            <span className="font-semibold text-white">
                              {Array.isArray(currentQuestion.correctAnswer)
                                ? currentQuestion.correctAnswer.join(', ')
                                : currentQuestion.correctAnswer}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-700">
                      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                        Explanation
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>

                    <Button
                      onClick={handleNext}
                      className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 flex items-center gap-2"
                    >
                      Next Question <ChevronRight size={16} />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
