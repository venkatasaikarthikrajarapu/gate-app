import { describe, it, expect } from "vitest";
import { generatePlan, calculateTopicPriorityScore } from "@/lib/scheduler/engine";
import { SchedulerInputState, SchedulerTopic } from "@/lib/scheduler/types";

describe("Adaptive Scheduler Engine (Stage 2 Skeleton & Core Math)", () => {
  const mockTopic: SchedulerTopic = {
    id: "topic-os-deadlocks",
    subjectId: "sub-os",
    subjectName: "Operating Systems",
    name: "Deadlocks",
    estimatedHours: 6,
    priority: "high",
    difficulty: "medium",
    pinned: false,
    status: "learning",
    masteryScore: 45,
    completionPercent: 30,
    marksWeight: 8,
    remainingHours: 4.2
  };

  const baseInput: SchedulerInputState = {
    today: "2026-09-15",
    timezone: "Asia/Kolkata",
    examConfig: {
      examDate: "2027-02-06",
      phases: [
        { key: "phase1", label: "Phase 1 - LEARN", startDate: "2026-09-01", endDate: "2026-11-30", mode: "LEARN" }
      ]
    },
    phase: "phase1",
    topics: [mockTopic],
    availability: {
      weekdayTemplates: [
        { weekday: 0, hours: 8 },
        { weekday: 1, hours: 6 },
        { weekday: 2, hours: 6 },
        { weekday: 3, hours: 6 },
        { weekday: 4, hours: 6 },
        { weekday: 5, hours: 6 },
        { weekday: 6, hours: 8 }
      ]
    },
    capacityConfig: {
      normalDefault: 6,
      recoveryMultiplier: 1.25,
      bufferPercent: 15,
      hardCap: 1.5,
      dailyCeiling: 10
    },
    backlog: {
      carriedMinutes: 0,
      absorptionWindow: 7
    },
    revisionQueueCount: 3,
    pendingMistakeCount: 2
  };

  it("calculates priority score deterministically", () => {
    const score1 = calculateTopicPriorityScore(mockTopic, 0, 100);
    const score2 = calculateTopicPriorityScore(mockTopic, 0, 100);
    expect(score1).toBe(score2);
    expect(score1).toBeGreaterThan(0);
  });

  it("guarantees identical input states produce identical output plans (Directive D14)", () => {
    const plan1 = generatePlan(baseInput);
    const plan2 = generatePlan(baseInput);
    expect(JSON.stringify(plan1)).toBe(JSON.stringify(plan2));
  });

  it("schedules emergency days at <=45 minutes floor (Directive D10 / §I9)", () => {
    const emergencyInput: SchedulerInputState = {
      ...baseInput,
      availability: {
        ...baseInput.availability,
        dayModes: { "2026-09-15": "emergency" }
      }
    };
    const output = generatePlan(emergencyInput);
    const day0 = output.horizonDays[0];
    expect(day0.mode).toBe("emergency");
    expect(day0.totalCapacityMinutes).toBe(45);
    const totalTasksMinutes = day0.tasks.reduce((sum, t) => sum + t.plannedMinutes, 0);
    expect(totalTasksMinutes).toBeLessThanOrEqual(45);
  });

  it("absorbs carried backlog across absorption window without exceeding daily limits", () => {
    const backlogInput: SchedulerInputState = {
      ...baseInput,
      backlog: {
        carriedMinutes: 180,
        absorptionWindow: 6
      }
    };
    const output = generatePlan(backlogInput);
    expect(output.explanation.summary).toContain("Absorbing 180 min backlog");
  });

  it("generates Plan A / B / C recovery options when deadline risk is high", () => {
    const highLoadTopic: SchedulerTopic = {
      ...mockTopic,
      remainingHours: 500 // Exceeds capacity before deadline
    };
    const highRiskInput: SchedulerInputState = {
      ...baseInput,
      topics: [highLoadTopic]
    };
    const output = generatePlan(highRiskInput);
    expect(["HIGH", "CRITICAL"]).toContain(output.risk.level);
    expect(output.recoveryOptions).toBeDefined();
    expect(output.recoveryOptions?.length).toBe(3);
    expect(output.recoveryOptions?.map(o => o.planType)).toEqual(["A", "B", "C"]);
  });
});
