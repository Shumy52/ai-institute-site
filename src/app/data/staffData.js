export const staffData = {
  "Personal": [
    {
      slug: "prenume-nume",
      name: "Groza Adrian Petru",
      title: "Professor",
      phone: "0744444444",
      email: "adrian.groza@cs.utcluj.ro",
      image: "/people/AdrianGroza.png",
      publications: [
      {
        title: "The Predictive Capabilities of Artificial Intelligence-Based OCT Analysis for Age-Related Macular Degeneration Progression-A Systematic",
        year: 2023,
        domain: "Unit of Medical Technologies",
        kind: "Review",
        description: "The era of artificial intelligence (AI) has revolutionized our daily lives and AI has become a powerful force that is gradually transforming the field of medicine. Ophthalmology sits at the forefront of this transformation thanks to the effortless acquisition of an abundance of imaging modalities. There has been tremendous work in the field of AI for retinal diseases, with age-related macular degeneration being at the top of the most studied conditions. The purpose of the current systematic review was to identify and evaluate, in terms of strengths and limitations, the articles that apply AI to optical coherence tomography (OCT) images in order to predict the future evolution of age-related macular degeneration (AMD) during its natural history and after treatment in terms of OCT morphological structure and visual function. After a thorough search through seven databases up to 1 January 2022 using the Preferred Reporting Items for Systematic Reviews and Meta-Analyses (PRISMA) guidelines, 1800 records were identified. After screening, 48 articles were selected for full-text retrieval and 19 articles were finally included. From these 19 articles, 4 articles concentrated on predicting the anti-VEGF requirement in neovascular AMD (nAMD), 4 articles focused on predicting anti-VEGF efficacy in nAMD patients, 3 articles predicted the conversion from early or intermediate AMD (iAMD) to nAMD, 1 article predicted the conversion from iAMD to geographic atrophy (GA), 1 article predicted the conversion from iAMD to both nAMD and GA, 3 articles predicted the future growth of GA and 3 articles predicted the future outcome for visual acuity (VA) after anti-VEGF treatment in nAMD patients. Since using AI methods to predict future changes in AMD is only in its initial phase, a systematic review provides the opportunity of setting the context of previous work in this area and can present a starting point for future research." 
      },
      {
        title: "The profile: unleashing your deepfake self",
        year: 2023,
        domain: "Unit of Software and Hardware Technologies for AI",
        kind: "Article",
        description: "From the way we perceive society to the way we perceive ourselves, the virtual environment is changing the fundamental mechanisms of living. There is a significant gap in understanding the impact of current AI technologies on society. For instance, deepfake creates realistic forgeries that make people unable to distinguish reality from fiction, while filtering algorithms distort the perception by amplifying the interests of the user. The speed and scale of the virtual world and its hazy moral context put pressure on regulators to build the groundwork of ethical codes and regulatory frameworks. The multifaceted nature of such regulatory frameworks - legal, technological, societal, political, ethical - make it a challenging task, in which the public perception remains a key issue.The study presents a multimedia art installation - 'The Profile'- based on deepfake technologies, in which the users movements are gradually learned and an alter ego is generated. The user becomes confused when this alter ego starts to deviate from its initial mirroring behaviour. 'The Profile' artwork aims to raise awareness of the main threats of current online technologies and dark patterns employed online. The users experience ethical dilemmas regarding the impact of the latest technologies in a metaphoric approach. The interaction is structured in three parts that match the steps of creating an online identity: (i) filling personal data, (ii) agreeing to terms and conditions, and (iii) receiving personalised content. Our work extends the current state-of-the-art by using the decomposition of the frame along with the image simplification, real time rendering and the combination of ethics and art for human-centred technology. We also discuss some of the risks of AI, along with the proposal of art as a way to approach technology ethics. With the 'The Profile', we aim to raise awareness about the power of deepfakes, build new technology, understand human behaviour, and present a fresh perspective on intertwining art and AI." 
      },
      {
        title: "Detecting fake news for the new coronavirus by reasoning on the Covid-19 ontology",
        year: 2020,
        domain: "Unit of Intelligent and Autonomous Systems",
        kind: "Paperwork",
        description: "In the context of the Covid-19 pandemic, many were quick to spread deceptive information. I investigate here how reasoning in Description Logics (DLs) can detect inconsistencies between trusted medical sources and not trusted ones. The not-trusted information comes in natural language (e.g. 'Covid-19 affects only the elderly'). To automatically convert into DLs, I used the FRED converter. Reasoning in Description Logics is then performed with the Racer tool."
      }
      ],
      projects: [
        {
          title: "Improving remote sensing crop classification by argumentation-based conflict resolution in ensemble learning",
          lead: "Adrian Petru Groza",
          domain: "Unit of Software and Hardware Technologies for AI",
          description: "The acquisition of data through remote sensing has become of great importance in precision agriculture, as it covers large geographical areas faster and cheaper than ground inspections. The challenge is to develop technical solutions that can benefit from both huge amounts of raw data extracted from satellite images, but also from the robust amount of knowledge refined during centuries of agricultural practice. Aiming to accurately classify crops from satellite images, we developed a hybrid intelligent system that can exploit both agricultural expert knowledge and machine learning algorithms. As the crop raw data is characterized by heterogeneity, we drive our attention to ensemble learners, while expert knowledge is encapsulated within a rule-based system. Vote-based methods for solving conflicts between ensemble’s base learners have difficulties in classifying exceptional cases correctly and also to give the …",
          start: { month: 8, year: 2015 },   
          end:   { month: 1, year: 2016 },
          docUrl: "https://d1wqtxts1xzle7.cloudfront.net/110389539/j.eswa.2016.07.03720240113-1-kth05q-libre.pdf?1705153789=&response-content-disposition=inline%3B+filename%3DImproving_remote_sensing_crop_classifica.pdf&Expires=1755075383&Signature=WoinvQQh8YlI4djM8EeyGxUL4LhAlU~3IJVlGcuhJTPzp8s48OkiqPgsrd5xNbzbUIkWfa6K1n~pyq1OEYzzT9Nl3dMD886za79MlOv~3Q~qYeWCxrs6dZTqRvUQheu2Ut-G3-PUIhmpoIzkemEU0asqAu81T7FgJYO4X55YJWbdaGl8ifMHqiwoysFjp0asJn5PLlDnMpt3OuQT0tY-tlzftWaYkFdTQWR3lE7Y-p0a9ayEPKxKFrNMgCL49OzezadDDXcuz62tGybci-51pP7rfiRNJE8vxjBZrkBssGwUOlbNKYifRswxgj8h~rgkGGKyex6mK26fYQhl~DAo8A__&Key-Pair-Id=APKAJLOHF5GGSLRBV4ZA"    
        },
      ]
    }
  ],
  "Students": [],
};

export const allStaff = Object.values(staffData).flat();
