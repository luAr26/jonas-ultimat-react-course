/** @format */

import CabinList from "@/components/CabinList";
import { getCabins } from "@/lib/data-service";
import Head from "next/head";

// Static generation (SSG)
export async function getStaticProps() {
  const cabins = await getCabins();
  return {
    props: {
      title: "Cabins | The Wild Oasis",
      cabins,
      revalidate: 3600, // 1 hour - ISR
    },
  };
}

function Cabins({ title, cabins }) {
  console.log(cabins);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <h1 className='mb-5 text-4xl font-medium text-accent-400'>
          Our Luxury Cabins
        </h1>
        <p className='mb-10 text-lg text-primary-200'>
          Cozy yet luxurious cabins, located right in the heart of the Italian
          Dolomites. Imagine waking up to beautiful mountain views, spending
          your days exploring the dark forests around, or just relaxing in your
          private hot tub under the stars. Enjoy nature&apos;s beauty in your
          own little home away from home. The perfect spot for a peaceful, calm
          vacation. Welcome to paradise.
        </p>
        <CabinList cabins={cabins} />
      </div>
    </>
  );
}

export default Cabins;