---
title: "Deeplex Myc-TB to FHIR pipeline"
excerpt: "Nextflow pipeline for analyzing Deeplex Myc-TB targeted sequencing (tNGS) outputs into FHIR Genomics clinical reporting."
tags:
  - Tuberculosis
  - Nextflow
  - FHIR
  - Genomics
  - Deeplex Myc-TB
toc: true
---

## Overview

This project develops a pipeline for Deeplex Myc-TB targeted sequencing (tNGS) outputs, converting assay-specific resistance and lineage findings into structured genomic reporting.

The workflow processes Deeplex Excel reports, extracts variant and lineage information, and transforms the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html) for interoperable downstream reporting.

![Diagram Overview of the Deeplex Myc-TB to FHIR Workflow]({{ '/assets/images/Deeplex_workflow.png' | relative_url }})

The snippets below show the example of FHIR output produced by the pipeline.

```json
{
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "48005-3",
        "display": "Amino acid change (pHGVS)"
      }
    ]
  },
  "valueCodeableConcept": {
    "coding": [
      {
        "system": "https://varnomen.hgvs.org",
        "code": "NC_000962.3:p.(H445D)",
        "display": "H445D"
      }
    ],
    "text": "H445D"
  }
}
```

```json
{
  "code": {
    "coding": [
      {
        "system": "http://loinc.org",
        "code": "53037-8",
        "display": "Genetic variation clinical significance [Imp]"
      }
    ]
  },
  "valueCodeableConcept": {
    "coding": [
      {
        "system": "http://terminology.kemkes.go.id/sp",
        "code": "SP000478",
        "display": "Assoc w R"
      }
    ],
    "text": "Associated with resistance"
  }
}
```

## Dataset and Inputs

Deeplex Myc-TB Excel report outputs

## Methods and Workflow

- Parses Deeplex Excel sheets including drug resistance variants, uncharacterised variants, and synonymous variant tabs
- Maps variant, resistance, and lineage fields into standardized terminologies including LOINC, SNOMED CT, and HGVS
- Merges observations into a FHIR-compliant `DiagnosticReport` with resistance classification such as HR-TB, MDR-TB, or XDR-TB
- Produces FHIR bundle outputs containing variant observations, susceptibility panels, lineage observations, and DiagnosticReport resources.

## Why This Matters Clinically

Drug-resistant tuberculosis treatment depends on detecting the right resistance pattern quickly and communicating it clearly. Converting Deeplex assay results into standardized FHIR Genomics resources reduces manual interpretation and makes findings easier to integrate into clinical and public health reporting for faster decision-making.

## Reproducibility

- Workflow parameters and versioned dependencies are managed through the pipeline configuration
- Standardized clinical terminology improves interoperability across clinical and public health systems

## Links

- GitHub repository: [tb-to-fhir-deeplex](https://github.com/oucru-id/tb-to-fhir-deeplex)
- Technical documentation: [deeplex-tb-to-fhir](https://deeplex-tb-to-fhir.readthedocs.io/en/latest/)
- Assay website: [Deeplex Myc-TB](https://www.deeplex.com/deeplex-myc-tb-tuberculosis-drug-resistance-diagnostic-kit/)
