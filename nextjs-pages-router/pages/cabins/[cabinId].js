/** @format */

import { useRouter } from "next/router";

function Cabin() {
  const router = useRouter();
  return <>Cabin #{router.query.cabinId}</>;
}

export default Cabin;
