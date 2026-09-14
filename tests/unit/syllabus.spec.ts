import { describe, it, expect } from "vitest";
import {
  diffSyllabusVersions,
  computeStringSimilarity,
  SyllabusSnapshotInput
} from "@/lib/syllabus/diff";
import { generateSyllabusImpactReport } from "@/lib/syllabus/impact";
import { buildTopicLineageMap } from "@/lib/syllabus/lineage";

describe("Syllabus Versioning, Diff & Lineage (Stage 4)", () => {
  it("evaluates string similarity with Levenshtein and token-set blend", () => {
    expect(computeStringSimilarity("Operating Systems", "Operating Systems")).toBe(1.0);
    expect(computeStringSimilarity("Virtual Memory", "Virtual Memory Management")).toBeGreaterThanOrEqual(0.75);
    expect(computeStringSimilarity("Dijkstra Algorithm", "Dijkstra's Algorithm")).toBeGreaterThanOrEqual(0.85);
  });

  const v1Syllabus: SyllabusSnapshotInput = {
    versionLabel: "GATE CSE Syllabus v1",
    subjects: [
      {
        code: "OS",
        name: "Operating Systems",
        topics: [
          { name: "CPU Scheduling Algorithms", estimatedHours: 10, priority: "high", difficulty: "medium" },
          { name: "Memory Management", estimatedHours: 14, priority: "high", difficulty: "hard" },
          { name: "Old Legacy Subsystem", estimatedHours: 6, priority: "low", difficulty: "easy" }
        ]
      }
    ]
  };

  const v2Syllabus: SyllabusSnapshotInput = {
    versionLabel: "GATE CSE Syllabus v2",
    subjects: [
      {
        code: "OS",
        name: "Operating Systems",
        topics: [
          // Unchanged / exact
          { name: "CPU Scheduling Algorithms", estimatedHours: 10, priority: "high", difficulty: "medium" },
          // Modified / fuzzy match + hours increase
          { name: "Memory Management Systems", estimatedHours: 18, priority: "high", difficulty: "hard" },
          // Added topic
          { name: "Quantum Computing Basics", estimatedHours: 8, priority: "medium", difficulty: "hard" }
          // "Old Legacy Subsystem" removed (will be archived)
        ]
      }
    ]
  };

  it("diffs syllabus versions accurately into ADDED, REMOVED, MODIFIED, and UNCHANGED (Section W2)", () => {
    const diff = diffSyllabusVersions(v1Syllabus, v2Syllabus);

    expect(diff.unchanged.length).toBe(1);
    expect(diff.unchanged[0].newTopic?.name).toBe("CPU Scheduling Algorithms");

    expect(diff.modified.length).toBe(1);
    expect(diff.modified[0].oldTopic?.name).toBe("Memory Management");
    expect(diff.modified[0].newTopic?.name).toBe("Memory Management Systems");
    expect(diff.modified[0].fieldChanges?.estimatedHours?.to).toBe(18);

    expect(diff.added.length).toBe(1);
    expect(diff.added[0].newTopic?.name).toBe("Quantum Computing Basics");

    expect(diff.removed.length).toBe(1);
    expect(diff.removed[0].oldTopic?.name).toBe("Old Legacy Subsystem");

    // Net hours delta: (10 + 18 + 8) - (10 + 14 + 6) = 36 - 30 = +6h
    expect(diff.netHoursDelta).toBe(6);
  });

  it("generates an impact report explaining schedule consequences (Section W3 & I7)", () => {
    const diff = diffSyllabusVersions(v1Syllabus, v2Syllabus);
    const report = generateSyllabusImpactReport(
      diff,
      1200, // 20 hours currently remaining
      14,   // 14 days to deadline
      6,    // 6h normal daily capacity
      15,   // 15% buffer
      "2026-09-15"
    );

    expect(report.netHoursDelta).toBe(6);
    expect(report.explanation).toContain("adds +6h net");
    expect(report.newRisk).toBeDefined();
  });

  it("preserves topic lineage mapping without overwriting historical attempts (Section W4 / Directive D12)", () => {
    const oldTopicId = "topic-old-memory";
    const lineage = buildTopicLineageMap(
      oldTopicId,
      "Memory Management",
      [
        { id: "topic-v2-virtual-mem", name: "Virtual Memory" },
        { id: "topic-v2-paging", name: "Paging & Segmentation" }
      ],
      "split"
    );

    expect(lineage.length).toBe(2);
    expect(lineage[0].kind).toBe("split");
    expect(lineage[0].fromTopicId).toBe(oldTopicId);
    expect(lineage[0].notes).toContain("Historical attempts remain on topic-old-memory");
  });
});
