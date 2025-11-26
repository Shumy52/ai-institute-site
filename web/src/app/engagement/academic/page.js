export const metadata = {
  title: "Academic engagement – AIRi @ UTCN",
};

import Client from "./Client";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Client />
    </Suspense>
  );
}
