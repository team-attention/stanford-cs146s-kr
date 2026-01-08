# fetch-reading Skill

URL에서 reading 콘텐츠를 수집하여 마크다운 파일로 저장합니다.

## 사용법

```
/fetch-reading <url>
/fetch-reading <url> --week <N>
/fetch-reading <local-file.pdf>
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
- WebFetch로 영상 페이지 접근
- 제목, 설명, 길이 등 메타데이터 추출
- transcript가 있으면 포함 (선택적)

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

#### 일반 문서 (웹, GitHub, YouTube)

```markdown
---
title: "문서 제목"
source_url: "https://..."
source_type: youtube | web | github
author: "저자명"
fetch_date: "YYYY-MM-DD"
translation_status: none
---

# 문서 제목

[원본 링크](https://...)

## 본문

(수집된 콘텐츠)
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

- 경로: `docs/week{N}/{slug}.md`
- 기존 파일이 있으면 덮어쓰기 전 확인

### 5. INDEX.md 업데이트

- `docs/week{N}/INDEX.md`의 수집 상태 업데이트
- `docs/INDEX.md`의 통계 업데이트

## 예시

### 웹 문서 수집
```
/fetch-reading https://stytch.com/blog/model-context-protocol-introduction/
```
결과: `docs/week2/mcp-introduction.md` 생성

### PDF 수집 (로컬)
```
/fetch-reading how-openai-uses-codex.pdf
```
결과: `docs/week1/how-openai-uses-codex.md` 생성

### Week 지정
```
/fetch-reading https://some-url.com/article --week 3
```
결과: `docs/week3/` 디렉토리에 저장

## 참고 파일

- `src/content/syllabus.ts`: URL-Week 매핑
- `docs/INDEX.md`: 전체 진행 상황
- `docs/week{N}/INDEX.md`: 주차별 상세

## 출력

수집 완료 후 표시:
- 생성된 파일 경로
- 콘텐츠 길이 (글자 수)
- 다음 단계 안내 (`/translate-reading` 명령어)
