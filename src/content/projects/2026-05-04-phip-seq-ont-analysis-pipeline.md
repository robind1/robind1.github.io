---
title: "PhIP-Seq Analysis Pipeline for ONT"
excerpt: "Pipeline for Phage Immunoprecipitation Sequencing (PhIP-Seq) analysis using Oxford Nanopore (ONT)."
teaser: "/images/phip-seq-cover1.png"
date: 2026-05-04
tags:
  - Nextflow
  - Immunology
  - High-throughput
---

## Overview

This project provides an end-to-end Nextflow pipeline for processing Phage Immunoprecipitation Sequencing (PhIP-Seq) high-throughput data generated from Oxford Nanopore Technologies (ONT). PhIP-Seq is a highly multiplexed method for antibody profiling that enables the characterization of an individual's immunological characteristics, including pathogen exposures and autoantibody repertoires.

The pipeline automates the entire analytical workflow, from raw sequence alignment against custom peptide reference libraries ([Virscan](https://bio-protocol.org/en/bpdetail?id=4464&type=0) or others custom libraries) to statistical evaluation and functional annotation utilizing Immune Epitope Database ([IEDB](https://www.iedb.org/)). To maximize the utility of the results, the pipeline generates an interactive Streamlit dashboard for multidimensional data exploration. The pipeline take reference from Matsen Group [pipeline](https://github.com/matsengrp/phip-flow) and adapt it for ONT data.

![PhIP-seq workflow diagram](/images/phip-seq2.png)

*Figure 1: PhIP-seq workflow diagram.*

## Methods and Workflow

- **Alignment:** Align ONT long reads against custom peptide reference libraries.
- **Statistical Analysis:** Calculates enrichment statistics and false discovery rates to identify antibody-peptide bindings.
- **Virus Scoring:** Computes aggregated, virus-level scores from individual enriched peptide hits.
- **Annotation (IEDB):** Integrates the Immune Epitope Database (IEDB) to provide validated immunological context to the enriched peptides.
- **Visualization:** Produces wide data matrices and 3D protein Streamlit dashboard for interactive serological profiling.

<video autoplay loop muted controls class="w-full rounded-lg">
  <source src="/demo-phip-seq.mp4" type="video/mp4" />
</video>

*Figure 2: Streamlit dashboard for PhIP-Seq enrichment visualization.*

## Why This Matters

PhIP-Seq enables simultaneous profiling of antibody reactivity against hundreds of thousands of antigens in a single experiment.

**Population-scale immunity mapping:** A single PhIP-Seq run can reveal exposure history to dozens of viral species per individual, making it a powerful tool for pathogen surveillance and vaccine response characterization across cohorts.

**Bridging immune profiling and genomics:** By pairing high-throughput antibody data with long-read sequencing and IEDB-validated epitope annotation, this could connects serological findings to genomic context and enable richer interpretation of immune responses.

![PhIP-Seq Vaccine](/images/phip-seq-vaccine.jpg)

*Figure 3: VirScan analysis of maternal and cord SARS-CoV-2 Spike protein epitope binding. Heatmap (A) displays significantly enriched linear Spike epitope binding from 15 paired mother-infant dyads in maternal plasma at delivery and cord plasma by vaccine type and time since vaccination. Cumulative fold enrichment (B) compares mothers and infants, with counts modeled against healthy controls. Spike subunit regions marked: NTD (N-terminal domain), RBD (receptor binding domain), S1 (Spike 1 subunit), S2 (Spike 2 subunit), TM (transmembrane). ([Prahl et al. 2022](https://doi.org/10.1038/s41467-022-32188-1))*

## Challenges

**Enrichment ambiguity:** Because the assay works by serially amplifying phage clones that bind antibodies, non-specific amplification can produce false positives. Distinguishing true binders from background requires careful statistical modeling.

**PTM blind spots:** Antibodies that recognize glycopeptide or phospho-epitopes may go undetected, a known limitation of all phage-display implementations.

**Conformational epitope exclusion:** Peptides displayed on phage are linear, so antibodies that recognize discontinuous epitopes are invisible to the assay.

## Links

- GitHub repository: [phip-seq-ont](https://github.com/oucru-id/phip-seq-ont)
- Technical documentation: [phipseq-pipeline-docs](https://phipseq-pipeline-docs.readthedocs.io/en/latest/index.html)
- Interactive Dashboard Prototype: [PhIP-Seq 3D Viz](https://phipseq3dvizprototype-test.streamlit.app/)
