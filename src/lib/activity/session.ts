export interface LogSessionInput {
  userId: string;
  topicId?: string;
  subjectId?: string;
  actualMinutes: number;
  effectiveDate: string; // YYYY-MM-DD
  source?: 'timer' | 'manual' | 'auto';
  taskDescription?: string;
}

export interface LogSessionOutput {
  sessionRecord: any;
  preparationEvent: {
    userId: string;
    eventType: 'study_session';
    occurredAt: string;
    effectiveDate: string;
    source: string;
    actor: 'student';
    payload: Record<string, any>;
    relatedEntityType?: string;
    relatedEntityId?: string;
  };
}

export function createStudySessionEntry(input: LogSessionInput): LogSessionOutput {
  const nowStr = new Date().toISOString();

  const sessionRecord = {
    id: `sess-${Date.now()}`,
    userId: input.userId,
    date: input.effectiveDate,
    plannedMinutes: 0,
    actualMinutes: input.actualMinutes,
    subjectId: input.subjectId,
    topicId: input.topicId,
    taskDescription: input.taskDescription || 'Study session logged',
    source: input.source || 'manual',
    createdAt: nowStr,
    updatedAt: nowStr
  };

  const preparationEvent = {
    userId: input.userId,
    eventType: 'study_session' as const,
    occurredAt: nowStr,
    effectiveDate: input.effectiveDate,
    source: input.source || 'manual',
    actor: 'student' as const,
    payload: {
      actualMinutes: input.actualMinutes,
      topicId: input.topicId,
      subjectId: input.subjectId,
      description: input.taskDescription
    },
    relatedEntityType: 'topic',
    relatedEntityId: input.topicId
  };

  return { sessionRecord, preparationEvent };
}
