import {
  SchedulerInputState,
  SchedulerOutput,
  ScheduledDay,
  ScheduledTaskBlock,
  SchedulerTopic,
  DeadlineRisk,
  RecoveryPlanOption,
  DayMode,
  RiskLevel
} from './types';

/**
 * Pure, deterministic adaptive scheduler engine with zero I/O.
 * Guaranteed: Identical input states produce byte-identical schedules.
 */
export function calculateTopicPriorityScore(
  topic: SchedulerTopic,
  subjectMinutesInWindow: number,
  totalMinutesInWindow: number
): number {
  const priorityMap = { low: 1, medium: 2, high: 3 };
  const difficultyMap = { easy: 1, medium: 2, hard: 3, very_hard: 4 };

  const pScore = (priorityMap[topic.priority] || 2) / 3;
  const dScore = (difficultyMap[topic.difficulty] || 2) / 4;
  const wScore = Math.min(1, Math.max(0, topic.marksWeight / 15));
  const cScore = 1 - (topic.completionPercent / 100);
  const depScore = topic.dependsOn && topic.dependsOn.length > 0 ? 0.5 : 1.0;
  const consecutiveDamping = (topic.consecutiveDaysStudied || 0) * 0.05;

  let base = (0.35 * pScore) + (0.20 * dScore) + (0.20 * wScore) + (0.15 * cScore) + (0.10 * depScore) - consecutiveDamping;

  // Soft subject balance penalty: if subject > 45% of rolling window, downweight
  if (totalMinutesInWindow > 0 && (subjectMinutesInWindow / totalMinutesInWindow) > 0.45) {
    base -= 0.3;
  }

  if (topic.pinned) {
    base += 10.0; // Pinned topics float to the top
  }

  return base;
}

export function computeDeadlineRisk(
  remainingWorkMinutes: number,
  availableDays: number,
  normalDailyCapacityMinutes: number,
  bufferPercent: number,
  todayStr: string
): DeadlineRisk {
  const effectiveDailyMinutes = normalDailyCapacityMinutes * (1 - (bufferPercent / 100));
  const requiredDailyMinutes = availableDays > 0 ? remainingWorkMinutes / availableDays : remainingWorkMinutes;
  const requiredDailyHours = Number((requiredDailyMinutes / 60).toFixed(1));
  const ratio = effectiveDailyMinutes > 0 ? Number((requiredDailyMinutes / effectiveDailyMinutes).toFixed(2)) : 999;

  let level: RiskLevel = 'LOW';
  if (ratio > 1.35) level = 'CRITICAL';
  else if (ratio > 1.05) level = 'HIGH';
  else if (ratio > 0.85) level = 'WATCH';

  // Calculate projected finish date
  const finishDays = effectiveDailyMinutes > 0 ? Math.ceil(remainingWorkMinutes / effectiveDailyMinutes) : 999;
  const finishDate = new Date(todayStr);
  finishDate.setDate(finishDate.getDate() + finishDays);
  const projectedFinishDate = finishDate.toISOString().split('T')[0];

  return {
    requiredDailyHours,
    ratio,
    level,
    projectedFinishDate,
    daysRemainingToPhaseDeadline: availableDays,
    daysRemainingToExam: availableDays // Anchored by caller
  };
}

export function generatePlan(input: SchedulerInputState): SchedulerOutput {
  const horizonDays: ScheduledDay[] = [];
  const horizonLength = 14;

  const currentPhase = input.examConfig.phases.find(p => p.key === input.phase) || input.examConfig.phases[0];
  const phaseEnd = new Date(currentPhase?.endDate || input.examConfig.examDate);
  const todayDate = new Date(input.today);
  const daysToPhaseDeadline = Math.max(1, Math.ceil((phaseEnd.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24)));

  // Calculate remaining work
  const remainingWorkMinutes = input.topics
    .filter(t => t.status !== 'mastered' && t.completionPercent < 100)
    .reduce((sum, t) => sum + (t.remainingHours * 60), 0);

  const normalDailyHours = input.capacityConfig.normalDefault || 6;
  const normalDailyMinutes = normalDailyHours * 60;
  const bufferPct = input.capacityConfig.bufferPercent || 15;

  const risk = computeDeadlineRisk(
    remainingWorkMinutes,
    daysToPhaseDeadline,
    normalDailyMinutes,
    bufferPct,
    input.today
  );

  // Daily backlog allocation over absorption window (default 7 days)
  const windowDays = Math.max(1, input.backlog.absorptionWindow || 7);
  const dailyBacklogMinutes = Math.floor(input.backlog.carriedMinutes / windowDays);
  let remainingBacklogToDistribute = input.backlog.carriedMinutes;

  // Track rolling window minutes per subject
  const subjectMinutes: Record<string, number> = {};
  let totalStudyMinutesScheduled = 0;

  // Clone and sort topics deterministically
  const activeTopics = [...input.topics].filter(t => t.completionPercent < 100);

  for (let d = 0; d < horizonLength; d++) {
    const dDate = new Date(todayDate);
    dDate.setDate(dDate.getDate() + d);
    const dateStr = dDate.toISOString().split('T')[0];
    const dayOfWeek = dDate.getDay();

    const mode = input.availability.dayModes?.[dateStr] || 'normal';
    let baseHours = input.availability.dayOverrides?.[dateStr];
    if (baseHours === undefined) {
      const tmpl = input.availability.weekdayTemplates.find(w => w.weekday === dayOfWeek);
      baseHours = tmpl ? tmpl.hours : normalDailyHours;
    }

    let capacityMinutes = baseHours * 60;
    if (mode === 'busy') capacityMinutes *= 0.5;
    if (mode === 'emergency') capacityMinutes = 45; // 45-minute fixed emergency floor
    if (mode === 'exam') capacityMinutes = 0;

    const bufferMinutes = Math.round(capacityMinutes * (bufferPct / 100));
    const usableMinutes = Math.max(0, capacityMinutes - bufferMinutes);

    const tasks: ScheduledTaskBlock[] = [];
    let order = 1;
    let allocatedMinutes = 0;

    if (mode === 'emergency') {
      // Emergency day minimum loop (<=45 min)
      tasks.push({ id: `${dateStr}-diag`, type: 'diagnostic', plannedMinutes: 15, orderIndex: order++, note: 'Emergency Diagnostic (10Q)' });
      tasks.push({ id: `${dateStr}-pyq`, type: 'practice', plannedMinutes: 10, orderIndex: order++, note: '5 Core PYQs' });
      tasks.push({ id: `${dateStr}-form`, type: 'revision', plannedMinutes: 10, orderIndex: order++, note: '10-min Formula Review' });
      tasks.push({ id: `${dateStr}-mist`, type: 'mistake_review', plannedMinutes: 10, orderIndex: order++, note: '10-min Mistake Review' });
      allocatedMinutes = 45;
    } else if (capacityMinutes > 0) {
      // Standard daily feedback loop
      // 1. Morning Diagnostic (fixed 25m)
      tasks.push({
        id: `${dateStr}-diag`,
        type: 'diagnostic',
        plannedMinutes: 25,
        orderIndex: order++,
        note: 'Morning Diagnostic (10Q majority MSQ/NAT)'
      });
      allocatedMinutes += 25;

      // 2. Mistake Review (15m)
      if (input.pendingMistakeCount > 0) {
        tasks.push({
          id: `${dateStr}-mist`,
          type: 'mistake_review',
          plannedMinutes: 15,
          orderIndex: order++,
          note: 'Mistake Review & Retest'
        });
        allocatedMinutes += 15;
      }

      // 3. Spaced Revision Block (30m)
      if (input.revisionQueueCount > 0) {
        tasks.push({
          id: `${dateStr}-rev`,
          type: 'revision',
          plannedMinutes: 30,
          orderIndex: order++,
          note: 'Memory Stability Deck Revision'
        });
        allocatedMinutes += 30;
      }

      // 4. Backlog absorption (if carried)
      if (remainingBacklogToDistribute > 0 && allocatedMinutes < usableMinutes) {
        const absorb = Math.min(dailyBacklogMinutes, usableMinutes - allocatedMinutes, remainingBacklogToDistribute);
        if (absorb > 0) {
          tasks.push({
            id: `${dateStr}-backlog`,
            type: 'study',
            plannedMinutes: absorb,
            orderIndex: order++,
            note: 'Absorbed Backlog Study Block'
          });
          allocatedMinutes += absorb;
          remainingBacklogToDistribute -= absorb;
        }
      }

      // 5. Main Study Block & Practice
      let studyCapacity = Math.max(0, usableMinutes - allocatedMinutes);
      if (studyCapacity >= 45 && activeTopics.length > 0) {
        // Sort topics deterministically
        activeTopics.sort((a, b) => {
          const scoreA = calculateTopicPriorityScore(a, subjectMinutes[a.subjectId] || 0, totalStudyMinutesScheduled);
          const scoreB = calculateTopicPriorityScore(b, subjectMinutes[b.subjectId] || 0, totalStudyMinutesScheduled);
          if (scoreB !== scoreA) return scoreB - scoreA;
          return a.id.localeCompare(b.id);
        });

        const chosenTopic = activeTopics[0];
        const blockMinutes = Math.min(studyCapacity, 120); // 120m block cap per session

        tasks.push({
          id: `${dateStr}-study-${chosenTopic.id}`,
          topicId: chosenTopic.id,
          topicName: chosenTopic.name,
          subjectId: chosenTopic.subjectId,
          subjectName: chosenTopic.subjectName,
          type: 'study',
          plannedMinutes: blockMinutes,
          orderIndex: order++,
          note: `Core Study: ${chosenTopic.subjectName} -> ${chosenTopic.name}`
        });

        subjectMinutes[chosenTopic.subjectId] = (subjectMinutes[chosenTopic.subjectId] || 0) + blockMinutes;
        totalStudyMinutesScheduled += blockMinutes;
        allocatedMinutes += blockMinutes;
        studyCapacity -= blockMinutes;

        // Practice attach
        if (studyCapacity >= 30) {
          tasks.push({
            id: `${dateStr}-prac-${chosenTopic.id}`,
            topicId: chosenTopic.id,
            topicName: chosenTopic.name,
            subjectId: chosenTopic.subjectId,
            subjectName: chosenTopic.subjectName,
            type: 'practice',
            plannedMinutes: 30,
            orderIndex: order++,
            note: `PYQ Practice (15 questions)`
          });
          allocatedMinutes += 30;
        }
      }

      // 6. Notes / Formula wrap-up (20m)
      tasks.push({
        id: `${dateStr}-notes`,
        type: 'notes',
        plannedMinutes: 20,
        orderIndex: order++,
        note: 'Short Notes & Formula Capture'
      });
      allocatedMinutes += 20;
    }

    horizonDays.push({
      date: dateStr,
      mode,
      totalCapacityMinutes: capacityMinutes,
      usableStudyMinutes: usableMinutes,
      bufferMinutes,
      tasks
    });
  }

  // Generate explanation
  let explanationSummary = `Plan generated for 14-day horizon. Daily required study is ${risk.requiredDailyHours}h with risk level ${risk.level}.`;
  if (input.backlog.carriedMinutes > 0) {
    explanationSummary = `Absorbing ${input.backlog.carriedMinutes} min backlog over ${windowDays} days. Required daily load: ${risk.requiredDailyHours}h. Risk: ${risk.level}.`;
  }

  // Recovery recommendations if HIGH or CRITICAL
  let recoveryOptions: RecoveryPlanOption[] | undefined;
  if (risk.level === 'HIGH' || risk.level === 'CRITICAL') {
    recoveryOptions = [
      {
        planType: 'A',
        title: 'Aggressive Recovery',
        description: 'Raise daily capacity multiplier to 1.5x and reduce buffer to 5% to clear syllabus on time.',
        dailyHours: Math.min(input.capacityConfig.dailyCeiling, Number((risk.requiredDailyHours * 1.1).toFixed(1))),
        projectedFinishDate: currentPhase.endDate,
        riskLevel: 'WATCH',
        tradeoffs: ['High daily study intensity', 'Reduced rest buffer']
      },
      {
        planType: 'B',
        title: 'Balanced Recovery',
        description: 'Keep 1.25x capacity; slip lower-priority first-pass topics into Phase 2 revision window.',
        dailyHours: normalDailyHours * 1.25,
        projectedFinishDate: input.examConfig.examDate,
        riskLevel: 'LOW',
        tradeoffs: ['Select low-priority topics learned during Phase 2', 'Protects revision and mock testing']
      },
      {
        planType: 'C',
        title: 'Priority Cut-Line',
        description: 'Focus exclusively on top 80% marks-weight topics for full mastery; remaining topics covered at first-pass only.',
        dailyHours: normalDailyHours,
        projectedFinishDate: currentPhase.endDate,
        riskLevel: 'LOW',
        tradeoffs: ['Coverage targeted at 85-90 marks', 'Ensures maximum mastery in high-yield subjects']
      }
    ];
  }

  return {
    horizonDays,
    risk,
    explanation: {
      summary: explanationSummary,
      trigger: input.recentEvents && input.recentEvents.length > 0 ? input.recentEvents[0].eventType : 'day_rollover',
      details: {
        remainingWorkMinutes,
        carriedBacklog: input.backlog.carriedMinutes
      }
    },
    recoveryOptions
  };
}
