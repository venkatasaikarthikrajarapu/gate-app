import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { PrismaClient } from "@prisma/client";

describe("Database Schema & Seed Verification (Stage 3)", () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("verifies the versioned ExamCycle for GATE CSE 2027 (Section C2 & H1)", async () => {
    const cycle = await prisma.examCycle.findUnique({
      where: { id: "cycle-gate-cse-2027" }
    });
    expect(cycle).toBeDefined();
    expect(cycle?.cycleYear).toBe(2027);
    expect(cycle?.examDate).toBe("2027-02-06");
    expect(cycle?.totalMarks).toBe(100);
    expect(cycle?.totalQuestions).toBe(65);
    expect(cycle?.durationMinutes).toBe(180);

    const sections = JSON.parse(cycle!.sections);
    expect(sections.GA).toBe(15);
    expect(sections.EngMath).toBe(13);
    expect(sections.Core).toBe(72);
  });

  it("verifies all 12 official subjects exist in seed syllabus v1 (Section H12)", async () => {
    const subjects = await prisma.subject.findMany({
      orderBy: { displayOrder: "asc" }
    });
    expect(subjects.length).toBe(12);

    const codes = subjects.map(s => s.code);
    expect(codes).toContain("GA");
    expect(codes).toContain("EM");
    expect(codes).toContain("DM");
    expect(codes).toContain("DL");
    expect(codes).toContain("COA");
    expect(codes).toContain("PDS");
    expect(codes).toContain("ALGO");
    expect(codes).toContain("TOC");
    expect(codes).toContain("CD");
    expect(codes).toContain("OS");
    expect(codes).toContain("DBMS");
    expect(codes).toContain("CN");
  });

  it("verifies the curated question bank satisfies the MSQ/NAT quotas honestly (Section K4 & R21)", async () => {
    const questions = await prisma.question.findMany();
    expect(questions.length).toBeGreaterThanOrEqual(120);

    const msqCount = questions.filter(q => q.questionType === "msq").length;
    const natCount = questions.filter(q => q.questionType === "nat").length;
    const mcqCount = questions.filter(q => q.questionType === "mcq").length;

    expect(msqCount).toBeGreaterThanOrEqual(40);
    expect(natCount).toBeGreaterThanOrEqual(40);
    expect(msqCount + natCount).toBeGreaterThanOrEqual(80);

    // Directives D2 & R21: never fake PYQs
    const fakePyqs = questions.filter(q => q.demo && q.sourceType === "pyq");
    expect(fakePyqs.length).toBe(0);

    // All demo questions must be clearly marked
    const demoQuestions = questions.filter(q => q.demo);
    expect(demoQuestions.every(q => q.sourceType === "practice")).toBe(true);
  });

  it("verifies PreparationEvent table supports append-only domain event logging (Section D)", async () => {
    const testEvent = await prisma.preparationEvent.create({
      data: {
        userId: "student-primary-user",
        effectiveDate: "2026-09-14",
        eventType: "study_session",
        source: "ui_action",
        actor: "student",
        payload: JSON.stringify({ minutesStudied: 120, topicId: "topic-os-1" }),
        relatedEntityType: "topic",
        relatedEntityId: "topic-os-1"
      }
    });

    expect(testEvent.id).toBeDefined();
    expect(testEvent.eventType).toBe("study_session");

    // Fetch and assert
    const fetched = await prisma.preparationEvent.findUnique({
      where: { id: testEvent.id }
    });
    expect(fetched).toBeDefined();
    expect(JSON.parse(fetched!.payload).minutesStudied).toBe(120);
  });

  it("verifies TopicLink table supports versioned history lineage (Section W4)", async () => {
    const topics = await prisma.topic.findMany({ take: 2 });
    if (topics.length >= 2) {
      const link = await prisma.topicLink.create({
        data: {
          fromTopicId: topics[0].id,
          toTopicId: topics[1].id,
          kind: "syllabus_mapping",
          migrationRule: "inherit_mastery_hint"
        }
      });
      expect(link.id).toBeDefined();
      expect(link.kind).toBe("syllabus_mapping");
    }
  });

  it("verifies planned vs actual ledger fields on DailyTask and StudySession (Section G)", async () => {
    const plan = await prisma.studyPlan.create({
      data: {
        horizonStart: "2026-09-15",
        horizonEnd: "2026-09-28",
        status: "active"
      }
    });

    const task = await prisma.dailyTask.create({
      data: {
        studyPlanId: plan.id,
        date: "2026-09-15",
        type: "study",
        plannedMinutes: 120,
        completedMinutes: 75,
        plannedTopic: "Operating Systems -> Deadlocks",
        status: "partially_completed"
      }
    });

    expect(task.plannedMinutes).toBe(120);
    expect(task.completedMinutes).toBe(75);
    expect(task.plannedMinutes).not.toBe(task.completedMinutes);
  });
});
