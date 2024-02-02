import '@/styles/globals.scss'
import type { AppProps } from 'next/app';
import Head from "next/head";
// Components
import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>Technical test Grandiweb</title>
          <meta name="Test tecnico para grandiweb" content="Angelo Gaona Front End Developer" />
          <link rel="icon" href="/logo.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp;