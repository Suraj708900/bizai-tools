import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title || 'Untitled document').trim();
  const content = String(body.content || '').trim();
  const tool = String(body.tool || 'AI Tools');

  if (!content) {
    return NextResponse.json({ error: 'Missing document content.' }, { status: 400 });
  }

  const saved = await prisma.savedDocument.create({
    data: {
      userId: session.user.id,
      title: title || `${tool} document`,
      content,
      tool
    }
  });

  return NextResponse.json({ success: true, saved });
}
