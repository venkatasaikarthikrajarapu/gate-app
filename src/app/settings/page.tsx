'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Settings as SettingsIcon,
  Calendar,
  Clock,
  BookOpen,
  User,
  Shield,
  Save,
  CheckCircle2,
  Database,
  Bell,
  Sparkles,
} from 'lucide-react';

const ALL_SUBJECTS = [
  { id: 'pds',   name: '#1 Programming & Data Structures', enabled: true },
  { id: 'algo',  name: '#2 Algorithms', enabled: true },
  { id: 'dl',    name: '#3 Digital Logic', enabled: true },
  { id: 'coa',   name: '#4 Computer Organization & Architecture', enabled: true },
  { id: 'cn',    name: '#5 Computer Networks', enabled: true },
  { id: 'os',    name: '#6 Operating Systems', enabled: true },
  { id: 'dbms',  name: '#7 Database Management Systems', enabled: true },
  { id: 'toc',   name: '#8 Theory of Computation', enabled: true },
  { id: 'cd',    name: '#9 Compiler Design', enabled: true },
  { id: 'math',  name: '#10 Engineering & Discrete Mathematics', enabled: true },
  { id: 'apti',  name: '#11 General Aptitude', enabled: true },
];

export default function SettingsPage() {
  const [examDate, setExamDate] = useState('2025-02-01');
  const [targetScore, setTargetScore] = useState(75);
  const [dailyHours, setDailyHours] = useState(4);
  const [studyTimePreference, setStudyTimePreference] = useState<'morning' | 'evening' | 'flexible'>('morning');
  const [notifications, setNotifications] = useState(true);
  const [subjects, setSubjects] = useState(ALL_SUBJECTS);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSubject = (id: string) => {
    setSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex-1">
      <Header
        title="Settings & Study Preferences"
        subtitle="Configure your target GATE score, daily pacing algorithm, and syllabus weighting"
      />

      <main className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
        {savedSuccess && (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-300 flex items-center gap-3 animate-in fade-in-0">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">
              Study configuration updated successfully. Pacing engine recalculated.
            </span>
          </div>
        )}

        {/* Exam Timeline & Target */}
        <Card className="bg-slate-900/80 border-slate-800 space-y-4">
          <CardHeader
            title="Target Examination Parameters"
            subtitle="The adaptive scheduler calibrates question intensity according to these goals"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Calendar size={14} className="text-indigo-400" />
                GATE Examination Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  Target Score (out of 100)
                </span>
                <span className="text-amber-400 font-bold text-sm">{targetScore} Marks</span>
              </div>
              <input
                type="range"
                min="40"
                max="95"
                value={targetScore}
                onChange={(e) => setTargetScore(Number(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                A target of {targetScore} typically correlates with an All India Rank (AIR) in the top 300.
              </p>
            </div>
          </div>
        </Card>

        {/* Daily Schedule & Pacing */}
        <Card className="bg-slate-900/80 border-slate-800 space-y-4">
          <CardHeader
            title="Daily Study Commitment"
            subtitle="Used to budget practice blocks and spaced repetition review cards"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-400" />
                  Daily Study Hours Allocation
                </span>
                <span className="text-indigo-400 font-bold text-sm">{dailyHours} Hours/Day</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">
                Recommended: 3–5 hours daily for working professionals/students, 6–8 for full-time aspirants.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Peak Study Hours Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'evening', 'flexible'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setStudyTimePreference(pref)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium capitalize border transition-all ${
                      studyTimePreference === pref
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Subject Activation / Syllabus Scoping */}
        <Card className="bg-slate-900/80 border-slate-800 space-y-4">
          <CardHeader
            title="Active Syllabus Modules"
            subtitle="Enable or temporarily disable subjects depending on your current phase of preparation"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subjects.map((subj) => (
              <label
                key={subj.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-colors"
              >
                <span className="text-xs font-medium text-slate-200">{subj.name}</span>
                <input
                  type="checkbox"
                  checked={subj.enabled}
                  onChange={() => toggleSubject(subj.id)}
                  className="w-4 h-4 rounded text-indigo-600 accent-indigo-600 bg-slate-900 border-slate-700 focus:ring-0 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </Card>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="lg" onClick={handleSave} className="flex items-center gap-2">
            <Save size={18} />
            <span>Save Preferences & Sync</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
