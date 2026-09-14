export interface TopicLineageMapping {
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
