---
title: "KP Genomic to FHIR Mutation Analysis pipeline"
excerpt: "Nextflow pipeline for Klebsiella pneumoniae genomic analysis from Illumina and Nanopore data with FHIR Genomics outputs."
tags:
  - Klebsiella pneumoniae
  - Nextflow
  - FHIR
  - Genomics
  - AMR
toc: true
---

## Overview

This project develops a platform-agnostic pipeline for Klebsiella pneumoniae genomic data from Illumina and Nanopore sequencing to identify antimicrobial resistance and strain characteristics.

The workflow integrates resistance gene detection, MLST, capsule typing, virulence scoring, and cgMLST analysis, then converts the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) for structured clinical reporting.

![Diagram Overview of the KP Genomic to FHIR Mutation Analysis Workflow]({{ '/assets/images/kp-pipeline.png' | relative_url }})

The snippets below show the example of FHIR output produced by the pipeline.

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

## Dataset and Inputs

- Illumina paired-end sequencing reads
- Oxford Nanopore (ONT) long-read sequencing data

## Methods and Workflow

- Nextflow main workflow automatically detects whether the input is Illumina or Nanopore and routes samples to the correct sub-workflow
- Performs read trimming, quality control, de novo assembly, and polishing using platform-specific tools
- Uses [Kleborate](https://kleborate.readthedocs.io/en/latest/) based typing analysis to detect AMR genes, MLST sequence type, capsule type, virulence factors, and virulence score
- Runs [cgMLST](https://www.cgmlst.org/ncs/schema/Kpneumoniae_complex/) analysis to characterize strain relatedness and summarize allele calling statistics
- Converts genomic typing outputs into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) including resistance observations, susceptibility panels, MLST and cgMLST observations, capsule type, virulence score, and a [WHO GLASS](https://www.who.int/initiatives/glass) diagnostic report.

## Why This Matters Clinically

Klebsiella pneumoniae can acquire resistance and virulence traits that change both treatment options. A workflow that turns sequencing results into standardized FHIR-based summaries helps make resistance, strain typing, and virulence findings easier to interpret consistently across public health and clinical settings for faster decision-making.

## Reproducibility

- One workflow supports multiple sequencing platforms without changing the downstream reporting model
- Workflow parameters and software dependencies are centrally configured
- Standardized terminologies make resistance, typing, and susceptibility results easier to exchange across clinical and surveillance systems

## Links

- GitHub repository: [kp-to-fhir-full](https://github.com/oucru-id/kp-to-fhir-full)
- Technical documentation: [kp-pipeline-docs](https://kp-pipeline-docs.readthedocs.io/en/latest/index.html)
