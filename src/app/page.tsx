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
  TrendingUp, CheckCircle, AlertTriangle, Zap,
} from 'lucide-react';

/* ─── Demo data (shows immediately, replaced by real API data) ─── */
const DEMO_WEEK_ACCURACY = [
  { day: 'Mon', accuracy: 62 },
  { day: 'Tue', accuracy: 71 },
  { day: 'Wed', accuracy: 58 },
  { day: 'Thu', accuracy: 80 },
  { day: 'Fri', accuracy: 74 },
  { day: 'Sat', accuracy: 88 },
  { day: 'Sun', accuracy: 82 },
];

const DEMO_SUBJECTS = [
  { name: 'Data Structures', progress: 78, accuracy: 82, color: 'indigo' as const },
  { name: 'Algorithms', progress: 65, accuracy: 71, color: 'indigo' as const },
  { name: 'Operating Systems', progress: 52, accuracy: 63, color: 'indigo' as const },
  { name: 'DBMS', progress: 45, accuracy: 58, color: 'indigo' as const },
  { name: 'Computer Networks', progress: 38, accuracy: 54, color: 'indigo' as const },
  { name: 'Theory of Computation', progress: 30, accuracy: 48, color: 'indigo' as const },
];

const DEMO_TODAY = [
  { subject: 'Data Structures', topic: 'AVL Trees', duration: 45, done: true },
  { subject: 'Algorithms', topic: 'Dynamic Programming', duration: 60, done: false },
  { subject: 'DBMS', topic: 'SQL Joins & Aggregations', duration: 45, done: false },
];

const DEMO_STATS = {
  streak: 7,
  questionsToday: 28,
  accuracyToday: 82,
  studyHours: 3.5,
  daysToGATE: 148,
};

export default function DashboardPage() {
  const [stats, setStats] = useState(DEMO_STATS);
  const [weekData, setWeekData] = useState(DEMO_WEEK_ACCURACY);
  const [subjects, setSubjects] = useState(DEMO_SUBJECTS);
  const [todayPlan, setTodayPlan] = useState(DEMO_TODAY);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data) return;
        if (data.stats) setStats(data.stats);
        if (data.weekAccuracy) setWeekData(data.weekAccuracy);
        if (data.subjects) setSubjects(data.subjects);
        if (data.todayPlan) setTodayPlan(data.todayPlan);
      })
      .catch(() => { /* keep demo data */ });
  }, []);

  const completedToday = todayPlan.filter((t) => t.done).length;

  return (
    <div className="flex-1">
      <Header
        title="Dashboard"
        subtitle={`GATE 2025 — ${stats.daysToGATE} days remaining`}
        streak={stats.streak}
      />

      <main className="p-4 md:p-6 space-y-5 max-w-7xl mx-auto">
        {/* Quick stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<Flame className="text-amber-400" size={20} />} label="Day Streak" value={`${stats.streak} days`} sub="Keep it up!" color="amber" />
          <StatCard icon={<CheckCircle className="text-emerald-400" size={20} />} label="Questions Today" value={stats.questionsToday} sub={`${stats.accuracyToday}% accuracy`} color="emerald" />
          <StatCard icon={<Clock className="text-indigo-400" size={20} />} label="Study Hours" value={`${stats.studyHours}h`} sub="Today" color="indigo" />
          <StatCard icon={<Target className="text-purple-400" size={20} />} label="Days to GATE" value={stats.daysToGATE} sub="Stay focused" color="purple" />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-5">
          {/* Left: Today's plan */}
          <div className="xl:col-span-1 space-y-4">
            <Card>
              <CardHeader
                title="Today's Study Plan"
                subtitle={`${completedToday}/${todayPlan.length} completed`}
                action={<Badge variant="info">{new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</Badge>}
              />
              <div className="space-y-2.5">
                {todayPlan.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${item.done ? 'bg-emerald-500/8 border border-emerald-500/15' : 'bg-slate-800/50 border border-slate-700/50'}`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${item.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>
                      {item.done && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${item.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>{item.topic}</p>
                      <p className="text-xs text-slate-500">{item.subject} · {item.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick actions */}
            <Card>
              <CardHeader title="Quick Start" />
              <div className="grid grid-cols-1 gap-2">
                <Link href="/practice">
                  <Button variant="primary" size="md" className="w-full justify-start">
                    <BookOpen size={16} /> Start Practice Session
                  </Button>
                </Link>
                <Link href="/mocks">
                  <Button variant="secondary" size="md" className="w-full justify-start">
                    <ClipboardList size={16} /> Take a Mock Test
                  </Button>
                </Link>
                <Link href="/notes">
                  <Button variant="ghost" size="md" className="w-full justify-start">
                    <FileText size={16} /> Review Formula Decks
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Center + Right: Charts and progress */}
          <div className="xl:col-span-2 space-y-4">
            {/* Accuracy chart */}
            <Card>
              <CardHeader
                title="7-Day Accuracy Trend"
                subtitle="Questions answered correctly"
                action={<Badge variant="success" dot>{stats.accuracyToday}% today</Badge>}
              />
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
                    <defs>
                      <linearGradient id="accGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: '#94a3b8' }}
                      formatter={(val: number) => [`${val}%`, 'Accuracy']}
                    />
                    <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2} fill="url(#accGrad)" dot={{ fill: '#6366f1', strokeWidth: 0, r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Subject progress */}
            <Card>
              <CardHeader title="Subject Progress" subtitle="Coverage · Accuracy" action={<Link href="/analytics"><span className="text-xs text-indigo-400 hover:text-indigo-300">View all →</span></Link>} />
              <div className="space-y-3.5">
                {subjects.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300 font-medium">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant={s.accuracy >= 75 ? 'success' : s.accuracy >= 55 ? 'warning' : 'error'}>
                          {s.accuracy}% acc
                        </Badge>
                      </div>
                    </div>
                    <Progress value={s.progress} size="sm" showValue />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Motivational footer */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-indigo-600/10 border border-indigo-600/20">
          <Zap size={18} className="text-indigo-400 flex-shrink-0" />
          <p className="text-sm text-indigo-300">
            <strong>Tip:</strong> Consistent 4-hour daily sessions beats 10-hour cramming.
            You&apos;re on a <strong>{stats.streak}-day</strong> streak — don&apos;t break it!
          </p>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon, label, value, sub, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <Card className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-xl bg-${color}-500/15 flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 truncate">{label}</p>
        <p className="text-xl font-bold text-slate-100 leading-tight">{value}</p>
        <p className="text-xs text-slate-500 truncate">{sub}</p>
      </div>
    </Card>
  );
}
