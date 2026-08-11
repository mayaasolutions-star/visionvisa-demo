import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div>
            <Link href="/" className="logo-brand mb-16">
              <img src="/images/vision-visa-logo-symbol.webp" alt="Vision Visa Symbol" className="logo-symbol" />
              <img src="/images/visionvisa-name-dark.webp" alt="Vision Visa" className="logo-name" />
            </Link>
            <p className="body-small text-slate-500 mb-20">
              Trusted visa assistance, document support, travel insurance, forex, and air tickets under one roof.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link href="/services" className="footer-link">Visas</Link>
              <Link href="/travel-insurance" className="footer-link">Travel Insurance</Link>
              <Link href="/forex" className="footer-link">Forex</Link>
              <Link href="/air-tickets" className="footer-link">Air Tickets</Link>
            </div>
          </div>

          {/* Col 3: Contact Information */}
          <div>
            <h4 className="footer-heading">Contact Information</h4>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <i data-lucide="map-pin"></i>
                <span>Shop No. 12, Sanskriti Arcade, Kaspate Wasti, Wakad, Pimpri-Chinchwad, Maharashtra 411057</span>
              </div>
              <a href="tel:08010152621" className="footer-contact-item">
                <i data-lucide="phone"></i>
                <span>+91 80101 52621</span>
              </a>
              <a href="mailto:info@visionvisa.in" className="footer-contact-item">
                <i data-lucide="mail"></i>
                <span>info@visionvisa.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright-group">
            <p>© 2026 Vision Visa. All Rights Reserved.</p>
            <span className="designer-tag">Website designed by Mayaa Solutions</span>
          </div>
          <div className="footer-socials">
            <a href="https://www.instagram.com/visionvisa.in/" target="_blank" rel="noopener noreferrer" className="official-brand-logo-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="official-brand-logo">
                <defs>
                  <radialGradient id="instaGradMainFooter" cx="10%" cy="100%" r="120%">
                    <stop offset="0%" stopColor="#FFD600" />
                    <stop offset="25%" stopColor="#FF7A00" />
                    <stop offset="50%" stopColor="#FF0069" />
                    <stop offset="75%" stopColor="#D300C5" />
                    <stop offset="100%" stopColor="#7638FA" />
                  </radialGradient>
                </defs>
                <path fill="url(#instaGradMainFooter)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="official-brand-logo-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="official-brand-logo">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="official-brand-logo-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="official-brand-logo">
                <path fill="#0A66C2" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            <a href="#" className="official-brand-logo-link" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" className="official-brand-logo">
                <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
