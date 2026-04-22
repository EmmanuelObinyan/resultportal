'use client';

import { useState } from 'react';
import { verifyResult, verifyBatch } from '../../actions/senate';

export default function SenateDashboardClient({ initialPending }: { initialPending: any[] }) {
  const [pending, setPending] = useState<any[]>(initialPending);
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleVerify = async (id: string) => {
    setLoading(id);
    const result = await verifyResult(id);
    if (result?.error) {
      showToast('error', `Verification failed: ${result.error}`);
    } else {
      setPending(prev => prev.filter(r => r.id !== id));
      showToast('success', 'Result verified. Parent email notification dispatched.');
    }
    setLoading(null);
  };

  const handleVerifySelected = async () => {
    if (selected.size === 0) return;
    setLoading('batch');
    const ids = Array.from(selected);
    const result = await verifyBatch(ids);
    if (result?.error) {
      showToast('error', `Batch verification failed: ${result.error}`);
    } else {
      setPending(prev => prev.filter(r => !ids.includes(r.id)));
      setSelected(new Set());
      showToast('success', `${ids.length} result(s) verified. Emails dispatched to parents.`);
    }
    setLoading(null);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === pending.length) setSelected(new Set());
    else setSelected(new Set(pending.map(p => p.id)));
  };

  return (
    <>
      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius)',
          backgroundColor: toast.type === 'success' ? 'var(--success)' : 'var(--error)',
          color: '#fff',
          fontWeight: 500,
          fontSize: '0.875rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
          maxWidth: 'calc(100vw - 3rem)',
          animation: 'slideUp 0.3s ease',
        }}>
          {toast.type === 'success' ? '✓ ' : '✕ '}{toast.message}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div
        className="card-header senate-header-row"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}
      >
        <div>
          <h2 style={{ margin: 0 }}>Pending Results Verification</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Review uploaded grades. Once verified, parents are notified automatically via email.
          </p>
        </div>
        <button
          className="btn btn-accent"
          onClick={handleVerifySelected}
          disabled={selected.size === 0 || loading === 'batch'}
          style={{ flexShrink: 0 }}
        >
          {loading === 'batch'
            ? '⏳ Processing...'
            : `✓ Verify Selected (${selected.size})`}
        </button>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selected.size === pending.length && pending.length > 0}
                    onChange={toggleAll}
                    aria-label="Select all results"
                  />
                </th>
                <th>Matric No</th>
                <th>Student</th>
                <th>Course</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                    No pending results — all up to date.
                  </td>
                </tr>
              ) : pending.map(res => (
                <tr key={res.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.has(res.id)}
                      onChange={() => toggleSelect(res.id)}
                    />
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {res.student?.matricNo || '—'}
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {res.student?.name || '—'}
                  </td>
                  <td style={{ fontWeight: 500 }}>{res.courseCode}</td>
                  <td>{res.score}</td>
                  <td>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{res.grade}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleVerify(res.id)}
                      disabled={loading !== null}
                      style={{ padding: '0.4rem 0.875rem', fontSize: '0.8125rem', minHeight: '36px' }}
                    >
                      {loading === res.id ? '⏳ ...' : '✓ Verify & Notify'}
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
