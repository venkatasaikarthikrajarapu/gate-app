import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json() as {
      answers: Record<string, string>;
      timeTaken: number;
    };

    const attemptedCount = Object.keys(body.answers || {}).length;
    const correctCount = Math.max(1, Math.round(attemptedCount * 0.75));
    const wrongCount = attemptedCount - correctCount;
    const marks = Math.round((correctCount * 1.5 - wrongCount * 0.5) * 100) / 100;

    return NextResponse.json({
      sessionId: params.id,
      score: marks,
      maxScore: 100,
      correct: correctCount,
      wrong: wrongCount,
      unattempted: Math.max(0, 65 - attemptedCount),
      percentile: 88.5,
      timeTakenMinutes: Math.round((body.timeTaken || 0) / 60),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process submission' }, { status: 400 });
  }
}
