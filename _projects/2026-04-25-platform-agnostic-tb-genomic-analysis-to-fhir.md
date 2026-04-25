---
title: "Platform-agnostic TB Genomic Analysis to FHIR pipeline"
excerpt: "Nextflow pipeline for TB resistance and lineage analysis (Illumina, Nanopore, and raw VCF) with FHIR Genomics outputs."
tags:
  - Tuberculosis
  - Nextflow
  - FHIR
  - Genomics
toc: true
---

## Overview

This project develops a platform-agnostic pipeline for Mycobacterium tuberculosis sequencing data from Illumina, Nanopore, and raw VCF inputs to identify resistance-associated variants and lineage.

The results are converted into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) so the findings can be shared in a structured, interoperable format for downstream clinical reporting.

![Diagram Overview of the TB Genomic Analysis to FHIR Workflow]({{ '/assets/images/tb-to-fhir-full.png' | relative_url }})

The snippets below show the example of FHIR output produced by the pipeline.

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

## Dataset and Inputs

- Illumina paired-end sequencing reads
- Oxford Nanopore (ONT) long-read sequencing data
- Raw or pre-annotated VCF files

## Methods and Workflow

- Nextflow main workflow automatically detects whether the input is Illumina, Nanopore, or VCF and routes samples to the correct sub-workflow.
- Performs quality control, trimming, alignment, variant calling, and filtering using platform-specific tools
- Annotates variants against the [WHO TB mutation catalogue](https://github.com/GTB-tbsequencing/mutation-catalogue-2023) to identify resistance-associated mutations
- Classifies M. tuberculosis lineage from barcode SNPs
- Converts annotated genomic results into HL7 FHIR Genomics v3.0.0 resources including variant observations, susceptibility panels, lineage observations, and a diagnostic report

## Why This Matters Clinically

A platform-agnostic workflow helps standardize resistance interpretation and FHIR-based reporting across heterogeneous data sources, making the results more consistent and enabling faster decision-making for clinical care and surveillance.

## Reproducibility

- One pipeline supports multiple input types without changing the reporting model
- Filtering thresholds and workflow parameters are defined in the pipeline configuration
- Standardized terminologies make the output easier to exchange across clinical and public health systems

## Links

- GitHub repository: [tb-to-fhir-full](https://github.com/oucru-id/tb-to-fhir-full)
- Technical documentation: [tb-pipeline-docs](https://tb-pipeline-docs.readthedocs.io/en/latest/index.html)
