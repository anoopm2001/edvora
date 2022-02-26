import '../styles/globals.css'
import { AppProps } from 'next/app'
import '@material-tailwind/react/tailwind.css'
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
