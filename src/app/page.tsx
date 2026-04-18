import Link from 'next/link';

export default function Home() {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, textAlign: 'center', padding: '4rem 0' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', background: 'linear-gradient(to right, var(--primary), #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Senate Verification Portal
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--foreground)', opacity: 0.8, maxWidth: '600px', marginBottom: '3rem' }}>
        A unified system for the Senate to review user results, systematically verify, and automatically notify students and their parents seamlessly.
      </p>
      
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Get Started</h2>
        <Link href="/login" className="btn btn-primary" style={{ width: '100%' }}>
          Log in to Dashboard
        </Link>
      </div>
    </div>
  );
}
