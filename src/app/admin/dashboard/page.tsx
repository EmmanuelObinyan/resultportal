import { prisma } from '../../lib/prisma';

export const dynamic = 'force-dynamic'; // Ensures fresh data load

export default async function AdminDashboardPage() {
  const total = await prisma.result.count();
  const pending = await prisma.result.count({ where: { status: 'Pending' } });
  const verified = await prisma.result.count({ where: { status: 'Verified' } });

  const recent = await prisma.result.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { student: true }
  });

  return (
    <>
      <div className="card-header" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-main)' }}>System Overview</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Real-time metrics for uploaded student results across all departments.
        </p>
      </div>

      <div className="grid-cards">
        <div className="stat-card primary">
          <div className="stat-card-title">Total Processed</div>
          <div className="stat-card-value">{total}</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-card-title">Pending Senate Action</div>
          <div className="stat-card-value" style={{ color: 'var(--warning)' }}>{pending}</div>
        </div>
        <div className="stat-card success">
          <div className="stat-card-title">Officially Verified</div>
          <div className="stat-card-value" style={{ color: 'var(--success)' }}>{verified}</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-header" style={{ fontSize: '1.125rem' }}>Recent Database Activity</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Course</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No recent activity found.</td>
                </tr>
              ) : recent.map((res) => (
                <tr key={res.id}>
                  <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{res.student.matricNo}</span></td>
                  <td style={{ fontWeight: 500 }}>{res.courseCode}</td>
                  <td>{res.createdAt.toLocaleDateString()}</td>
                  <td>
                    {res.status === 'Pending' ? (
                      <span className="badge badge-warning">Awaiting Senate</span>
                    ) : (
                      <span className="badge badge-success">Fully Verified</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
