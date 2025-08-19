export const staffData = {
  "Personal": [
    {
      slug: "AdrianPetru-Groza",
      name: "Groza Adrian Petru",
      title: "Professor",
      phone: "0744444444",
      email: "adrian.groza@cs.utcluj.ro",
      image: "/people/AdrianGroza.png",
    },
    {
      slug: "AncaNicoleta-Marginean",
      name: "Mărginean Anca Nicoleta",
      title: "Professor",
      phone: "0733333333",
      email: "anca.marginean@cs.utcluj.ro",
      image: "/people/Basic_avatar_image.png",
    }
  ],
  "Students": [
    {
      slug: "Marian-Ion",
      name: "Ion Marian",
      title: "Student",
      phone: "0722222222",
      email: "marian.ion@cs.utcluj.ro",
      image: "/people/Basic_avatar_image.png",
    }
  ],
};

export const allStaff = Object.values(staffData).flat();
