---
title: "OWASP Top Ten: The Leading Web Application Security Risks"
source_url: "https://owasp.org/www-project-top-ten/"
source_type: web
author: "OWASP Foundation"
fetch_date: "2026-01-13"
translation_status: none
---

# OWASP Top Ten Web Application Security Risks

[원본 링크](https://owasp.org/www-project-top-ten/)

## Overview

The OWASP Top Ten represents "a standard awareness document for developers and web application security." The most recent version is the [OWASP Top Ten 2025](https://owasp.org/Top10/2025/), with prior editions available for [2021](https://owasp.org/Top10/2021/) and [2017](/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf).

## Purpose

The document serves as a foundational resource for developers seeking to implement more secure coding practices. Organizations are encouraged to "adopt this document and start the process of ensuring that their web applications minimize these risks."

## Translation Efforts

### Top 10:2025 Completed Translations

_Translations in progress - check back soon!_

### Historic Translations

#### Top 10:2021 Completed Translations

- **ar - العربية**
- **es - Español**
- **fr - Français**
- **id - Indonesian**
- **it - Italiano**
- **ja - 日本語**
- **pt_BR - Português (Brasil)**
- **zh_CN - 简体中文**
- **zh_TW - 繁體中文**

#### Top 10:2017 Completed Translations

Multiple languages supported including Chinese, French, German, Hebrew, Japanese, Korean, Portuguese, Russian, and Spanish with detailed translator credits provided.

#### Top 10:2013 Completed Translations

Comprehensive translations available in Arabic, Chinese, Czech, French, German, Hebrew, Italian, Japanese, Korean, Brazilian Portuguese, Spanish, and Ukrainian with full attribution to translation teams.

#### 2010 Completed Translations

- Korean 2010
- Spanish 2010
- French 2010
- German 2010
- Indonesian 2010
- Italian 2010
- Japanese 2010
- Chinese 2010
- Vietnamese 2010
- Hebrew 2010

## Project Sponsorship

### 2021 Sponsors

The OWASP Top 10:2021 was sponsored by Secure Code Warrior.

### 2017 Sponsors

Sponsored by Autodesk and supported by the OWASP NoVA Chapter.

### 2003-2013 Sponsors

Aspect Security sponsored earlier versions.

---

## OWASP Top 10 2025 Data Analysis Plan

### Goals

The initiative aims to "collect the most comprehensive dataset related to identified application vulnerabilities to-date." Data sources include security vendors, consultancies, bug bounties, and organizational contributions. Data will be normalized to enable comparison between human-assisted tooling and tooling-assisted human approaches.

### Analysis Infrastructure

The plan leverages OWASP Azure Cloud Infrastructure for data collection, analysis, and storage.

### Contributions

#### Verified Data Contribution

**Scenario 1:** Submitter is known and has agreed to public identification

**Scenario 2:** Submitter is known but prefers anonymity

**Scenario 3:** Submitter is known but does not want data recorded in dataset

#### Unverified Data Contribution

**Scenario 4:** Anonymous submission (consideration pending)

Unverified data will be classified as such in analysis.

### Contribution Process

Data can be contributed through:

1. Email CSV/Excel files to [project email]
2. Upload to [https://bit.ly/OWASPTop10Data](https://bit.ly/OWASPTop10Data)

Template examples are available in the [GitHub repository](https://github.com/OWASP/Top10/tree/master/2025/Data).

### Contribution Period

Contributions are accepted until July 31, 2025, for data from 2021-2024.

### Data Structure Requirements

#### Required Metadata

- Contributor Name (org or anonymous)
- Contributor Contact Email
- **Time period (2024, 2023, 2022, 2021)**
- **Number of applications tested**
- Type of testing (TaH, HaT, Tools)
- Primary Language (code)
- Geographic Region (Global, North America, EU, Asia, other)
- Primary Industry (Multiple, Financial, Industrial, Software, etc.)
- Whether data contains retests or duplicate applications (T/F)

#### CWE Data

- **A list of CWEs with count of applications containing each CWE**

_Core CWEs preferred over CWE categories for improved analysis accuracy. All normalization/aggregation actions will be documented._

#### Dataset Submission Note

Contributors with separate HaT (Human assisted Tools) and TaH (Tool assisted Human) datasets should submit them separately.

### Survey Component

Following the 2021 model, a community survey will identify up to two Top Ten categories not fully reflected in data analysis. The survey, planned for early 2025, will utilize Google Forms and examine trending findings and CWEs outside the current Top Ten.

### Analysis Process

Data normalization will be performed while maintaining raw data for future research. The analysis includes:

- CWE distribution calculation
- Potential CWE reclassification and consolidation
- Complete documentation of all normalization actions
- Incidence rate calculation (likelihood of at least one instance per application)
- Base CWSS scores for top 20-30 CWEs
- Potential impact weighting for Top 10 ranking
- Exploration of additional insights for security and development communities

---

## Project Information

### Key Resources

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [Making of OWASP Top 10](https://www.owasptopten.org/)
- [Previous Version (2021)](https://owasp.org/Top10/2021/)
- [Previous Version (2017)](https://owasp.org/www-project-top-ten/2017)

### Downloads

- [OWASP Top 10 2017 PDF](/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf)
- [Other languages and versions](https://owasp.org/www-project-top-ten/#div-translation_efforts)

### Project Leadership

- Andrew van der Stock
- Brian Glas
- Neil Smithline
- Tanya Janca
- Torsten Gigler

### Code Repository

[GitHub Repository](https://github.com/OWASP/Top10)

### Social Media

[Twitter](https://twitter.com/owasptop10)

---

**The OWASP® Foundation** operates as a nonprofit organization dedicated to improving software security through open source projects, global chapters, membership networks, and conference hosting.

All content is Creative Commons Attribution-ShareAlike v4.0 and provided without warranty. OWASP maintains vendor neutrality and does not endorse commercial products or services. Copyright 2025, OWASP Foundation, Inc.
