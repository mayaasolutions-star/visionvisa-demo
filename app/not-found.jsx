import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p style={{ margin: '16px 0 24px' }}>The page you are looking for does not exist or has been moved.</p>
      <Link href="/" className="btn btn-primary">Return to Homepage</Link>
    </main>
  );
}
