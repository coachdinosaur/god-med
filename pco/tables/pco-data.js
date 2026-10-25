/* DENR DAO 2014-02 reference tables. See official PDF linked on each table. */
export const pcoTables = [
  {
    "id": "pco-table1",
    "group": "PCO accreditation",
    "tag": "Table 1",
    "title": "Establishment categorization: Category A vs B",
    "source": "pco",
    "sourcePage": "Section 5, pp. 3–4",
    "coverage": "summary",
    "description": "Comparison from DAO 2014-02 Table 1. One positive Category B indicator may be sufficient; EMB makes the official determination.",
    "columns": [
      "Environmental factor",
      "Category A criteria",
      "Category B criteria"
    ],
    "rows": [
      [
        "Chemicals",
        "Does not use/store/handle chemicals in Annex 1",
        "Uses/stores/handles any Annex 1 chemical regardless of amount"
      ],
      [
        "Hazardous waste",
        "Annex 2 small-quantity generator",
        "Annex 2 large-quantity generator; accredited transporter or treatment/storage/disposal (TSD) facility"
      ],
      [
        "Air emissions",
        "Boilers <50 HP; gensets <300 kW; other sources <10 tons/year potential regulated emission; or not required to undergo stack sampling",
        "Source classified by EMB MC 2007-003 (small/medium/large/environmentally significant), or required stack sampling"
      ],
      [
        "Solid waste",
        "Generates >30 kg/day of aggregate solid waste (as listed for Category A)",
        "Centralized MRF, solid-waste treatment/processing, or sanitary landfill"
      ],
      [
        "Wastewater",
        "<30 m³/day AND no listed Annex 3 effluent parameter",
        "≥30 m³/day; Annex 3 parameter; influent BOD ≥3,000 mg/L; or transporter/treater of wastewater, sewage or septage"
      ],
      [
        "Sludge",
        "Not specified as a Category A classification trigger",
        "Transports or treats sludge"
      ]
    ],
    "note": "This is a plain-language rendering, not a substitute for the signed table. Category A requires evaluation of all other criteria; the air and solid-waste entries particularly require EMB assessment."
  },
  {
    "id": "pco-annex1",
    "group": "PCO accreditation",
    "tag": "Annex 1",
    "title": "Priority Chemical List — all 48 legacy entries",
    "source": "pco",
    "sourcePage": "Annex 1, pp. 10–11",
    "coverage": "full",
    "description": "All 48 entries from the original DAO 2014-02 Annex 1; searchable by chemical name and CAS identifier.",
    "columns": [
      "PCL no.",
      "CAS number (as printed)",
      "Listed chemical / group"
    ],
    "rows": [
      [
        "1",
        "000108-90-7",
        "1,4-CHLOROBENZENE"
      ],
      [
        "2",
        "000106-93-4",
        "1,2-DIBROMOETHANE"
      ],
      [
        "3",
        "000095-50-1",
        "O-DICHLOROBENZENE"
      ],
      [
        "4",
        "000106-46-7",
        "1,4-DICHLOROBENZENE"
      ],
      [
        "5",
        "000107-06-2",
        "1,2 DICHLOROETHANE"
      ],
      [
        "6",
        "000122-66-7",
        "1,2 DIPHENYLHYDRAZINE"
      ],
      [
        "7",
        "000108-46-3",
        "3-HYDROXYPHENOL"
      ],
      [
        "8",
        "007647-18-9",
        "ANTIMONY PENTACHLORIDE"
      ],
      [
        "9",
        "007440-38-2",
        "ARSENIC COMPOUNDS"
      ],
      [
        "10",
        "001332-21-4",
        "ASBESTOS"
      ],
      [
        "11",
        "000071-43-2",
        "BENZENE"
      ],
      [
        "12",
        "007440-41-7",
        "BERYLLIUM COMPOUNDS"
      ],
      [
        "13",
        "007440-43-9",
        "CADMIUM COMPOUNDS"
      ],
      [
        "14",
        "000056-23-5",
        "CARBON TETRACHLORIDE"
      ],
      [
        "15",
        "General name",
        "CHLORINATED ETHERS"
      ],
      [
        "16",
        "General name",
        "CHLOROFLUORO CARBONS"
      ],
      [
        "17",
        "000067-66-3",
        "CHLOROFORM"
      ],
      [
        "18",
        "000076-06-2",
        "CHLOROPICRIN"
      ],
      [
        "19",
        "018540-29-9",
        "CHROMIUM COMPOUNDS"
      ],
      [
        "20",
        "000057-12-5",
        "CYANIDE COMPOUNDS"
      ],
      [
        "21",
        "000064-67-5",
        "DIETHYL SULFATE"
      ],
      [
        "22",
        "000106-93-4",
        "ETHYLENE DIBROMIDE"
      ],
      [
        "23",
        "000075-21-8",
        "ETHYLENE OXIDE"
      ],
      [
        "24",
        "000111-30-8",
        "GLUTARALDEHYDE"
      ],
      [
        "25",
        "000050-00-0",
        "FORMALDEHYDE"
      ],
      [
        "26",
        "009002-83-9",
        "HALONS"
      ],
      [
        "27",
        "000118-74-1",
        "HEXACHLOROBENZENE"
      ],
      [
        "28",
        "000067-72-1",
        "HEXACHLOROETHANE"
      ],
      [
        "29",
        "000302-01-2",
        "HYDRAZINE"
      ],
      [
        "30",
        "007439-92-1",
        "LEAD COMPOUNDS"
      ],
      [
        "31",
        "000149-30-4",
        "MBT"
      ],
      [
        "32",
        "000594-42-3",
        "MERCAPTAN, PERCHLOROMETHYL"
      ],
      [
        "33",
        "007439-97-6",
        "MERCURY COMPOUNDS"
      ],
      [
        "34",
        "000074-87-3",
        "METHYL CHLORIDE"
      ],
      [
        "35",
        "000075-09-2",
        "METHYLENECHLORIDE"
      ],
      [
        "36",
        "002385-85-5",
        "MIREX"
      ],
      [
        "37",
        "000087-86-5",
        "PENTACHLOROPHENOL"
      ],
      [
        "38",
        "000127-18-4",
        "PERCHLOROETHYLENE"
      ],
      [
        "39",
        "000108-95-2",
        "PHENIC ACID"
      ],
      [
        "40",
        "000075-44-5",
        "PHOSGENE"
      ],
      [
        "41",
        "000085-44-9",
        "PTHALIC ANHYDRIDE"
      ],
      [
        "42",
        "059536-65-1",
        "POLYBROMINATED BIPHENYLS"
      ],
      [
        "43",
        "001336-36-3",
        "POLYCHLORINATED BIPHENYLS"
      ],
      [
        "44",
        "000071-55-6",
        "1,1,1-TRICHLOROETHANE"
      ],
      [
        "45",
        "000079-01-6",
        "TRICHLOROETHYLENE"
      ],
      [
        "46",
        "000688-73-3",
        "TRIBUTYLTIN"
      ],
      [
        "47",
        "007782-49-2",
        "SELENIUM"
      ],
      [
        "48",
        "000075-01-4",
        "VINYL CHLORIDE"
      ]
    ],
    "note": "Names, aliases, CAS formatting and repeated entries reflect the legacy printed list. PCL, PICCS and Chemical Control Orders have newer issuances: verify the currently controlled chemicals with EMB before deciding compliance."
  },
  {
    "id": "pco-annex2",
    "group": "PCO accreditation",
    "tag": "Annex 2",
    "title": "Hazardous-waste thresholds used for PCO establishment category",
    "source": "pco",
    "sourcePage": "Annex 2, p. 12",
    "coverage": "grouped",
    "description": "Grouped ranges of the official small/large generator table for DAO 2014-02 Section 5 categorization. Do not confuse with DAO 2013-22's medium-generator category.",
    "columns": [
      "Waste code families",
      "Small generator",
      "Large generator"
    ],
    "rows": [
      [
        "A101 cyanide; L406 PCB; M502 asbestos; M501–M503 medical waste",
        "<10,000 kg/year",
        "≥10,000 kg/year"
      ],
      [
        "D401–D499 inorganic; E501–E599 reactive; F602–F699 paint/ink/resin sludge; G703–G704 solvents; K301–K303 stabilized; L401–L402 other organics; M504–M506 miscellaneous",
        "<20,000 kg/year",
        "≥20,000 kg/year"
      ],
      [
        "B201–B299 acids; C301–C399 alkalis; I101 oil; J201 empty chemical containers",
        "<36,000 kg/year",
        "≥36,000 kg/year"
      ],
      [
        "H802 putrescible wastes",
        "<500,000 kg/year",
        "≥500,000 kg/year"
      ],
      [
        "D407 busted fluorescent lamps",
        "<100 pieces/year and <300 fixtures",
        "≥100 pieces/year or ≥300 fixtures"
      ]
    ],
    "note": "Thresholds reflect the original Annex 2; lamp rows are counted in pieces/fixtures, not kilograms. Verify code updates and any boundary clarifications from EMB."
  },
  {
    "id": "pco-annex3",
    "group": "PCO accreditation",
    "tag": "Annex 3",
    "title": "Eight listed effluent quality parameters",
    "source": "pco",
    "sourcePage": "Annex 3, p. 12",
    "coverage": "full",
    "description": "These eight parameters are referenced in the wastewater branch of DAO 2014-02 Table 1.",
    "columns": [
      "No.",
      "Parameter",
      "Significance"
    ],
    "rows": [
      [
        "1",
        "Arsenic",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "2",
        "Cadmium",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "3",
        "Chromium (hexavalent)",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "4",
        "Cyanide",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "5",
        "Lead",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "6",
        "Mercury (total)",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "7",
        "PCBs",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ],
      [
        "8",
        "Formaldehyde",
        "Annex 3 listed pollutant; assess wastewater and verify applicability with EMB"
      ]
    ],
    "note": "This is not a complete DAO 2016-08 laboratory monitoring list; use applicable discharge permit conditions and receiving-water limits."
  }
];
