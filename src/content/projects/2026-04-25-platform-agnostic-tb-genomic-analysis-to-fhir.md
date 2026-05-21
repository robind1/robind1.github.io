---
title: "TB Genomic Analysis to FHIR"
excerpt: "Pipeline for TB resistance and lineage analysis (Illumina, Nanopore, and VCF) with FHIR Genomics clinical reporting."
teaser: "/images/tbtofhir.png"
date: 2026-04-25
tags:
  - Nextflow
  - Mycobacterium tuberculosis
  - Drug resistance
  - FHIR
  - Pathogen genomics
---

## Overview

This project develops a platform-agnostic pipeline for Mycobacterium tuberculosis sequencing data from Illumina, Nanopore, and pre-annotated VCF inputs to identify resistance-associated variants and other genomic findings. The results are converted into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) so the findings can be shared in a structured, interoperable format for downstream clinical reporting.

## Workflow

- The pipeline automatically detects whether the input is Illumina, Nanopore, or VCF and routes samples to the correct sub-workflow
- Performs quality control, trimming, alignment, variant calling, and filtering using platform-specific tools
- Annotates variants against the [WHO TB mutation catalogue](https://github.com/GTB-tbsequencing/mutation-catalogue-2023) to identify resistance-associated mutations
- Classifies M. tuberculosis lineage from barcode SNPs
- Converts annotated genomic results into HL7 FHIR Genomics resources including variant observations, susceptibility panels, lineage observations, and a diagnostic report
- Upload FHIR bundle to a FHIR server using OAuth2 authentication for secure sharing

![Diagram Overview of the TB Genomic Analysis to FHIR Workflow](/images/tb-workflow-full.png)

*Figure 1: TBtoFHIR workflow.*


## Why This Matters Clinically

Tuberculosis remains one of the most challenging infectious diseases to manage, not just because of its biology, but because of the fragmented and non-standardized state the data across institutions. This pipeline directly addresses both problems.

**Platform heterogeneity is a real barrier.** Global TB sequencing capacity is distributed across Illumina short-read platforms in high-resource settings and Oxford Nanopore instruments at point-of-care and resource-limited sites, alongside legacy variant call files. A single-platform pipeline forces labs to reprocess data or use inconsistent downstream reporting. A platform-agnostic workflow normalizes outputs from all three input types into a unified reporting model, making resistance and lineage findings comparable.

**WGS finds what conventional methods miss.** Whole genome sequencing identifies twice as many true epidemiological transmission links as conventional VNTR genotyping ([Jajou et al. 2018](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0195413)). Detecting transmission earlier enables targeted interventions before an outbreak expands. However, the field still lacks international consensus on SNP distance thresholds for ruling in transmission, and outbreak definitions vary across institutions. Standardized outputs, including the HGVS variant notation and WHO mutation catalogue annotations could be the basis for cross-institutional comparison.

**FHIR interoperability.** Converting resistance findings into structured HL7 FHIR Genomics resources makes them machine-readable by electronic health records, clinical decision support engines, and national surveillance registries. The FHIR Genomics standard has been shown to encode the majority of genomic reporting constructs with full or near-full fidelity, confirming its suitability as a reporting target for complex multi-drug resistance findings like those produced by TB whole genome sequencing.

```json
{
  "conclusion": "HR-TB (Isoniazid-resistant tuberculosis). Detected resistance genes: katG. Detected drug resistance: isoniazid by genotype method. TB Lineage lineage4.7 detected. Reference genome: NC_000962.3",
  "conclusionCode": [
    {
      "text": "HR-TB",
      "coding": [
        {
          "system": "http://snomed.info/sct",
          "code": "414546009",
          "display": "Isoniazid resistant tuberculosis"
        }
      ]
    },
    {
      "text": "Lineage lineage4.7"
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
            "code": "81290-9",
            "display": "Genomic DNA change (gHGVS)"
          }
        ]
      },
      "valueCodeableConcept": {
        "coding": [
          {
            "system": "https://varnomen.hgvs.org",
            "code": "NC_000962.3:g.4013T>C",
            "display": "NC_000962.3:g.4013T>C"
          }
        ]
      }
    }
  ]
}
```

![TB Genomic Analysis Example](/images/portfol-1.svg)

*Figure 2: Circular phylogeny tree and transmission network clusters from the pipeline's FHIR Genomics output.*

## Links

- GitHub repository: [tb-to-fhir-full](https://github.com/oucru-id/tb-to-fhir-full)
- Technical documentation: [tb-pipeline-docs](https://tb-pipeline-docs.readthedocs.io/en/latest/index.html)
