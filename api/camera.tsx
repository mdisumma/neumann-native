const cameraApi = {
  device: {
    title: "device info",
    type: "power_tool",
    classification: {
      protection_class: "III",
      justification: "Cordless hammer drill; 18 V DC (SELV).",
    },
    identifiers: {
      model: "KT-BH 18 Li",
      article_number: "45738014",
      eh_art_nr: "45.138.85",
      i_nr: "11018",
      batch_number: "EB064518",
      serial_number: null,
    },
    manufacture: {
      manufacturer: "hagebau Handelsgesellschaft für Baustoffe mbH & Co. KG",
      address: "Celler Straße 47, 29614 Soltau, Deutschland",
      country_of_origin: "P.R.C. (01)",
      date: "2019-05-01",
    },
    ratings: {
      voltage: { value: 18, unit: "V", dc: true },
      speed: { min: 0, max: 1200, unit: "min^-1" },
      weight: null,
      ip_rating: null,
    },
  },
  inspection: {
    section: "inspection_result",
    last: { id: "0123", result: "OK", date: "2023-01-01" },
    next_due: "2027-01-01",
  },
  test_plan: [
    {
      section: "visual_inspection",
      items: [
        {
          order: 1,
          type: "yes_no",
          name: "Visual integrity",
          description:
            "Check device condition, safety markings, external components (ÖNORM 5.2).",
        },
        {
          order: 2,
          type: "yes_no",
          name: "Labeling",
          description: "Verify safety labels and technical plates (ÖNORM 5.2).",
        },
      ],
    },
    {
      section: "electrical_safety",
      items: [
        {
          order: 1,
          type: "measurement",
          name: "Class III insulation integrity",
          description: "SELV device insulation check per 5.4.",
          measurement: {
            quantity: "insulation_resistance",
            unit: "MΩ",
            method: "ohmmeter",
            limits: { min: 0.25 },
          },
        },
        {
          order: 2,
          type: "measurement",
          name: "Touch current",
          description: "Contact current per 5.6 (after insulation test).",
          measurement: {
            quantity: "touch_current",
            unit: "mA",
            limits: { max: 0.5 },
          },
        },
        {
          order: 3,
          type: "measurement",
          name: "Substitute leakage",
          description: "Alternative to 5.6 per 5.7.",
          measurement: {
            quantity: "leakage_current",
            unit: "mA",
            limits: { max: 0.5 },
          },
        },
      ],
    },
    {
      section: "functional_test",
      items: [
        {
          order: 1,
          type: "yes_no",
          name: "Operational safety",
          description: "Verify normal operation & safety features (5.8).",
        },
        {
          order: 2,
          type: "yes_no",
          name: "Safety label verification",
          description: "Mandatory markings check (5.9).",
        },
      ],
    },
  ],
};

export default cameraApi;
