import Link from 'next/link';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Image src="/logo.png" alt="University Logo" width={40} height={40} style={{ objectFit: 'contain' }} />
          </div>
          <div className="sidebar-brand-text">
            <h2>M.T.U.</h2>
            <span>Admin Portal</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link href="/admin/dashboard" className="nav-item active">Dashboard Overview</Link>
          <Link href="/admin/upload" className="nav-item">Upload Results</Link>
          <Link href="/admin/pending" className="nav-item">Pending List</Link>
          <Link href="/admin/verified" className="nav-item">Verified Archive</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">Mountain Top University &raquo; Administrative Module</div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Registrar Office</span>
            <Link href="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Sign Out</Link>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
