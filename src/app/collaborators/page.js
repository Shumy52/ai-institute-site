"use client";
import dynamic from "next/dynamic";

// Dynamically import the map component with SSR disabled
const CollaboratorsMap = dynamic(() => import("./MapComponent.js"), {
  ssr: false, // This prevents the component from being rendered on the server
  loading: () => <div>Loading map...</div>,
});

export default function Page() {
  return <CollaboratorsMap />;
}