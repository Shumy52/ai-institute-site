export const metadata = {
  title: "ICIA - Events",
};

import EventsClient from "./eventsClient";

import { getEvents, transformEventData } from "@/lib/strapi";

export const revalidate = 600;

export default async function EventsPage() {
  const events = await getEvents();
  const items = transformEventData(events);
  return <EventsClient items={items} />;
}
