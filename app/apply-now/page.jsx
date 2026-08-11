import React from 'react';
import Link from 'next/link';

export const metadata = {
    title: "Apply Now | Start Your Visa & Travel Application | Vision Visa",
    description: "Begin your visa application, travel insurance inquiry, forex order, or air ticket booking with Vision Visa."
};

export default function APPLY_NOW_Page() {
    return (
    <main>
        <section className="inner-hero inner-hero-dark">
            <div className="hero-pattern-dots"></div>
            <div className="container">
                <div className="contact-hero-grid">
                    <div className="reveal">
                        <span className="editorial-tag">
                            <i data-lucide="sparkles" style={{ width: 14, height: 14 }}></i>
                            START YOUR APPLICATION
                        </span>

                        <h1 className="editorial-title">
                            Take the first step <br />
                            <span className="accent">toward your journey.</span>
                        </h1>

                        <p className="editorial-subtitle">
                            Get personalized assistance for visa filing, document evaluation, overseas medical cover, forex cards, and flight bookings.
                        </p>

                        <div className="editorial-actions mb-24">
                            <a href="#application-form" className="btn btn-primary magnetic">
                                Start Application
                            </a>
                            <a href="tel:+918010152621" className="btn btn-secondary magnetic">
                                Call Specialist
                            </a>
                        </div>
                    </div>

                    <div className="hero-frame-container reveal reveal-delay-1">
                        <img src="/images/about-hero.webp" alt="Apply Now - Start Journey" className="hero-frame-img" />
                        
                        <div className="floating-hero-badge badge-pos-top-right">
                            <div className="editorial-badge-icon">
                                <i data-lucide="check-circle-2"></i>
                            </div>
                            <div className="editorial-badge-text">
                                <span className="editorial-badge-label">PROCESS</span>
                                <span className="editorial-badge-val">FAST TRACK GUIDANCE</span>
                            </div>
                        </div>

                        <div className="floating-hero-badge badge-pos-bottom-left">
                            <div className="editorial-badge-icon editorial-badge-icon-green">
                                <i data-lucide="shield-check"></i>
                            </div>
                            <div className="editorial-badge-text">
                                <span className="editorial-badge-label">ASSURANCE</span>
                                <span className="editorial-badge-val">EXPERT VERIFIED</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="application-form" style={{ padding: "80px 0" }}>
            <div className="container">
                <div style={{ maxWidth: "700px", margin: "0 auto", background: "var(--white)", padding: "40px", borderRadius: "24px", boxShadow: "var(--shadow-luxury)", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <h2 className="display-text mb-16" style={{ fontSize: "2rem" }}>Service Application Form</h2>
                    <p className="body-base mb-32" style={{ color: "var(--slate-600)" }}>Select the service you need and our specialists will contact you immediately.</p>
                    
                    <form id="applyNowForm">
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="applyName" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Full Name</label>
                            <input type="text" id="applyName" required placeholder="Enter full name" style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="applyEmail" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Email Address</label>
                            <input type="email" id="applyEmail" required placeholder="name@example.com" style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="applyPhone" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Phone Number</label>
                            <input type="tel" id="applyPhone" required placeholder="+91 98765 43210" style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: "20px" }}>
                            <label htmlFor="applyService" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Required Service</label>
                            <select id="applyService" required defaultValue="" style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                                <option value="" disabled>Select Service</option>
                                <option value="tourist">Tourist Visa</option>
                                <option value="business">Business Visa</option>
                                <option value="study">Study Visa</option>
                                <option value="work">Work Visa</option>
                                <option value="insurance">Travel Insurance</option>
                                <option value="forex">Forex & Currency Card</option>
                                <option value="tickets">Air Tickets</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: "24px" }}>
                            <label htmlFor="applyNotes" style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>Destination / Travel Details</label>
                            <textarea id="applyNotes" rows={4} placeholder="Mention your target destination, travel dates, or specific requirements..." style={{ width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%" }}>Submit Application Inquiry</button>
                    </form>
                </div>
            </div>
        </section>
    </main>
    );
}
