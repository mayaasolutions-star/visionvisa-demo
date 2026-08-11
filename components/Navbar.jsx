'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGitHubPages, setIsGitHubPages] = useState(false);

  /*
   * Temporary GitHub Pages demo support.
   * This automatically detects the GitHub Pages domain.
   *
   * When the website moves to Hostinger / visionvisa.in,
   * this becomes false automatically.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsGitHubPages(window.location.hostname.endsWith('github.io'));
    }
  }, []);

  /*
   * Prefix static assets only when running on the
   * temporary GitHub Pages demo.
   */
  const assetPath = (path) => {
    if (isGitHubPages) {
      return `/visionvisa-demo${path}`;
    }

    return path;
  };

  /*
   * Remove the temporary GitHub Pages base path
   * when checking active navigation.
   */
  const cleanPathname = pathname?.replace(/^\/visionvisa-demo/, '') || '/';

  const isActive = (path) => {
    if (path === '/') {
      return cleanPathname === '/' || cleanPathname === '/index.html';
    }

    return (
      cleanPathname === path ||
      cleanPathname.startsWith(`${path}/`) ||
      cleanPathname.startsWith(`${path}.html`)
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [isMobileOpen]);

  const toggleMobile = (e) => {
    e.stopPropagation();
    setIsMobileOpen((prev) => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">

        {/* Logo */}
        <Link href="/" className="logo-brand">
          <img
            src={assetPath('/images/vision-visa-logo-symbol.webp')}
            alt="Vision Visa Symbol"
            className="logo-symbol"
          />

          <img
            src={assetPath('/images/visionvisa-name-dark.webp')}
            alt="Vision Visa"
            className="logo-name"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links">

          <Link
            href="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>

          <Link
            href="/visas"
            className={`nav-link ${isActive('/visas') ? 'active' : ''}`}
          >
            Visas
          </Link>

          <Link
            href="/travel-insurance"
            className={`nav-link ${
              isActive('/travel-insurance') ? 'active' : ''
            }`}
          >
            Travel Insurance
          </Link>

          <Link
            href="/forex"
            className={`nav-link ${isActive('/forex') ? 'active' : ''}`}
          >
            Forex
          </Link>

          <Link
            href="/air-tickets"
            className={`nav-link ${
              isActive('/air-tickets') ? 'active' : ''
            }`}
          >
            Air Tickets
          </Link>

          <Link
            href="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>

        </div>

        {/* CTA + Mobile Button */}
        <div className="nav-actions">

          <Link
            href="/contact"
            className="nav-cta magnetic"
          >
            Apply Now
          </Link>

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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileOpen ? 'active' : ''}`}>

        <Link
          href="/"
          className={`mobile-nav-link ${
            isActive('/') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          Home
        </Link>

        <Link
          href="/visas"
          className={`mobile-nav-link ${
            isActive('/visas') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          Visas
        </Link>

        <Link
          href="/travel-insurance"
          className={`mobile-nav-link ${
            isActive('/travel-insurance') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          Travel Insurance
        </Link>

        <Link
          href="/forex"
          className={`mobile-nav-link ${
            isActive('/forex') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          Forex
        </Link>

        <Link
          href="/air-tickets"
          className={`mobile-nav-link ${
            isActive('/air-tickets') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          Air Tickets
        </Link>

        <Link
          href="/about"
          className={`mobile-nav-link ${
            isActive('/about') ? 'active' : ''
          }`}
          onClick={closeMobile}
        >
          About
        </Link>

        <Link
          href="/contact"
          className="mobile-nav-cta"
          onClick={closeMobile}
        >
          Apply Now
        </Link>

      </div>
    </nav>
  );
}