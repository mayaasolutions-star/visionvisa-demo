import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

/**
 * Reusable hero section for service pages.
 * Props:
 *  - title: Main headline (string)
 *  - subtitle: Supporting paragraph (string)
 *  - backgroundImage: Path to hero image (relative to public folder)
 *  - ctaText: Call‑to‑action button text (string)
 *  - ctaLink: URL for CTA button (string)
 */
export default function HeroSection({ title, subtitle, backgroundImage, ctaText, ctaLink }) {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <div className={styles.content}>
          <h1 className="display-text mb-24">{title}</h1>
          {subtitle && <p className="body-large mb-48">{subtitle}</p>}
          {ctaLink && ctaText && (
            <a href={ctaLink} className="btn btn-primary magnetic">
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
