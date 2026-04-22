'use client';

import { useState } from 'react';
import Image from 'next/image';
import { loginAction } from '../actions/auth';

export default function LoginPage() {
  const [role, setRole] = useState('senate');

  return (
    <div className="login-root">
      {/* ── Institutional Left Panel ── */}
      <div className="login-hero">
        {/* Decorative background circle */}
        <div className="login-hero-glow" />

        <div className="login-hero-body">
          <div className="login-logo-wrap">
            <Image
              src="/mtu-logo.jpg"
              alt="Mountain Top University Crest"
              width={110}
              height={110}
              style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
            />
          </div>
          <h1 className="login-hero-title">
            Mountain Top<br />University
          </h1>
          <div className="login-hero-bar" />
          <p className="login-hero-desc">
            Official centralized portal for Senate result verification, academic
            review, and systematic parental notification.
          </p>
        </div>

        <div className="login-hero-footer">
          &copy; {new Date().getFullYear()} Office of the Registrar. All rights reserved.
        </div>
      </div>

      {/* ── Form Right Panel ── */}
      <div className="login-form-panel">
        <div className="login-box">
          <div style={{ marginBottom: '2rem' }}>
            <h2 className="login-heading">Secure Access</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              Please log in with official institutional credentials.
            </p>
          </div>

          <form action={loginAction}>
            {/* Role selector */}
            <div className="role-switcher">
              <button
                type="button"
                onClick={() => setRole('senate')}
                className={`role-btn${role === 'senate' ? ' role-btn-active' : ''}`}
              >
                Office of Senate
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`role-btn${role === 'admin' ? ' role-btn-active' : ''}`}
              >
                Administrator
              </button>
            </div>

            <input type="hidden" name="role" value={role} />

            <div style={{ marginBottom: '1.25rem' }}>
              <label>Staff ID or Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. registry@mtu.edu.ng"
                required
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label>Portal Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 600 }}
            >
              {role === 'senate' ? 'Authenticate Senate Member' : 'Authenticate Administrator'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
