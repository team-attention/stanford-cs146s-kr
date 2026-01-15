# Stanford CS146S Korean Edition

Stanford University의 "The Modern Software Developer" 강좌를 한국어로 번역하여 제공하는 웹 플랫폼입니다.

## 프로젝트 개요

- **URL**: https://kr.themodernsoftware.dev
- **원본**: Stanford CS146S by Mihail Eric
- **목적**: AI 지원 개발(Coding with LLMs) 교육 콘텐츠 한국어 번역

## 기술 스택

- **Framework**: React 19 + TypeScript
- **Build**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **Deploy**: Vercel (서울 리전)
- **Package Manager**: pnpm

## 프로젝트 구조

```
src/
├── components/
│   ├── layout/     # Layout, Header, Footer, TabNav
│   ├── home/       # CourseDescription, InfoGrid, TeamGrid, TranslatorGrid
│   ├── syllabus/   # WeekCard, ReadingList, LectureList
│   └── faq/        # FaqAccordion
├── pages/          # HomePage, ReadingPage
├── content/        # syllabus.ts, readings.ts, faq.ts
└── types/          # TypeScript 인터페이스
```

## docs 디렉토리 구조

Reading 콘텐츠는 eng/kr 폴더로 원본과 번역을 분리합니다.

```
docs/week{N}/{slug}/
├── eng/                      # 원본 (영어)
│   ├── index.md              # 단일 페이지
│   ├── _index.md             # 부모 인덱스 (챕터 있는 경우)
│   └── {child}.md            # 챕터/자식 페이지
├── kr/                       # 번역본 (한국어)
│   ├── index.md
│   ├── _index.md
│   └── {child}.md
└── media/                    # 원본 미디어 파일
    ├── *.vtt                 # YouTube 자막
    └── *.pdf                 # PDF 원본
```

### 파일명 규칙

| 콘텐츠 유형 | 원본 | 번역 |
|------------|------|------|
| 단일 페이지 | `{slug}/eng/index.md` | `{slug}/kr/index.md` |
| 부모 인덱스 | `{slug}/eng/_index.md` | `{slug}/kr/_index.md` |
| 챕터/자식 | `{slug}/eng/{child}.md` | `{slug}/kr/{child}.md` |

### 미디어 파일

각 콘텐츠의 원본 미디어는 `{slug}/media/` 폴더에 저장:
- YouTube VTT 자막: `{slug}/media/{slug}.en.vtt`
- PDF 원본: `{slug}/media/original.pdf`

## 주요 명령어

```bash
pnpm dev      # 개발 서버 시작
pnpm build    # TypeScript 체크 + 프로덕션 빌드
pnpm lint     # ESLint 검사
pnpm preview  # 빌드 결과 미리보기
```

## 개발 가이드라인

### 컴포넌트 작성

- 모든 컴포넌트는 TypeScript로 작성
- Props는 인터페이스로 정의
- 경로 임포트는 `@/` alias 사용 (예: `@/components/layout/Header`)

### 스타일링

- Tailwind CSS 유틸리티 클래스 사용
- 커스텀 색상은 index.css의 CSS 변수 사용:
  - `--color-stanford-red`: #8B0000 (Stanford 공식 색상)
  - `--color-kr-accent`: #0066CC (한국어 강조)

### 콘텐츠 추가

- 새 Reading 번역: `src/content/readings.ts`에 추가
- 강의 정보 수정: `src/content/syllabus.ts` 수정
- FAQ 추가: `src/content/faq.ts` 수정

### 번역 상태 관리

`TranslationStatus` 타입 사용:
- `complete`: 번역 완료 (한국어 링크 활성화)
- `in_progress`: 번역 중 ("번역중" 라벨)
- `none`: 예정 ("예정" 라벨)

## 라우팅

- `/`: 메인 페이지 (Overview, Syllabus, FAQ 탭)
- `/readings/week/:week/:slug`: Reading 상세 페이지

## 배포

main 브랜치에 push하면 Vercel에서 자동 배포됩니다.

## 커밋 메시지

Conventional Commits 형식을 따릅니다:
- `feat:` 새 기능
- `fix:` 버그 수정
- `refactor:` 리팩토링
- `docs:` 문서 수정
- `style:` 스타일 수정

## 주의사항

- TypeScript strict 모드 활성화됨 - 타입 에러 해결 필수
- 빌드 전 `pnpm lint` 실행 권장
- 한글 콘텐츠 작성 시 맞춤법 검토
- **대량 한글 파일 수정 시 Write 도구 사용** - Edit 도구는 UTF-8 한글 3바이트 경계 오류 발생 가능

---

## 작업 완료 후 검증 및 커밋 워크플로우

코드나 문서 수정 작업을 완료한 후 다음 순서를 따릅니다:

1. **수정사항 재검증**
   - 수정한 파일의 내용이 올바른지 확인
   - 번역 파일의 경우 포맷과 마크다운 구문 검증
   - 코드 파일의 경우 `pnpm build` 및 `pnpm lint` 실행

2. **검증 완료 후 커밋 스킬 실행**
   - 검증이 완료되면 `/commit` 스킬을 실행하여 변경사항 커밋
   - 커밋 메시지는 conventional commit 형식 준수

---

## 번역 워크플로우

Reading 콘텐츠의 수집 → 번역 → 웹 게시를 3단계 스킬로 자동화합니다.

```
/fetch-reading <url>          # 1. 원본 수집
        ↓
/translate-reading <week/slug> # 2. 한국어 번역
        ↓
/upload-reading <week/slug>    # 3. 웹 게시
```

### 진행 상황

| 스킬 | 상태 | 설명 |
|------|------|------|
| `/fetch-reading` | 완료 | URL에서 원본 수집 (YouTube 챕터 자동 분리) |
| `/translate-reading` | 완료 | 한국어 번역 (`--all-chapters` 지원) |
| `/upload-reading` | 완료 | 웹 게시 → `readings.ts` + `syllabus.ts` 업데이트 |
| `/nanobanana` | 완료 | 치트시트 프롬프트 생성 (`--per-chapter` 지원) |
| `/publish-cheatsheet` | 완료 | 치트시트 이미지 게시 |
| `/review-translation` | 완료 | 번역 품질 AI 검증 (Claude, Codex, Gemini 교차 검증) |
| `/review-cheatsheet` | 완료 | 치트시트 이미지 검증 (Gemini Vision API) |
| `/eval-summary` | 완료 | readings.ts 요약 필드 품질 검증 및 수정 |
| `/commit` | 완료 | 커밋 메시지 자동 생성, 사용자 확인 후 커밋 |
| `/create-pr` | 완료 | GitHub PR 생성, fork 워크플로우 지원 |

---

### YouTube 콘텐츠 전체 파이프라인

YouTube 영상은 다음 순서로 처리합니다. 챕터가 있는 경우 **자동으로 분리**됩니다.

```
1. /fetch-reading <youtube-url>
   → 챕터 있음: docs/week{N}/{slug}/ 디렉토리 생성
       ├── eng/                    # 원본 (영어)
       │   ├── _index.md (인덱스)
       │   ├── introduction.md (챕터 1)
       │   ├── tokenization.md (챕터 2)
       │   └── ... (N개 챕터)
       ├── kr/                     # 번역 시 생성
       └── media/                  # 원본 미디어 (VTT 자막 등)
   → 챕터 없음: docs/week{N}/{slug}/eng/index.md (폴더 구조)

2. /translate-reading week{N}/{slug} --all-chapters
   → docs/week{N}/{slug}/kr/*.md (챕터별 번역)
   또는 개별 챕터만:
   /translate-reading week{N}/{slug}/tokenization

3. /upload-reading week{N}/{slug} --all-chapters
   → readings.ts (isParent + children 자동 생성)
   → syllabus.ts 업데이트
   → public/readings/... 동기화

4. /nanobanana week{N}/{slug} --per-chapter
   → .claude/outputs/nanobanana/week{N}/{slug}/*.md (챕터별 프롬프트)

5. (수동) 나노바나나에서 치트시트 생성 후 이미지 저장
   → public/cheatsheets/week{N}/{slug}/*.png

6. /publish-cheatsheet week{N}/{slug}/{childSlug}
   → readings.ts에 cheatsheetImage 필드 추가

7. /review-cheatsheet week{N}/{slug}/{childSlug}
   → 치트시트 이미지와 kr md 파일 일치 여부 검증
```

**개별 챕터 작업 예시**:
```bash
# 특정 챕터만 번역
/translate-reading week1/deep-dive-llms/tokenization

# 특정 챕터만 게시
/upload-reading week1/deep-dive-llms/tokenization

# 특정 챕터 치트시트
/nanobanana week1/deep-dive-llms/tokenization
```

---

### `/fetch-reading` - 원본 수집

**위치**: `.claude/skills/fetch-reading/`

URL에서 Reading 콘텐츠를 수집하여 마크다운으로 저장합니다.

```bash
/fetch-reading https://youtube.com/watch?v=...
/fetch-reading https://example.com/article.pdf
/fetch-reading local-file.pdf --week 2
```

**지원 형식**: YouTube, PDF, GitHub, 일반 웹
**출력**: `docs/week{N}/{slug}/eng/index.md` (모든 콘텐츠는 eng/kr 폴더 구조)

---

### `/translate-reading` - 한국어 번역

**위치**: `.claude/skills/translate-reading/`

6단계 에이전트 파이프라인으로 고품질 번역을 수행합니다.

```bash
/translate-reading week1/how-openai-uses-codex
/translate-reading week1/slug --skip-qa      # QA 스킵
/translate-reading week1/slug --refine-only  # 기존 번역 개선만
```

**워크플로우**:
```
terminology-lookup → translator → refiner(1차) → validator → refiner(2차) → qa → refiner(3차)
```

**에이전트 파일** (`.claude/agents/translate-reading/`):
- `terminology-lookup.md`: 용어집에 없는 용어 웹검색
- `translator.md`: 영어→한국어 초벌 번역
- `translation-refiner.md`: 번역체 정리 (3회 호출)
- `translation-validator.md`: 누락/오역 검증
- `translation-qa.md`: 최종 품질 검증
- `translation-summarizer.md`: YouTube 요약 생성
- `summary-regenerator.md`: 요약 섹션 재생성 (풍부화)

**입력**: `docs/week{N}/{slug}/eng/index.md`
**출력**: `docs/week{N}/{slug}/kr/index.md`

**YouTube 콘텐츠 번역 규칙**:
- 타임스탬프 `[MM:SS]` 형식은 제거하고 산문체로 통합
- `## 전체 번역` 섹션만 수정, 다른 섹션(요약, 핵심 개념)은 유지
- 잘린 문장은 자연스럽게 연결

---

### `/upload-reading` - 웹 게시

**위치**: `.claude/skills/upload-reading/`

번역된 마크다운을 파싱하여 웹사이트에 게시합니다.

```bash
/upload-reading week1/how-openai-uses-codex
/upload-reading week1/slug --publish  # 즉시 공개
```

**동작**:
1. `docs/week{N}/{slug}/kr/index.md` 파싱
2. `ReadingContent` 객체 생성
3. `src/content/readings.ts` 업데이트
4. `src/content/syllabus.ts`에 `krSlug`, `translationStatus` 추가

**입력**: `docs/week{N}/{slug}/kr/index.md`
**출력**: `readings.ts`, `syllabus.ts` 자동 수정

**옵션**:
- `--publish`: `published: true`로 즉시 공개
- `--draft` (기본): `published: false`로 저장

---

### `/nanobanana` - 치트시트 프롬프트 생성

**위치**: `.claude/skills/nanobanana/`

Reading 원문에서 나노바나나 프로용 치트시트 프롬프트를 생성합니다.

```bash
/nanobanana week1/how-openai-uses-codex           # 전체 콘텐츠
/nanobanana week1/deep-dive-llms --per-chapter    # 챕터별 프롬프트
```

**워크플로우**:
```
content-analyzer → structure-planner → prompt-generator
```

**에이전트 파일** (`.claude/agents/nanobanana/`):
- `content-analyzer.md`: 콘텐츠 유형 판별, 핵심 요소 추출
- `structure-planner.md`: 치트시트 구조 설계
- `prompt-generator.md`: 최종 프롬프트 생성

**템플릿 파일** (`.claude/templates/nanobanana/`):
- `use-case-style.md`: 사례 중심 콘텐츠용
- `tutorial-style.md`: 튜토리얼/가이드용
- `lecture-style.md`: 강의 콘텐츠용

**입력**: `docs/week{N}/{slug}/eng/index.md`
**출력**:
- 기본: `.claude/outputs/nanobanana/week{N}/{slug}-cheatsheet-prompt.md`
- `--per-chapter`: `.claude/outputs/nanobanana/week{N}/{slug}/{childSlug}-cheatsheet-prompt.md`

**옵션**:
- `--per-chapter`: YouTube 챕터별로 개별 프롬프트 생성 (긴 영상 권장)

---

### `/review-cheatsheet` - 치트시트 이미지 검증

**위치**: `.claude/skills/review-cheatsheet/`

나노바나나에서 생성한 치트시트 이미지를 Gemini Vision API로 분석하여
해당 kr md 파일의 내용과 일치하는지 검증합니다.

```bash
/review-cheatsheet week1/deep-dive-llms/tokenization
/review-cheatsheet week1/how-openai-uses-codex
```

**워크플로우**:
```
이미지 → Gemini Vision 분석 → kr md 비교 → 리포트 생성
```

**검증 항목**:
- 텍스트 정확성: 이미지 내 텍스트가 md 파일 내용과 일치하는지
- 기술적 정확성: 수치, 용어, 개념이 올바른지
- 문맥적 일관성: 그래프/다이어그램이 설명과 맞는지

**입력**:
- 이미지: `public/cheatsheets/week{N}/{slug}/{chapter}.png`
- 문서: `docs/week{N}/{slug}/kr/{chapter}.md`

**출력**:
- `.claude/outputs/review-cheatsheet/week{N}/{slug}/{chapter}-gemini-analysis.json`
- `.claude/outputs/review-cheatsheet/week{N}/{slug}/{chapter}-review-report.md`

**요구사항**:
- Python 패키지: `google-generativeai`
- 환경변수: `.env` 파일에 `GOOGLE_API_KEY` 설정
- API 키 발급: https://aistudio.google.com/app/apikey

---

### `/eval-summary` - 요약 필드 품질 검증

**위치**: `.claude/skills/eval-summary/`

readings.ts의 요약 필드가 원본 kr 마크다운과 비교하여 잘 작성되었는지 평가합니다.
이슈별로 개선사항을 제안하고 사용자 컨펌 후 readings.ts를 수정합니다.

```bash
# 주차 전체 검증
/eval-summary week1

# 개별 리딩 검증
/eval-summary week1/deep-dive-llms

# 옵션
/eval-summary week1 --skip-apply    # 리포트만 생성
/eval-summary week1 --auto-apply    # 자동 적용
```

**워크플로우**:
```
readings.ts 요약 필드 추출 → kr 마크다운 로드 → summary-evaluator 에이전트 호출
→ 이슈별 사용자 컨펌 → readings.ts 수정
```

**검증 대상 필드**:
- `tldr`: TL;DR 전체 요약
- `learningGoals`: 학습 목표 배열
- `chapterSummaries`: 챕터별 요약
- `motivation`: 동기부여 섹션
- `keyTakeaways`: 핵심 요점

**검증 기준**:
- 정확성: 원문 내용을 정확히 반영하는가
- 완전성: 중요한 내용이 누락되지 않았는가
- 간결성: 불필요하게 길거나 중복되지 않았는가
- 일관성: 용어와 어조가 일관되는가

**입력**:
- `src/content/readings.ts`
- `docs/week{N}/{slug}/kr/index.md` 또는 `_index.md`

**출력**:
- `.claude/outputs/eval-summary/week{N}/{slug}/evaluation-report.json`
- readings.ts 수정 (사용자 컨펌 후)
