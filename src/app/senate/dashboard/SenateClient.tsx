'use client';

import { useState, use } from 'react';
import { verifyResult, verifyBatch } from '../../actions/senate';

export default function SenateDashboardClient({ initialPending }: { initialPending: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleVerify = async (id: string) => {
    setLoading(id);
    await verifyResult(id);
    setLoading(null);
  };

  const handleVerifySelected = async () => {
    if (selected.size === 0) return;
    setLoading('batch');
    await verifyBatch(Array.from(selected));
    setSelected(new Set());
    setLoading(null);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === initialPending.length) setSelected(new Set());
    else setSelected(new Set(initialPending.map(p => p.id)));
  };

  return (
    <>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Pending Results Verification</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Review the uploaded grades. Once verified, parents will automatically be notified.
          </p>
        </div>
        <button 
          className="btn btn-accent" 
          onClick={handleVerifySelected}
          disabled={selected.size === 0 || loading === 'batch'}
        >
          {loading === 'batch' ? 'Processing...' : `Verify All Selected (${selected.size})`}
        </button>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selected.size === initialPending.length && initialPending.length > 0} 
                    onChange={toggleAll}
                  />
                </th>
                <th>Matric No</th>
                <th>Course</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {initialPending.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No pending results require verification at this time.
                  </td>
                </tr>
              ) : initialPending.map(res => (
                <tr key={res.id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selected.has(res.id)} 
                      onChange={() => toggleSelect(res.id)}
                    />
                  </td>
                  <td style={{ fontWeight: 500 }}>{res.student?.matricNo || 'Unknown'}</td>
                  <td>{res.courseCode}</td>
                  <td>{res.score}</td>
                  <td><span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{res.grade}</span></td>
                  <td>
                    <button 
                      className="btn btn-success" 
                      onClick={() => handleVerify(res.id)}
                      disabled={loading !== null}
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      {loading === res.id ? 'Processing...' : 'Verify & Notify'}
                    </button>
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
