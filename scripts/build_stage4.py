# scripts/build_stage4.py
import os

diff_code = """export interface DiffTopicInput {
  id?: string;
  name: string;
  description?: string;
  estimatedHours: number;
  priority: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard' | 'very_hard';
  subtopics?: Array<{ name: string; estimatedHours?: number }>;
}

export interface DiffSubjectInput {
  code: string;
  name: string;
  marksWeight?: number;
  topics: DiffTopicInput[];
}

export interface SyllabusSnapshotInput {
  versionLabel: string;
  subjects: DiffSubjectInput[];
}

export type DiffChangeType = 'ADDED' | 'REMOVED' | 'MODIFIED' | 'UNCHANGED';

export interface TopicDiffItem {
  type: DiffChangeType;
  subjectCode: string;
  subjectName: string;
  oldTopic?: DiffTopicInput;
  newTopic?: DiffTopicInput;
  confidence: number; // 1.0 for exact, 0.85-0.99 for fuzzy
  fieldChanges?: {
    estimatedHours?: { from: number; to: number };
    priority?: { from: string; to: string };
    difficulty?: { from: string; to: string };
    name?: { from: string; to: string };
  };
}

export interface SyllabusDiffResult {
  added: TopicDiffItem[];
  removed: TopicDiffItem[];
  modified: TopicDiffItem[];
  unchanged: TopicDiffItem[];
  netHoursDelta: number;
  totalNewHours: number;
  totalOldHours: number;
}

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}

export function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function computeStringSimilarity(s1: string, s2: string): number {
  const n1 = normalizeString(s1);
  const n2 = normalizeString(s2);
  if (n1 === n2) return 1.0;
  if (!n1.length || !n2.length) return 0.0;

  // Token set similarity
  const t1 = new Set(n1.split(' '));
  const t2 = new Set(n2.split(' '));
  const intersection = new Set([...t1].filter(x => t2.has(x)));
  const union = new Set([...t1, ...t2]);
  const jaccard = intersection.size / union.size;

  // Levenshtein similarity
  const maxLen = Math.max(n1.length, n2.length);
  const levSim = 1.0 - (levenshteinDistance(n1, n2) / maxLen);

  // 60% Levenshtein + 40% Token Jaccard blend
  return (0.6 * levSim) + (0.4 * jaccard);
}

export function diffSyllabusVersions(
  oldSyllabus: SyllabusSnapshotInput,
  newSyllabus: SyllabusSnapshotInput
): SyllabusDiffResult {
  const added: TopicDiffItem[] = [];
  const removed: TopicDiffItem[] = [];
  const modified: TopicDiffItem[] = [];
  const unchanged: TopicDiffItem[] = [];

  let totalOldHours = 0;
  let totalNewHours = 0;

  const oldSubjectMap = new Map<string, DiffSubjectInput>();
  oldSyllabus.subjects.forEach(s => oldSubjectMap.set(s.code, s));

  const newSubjectMap = new Map<string, DiffSubjectInput>();
  newSyllabus.subjects.forEach(s => newSubjectMap.set(s.code, s));

  // Process all subjects in new syllabus
  for (const [code, newSubj] of newSubjectMap.entries()) {
    const oldSubj = oldSubjectMap.get(code);

    if (!oldSubj) {
      // Entire subject added
      for (const t of newSubj.topics) {
        added.push({
          type: 'ADDED',
          subjectCode: code,
          subjectName: newSubj.name,
          newTopic: t,
          confidence: 1.0
        });
        totalNewHours += t.estimatedHours;
      }
      continue;
    }

    // Match topics within subject
    const matchedOldTopicIndices = new Set<number>();

    for (const newTopic of newSubj.topics) {
      totalNewHours += newTopic.estimatedHours;
      let bestMatchIdx = -1;
      let highestSim = 0;

      for (let i = 0; i < oldSubj.topics.length; i++) {
        if (matchedOldTopicIndices.has(i)) continue;
        const oldT = oldSubj.topics[i];
        const sim = computeStringSimilarity(oldT.name, newTopic.name);
        if (sim > highestSim) {
          highestSim = sim;
          bestMatchIdx = i;
        }
      }

      if (highestSim >= 0.85 && bestMatchIdx !== -1) {
        matchedOldTopicIndices.add(bestMatchIdx);
        const oldTopic = oldSubj.topics[bestMatchIdx];
        totalOldHours += oldTopic.estimatedHours;

        // Check if modified or unchanged
        const fieldChanges: TopicDiffItem['fieldChanges'] = {};
        let isModified = false;

        if (oldTopic.name !== newTopic.name) {
          fieldChanges.name = { from: oldTopic.name, to: newTopic.name };
          isModified = true;
        }
        if (oldTopic.estimatedHours !== newTopic.estimatedHours) {
          fieldChanges.estimatedHours = { from: oldTopic.estimatedHours, to: newTopic.estimatedHours };
          isModified = true;
        }
        if (oldTopic.priority !== newTopic.priority) {
          fieldChanges.priority = { from: oldTopic.priority, to: newTopic.priority };
          isModified = true;
        }
        if (oldTopic.difficulty !== newTopic.difficulty) {
          fieldChanges.difficulty = { from: oldTopic.difficulty, to: newTopic.difficulty };
          isModified = true;
        }

        if (isModified) {
          modified.push({
            type: 'MODIFIED',
            subjectCode: code,
            subjectName: newSubj.name,
            oldTopic,
            newTopic,
            confidence: Number(highestSim.toFixed(2)),
            fieldChanges
          });
        } else {
          unchanged.push({
            type: 'UNCHANGED',
            subjectCode: code,
            subjectName: newSubj.name,
            oldTopic,
            newTopic,
            confidence: 1.0
          });
        }
      } else {
        // No match above threshold -> topic added
        added.push({
          type: 'ADDED',
          subjectCode: code,
          subjectName: newSubj.name,
          newTopic,
          confidence: 1.0
        });
      }
    }

    // Remaining unmatched old topics in this subject -> removed (archived)
    for (let i = 0; i < oldSubj.topics.length; i++) {
      if (!matchedOldTopicIndices.has(i)) {
        const oldTopic = oldSubj.topics[i];
        totalOldHours += oldTopic.estimatedHours;
        removed.push({
          type: 'REMOVED',
          subjectCode: code,
          subjectName: oldSubj.name,
          oldTopic,
          confidence: 1.0
        });
      }
    }
  }

  // Check subjects in old that are completely missing in new
  for (const [code, oldSubj] of oldSubjectMap.entries()) {
    if (!newSubjectMap.has(code)) {
      for (const t of oldSubj.topics) {
        totalOldHours += t.estimatedHours;
        removed.push({
          type: 'REMOVED',
          subjectCode: code,
          subjectName: oldSubj.name,
          oldTopic: t,
          confidence: 1.0
        });
      }
    }
  }

  return {
    added,
    removed,
    modified,
    unchanged,
    netHoursDelta: totalNewHours - totalOldHours,
    totalNewHours,
    totalOldHours
  };
}
"""

impact_code = """import { SyllabusDiffResult } from './diff';
import { DeadlineRisk, RiskLevel } from '../scheduler/types';
import { computeDeadlineRisk } from '../scheduler/engine';

export interface SyllabusImpactReport {
  netHoursDelta: number;
  addedTopicsCount: number;
  removedTopicsCount: number;
  modifiedTopicsCount: number;
  oldRisk: DeadlineRisk;
  newRisk: DeadlineRisk;
  requiresImpossibilityTriage: boolean;
  explanation: string;
}

export function generateSyllabusImpactReport(
  diff: SyllabusDiffResult,
  currentRemainingMinutes: number,
  daysToDeadline: number,
  normalDailyHours: number,
  bufferPercent: number,
  todayStr: string
): SyllabusImpactReport {
  const normalDailyMinutes = normalDailyHours * 60;

  const oldRisk = computeDeadlineRisk(
    currentRemainingMinutes,
    daysToDeadline,
    normalDailyMinutes,
    bufferPercent,
    todayStr
  );

  const newRemainingMinutes = Math.max(0, currentRemainingMinutes + (diff.netHoursDelta * 60));

  const newRisk = computeDeadlineRisk(
    newRemainingMinutes,
    daysToDeadline,
    normalDailyMinutes,
    bufferPercent,
    todayStr
  );

  const deltaHours = diff.netHoursDelta;
  const sign = deltaHours >= 0 ? '+' : '';
  const explanation = `This syllabus change adds ${sign}${deltaHours}h net; required daily study changes from ${oldRisk.requiredDailyHours}h to ${newRisk.requiredDailyHours}h; risk level: ${newRisk.level}.`;

  const requiresTriage = newRisk.level === 'HIGH' || newRisk.level === 'CRITICAL';

  return {
    netHoursDelta: deltaHours,
    addedTopicsCount: diff.added.length,
    removedTopicsCount: diff.removed.length,
    modifiedTopicsCount: diff.modified.length,
    oldRisk,
    newRisk,
    requiresImpossibilityTriage: requiresTriage,
    explanation
  };
}
"""

lineage_code = """export interface TopicLineageMapping {
  fromTopicId: string;
  fromTopicName: string;
  toTopicId: string;
  toTopicName: string;
  kind: 'split' | 'merge' | 'renamed' | 'syllabus_mapping';
  migrationRule?: string;
  notes?: string;
}

/**
 * Validates and records syllabus topic lineage without overwriting historical attempts.
 * Directive D12 & Requirement R19: Historical attempts stay with the old topic.
 */
export function buildTopicLineageMap(
  oldTopicId: string,
  oldTopicName: string,
  newTopics: Array<{ id: string; name: string }>,
  kind: 'split' | 'merge' | 'renamed' | 'syllabus_mapping' = 'syllabus_mapping'
): TopicLineageMapping[] {
  return newTopics.map(newT => ({
    fromTopicId: oldTopicId,
    fromTopicName: oldTopicName,
    toTopicId: newT.id,
    toTopicName: newT.name,
    kind,
    migrationRule: 'seed_mastery_hint_only',
    notes: `Mapped lineage from ${oldTopicName} to ${newT.name} (${kind}). Historical attempts remain on ${oldTopicId}.`
  }));
}
"""

base = r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\syllabus"
os.makedirs(base, exist_ok=True)

with open(os.path.join(base, "diff.ts"), "w", encoding="utf-8") as f:
    f.write(diff_code.strip() + "\n")
with open(os.path.join(base, "impact.ts"), "w", encoding="utf-8") as f:
    f.write(impact_code.strip() + "\n")
with open(os.path.join(base, "lineage.ts"), "w", encoding="utf-8") as f:
    f.write(lineage_code.strip() + "\n")

print("Stage 4 syllabus modules built successfully")
