---
name: review-cheatsheet
description: |
  나노바나나 치트시트 이미지를 Gemini Vision으로 분석하여
  해당 kr md 파일의 내용과 일치하는지 검증합니다.
  기술적/문맥적 오류, 잘못된 텍스트/그래프/그림을 찾아냅니다.
  사용: /review-cheatsheet week1/slug/chapter
arguments:
  - name: path
    description: |
      week/slug/chapter 형식의 문서 경로
      예: week1/deep-dive-llms/tokenization
    required: true
  - name: all
    description: week1의 모든 치트시트를 검증 (--all)
    required: false
---

# review-cheatsheet Skill

나노바나나 치트시트 이미지를 Gemini Vision API로 분석하여 원본 한국어 문서와 비교 검증합니다.

## 사용법

```
# 개별 챕터 검증
/review-cheatsheet week1/deep-dive-llms/tokenization

# 단일 페이지 검증
/review-cheatsheet week1/how-openai-uses-codex

# week1 전체 검증
/review-cheatsheet --all
```

## 입출력

### 입력 파일

| 파일 유형 | 경로 |
|----------|------|
| 치트시트 이미지 | `public/cheatsheets/week{N}/{slug}/{chapter}.png` |
| 한국어 번역 | `docs/week{N}/{slug}/kr/{chapter}.md` |

### 출력 파일

```
.claude/outputs/review-cheatsheet/
└── week{N}/{slug}/
    ├── {chapter}-gemini-analysis.json    # Gemini Vision 분석 결과
    └── {chapter}-review-report.md        # 검증 리포트
```

## 검증 항목

1. **텍스트 정확성**: 이미지 내 텍스트가 md 파일 내용과 일치하는지
2. **기술적 정확성**: 수치, 용어, 개념이 올바른지
3. **문맥적 일관성**: 그래프/다이어그램이 설명과 맞는지
4. **오탈자/오류**: 잘못된 텍스트, 깨진 문자 등

## 워크플로우

```
/review-cheatsheet week1/deep-dive-llms/tokenization
           │
           ▼
┌──────────────────────────────────────┐
│ 1. 파일 경로 확인                      │
│    - 치트시트: public/cheatsheets/... │
│    - kr md: docs/.../kr/*.md          │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 2. Gemini Vision API 호출             │
│    - 이미지 분석                       │
│    - 모든 텍스트/요소 추출             │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 3. md 파일과 비교 분석                 │
│    - Task agent로 비교                │
│    - 불일치/오류 탐지                  │
└──────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│ 4. 리포트 생성                         │
│    - 발견된 이슈 정리                  │
│    - 심각도 분류                       │
└──────────────────────────────────────┘
```

## 실행 지침

이 스킬이 호출되면 다음 단계를 따르세요.

### Step 1: 경로 파싱 및 파일 확인

```
경로 파싱:
- week1/deep-dive-llms/tokenization
  → week: 1
  → slug: deep-dive-llms
  → chapter: tokenization

파일 경로:
- 이미지: public/cheatsheets/week1/deep-dive-llms/tokenization.png
- kr md: docs/week1/deep-dive-llms/kr/tokenization.md

파일명 매핑 주의:
- 일부 파일명이 다를 수 있음
- 이미지: preview-of-things-to-come.png → md: preview-things-to-come.md
- 이미지: sft-to-rl.png → md: supervised-finetuning-to-rl.md
- 매핑 실패 시 Glob으로 유사 파일 검색
```

### Step 2: Gemini Vision API 호출

Python 스크립트로 Gemini Vision API를 호출합니다:

```bash
python3 << 'PYEOF'
import os
import json
from pathlib import Path

# .env 파일에서 API 키 로드
env_path = Path(".env")
if env_path.exists():
    for line in env_path.read_text().split('\n'):
        if '=' in line and not line.strip().startswith('#'):
            key, value = line.strip().split('=', 1)
            os.environ[key] = value

import warnings
warnings.filterwarnings('ignore')
import google.generativeai as genai

genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))

# 이미지 경로 (실제 경로로 대체)
image_path = Path("public/cheatsheets/week1/deep-dive-llms/tokenization.png")
image_data = image_path.read_bytes()

model = genai.GenerativeModel('gemini-2.0-flash')

prompt = """
이 치트시트 이미지를 분석해주세요. 다음 항목들을 JSON 형식으로 반환해주세요:

1. extracted_text: 이미지에서 추출한 모든 텍스트 (섹션별로 구분)
2. diagrams: 다이어그램/그래프 설명
3. technical_terms: 기술 용어 목록
4. numbers: 이미지에 나타난 모든 숫자/수치
5. potential_issues: 발견된 잠재적 오류나 이상한 점

JSON 형식으로만 답변해주세요.
"""

response = model.generate_content([prompt, {"mime_type": "image/png", "data": image_data}])
print(response.text)
PYEOF
```

결과를 `.claude/outputs/review-cheatsheet/week{N}/{slug}/{chapter}-gemini-analysis.json`에 저장합니다.

### Step 3: md 파일과 비교 분석

Task agent를 호출하여 비교 분석을 수행합니다:

```
Task tool 호출:
- subagent_type: "general-purpose"
- prompt: .claude/agents/review-cheatsheet/compare-analyzer.md 내용
         + Gemini 분석 결과 JSON
         + kr md 파일 내용
- description: "cheatsheet-compare - 치트시트 검증"
```

### Step 4: 리포트 생성

비교 분석 결과를 바탕으로 리포트를 생성합니다:

```markdown
# 치트시트 검증 리포트

## 문서 정보
- **경로**: week1/deep-dive-llms/tokenization
- **이미지**: public/cheatsheets/week1/deep-dive-llms/tokenization.png
- **검증일**: {날짜}

## 검증 결과 요약
| 항목 | 상태 | 비고 |
|------|------|------|
| 텍스트 정확성 | ✅/⚠️/❌ | {설명} |
| 기술적 정확성 | ✅/⚠️/❌ | {설명} |
| 문맥적 일관성 | ✅/⚠️/❌ | {설명} |

## 발견된 이슈

### Critical (즉시 수정 필요)
- {이슈 설명}

### Warning (확인 권장)
- {이슈 설명}

### Info (참고)
- {이슈 설명}

## 상세 비교

### 이미지 추출 텍스트
{Gemini가 추출한 텍스트}

### md 파일 핵심 내용
{kr md 파일의 요약/핵심 정리 섹션}

### 불일치 항목
{구체적인 불일치 내용}
```

Write tool로 `.claude/outputs/review-cheatsheet/week{N}/{slug}/{chapter}-review-report.md`에 저장합니다.

### Step 5: 결과 출력

```
✅ 치트시트 검증 완료!

📊 **검증 결과**: {전체 상태}

📋 **발견된 이슈**:
  - Critical: {N}건
  - Warning: {N}건
  - Info: {N}건

📁 **리포트 저장 위치**:
  .claude/outputs/review-cheatsheet/week1/deep-dive-llms/
  ├── tokenization-gemini-analysis.json
  └── tokenization-review-report.md

💡 **권장 조치**:
  {Critical 이슈가 있으면 수정 권장}
```

## --all 옵션

week1의 모든 치트시트를 순차적으로 검증합니다:

```
1. public/cheatsheets/week1/**/*.png 파일 목록 가져오기
2. 각 이미지에 대해 Step 1-5 반복
3. 전체 요약 리포트 생성: master-report.md
```

## 에러 처리

| 상황 | 처리 |
|------|------|
| 이미지 파일 없음 | "치트시트 이미지를 찾을 수 없습니다: {경로}" |
| md 파일 없음 | "한국어 번역 파일을 찾을 수 없습니다: {경로}" |
| API 키 없음 | ".env 파일에 GOOGLE_API_KEY를 설정해주세요" |
| API 오류 | 에러 메시지 출력 후 스킵 |

## 요구사항

- **Python 패키지**: `google-generativeai` (또는 `google-genai`)
- **환경변수**: `.env` 파일에 `GOOGLE_API_KEY` 설정
- **API 키 발급**: https://aistudio.google.com/app/apikey
