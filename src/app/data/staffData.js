export const staffData = {
  "Scientific Staff": [
    {
      slug: "prenume-nume",
      name: "Prenume Nume",
      title: "Titlu",
      phone: "0744444444",
      email: "Nume.Prenume@ex.com",
      image: "/people/Basic_avatar_image.png",
      publications: [
      {
        title: "Publication Title 1",
        year: 2024,
        domain: "Unit of Software and Hardware Technologies for AI",
        kind: "Article",
        description: "Publication 1 description" 
      },
      {
        title: "Publication Title 2",
        year: 2023,
        domain: "Unit of Robotics and Industrial IoT (I-IoT)",
        kind: "Conference",
        description: "Publication 2 description" 
      }
      ],
      projects: [
        {
          title: "Project Title 1",
          lead: "Prenume Nume",
          domain: "Unit of Robotics and Industrial IoT (I-IoT)",
          description: "Project 1 description",
          start: { month: 3, year: 2024 },   
          end:   { month: 2, year: 2026 }    
        },
        {
          title: "Project Title 2",
          lead: "Prenume Nume",
          domain: "Unit of Intelligent Applications in Cybersecurity and Space",
          description: "Project 2 description",
          start: { month: 6, year: 2024 },   
          end:   { month: 9, year: 2026 }    
        }
      ]
    }
  ],
  "Adjunct Scientists": [],
  "Associated Units' Personal": [],
  "PHD Students": [],
  "Master Students": [],
  "Engineers": [],
  "Administrative Staff": [],
  "IT Staff": [],
  "Content & Communications Staff": [],
  "Maintenance Staff": [],
};

export const allStaff = Object.values(staffData).flat();
