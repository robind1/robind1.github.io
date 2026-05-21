---
title: "Deeplex Myc-TB to FHIR"
excerpt: "Pipeline for analyzing Deeplex Myc-TB targeted sequencing (tNGS) outputs into FHIR Genomics clinical reporting."
teaser: "/images/Image-Deeplex6.png"
date: 2026-04-25
tags:
  - Nextflow
  - Mycobacterium tuberculosis
  - Drug resistance
  - FHIR
  - Pathogen genomics
---

## Overview

This project develops a pipeline for analyzing [Deeplex Myc-TB](https://www.deeplex.com/deeplex-myc-tb-tuberculosis-drug-resistance-diagnostic-kit/) targeted sequencing (tNGS) outputs, converting assay-specific resistance and other findings into structured interoperable genomic reporting.

The workflow processes Deeplex Excel reports, extracts variant and lineage information, and transforms the results into [HL7 FHIR Genomics resources](https://build.fhir.org/genomics.html).

![Deeplex Myc-TB screen](/images/deeplex-example-screen.png)

*Figure 1: Deeplex Myc-TB result screen. Source: [Genoscreen](https://www.genoscreen.fr/index.php?option=com_content&view=article&id=200&Itemid=371&lang=en)*

## Workflow

- Parses Deeplex Excel sheets including drug resistance variants, uncharacterised variants, and synonymous variant tabs
- Maps variant, resistance, and lineage fields into standardized terminologies including LOINC, SNOMED CT, and HGVS
- Merges observations into `DiagnosticReport` with resistance classification such as HR-TB, MDR-TB, or XDR-TB
- Produces FHIR bundle outputs containing variant observations, susceptibility panels, lineage observations, and `DiagnosticReport` resources.
- Upload FHIR bundle to a FHIR server using OAuth2 authentication for secure sharing

![Diagram Overview of the Deeplex Myc-TB to FHIR Workflow](/images/Deeplex_workflow.png)

*Figure 2: Overview of the Deeplex Myc-TB to FHIR workflow.*

## Why This Matters Clinically

Drug-resistant tuberculosis remains one of the most urgent public health threats globally, and treatment success depends on identifying the correct resistance profile quickly. Deeplex Myc-TB delivers molecular resistance and susceptibility under 48 hours from clinical samples and is the only tNGS assay endorsed by the WHO as meeting performance criteria across all 10 evaluated drugs.

**The gap this pipeline closes** is between assay output and interoperable clinical reporting. Deeplex Excel results are not machine-readable by downstream health systems. By converting resistance findings into HL7 FHIR Genomics resources, we make these findings immediately interoperable with electronic health records (EHRs), clinical decision support engines, and public health surveillance platforms.

**Interoperability is foundational to clinical genomics.** As demonstrated in FHIR genomics implementation work, structured representations enable automated phenotype-genotype matching, linkage of variants to clinical conditions using standardized evidence references, and integration with patient history for treatment personalization. FHIR's standardized data address both the syntactic and semantic layers of interoperability.

**For MTB surveillance** resistance finding, such as an *rpoB* mutation conferring rifampicin resistance, can be encoded once and shared across surveillance registries without format translation. This reduces interpretation lag, limits transcription error, and supports consistent resistance classification (HR-TB, MDR-TB, XDR-TB) across heterogeneous care settings.

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

## Links

- GitHub repository: [tb-to-fhir-deeplex](https://github.com/oucru-id/tb-to-fhir-deeplex)
- Technical documentation: [deeplex-tb-to-fhir](https://deeplex-tb-to-fhir.readthedocs.io/en/latest/)
- Assay website: [Deeplex Myc-TB](https://www.deeplex.com/deeplex-myc-tb-tuberculosis-drug-resistance-diagnostic-kit/)
