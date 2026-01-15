---
name: publish-cheatsheet
description: |
  나노바나나에서 생성된 치트시트 이미지를 public에 복사하고
  readings.ts에 cheatsheetImage 필드를 추가합니다.
  사용: /publish-cheatsheet week1/slug
arguments:
  - name: path
    description: |
      week/slug 또는 week/parent/child 형식의 문서 경로
      - 단일 페이지: week1/how-openai-uses-codex
      - 계층 구조: week1/deep-dive-llms/tokenization
    required: true
  - name: image
    description: |
      치트시트 이미지 파일 경로 (절대 또는 상대 경로)
      지정하지 않으면 기본 경로에서 검색
    required: false
---

# publish-cheatsheet Skill

나노바나나에서 생성된 치트시트 이미지를 웹에 게시합니다.

## 사용법

```
/publish-cheatsheet <week/slug>
/publish-cheatsheet <week/slug> --image /path/to/cheatsheet.png
```

## 예시

```
# 단일 페이지 치트시트
/publish-cheatsheet week1/how-openai-uses-codex

# 챕터별 치트시트
/publish-cheatsheet week1/deep-dive-llms/tokenization

# 이미지 경로 직접 지정
/publish-cheatsheet week1/tokenization --image ~/Downloads/tokenization-cheatsheet.png
```

## 입출력

### 입력
- 치트시트 이미지 파일 (PNG, JPG, WebP)
- 기본 검색 경로:
  - `public/cheatsheets/week{N}/{slug}.png`
  - `~/Downloads/{slug}-cheatsheet.png`
  - `~/Downloads/{slug}.png`

### 출력
- `public/cheatsheets/week{N}/{slug}.png` (이미지 복사)
- `src/content/readings.ts` 업데이트 (cheatsheetImage 필드 추가)

## 워크플로우

```
/publish-cheatsheet week1/tokenization
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 이미지 파일 찾기                    │
│    - --image 옵션 확인                │
│    - 기본 경로들 순차 검색              │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. 이미지 파일 검증                    │
│    - 파일 존재 여부                    │
│    - 이미지 형식 확인 (PNG/JPG/WebP)   │
│    - 파일 크기 확인                    │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. public 디렉토리에 복사              │
│    public/cheatsheets/week{N}/{slug}.png│
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. readings.ts 업데이트               │
│    cheatsheetImage 필드 추가          │
└──────────────────────────────────────┘
           │
           ▼
        완료!
```

## 실행 지침

### Step 1: 경로 파싱

```
입력: week1/deep-dive-llms/tokenization
→ weekNum: 1
→ parentSlug: deep-dive-llms (있으면)
→ childSlug: tokenization (있으면)
→ slug: tokenization

입력: week1/how-openai-uses-codex
→ weekNum: 1
→ slug: how-openai-uses-codex
```

### Step 2: 이미지 파일 찾기

**--image 옵션 있으면**:
```
해당 경로 파일 존재 확인
없으면 에러: "❌ 이미지 파일을 찾을 수 없습니다: {경로}"
```

**--image 옵션 없으면** (기본 경로 검색):
```
순서대로 검색:
1. public/cheatsheets/week{N}/{slug}.png
2. public/cheatsheets/week{N}/{parentSlug}/{slug}.png (계층 구조일 때)
3. ~/Downloads/{slug}-cheatsheet.png
4. ~/Downloads/{slug}.png
5. /tmp/{slug}.png

모두 없으면:
  AskUserQuestion 도구로 이미지 경로 입력 요청
```

### Step 3: 이미지 검증

```bash
# 파일 형식 확인
file --mime-type {이미지_경로}
# 예상: image/png, image/jpeg, image/webp

# 파일 크기 확인 (경고용)
du -h {이미지_경로}
# 10MB 초과 시 경고
```

### Step 4: public 디렉토리 복사

```bash
# 디렉토리 생성
mkdir -p public/cheatsheets/week{N}/{parentSlug-if-any}/

# 이미지 복사
cp {소스_경로} public/cheatsheets/week{N}/{최종_경로}.png
```

**경로 규칙**:
- 단일 페이지: `public/cheatsheets/week{N}/{slug}.png`
- 챕터 페이지: `public/cheatsheets/week{N}/{parentSlug}/{childSlug}.png`

### Step 5: readings.ts 업데이트

**단일 페이지**:
```typescript
'week1/how-openai-uses-codex': {
  // ... 기존 필드들
  cheatsheetImage: '/cheatsheets/week1/how-openai-uses-codex.png',  // 추가
}
```

**챕터 페이지** (ChildReading):
```typescript
'week1/deep-dive-llms': {
  // ... 기존 필드들
  children: [
    {
      slug: 'tokenization',
      // ... 기존 필드들
      cheatsheetImage: '/cheatsheets/week1/deep-dive-llms/tokenization.png',  // 추가
    }
  ]
}
```

### Step 6: 완료 메시지

```
✅ 치트시트 게시 완료!

📸 이미지: public/cheatsheets/week1/deep-dive-llms/tokenization.png
📊 파일 크기: 2.3MB
🔗 웹 경로: /cheatsheets/week1/deep-dive-llms/tokenization.png

readings.ts 업데이트:
  - week1/deep-dive-llms 의 children[tokenization]
  - cheatsheetImage 필드 추가

다음 단계:
  pnpm dev → /readings/week1/deep-dive-llms/tokenization
```

## 에러 처리

| 상황 | 처리 |
|------|------|
| 이미지 파일 없음 | AskUserQuestion으로 경로 입력 요청 |
| 지원하지 않는 형식 | "❌ PNG, JPG, WebP만 지원합니다" |
| readings.ts에 항목 없음 | "❌ 먼저 /upload-reading을 실행하세요" |
| 10MB 초과 | "⚠️ 파일이 큽니다. 최적화 권장" |

## 이미지 권장 사양

| 항목 | 권장값 |
|------|--------|
| 형식 | PNG (투명 배경) 또는 WebP |
| 가로 비율 | 16:9 (landscape) |
| 해상도 | 1920x1080 이상 |
| 파일 크기 | 5MB 이하 |

## 참고

- 나노바나나 프로에서 치트시트 생성 후 다운로드
- 이미지 최적화: `pnpm exec squoosh-cli --webp auto {이미지}`
