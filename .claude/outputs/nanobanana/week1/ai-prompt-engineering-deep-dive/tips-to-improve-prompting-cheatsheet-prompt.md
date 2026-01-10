# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Tips to Improve Prompting Skills" from Anthropic's roundtable discussion into a highly visual, structured, and actionable guide for software engineers learning about prompt engineering.

# Source Text
---
title: "8. Tips to improve prompting skills"
titleKr: "8. 프롬프팅 실력 향상 팁"
source_url: "https://www.youtube.com/watch?v=T9aRN5JkmL8"
source_type: youtube_transcript
author: "Anthropic"
parent: "ai-prompt-engineering-deep-dive"
chapter: 8
---

## 8. 프롬프팅 실력 향상 팁

**요약**: 각 전문가가 프롬프팅 실력 향상을 위한 한 가지 팁을 공유합니다.

**핵심 포인트:**
- Zack: 좋은 프롬프트와 모델 출력을 읽고 분석하기
- Amanda: 반복하고, 다른 사람에게 보여주고, 즐기기
- David: 모델이 못할 것 같은 가장 어려운 것에 도전하기
- 쉬운 것은 프롬프트 엔지니어가 필요 없음
- 실패해도 모델 작동 방식에 대해 많이 배움

**주요 인사이트:**
- "좋은 프롬프트를 볼 때마다 더 자세히 읽어봅니다. 무엇을 하는지, 왜 그런지 분석해보고 직접 테스트해봅니다." - Zack
- "정말 호기심이 있고 관심이 있고 재미있다고 느낀다면... 실제로 그걸 즐기기 때문에 잘하게 됩니다." - Amanda
- "모델이 할 수 있다고 생각하는 것의 경계를 밀어붙이는 무언가를 찾아보세요. 실패해도 모델이 어떻게 작동하는지에 대해 많이 배웁니다." - David

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: TIPS TO IMPROVE PROMPTING 🍌           │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 📖 TIP 1: READ & ANALYZE│    │ 🔄 TIP 2: ITERATE & SHARE       ││
│  │                         │    │                                 ││
│  │  좋은 프롬프트 읽기       │    │  반복하고                       ││
│  │  무엇을 하는지 분석       │    │  다른 사람에게 보여주고          ││
│  │  직접 테스트해보기        │    │  즐기기!                        ││
│  │  - Zack                 │    │  - Amanda                       ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ TIP 3: PUSH THE BOUNDARIES (이 섹션이 가장 넓어야 함!)           │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  🎯 모델이 못할 것 같은 가장 어려운 것에 도전하기 - David        │ │
│  │                                                               │ │
│  │  ✓ 쉬운 것은 PE가 필요 없음                                    │ │
│  │  ✓ 경계를 밀어붙여야 진짜 배움                                  │ │
│  │  ✓ 실패해도 모델 작동 방식을 이해하게 됨                        │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│  │ 💡 WHY IT WORKS   │ │ ⚠️ COMMON TRAP    │ │ 📌 KEY TAKEAWAYS  ││
│  │                   │ │                   │ │                   ││
│  │ 즐겨야 잘하게 됨   │ │ 쉬운 것만 하기    │ │ 읽기 + 반복       ││
│  │ 호기심이 핵심     │ │ → 신호 없음       │ │ + 경계 밀어붙이기  ││
│  └───────────────────┘ └───────────────────┘ └───────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 20% | Tip 1 + Tip 2 | **좌우 2등분** |
| 중앙 | 45% | Tip 3: Push the Boundaries | **가장 넓게!** |
| 하단 | 25% | Why It Works + Common Trap + Takeaways | **3등분** |

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic, not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create **Tip Cards** for each expert's advice.
   - Illustrate the **Growth Mindset** visually.

3. **Concept Tables**:
   - Key tips in table format with attribution.
   - Compare easy tasks vs challenging tasks for learning.

4. **Quotable Insights**:
   - Extract each expert's key tip as a quote.
   - Highlight David's "push the boundaries" philosophy.

# Output Structure Plan

## 1. 👥 Expert Tips Matrix
| Expert | Tip | Core Insight |
|--------|-----|--------------|
| Zack | 읽고 분석하기 | 좋은 프롬프트 → 왜 좋은지 분석 → 테스트 |
| Amanda | 반복 + 공유 + 즐기기 | 호기심과 재미가 실력으로 |
| David | 경계 밀어붙이기 | 어려운 것 도전 → 실패해도 배움 |

## 2. 📈 Learning Through Challenge
```
Easy Tasks: ──────> No Signal (PE 불필요)
Hard Tasks: ──────> Learn a lot (실패해도 배움)
           ↑
           경계 밀어붙이기
```

## 3. 🎯 Action Items
1. 좋은 프롬프트를 모아서 분석하기
2. 동료에게 프롬프트 보여주고 피드백 받기
3. "모델이 못할 것 같은" 도전적 과제 시도하기
4. 실패를 학습 기회로 활용하기

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **A4 한 장 분량의 치트시트 이미지**를 생성해주세요.

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분

**가로세로 비율**: 16:9 가로형 (Landscape orientation)
