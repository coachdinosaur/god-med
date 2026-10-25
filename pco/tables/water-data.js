/* DENR DAO 2016-08 Water Quality and Effluent Standards reference tables. */
export const waterTables = [
  {
    "id": "water-table1",
    "group": "Clean Water Act",
    "tag": "Table 1",
    "title": "Freshwater quality classes by beneficial use",
    "source": "water",
    "sourcePage": "DAO 2016-08, Table 1",
    "coverage": "summary",
    "description": "A quick reference for the use classifications of fresh surface waters.",
    "columns": [
      "Class",
      "Primary intended uses"
    ],
    "rows": [
      [
        "AA",
        "Public water supply with disinfection only"
      ],
      [
        "A",
        "Public water supply requiring conventional treatment"
      ],
      [
        "B",
        "Primary contact recreation, including bathing and swimming"
      ],
      [
        "C",
        "Fisheries; secondary-contact recreation; agriculture, irrigation and livestock watering"
      ],
      [
        "D",
        "Navigation"
      ]
    ],
    "note": "Study summary, not a designation of any particular river or stream. EMB determines the receiving-water classification."
  },
  {
    "id": "water-table2",
    "group": "Clean Water Act",
    "tag": "Table 2",
    "title": "Coastal and marine water quality classes",
    "source": "water",
    "sourcePage": "DAO 2016-08, Table 2",
    "coverage": "summary",
    "description": "Common uses protected by marine water classifications SA to SD.",
    "columns": [
      "Class",
      "Primary intended uses"
    ],
    "rows": [
      [
        "SA",
        "Protected waters and shellfish that can be consumed directly"
      ],
      [
        "SB",
        "Commercial shellfish, milkfish spawning, tourism and primary-contact recreation"
      ],
      [
        "SC",
        "Fish propagation; fishing; secondary-contact recreation; mangrove sanctuaries"
      ],
      [
        "SD",
        "Navigation"
      ]
    ],
    "note": "Condensed description. The officially designated receiving-water class and discharge permit determine applicable standards."
  },
  {
    "id": "water-table8",
    "group": "Clean Water Act",
    "tag": "Table 8",
    "title": "Selected industry-specific effluent monitoring parameters",
    "source": "water",
    "sourcePage": "DAO 2016-08, Table 8 (selected sectors)",
    "coverage": "selected",
    "description": "Selected Table 8 rows for frequently encountered establishments, rather than a complete industry-sector registry.",
    "columns": [
      "PSIC code",
      "Industry category",
      "Significant parameters"
    ],
    "rows": [
      [
        "014",
        "Animal production",
        "BOD; TSS; total coliform (Classes B/SB); ammonia; phosphate"
      ],
      [
        "032",
        "Aquaculture, excluding fish pens",
        "BOD; TSS; ammonia; nitrate; phosphate; sulfate"
      ],
      [
        "55",
        "Hotels, resorts and other accommodation",
        "BOD; fecal coliform; ammonia; nitrate; phosphate; oil and grease; surfactants"
      ],
      [
        "86, 87",
        "Hospitals, clinics, nursing homes",
        "Color; temperature; pH; BOD; TSS; fecal coliform; ammonia; nitrate; phosphate; oil and grease; surfactants"
      ],
      [
        "452, 454",
        "Vehicle maintenance and repair",
        "Color; pH; TSS; ammonia; nitrate; nickel; cadmium; mercury; lead; oil and grease; benzo(a)pyrene; surfactants"
      ],
      [
        "47300, 4661",
        "Wholesale and retail automotive fuels",
        "TSS; oil and grease; benzene; toluene; ethylbenzene; xylenes; benzo(a)pyrene"
      ]
    ],
    "note": "Table 8 has many additional industries and qualifications. EMB may determine parameters for unlisted sectors. Confirm the full table and the establishment's discharge permit."
  },
  {
    "id": "water-table9",
    "group": "Clean Water Act",
    "tag": "Table 9",
    "title": "Selected General Effluent Standards by receiving-water class",
    "source": "water",
    "sourcePage": "DAO 2016-08, Table 9 (selected rows)",
    "coverage": "selected",
    "description": "Key effluent parameter values by receiving-water class, excluding other constituents and rules. Values are mg/L unless separately labeled.",
    "columns": [
      "Parameter / unit",
      "AA",
      "A",
      "B",
      "C",
      "D",
      "SA",
      "SB",
      "SC",
      "SD"
    ],
    "rows": [
      [
        "BOD (mg/L)",
        "NDA",
        "20",
        "30",
        "50",
        "120",
        "NDA",
        "30",
        "100",
        "150"
      ],
      [
        "COD (mg/L)",
        "NDA",
        "60",
        "60",
        "100",
        "200",
        "NDA",
        "60",
        "200",
        "300"
      ],
      [
        "Total suspended solids (mg/L)",
        "NDA",
        "70",
        "85",
        "100",
        "150",
        "NDA",
        "70",
        "100",
        "150"
      ],
      [
        "pH (range)",
        "NDA",
        "6.0–9.0",
        "6.0–9.0",
        "6.0–9.5",
        "5.5–9.5",
        "NDA",
        "6.5–9.0",
        "6.0–9.0",
        "5.5–9.5"
      ],
      [
        "Color (TCU)",
        "NDA",
        "100",
        "100",
        "150",
        "300",
        "NDA",
        "100",
        "150",
        "300"
      ],
      [
        "Surfactants/MBAS (mg/L)",
        "NDA",
        "2",
        "3",
        "15",
        "30",
        "NDA",
        "3",
        "15",
        "30"
      ],
      [
        "Ammonia NH₃-N (mg/L)",
        "NDA",
        "0.5",
        "0.5",
        "0.5",
        "7.5",
        "NDA",
        "0.5",
        "0.5",
        "7.5"
      ],
      [
        "Phosphate (mg/L)",
        "NDA",
        "1",
        "1",
        "1",
        "10",
        "NDA",
        "1",
        "1",
        "10"
      ],
      [
        "Free cyanide (mg/L)",
        "NDA",
        "0.14",
        "0.14",
        "0.2",
        "0.4",
        "NDA",
        "0.04",
        "0.2",
        "0.4"
      ],
      [
        "Temperature change (°C)",
        "NDA",
        "3",
        "3",
        "3",
        "3",
        "NDA",
        "3",
        "3",
        "3"
      ]
    ],
    "note": "NDA = No Discharge Allowed. SELECTED parameters only. Check all parameters, applicable amendments and site-specific permit conditions. Do not use a single row to declare compliance."
  },
  {
    "id": "water-table10",
    "group": "Clean Water Act",
    "tag": "Table 10",
    "title": "Strong-wastewater effluent BOD limits",
    "source": "water",
    "sourcePage": "DAO 2016-08, Section 7.3 / Table 10",
    "coverage": "full",
    "description": "BOD limits for qualifying wastewater with influent BOD ≥3,000 mg/L discharged into Class C, D, SC or SD waters.",
    "columns": [
      "Influent BOD (mg/L)",
      "C effluent BOD",
      "D effluent BOD",
      "SC effluent BOD",
      "SD effluent BOD"
    ],
    "rows": [
      [
        "3,000 to <6,500",
        "100",
        "150",
        "100",
        "150"
      ],
      [
        "6,500 to <10,000",
        "200",
        "300",
        "200",
        "300"
      ],
      [
        "10,000–30,000",
        "600",
        "1,000",
        "600",
        "1,000"
      ],
      [
        ">30,000",
        "900",
        "1,500",
        "900",
        "1,500"
      ]
    ],
    "note": "Effluent values are mg/L. Table 10 applies to BOD only; other parameters remain governed by Table 9 and any permit requirements. Check later amendments and site-specific requirements."
  }
];
