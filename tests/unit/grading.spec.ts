import { describe, it, expect } from "vitest";
import { evaluateQuestionAnswer, parseNATInput } from "@/lib/grading/evaluator";

describe("Question Grading Engine (Stage 6 & Section J6)", () => {
  describe("MCQ Evaluation with Negative Marking", () => {
    it("grades correct 1-mark MCQ with +1 and 0 negative", () => {
      const result = evaluateQuestionAnswer({
        questionType: "mcq",
        marks: 1,
        correctAnswer: "B",
        userAnswer: "B"
      });
      expect(result.isCorrect).toBe(true);
      expect(result.marksAwarded).toBe(1);
      expect(result.negativeMarks).toBe(0);
      expect(result.netMarks).toBe(1);
    });

    it("grades incorrect 1-mark MCQ with -1/3 negative marking", () => {
      const result = evaluateQuestionAnswer({
        questionType: "mcq",
        marks: 1,
        correctAnswer: "A",
        userAnswer: "C"
      });
      expect(result.isCorrect).toBe(false);
      expect(result.marksAwarded).toBe(0);
      expect(result.negativeMarks).toBe(0.33);
      expect(result.netMarks).toBe(-0.33);
    });

    it("grades incorrect 2-mark MCQ with -2/3 negative marking", () => {
      const result = evaluateQuestionAnswer({
        questionType: "mcq",
        marks: 2,
        correctAnswer: "D",
        userAnswer: "A"
      });
      expect(result.isCorrect).toBe(false);
      expect(result.negativeMarks).toBe(0.67);
      expect(result.netMarks).toBe(-0.67);
    });
  });

  describe("MSQ Evaluation (All-or-Nothing, No Partial Marks)", () => {
    it("grades exact set match as correct with full marks", () => {
      const result = evaluateQuestionAnswer({
        questionType: "msq",
        marks: 2,
        correctAnswer: ["A", "C", "D"],
        userAnswer: ["D", "A", "C"] // Out of order should still match
      });
      expect(result.isCorrect).toBe(true);
      expect(result.marksAwarded).toBe(2);
      expect(result.negativeMarks).toBe(0);
    });

    it("grades partial set match as incorrect with 0 marks and 0 negative (No partial marks)", () => {
      const result = evaluateQuestionAnswer({
        questionType: "msq",
        marks: 2,
        correctAnswer: ["A", "C", "D"],
        userAnswer: ["A", "C"] // Missing D
      });
      expect(result.isCorrect).toBe(false);
      expect(result.marksAwarded).toBe(0);
      expect(result.negativeMarks).toBe(0);
    });
  });

  describe("NAT Evaluation (Exact, Range, Tolerance & Normalization)", () => {
    it("normalizes commas, trailing units, and decimals correctly", () => {
      expect(parseNATInput("1,250").value).toBe(1250);
      expect(parseNATInput("400 MHz").value).toBe(400);
      expect(parseNATInput(" -15.5 ").value).toBe(-15.5);
    });

    it("rejects malformed or unparseable input with explicit feedback", () => {
      expect(parseNATInput("abc").error).toBeDefined();
      expect(parseNATInput("12..34").error).toBeDefined();
    });

    it("evaluates tolerance match within +/- 2% relative tolerance", () => {
      const result = evaluateQuestionAnswer({
        questionType: "nat",
        marks: 2,
        correctAnswer: { answerType: "tolerance", value: 100, tolerance: 2 },
        userAnswer: "101.5" // Within 100 +/- 2
      });
      expect(result.isCorrect).toBe(true);
      expect(result.marksAwarded).toBe(2);
      expect(result.negativeMarks).toBe(0);
    });

    it("evaluates range match within [min, max]", () => {
      const result = evaluateQuestionAnswer({
        questionType: "nat",
        marks: 2,
        correctAnswer: { answerType: "range", min: 10, max: 20 },
        userAnswer: "15.0"
      });
      expect(result.isCorrect).toBe(true);
    });
  });
});
