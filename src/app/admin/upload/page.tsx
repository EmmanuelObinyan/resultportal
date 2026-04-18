'use client';
import { useState } from 'react';

export default function AdminUploadPage() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <>
      <div className="card-header">
        <h2 style={{ margin: 0 }}>Upload Student Results</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Enter results manually or upload a standard formatted CSV file.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button 
          className={`btn ${activeTab === 'single' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setActiveTab('single')}
        >
          Single Entry Form
        </button>
        <button 
          className={`btn ${activeTab === 'csv' ? 'btn-primary' : 'btn-secondary'}`} 
          onClick={() => setActiveTab('csv')}
        >
          Batch CSV Upload
        </button>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        {activeTab === 'single' ? (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ fontSize: '1.125rem' }}>Single Result Entry</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Matriculation Number</label>
                <input type="text" placeholder="e.g. 190404001" required />
              </div>
              <div>
                <label>Course Code</label>
                <input type="text" placeholder="e.g. CSC401" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Total Score (100)</label>
                <input type="number" placeholder="0" min="0" max="100" required />
              </div>
              <div>
                <label>Grade</label>
                <select required>
                  <option value="">Select Grade...</option>
                  <option value="A">A (70-100)</option>
                  <option value="B">B (60-69)</option>
                  <option value="C">C (50-59)</option>
                  <option value="D">D (45-49)</option>
                  <option value="F">F (0-44)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Submit for Verification
            </button>
          </form>
        ) : (
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
             <h3 style={{ fontSize: '1.125rem' }}>Batch CSV Upload</h3>
             <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
               Ensure your CSV has columns: <code>matric_no, course_code, score, grade</code>.
             </p>

             <div style={{ padding: '2rem', border: '2px dashed var(--border)', borderRadius: 'var(--radius)', textAlign: 'center', backgroundColor: 'var(--surface-hover)', margin: '1rem 0' }}>
               <input type="file" id="csv-upload" accept=".csv" style={{ display: 'none' }} />
               <label htmlFor="csv-upload" className="btn btn-secondary">
                 Browse Files...
               </label>
               <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Only .csv files up to 5MB</p>
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
