import Head from 'next/head'
import { wrapper } from 'redux/store'
import HeaderLayout from 'layouts/Header'
import Card from 'components/layouts/Card'
import 'antd/dist/antd.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'styles/app.scss'
import 'styles/css/components/button.css'

function MyApp({ Component, pageProps }) {
  const { noHeader, noCard, isLogin } = pageProps

  let WrapperComponent = null
  if (isLogin || (noCard && noHeader)) {
    WrapperComponent = <Component {...pageProps} />
  } else if (noHeader) {
    WrapperComponent = (
      <Card>
        <Component {...pageProps} />
      </Card>
    )
  } else {
    WrapperComponent = (
      <HeaderLayout>
        <Card>
          <Component {...pageProps} />
        </Card>
      </HeaderLayout>
    )
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      {WrapperComponent}
    </>
  )
}

export default wrapper.withRedux(MyApp)
