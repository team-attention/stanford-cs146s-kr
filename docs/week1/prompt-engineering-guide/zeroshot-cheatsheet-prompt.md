# Role Definition

You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets.

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요. 이미지의 레이아웃을 그대로 복사하지 마세요.

Your goal is to restructure the provided text about "Zero-shot Prompting" into a highly visual, structured, and actionable guide for software engineers and AI practitioners.

# Source Text

---
title: "Zero-shot Prompting"
source_url: "https://www.promptingguide.ai/techniques/zeroshot"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Zero-shot Prompting

## Definition

Zero-shot prompting means that the prompt used to interact with the model won't contain examples or demonstrations. Modern LLMs like GPT-3.5 Turbo, GPT-4, and Claude 3 can perform tasks this way due to extensive training.

## How It Works

The model receives direct task instructions without demonstrations. For example, a sentiment classification prompt simply asks the model to categorize text as neutral, negative, or positive—the model understands the concept without needing labeled examples.

## Example

**Prompt:**
```
Classify the text into neutral, negative or positive.
Text: I think the vacation is okay.
Sentiment:
```

**Result:** Neutral

## Key Enablers

Two techniques have enhanced zero-shot capabilities:

1. **Instruction Tuning** - Fine-tuning models on instruction-described datasets improves zero-shot performance
2. **RLHF (Reinforcement Learning from Human Feedback)** - Aligns models with human preferences, powering models like ChatGPT

## When to Use Alternatives

When zero-shot approaches underperform, the guide recommends transitioning to few-shot prompting, which includes examples to guide the model's responses.

# Output Style: "Nano Banana" Cheat Sheet

**스타일**: 첨부 이미지 참조 (손필기, 모눈종이, 아이콘)
**레이아웃**: 아래 구조를 따라 새로 디자인

# Layout Structure (이 구조대로 배치해주세요)

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: ZERO-SHOT PROMPTING 🍌                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 WHAT IS ZERO-SHOT?  │    │ ⚙️ KEY ENABLERS                 ││
│  │                         │    │                                 ││
│  │ • Definition 박스       │    │  ┌───────────┐  ┌───────────┐  ││
│  │ • How It Works 설명     │    │  │Instruction│  │   RLHF    │  ││
│  │ • 핵심: 예시 없이 직접   │    │  │  Tuning   │  │           │  ││
│  │   지시만으로 작업 수행   │    │  └─────┬─────┘  └─────┬─────┘  ││
│  │                         │    │        └──────┬──────┘        ││
│  └─────────────────────────┘    │               ▼               ││
│                                  │      ┌─────────────┐         ││
│                                  │      │ Zero-shot   │         ││
│                                  │      │ Capability  │         ││
│                                  │      └─────────────┘         ││
│                                  └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ PROMPT EXAMPLES (이 섹션이 가장 넓어야 함 - 핵심!)              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ [Task Type]        │ [Prompt Template]           │ [Output]  │  │
│  ├────────────────────┼─────────────────────────────┼───────────┤  │
│  │ 🏷️ Classification  │ Classify into X, Y, Z...    │ Neutral   │  │
│  │ 📝 Summarization   │ Summarize in N sentences... │ Summary   │  │
│  │ 🌐 Translation     │ Translate to [lang]...      │ 번역문    │  │
│  │ ❓ Q&A             │ Answer based on context...  │ Answer    │  │
│  │ 🏢 NER             │ Extract entities from...    │ Entities  │  │
│  │ 💻 Code Gen        │ Write a function that...    │ Code      │  │
│  └──────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────┐  ┌───────────────────────────────┐│
│  │ 🎯 ZERO-SHOT vs FEW-SHOT   │  │ 🎓 KEY TAKEAWAYS              ││
│  │                             │  │                               ││
│  │ Zero-shot │ Few-shot       │  │ ✓ 예시 없이 직접 지시         ││
│  │ ──────────┼────────        │  │ ✓ Instruction Tuning+RLHF     ││
│  │ 예시 ❌   │ 예시 2-5개     │  │ ✓ 명확한 지시가 핵심          ││
│  │ 토큰 적음 │ 토큰 많음      │  │ ✓ 부족하면 Few-shot 전환      ││
│  │ 먼저시도! │ 실패시 전환    │  │                               ││
│  └─────────────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**배치 비율**:
- 상단 (20%): 타이틀
- 중상단 (25%): Definition + Key Enablers (좌우 분할)
- 중앙 (35%): Prompt Examples 표 (가장 넓게!)
- 하단 (20%): Comparison + Takeaways (좌우 분할)

# Content Details (레이아웃 각 섹션에 들어갈 내용)

## 📖 WHAT IS ZERO-SHOT? (좌측 상단)

**Definition Box:**
> "Zero-shot prompting means the prompt won't contain examples or demonstrations."

**핵심 포인트:**
- 예시(examples) 없이 직접 지시만으로 작업 수행
- GPT-4, Claude 3 등 현대 LLM이 지원
- 광범위한 사전 학습 덕분에 가능

## ⚙️ KEY ENABLERS (우측 상단)

**두 가지 핵심 기술을 다이어그램으로:**

```
┌─────────────────┐     ┌─────────────────┐
│  Instruction    │     │     RLHF        │
│    Tuning       │     │ (Reinforcement  │
│                 │     │  Learning from  │
│ 지시문 데이터셋  │     │ Human Feedback) │
│ Fine-tuning     │     │                 │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     ▼
            ┌─────────────────┐
            │   Zero-shot     │
            │   Capability    │
            │                 │
            │  예시 없이도    │
            │  작업 수행 가능  │
            └─────────────────┘
```

## ⚡ PROMPT EXAMPLES (중앙 - 가장 넓게!)

**6-8개 프롬프트 예시를 표로 정리:**

| Task Type | Prompt Template | Expected Output |
|-----------|-----------------|-----------------|
| 🏷️ **Classification** | `Classify the text into neutral, negative or positive.`<br>`Text: I think the vacation is okay.`<br>`Sentiment:` | Neutral |
| 📝 **Summarization** | `Summarize in 2-3 sentences.`<br>`Article: [content]`<br>`Summary:` | 요약문 |
| 🌐 **Translation** | `Translate to Korean.`<br>`Text: Zero-shot prompting allows...`<br>`Translation:` | 한국어 번역 |
| ❓ **Q&A** | `Answer based on context.`<br>`Context: [context]`<br>`Question: What is X?`<br>`Answer:` | 답변 |
| 🏢 **NER** | `Extract person names and orgs.`<br>`Text: Sam Altman leads OpenAI...`<br>`Entities:` | Sam Altman, OpenAI |
| 💻 **Code Gen** | `Write a Python function that calculates factorial.` | 코드 |
| 🎭 **Role-based** | `You are an expert moderator.`<br>`Classify as: spam, offensive, safe.`<br>`Comment: [content]` | Classification |
| 📋 **Structured** | `Extract and format as JSON:`<br>`- Product, Price, Rating`<br>`Text: [content]` | JSON |

## 🎯 ZERO-SHOT vs FEW-SHOT (좌측 하단)

| 비교 | Zero-shot | Few-shot |
|------|-----------|----------|
| 예시 | ❌ 없음 | ✅ 2-5개 |
| 토큰 | 적음 | 많음 |
| 비용 | 낮음 | 높음 |
| 적합 | 일반 작업 | 특수 작업 |
| **추천** | **먼저 시도!** | 실패 시 전환 |

## 🎓 KEY TAKEAWAYS (우측 하단)

- ✓ **Zero-shot = 예시 없이 직접 지시**
- ✓ **Instruction Tuning + RLHF가 핵심**
- ✓ **명확한 지시문이 성공의 열쇠**
- ✓ **성능 부족 시 → Few-shot 전환**
- ✓ **비용 효율적 (짧은 프롬프트)**

---

# Instructions

1. **스타일**: 첨부된 이미지의 손필기 느낌, 모눈종이 배경, 아이콘 스타일을 따라주세요.

2. **레이아웃**: 위의 ASCII 다이어그램 구조를 따라 새로 배치해주세요. 첨부 이미지의 레이아웃(마인드맵 중심)을 그대로 복사하지 마세요.

3. **언어**: 용어/고유명사는 영어(Zero-shot, Few-shot, Instruction Tuning, RLHF, LLM, GPT-4, Claude 3 등), 설명은 한국어.

4. **핵심**: **Prompt Examples 섹션을 가장 넓고 눈에 띄게** 배치해주세요. 이 콘텐츠의 핵심은 "실제 사용 가능한 프롬프트 예시"입니다.

Please generate the Cheat Sheet now.
