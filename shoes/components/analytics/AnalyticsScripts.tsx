'use client';

import { Suspense, useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const fullUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(fullUrl);
    }
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsScripts() {
  const [config, setConfig] = useState({
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    gtmActive: true,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    metaPixelActive: true,
    clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || '',
    clarityActive: true,
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    gaActive: true,
  });

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          setConfig({
            gtmId: data.settings.gtmId ?? (process.env.NEXT_PUBLIC_GTM_ID || ''),
            gtmActive: data.settings.gtmActive !== undefined ? data.settings.gtmActive : true,
            metaPixelId: data.settings.metaPixelId ?? (process.env.NEXT_PUBLIC_META_PIXEL_ID || ''),
            metaPixelActive: data.settings.metaPixelActive !== undefined ? data.settings.metaPixelActive : true,
            clarityId: data.settings.clarityId ?? (process.env.NEXT_PUBLIC_CLARITY_ID || ''),
            clarityActive: data.settings.clarityActive !== undefined ? data.settings.clarityActive : true,
            gaId: data.settings.gaId ?? (process.env.NEXT_PUBLIC_GA_ID || ''),
            gaActive: data.settings.gaActive !== undefined ? data.settings.gaActive : true,
          });
        }
      })
      .catch(() => {});
  }, []);

  const { gtmId, gtmActive, metaPixelId, metaPixelActive, clarityId, clarityActive, gaId, gaActive } = config;

  return (
    <>
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
      {/* 1. Google Tag Manager (GTM) */}
      {gtmActive && gtmId && gtmId.startsWith('GTM-') && (
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}

      {/* 2. Meta (Facebook) Pixel */}
      {metaPixelActive && metaPixelId && (
        <>
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* 3. Microsoft Clarity */}
      {clarityActive && clarityId && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}

      {/* 4. Google Analytics 4 (Direct GA4 fallback / standalone) */}
      {gaActive && gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
