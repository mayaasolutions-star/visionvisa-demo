'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(true); // Default scrolled for consistency with original site
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(true); // Always keep scrolled style if required by original site design
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Re-trigger Lucide icons when mobile menu state changes
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [isMobileOpen]);

  const isActive = (path) => {
    if (path === '/' && (pathname === '/' || pathname === '/index.html')) return true;
    if (path !== '/' && (pathname.startsWith(path) || pathname.startsWith(path + '.html'))) return true;
    return false;
  };

  const toggleMobile = (e) => {
    e.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="logo-brand">
          <img src="/images/vision-visa-logo-symbol.webp" alt="Vision Visa Symbol" className="logo-symbol" />
          <img src="/images/visionvisa-name-dark.webp" alt="Vision Visa" className="logo-name" />
        </Link>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link href="/visas" className={`nav-link ${isActive('/visas') ? 'active' : ''}`}>Visas</Link>
          <Link href="/travel-insurance" className={`nav-link ${isActive('/travel-insurance') ? 'active' : ''}`}>Travel Insurance</Link>
          <Link href="/forex" className={`nav-link ${isActive('/forex') ? 'active' : ''}`}>Forex</Link>
          <Link href="/air-tickets" className={`nav-link ${isActive('/air-tickets') ? 'active' : ''}`}>Air Tickets</Link>
          <Link href="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        </div>
        <div className="nav-actions">
          <Link href="/contact" className="nav-cta magnetic">Apply Now</Link>
          <button 
            className="mobile-toggle" 
            aria-label="Toggle Navigation"
            aria-expanded={isMobileOpen}
            onClick={toggleMobile}
          >
            <i data-lucide={isMobileOpen ? 'x' : 'menu'}></i>
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu ${isMobileOpen ? 'active' : ''}`}>
        <Link href="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>Home</Link>
        <Link href="/visas" className={`mobile-nav-link ${isActive('/visas') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>Visas</Link>
        <Link href="/travel-insurance" className={`mobile-nav-link ${isActive('/travel-insurance') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>Travel Insurance</Link>
        <Link href="/forex" className={`mobile-nav-link ${isActive('/forex') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>Forex</Link>
        <Link href="/air-tickets" className={`mobile-nav-link ${isActive('/air-tickets') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>Air Tickets</Link>
        <Link href="/about" className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMobileOpen(false)}>About</Link>
        <Link href="/contact" className="mobile-nav-cta" onClick={() => setIsMobileOpen(false)}>Apply Now</Link>
      </div>
    </nav>
  );
}
