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
| `/split-youtube-chapters` | 레거시 | 기존 단일 파일 마이그레이션용 |

---

### YouTube 콘텐츠 전체 파이프라인

YouTube 영상은 다음 순서로 처리합니다. 챕터가 있는 경우 **자동으로 분리**됩니다.

```
1. /fetch-reading <youtube-url>
   → 챕터 있음: docs/week{N}/{slug}/ 디렉토리 생성
       ├── _index.md (인덱스)
       ├── introduction.md (챕터 1)
       ├── tokenization.md (챕터 2)
       └── ... (N개 챕터)
   → 챕터 없음: docs/week{N}/{slug}.md (단일 파일)

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
```

**새로운 방식의 장점**:
- fetch 단계에서 자동 분리 → 챕터별 번역 품질 향상
- 각 챕터가 독립 파일 → 병렬 번역 가능
- `/split-youtube-chapters` 스킬 불필요 (자동화됨)

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
**출력**: `docs/week{N}/{slug}.md`

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

**입력**: `docs/week{N}/{slug}.md`
**출력**: `docs/week{N}/kr/{slug}.md`

---

### `/upload-reading` - 웹 게시

**위치**: `.claude/skills/upload-reading/`

번역된 마크다운을 파싱하여 웹사이트에 게시합니다.

```bash
/upload-reading week1/how-openai-uses-codex
/upload-reading week1/slug --publish  # 즉시 공개
```

**동작**:
1. `docs/week{N}/kr/{slug}.md` 파싱
2. `ReadingContent` 객체 생성
3. `src/content/readings.ts` 업데이트
4. `src/content/syllabus.ts`에 `krSlug`, `translationStatus` 추가

**입력**: `docs/week{N}/kr/{slug}.md`
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

**입력**: `docs/week{N}/{slug}.md`
**출력**:
- 기본: `.claude/outputs/nanobanana/week{N}/{slug}-cheatsheet-prompt.md`
- `--per-chapter`: `.claude/outputs/nanobanana/week{N}/{slug}/{childSlug}-cheatsheet-prompt.md`

**옵션**:
- `--per-chapter`: YouTube 챕터별로 개별 프롬프트 생성 (긴 영상 권장)

---

### `/split-youtube-chapters` - YouTube 챕터 분리 (레거시)

> **Note**: 새로운 `/fetch-reading`은 챕터를 **자동 분리**합니다.
> 이 스킬은 기존 단일 파일 → 챕터별 파일 **마이그레이션** 용도로만 사용하세요.

**위치**: `.claude/skills/split-youtube-chapters/`

기존 단일 파일 형태의 YouTube 콘텐츠를 챕터별 하위페이지로 분리합니다.

```bash
# 기존 파일을 챕터별로 분리 (마이그레이션)
/split-youtube-chapters week1/deep-dive-llms
/split-youtube-chapters week1/deep-dive-llms --overwrite  # 기존 파일 덮어쓰기
```

**사용 시점**:
- 기존 `docs/week{N}/{slug}.md` (단일 파일)이 있는 경우
- 새로 fetch하지 않고 기존 데이터를 분리하고 싶을 때

**권장 방식** (새 콘텐츠):
```bash
# fetch 단계에서 자동 분리 (권장)
/fetch-reading <youtube-url>
# → docs/week{N}/{slug}/ 디렉토리로 자동 생성
```
