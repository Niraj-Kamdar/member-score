import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import theme from '../util/theme'
import GlobalStyles from '../components/ui/GlobalStyles'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="FWB Member Score" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
