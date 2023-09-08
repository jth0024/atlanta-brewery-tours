export const GoogleTagManagerFallback = () => (
  <noscript
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NKVHDML"
          style="display: none; visibility: hidden;"
          height="0"
          width="0"
        />`,
    }}
  />
)
