import { Head, Html, Main, NextScript } from 'next/document'
import { GoogleTagManagerFallback } from '../app/scripts'

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <meta
          name="google-site-verification"
          content="uddUzvp9WaNXfsQINsDC2Guab4k0ocFO169wf5uD2-4"
        />
        <link rel="shortcut icon" href="/images/logo-favicon-500-x-500.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <GoogleTagManagerFallback />
      </body>
    </Html>
  )
}
