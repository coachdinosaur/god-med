/* DENR DAO 2013-22 reference tables. Full manual linked in source catalog. */
export const hazardTables = [
  {
    "id": "haz-table21",
    "group": "Hazardous waste",
    "tag": "Table 2.1",
    "title": "Hazardous-waste classes A–M",
    "source": "haz",
    "sourcePage": "Chapter 2, Table 2.1",
    "coverage": "summary",
    "description": "An index of the 13 classes described in DAO 2013-22. Detailed codes and constituent limits remain in the original table.",
    "columns": [
      "Class",
      "Waste family",
      "Selected examples"
    ],
    "rows": [
      [
        "A",
        "Cyanide wastes",
        "Wastes containing cyanide"
      ],
      [
        "B",
        "Acid wastes",
        "Corrosive acid wastes"
      ],
      [
        "C",
        "Alkali wastes",
        "Corrosive alkaline wastes"
      ],
      [
        "D",
        "Wastes containing inorganic chemicals",
        "Heavy-metal compounds and other inorganic constituents"
      ],
      [
        "E",
        "Reactive chemical wastes",
        "Chemically reactive waste materials"
      ],
      [
        "F",
        "Ink, dye, pigment, paint, resin, latex, adhesive waste/sludges",
        "Production and processing waste"
      ],
      [
        "G",
        "Organic solvent wastes",
        "Waste organic solvents"
      ],
      [
        "H",
        "Other organic wastes",
        "Includes grease wastes (H802)"
      ],
      [
        "I",
        "Waste/used oils",
        "Contaminated or used oil"
      ],
      [
        "J",
        "Empty chemical containers",
        "Containers that held hazardous chemicals"
      ],
      [
        "K",
        "Immobilized wastes",
        "Stabilized or solidified wastes"
      ],
      [
        "L",
        "Organic chemical wastes",
        "Specified chemicals including PCB and ozone-depleting materials"
      ],
      [
        "M",
        "Miscellaneous wastes",
        "Infectious, asbestos, pharmaceutical and related wastes"
      ]
    ],
    "note": "This is a CLASS-LEVEL SUMMARY, not the exhaustive hazardous waste code inventory. Codes, threshold concentrations, exemptions and relevant EMB circulars govern coding."
  },
  {
    "id": "haz-table22",
    "group": "Hazardous waste",
    "tag": "Table 2.2",
    "title": "Exempted wastes under the hazardous-waste procedural manual",
    "source": "haz",
    "sourcePage": "Chapter 2, Table 2.2",
    "coverage": "full",
    "description": "The six waste categories set out as exemptions from this specific hazardous-waste procedural manual.",
    "columns": [
      "No.",
      "Exempted waste (with conditions)"
    ],
    "rows": [
      [
        "1",
        "Household garbage regulated under RA 9003, except special wastes"
      ],
      [
        "2",
        "Industrial/commercial wastewater disposed of on-site through the sewerage system"
      ],
      [
        "3",
        "Industrial/commercial solid waste without hazardous contents listed in Table 2.1"
      ],
      [
        "4",
        "Materials from building demolition, except materials with asbestos"
      ],
      [
        "5",
        "Septic-tank effluents and associated sullage wastewater"
      ],
      [
        "6",
        "Untreated spoils from mining, quarrying and excavation, excluding tailings, commercially treated materials and specified mine consumables"
      ]
    ],
    "note": "Exemption from DAO 2013-22's hazardous-waste manual does not mean exemption from other environmental laws, sector-specific regulations or operating permits."
  },
  {
    "id": "haz-table31",
    "group": "Hazardous waste",
    "tag": "Table 3.1",
    "title": "Generator size: examples from the 2013 quantity-band table",
    "source": "haz",
    "sourcePage": "Chapter 3, Table 3.1",
    "coverage": "selected",
    "description": "Unlike the two-column small/large categories in DAO 2014-02 Annex 2, this older table has small, medium and large waste-generator categories.",
    "columns": [
      "Waste type (examples)",
      "Small generator",
      "Medium generator",
      "Large generator"
    ],
    "rows": [
      [
        "Cyanide, ozone-depleting substances, PCB and asbestos wastes",
        "<5,000 kg/year",
        "5,000–10,000 kg/year",
        ">10,000 kg/year"
      ],
      [
        "Acid wastes B201–B299; alkali wastes C301–C399",
        "<18,000 kg/year",
        "18,000–36,000 kg/year",
        ">36,000 kg/year"
      ],
      [
        "H802 grease wastes",
        "<250,000 kg/year",
        "250,000–500,000 kg/year",
        ">500,000 kg/year"
      ],
      [
        "Busted lamps (M507 in the 2013 table)",
        "<50 lamps/year",
        "50–100 lamps/year",
        "≥100 lamps/year"
      ]
    ],
    "note": "SELECTED rows and historical table ranges. The original 2013 table has more waste-specific bands and notes, including treating generators of two waste types as large. Boundary conventions differ from DAO 2014-02 Annex 2; consult the actual table before registering or classifying a generator."
  }
];
