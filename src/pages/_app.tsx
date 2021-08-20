import '../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import NextProgress from 'nextjs-progressbar'

import SEO from '../../next-seo.config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo192.png" />
        <link rel="apple-touch-icon" href="/logo512.png" />
        <meta name="theme-color" content="#000e24" />
        <link rel="manifest" href="/manifest.json" />
        <title>News Technology</title>
      </Head>
      <DefaultSeo {...SEO} />
      <NextProgress
        color="#31abf2b2"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
