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
    id: 'q1',
    subject: 'Data Structures',
    topic: 'AVL Trees',
    type: 'MCQ',
    marks: 2,
    text: 'What is the time complexity of searching in a balanced AVL tree with n nodes?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctAnswer: 'B',
    explanation: 'AVL trees maintain balance with height O(log n), so search is O(log n).',
  },
  {
    id: 'q2',
    subject: 'Algorithms',
    topic: 'Dynamic Programming',
    type: 'MCQ',
    marks: 2,
    text: 'Which of the following problems CANNOT be solved efficiently using Dynamic Programming?',
    options: [
      'Longest Common Subsequence',
      'Matrix Chain Multiplication',
      'Hamiltonian Cycle',
      'Knapsack Problem',
    ],
    correctAnswer: 'C',
    explanation: 'Hamiltonian Cycle is NP-complete and has no known polynomial DP solution.',
  },
  {
    id: 'q3',
    subject: 'Operating Systems',
    topic: 'Scheduling',
    type: 'NAT',
    marks: 2,
    text: 'In Round Robin scheduling with time quantum = 3ms, given processes P1(6ms), P2(4ms), P3(2ms) arriving at t=0, what is the average waiting time (in ms)?',
    correctAnswer: '4',
    explanation:
      'P1 waits: 0+5=5ms, P2 waits: 3+4=7ms (partial), P3 waits: 6ms. Average = (4+6+2)/3 = 4ms',
  },
  {
    id: 'q4',
    subject: 'DBMS',
    topic: 'Normalization',
    type: 'MCQ',
    marks: 1,
    text: 'A relation R(A, B, C) with FDs: A→B, B→C is in which highest normal form?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    correctAnswer: 'B',
    explanation:
      'A→B and B→C creates transitive dependency (A→C via B), so it is in 2NF but not 3NF.',
  },
  {
    id: 'q5',
    subject: 'Computer Networks',
    topic: 'TCP/IP',
    type: 'MSQ',
    marks: 2,
    text: 'Which of the following are features of TCP? (Select all that apply)',
    options: [
      'Connection-oriented',
      'Unreliable delivery',
      'Flow control',
      'Error detection',
    ],
    correctAnswer: ['A', 'C', 'D'],
    explanation:
      'TCP is connection-oriented with flow control and error detection. UDP is unreliable.',
  },
];

const SUBJECTS = [
  'All',
  'Data Structures',
  'Algorithms',
  'Operating Systems',
  'DBMS',
  'Computer Networks',
  'Theory of Computation',
  'Digital Logic',
  'Computer Organization',
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
