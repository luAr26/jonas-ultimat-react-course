/** @format */

import { Suspense } from "react";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  const { cabinId } = params;

  const cabin = await getCabin(cabinId);

  const { name } = cabin;

  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map(({ id }) => ({
    cabinId: String(id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const { cabinId } = params;
  const cabin = await getCabin(cabinId);

  // const [cabin, settings, bookedDates] = await Promise.all([
  //   getCabin(cabinId),
  //   getSettings(),
  //   getBookedDatesByCabinId(cabinId),
  // ]);

  const { name } = cabin;

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <h2 className='mb-10 text-5xl font-semibold text-center text-accent-400'>
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
