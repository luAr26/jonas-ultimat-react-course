/** @format */

import "@/styles/globals.css";
import Header from "@/components/Header";

import { Josefin_Sans } from "next/font/google";
import Head from "next/head";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Wild Oasis</title>
        <link rel='icon' href='logo.png' />
      </Head>
      <div
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className='grid flex-1 px-8 py-12'>
          <main className='w-full mx-auto max-w-7xl'>
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </>
  );
  // return <Component {...pageProps} />;
}
