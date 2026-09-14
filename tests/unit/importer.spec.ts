import { describe, it, expect } from "vitest";
import { parseRawInput, validateQuestionBatch } from "@/lib/importer/importer";
import { convertQuestionType } from "@/lib/importer/assessor";

describe("Question Bank Importer & Type Assessor (Stage 7 & Section K)", () => {
  const knownSubjects = ["OS", "ALGO", "DBMS"];
  const knownTopics = ["Deadlocks", "Sorting", "Normalization"];

  it("parses JSON questions array correctly", () => {
    const jsonStr = JSON.stringify([
      { id: "Q1", question: "What is deadlock?", type: "mcq", marks: 1, options: ["A", "B"], answer: "A", topic: "Deadlocks" }
    ]);
    const rows = parseRawInput(jsonStr);
    expect(rows.length).toBe(1);
    expect(rows[0].question).toBe("What is deadlock?");
  });

  it("parses CSV questions correctly", () => {
    const csvStr = `id,question,type,marks,options,answer,topic\nCSV-1,"Sample question",mcq,2,"Opt 1|Opt 2",A,Deadlocks`;
    const rows = parseRawInput(csvStr);
    expect(rows.length).toBe(1);
    expect(rows[0].id).toBe("CSV-1");
  });

  it("validates question batch, rejecting invalid marks and types", () => {
    const invalidBatch = [
      // Invalid type
      { question: "Valid question text", type: "essay", marks: 1, answer: "A", topic: "Deadlocks" },
      // Invalid marks (not 1 or 2)
      { question: "Valid question text", type: "mcq", marks: 5, options: ["A", "B"], answer: "A", topic: "Deadlocks" },
      // Less than 2 options for MCQ
      { question: "Valid question text", type: "mcq", marks: 1, options: ["Only One"], answer: "A", topic: "Deadlocks" }
    ];

    const report = validateQuestionBatch(invalidBatch, knownSubjects, knownTopics);
    expect(report.errorRows).toBe(3);
    expect(report.validRows).toBe(0);
  });

  it("enforces PYQ source and year integrity (Directive D2)", () => {
    const fakePyqBatch = [
      // PYQ with missing source and missing year
      { question: "PYQ question text", type: "mcq", marks: 1, options: ["A", "B"], answer: "A", sourceType: "pyq", topic: "Deadlocks" }
    ];

    const report = validateQuestionBatch(fakePyqBatch, knownSubjects, knownTopics);
    expect(report.errorRows).toBe(1);
    const errorFields = report.errors.map(e => e.field);
    expect(errorFields).toContain("source");
    expect(errorFields).toContain("year");
  });

  it("routes unknown topics to the unmapped questions queue (Section K5)", () => {
    const unmappedBatch = [
      {
        id: "UNMAPPED-1",
        question: "Quantum entanglement fundamentals",
        type: "mcq",
        marks: 1,
        options: ["A", "B"],
        answer: "A",
        topic: "Quantum Physics" // Not in knownTopics
      }
    ];

    const report = validateQuestionBatch(unmappedBatch, knownSubjects, knownTopics);
    expect(report.errorRows).toBe(0);
    expect(report.validRows).toBe(0);
    expect(report.unmappedQuestions.length).toBe(1);
    expect(report.unmappedQuestions[0].externalId).toBe("UNMAPPED-1");
  });

  it("converts question type with complete audit trail in Type Assessor (Section K4)", () => {
    const existingQ = {
      id: "Q-MCQ-1",
      questionType: "mcq",
      correctAnswer: "15",
      options: ["10", "15", "20", "25"],
      answerType: null
    };

    const { updatedQuestion, auditEntry } = convertQuestionType(existingQ, {
      questionId: existingQ.id,
      currentType: "mcq",
      targetType: "nat",
      newCorrectAnswer: { value: 15, tolerance: 2 },
      answerType: "tolerance",
      reason: "Numeric answer converts directly to NAT",
      userId: "user-1"
    });

    expect(updatedQuestion.questionType).toBe("nat");
    expect(updatedQuestion.answerType).toBe("tolerance");
    expect(auditEntry.before.questionType).toBe("mcq");
    expect(auditEntry.after.questionType).toBe("nat");
    expect(auditEntry.reason).toContain("converts directly to NAT");
  });
});
