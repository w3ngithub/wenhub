import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { wrapper } from 'redux/store'
import HeaderLayout from 'layouts/Header'
import Card from 'components/layouts/Card'
import 'antd/dist/antd.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'styles/app.scss'
import 'styles/css/components/button.css'
import 'styles/public.css'


function MyApp({ Component, pageProps }) {
  const [history, setHistory] = useState([])
  const { noHeader, noCard, isLogin } = pageProps
  const { asPath } = useRouter()

  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory([...history, asPath])
    }
  }, [asPath])

  let WrapperComponent = null
  if (isLogin || (noCard && noHeader)) {
    WrapperComponent = <Component {...pageProps} history={history} />
  } else if (noHeader) {
    WrapperComponent = (
      <Card>
        <Component {...pageProps} history={history} />
      </Card>
    )
  } else if (noCard) {
    WrapperComponent = (
      <HeaderLayout>
        <Component {...pageProps} history={history} />
      </HeaderLayout>
    )
  } else {
    WrapperComponent = (
      <HeaderLayout>
        <Card>
          <Component {...pageProps} history={history} />
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
