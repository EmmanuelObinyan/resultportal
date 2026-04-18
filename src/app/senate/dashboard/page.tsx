import { prisma } from '../../../lib/prisma';
import SenateDashboardClient from './SenateClient';

export const dynamic = 'force-dynamic';

export default async function SenateDashboardPage() {
  // Fetch pending results strictly with the student relationship securely attached
  const pendingResults = await prisma.result.findMany({
    where: { status: 'Pending' },
    include: { student: true },
    orderBy: { createdAt: 'desc' }
  });

  return <SenateDashboardClient initialPending={pendingResults} />;
}
