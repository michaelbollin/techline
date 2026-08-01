import Script from "next/script";

import { SITE_GA_MEASUREMENT_ID } from "@/lib/site";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${SITE_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${SITE_GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
