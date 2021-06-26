import HeaderLayout from 'layouts/Header'
import 'antd/dist/antd.css'
import 'styles/app.scss'
import 'styles/css/components/button.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <HeaderLayout>
        <Component {...pageProps} />
      </HeaderLayout>
    </>
  )
}

export default MyApp
