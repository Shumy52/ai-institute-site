import { Suspense } from "react";

export const metadata = {
  title: "Academic engagement – AIRi @ UTCN",
  description: "Structură cu tab-uri pentru colaborări academice.",
};

import Client from "./Client";

// useSearchParams(), that is in the Client page is a hook
// That doesn't know for certain if it will have data ready at page load
// You MUST encapsulate it in "Suspense", so it gives it time to load
export default function AcademicPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  );
}
