import Link from 'next/link';
import Image from 'next/image';

export default function SenateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <Image src="/mtu-logo.jpg" alt="University Logo" width={40} height={40} style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <div className="sidebar-brand-text">
            <h2>M.T.U.</h2>
            <span>Office of Senate</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <Link href="/senate/dashboard" className="nav-item active">Verification Queue</Link>
          <Link href="/senate/verified" className="nav-item">Action Log</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-title">Mountain Top University &raquo; Senate Executive Board</div>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Senator Profile</span>
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
