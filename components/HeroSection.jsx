import Link from 'next/link';
import { getAssetPath } from '@/lib/asset-path';
import React from 'react';

/**
 * Editorial Hero Section Component
 * Provides an asymmetric, new-age editorial composition for service pages.
 */
export default function HeroSection({
  tag = "VISION VISA",
  title,
  subtitle,
  ctaText = "Enquire Now",
  ctaLink = "/contact",
  secondaryCtaText,
  secondaryCtaLink,
  image = "/images/vision-visa-logo-symbol.webp",
  badgeTop,
  badgeBottom,
  theme = "light"
}) {
  const themeClass = theme === "dark" ? "editorial-hero-dark" : theme === "soft" ? "editorial-hero-soft" : "";

  return (
    <section className={`editorial-hero ${themeClass}`}>
      <div className="editorial-bg-grid"></div>
      <div className="container">
        <div className="editorial-hero-grid">
          {/* Left Editorial Narrative */}
          <div className="editorial-hero-content reveal">
            {tag && (
              <span className="editorial-tag">
                <i data-lucide="compass" style={{ width: 14, height: 14 }}></i>
                {tag}
              </span>
            )}

            <h1 className="editorial-title">
              {title}
            </h1>

            {subtitle && (
              <p className="editorial-subtitle">
                {subtitle}
              </p>
            )}

            <div className="editorial-actions">
              {ctaLink && ctaText && (
                <Link href={ctaLink} className="btn btn-primary magnetic">
                  {ctaText}
                </Link>
              )}
              {secondaryCtaLink && secondaryCtaText && (
                <Link href={secondaryCtaLink} className="btn btn-secondary magnetic">
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="editorial-visual-frame reveal reveal-delay-1">
            <div className="editorial-image-container">
              <img src={getAssetPath(image)} alt={title || "Vision Visa Travel"} className="editorial-image-main" />
              <div className="editorial-image-overlay"></div>
            </div>

            {/* Floating Top Badge */}
            {badgeTop && (
              <div className="editorial-badge editorial-badge-top-right">
                <div className={`editorial-badge-icon ${badgeTop.colorClass || ''}`}>
                  <i data-lucide={badgeTop.icon || 'globe'}></i>
                </div>
                <div className="editorial-badge-text">
                  <span className="editorial-badge-label">{badgeTop.label}</span>
                  <span className="editorial-badge-val">{badgeTop.val}</span>
                </div>
              </div>
            )}

            {/* Floating Bottom Badge */}
            {badgeBottom && (
              <div className="editorial-badge editorial-badge-bottom-left">
                <div className={`editorial-badge-icon ${badgeBottom.colorClass || 'editorial-badge-icon-blue'}`}>
                  <i data-lucide={badgeBottom.icon || 'check-circle'}></i>
                </div>
                <div className="editorial-badge-text">
                  <span className="editorial-badge-label">{badgeBottom.label}</span>
                  <span className="editorial-badge-val">{badgeBottom.val}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
