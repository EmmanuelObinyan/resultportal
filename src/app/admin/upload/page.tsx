'use client';
import { useState } from 'react';
import { uploadSingleResult, uploadBatchCSV } from '../../actions/results';

export default function AdminUploadPage() {
  const [activeTab, setActiveTab] = useState('single');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSingleAction = async (formData: FormData) => {
    setStatus(null);
    const result = await uploadSingleResult(formData);
    if (result.error) {
      setStatus({ type: 'error', message: result.error });
    } else {
      setStatus({ type: 'success', message: 'Result securely uploaded to the verification queue.' });
    }
  };

  const handleCSVAction = async (formData: FormData) => {
    setStatus(null);
    const result = await uploadBatchCSV(formData);
    if (result.error) {
      setStatus({ type: 'error', message: result.error });
    } else {
      setStatus({ type: 'success', message: `Successfully parsed and uploaded ${result.count} results to pending queue.` });
    }
  };

  return (
    <>
      <div className="card-header">
        <h2 style={{ margin: 0 }}>Upload Student Results</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Enter results manually or upload a standard formatted CSV file.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button 
          className={`btn ${activeTab === 'single' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => { setActiveTab('single'); setStatus(null); }}
        >
          📝 Single Entry Form
        </button>
        <button 
          className={`btn ${activeTab === 'csv' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => { setActiveTab('csv'); setStatus(null); }}
        >
          📂 Batch CSV Upload
        </button>
      </div>

      {status && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: 'var(--radius)', backgroundColor: status.type === 'error' ? 'var(--warning-bg)' : 'var(--success-bg)', color: status.type === 'error' ? 'var(--warning)' : 'var(--success)', border: `1px solid ${status.type === 'error' ? 'var(--warning)' : 'var(--success)'}` }}>
          {status.message}
        </div>
      )}

      <div className="card" style={{ maxWidth: '600px' }}>
        {activeTab === 'single' ? (
          <form action={handleSingleAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Single Result Entry</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <label>Matriculation Number</label>
                <input type="text" name="matricNo" placeholder="e.g. 190404001" required />
              </div>
              <div>
                <label>Course Code</label>
                <input type="text" name="courseCode" placeholder="e.g. CSC401" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div>
                <label>Total Score (100)</label>
                <input type="number" name="score" placeholder="0" min="0" max="100" required />
              </div>
              <div>
                <label>Grade</label>
                <select name="grade" required>
                  <option value="">Select Grade...</option>
                  <option value="A">A (70-100)</option>
                  <option value="B">B (60-69)</option>
                  <option value="C">C (50-59)</option>
                  <option value="D">D (45-49)</option>
                  <option value="F">F (0-44)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '0.5rem' }}>
              Submit for Verification
            </button>
          </form>
        ) : (
          <form action={handleCSVAction} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
             <h3 style={{ fontSize: '1.125rem' }}>Batch CSV Upload</h3>
             <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
               Ensure your CSV has columns: <code>matricNo, courseCode, score, grade</code> (No spaces in headers).
             </p>

             <div style={{ padding: '2rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', textAlign: 'center', backgroundColor: 'var(--surface-hover)', margin: '1rem 0' }}>
               <input type="file" name="file" id="csv-upload" accept=".csv" required style={{ display: 'block', margin: '0 auto', fontSize: '0.875rem' }} />
             </div>

             <button type="submit" className="btn btn-primary">
               Upload & Parse Batch
             </button>
          </form>
        )}
      </div>
    </>
  );
}
