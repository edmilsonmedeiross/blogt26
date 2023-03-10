import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import '../styles/globals.sass'

export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}