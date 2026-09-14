import { describe, it, expect } from 'vitest';
import {
  runDryRun,
  computeRestoreDiff,
  executeTransactionalRestore,
  verifyRoundTrip,
  BackupPayload
} from '../../src/lib/backup/restore';

describe('Stage 15: Backup & Transactional Restore Engine', () => {
  const validPayload: BackupPayload = {
    manifest: {
      version: 1,
      createdAt: '2026-10-01T12:00:00Z',
      sourceDescription: 'GATE CSE 2027 prep backup',
      entityCounts: { questions: 3, mistakes: 2 },
      checksum: 'abc123'
    },
    data: {
      questions: [
        { id: 'q-1', text: 'What is OS?' },
        { id: 'q-2', text: 'Dijkstra shortest path' },
        { id: 'q-3', text: 'B+ tree height' }
      ],
      mistakes: [
        { id: 'mst-1', questionId: 'q-1', classification: 'conceptual_gap' },
        { id: 'mst-2', questionId: 'q-2', classification: 'edge_case_missed' }
      ]
    }
  };

  it('dry run passes valid backup and detects manifest count mismatch', () => {
    const validResult = runDryRun(validPayload, {});
    expect(validResult.phase).toBe('dry_run');
    expect(validResult.valid).toBe(true);
    expect(validResult.warnings).toHaveLength(0);
    expect(validResult.manifest.entityCounts.questions).toBe(3);

    // Payload with wrong count in manifest
    const mismatchPayload: BackupPayload = {
      manifest: { ...validPayload.manifest, entityCounts: { questions: 5, mistakes: 2 } },
      data: validPayload.data
    };
    const badResult = runDryRun(mismatchPayload, {});
    expect(badResult.valid).toBe(false);
    expect(badResult.warnings.some(w => w.includes('question mismatch') || w.includes('questions'))).toBe(true);
  });

  it('diff step identifies new records vs conflicting IDs', () => {
    const existingIds = {
      questions: new Set(['q-1']),
      mistakes: new Set<string>()
    };

    const diffs = computeRestoreDiff(validPayload, existingIds);
    const qDiff = diffs.find(d => d.entity === 'questions');
    const mDiff = diffs.find(d => d.entity === 'mistakes');

    expect(qDiff).toBeDefined();
    expect(qDiff!.incomingCount).toBe(3);
    expect(qDiff!.newRecords).toBe(2); // q-2 and q-3 are new
    expect(qDiff!.conflictingIds).toContain('q-1');
    expect(qDiff!.willOverwrite).toBe(1);

    expect(mDiff!.newRecords).toBe(2);
    expect(mDiff!.willOverwrite).toBe(0);
  });

  it('skip policy skips conflicting records without data destruction (Directive D12)', () => {
    const existingIds = {
      questions: new Set(['q-1', 'q-2']),
      mistakes: new Set<string>()
    };

    const report = executeTransactionalRestore(validPayload, {
      proceed: true,
      overwritePolicy: 'skip',
      userAcknowledgedEntities: ['questions', 'mistakes']
    }, existingIds);

    expect(report.phase).toBe('report');
    expect(report.success).toBe(true);
    expect(report.restoredCounts.questions).toBe(1); // Only q-3 new
    expect(report.skippedCounts.questions).toBe(2); // q-1, q-2 skipped
    expect(report.restoredCounts.mistakes).toBe(2); // Both new
  });

  it('cancels restore when user decision is proceed=false', () => {
    const report = executeTransactionalRestore(validPayload, {
      proceed: false,
      overwritePolicy: 'skip',
      userAcknowledgedEntities: []
    }, {});
    expect(report.success).toBe(false);
    expect(report.errors).toContain('Restore cancelled by user decision');
  });

  it('round-trip deep-equal verification detects value drift', () => {
    const original = { id: 'q-1', text: 'What is OS?', marks: 2, tags: ['os', 'exam'] };
    const identical = { id: 'q-1', text: 'What is OS?', marks: 2, tags: ['os', 'exam'] };
    const drifted = { id: 'q-1', text: 'What is OS?', marks: 1, tags: ['os', 'exam'] }; // marks differs

    const { match: m1, diff: d1 } = verifyRoundTrip(original, identical);
    expect(m1).toBe(true);
    expect(d1).toHaveLength(0);

    const { match: m2, diff: d2 } = verifyRoundTrip(original, drifted);
    expect(m2).toBe(false);
    expect(d2.some(s => s.includes('marks') || s.includes('value mismatch'))).toBe(true);
  });
});
