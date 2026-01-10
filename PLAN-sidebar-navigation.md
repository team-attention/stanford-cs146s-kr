# Prompt Engineering Guide 좌측 사이드바 구현 계획

## 목표
원본 사이트(promptingguide.ai)처럼 좌측 고정 사이드바로 18개 기법을 탐색할 수 있도록 구현

## 현재 상태
- `readings.ts`: 18개 children 정의 완료
- `App.tsx`: `/readings/:week/:slug/:childSlug` 라우트 추가 완료
- `ReadingPage.tsx`: 부모/자식 페이지 분기 처리 완료
- 좌측 사이드바 없음 (카드 리스트 + 이전/다음 버튼만)

## 구현 단계

### 1. 사이드바 컴포넌트 생성
- `src/components/reading/ReadingSidebar.tsx` 생성
- Props: `children`, `currentSlug`, `parentSlug`, `week`
- 18개 링크 렌더링, 현재 페이지 하이라이트
- 반응형: 모바일에서는 햄버거 메뉴 또는 숨김

### 2. 레이아웃 수정
- `ReadingPage.tsx`의 `ChildReadingPage` 컴포넌트 수정
- 2컬럼 레이아웃: `flex` 또는 `grid`
- 좌측 사이드바 고정 (sticky)
- 우측 본문 스크롤

### 3. 스타일링
```
┌────────────────────────────────────────┐
│ Header (breadcrumb, title)             │
├────────────┬───────────────────────────┤
│ Sidebar    │ Content                   │
│ (sticky)   │ (scrollable)              │
│ ────────── │                           │
│ 1. Zero ✓  │ ## Zero-shot Prompting    │
│ 2. Few     │                           │
│ 3. CoT     │ 본문 내용...              │
│ ...        │                           │
│            ├───────────────────────────┤
│            │ ← 이전        다음 →      │
└────────────┴───────────────────────────┘
```

### 4. 반응형 처리
- Desktop (md 이상): 좌측 사이드바 표시
- Mobile: 상단 드롭다운 또는 접을 수 있는 메뉴

### 5. 마크다운 콘텐츠 로딩 (별도 작업)
- `react-markdown` 또는 유사 라이브러리
- `docs/week1/kr/prompt-engineering-guide/{slug}.md` 파일 로드
- 또는 `readings.ts`에 sections 직접 정의

## 파일 변경 목록
1. `src/components/reading/ReadingSidebar.tsx` (신규)
2. `src/pages/ReadingPage.tsx` (수정 - ChildReadingPage 레이아웃)
3. `src/index.css` 또는 Tailwind 클래스 (스타일 추가)

## 실행 명령
```bash
# 새 세션에서 실행
claude --resume 또는 새 세션 시작
# 이 파일 참조: PLAN-sidebar-navigation.md
```
