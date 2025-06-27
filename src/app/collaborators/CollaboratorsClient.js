"use client";

import dynamic from "next/dynamic";

// This line uses Next.js's dynamic import to load the MapComponent only on the client side (ssr: false).
// While the component is loading, it displays a fallback <div>Loading map...</div>.
// This helps reduce the initial bundle size and avoids server-side rendering issues with browser-specific APIs.
const CollaboratorsMap = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});

export default function CollaboratorsClient() {
  return <CollaboratorsMap />;
}