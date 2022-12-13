import Script from 'next/script'

export const GoogleTagManager = () => (
  <>
    <Script id="google-tag-manager" strategy="afterInteractive" key="script">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NKVHDML');
      `}
    </Script>
    <noscript key="noscript">
      <iframe
        height="0"
        width="0"
        title="Google Tag Manager noscript iframe"
        style={{ display: 'none', visibility: 'hidden' }}
        src="https://www.googletagmanager.com/ns.html?id=GTM-NKVHDML"
      />
    </noscript>
  </>
)
