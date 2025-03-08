import type { AppProps } from 'next/app'
import '../styles/globals.css';
import { RootWrapper } from '@/components/layout/root-wrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RootWrapper defaultOpen={false}>
      <Component {...pageProps} />
    </RootWrapper>
  );
}