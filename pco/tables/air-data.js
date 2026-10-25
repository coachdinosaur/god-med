/* DENR DAO 2000-81 Clean Air Act ambient-quality table. */
export const airTables = [
  {
    "id": "air-table1",
    "group": "Clean Air Act",
    "tag": "Table 1",
    "title": "National Ambient Air Quality Guideline Values",
    "source": "air",
    "sourcePage": "DAO 2000-81, Rule VII, Section 1, Table 1",
    "coverage": "selected",
    "description": "Selected ambient-air guideline limits with pollutant-specific units and averaging times.",
    "columns": [
      "Pollutant",
      "Short-term value",
      "Short-term averaging",
      "Long-term value",
      "Long-term averaging"
    ],
    "rows": [
      [
        "Total suspended particulates (TSP)",
        "230 µg/Nm³",
        "24 hours",
        "90 µg/Nm³",
        "1 year"
      ],
      [
        "Particulate matter (PM₁₀)",
        "150 µg/Nm³",
        "24 hours",
        "60 µg/Nm³",
        "1 year"
      ],
      [
        "Sulfur dioxide (SO₂)",
        "180 µg/Nm³",
        "24 hours",
        "80 µg/Nm³",
        "1 year"
      ],
      [
        "Nitrogen dioxide (NO₂)",
        "150 µg/Nm³",
        "24 hours",
        "—",
        "—"
      ],
      [
        "Ozone (photochemical oxidants)",
        "140 µg/Nm³; 60 µg/Nm³",
        "1 hour; 8 hours",
        "—",
        "—"
      ],
      [
        "Carbon monoxide (CO)",
        "35 mg/Nm³; 10 mg/Nm³",
        "1 hour; 8 hours",
        "—",
        "—"
      ],
      [
        "Lead",
        "1.5 µg/Nm³",
        "3 months",
        "1.0 µg/Nm³",
        "1 year"
      ]
    ],
    "note": "Ambient monitoring guidelines are NOT stack emission limits. Units include mg/Nm³ for CO, unlike most other rows. Later environmental standards and station-specific requirements may apply."
  }
];
