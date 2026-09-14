import { describe, it, expect } from "vitest";
import { generateDailyDiagnostic, BankQuestion } from "@/lib/diagnostic/generator";
import { generateDailyReportCard } from "@/lib/diagnostic/report";

describe("Daily Diagnostic Engine (Stage 6 & Section J)", () => {
  const mockBank: BankQuestion[] = [
    // Yesterday topic questions
    { id: "q1", subjectId: "s-os", topicId: "top-deadlock", questionType: "msq", difficulty: "medium", questionText: "Deadlock 1", marks: 2, correctAnswer: ["A", "B"], sourceType: "practice", source: "Seed" },
    { id: "q2", subjectId: "s-os", topicId: "top-deadlock", questionType: "nat", difficulty: "medium", questionText: "Deadlock 2", marks: 2, correctAnswer: { value: 4 }, sourceType: "practice", source: "Seed" },
    { id: "q3", subjectId: "s-os", topicId: "top-deadlock", questionType: "mcq", difficulty: "easy", questionText: "Deadlock 3", marks: 1, correctAnswer: "A", sourceType: "practice", source: "Seed" },
    // Weak topic questions
    { id: "q4", subjectId: "s-dbms", topicId: "top-norm", questionType: "msq", difficulty: "hard", questionText: "Norm 1", marks: 2, correctAnswer: ["B", "C"], sourceType: "practice", source: "Seed" },
    { id: "q5", subjectId: "s-dbms", topicId: "top-norm", questionType: "nat", difficulty: "hard", questionText: "Norm 2", marks: 2, correctAnswer: { value: 3 }, sourceType: "practice", source: "Seed" },
    // Cooldown question
    { id: "q6", subjectId: "s-os", topicId: "top-deadlock", questionType: "mcq", difficulty: "easy", questionText: "Deadlock Cooldown", marks: 1, correctAnswer: "B", sourceType: "practice", source: "Seed", lastServedAt: "2026-09-12" }
  ];

  it("selects questions respecting yesterday topic priority and 14-day cooldown", () => {
    const output = generateDailyDiagnostic({
      date: "2026-09-15",
      userId: "user-1",
      yesterdayTopicId: "top-deadlock",
      weakTopicIds: ["top-norm"],
      overdueRevisionTopicIds: [],
      questionBank: mockBank,
      targetCount: 5,
      cooldownDays: 14
    });

    expect(output.questions.length).toBeGreaterThan(0);
    // Question q6 was served on 2026-09-12 (< 14 days ago) so it must be excluded
    const servedIds = output.questions.map(q => q.id);
    expect(servedIds).not.toContain("q6");
  });

  it("reports honest shortfall notice when NAT / MSQ quotas cannot be satisfied (Directive D2 & J1.5)", () => {
    const smallBank: BankQuestion[] = [
      { id: "q-mcq-1", subjectId: "s-ga", topicId: "top-ga", questionType: "mcq", difficulty: "easy", questionText: "GA 1", marks: 1, correctAnswer: "A", sourceType: "practice", source: "Seed" },
      { id: "q-nat-1", subjectId: "s-ga", topicId: "top-ga", questionType: "nat", difficulty: "easy", questionText: "GA 2", marks: 1, correctAnswer: { value: 10 }, sourceType: "practice", source: "Seed" }
    ];

    const output = generateDailyDiagnostic({
      date: "2026-09-15",
      userId: "user-1",
      weakTopicIds: [],
      overdueRevisionTopicIds: [],
      questionBank: smallBank,
      targetCount: 2
    });

    expect(output.shortfallNotices.length).toBeGreaterThan(0);
    expect(output.shortfallNotices.some(n => n.includes("quota"))).toBe(true);
  });

  it("generates a comprehensive report card with dangerous mistake detection (Section L3)", () => {
    const report = generateDailyReportCard([
      {
        questionId: "q1",
        topicId: "top-deadlock",
        subjectId: "s-os",
        questionType: "msq",
        marks: 2,
        userAnswer: ["A", "B"],
        gradeResult: { isCorrect: true, marksAwarded: 2, negativeMarks: 0, netMarks: 2 },
        confidence: "high"
      },
      {
        questionId: "q2",
        topicId: "top-deadlock",
        subjectId: "s-os",
        questionType: "nat",
        marks: 2,
        userAnswer: "99", // Wrong with high confidence -> Dangerous mistake
        gradeResult: { isCorrect: false, marksAwarded: 0, negativeMarks: 0, netMarks: 0 },
        confidence: "high"
      }
    ]);

    expect(report.totalQuestions).toBe(2);
    expect(report.attempted).toBe(2);
    expect(report.correctCount).toBe(1);
    expect(report.dangerousMistakesCount).toBe(1);
    expect(report.improvementSuggestion).toContain("dangerous mistake");
  });
});
