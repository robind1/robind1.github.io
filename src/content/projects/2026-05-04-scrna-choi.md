---
title: "COVID-19 scRNA-seq: Immune Severity and Clonal Hematopoiesis"
excerpt: "Replication of Choi et al. 2022: single-cell transcriptome analysis of COVID-19 PBMC immune landscape."
teaser: "/images/scrna-umap-cover.png"
date: 2026-05-31
tags:
  - Seurat
  - scRNA-seq
  - Immunology
  - COVID-19
---

## Overview

This project replicates the single-cell RNA sequencing analysis from [Choi et al. 2022](https://doi.org/10.1038/s12276-022-00866-1), which identified a distinct IFN-γ hyperinflammatory signature in severe COVID-19 patients carrying clonal hematopoiesis of indeterminate potential (CHIP) mutations. The analysis uses the PBMC dataset from [Lee et al. 2020](https://doi.org/10.1126/sciimmunol.abd1554) (GEO: [GSE149689](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE149689)) with 50,125 cells spanning healthy controls, influenza, and mild and severe COVID-19 patients.

The workflow reproduces clustering, cell type annotation, and differential expression across disease conditions using Seurat v5, then focuses on the monocyte compartment to characterize the IFN-γ signature associated with CHIP status and COVID-19 severity.

## Data

- **Dataset:** GSE149689 (Lee et al. 2020, *Science Immunology*)
- **Samples:** 20 total — 4 healthy controls, 5 severe influenza, 11 COVID-19 (asymptomatic, mild, severe)
- **Platform:** 10x Chromium and Illumina NovaSeq 6000
- **Cells after QC:** 50,125

![UMAP of PBMC clusters colored by annotated cell type](/images/scrna-umap-celltype.png)

*Figure 1: UMAP of 50,125 PBMCs colored by annotated cell type across all conditions.*

![UMAP split by disease condition](/images/scrna-umap-condition.png)

*Figure 2: UMAP by condition (healthy / mild COVID-19 / severe COVID-19 / influenza).*

![Volcano plot: severe vs mild COVID-19 in classical monocytes](/images/scrna-volcano-monocytes.png)

*Figure 3: Volcano plot of 2,168 differentially expressed genes (MAST, Bonferroni adj. *p* < 0.05) in classical monocytes, severe vs. mild COVID-19. Left: HLA class II genes (HLA-DRA, HLA-DPA1/DPB1, CD74) down-regulated in severe disease, reflecting monocyte immunoparalysis. Right: S100A8/A9, CLU, PLAC8, and IFN-stimulated genes (ISG15, IFITM3) up-regulated.*

## Why This Matters Clinically

COVID-19 severity is not uniform. Clinical outcomes diverge sharply even among patients with similar viral loads and comorbidity profiles. Understanding what separates mild from severe disease is necessary to treatment decisions.

**Single-cell resolution reveals immune heterogeneity that bulk sequencing cannot.** Bulk RNA-seq averages transcriptional signals across all cells in a sample, obscuring cell-type-specific programs. In severe COVID-19, classical monocytes simultaneously activate TNF/IL-1β–driven inflammation and type I interferon signaling, a co-activation pattern that would be diluted in a bulk readout. Identifying this dual activation as a monocyte-specific signature, rather than a pan-PBMC phenomenon, directly informs which cell compartments are relevant targets for immunomodulation.

**Clonal hematopoiesis of indeterminate potential (CHIP) stratifies COVID-19 severity in a clinically actionable way.** CHIP, somatic mutations in hematopoietic stem cells, most commonly in *DNMT3A* and *TET2* occurs in roughly 10–15% of individuals over 70 and is already associated with increased cardiovascular and hematologic risk. Choi et al. demonstrate that CHIP(+) patients exhibit a potent IFN-γ response specifically in classical monocytes, mediated through epigenetic reprogramming at poised enhancers. This identifies CHIP status as a biologically grounded risk stratification marker. Elderly COVID-19 patients with CHIP may be predisposed to hyperinflammatory cascades that worsen outcome independently of other comorbidities.

**Classical monocytes are a convergence point for infection severity and pre-existing hematopoietic state.** The finding that COVID-19 severity, CHIP mutation status, and IFN-γ hyperinflammation all converge on the classical monocyte compartment establishes this cell type as a priority for targeted immunotherapy trials. Single-cell profiling is the only method that produces this cell-type specificity.

**Reproducible scRNA-seq reanalysis extends the value of existing public data.** Choi et al. demonstrate that published PBMC scRNA-seq datasets retain sufficient resolution for discovery when reanalyzed with new biological hypotheses.

## Links

- Original dataset: [GSE149689](https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE149689)
- Reanalysis paper: [Choi et al. 2022, *Exp Mol Med*](https://doi.org/10.1038/s12276-022-00866-1)
- Original data paper: [Lee et al. 2020, *Science Immunology*](https://doi.org/10.1126/sciimmunol.abd1554)
