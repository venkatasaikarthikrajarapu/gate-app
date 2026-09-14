'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  BookOpen, ClipboardList, FileText, Flame, Target, Clock,
  CheckCircle, Zap, ArrowRight, Sparkles, Compass, Check,
  ChevronLeft, ChevronRight, Calendar, AlertCircle, CheckCircle2,
  ListTodo, Layers,
} from 'lucide-react';
import clsx from 'clsx';
import { GATE_125_DAY_SCHEDULE, DailyScheduleItem } from '@/lib/schedule-data';

/* --- 11 Sequential Subjects from the User\s Roadmap --- */
interface RoadmapSubject {
  order: number;
  code: string;
  name: string;
  badgeColor: string;
  dotColor: string;
  status: 'active' | 'upcoming' | 'completed';
  progress: number;
  accuracy: number;
}

const ROADMAP_SUBJECTS: RoadmapSubject[] = [
  { order: 1, code: 'PDS', name: 'Programming & Data Structures', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'active', progress: 0, accuracy: 0 },
  { order: 2, code: 'Algo', name: 'Algorithms', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 3, code: 'DL', name: 'Digital Logic', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 4, code: 'COA', name: 'Computer Organization & Architecture', badgeColor: 'border-sky-500/40 bg-sky-950/40 text-sky-300', dotColor: 'bg-sky-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 5, code: 'CN', name: 'Computer Networks', badgeColor: 'border-sky-500/40 bg-sky-950/40 text-sky-300', dotColor: 'bg-sky-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 6, code: 'OS', name: 'Operating Systems', badgeColor: 'border-purple-500/40 bg-purple-950/40 text-purple-300', dotColor: 'bg-purple-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 7, code: 'DBMS', name: 'Database Management Systems', badgeColor: 'border-red-500/40 bg-red-950/40 text-red-300', dotColor: 'bg-red-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 8, code: 'TOC', name: 'Theory of Computation', badgeColor: 'border-amber-500/40 bg-amber-950/40 text-amber-300', dotColor: 'bg-amber-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 9, code: 'CD', name: 'Compiler Design', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 10, code: 'Maths', name: 'Engineering & Discrete Mathematics', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'upcoming', progress: 0, accuracy: 0 },
  { order: 11, code: 'Apti', name: 'General Aptitude', badgeColor: 'border-emerald-500/40 bg-emerald-950/40 text-emerald-300', dotColor: 'bg-emerald-400', status: 'upcoming', progress: 0, accuracy: 0 },
];

/* --- Fresh Day-1 Start Data --- */
const FRESH_STATS = {
  streak: 1,
  questionsToday: 0,
  accuracyToday: 0,
  studyHours: 0.0,
  daysToGATE: 150,
  currentStage: 1,
  currentSubjectCode: 'PDS',
  currentSubjectName: 'Programming & Data Structures',
};

const FRESH_WEEK_ACCURACY = [
  { day: 'Mon', accuracy: 0 },
  { day: 'Tue', accuracy: 0 },
  { day: 'Wed', accuracy: 0 },
  { day: 'Thu', accuracy: 0 },
  { day: 'Fri', accuracy: 0 },
  { day: 'Sat', accuracy: 0 },
  { day: 'Sun', accuracy: 0 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState(FRESH_STATS);
  const [weekData, setWeekData] = useState(FRESH_WEEK_ACCURACY);
  const [subjects, setSubjects] = useState<RoadmapSubject[]>(ROADMAP_SUBJECTS);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({
    'day1-t1': true,
  });

  const currentScheduleItem: DailyScheduleItem =
    GATE_125_DAY_SCHEDULE.find((s) => s.day === activeDay) || GATE_125_DAY_SCHEDULE[0];

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((prev) => ({
      ...prev,
      [`day${activeDay}-${taskId}`]: !prev[`day${activeDay}-${taskId}`],
    }));
  };

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.stats) setStats(data.stats);
        if (data.weekAccuracy) setWeekData(data.weekAccuracy);
        if (data.roadmapSubjects) setSubjects(data.roadmapSubjects);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex-1">
      <Header
        title="GATE CSE Command Center"
        subtitle="11-Subject Sequential Mastery � Day-by-Day Study Schedule"
        streak={stats.streak}
      />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* -- Top Fresh Day-1 Stat Cards -- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <StatCard
            label="Day Streak"
            value={`${stats.streak} Day`}
            sub="Day 1 fresh start"
            icon={<Flame className="text-amber-400" size={18} />}
            accent="border-amber-500/20 bg-amber-500/5"
          />
          <StatCard
            label="Questions Solved"
            value={`${stats.questionsToday}`}
            sub="0 / 25 daily goal"
            icon={<Target className="text-indigo-400" size={18} />}
            accent="border-indigo-500/20 bg-indigo-500/5"
          />
          <StatCard
            label="Today's Accuracy"
            value={`${stats.accuracyToday}%`}
            sub="Awaiting first submission"
            icon={<Zap className="text-emerald-400" size={18} />}
            accent="border-emerald-500/20 bg-emerald-500/5"
          />
          <StatCard
            label="Current Phase"
            value="#1 PDS"
            sub="Day 1 of 125 Roadmap"
            icon={<Clock className="text-sky-400" size={18} />}
            accent="border-sky-500/20 bg-sky-500/5"
          />
        </div>

        {/* -- Active Day-by-Day Topic Schedule Navigator -- */}
        <Card className="bg-slate-900/90 border-slate-800 p-5 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-base">
                {activeDay}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple">Day {currentScheduleItem.day} of 125</Badge>
                  <Badge variant="default">{currentScheduleItem.subjectCode}</Badge>
                </div>
                <h2 className="text-lg font-bold text-slate-100 mt-1">
                  {currentScheduleItem.topicTitle}
                </h2>
                <p className="text-xs text-slate-400">{currentScheduleItem.phase}</p>
              </div>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveDay((d) => Math.max(1, d - 1))}
                disabled={activeDay === 1}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Previous Day"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                Day {activeDay} / {GATE_125_DAY_SCHEDULE.length}
              </div>
              <button
                onClick={() => setActiveDay((d) => Math.min(GATE_125_DAY_SCHEDULE.length, d + 1))}
                disabled={activeDay === GATE_125_DAY_SCHEDULE.length}
                className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                title="Next Day"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Schedule Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Column 1: Subtopics Checklist */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ListTodo size={14} className="text-indigo-400" /> Key Subtopics to Master
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  ~{currentScheduleItem.estimatedHours} Hours
                </span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentScheduleItem.subtopics.map((sub, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{sub}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: High Yield Takeaways */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" /> High-Yield Exam Takeaways
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {currentScheduleItem.highYieldPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed text-slate-300">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Daily Action Checklist */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <CheckCircle size={14} className="text-emerald-400" /> Daily Target Checklist
                </span>
                <div className="space-y-2">
                  {currentScheduleItem.tasks.map((t) => {
                    const isChecked = !!completedTaskIds[`day${activeDay}-${t.id}`];
                    return (
                      <button
                        key={t.id}
                        onClick={() => toggleTask(t.id)}
                        className={clsx(
                          'w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all',
                          isChecked
                            ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        )}
                      >
                        <div
                          className={clsx(
                            'w-4 h-4 rounded mt-0.5 flex items-center justify-center flex-shrink-0 border',
                            isChecked
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'border-slate-600 bg-slate-800'
                          )}
                        >
                          {isChecked && <Check size={10} />}
                        </div>
                        <span className={clsx(isChecked && 'line-through text-slate-400')}>
                          {t.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex gap-2">
                <Link
                  href="/practice"
                  className="flex-1 text-center py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1"
                >
                  <Zap size={13} /> Practice Questions
                </Link>
                <Link
                  href="/notes"
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 flex items-center justify-center gap-1"
                >
                  <BookOpen size={13} /> Notes Vault
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* -- Visual Serpentine Roadmap of the 11 Subjects -- */}
        <Card className="bg-slate-900/90 border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="text-indigo-400" size={18} />
              <h2 className="text-sm md:text-base font-semibold text-slate-100">
                11-Subject Sequential Roadmap
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Stage
              </span>
              <span className="text-slate-600">�</span>
              <span className="text-slate-400">Sequential Execution</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Subjects are ordered strictly in learning sequence from foundational to advanced. Complete each subject sequentially to unlock the next milestone.
          </p>

          {/* Row 1: Left to Right -> #1 PDS, #2 Algo, #3 DL, #4 COA */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Row 1: Foundations & Architecture
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subjects.slice(0, 4).map((sub) => (
                <RoadmapNode
                  key={sub.code}
                  subject={sub}
                  onClick={() => {
                    if (sub.code === 'PDS') setActiveDay(1);
                    else if (sub.code === 'Algo') setActiveDay(13);
                    else if (sub.code === 'DL') setActiveDay(25);
                    else if (sub.code === 'COA') setActiveDay(35);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left -> #7 DBMS <- #6 OS <- #5 CN */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Row 2: Systems, Networks & Databases
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {subjects.slice(4, 7).map((sub) => (
                <RoadmapNode
                  key={sub.code}
                  subject={sub}
                  onClick={() => {
                    if (sub.code === 'CN') setActiveDay(47);
                    else if (sub.code === 'OS') setActiveDay(59);
                    else if (sub.code === 'DBMS') setActiveDay(71);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Row 3: Left to Right -> #8 TOC -> #9 CD -> #10 Maths -> #11 Apti */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Row 3: Theory, Compilers, Mathematics & Aptitude
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {subjects.slice(7, 11).map((sub) => (
                <RoadmapNode
                  key={sub.code}
                  subject={sub}
                  onClick={() => {
                    if (sub.code === 'TOC') setActiveDay(83);
                    else if (sub.code === 'CD') setActiveDay(95);
                    else if (sub.code === 'Maths') setActiveDay(105);
                    else if (sub.code === 'Apti') setActiveDay(119);
                  }}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* -- 11-Subject Progress Ledger -- */}
        <Card className="bg-slate-900/90 border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">
              11-Subject Completion Ledger (Day 1 Fresh Start)
            </h3>
            <span className="text-xs text-indigo-400 font-mono">Total 0% Complete</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjects.map((sub) => (
              <div
                key={sub.code}
                className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">
                    #{sub.order} {sub.code}
                  </span>
                  <span className="text-slate-400 font-mono">{sub.progress}%</span>
                </div>
                <Progress value={sub.progress} size="xs" color="indigo" />
                <p className="text-[11px] text-slate-400 truncate">{sub.name}</p>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <Card className={clsx('p-4 border', accent)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-xl md:text-2xl font-bold text-slate-100">{value}</div>
      <div className="text-[11px] text-slate-400 mt-1">{sub}</div>
    </Card>
  );
}

function RoadmapNode({
  subject,
  onClick,
}: {
  subject: RoadmapSubject;
  onClick: () => void;
}) {
  const isActive = subject.status === 'active';
  return (
    <button
      onClick={onClick}
      className={clsx(
        'text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group',
        isActive
          ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/30'
          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
      )}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={clsx(
            'text-xs font-bold px-2 py-0.5 rounded-md border',
            subject.badgeColor
          )}
        >
          #{subject.order} {subject.code}
        </span>
        <span className={clsx('w-2 h-2 rounded-full', subject.dotColor)} />
      </div>

      <div className="text-xs font-medium text-slate-200 line-clamp-1 group-hover:text-indigo-300 transition-colors">
        {subject.name}
      </div>

      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
        <span>{isActive ? 'In Progress' : 'Upcoming'}</span>
        <span>0%</span>
      </div>
    </button>
  );
}
