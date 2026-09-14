import { NextResponse } from 'next/server';
import { GATE_125_DAY_SCHEDULE } from '@/lib/schedule-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get('day');
  const subject = searchParams.get('subject');

  if (day) {
    const item = GATE_125_DAY_SCHEDULE.find((s) => s.day === parseInt(day));
    if (item) return NextResponse.json({ schedule: item });
    return NextResponse.json({ error: 'Day not found' }, { status: 404 });
  }

  if (subject && subject !== 'All') {
    const filtered = GATE_125_DAY_SCHEDULE.filter(
      (s) => s.subjectCode.toLowerCase() === subject.toLowerCase() || s.subjectName.toLowerCase().includes(subject.toLowerCase())
    );
    return NextResponse.json({ schedule: filtered });
  }

  return NextResponse.json({ schedule: GATE_125_DAY_SCHEDULE });
}
