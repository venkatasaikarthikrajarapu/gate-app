export interface BackupManifest {
  version: number;
  createdAt: string;
  sourceDescription: string;
  entityCounts: Record<string, number>;
  checksum: string;
}

export interface BackupPayload {
  manifest: BackupManifest;
  data: Record<string, any[]>;
}

export type RestorePhase =
  | 'dry_run'
  | 'diff'
  | 'confirm'
  | 'transactional'
  | 'report';

export interface RestoreDiff {
  entity: string;
  incomingCount: number;
  existingCount: number;
  newRecords: number;
  conflictingIds: string[];
  willOverwrite: number;
}

export interface RestoreReport {
  phase: 'report';
  success: boolean;
  restoredCounts: Record<string, number>;
  skippedCounts: Record<string, number>;
  errors: string[];
  completedAt: string;
}

export function runDryRun(
  payload: BackupPayload,
  currentEntityCounts: Record<string, number>
): { phase: 'dry_run'; valid: boolean; warnings: string[]; manifest: BackupManifest } {
  const warnings: string[] = [];

  if (!payload.manifest || !payload.data) {
    return { phase: 'dry_run', valid: false, warnings: ['Invalid backup payload: missing manifest or data'], manifest: payload.manifest };
  }

  if (payload.manifest.version < 1) {
    warnings.push('Backup version is old. Some fields may be missing.');
  }

  for (const [entity, items] of Object.entries(payload.data)) {
    const incoming = Array.isArray(items) ? items.length : 0;
    const expected = payload.manifest.entityCounts[entity] || 0;
    if (incoming !== expected) {
      warnings.push(`Entity "${entity}": manifest declares ${expected} records but backup data contains ${incoming}`);
    }
  }

  return { phase: 'dry_run', valid: warnings.length === 0, warnings, manifest: payload.manifest };
}

export function computeRestoreDiff(
  payload: BackupPayload,
  existingIds: Record<string, Set<string>>
): RestoreDiff[] {
  const diffs: RestoreDiff[] = [];
  for (const [entity, items] of Object.entries(payload.data)) {
    if (!Array.isArray(items)) continue;
    const knownIds = existingIds[entity] || new Set<string>();
    const incomingIds = items.map((r: any) => r.id as string).filter(Boolean);
    const conflicting = incomingIds.filter(id => knownIds.has(id));
    const newRecords = incomingIds.filter(id => !knownIds.has(id)).length;
    diffs.push({
      entity,
      incomingCount: items.length,
      existingCount: knownIds.size,
      newRecords,
      conflictingIds: conflicting,
      willOverwrite: conflicting.length
    });
  }
  return diffs;
}

export interface ConfirmRestoreDecision {
  proceed: boolean;
  overwritePolicy: 'skip' | 'overwrite' | 'merge_additive';
  userAcknowledgedEntities: string[];
}

export function executeTransactionalRestore(
  payload: BackupPayload,
  decision: ConfirmRestoreDecision,
  existingIds: Record<string, Set<string>>
): RestoreReport {
  if (!decision.proceed) {
    return {
      phase: 'report',
      success: false,
      restoredCounts: {},
      skippedCounts: {},
      errors: ['Restore cancelled by user decision'],
      completedAt: new Date().toISOString()
    };
  }

  const restoredCounts: Record<string, number> = {};
  const skippedCounts: Record<string, number> = {};
  const errors: string[] = [];

  for (const [entity, items] of Object.entries(payload.data)) {
    if (!Array.isArray(items)) continue;
    restoredCounts[entity] = 0;
    skippedCounts[entity] = 0;
    const knownIds = existingIds[entity] || new Set<string>();
    for (const record of items) {
      const id = record.id as string;
      if (!id) { errors.push(`Entity "${entity}": record missing id field -- skipped`); skippedCounts[entity]++; continue; }
      const exists = knownIds.has(id);
      if (exists && decision.overwritePolicy === 'skip') { skippedCounts[entity]++; }
      else { restoredCounts[entity]++; }
    }
  }

  return {
    phase: 'report',
    success: errors.length === 0,
    restoredCounts,
    skippedCounts,
    errors,
    completedAt: new Date().toISOString()
  };
}

export function verifyRoundTrip(original: any, restored: any): { match: boolean; diff: string[] } {
  const differences: string[] = [];

  function deepCompare(a: any, b: any, path: string): void {
    if (typeof a !== typeof b) {
      differences.push(`${path}: type mismatch (${typeof a} vs ${typeof b})`);
      return;
    }
    if (Array.isArray(a)) {
      if (a.length !== b.length) { differences.push(`${path}: array length mismatch`); return; }
      a.forEach((item: any, i: number) => deepCompare(item, b[i], `${path}[${i}]`));
    } else if (a !== null && typeof a === 'object') {
      const keysA = Object.keys(a).sort();
      const keysB = Object.keys(b || {}).sort();
      if (keysA.join(',') !== keysB.join(',')) {
        differences.push(`${path}: key mismatch`);
        return;
      }
      keysA.forEach(k => deepCompare(a[k], (b || {})[k], `${path}.${k}`));
    } else if (a !== b) {
      differences.push(`${path}: value mismatch (${a} vs ${b})`);
    }
  }

  deepCompare(original, restored, 'root');
  return { match: differences.length === 0, diff: differences };
}
