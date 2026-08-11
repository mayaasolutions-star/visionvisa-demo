import Script from 'next/script';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ClientInit from '../components/ClientInit';

export const metadata = {
  title: 'Vision Visa | Trusted Visa Consultants for International Travel',
  description: 'Apply for tourist, business, study, and work visas with Vision Visa. Get expert visa guidance, document verification, travel insurance, forex, and air ticket assistance.',
  keywords: 'Visa Consultant, Tourist Visa, Business Visa, Study Visa, Work Visa, Travel Insurance, Forex Services, Air Tickets, Visa Assistance, Visa Processing, International Travel',
  metadataBase: new URL('https://www.visionvisa.in'),
  alternates: {
    canonical: 'https://www.visionvisa.in/',
  },
  icons: {
    icon: '/images/vision-visa-logo-symbol.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/css/reset.css" />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/components.css" />
        <link rel="stylesheet" href="/css/animations.css" />
        <link rel="stylesheet" href="/css/editorial-hero.css" />
        <Script src="https://unpkg.com/lucide@latest" strategy="beforeInteractive" />
        <Script src="/js/countries-data.js" strategy="beforeInteractive" />
      </head>
      <body suppressHydrationWarning>
        <script
  dangerouslySetInnerHTML={{
    __html: `
      (function () {
        const base = '/visionvisa-demo';

        function fixLinks() {
          document.querySelectorAll('a[href], img[src]').forEach(function (el) {
            const attr = el.hasAttribute('href') ? 'href' : 'src';
            const value = el.getAttribute(attr);

            if (
              value &&
              value.startsWith('/') &&
              !value.startsWith('//') &&
              !value.startsWith(base + '/')
            ) {
              el.setAttribute(attr, base + value);
            }
          });
        }

        fixLinks();

        document.addEventListener('click', function () {
          setTimeout(fixLinks, 0);
        });

        new MutationObserver(fixLinks).observe(document.body, {
          childList: true,
          subtree: true
        });
      })();
    `,
  }}
/>
        <Navbar />
        {children}
        <Footer />
        <ClientInit />

        <Script src="/js/search-engine.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
        <Script src="/js/country-render.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
