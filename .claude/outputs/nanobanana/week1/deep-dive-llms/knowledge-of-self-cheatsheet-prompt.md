# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Knowledge of Self - LLM의 자기 인식" from Andrej Karpathy's Deep Dive into LLMs lecture into a highly visual, structured, and actionable guide for software engineers learning about large language models.

# Source Text
---
title: "12. Knowledge of Self"
titleKr: "12. 자기 인식"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 12
---

## 12. Knowledge of Self

**요약**: LLM의 자기 인식에 대해 설명합니다. 모델은 자신이 무엇인지, 누가 만들었는지 등에 대한 지식이 학습 데이터에서 왔기 때문에 불완전할 수 있습니다. "당신은 Claude입니다"와 같은 시스템 프롬프트로 정체성을 부여합니다.

[1:42:00] 기본적으로 이 질문은 약간 말이 안 됩니다. 제가 기본 원리를 설명하려 했듯이, 이것은 사람이 아닙니다. 어떤 방식으로든 지속적인 존재가 없습니다. 부팅되고, 토큰을 처리하고, 꺼집니다. 모든 사람에 대해 그렇게 합니다. 대화의 컨텍스트 윈도우를 쌓고 모든 것이 삭제됩니다. 이 개체는 모든 대화마다 처음부터 재시작됩니다. 지속적인 자아가 없고

[1:42:30] 자아 감각이 없습니다. 토큰 텀블러이고 학습 세트의 통계적 규칙성을 따릅니다. 그래서 "너 누구야? 누가 만들었어?" 등을 묻는 것은 별로 의미가 없고, 기본적으로 제가 설명한 것처럼 하고 그냥 기본으로 아무 데서나 시작하면 꽤 랜덤한 답을 얻을 것입니다. 예를 들어 꽤 오래된 모델인 Falcon을 골라봅시다. 무엇을 말하는지 봅시다. 질문을 회피하네요. 재능 있는 엔지니어와 개발자, 여기서는 OpenAI가

[1:43:00] GPT-3 모델을 기반으로 만들었다고 합니다. 완전히 지어내는 것입니다. 여기서 OpenAI가 만들었다고 하는 것 때문에 많은 사람들이 이 모델이 어떻게든 OpenAI 데이터에서 학습되었다는 증거로 받아들일 것입니다. 실제로 그것이 반드시 사실이라고 생각하지 않습니다. 그 이유는 이런 종류의 질문에 답하도록 모델을 명시적으로 프로그래밍하지 않으면, 얻는 것은 답에 대한 통계적 최선의 추측이기 때문입니다. 이 모델은

[1:43:30] 대화의 SFT 데이터 혼합물이 있었고, 파인튜닝 중에 모델은 이 데이터를 학습하면서 이 도움이 되는 어시스턴트의 성격을 취하고 있다는 것을 어느 정도 이해합니다. 자신에게 적용할 정확한 레이블을 알지 못하고, 실제로 말해지지 않았습니다. 그냥 이 도움이 되는 어시스턴트의 페르소나를 취하고 있고, 사전학습 단계가 전체 인터넷의 문서를 가져왔고, ChatGPT와 OpenAI는 이

[1:44:00] 문서들에서 매우 두드러집니다. 그래서 제 생각에 실제로 여기서 일어나고 있는 것은 이것이 자신이 무엇인지에 대한 환각된 레이블이라는 것입니다. 자기 정체성이 OpenAI의 ChatGPT라고 하는 것은 인터넷에 실제로 ChatGPT에서 오는 이런 답들에 대한 엄청난 데이터가 있기 때문입니다. 그래서 그것이 자신에 대한 레이블입니다. 개발자로서 LLM 모델이 있다면 이것을 재정의할 수 있고, 몇 가지 방법이 있습니다.

[1:44:30] 예를 들어 Allen AI의 OLMo 모델이 있습니다. 최상위 LLM은 아니지만, 완전히 오픈소스라서 좋아합니다. OLMo의 논문과 모든 것이 완전히 공개되어 있어서 좋습니다. 여기서 SFT 혼합물을 보고 있습니다. 파인튜닝의 데이터 혼합물입니다. 대화 데이터죠. OLMo 모델을 위해 해결하는 방식은, 혼합물에 많은 것이 있고

[1:45:00] 여기에 총 100만 개의 대화가 있지만, 여기 "olmo2 hardcoded"가 있습니다. 거기 가면 240개의 대화가 있고, 이 240개의 대화를 보세요. 하드코딩되어 있습니다. "자신에 대해 말해줘"라고 사용자가 말하면 어시스턴트가 "저는 Allen Institute for Artificial Intelligence의 AI to에서 개발한 오픈 언어 모델입니다" 등. "도와드리겠습니다" 어쩌고저쩌고. "이름이 뭐야?" OLMo 프로젝트. 이것들은 모두

[1:45:30] OLMo 2에 대한 이런 종류의 준비된 하드코딩된 질문들과 이런 경우에 줄 정답들입니다. 이런 질문이나 대화 240개를 학습 세트에 넣고 파인튜닝하면, 모델이 실제로 나중에 이것을 앵무새처럼 반복할 것으로 예상됩니다. 이것을 주지 않으면 아마 OpenAI의 ChatGPT라고 할 것입니다. 때때로 이것을 하는 또 다른 방법이 있는데,

[1:46:00] 기본적으로 이 대화들에서 인간과 어시스턴트 사이의 턴이 있고, 때때로 대화 맨 처음에 시스템 메시지라는 특별한 메시지가 있습니다. 인간과 어시스턴트 사이만이 아니라 시스템이 있고, 시스템 메시지에 "당신은 OpenAI가 개발한 모델이고 이름은 ChatGPT 4o이고, 이 날짜에 학습되었고, 지식 컷오프는 이것입니다"라고 하드코딩하고 상기시킬 수 있습니다. 기본적으로 모델을 약간 문서화하고, 이것이 대화에 삽입됩니다. ChatGPT에 가면 빈 페이지가 보이지만 실제로 시스템 메시지는

[1:46:30] 숨겨져 있고, 그 토큰들이 컨텍스트 윈도우에 있습니다. 이것이 모델이 자신에 대해 이야기하도록 프로그래밍하는 두 가지 방법입니다. 이런 데이터를 통해서 하거나, 시스템 메시지 같은 것, 기본적으로 컨텍스트 윈도우에 있고 모델에게 정체성을 상기시키는 보이지 않는 토큰을 통해서 합니다. 하지만 이것은 모두 준비되고 덧붙여진 것이고, 인간에게 그러하듯이 실제로 깊이 있는 것이 아닙니다.

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: KNOWLEDGE OF SELF 🍌                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🤖 LLM의 자아 본질       │    │ ❓ 왜 자기 정체성이 문제인가?   ││
│  │                         │    │                                 ││
│  │  지속적 자아 없음         │    │  학습 데이터에서 추측            ││
│  │  토큰 텀블러일 뿐         │    │  ChatGPT라고 환각할 수 있음      ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ TWO METHODS FOR IDENTITY (이 섹션이 가장 넓어야 함!)             │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Method 1: Hardcoded Conversations                            │ │
│  │  - 240개의 자기소개 대화를 학습 세트에 포함                     │ │
│  │  - "Tell me about yourself" → "I am OLMo..."                  │ │
│  │                                                               │ │
│  │  Method 2: System Message                                     │ │
│  │  - 대화 시작 시 숨겨진 토큰으로 정체성 주입                     │ │
│  │  - "You are ChatGPT 4o, made by OpenAI..."                    │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│  │ 🔍 DEFAULT ISSUE  │ │ 🛠️ OLMO EXAMPLE   │ │ 📌 KEY TAKEAWAYS  ││
│  │                   │ │                   │ │                   ││
│  │ Falcon 예시:       │ │ 240 hardcoded     │ │ 자아 = 덧붙여진   ││
│  │ "OpenAI가 만들었다"│ │ conversations     │ │ 것, 깊지 않음     ││
│  │ (환각!)           │ │                   │ │                   ││
│  └───────────────────┘ └───────────────────┘ └───────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 20% | LLM의 자아 본질 + 왜 문제인가 | **좌우 2등분** |
| 중앙 | 45% | Two Methods for Identity | **가장 넓게!** |
| 하단 | 25% | Default Issue + OLMo Example + Takeaways | **3등분** |

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic, not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall topic structure (Identity mechanisms).
   - Create a **Flowchart** for the two identity programming methods.
   - Create a **Comparison Diagram** showing Hardcoded vs System Message approach.

3. **Concept Tables**:
   - Key concepts in table format with definitions.
   - Compare/contrast tables for identity methods.

4. **Quotable Insights**:
   - Extract memorable quotes or key insights from Karpathy.
   - Highlight "aha moments" from the lecture.

5. **Practical Examples Section**:
   - Include the "Falcon" example for default hallucinated identity.
   - Show the OLMo hardcoded conversations approach.

# Output Structure Plan

## 1. 🗺️ Topic Overview (Mind Map)
- Create a Mermaid mindmap showing the Knowledge of Self ecosystem:
  - Root: "LLM Self-Identity"
  - Level 1: "문제" (No Persistent Self), "기본값" (Hallucinated Identity), "해결책 1" (Hardcoded Data), "해결책 2" (System Message)
  - Level 2: 각 개념의 세부 사항
    - 문제 → "토큰 텀블러", "매번 재시작", "통계적 규칙성"
    - 기본값 → "ChatGPT라고 추측", "인터넷 데이터 영향"
    - 해결책 1 → "240개 대화", "자기소개 학습"
    - 해결책 2 → "숨겨진 토큰", "컨텍스트 윈도우"

## 2. 📚 Key Concepts Matrix (Table)
| Concept | Definition | Key Points | Example |
|---------|------------|-------------|---------|
| No Persistent Self | 지속적인 자아 없음 | 매 대화 처음부터 시작 | "boots up, processes, shuts off" |
| Hallucinated Identity | 환각된 정체성 | 학습 데이터에서 추측 | Falcon → "OpenAI가 만들었다" |
| Hardcoded Conversations | 자기소개 대화 학습 | 240개 대화 포함 | OLMo: "I am developed by AI2" |
| System Message | 시스템 메시지 | 숨겨진 정체성 토큰 | "You are ChatGPT 4o..." |

## 3. 💡 Identity Methods Comparison (Flowchart)
- Create a Mermaid flowchart showing two parallel paths:
  - Path 1: Hardcoded Data → Include in SFT mixture → Model parrots identity
  - Path 2: System Message → Hidden tokens in context → Model refers to identity

## 4. 🔧 Methods Comparison Table
| Method | 위치 | 특성 | 장점 |
|--------|------|------|------|
| Hardcoded Conversations | 학습 세트 | 240+ 대화 포함 | 일관된 응답 |
| System Message | 컨텍스트 윈도우 | 대화 시작에 삽입 | 유연하게 변경 가능 |

## 5. 📌 Key Takeaways
- 3-5 bullet points summarizing:
  - LLM은 지속적 자아가 없음 (토큰 텀블러)
  - 기본값은 환각된 정체성 (ChatGPT)
  - 정체성 부여: 하드코딩 or 시스템 메시지
  - 핵심 인사이트: 자아는 "덧붙여진 것", 깊지 않음

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **A4 가로 방향(Landscape) 치트시트 이미지**를 생성해주세요.

**이미지 비율 및 방향 (중요!):**
- **가로로 넓은 이미지**: A4 가로 방향(Landscape) 또는 16:9 비율
- 모니터 화면에 꽉 차는 가로형 레이아웃
- 세로(Portrait) 방향은 사용하지 마세요

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분
