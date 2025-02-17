export default function News() {
  const mediaLinks = [
    {
      title: "Major Announcements",
      items: [
        { text: "Project Launch", url: "https://www.vasiletopa.ro/proiecte/demararea-lucrarilor-de-proiectare-si-executie-pentru-institutul-de-inteligenta-artificiala" },
        { text: "Official Start of the Institute", url: "https://www.linkedin.com/posts/universitatea-tehnica-din-cluj-napoca_weareutcn-artificialintelligenceresearchinstitute-activity-7201526374799405056-Oa_o" },
        { text: "ICIA Inauguration", url: "https://www.linkedin.com/posts/universitatea-tehnica-din-cluj-napoca_universitatea-tehnic%C4%83-din-cluj-napoca-anun%C8%9B%C4%83-activity-7199829141624373248-GB44" }
      ]
    },
    {
      title: "Construction Updates",
      items: [
        { text: "Drone Footage & Progress Reports", url: "https://www.soletanche-bachy.com/roumanie-le-premier-institut-dedie-a-la-recherche-sur-lintelligence-artificielle-est-en-construction/" },
        { text: "ICIA Construction Update 1", url: "https://www.linkedin.com/posts/sdc-proiect_structuralengineering-engineering-piles-activity-7241440282435604480-Yljm" },
        { text: "ICIA Construction Update 2", url: "https://www.linkedin.com/posts/sdc-proiect_structuralengineering-engineering-piles-activity-7213830649479065600-eI-e" },
        { text: "Latest Site Photos (January 17, 2025)", url: "https://zcj.ro/economie/cum-arata-santierul-institutului-de-cercetare-in-inteligenta-artificiala-din-cluj-napoca-e-primul-din-romania--274626.html" }
      ]
    },
    {
      title: "Event Videos & Visits",
      items: [
        { text: "Groundbreaking Ceremony Video", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-stonelayingceremony-project-activity-7206606723040608256-_n4_" },
        { text: "Best Construction Progress Video", url: "https://www.linkedin.com/posts/kesz-romania_the-construction-work-of-the-artificial-intelligence-activity-7211671006652841984-8bA2" },
        { text: "Prime Minister Marcel Ciolacu’s Visit", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-project-artificialintelligenceresearchinstitute-activity-7244698737023799296-m2ZK" },
        { text: "Ligia Deca’s Visit", url: "https://www.linkedin.com/feed/update/urn:li:activity:7249391606162706433" }
      ]
    },
    {
      title: "Architectural & Development Contributions",
      items: [
        { text: "Architectural Design by Arhimar", url: "https://www.linkedin.com/posts/arhimar_arhimar-airesearch-clujnapoca-activity-7257280386357993474-R5_P" },
        { text: "Scientific Director of Research, Puskas Attila", url: "https://www.linkedin.com/posts/kesz-romania_kaezszromania-stonelayingceremony-project-activity-7199756314938392582-cM7B" }
      ]
    }
  ];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📢 News Page - ICIA Updates</h1>
      {mediaLinks.map((section, index) => (
        <section key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
          <ul className="list-disc list-inside">
            {section.items.map((item, idx) => (
              <li key={idx}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}

export const metadata = {
  title: "ICIA - News",
};