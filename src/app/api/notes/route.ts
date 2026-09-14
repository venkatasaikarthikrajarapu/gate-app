import { NextResponse } from 'next/server';
import { DEMO_NOTES, DEMO_FORMULAS, DEMO_TRAPS } from '@/lib/notes-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'notes';

  if (type === 'formulas') return NextResponse.json({ formulas: DEMO_FORMULAS });
  if (type === 'traps') return NextResponse.json({ traps: DEMO_TRAPS });
  return NextResponse.json({ notes: DEMO_NOTES });
}
