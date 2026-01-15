---
title: "AI-Assisted Assessment of Coding Practices in Modern Code Review"
source_url: "https://arxiv.org/pdf/2405.13565"
source_type: pdf
author: "Manushree Vijayvergiya et al. (Google)"
fetch_date: "2026-01-13"
translation_status: none
total_pages: 9
---

# AI-Assisted Assessment of Coding Practices in Modern Code Review

[원본 링크](https://arxiv.org/pdf/2405.13565)

## Abstract

Modern code review is a process in which an incremental code contribution made by a code author is reviewed by one or more peers before it is committed to the version control system. An important element of modern code review is verifying that code contributions adhere to best practices. While some of these best practices can be automatically verified, verifying others is commonly left to human reviewers. This paper reports on the development, deployment, and evaluation of AutoCommenter, a system backed by a large language model that automatically learns and enforces coding best practices. We implemented AutoCommenter for four programming languages (C++, Java, Python, and Go) and evaluated its performance and adoption in a large industrial setting. Our evaluation shows that an end-to-end system for learning and enforcing coding best practices is feasible and has a positive impact on the developer workflow. Additionally, this paper reports on the challenges associated with deploying such a system to tens of thousands of developers and the corresponding lessons learned.

**Keywords**: Artificial Intelligence, Code Review, Coding Best Practices

## 1. Introduction

Modern code review (compared to holistic code review) has grown organically over the years in open-source and industrial settings. A set of common peer-review criteria have emerged, which include coding best practices. Many companies, projects, and even programming languages formally define them in the form of "style guides" that commonly cover the following aspects:

- **Formatting**: line limits, use of whitespaces and indentation, placement of parentheses and brackets, etc.
- **Naming**: capitalization, brevity, descriptiveness, etc.
- **Documentation**: expected placement and content of file-level, function-level, and other comments
- **Language features**: use of specific language features in different (code) contexts
- **Code idioms**: use of code idioms to improve code clarity, modularity, and maintainability

Developers generally report high satisfaction with modern code review processes. One of their main benefits is the learning experience for code authors who are not familiar with the codebase, specific language features, or common code idioms. During a review, an expert developer educates the code author on best practices.

Static analysis tools such as linters can automatically verify that code adheres to some best practices (e.g., formatting rules), and some tools can even automatically fix violations. However, nuanced guidelines or those with exceptions are difficult to automatically verify in their entirety (e.g., naming conventions and justified deviations in legacy code), and some guidelines cannot be captured by precise rules at all (e.g., clarity and specificity of code comments) and rely on human judgement and collective developer knowledge.

The biggest cost of the code-review process is the time required, especially from expert developers. Even with significant automation in place, and keeping the process as lightweight as possible, a developer can easily dedicate several hours daily to this task.

Recent advances in machine learning, capabilities of large language models (LLMs) in particular, suggest that LLMs are suitable for code-review automation. However, the software engineering challenges around deploying an end-to-end system at scale remain unexplored.

### Contributions

- A general architecture of an LLM-based code-review assistant system
- A description of tool calibration and deployment to tens of thousands of developers
- An evaluation of the system
- A summary and discussion of lessons learned

## 2. Background

### 2.1 Code Review Process

The code review process at Google is well established, change-based, and tool-assisted. Each change to the codebase must be reviewed by at least one other developer. Every day, tens of thousands of changes to the codebase go through the review process and tens of thousands of developers participate in the process, as both code authors and reviewers.

Authors and reviewers exchange comments through the code review system, and a review progresses through snapshots of files affected by the change. Each reviewer comment is attached to a specific line and column range in a specific file snapshot.

The most expensive part of the code review process is the time spent by code authors and reviewers "shepherding" a change (from initial coding, through addressing reviewer comments and ensuring all automated analyses pass, to finally merging the change into the codebase). While the process is optimized with automated systems analyzing the code before the review (notably automatic code formatting without human intervention), code reviews still cost thousands of developer-years per year.

### 2.2 Best Practices

A **best practice** is a specific use of programming language that is considered superior, and a **best practice document** describes how it should be applied and what benefits it brings. **Best practice URL** refers to a best practice document or specific section therein, and **best practice violation** refers to a specific piece of code that does not adhere to a best practice, but can be changed to do so.

Google's central code repository contains code in many languages, with C++, Java, Python and Go exceeding 100 million lines each. For 15 different languages there are formal style guides readily available to all developers.

A formal mechanism called "readability", introduced more than a decade ago, ensures that best practices are followed consistently. Dedicated style experts in a given language, called "readability mentors", guide inexperienced developers towards proficiency in the language.

## 3. Approach

### 3.1 Model and Task Definition

Automating best practice analysis requires a model that can represent source code, pinpoint violation locations, and identify the violated best practice. We target a text-to-text transformation using a traditional transformer approach based on T5, using T5X.

For the best practice analysis, the **input** to the model is a task prompt and source code, and the **target** is a source code location and a URL for a best practice violation. The task prompt is formatted as a fixed-text code comment, using the programming language's appropriate commenting style.

**Example Input (Go language):**
```go
// [*] Task: Check language best practices.
// Package addition provides Add
package addition

// Return a sum
func Add(value1, value2 int) int {
    return value1 + value2
}
```

**Target:**
```
INSERT 153 COMMENT https://go.dev/doc/comment#func
```

The target gives the location (byte offset 153 corresponds to the start of the Add function) and a go.dev URL, pointing to the exact part of the Go language style guide that the function comment violates.

### 3.2 Model Training

The model-training pipeline consists of three parts:

1. **Large-scale preprocessing (periodic)**: Identifies relevant code comments—human authored comments that contain a URL pointing to a best practice document. For each comment, collects the corresponding source code and relevant metadata.

2. **Dataset curation (on demand)**: Converts each relevant code comment into the standard TensorFlow Example data structure.

3. **Training and fine-tuning (on demand)**: Uses the T5X framework on a fleet of TPUs, storing model checkpoints every 1000 steps.

### 3.3 Model Selection

Two intrinsic evaluations on historical data inform selection of a model checkpoint, confidence thresholds, and a decoding strategy:

1. Evaluation on validation and test datasets (provides estimates of precision and recall on a per-file basis)
2. Evaluation on full historical code reviews (provides estimate of total number of comments per code review)

### 3.4 Inference Infrastructure

The core of AutoCommenter is a central best practice analysis service. This service takes as input one or more source files for analysis. For each file, it constructs a model input, encodes it in the standard TensorFlow Example data structure, and queries the model.

### 3.5 IDE and Code Review Integration

Developers interact with AutoCommenter's analysis service in two ways:
- Directly through an IDE plugin
- Indirectly through the code review system

AutoCommenter's comments appear in the IDE as diagnostics marked with a blue curly underline, spanning the relevant code snippet. In the code review system, AutoCommenter runs after each update, automatically posting comments if it detects any violations.

## 4. Deployment

AutoCommenter was deployed to all developers at Google over a period of time between July 2022 and October 2023:

- Until Jul. 2022—teamfooding: the paper's authors
- Jul. 2022—early adopters: around 3 thousand volunteers
- Jul. 2023—A/B experiment: about half of all developers
- Since Oct. 2023—general availability: all developers

### 4.1 Selecting Threshold and Decoding Strategy

**Threshold**: Initial deployment started with a high confidence threshold of t = 0.98. Per-URL thresholds were implemented based on the intrinsic evaluation on the validation dataset.

**Decoding**: Beam search (generating n = 4 potential responses) tripled the posting frequency to 3.9% and yielded substantially higher URL diversity: the 10 most-frequently posted URLs accounted for 41% of all comments, compared to 80% for greedy search.

### 4.2 Suppressing Outdated Best Practices

As languages evolve, or new libraries are introduced, best practices evolve as well. Suppression of specific best-practice predictions, using conditional filtering (matching regular expressions on the source code) was implemented because:
1. It can be dynamically deployed and immediately applied
2. It allows for granular filtering of predictions

### 4.3 Independent Rating of Selected Comments

An independent human rating study in April 2023 analyzed around 370 posted comments. The useful ratio from the rater evaluation was 60%, slightly higher than the 54% from developer feedback.

**Patterns of not useful comments identified:**
- Several topics or complex topic
- Importance of high-quality summaries
- Subjective and potentially contentious topic
- Systematic model error for some guidelines
- Correct but low-value comments

### 4.4 A/B Experiment

In July 2023, AutoCommenter was deployed to about half of all developers in an A/B experiment. Results showed:
- No statistically significant change in: total duration of code reviews, time actively spent on code review, number of comment-response iterations
- A slight improvement in coding speed

## 5. Evaluation

### 5.1 Comment Resolution

Analysis of 6000 snapshot pairs revealed that in 50% of cases the comment was absent from the submitted snapshot on the lines it was originally posted. Manual inspection found that in 80% of these cases, a change made by the author directly resolved the issue. Therefore, the estimated comment-resolution rate is about 40%.

### 5.2 AutoCommenter vs. Human Comments

AutoCommenter has created comments for 330 distinct URLs. The set of URLs used by AutoCommenter covers 68% of historical human comments with a best practice URL. The top-85 URLs make up 90% of comments created by AutoCommenter.

### 5.3 AutoCommenter vs. Linters

For 33/50 (66%) of the top-50 most frequently predicted best practices, violation detection is beyond the scope of traditional static analysis.

Distribution by type:
- **Naming**: Mostly not lintable
- **Language**: Mixed
- **Formatting**: Mostly lintable
- **Documentation**: Mixed
- **Code idioms**: Mostly not lintable

## 6. Lessons Learned

- **Complementing traditional analyses**: AutoCommenter's LLM-backed approach generates comments for 68% of best practices frequently referenced by human reviewers. Many of these are out of scope for traditional static analyses.

- **Intrinsic evaluation vs. real-world performance**: Intrinsic evaluations and real-world performance can diverge significantly. Extrinsic evaluations and system improvements proved essential for successful deployment.

- **Monitoring user acceptance is critical**: Even a few negative user experiences can erode trust in an automated system. Continuously monitoring and analyzing real-world feedback was crucial. A simple suppression mechanism was sufficient to strongly improve user acceptance to over 80% without major sacrifices in efficacy.

## 7. Related Work

Johnson introduced the C linter almost 50 years ago in 1977. A recent literature review identified 17,571 papers on automated static analysis. Using machine learning for code analysis is a comparatively new and less understood field.

## 8. Conclusion

This paper reports on experience developing, deploying, and evaluating AutoCommenter, an LLM-backed code review assistant system. The evaluation results show that it is feasible to develop an end-to-end system with capabilities well beyond traditional tools while achieving a high degree of end-user acceptance.

The priority was to ensure a positive developer experience by designing AutoCommenter to have very high precision. Future work will explore what changes in the model and system architecture can improve recall, particularly leveraging current state of the art models with context windows of tens of thousands of tokens during training and over a million tokens during inference.
