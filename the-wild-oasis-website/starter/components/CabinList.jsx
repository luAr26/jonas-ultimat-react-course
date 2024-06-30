/** @format */

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList() {
  const cabins = await getCabins();

  return (
    <div className='grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14'>
      {cabins.length > 0 &&
        cabins.map((cabin) => <CabinCard cabin={cabin} key={cabin.id} />)}
    </div>
  );
}

export default CabinList;
