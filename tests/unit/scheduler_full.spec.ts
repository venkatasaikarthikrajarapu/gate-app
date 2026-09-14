import { describe, it, expect } from "vitest";
import { generatePlan } from "@/lib/scheduler/engine";
import { handlePreparationEventRecalculation } from "@/lib/scheduler/triggers";
import { SchedulerInputState, SchedulerTopic } from "@/lib/scheduler/types";

describe("Adaptive Scheduler Full Test Matrix (Stage 5 & Section X2)", () => {
  const baseTopics: SchedulerTopic[] = [
    {
      id: "top-os-1",
      subjectId: "sub-os",
      subjectName: "Operating Systems",
      name: "CPU Scheduling",
      estimatedHours: 8,
      priority: "high",
      difficulty: "medium",
      pinned: false,
      status: "learning",
      masteryScore: 60,
      completionPercent: 20,
      marksWeight: 9,
      remainingHours: 6.4
    },
    {
      id: "top-dbms-1",
      subjectId: "sub-dbms",
      subjectName: "Databases",
      name: "Normalization & Functional Dependencies",
      estimatedHours: 12,
      priority: "high",
      difficulty: "hard",
      pinned: false,
      status: "not_started",
      masteryScore: 20,
      completionPercent: 0,
      marksWeight: 8,
      remainingHours: 12.0
    },
    {
      id: "top-algo-1",
      subjectId: "sub-algo",
      subjectName: "Algorithms",
      name: "Dynamic Programming",
      estimatedHours: 16,
      priority: "high",
      difficulty: "very_hard",
      pinned: false,
      status: "not_started",
      masteryScore: 10,
      completionPercent: 0,
      marksWeight: 9,
      remainingHours: 16.0
    }
  ];

  const standardInput: SchedulerInputState = {
    today: "2026-09-15",
    timezone: "Asia/Kolkata",
    examConfig: {
      examDate: "2027-02-06",
      phases: [
        { key: "phase1", label: "Phase 1 - LEARN", startDate: "2026-09-01", endDate: "2026-11-30", mode: "LEARN" },
        { key: "phase2", label: "Phase 2 - REVISE", startDate: "2026-12-01", endDate: "2027-01-31", mode: "REVISE_TEST" },
        { key: "phase3", label: "Phase 3 - RAPID", startDate: "2027-02-01", endDate: "2027-02-06", mode: "RAPID_REVISION" }
      ]
    },
    phase: "phase1",
    topics: baseTopics,
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
      normalDefault: 6.0,
      recoveryMultiplier: 1.25,
      bufferPercent: 15.0,
      hardCap: 1.5,
      dailyCeiling: 10.0
    },
    backlog: { carriedMinutes: 0, absorptionWindow: 7 },
    revisionQueueCount: 4,
    pendingMistakeCount: 2
  };

  it("produces byte-identical schedules on duplicate executions with same input (Determinism)", () => {
    const runA = generatePlan(standardInput);
    const runB = generatePlan(standardInput);
    expect(JSON.stringify(runA)).toEqual(JSON.stringify(runB));
  });

  it("handles late starts without pretending preparation started on cycle start date (Section C4)", () => {
    const lateStartInput: SchedulerInputState = {
      ...standardInput,
      today: "2026-09-25" // Started 25 days into phase
    };
    const output = generatePlan(lateStartInput);
    expect(output.horizonDays[0].date).toBe("2026-09-25");
    expect(output.risk.daysRemainingToPhaseDeadline).toBeLessThan(75);
  });

  it("absorbs a single missed day across a 7-day window without exceeding caps (Section I5)", () => {
    const result = handlePreparationEventRecalculation({
      triggerType: "missed_day_declared",
      preparationEventId: "event-missed-1",
      currentState: standardInput,
      eventPayload: { missedMinutes: 240 }
    });

    expect(result.scheduleChangeEvent.summary).toContain("Backlog absorbed across 7 days");
    expect(result.planOutput.horizonDays.length).toBe(14);
    // Ensure no scheduled day exceeds the daily ceiling
    for (const day of result.planOutput.horizonDays) {
      const totalMinutes = day.tasks.reduce((sum, t) => sum + t.plannedMinutes, 0);
      expect(totalMinutes).toBeLessThanOrEqual(standardInput.capacityConfig.dailyCeiling * 60);
    }
  });

  it("triggers Plan A / B / C impossibility triage when workload is critical (Section I6)", () => {
    const overwhelmedInput: SchedulerInputState = {
      ...standardInput,
      topics: [
        ...baseTopics,
        {
          id: "top-huge",
          subjectId: "sub-os",
          subjectName: "Operating Systems",
          name: "Massive Topic",
          estimatedHours: 400,
          priority: "high",
          difficulty: "hard",
          pinned: false,
          status: "not_started",
          masteryScore: 0,
          completionPercent: 0,
          marksWeight: 10,
          remainingHours: 400
        }
      ]
    };

    const output = generatePlan(overwhelmedInput);
    expect(["HIGH", "CRITICAL"]).toContain(output.risk.level);
    expect(output.recoveryOptions).toBeDefined();
    expect(output.recoveryOptions?.length).toBe(3);
    const planTypes = output.recoveryOptions?.map(p => p.planType);
    expect(planTypes).toContain("A");
    expect(planTypes).toContain("B");
    expect(planTypes).toContain("C");
  });

  it("handles availability reduction by rebalancing horizon load (Section I8)", () => {
    const reducedInput: SchedulerInputState = {
      ...standardInput,
      capacityConfig: {
        ...standardInput.capacityConfig,
        normalDefault: 3.5
      }
    };
    const output = generatePlan(reducedInput);
    expect(output.risk.requiredDailyHours).toBeGreaterThan(0);
  });

  it("handles topic addition with workload recomputation and explanation (Section W5)", () => {
    const result = handlePreparationEventRecalculation({
      triggerType: "topic_added",
      currentState: standardInput,
      eventPayload: { name: "Quantum Computing Basics", estimatedHours: 6 }
    });

    expect(result.scheduleChangeEvent.summary).toContain("Added topic 'Quantum Computing Basics'");
    expect(result.scheduleChangeEvent.trigger).toBe("topic_added");
  });

  it("respects pinned topic override by placing it first in study tasks (Section I3)", () => {
    const pinnedTopics = baseTopics.map(t =>
      t.id === "top-dbms-1" ? { ...t, pinned: true } : t
    );
    const pinnedInput: SchedulerInputState = {
      ...standardInput,
      topics: pinnedTopics
    };

    const output = generatePlan(pinnedInput);
    // Find the first study block
    const firstStudyTask = output.horizonDays[0].tasks.find(t => t.type === "study");
    expect(firstStudyTask?.topicId).toBe("top-dbms-1");
  });
});
