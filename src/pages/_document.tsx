import { Head, Html, Main, NextScript } from 'next/document'
import { GoogleTagManagerFallback } from '../app/scripts'

export default function Document() {
  return (
    <Html>
      <Head>
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
