import HeaderLayout from 'layouts/Header'
import 'antd/dist/antd.css'
import 'styles/app.scss'
import 'styles/css/components/button.css'

function MyApp({ Component, pageProps }) {
  return (
    <HeaderLayout>
      <Component {...pageProps} />
    </HeaderLayout>
  )
}

export default MyApp
