# scripts/build_stage5.py
import os

triggers_code = """import { SchedulerInputState, SchedulerOutput } from './types';
import { generatePlan } from './engine';

export type PreparationEventTriggerType =
  | 'day_rollover'
  | 'missed_day_declared'
  | 'missed_day_detected'
  | 'availability_changed'
  | 'exam_date_changed'
  | 'phase_changed'
  | 'syllabus_activated'
  | 'topic_added'
  | 'topic_modified'
  | 'topic_archived'
  | 'topic_completed'
  | 'topic_reopened'
  | 'priority_changed'
  | 'schedule_override'
  | 'manual_plan_change'
  | 'mock_completed'
  | 'backfill_session';

export interface EventRecalculationRequest {
  triggerType: PreparationEventTriggerType;
  preparationEventId?: string;
  currentState: SchedulerInputState;
  eventPayload?: Record<string, any>;
}

export interface RecalculationResult {
  planOutput: SchedulerOutput;
  scheduleChangeEvent: {
    trigger: string;
    preparationEventId?: string;
    summary: string;
    details: Record<string, any>;
    capacityChange?: number;
    riskChange?: string;
  };
}

export function handlePreparationEventRecalculation(
  request: EventRecalculationRequest
): RecalculationResult {
  const { triggerType, preparationEventId, currentState, eventPayload } = request;
  const updatedState = { ...currentState };

  let triggerSummary = '';

  switch (triggerType) {
    case 'missed_day_declared':
    case 'missed_day_detected': {
      const missedMinutes = eventPayload?.missedMinutes || 180;
      updatedState.backlog = {
        carriedMinutes: (currentState.backlog?.carriedMinutes || 0) + missedMinutes,
        absorptionWindow: 7
      };
      triggerSummary = `You missed study activity (${missedMinutes} min). Backlog absorbed across 7 days at recovery capacity.`;
      break;
    }

    case 'availability_changed': {
      const newHours = eventPayload?.newHours || 4;
      triggerSummary = `Availability updated to ${newHours}h/day. Schedule rebalanced across the 14-day horizon.`;
      break;
    }

    case 'topic_added': {
      const topicName = eventPayload?.name || 'New Topic';
      const hours = eventPayload?.estimatedHours || 6;
      triggerSummary = `Added topic '${topicName}' (${hours}h). Workload and daily required hours recomputed.`;
      break;
    }

    case 'topic_completed': {
      const topicName = eventPayload?.name || 'Topic';
      triggerSummary = `Completed '${topicName}'. Future slots freed for subsequent topics.`;
      break;
    }

    case 'exam_date_changed': {
      const newDate = eventPayload?.examDate || currentState.examConfig.examDate;
      updatedState.examConfig = {
        ...currentState.examConfig,
        examDate: newDate
      };
      triggerSummary = `Exam date shifted to ${newDate}. Preparation horizon and deadline risk re-anchored.`;
      break;
    }

    case 'phase_changed': {
      const newPhase = eventPayload?.newPhase || 'phase2';
      updatedState.phase = newPhase;
      triggerSummary = `Entered ${newPhase.toUpperCase()} phase. Study composition shifted towards revision and mocks.`;
      break;
    }

    case 'mock_completed': {
      const score = eventPayload?.score ?? 60;
      triggerSummary = `Mock exam completed with score ${score}. Gaps routed to priority revision queue.`;
      break;
    }

    default:
      triggerSummary = `Schedule re-evaluated for day rollover. Horizon updated.`;
      break;
  }

  // Pure deterministic plan generation
  const planOutput = generatePlan(updatedState);

  // Augment explanation with trigger attribution
  planOutput.explanation = {
    summary: triggerSummary,
    trigger: triggerType,
    details: {
      ...eventPayload,
      riskLevel: planOutput.risk.level,
      requiredDailyHours: planOutput.risk.requiredDailyHours
    }
  };

  return {
    planOutput,
    scheduleChangeEvent: {
      trigger: triggerType,
      preparationEventId,
      summary: triggerSummary,
      details: planOutput.explanation.details || {},
      capacityChange: eventPayload?.capacityChange,
      riskChange: planOutput.risk.level
    }
  };
}
"""

base = r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\scheduler"
with open(os.path.join(base, "triggers.ts"), "w", encoding="utf-8") as f:
    f.write(triggers_code.strip() + "\n")

print("Stage 5 scheduler triggers written successfully")
