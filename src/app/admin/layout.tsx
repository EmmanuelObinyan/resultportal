import Link from 'next/link';
import Image from 'next/image';
import SidebarLayout from '../../components/SidebarLayout';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
          <span>Admin Portal</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <Link href="/admin/dashboard" className="nav-item active">
          📊 Dashboard Overview
        </Link>
        <Link href="/admin/upload" className="nav-item">
          📤 Upload Results
        </Link>
        <Link href="/admin/pending" className="nav-item">
          ⏳ Pending List
        </Link>
        <Link href="/admin/verified" className="nav-item">
          ✅ Verified Archive
        </Link>
      </nav>
    </>
  );

  return (
    <SidebarLayout
      sidebar={sidebarContent}
      topbarLeft={
        <div className="topbar-title">
          Mountain Top University &raquo; Administrative Module
        </div>
      }
      topbarRight={
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <span className="topbar-user-label">Registrar Office</span>
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
