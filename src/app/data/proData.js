export const proData = [
        {
          title: "Improving remote sensing crop classification by argumentation-based conflict resolution in ensemble learning",
          lead: "Adrian Petru Groza",
          domain: "Unit of Software and Hardware Technologies for AI",
          description: "The acquisition of data through remote sensing has become of great importance in precision agriculture, as it covers large geographical areas faster and cheaper than ground inspections. The challenge is to develop technical solutions that can benefit from both huge amounts of raw data extracted from satellite images, but also from the robust amount of knowledge refined during centuries of agricultural practice. Aiming to accurately classify crops from satellite images, we developed a hybrid intelligent system that can exploit both agricultural expert knowledge and machine learning algorithms. As the crop raw data is characterized by heterogeneity, we drive our attention to ensemble learners, while expert knowledge is encapsulated within a rule-based system. Vote-based methods for solving conflicts between ensemble’s base learners have difficulties in classifying exceptional cases correctly and also to give the …",
          start: { month: 8, year: 2015 },   
          end:   { month: 1, year: 2016 },
          docUrl: "https://d1wqtxts1xzle7.cloudfront.net/110389539/j.eswa.2016.07.03720240113-1-kth05q-libre.pdf?1705153789=&response-content-disposition=inline%3B+filename%3DImproving_remote_sensing_crop_classifica.pdf&Expires=1755075383&Signature=WoinvQQh8YlI4djM8EeyGxUL4LhAlU~3IJVlGcuhJTPzp8s48OkiqPgsrd5xNbzbUIkWfa6K1n~pyq1OEYzzT9Nl3dMD886za79MlOv~3Q~qYeWCxrs6dZTqRvUQheu2Ut-G3-PUIhmpoIzkemEU0asqAu81T7FgJYO4X55YJWbdaGl8ifMHqiwoysFjp0asJn5PLlDnMpt3OuQT0tY-tlzftWaYkFdTQWR3lE7Y-p0a9ayEPKxKFrNMgCL49OzezadDDXcuz62tGybci-51pP7rfiRNJE8vxjBZrkBssGwUOlbNKYifRswxgj8h~rgkGGKyex6mK26fYQhl~DAo8A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA",  
          members: ["AdrianPetru-Groza", "Marian-Ion"]
        },
];

export const getProjectsByMember = (memberSlug) =>
  proData.filter(p => (p.members || []).includes(memberSlug));