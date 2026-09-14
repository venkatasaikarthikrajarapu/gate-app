export type PriorityLevel = 'low' | 'medium' | 'high';
export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'very_hard';
export type RiskLevel = 'LOW' | 'WATCH' | 'HIGH' | 'CRITICAL';
export type DayMode = 'full' | 'normal' | 'busy' | 'emergency' | 'holiday' | 'exam';

export interface SchedulerTopic {
  id: string;
  subjectId: string;
  subjectName: string;
  name: string;
  estimatedHours: number;
  priority: PriorityLevel;
  difficulty: DifficultyLevel;
  pinned: boolean;
  status: string;
  masteryScore: number;
  completionPercent: number;
  marksWeight: number;
  remainingHours: number;
  dependsOn?: string[];
  consecutiveDaysStudied?: number;
}

export interface DailyCapacityConfig {
  normalDefault: number;
  recoveryMultiplier: number;
  bufferPercent: number;
  hardCap: number;
  dailyCeiling: number;
}

export interface SchedulerInputState {
  today: string; // YYYY-MM-DD
  timezone: string;
  examConfig: {
    examDate: string;
    phases: Array<{
      key: string;
      label: string;
      startDate: string;
      endDate: string;
      mode: string;
    }>;
  };
  phase: string;
  topics: SchedulerTopic[];
  availability: {
    weekdayTemplates: Array<{ weekday: number; hours: number }>;
    dayOverrides?: Record<string, number>;
    dayModes?: Record<string, DayMode>;
  };
  capacityConfig: DailyCapacityConfig;
  backlog: {
    carriedMinutes: number;
    absorptionWindow: number; // default 7
  };
  revisionQueueCount: number;
  pendingMistakeCount: number;
  recentEvents?: Array<{
    eventType: string;
    payload: any;
    occurredAt: string;
  }>;
}

export interface ScheduledTaskBlock {
  id: string;
  topicId?: string;
  topicName?: string;
  subjectId?: string;
  subjectName?: string;
  type: 'study' | 'practice' | 'revision' | 'diagnostic' | 'mock' | 'mock_analysis' | 'mistake_review' | 'notes' | 'buffer';
  plannedMinutes: number;
  orderIndex: number;
  note?: string;
}

export interface ScheduledDay {
  date: string; // YYYY-MM-DD
  mode: DayMode;
  totalCapacityMinutes: number;
  usableStudyMinutes: number;
  bufferMinutes: number;
  tasks: ScheduledTaskBlock[];
}

export interface DeadlineRisk {
  requiredDailyHours: number;
  ratio: number;
  level: RiskLevel;
  projectedFinishDate: string;
  daysRemainingToPhaseDeadline: number;
  daysRemainingToExam: number;
}

export interface RecoveryPlanOption {
  planType: 'A' | 'B' | 'C';
  title: string;
  description: string;
  dailyHours: number;
  projectedFinishDate: string;
  riskLevel: RiskLevel;
  tradeoffs: string[];
}

export interface SchedulerOutput {
  horizonDays: ScheduledDay[];
  risk: DeadlineRisk;
  explanation: {
    summary: string;
    trigger: string;
    details?: Record<string, any>;
  };
  recoveryOptions?: RecoveryPlanOption[];
}
