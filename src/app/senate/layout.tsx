import Link from 'next/link';
import Image from 'next/image';
import SidebarLayout from '../../components/SidebarLayout';

export default function SenateLayout({ children }: { children: React.ReactNode }) {
  const sidebarContent = (
    <>
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Image
            src="/mtu-logo.jpg"
            alt="University Logo"
            width={40}
            height={40}
            style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
          />
        </div>
        <div className="sidebar-brand-text">
          <h2>M.T.U.</h2>
          <span>Office of Senate</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <Link href="/senate/dashboard" className="nav-item active">
          📋 Verification Queue
        </Link>
        <Link href="/senate/verified" className="nav-item">
          📁 Action Log
        </Link>
      </nav>
    </>
  );

  return (
    <SidebarLayout
      sidebar={sidebarContent}
      topbarLeft={
        <div className="topbar-title">
          Mountain Top University &raquo; Senate Executive Board
        </div>
      }
      topbarRight={
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <span className="topbar-user-label">Senator Profile</span>
          <Link href="/" className="btn btn-secondary btn-sm">
            Sign Out
          </Link>
        </div>
      }
    >
      {children}
    </SidebarLayout>
  );
}
