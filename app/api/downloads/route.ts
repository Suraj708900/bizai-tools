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
  const fileName = String(body.fileName || 'bizai-export.txt');
  const tool = String(body.tool || 'AI Tools');

  await prisma.downloadLog.create({
    data: {
      userId: session.user.id,
      fileName,
      tool
    }
  });

  return NextResponse.json({ success: true });
}
