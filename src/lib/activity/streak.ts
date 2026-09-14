export interface DayActivitySummary {
  date: string; // YYYY-MM-DD
  actualMinutes: number;
  dayMode?: 'full' | 'normal' | 'busy' | 'emergency' | 'holiday' | 'exam';
  tasksCompletedCount: number;
}

export interface StreakComputationResult {
  currentStreak: number;
  longestStreak: number;
  totalDaysStudied: number;
  missedDaysCount: number;
  lastActiveDate: string | null;
  recoveryNotice?: string;
}

/**
 * Non-toxic streak engine.
 * Directive D4 & Section P5:
 * Emergency days (>=45 min) and busy days count as active preparation days.
 * Missed days trigger gentle recovery copy, never streak-shaming.
 */
export function computeNonToxicStreak(
  history: DayActivitySummary[],
  todayStr: string
): StreakComputationResult {
  if (history.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalDaysStudied: 0,
      missedDaysCount: 0,
      lastActiveDate: null
    };
  }

  // Sort history chronologically
  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let totalDaysStudied = 0;
  let missedDaysCount = 0;
  let lastActiveDate: string | null = null;

  for (const day of sorted) {
    // Active day definition:
    // Normal/Full: actualMinutes >= 45 or tasksCompletedCount >= 1
    // Emergency: actualMinutes >= 30 (emergency floor)
    const isEmergency = day.dayMode === 'emergency';
    const minThreshold = isEmergency ? 30 : 45;
    const isActive = day.actualMinutes >= minThreshold || day.tasksCompletedCount >= 1;

    if (isActive) {
      currentStreak++;
      totalDaysStudied++;
      lastActiveDate = day.date;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      if (day.date < todayStr) {
        missedDaysCount++;
        currentStreak = 0; // Streak reset
      }
    }
  }

  let recoveryNotice: string | undefined;
  if (currentStreak === 0 && missedDaysCount > 0) {
    recoveryNotice = "Let's recover. One-tap schedule redistribution available.";
  }

  return {
    currentStreak,
    longestStreak,
    totalDaysStudied,
    missedDaysCount,
    lastActiveDate,
    recoveryNotice
  };
}
