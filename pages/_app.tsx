
import '@/styles/globals.css'
import axios from 'axios'
import type { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react";
export default function App({ Component, pageProps }: AppProps) {
  return <NextUIProvider>
    <Component {...pageProps} />
  </NextUIProvider>
}
