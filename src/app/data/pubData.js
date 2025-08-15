export const pubData = [
      {
        title: "The Predictive Capabilities of Artificial Intelligence-Based OCT Analysis for Age-Related Macular Degeneration Progression-A Systematic",
        year: 2023,
        domain: "Unit of Medical Technologies",
        kind: "Review",
        description: "The era of artificial intelligence (AI) has revolutionized our daily lives and AI has become a powerful force that is gradually transforming the field of medicine. Ophthalmology sits at the forefront of this transformation thanks to the effortless acquisition of an abundance of imaging modalities. There has been tremendous work in the field of AI for retinal diseases, with age-related macular degeneration being at the top of the most studied conditions. The purpose of the current systematic review was to identify and evaluate, in terms of strengths and limitations, the articles that apply AI to optical coherence tomography (OCT) images in order to predict the future evolution of age-related macular degeneration (AMD) during its natural history and after treatment in terms of OCT morphological structure and visual function. After a thorough search through seven databases up to 1 January 2022 using the Preferred Reporting Items for Systematic Reviews and Meta-Analyses (PRISMA) guidelines, 1800 records were identified. After screening, 48 articles were selected for full-text retrieval and 19 articles were finally included. From these 19 articles, 4 articles concentrated on predicting the anti-VEGF requirement in neovascular AMD (nAMD), 4 articles focused on predicting anti-VEGF efficacy in nAMD patients, 3 articles predicted the conversion from early or intermediate AMD (iAMD) to nAMD, 1 article predicted the conversion from iAMD to geographic atrophy (GA), 1 article predicted the conversion from iAMD to both nAMD and GA, 3 articles predicted the future growth of GA and 3 articles predicted the future outcome for visual acuity (VA) after anti-VEGF treatment in nAMD patients. Since using AI methods to predict future changes in AMD is only in its initial phase, a systematic review provides the opportunity of setting the context of previous work in this area and can present a starting point for future research.",
        authors: ["AdrianPetru-Groza", "AncaNicoleta-Marginean"]
      },
      {
        title: "The profile: unleashing your deepfake self",
        year: 2023,
        domain: "Unit of Software and Hardware Technologies for AI",
        kind: "Article",
        description: "From the way we perceive society to the way we perceive ourselves, the virtual environment is changing the fundamental mechanisms of living. There is a significant gap in understanding the impact of current AI technologies on society. For instance, deepfake creates realistic forgeries that make people unable to distinguish reality from fiction, while filtering algorithms distort the perception by amplifying the interests of the user. The speed and scale of the virtual world and its hazy moral context put pressure on regulators to build the groundwork of ethical codes and regulatory frameworks. The multifaceted nature of such regulatory frameworks - legal, technological, societal, political, ethical - make it a challenging task, in which the public perception remains a key issue.The study presents a multimedia art installation - 'The Profile'- based on deepfake technologies, in which the users movements are gradually learned and an alter ego is generated. The user becomes confused when this alter ego starts to deviate from its initial mirroring behaviour. 'The Profile' artwork aims to raise awareness of the main threats of current online technologies and dark patterns employed online. The users experience ethical dilemmas regarding the impact of the latest technologies in a metaphoric approach. The interaction is structured in three parts that match the steps of creating an online identity: (i) filling personal data, (ii) agreeing to terms and conditions, and (iii) receiving personalised content. Our work extends the current state-of-the-art by using the decomposition of the frame along with the image simplification, real time rendering and the combination of ethics and art for human-centred technology. We also discuss some of the risks of AI, along with the proposal of art as a way to approach technology ethics. With the 'The Profile', we aim to raise awareness about the power of deepfakes, build new technology, understand human behaviour, and present a fresh perspective on intertwining art and AI.", 
        authors: ["AdrianPetru-Groza"]
      },
      {
        title: "Detecting fake news for the new coronavirus by reasoning on the Covid-19 ontology",
        year: 2020,
        domain: "Unit of Intelligent and Autonomous Systems",
        kind: "Paperwork",
        description: "In the context of the Covid-19 pandemic, many were quick to spread deceptive information. I investigate here how reasoning in Description Logics (DLs) can detect inconsistencies between trusted medical sources and not trusted ones. The not-trusted information comes in natural language (e.g. 'Covid-19 affects only the elderly'). To automatically convert into DLs, I used the FRED converter. Reasoning in Description Logics is then performed with the Racer tool.",
        authors: ["AdrianPetru-Groza"]
      }
];

export const getPublicationsByAuthor = (authorSlug) =>
  pubData.filter(p => p.authors.includes(authorSlug));