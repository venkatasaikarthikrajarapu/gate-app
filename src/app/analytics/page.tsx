'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  TrendingUp,
  Target,
  Award,
  AlertCircle,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';

const DEMO_ANALYTICS = {
  overallAccuracy: 0,
  questionsSolved: 0,
  mockPercentile: 0,
  timePerQuestion: 0,
  weeklyTrend: [
    { day: 'Mon', accuracy: 0, count: 0 },
    { day: 'Tue', accuracy: 0, count: 0 },
    { day: 'Wed', accuracy: 0, count: 0 },
    { day: 'Thu', accuracy: 0, count: 0 },
    { day: 'Fri', accuracy: 0, count: 0 },
    { day: 'Sat', accuracy: 0, count: 0 },
    { day: 'Sun', accuracy: 0, count: 0 },
  ],
  subjectPerformance: [
    { subject: 'PDS', accuracy: 0, target: 80 },
    { subject: 'Algo', accuracy: 0, target: 80 },
    { subject: 'DL', accuracy: 0, target: 80 },
    { subject: 'COA', accuracy: 0, target: 80 },
    { subject: 'CN', accuracy: 0, target: 80 },
    { subject: 'OS', accuracy: 0, target: 80 },
    { subject: 'DBMS', accuracy: 0, target: 80 },
    { subject: 'TOC', accuracy: 0, target: 80 },
    { subject: 'CD', accuracy: 0, target: 80 },
    { subject: 'Maths', accuracy: 0, target: 80 },
    { subject: 'Apti', accuracy: 0, target: 80 },
  ],
  radarData: [
    { subject: 'PDS', score: 0 },
    { subject: 'Algo', score: 70 },
    { subject: 'DL', score: 0 },
    { subject: 'COA', score: 0 },
    { subject: 'CN', score: 0 },
    { subject: 'OS', score: 0 },
    { subject: 'DBMS', score: 0 },
    { subject: 'TOC', score: 0 },
    { subject: 'CD', score: 0 },
    { subject: 'Maths', score: 0 },
    { subject: 'Apti', score: 0 },
  ],
  weakTopics: [] as Array<{
    topic: string;
    subject: string;
    accuracy: number;
    attempts: number;
    trap: string;
    recommendation: string;
  }>,
};

export default function AnalyticsPage() {
  const [data, setData] = useState(DEMO_ANALYTICS);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res) setData((prev) => ({ ...prev, ...res }));
      })
      .catch(() => {
        // demo fallback
      });
  }, []);

  return (
    <div className="flex-1">
      <Header
        title="Performance & Mastery Analytics"
        subtitle="Data-driven diagnosis of your strengths, blind spots, and syllabus readiness"
      />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Target size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Overall Accuracy</p>
                <p className="text-xl font-bold text-slate-100">{data.overallAccuracy}%</p>
                <p className="text-[11px] text-emerald-400">+5% vs last week</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Questions Solved</p>
                <p className="text-xl font-bold text-slate-100">{data.questionsSolved}</p>
                <p className="text-[11px] text-slate-400">Across 8 subjects</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Predicted Percentile</p>
                <p className="text-xl font-bold text-slate-100">{data.mockPercentile}th</p>
                <p className="text-[11px] text-purple-400">AIR Top 500 zone</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/80 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Avg Pace / Question</p>
                <p className="text-xl font-bold text-slate-100">{data.timePerQuestion}m</p>
                <p className="text-[11px] text-amber-400">Optimal (GATE ~2.7m)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Accuracy Evolution (2 cols) */}
          <Card className="lg:col-span-2 bg-slate-900/80 border-slate-800">
            <CardHeader
              title="Daily Accuracy & Volume Velocity"
              subtitle="7-day rolling window of problem accuracy and question volume"
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.weeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                    formatter={(v: number, name: string) => [name === 'accuracy' ? `${v}%` : v, name === 'accuracy' ? 'Accuracy' : 'Questions']}
                  />
                  <Area type="monotone" dataKey="accuracy" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAcc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Radar Chart (1 col) */}
          <Card className="bg-slate-900/80 border-slate-800 flex flex-col justify-between">
            <CardHeader
              title="Syllabus Balance Radar"
              subtitle="Subject mastery distribution"
            />
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.radarData} outerRadius="75%">
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                  <Radar name="Mastery" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Subject-Wise Mastery Table */}
        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader
            title="Subject-Wise Mastery Breakdown"
            subtitle="Comparing your current accuracy against the 99th percentile target benchmarks"
          />
          <div className="space-y-4 pt-2">
            {data.subjectPerformance.map((subj) => (
              <div key={subj.subject} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{subj.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">Target: {subj.target}%</span>
                    <Badge
                      variant={
                        subj.accuracy >= 75
                          ? 'success'
                          : subj.accuracy >= 60
                          ? 'warning'
                          : 'error'
                      }
                    >
                      {subj.accuracy}% Current
                    </Badge>
                  </div>
                </div>
                <Progress value={subj.accuracy} max={100} size="sm" />
              </div>
            ))}
          </div>
        </Card>

        {/* Actionable Weak Topic Radar & Prescriptions */}
        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader
            title="High-Priority Remediation Targets"
            subtitle="Identified through mistake classification and negative mark clustering"
            action={<Badge variant="error">Immediate Action Required</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {data.weakTopics.map((item, i) => (
              <div
                key={i}
                className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="default" className="text-[10px] mb-1">
                      {item.subject}
                    </Badge>
                    <h4 className="text-sm font-semibold text-slate-100">{item.topic}</h4>
                  </div>
                  <Badge variant="error">{item.accuracy}% Accuracy</Badge>
                </div>

                <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-xs text-red-300 flex items-start gap-2">
                  <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Common Trap:</strong> {item.trap}
                  </span>
                </div>

                <div className="bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg text-xs text-indigo-300 flex items-start gap-2">
                  <Lightbulb size={15} className="flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Remedy:</strong> {item.recommendation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
