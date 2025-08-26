export const metadata = { title: "Partners – AIRi @ UTCN" };

import PartnersClient from "./Client";
import CollaboratorsClient from "../../collaborators/CollaboratorsClient";

const partners = [
  { name: "CLAIRE", url: "https://claire-ai.org", blurb: "Confederation of Laboratories for AI Research in Europe." },
  { name: "ELLIS", url: "https://ellis.eu", blurb: "European Laboratory for Learning and Intelligent Systems." },
  { name: "AI-on-Demand (AIoD)", url: "https://www.aiod.eu", blurb: "European platform for AI resources." },
  { name: "euRobotics", url: "https://www.eu-robotics.net", blurb: "European network for robotics." },
  { name: "ADRA", url: "https://adr-association.eu", blurb: "AI, Data and Robotics Association." },
  { name: "AI4Europe", url: "https://www.ai4europe.eu", blurb: "European AI ecosystem." },
  { name: "BDVA", url: "https://bdva.eu", blurb: "Big Data Value Association." }
];

export default function PartnersPage() {
  return <PartnersClient partners={partners} CollaboratorsClient={CollaboratorsClient} />;
}
