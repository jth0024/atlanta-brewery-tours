import type { AppProps } from 'next/app'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import { API_URL, App } from '../app'

const AppPage = ({ Component, pageProps }: AppProps) => (
  // 2. Wrap ChakraProvider at the root of your app
  <App>
    <Component {...pageProps} />
  </App>
)

export default withUrqlClient(() => ({ url: API_URL }))(AppPage)
