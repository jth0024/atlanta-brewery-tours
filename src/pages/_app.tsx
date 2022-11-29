import type { AppProps } from 'next/app'
import React from 'react'
import { App } from '../app'

const AppPage = ({ Component, pageProps }: AppProps) => {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <App>
      <Component {...pageProps} />
    </App>
  )
}
export default AppPage
