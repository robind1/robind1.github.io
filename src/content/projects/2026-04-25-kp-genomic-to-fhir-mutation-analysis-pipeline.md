---
title: " KP Genomic Analysis to FHIR "
excerpt: "Pipeline for Klebsiella pneumoniae genomic analysis (Illumina, Nanopore) with FHIR Genomics clinical reporting."
teaser: "/images/KPtoFHIR.png"
date: 2026-04-25
tags:
  - Nextflow
  - Klebsiella pneumoniae
  - Drug resistance
  - FHIR
  - Pathogen genomics
---

## Overview

This project develops a platform-agnostic pipeline for Klebsiella pneumoniae genomic data from Illumina and Nanopore sequencing to identify antimicrobial resistance and strain characteristics. The workflow integrates resistance gene detection, MLST, capsule typing, O-antigen, virulence scoring, and cgMLST analysis, then converts the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) for structured clinical reporting.

## Workflow

- The pipeline automatically detects whether the input is Illumina or Nanopore and routes samples to the correct sub-workflow
- Performs read trimming, quality control, de novo assembly, and polishing using platform-specific tools
- Uses [Kleborate](https://kleborate.readthedocs.io/en/latest/) based typing analysis to detect AMR genes, MLST sequence type, capsule type, O-antigen, virulence factors, and virulence score
- Runs [cgMLST](https://www.cgmlst.org/ncs/schema/Kpneumoniae_complex/) analysis to characterize strain relatedness and summarize allele calling statistics
- Converts genomic typing outputs into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) including resistance observations, susceptibility panels, MLST and cgMLST observations, capsule type, O-antigen, virulence score, and a [WHO GLASS](https://www.who.int/initiatives/glass) diagnostic report.
- Upload FHIR bundle to a FHIR server using OAuth2 authentication for secure sharing

![Diagram Overview of the KP Genomic to FHIR Mutation Analysis Workflow](/images/kpworkflow.png)

*Figure 1: KPtoFHIR workflow.*

## Why This Matters Clinically

Klebsiella pneumoniae is one of the most consequential nosocomial pathogens globally, with intensive care units and immunocompromised patients bearing the highest burden. Carbapenem-resistant strains have narrowed treatment options to the point where last-resort antibiotics are often the only viable choice, and even those face growing resistance.

**Resistance is complex.** WGS reveals a resistance landscape that phenotypic testing cannot fully characterize. Genomic analysis of clinical KP isolates has identified up to 44 distinct resistance genes spanning 10 antibiotic classes, alongside resistance-conferring point mutations in porin genes (*ompK35*, *ompK36*, *ompK37*) that independently confer carbapenem resistance without carbapenemase production ([Buenaño-Sánchez et al. 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11451243/)). Phenotypic susceptibility testing alone would miss these mechanistic distinctions, which matter for selecting combination therapy and estimating transmission risk. WGS is therefore the only method that reliably identifies novel carbapenemase variants and characterizes the full genomic context of their spread.

**Virulence and resistance interact in ways that change clinical risk.** Klebsiella pneumoniae harbors extensive virulence gene repertoires, with iron acquisition systems dominating across sequence types. ST45 strains carry yersiniabactin biosynthesis genes associated with enhanced pathogenic potential, while carbapenem-resistant strains present a distinct risk profile. The co-occurrence of high virulence and high resistance is a clinical scenario that requires both AMR gene profiling and virulence scoring to characterize correctly.

**Proactive genomic surveillance stops outbreaks that reactive testing misses.** WGS surveillance tracking multiple bacterial species including carbapenemase-producing Enterobacterales found that real-time interventions halted outbreaks in 95% of instances on the targeted transmission route and prevented 62 infections over two years, with net hospital savings of $695,706, a three-fold return on investment ([Sundermann et al. 2024](https://doi.org/10.1128/aac.01479-24)). Standardized genomic outputs make cross-institutional comparison possible: a KPC finding contextualized by sequence type and cgMLST cluster can be compared against regional or national databases to identify transmission chains extending beyond a single facility.

**FHIR interoperability closes the gap between sequence data and clinical action.** Converting K. pneumoniae resistance and typing outputs into HL7 FHIR Genomics resources makes findings machine-readable by electronic health records, infection prevention platforms, and surveillance registries. An assessment of FHIR Genomics against a representative clinical genomic report found that 87% of semantic objects could be fully or near-fully encoded, confirming the framework's suitability for complex multi-gene resistance profiles. FHIR-encoded resistance classification, including CRE, ESBL, and hypervirulent K.pneumoniae, can be queried directly, shared without format translation, and linked to patient records for treatment personalization and infection control decision-making at the point of care.

```json
{
  "conclusion": "Carbapenem-resistant K. pneumoniae. Carbapenemases detected: KPC-3.. MLST ST45-1LV. Virulence score: 1.",
  "conclusionCode": [
    {
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "1098201000112108",
          "display": "Carbapenemase-producing Klebsiella pneumoniae (organism)"
        }
      ],
      "text": "Carbapenem-Resistant Enterobacteriaceae (CRE)"
    },
    {
      "text": "MLST ST45-1LV"
    }
  ]
}
```

```json
{
  "component": [
    {
      "code": {
        "coding": [
          {
            "system": "http://loinc.org",
            "code": "48018-6",
            "display": "Gene studied [ID]"
          }
        ]
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "http://www.genenames.org/geneId",
            "code": "aac(3)-IV",
            "display": "aac(3)-IV"
          }
        ],
        "text": "aac(3)-IV"
      }
    }
  ]
}
```
![KP Genomic Analysis Example](/images/kp-phylo.jpeg)

*Figure 2: Unrooted phylogeny tree from the pipeline's FHIR Genomics output.*

## Links

- GitHub repository: [kp-to-fhir-full](https://github.com/oucru-id/kp-to-fhir-full)
- Technical documentation: [kp-pipeline-docs](https://kp-pipeline-docs.readthedocs.io/en/latest/index.html)
