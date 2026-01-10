# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Tokenization Revisited: Models Struggle with Spelling" into a highly visual, structured, and actionable guide for software engineers learning about LLM limitations.

# Source Text
---
title: "14. Tokenization Revisited: Models Struggle with Spelling"
titleKr: "14. 토큰화 재방문: 철자 문제"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 14
totalChapters: 24
---

# 14. 토큰화 재방문: 철자 문제

> 원본 강의: "Deep Dive into LLMs like ChatGPT" by Andrej Karpathy
> 챕터 14/24

## 전체 강의 요약 (TL;DR)

이 3시간 30분짜리 강의에서 안드레이 카르파티는 ChatGPT 같은 대규모 언어 모델(LLM)이 어떻게 만들어지고 작동하는지 처음부터 끝까지 설명합니다. **사전학습**(인터넷 데이터 학습), **지도학습 미세조정**(대화 데이터로 어시스턴트 만들기), **강화학습**(성능 최적화)의 세 단계를 거쳐 LLM이 탄생합니다.

## 이 챕터 요약

토큰화가 철자 처리에 미치는 영향입니다.

**핵심 포인트:**
- 모델은 글자가 아닌 토큰 단위로 봄
- "strawberry"에서 r 세기 어려움
- 코드 도구로 우회 가능

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: TOKENIZATION & SPELLING 🍌              │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🔤 ROOT CAUSE           │    │ 👁️ HUMAN vs MODEL PERCEPTION   ││
│  │                         │    │                                 ││
│  │  모델은 글자가 아닌        │    │  인간: 글자 단위                  ││
│  │  토큰 단위로 텍스트 인식    │    │  LLM: 토큰 단위 (3개 토큰으로 봄)  ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ PROBLEM-SOLUTION FLOW (이 섹션이 가장 넓어야 함!)                 │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Flowchart: 사용자 질문 → 모델 직접 처리 → 실패?                │ │
│  │            → "use code" 지시 → Python 활용 → 성공!             │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│  │ 🍓 STRAWBERRY     │ │ ⚡ WORKAROUND     │ │ 📌 KEY TAKEAWAYS  ││
│  │                   │ │                   │ │                   ││
│  │ r 몇 개? → 실패    │ │ "use code" 패턴   │ │ 토큰화의 한계       ││
│  │ 오랜 SOTA 오류    │ │ Python에 위임     │ │ 구조적 문제         ││
│  └───────────────────┘ └───────────────────┘ └───────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 25% | Root Cause + Human vs Model Perception | **좌우 2등분** |
| 중앙 | 40% | Problem-Solution Flowchart | **가장 넓게!** |
| 하단 | 25% | Strawberry Case + Workaround + Takeaways | **3등분** |

# Output Style: "Nano Banana" Cheat Sheet

## 1. 🗺️ Topic Overview (Mind Map)
- Create a Mermaid mindmap with the following structure:
  - Root: "Tokenization과 철자 문제"
  - Branch 1: "근본 원인" → "토큰 단위 인식", "글자 접근 불가"
  - Branch 2: "한계 사례" → "strawberry r 세기", "ubiquitous 글자 추출"
  - Branch 3: "우회 방법" → "코드 도구 활용", "Python 인터프리터"

## 2. 📚 Key Concepts Matrix (Table)
| 개념 | 정의 | 예시 | 관련 개념 |
|------|------|------|----------|
| Token | 모델이 인식하는 텍스트 청크 단위 | "ubiquitous" = 3 tokens | Character, Byte |
| Character-level Task | 개별 글자 단위 작업 | 매 3번째 글자 추출 | Spelling, Counting |
| Token World | 모델의 인식 체계 | 글자가 아닌 토큰으로 세상을 봄 | Tokenization |
| Tool Delegation | 한계 극복을 위해 외부 도구 활용 | Python으로 문자열 처리 | Code Interpreter |

## 3. 💡 Core Problem-Solution Flow (Flowchart)
```mermaid
flowchart TD
    A[사용자 질문: 철자/문자 관련] --> B[모델 직접 처리]
    B --> C{성공?}
    C -->|실패| D[토큰 한계로 오류]
    C -->|성공| E[결과 출력]
    D --> F["use code" 지시]
    F --> G[Python 인터프리터 활용]
    G --> E
## 4. 👁️ Human vs Model Perception (Comparison Table)
| 관점 | 인간 | LLM |
|------|------|-----|
| 텍스트 인식 단위 | 글자 (Character) | 토큰 (Token) |
| "ubiquitous" 인식 | 10개 글자로 봄 | 3개 토큰으로 봄 |
| 글자 접근성 | 시각적으로 즉시 접근 | 토큰에서 역추론 필요 |
| 글자 세기 | 직관적 | 토큰+카운팅 복합 난제 |

## 5. 🍓 Famous Case Study: Strawberry Problem
> "strawberry"에 r이 몇 개?
> - 오랫동안 SOTA 모델들이 "2개"라고 오답
> - 원인: 토큰 단위 인식 + 카운팅 어려움의 복합
> - 현재 상태: 하드코딩 의심, 이제 정답 출력

## 6. ⚡ Practical Workaround
# 철자/문자 관련 작업 시 권장 패턴
"use code" + [원하는 문자열 작업]

예시:
- "use code ubiquitous - print every third character starting with the first"
- "use code strawberry - count the letter 'r'"
## 7. 📌 Key Takeaways
- [ ] 모델은 글자(Character)가 아닌 토큰(Token) 단위로 텍스트를 인식
- [ ] 철자 관련 작업은 토큰화의 구조적 한계로 실패 가능성 높음
- [ ] "use code" 지시로 Python 인터프리터에 위임하면 정확한 결과 가능
- [ ] Strawberry 문제는 토큰 인식 + 카운팅 어려움의 복합 사례
- [ ] 토큰 효율성 vs 글자 수준 정확성은 현재 트레이드오프 관계

---
Please generate the Cheat Sheet now.

내가 말하는 cheat sheet는 보기 좋게 정리된, 실제 펜 노트필기 같은 이미지를 말하는거야.
용어 및 고유명사는 영어 원문을 쓰되(Tokenization, Token, Character, LLM, Python, Tik Tokenizer, OpenAI 등), 필기 내용은 한국어로 작성해.

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **가로 A4 한 장 분량의 치트시트 이미지**를 생성해주세요.

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분
