---
name: fetch-reading
description: |
  URL에서 reading 콘텐츠를 수집하여 마크다운 파일로 저장합니다.
  YouTube, PDF, GitHub, 웹 문서 등 다양한 소스 지원.
  사용: /fetch-reading <url>
arguments:
  - name: url
    description: 수집할 URL 또는 로컬 PDF 파일 경로
    required: true
  - name: week
    description: Week 번호 직접 지정 (미지정 시 syllabus.ts에서 추론)
    required: false
  - name: parent
    description: 부모 Reading slug (계층적 구조용, 예: prompt-engineering-guide)
    required: false
  - name: child
    description: 자식 페이지 slug (--parent와 함께 사용, 예: zeroshot)
    required: false
---

# fetch-reading Skill

URL에서 reading 콘텐츠를 수집하여 마크다운 파일로 저장합니다.

## 사용법

```
# 단일 페이지 (기존)
/fetch-reading <url>
/fetch-reading <url> --week <N>
/fetch-reading <local-file.pdf>

# 계층적 구조 (부모-자식)
/fetch-reading <url> --parent <parent-slug> --child <child-slug>
/fetch-reading <url> --week 1 --parent prompt-engineering-guide --child zeroshot
```

## 동작 흐름

### 1. URL/파일 분석

1. 입력 유형 판별:
   - YouTube URL (`youtube.com`, `youtu.be`)
   - PDF URL (`.pdf` 확장자) 또는 로컬 PDF 파일
   - GitHub URL (`github.com`)
   - 일반 웹 URL

2. Week 번호 결정:
   - `--week` 파라미터가 있으면 사용
   - 없으면 `src/content/syllabus.ts`에서 URL 매칭하여 추론

3. Slug 생성:
   - syllabus.ts의 title에서 생성
   - 소문자, 공백→하이픈, 특수문자 제거
   - 예: "Deep Dive into LLMs" → `deep-dive-llms`

### 2. 콘텐츠 수집 (유형별)

#### YouTube 영상

YouTube URL인 경우 yt-dlp를 사용하여 메타데이터, 챕터, 자막을 추출합니다.

##### YouTube 챕터별 처리 워크플로우

```
YouTube URL 입력
    │
    ▼
┌──────────────────────────────────────┐
│ yt-dlp --dump-json으로 메타데이터 추출 │
│ - title: 영상 제목                    │
│ - uploader: 채널명 (저자)             │
│ - duration: 영상 길이                 │
│ - chapters: 챕터 배열                 │
│ - description: 영상 설명 (백업용)     │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ 챕터 정보 확보                        │
│ - yt-dlp chapters 배열 우선 사용      │
│ - 없으면 description에서 타임스탬프 파싱│
│ - 둘 다 없으면 사용자에게 확인        │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ 자막 다운로드 (VTT)                   │
│ - 수동 영어 자막 우선                 │
│ - 자동생성 자막 fallback              │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ 챕터별 자막 분할                      │
│ - 각 챕터의 start_time/end_time 기준  │
│ - 타임스탬프 [HH:MM:SS] 형태로 보존   │
└──────────────────────────────────────┘
    │
    ▼ (각 챕터마다 반복)
┌──────────────────────────────────────┐
│ Task: youtube-chapter-processor       │
│ - 자막 텍스트 정리 (중복 제거)        │
│ - 챕터 요약 생성 (1-2문장)            │
│ - has_meaningful_content 판단         │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ 챕터별 콘텐츠 병합                    │
│ ## 1. 챕터명, ## 2. 챕터명 ... 형태   │
│ (has_meaningful_content=false는 제외) │
└──────────────────────────────────────┘
```

##### YouTube 처리 실행 지침

1. **메타데이터 추출**: yt-dlp로 영상 정보 가져오기
   ```bash
   yt-dlp --dump-json <URL>
   ```

2. **챕터 정보 확보**:
   - yt-dlp `chapters` 배열 확인
   - 없으면 `description`에서 타임스탬프 패턴 파싱 (예: `0:00`, `1:23:45`)
   - 둘 다 없으면 사용자에게 확인:
     ```
     이 영상에는 챕터가 없습니다. 어떻게 처리할까요?
     1. 수동으로 분할점 입력 (예: "10:00, 25:30, 45:00")
     2. 전체를 하나의 섹션으로 처리
     3. 시간 기준 자동 분할 (예: 10분 단위)
     ```

3. **자막 다운로드**:
   ```bash
   yt-dlp --write-subs --write-auto-subs \
     --sub-langs "en" --sub-format "vtt" \
     --skip-download \
     -o "docs/week{N}/media/{slug}" \
     <URL>
   ```

4. **챕터별 자막 분할**: 각 챕터의 시작/종료 시간 기준으로 VTT 자막 분할

5. **챕터별 검증**: 각 챕터에 대해 Task tool 호출
   ```
   Task tool 호출:
   - subagent_type: "general-purpose"
   - prompt: ".claude/agents/fetch-reading/youtube-chapter-processor.md 에이전트 지침에 따라
             챕터의 자막을 검증하고 정제하세요.

             챕터 번호: N
             챕터 제목: "Introduction"
             시작 시간: 0:00
             종료 시간: 1:00
             자막:
             (해당 구간 자막 텍스트)"
   - description: "YouTube 챕터 N 검증"
   ```

6. **결과 병합**:
   - `has_meaningful_content: true`인 챕터만 `## N. 챕터명` 형태로 병합
   - `has_meaningful_content: false`인 챕터는 제외
   - 목차(Table of Contents) 생성

##### 챕터 데이터 구조

yt-dlp가 반환하는 chapters 배열:
```json
{
  "chapters": [
    {"start_time": 0.0, "title": "Introduction", "end_time": 60.0},
    {"start_time": 60.0, "title": "Pretraining Data", "end_time": 467.0}
  ]
}
```

##### Description에서 챕터 파싱

description에 타임스탬프가 있는 경우 파싱:
```
0:00 Introduction
1:00 Pretraining Data (Internet)
7:47 Tokenization
```

정규식 패턴: `(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)`

#### PDF 문서
- 로컬 파일: Read 도구로 직접 읽기
- 원격 URL: WebFetch로 다운로드 후 Read
- Claude의 PDF 읽기 기능으로 **페이지별** 텍스트 추출
- 각 페이지마다 page-content-validator 에이전트로 정제

##### PDF 페이지별 처리 워크플로우

```
PDF 파일 읽기
    │
    ▼
┌──────────────────────────────────────┐
│ 페이지별 텍스트 분리                  │
│ [Page 1], [Page 2] ... 마커 기준     │
└──────────────────────────────────────┘
    │
    ▼ (각 페이지마다 반복)
┌──────────────────────────────────────┐
│ Task: page-content-validator         │
│ - OCR 노이즈 제거                    │
│ - 페이지 번호 제거                   │
│ - 무관한 텍스트 제거                 │
│ - has_meaningful_content 판단        │
└──────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────────────┐
│ 페이지별 콘텐츠 병합                  │
│ ## Page 1, ## Page 2 ... 형태로 구성 │
│ (has_meaningful_content=false는 제외)│
└──────────────────────────────────────┘
```

##### PDF 처리 실행 지침

1. **PDF 읽기**: Read 도구로 PDF 파일 전체 읽기
2. **페이지 분리**: `[Page N]` 마커를 기준으로 각 페이지 텍스트 분리
3. **페이지별 검증**: 각 페이지에 대해 Task tool 호출
   ```
   Task tool 호출:
   - subagent_type: "general-purpose"
   - prompt: ".claude/agents/fetch-reading/page-content-validator.md 에이전트 지침에 따라
             페이지 N의 텍스트를 검증하고 정제하세요.

             페이지 번호: N
             텍스트:
             (해당 페이지 텍스트)"
   - description: "PDF 페이지 N 검증"
   ```
4. **결과 병합**:
   - `has_meaningful_content: true`인 페이지만 `## Page N` 형태로 병합
   - `has_meaningful_content: false`인 페이지는 제외
5. **목차 생성**: 마지막에 각 페이지 요약으로 목차 생성

#### GitHub 문서
- `github.com` → `raw.githubusercontent.com` URL 변환
- WebFetch로 마크다운/텍스트 직접 수집
- 이미지 링크는 절대 경로로 변환

#### 일반 웹 문서
- WebFetch로 HTML 수집
- 본문 추출 및 마크다운 변환
- 코드 블록, 리스트, 헤딩 구조 보존

### 3. 마크다운 파일 생성

#### 일반 문서 (웹, GitHub)

```markdown
---
title: "문서 제목"
source_url: "https://..."
source_type: web | github
author: "저자명"
fetch_date: "YYYY-MM-DD"
translation_status: none
---

# 문서 제목

[원본 링크](https://...)

## 본문

(수집된 콘텐츠)
```

#### YouTube 영상 (챕터별 구조)

```markdown
---
title: "영상 제목"
source_url: "https://youtube.com/..."
source_type: youtube_transcript
author: "채널명"
duration: "3:31:05"
fetch_date: "YYYY-MM-DD"
translation_status: none
audio_file: "media/{slug}.mp3"
chapters: 24
---

# 영상 제목

[원본 영상](https://youtube.com/...)

## Table of Contents

1. [Introduction](#1-introduction) (0:00)
2. [Pretraining Data (Internet)](#2-pretraining-data-internet) (1:00)
3. [Tokenization](#3-tokenization) (7:47)
...

---

## 1. Introduction

**요약**: ChatGPT와 같은 대규모 언어 모델에 대한 포괄적인 소개...

[0:00] hi everyone so I've wanted to make this video for a while...
[0:30] what should we be putting there and what are these words...

---

## 2. Pretraining Data (Internet)

**요약**: LLM 사전학습의 첫 단계인 인터넷 데이터 수집 설명...

[1:00] the tools okay so let's build Chachi PT...
```

#### PDF 문서 (페이지별 구조)

```markdown
---
title: "문서 제목"
source_url: "https://..."
source_type: pdf
author: "저자명"
fetch_date: "YYYY-MM-DD"
translation_status: none
total_pages: 5
meaningful_pages: 4
---

# 문서 제목

[원본 링크](https://...)

---

## Page 1

(페이지 1 정제된 콘텐츠)

---

## Page 2

(페이지 2 정제된 콘텐츠)

---

## Page 3

(페이지 3 정제된 콘텐츠)

---

## Contents

| Page | Summary |
|------|---------|
| 1 | 소개 및 개요 |
| 2 | Use Case 1: 코드 이해 |
| 3 | Use Case 2: 리팩터링 |
```

### 4. 파일 저장

**단일 페이지 (기존)**:
- 경로: `docs/week{N}/{slug}.md`

**계층적 구조 (--parent, --child 사용 시)**:
- 경로: `docs/week{N}/{parent-slug}/{child-slug}.md`
- 부모 디렉토리가 없으면 자동 생성

**예시**:
```
# 단일 페이지
docs/week1/deep-dive-llms.md

# 계층적 구조
docs/week1/prompt-engineering-guide/
├── zeroshot.md
├── fewshot.md
├── cot.md
└── kr/
    ├── zeroshot.md
    └── fewshot.md
```

- 기존 파일이 있으면 덮어쓰기 전 확인

### 5. INDEX.md 업데이트

- `docs/week{N}/INDEX.md`의 수집 상태 업데이트
- `docs/INDEX.md`의 통계 업데이트

## 예시

### 단일 페이지 수집

**웹 문서**:
```
/fetch-reading https://stytch.com/blog/model-context-protocol-introduction/
```
결과: `docs/week2/mcp-introduction.md` 생성

**PDF (로컬)**:
```
/fetch-reading how-openai-uses-codex.pdf
```
결과: `docs/week1/how-openai-uses-codex.md` 생성

**Week 지정**:
```
/fetch-reading https://some-url.com/article --week 3
```
결과: `docs/week3/` 디렉토리에 저장

### 계층적 구조 수집 (부모-자식)

**자식 페이지 수집**:
```
/fetch-reading https://www.promptingguide.ai/techniques/zeroshot --week 1 --parent prompt-engineering-guide --child zeroshot
```
결과: `docs/week1/prompt-engineering-guide/zeroshot.md` 생성

**여러 자식 순차 수집**:
```
/fetch-reading https://www.promptingguide.ai/techniques/fewshot --week 1 --parent prompt-engineering-guide --child fewshot
/fetch-reading https://www.promptingguide.ai/techniques/cot --week 1 --parent prompt-engineering-guide --child cot
```

## 참고 파일

- `src/content/syllabus.ts`: URL-Week 매핑
- `docs/INDEX.md`: 전체 진행 상황
- `docs/week{N}/INDEX.md`: 주차별 상세

## 출력

수집 완료 후 표시:
- 생성된 파일 경로
- 콘텐츠 길이 (글자 수)
- 다음 단계 안내:
  - 단일 페이지: `/translate-reading week{N}/{slug}`
  - 자식 페이지: `/translate-reading week{N}/{parent-slug}/{child-slug}`
