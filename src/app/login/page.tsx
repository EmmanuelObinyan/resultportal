'use client';

import { useState } from 'react';
import Image from 'next/image';
import { loginAction } from '../actions/auth';

export default function LoginPage() {
  const [role, setRole] = useState('senate'); // 'senate' or 'admin'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Formal Institutional Left Side */}
      <div style={{ flex: 1, backgroundColor: 'var(--primary)', color: 'var(--text-inverted)', display: 'flex', flexDirection: 'column', padding: '4rem', backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, #001533 100%)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Subtle background decoration */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,169,61,0.05) 0%, transparent 70%)' }}></div>

        <div style={{ zIndex: 1, marginTop: 'auto', marginBottom: 'auto' }}>
          <div style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', display: 'inline-block', marginBottom: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <Image src="/mtu-logo.jpg" alt="Institutional Crest" width={110} height={110} style={{ objectFit: 'contain', mixBlendMode: 'multiply' }} />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Mountain Top<br/>University
          </h1>
          <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--accent)', marginBottom: '1.5rem', borderRadius: '2px' }}></div>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', fontWeight: 300, lineHeight: 1.6 }}>
            Official centralized portal for Senate result verification, academic review, and systematic parental notification.
          </p>
        </div>
        <div style={{ zIndex: 1, fontSize: '0.875rem', opacity: 0.6, marginTop: 'auto' }}>
          &copy; {new Date().getFullYear()} Office of the Registrar. All rights reserved.
        </div>
      </div>

      {/* Clean Form Right Side */}
      <div style={{ width: '500px', backgroundColor: 'var(--surface)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', boxShadow: '-10px 0 30px rgba(0,0,0,0.05)', zIndex: 10 }}>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.025em' }}>Secure Access</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Please log in with official institutional credentials.</p>
        </div>
        
        <form action={loginAction}>
          
          {/* Institutional Role Verification */}
          <div style={{ display: 'flex', marginBottom: '2rem', backgroundColor: 'var(--background)', borderRadius: 'var(--radius)', padding: '0.35rem', border: '1px solid var(--border)' }}>
            <button 
              type="button" 
              onClick={() => setRole('senate')}
              style={{ flex: 1, padding: '0.75rem', borderRadius: 'calc(var(--radius) - 2px)', border: 'none', backgroundColor: role === 'senate' ? 'var(--surface)' : 'transparent', color: role === 'senate' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: role === 'senate' ? 600 : 500, boxShadow: role === 'senate' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem' }}
            >
              Office of Senate
            </button>
            <button 
              type="button" 
              onClick={() => setRole('admin')}
              style={{ flex: 1, padding: '0.75rem', borderRadius: 'calc(var(--radius) - 2px)', border: 'none', backgroundColor: role === 'admin' ? 'var(--surface)' : 'transparent', color: role === 'admin' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: role === 'admin' ? 600 : 500, boxShadow: role === 'admin' ? 'var(--shadow-sm)' : 'none', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem' }}
            >
              Administrator
            </button>
          </div>

          <input type="hidden" name="role" value={role} />

          <div style={{ marginBottom: '1.5rem' }}>
            <label>Staff ID or Email Address</label>
            <input 
              type="email" 
              name="email"
              placeholder="e.g. registry@mtu.edu.ng" 
              required
              style={{ padding: '0.875rem 1rem' }}
            />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.5rem' }}>
              <label style={{ marginBottom: 0 }}>Portal Password</label>
            </div>
            <input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              required
              style={{ padding: '0.875rem 1rem' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', fontWeight: 600, letterSpacing: '0.025em' }}>
            {role === 'senate' ? 'Authenticate Senate Member' : 'Authenticate Administrator'}
          </button>
        </form>
      </div>
    </div>
  );
}
