---
layout: splash
title: "Bioinformatics Portfolio"
permalink: /
author_profile: false
header:
  overlay_filter: 0.25
  caption: "Pathogen genomics workflows with interoperable FHIR reporting"
  actions:
    - label: "View Projects"
      url: "/projects/"
    - label: "About Me"
      url: "/about/"
intro:
  - excerpt: "I develop platform-agnostic pathogen genomics pipelines for standardized FHIR interoperability."
feature_row_tb:
  - image_path: "/assets/images/tb-to-fhir-full.png"
    alt: "Platform-agnostic TB to FHIR pipeline"
    title: "Platform-agnostic TB Genomic Analysis to FHIR"
    excerpt: "Illumina, Nanopore, and VCF workflow for TB resistance and lineage analysis with FHIR Genomics reporting."
    url: "/projects/2026-04-25-platform-agnostic-tb-genomic-analysis-to-fhir/"
    btn_label: "Read Project"
    btn_class: "btn--primary"
  - image_path: "/assets/images/Deeplex_workflow.png"
    alt: "Deeplex Myc-TB to FHIR pipeline"
    title: "Deeplex Myc-TB to FHIR"
    excerpt: "tNGS assay output conversion from Deeplex Excel reports into standardized FHIR clinical reporting."
    url: "/projects/2026-04-25-deeplex-myc-tb-to-fhir-pipeline/"
    btn_label: "Read Project"
    btn_class: "btn--primary"
feature_row_pathogens:
  - image_path: "/assets/images/kp-pipeline.png"
    alt: "Klebsiella pneumoniae genomic to FHIR pipeline"
    title: "KP Genomic to FHIR Mutation Analysis"
    excerpt: "AMR, MLST, capsule typing, virulence, and cgMLST analysis converted into FHIR genomic reporting."
    url: "/projects/2026-04-25-kp-genomic-to-fhir-mutation-analysis-pipeline/"
    btn_label: "Read Project"
    btn_class: "btn--primary"
  - image_path: "/assets/images/dengue-flow.png"
    alt: "Dengue genomic to FHIR analysis pipeline"
    title: "Dengue Genomic to FHIR Analysis"
    excerpt: "Pan-serotype dengue workflow with serotype, genotype, lineage, and mutation reporting in FHIR."
    url: "/projects/2026-04-25-dengue-genomic-to-fhir-analysis-pipeline/"
    btn_label: "Read Project"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

## Featured FHIR Pipelines

{% include feature_row id="feature_row_tb" %}
{% include feature_row id="feature_row_pathogens" %}
