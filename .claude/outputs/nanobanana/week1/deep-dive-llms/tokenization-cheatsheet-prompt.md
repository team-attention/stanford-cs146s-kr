# Role Definition
You are an expert Technical Communicator and Information Architect specialized in creating "Nano Banana" style cheat sheets. Your goal is to restructure the provided text about "Tokenization" from Andrej Karpathy's Deep Dive into LLMs lecture into a highly visual, structured, and actionable guide for software engineers learning about large language models.

# Source Text
---
title: "3. Tokenization"
source_url: "https://www.youtube.com/watch?v=7xTGNNLPyMI"
source_type: youtube_transcript
author: "Andrej Karpathy"
parent: "deep-dive-llms"
chapter: 3
---

## 3. Tokenization

**요약**: 텍스트를 신경망에 입력하기 위해 토큰으로 변환하는 과정을 설명합니다. UTF-8 바이트에서 시작해 Byte Pair Encoding(BPE) 알고리즘을 사용하여 약 100,000개의 토큰 어휘를 생성하며, GPT-4는 100,277개의 토큰을 사용합니다.

[8:00] a one-dimensional sequence of symbols and they want a finite set of symbols that are possible and so we have to decide what are the symbols and then we have to represent our data as one-dimensional sequence of those symbols so right now what we have is a onedimensional sequence of text it starts here and it goes here and then it comes here Etc so this is a onedimensional sequence even though on my monitor of course it's laid out in a two-dimensional way but it goes from left to right and top to bottom right so

[8:30] it's a one-dimensional sequence of text now this being computers of course there's an underlying representation here so if I do what's called utf8 uh encode this text then I can get the raw bits that correspond to this text in the computer and that's what uh that looks like this so it turns out that for example this very first bar here is the first uh eight bits as an example so what is this thing right this

[9:00] is um representation that we are looking for uh in in a certain sense we have exactly two possible symbols zero and one and we have a very long sequence of it right now as it turns out um this sequence length is actually going to be very finite and precious resource uh in our neural network and we actually don't want extremely long sequences of just two symbols instead what we want is we want to trade off uh this um symbol

[9:30] size uh of this vocabulary as we call it and the resulting sequence length so we don't want just two symbols and extremely long sequences we're going to want more symbols and shorter sequences okay so one naive way of compressing or decreasing the length of our sequence here is to basically uh consider some group of consecutive bits for example eight bits and group them into a single what's called bite so because uh these

[10:00] bits are either on or off if we take a group of eight of them there turns out to be only 256 possible combinations of how these bits could be on or off and so therefore we can re repesent this sequence into a sequence of bytes instead so this sequence of bytes will be eight times shorter but now we have 256 possible symbols so every number here goes from 0 to 255 now I really encourage you to think of these not as numbers but as unique IDs or like unique symbols so maybe it's

[10:30] a bit more maybe it's better to actually think of these to replace every one of these with a unique Emoji you'd get something like this so um we basically have a sequence of emojis and there's 256 possible emojis you can think of it that way now it turns out that in production for state-of-the-art language models uh you actually want to go even Beyond this you want to continue to shrink the length of the sequence uh because again it is a precious resource in return for more symbols in your

[11:00] vocabulary and the way this is done is done by running what's called The Bite pair encoding algorithm and the way this works is we're basically looking for consecutive bytes or symbols that are very common so for example turns out that the sequence 116 followed by 32 is quite common and occurs very frequently so what we're going to do is we're going to group uh this um pair into a new symbol so we're going to Mint a symbol with an ID 256 and we're going to

[11:30] rewrite every single uh pair 11632 with this new symbol and then can we can iterate this algorithm as many times as we wish and each time when we mint a new symbol we're decreasing the length and we're increasing the symbol size and in practice it turns out that a pretty good setting of um the basically the vocabulary size turns out to be about 100,000 possible symbols so in particular GPT 4 uses 100, 277 symbols

[12:00] um and this process of converting from raw text into these symbols or as we call them tokens is the process called tokenization so let's now take a look at how gp4 performs tokenization conting from text to tokens and from tokens back to text and what this actually looks like so one website I like to use to explore these token representations is called tick tokenizer and so come here to the drop down and select CL 100 a

[12:30] base which is the gp4 base model tokenizer and here on the left you can put in text and it shows you the tokenization of that text so for example heo space world so hello world turns out to be exactly two Tokens The Token hello which is the token with ID 15339 and the token space world that is the token 1

[13:00] 1917 so um hello space world now if I was to join these two for example I'm going to get again two tokens but it's the token H followed by the token L world without the H um if I put in two Spa two spaces here between hello and world it's again a different uh tokenization there's a new token 220 here okay so you can play with this and see what happens here also keep in mind this is not uh this is case sensitive so

[13:30] if this is a capital H it is something else or if it's uh hello world then actually this ends up being three tokens tokens yeah so you can play with this and get an sort of like an intuitive sense of uh what these tokens work like we're actually going to loop around to tokenization a bit later in the video for now I just wanted to show you the website and I wanted to uh show you that this text basically at the end of the day so for example if I take one line

[14:00] here this is what GT4 will see it as so this text will be a sequence of length 62 this is the sequence here and this is how the chunks of text correspond to these symbols and again there's 100, 27777 possible symbols and we now have one-dimensional sequences of those symbols so um yeah we're going to come back to tokenization but that's uh for now where we are okay so what I've done

# Layout Structure (이 구조대로 배치해주세요)

**IMPORTANT**: 첨부된 이미지는 스타일(손필기 느낌, 모눈종이 배경, 아이콘)만 참조하세요. 레이아웃은 아래 지정된 구조를 따라 새로 만들어주세요.

```
┌─────────────────────────────────────────────────────────────────────┐
│  🍌 NANO BANANA CHEAT SHEET: TOKENIZATION 🍌                         │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────┐    ┌─────────────────────────────────┐│
│  │ 🔤 WHAT IS TOKENIZATION?│    │ 📊 TRADE-OFF                    ││
│  │                         │    │                                 ││
│  │  텍스트 → 토큰 변환       │    │  Vocabulary Size ↔ Seq Length   ││
│  │  LLM 입력의 첫 단계       │    │  2 symbols → 100K symbols       ││
│  │                         │    │                                 ││
│  └─────────────────────────┘    └─────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  ⚡ BPE ALGORITHM FLOW (이 섹션이 가장 넓어야 함!)                    │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                                                               │ │
│  │  Text → UTF-8 → Bits (2) → Bytes (256) → BPE → Tokens (100K)  │ │
│  │  Flowchart: Find common pairs → Mint new symbol → Iterate     │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐│
│  │ 🔢 ENCODING LEVELS│ │ 🔧 TIKTOKENIZER   │ │ 📌 KEY TAKEAWAYS  ││
│  │                   │ │                   │ │                   ││
│  │ Bit→Byte→Token    │ │ 예시: hello world │ │ GPT-4: 100,277    ││
│  │ 표로 비교          │ │ Case sensitive   │ │ 토큰 vocab size    ││
│  └───────────────────┘ └───────────────────┘ └───────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 배치 비율

| 영역 | 비율 | 내용 | 배치 |
|------|------|------|------|
| 상단 | 10% | 타이틀 | 전체 너비 |
| 중상단 | 20% | What is Tokenization + Trade-off | **좌우 2등분** |
| 중앙 | 45% | BPE Algorithm Flow | **가장 넓게!** |
| 하단 | 25% | Encoding Levels + Tiktokenizer + Takeaways | **3등분** |

# Output Style: "Nano Banana" Cheat Sheet
Please adhere to the following formatting rules strictly:

1. **Visual Hierarchy & Structure**:
   - Use strict Markdown structure.
   - Use specific emojis for every section header to improve scanning.
   - Use **Bold** for key concepts and definitions.
   - Group by topic, not by timeline.

2. **Diagrams & Schematics (CRITICAL)**:
   - Use `mermaid` code blocks to visualize concepts.
   - Create a **Mind Map** for the overall topic structure (Tokenization ecosystem).
   - Create a **Flowchart** for the encoding process (Text → UTF-8 → Bytes → BPE → Tokens).
   - Create a **Comparison Diagram** showing the trade-off between vocabulary size and sequence length.

3. **Concept Tables**:
   - Key concepts in table format with definitions.
   - Compare/contrast tables for encoding levels (Bits, Bytes, Tokens).

4. **Quotable Insights**:
   - Extract memorable quotes or key insights from Karpathy.
   - Highlight "aha moments" from the lecture.

5. **Practical Demo Section**:
   - Include tiktokenizer examples.
   - Show tokenization variations (case sensitivity, spacing).

# Output Structure Plan

## 1. 🗺️ Topic Overview (Mind Map)
- Create a Mermaid mindmap showing the Tokenization ecosystem:
  - Root: "Tokenization"
  - Level 1: "Input" (Text, 1D Sequence), "Encoding" (UTF-8, Bits, Bytes), "Algorithm" (BPE), "Output" (Tokens, Vocabulary)
  - Level 2: 각 개념의 세부 사항
    - Input → "1D Sequence", "Left-to-Right"
    - Encoding → "UTF-8", "8 bits = 1 byte", "256 symbols"
    - Algorithm → "Find common pairs", "Mint new symbols", "Iterate"
    - Output → "~100K vocab", "GPT-4: 100,277 tokens"

## 2. 📚 Key Concepts Matrix (Table)
| Concept | Definition | Key Numbers | Related To |
|---------|------------|-------------|------------|
| Bit | 0 또는 1의 최소 단위 | 2 symbols | Byte의 구성 요소 |
| Byte | 8 bits의 그룹 | 256 symbols (0-255) | UTF-8 encoding |
| Token | BPE로 생성된 최종 심볼 | ~100K vocabulary | LLM 입력 단위 |
| UTF-8 | 텍스트를 바이트로 인코딩 | 8x shorter than bits | 표준 텍스트 인코딩 |
| BPE | Byte Pair Encoding 알고리즘 | Iterative merging | Vocabulary 생성 |
| Vocabulary | 가능한 모든 토큰의 집합 | GPT-4: 100,277 | 모델 설계 요소 |

## 3. 💡 Core Process (Flowchart)
- Create a Mermaid flowchart showing the tokenization pipeline:

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
