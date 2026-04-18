export default function AdminDashboardPage() {
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
          <div className="stat-card-value">1,248</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-card-title">Pending Senate Action</div>
          <div className="stat-card-value" style={{ color: 'var(--warning)' }}>312</div>
        </div>
        <div className="stat-card success">
          <div className="stat-card-title">Officially Verified</div>
          <div className="stat-card-value" style={{ color: 'var(--success)' }}>936</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 className="card-header" style={{ fontSize: '1.125rem' }}>Recent Database Activity</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Course</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#BCH-4001</span></td>
                <td style={{ fontWeight: 500 }}>CSC401 - Artificial Intelligence</td>
                <td>Dr. A. Ojo</td>
                <td>Oct 24, 2023</td>
                <td><span className="badge badge-warning">Awaiting Senate</span></td>
              </tr>
              <tr>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#BCH-4000</span></td>
                <td style={{ fontWeight: 500 }}>CSC402 - Software Engineering</td>
                <td>Dr. B. Ade</td>
                <td>Oct 23, 2023</td>
                <td><span className="badge badge-success">Fully Verified</span></td>
              </tr>
              <tr>
                <td><span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>#BCH-3999</span></td>
                <td style={{ fontWeight: 500 }}>MTH201 - Advanced Calculus</td>
                <td>Prof. C. Eze</td>
                <td>Oct 22, 2023</td>
                <td><span className="badge badge-success">Fully Verified</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
