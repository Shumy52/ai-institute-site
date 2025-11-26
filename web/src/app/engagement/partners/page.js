export const metadata = { title: "Partners – AIRi @ UTCN" };

import PartnersClient from "./Client";
import CollaboratorsClient from "../../collaborators/CollaboratorsClient";

const partners = [
  { name: "TEST", url: "https://airi.utcluj.ro", blurb: "Artificial Intelligence Research Institute." },
  { name: "ADOBE", url: "https://adobe.com", blurb: "Grant." }
];

export default function PartnersPage() {
  return <PartnersClient partners={partners} CollaboratorsClient={CollaboratorsClient} />;
}
