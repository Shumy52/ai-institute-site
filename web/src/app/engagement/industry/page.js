export const metadata = { title: "Industry engagement – AIRi @ UTCN" };

import { Suspense } from "react";
import Client from "./Client";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Client />
    </Suspense>
  );
}
