import HedaerLayoutCompany from 'layouts/Header'
import 'antd/dist/antd.css'
import 'styles/app.scss'
import 'styles/css/components/button.css'

function MyApp({ Component, pageProps }) {
  return (
    <HedaerLayoutCompany>
      <Component {...pageProps} />
    </HedaerLayoutCompany>
  )
}

export default MyApp
