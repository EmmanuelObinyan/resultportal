export default function SenateDashboardPage() {
  return (
    <>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Pending Results Verification</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Review the uploaded grades. Once verified, parents will automatically be notified.
          </p>
        </div>
        <button className="btn btn-accent">Verify All Selected</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" /></th>
                <th>Matric No</th>
                <th>Course</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Date Uploaded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 500 }}>190404001</td>
                <td>CSC401</td>
                <td>78</td>
                <td><span style={{ color: 'var(--success)', fontWeight: 'bold' }}>A</span></td>
                <td>Oct 24, 2023</td>
                <td>
                  <button className="btn btn-success" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                    Verify & Notify
                  </button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 500 }}>190404002</td>
                <td>CSC401</td>
                <td>42</td>
                <td><span style={{ color: 'var(--error)', fontWeight: 'bold' }}>F</span></td>
                <td>Oct 24, 2023</td>
                <td>
                  <button className="btn btn-success" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                    Verify & Notify
                  </button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td style={{ fontWeight: 500 }}>190404003</td>
                <td>CSC401</td>
                <td>65</td>
                <td><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>B</span></td>
                <td>Oct 24, 2023</td>
                <td>
                  <button className="btn btn-success" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                    Verify & Notify
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
