import '../globals.css'; 
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  );
}
