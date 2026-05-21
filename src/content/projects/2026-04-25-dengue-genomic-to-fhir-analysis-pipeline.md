---
title: "Dengue Genomic Analysis to FHIR"
excerpt: "Pipeline for pan-serotype Dengue virus genomic analysis (Illumina and Nanopore) with FHIR Genomics clinical reporting."
teaser: "/images/denvtofhir.png"
date: 2026-04-25
tags:
  - Nextflow
  - Dengue virus
  - Viral genomics
  - FHIR
  - Pathogen genomics
---

## Overview

This project develops a platform-agnostic pipeline for pan-serotype Dengue virus whole-genome amplicon data from Illumina and Nanopore to identify serotype, genotype, and mutations. The workflow combines [host removal](https://github.com/bede/hostile), serotyping, consensus sequence generation, and [Nextclade](https://clades.nextstrain.org/)-based classification, then converts the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) for structured clinical and surveillance reporting.


## Workflow

- The pipeline automatically detects whether the input is Illumina or Nanopore, performs trimming and host contamination removal, then routes samples to the corresponding downstream workflow
- Determines Dengue serotype using minimap2 against reference sequences for DENV-1 to DENV-4 and sylvatic strains
- Uses Nextclade to assign genotype and identify amino acid mutations
- Converts serotyping, consensus, and genotype results into HL7 FHIR R4 resources including viral consensus genome observations, genetic variant observations, and a diagnostic report
- Upload FHIR bundle to a FHIR server using OAuth2 authentication for secure sharing

![Diagram Overview of the Dengue Genomic to FHIR Analysis Workflow](/images/dengueworkflow.png)

*Figure 1: DENVtoFHIR workflow.*

## Why This Matters Clinically

Dengue virus has become one of the fastest-growing vector-borne threats globally. An estimated 3.9 billion people are at risk of infection, and reported cases increased more than eightfold to over 4 million in 2019. By mid-2023, the Americas alone had documented nearly 3 million cases. The pace of geographic expansion and seasonal intensification means that delays in serotype identification and outbreak characterization translate directly into missed opportunities for intervention ([Vogels et al. 2024](https://link.springer.com/article/10.1186/s12864-024-10350-x)).

**Most clinical diagnostics do not identify serotype.** Rapid antigen and PCR-based diagnostics confirm dengue infection but cannot distinguish between DENV-1 through DENV-4. Serotype identity determines secondary infection risk, drives immune heterogeneity across populations. Without serotype resolution, clinicians managing a patient with a prior dengue history cannot reliably assess enhanced disease risk, and surveillance systems cannot distinguish serotype replacement from co-circulation.

**Genotype matters beyond serotype.** Despite the global burden, GenBank contains fewer than 13,000 near-complete dengue genomes, reflecting an underinvestment in dengue genomic surveillance. Yet WGS provides the resolution needed for phylogenetic analyses and lineage tracking. Identifying whether a local DENV outbreak belongs to genotype III or the Asian-American genotype, or tracking a lineage that has displaced others over successive seasons, requires full-genome data.

**Viral outbreak response has no room for slow turnaround.** Unlike bacterial pathogens that may sustain transmission chains for months, dengue outbreaks are driven by rapid vector amplification cycles and short windows. As highlighted in the context of viral WGS surveillance, even a 14-day turnaround can compromise the effectiveness of interventions ([Sundermann et al. 2024](https://doi.org/10.1128/aac.01479-24)). A pipeline that automates the full path from raw reads to interoperable health report compresses the time between sequencing and actionable output.

**FHIR interoperability connects genomic findings to health systems.** Converting serotype, genotype, and variant observations into HL7 FHIR Genomics resources makes dengue classification findings machine-readable by surveillance registries, hospital information systems, and public health stakeholders. An assessment of FHIR Genomics found that 87% of semantic objects in a clinical genomic report could be fully or near-fully encoded, confirming the framework's suitability for viral classification outputs. A FHIR-encoded DENV finding can be shared across institutions and ingested by national surveillance platforms in a single standardized format, supporting both individual clinical decisions and population-level response.

```json
{
  "conclusion": "Dengue virus serotype DENV-2 detected. Genotype: Genotype III. Lineage: Lineage C / Sub-lineage 2. Confidence: HIGH",
  "conclusionCode": [
    {
      "text": "Serotype DENV-2"
    },
    {
      "text": "Genotype Genotype III"
    },
    {
      "text": "Major Lineage Lineage C"
    },
    {
      "text": "Minor Lineage Sub-lineage 2"
    },
    {
      "text": "Confidence: high"
    }
  ]
}
```

## Links

- GitHub repository: [DENV-to-fhir-full](https://github.com/oucru-id/DENV-to-fhir-full)
- Technical documentation: [denv-pipeline-docs](https://denv-pipeline-docs.readthedocs.io/en/latest/)
