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
| `/fetch-reading` | 🟢 완료 | URL에서 원본 수집 → `docs/week{N}/{slug}.md` |
| `/translate-reading` | 🟢 완료 | 한국어 번역 → `docs/week{N}/kr/{slug}.md` |
| `/upload-reading` | 🟢 완료 | 웹 게시 → `readings.ts` + `syllabus.ts` 업데이트 |

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
