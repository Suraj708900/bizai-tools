import { prisma } from './prisma';

export const PLAN_LIMITS = {
  free: { daily: 5, monthly: Number.MAX_SAFE_INTEGER },
  pro: { daily: Number.MAX_SAFE_INTEGER, monthly: 100 },
  business: { daily: Number.MAX_SAFE_INTEGER, monthly: 500 }
} as const;

export async function getCurrentPlanStatus(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscriptions: true }
  });

  if (!user) return { plan: 'free', currentStatus: 'inactive' };

  const activeSub = user.subscriptions.find((sub) => sub.status === 'active');
  const plan = activeSub?.plan || user.plan || 'free';

  return {
    plan,
    currentStatus: activeSub?.status || 'inactive'
  };
}

export async function getUsageStats(userId: string, plan: string) {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [dailyCount, monthlyCount] = await Promise.all([
    prisma.generation.count({
      where: {
        userId,
        createdAt: {
          gte: startOfDay
        }
      }
    }),
    prisma.generation.count({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth
        }
      }
    })
  ]);

  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;

  return {
    dailyCount,
    monthlyCount,
    dailyLimit: limits.daily,
    monthlyLimit: limits.monthly,
    remainingToday: Math.max(limits.daily - dailyCount, 0),
    remainingThisMonth: Math.max(limits.monthly - monthlyCount, 0)
  };
}

export async function checkGenerationAllowed(userId: string, plan: string) {
  const usage = await getUsageStats(userId, plan);
  const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.free;

  if (plan === 'free' && usage.dailyCount >= limits.daily) {
    return {
      allowed: false,
      reason: 'Free plan limit reached: 5 generations per day.',
      usage
    };
  }

  if ((plan === 'pro' || plan === 'business') && usage.monthlyCount >= limits.monthly) {
    return {
      allowed: false,
      reason: `Your ${plan} plan limit has been reached for this month.`,
      usage
    };
  }

  return {
    allowed: true,
    reason: null,
    usage
  };
}
