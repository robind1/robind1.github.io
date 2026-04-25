---
title: "Dengue Genomic to FHIR Analysis pipeline"
excerpt: "Nextflow pipeline for pan-serotype dengue genomic analysis from Illumina and Nanopore data with FHIR Genomics outputs."
tags:
  - Dengue virus
  - Nextflow
  - FHIR
  - Genomics
  - Viral genomics
toc: true
---

## Overview

This project develops a platform-agnostic pipeline for pan-serotype Dengue virus genomic data from Illumina and Nanopore sequencing to identify serotype, genotype, lineage, and coding mutations.

The workflow combines host removal, serotyping, consensus generation, and [Nextclade](https://clades.nextstrain.org/)-based classification, then converts the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) for structured clinical and surveillance reporting.

![Diagram Overview of the Dengue Genomic to FHIR Analysis Workflow]({{ '/assets/images/dengue-flow.png' | relative_url }})

The snippet below shows the example of FHIR output produced by the pipeline.

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

## Dataset and Inputs

- Illumina paired-end sequencing reads
- Oxford Nanopore (ONT) long-read sequencing data

## Methods and Workflow

- Nextflow main workflow automatically detects whether the input is Illumina or Nanopore, performs trimming and host contamination removal, then routes samples to the correct downstream workflow
- Determines Dengue serotype using BLASTn against reference sequences for DENV-1 to DENV-4 and sylvatic strains
- Uses Nextclade to assign genotype and lineage and identify amino acid mutations
- Converts serotyping, consensus, and genotype results into HL7 FHIR R4 resources including dengue classification observations, viral consensus genome observations, genetic variant observations, and a diagnostic report

## Why This Matters Clinically

Serotype and lineage differences can affect outbreak tracking and transmission interpretation. A workflow that standardizes dengue genomic classification and reporting in FHIR makes those findings easier to share consistently across surveillance systems and clinical reporting for faster decision-making.

## Reproducibility

- One workflow supports multiple sequencing platforms without changing the reporting model
- Workflow parameters and software dependencies are centrally configured
- Standardized output structure makes serotype, lineage, and mutation findings easier to compare across samples and reporting systems

## Links

- GitHub repository: [DENV-to-fhir-full](https://github.com/oucru-id/DENV-to-fhir-full)
- Technical documentation: [denv-pipeline-docs](https://denv-pipeline-docs.readthedocs.io/en/latest/)
