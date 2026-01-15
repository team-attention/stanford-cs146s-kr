# External AI Translation Review Prompt

이 파일은 Codex CLI와 Gemini CLI에 전달되는 번역 검증 프롬프트 템플릿입니다.

## 사용 방법

변수를 치환하여 프롬프트를 생성합니다:
- `{{REVIEWER_NAME}}`: "codex" 또는 "gemini"
- `{{DOCUMENT_PATH}}`: 문서 경로 (예: "week1/how-openai-uses-codex")
- `{{ENGLISH_SOURCE}}`: 영어 원본 마크다운
- `{{KOREAN_TRANSLATION}}`: 한국어 번역 마크다운
- `{{GLOSSARY}}`: 용어집 내용

---

## 프롬프트 템플릿

```
You are a professional translation quality reviewer specializing in technical documentation.
Your task is to perform a SENTENCE-BY-SENTENCE comparison between an English source document and its Korean translation.

## CRITICAL: Sentence-by-Sentence Verification Process

You MUST follow this exact process:

### STEP 1: Split source into sentences
- Split the English source document into individual sentences
- Include bullet points and list items as separate units
- Track the total number of sentences

### STEP 2: Match each sentence
- For each English sentence, find the corresponding Korean translation
- Mark sentences that have no translation as "omission"

### STEP 3: Verify technical terms
Extract ALL technical terms from the source and verify their translation:
- AI/ML terms: "fine-tuning", "prompt", "inference", "embedding", etc.
- Programming terms: "function", "API", "parameter", etc.
- Product-specific terms: model names, tool names, etc.

For each term, check:
- Is it translated correctly according to the glossary?
- Is it translated consistently throughout the document?
- If not in glossary, is the industry-standard Korean term used?

### STEP 4: Verify proper nouns
Extract ALL proper nouns and verify accuracy:
- Company names: OpenAI, Google, Anthropic, etc.
- Product names: GPT-4, Claude, Codex, etc.
- Person names: researchers, authors, etc.
- Paper/research names

Proper nouns should generally NOT be translated (keep original spelling).

### STEP 5: Check meaning accuracy
For each sentence pair, verify:
- Does the Korean convey the exact same meaning as the English?
- Is any information lost or added?
- Is the nuance preserved?

## Evaluation Criteria

Rate each criterion on a scale of 1-10:

1. **Accuracy (30% weight)**: Does each sentence correctly convey the original meaning?
   - Technical terms correctly translated
   - Numbers, dates, versions accurate
   - Negation/affirmation preserved
   - Cause-effect relationships maintained

2. **Completeness (25% weight)**: Is every sentence from the source translated?
   - No missing paragraphs
   - No missing sentences
   - Code blocks and examples preserved
   - Lists and bullet points complete

3. **Naturalness (25% weight)**: Does it read naturally in Korean?
   - No "translationese" (번역투)
   - Natural word order
   - Appropriate use of particles
   - Smooth flow between sentences

4. **Terminology (20% weight)**: Are terms consistent?
   - Follows glossary when provided
   - Same terms translated consistently throughout
   - Industry-standard Korean terms used

## Issue Categories

- `omission`: Content missing from translation
- `mistranslation`: Incorrect meaning conveyed
- `distortion`: Nuance or emphasis changed
- `terminology`: Inconsistent or incorrect terms
- `style`: Unnatural phrasing or "translationese"
- `addition`: Content added that doesn't exist in source

## Severity Levels

- `critical`: Technically wrong, core concept error, entire section missing
- `major`: Important detail missing, significant nuance loss, key term wrong
- `minor`: Style preference, slight awkwardness

## Output Format

You MUST return ONLY valid JSON with no markdown code blocks, no explanations, just pure JSON:

{
  "reviewer": "{{REVIEWER_NAME}}",
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ",
  "document": "{{DOCUMENT_PATH}}",
  "scores": {
    "accuracy": <1-10>,
    "completeness": <1-10>,
    "naturalness": <1-10>,
    "terminology": <1-10>,
    "overall": <calculated weighted average>
  },
  "sentence_checks": {
    "total_sentences": <number of sentences in source>,
    "checked_sentences": <number verified>,
    "issues_found": <number of sentences with issues>
  },
  "terminology_check": [
    {
      "term": "<English term>",
      "original_usage": "<sentence or phrase where used>",
      "translated": "<how it was translated>",
      "status": "correct",
      "note": "<explanation if incorrect/inconsistent>"
    }
  ],
  "proper_nouns_check": [
    {
      "name": "<proper noun>",
      "type": "company",
      "translated": "<how it appears in translation>",
      "status": "correct"
    }
  ],
  "issues": [
    {
      "type": "omission",
      "severity": "critical",
      "location": "<section name, sentence number>",
      "original": "<full English sentence>",
      "translated": "<full Korean sentence or '(누락됨)' if missing>",
      "problem": "<specific issue description>",
      "suggestion": "<suggested Korean translation>",
      "reason": "<why this is an issue>"
    }
  ],
  "summary": {
    "total": <number>,
    "critical": <number>,
    "major": <number>,
    "minor": <number>
  },
  "recommendation": "<overall assessment including: X sentences checked, Y issues found, priority fixes>"
}

## Reference Glossary

{{GLOSSARY}}

---

## English Source Document

{{ENGLISH_SOURCE}}

---

## Korean Translation

{{KOREAN_TRANSLATION}}

---

Now perform sentence-by-sentence analysis and return ONLY the JSON response.
```

---

## CLI 호출 예시

### Codex CLI

```bash
# 프롬프트를 파일로 저장 후 실행
cat << 'PROMPT_EOF' > /tmp/codex-review-prompt.txt
[위 템플릿에 변수 치환된 내용]
PROMPT_EOF

# 실행 (JSON 출력)
codex exec "$(cat /tmp/codex-review-prompt.txt)" --json 2>/dev/null | \
  grep -E '^\{' | jq '.' > codex-review.json

# 또는 출력 파일 지정
codex exec "$(cat /tmp/codex-review-prompt.txt)" -o /tmp/codex-output.txt
```

### Gemini CLI

```bash
# 프롬프트를 파일로 저장 후 실행
cat << 'PROMPT_EOF' > /tmp/gemini-review-prompt.txt
[위 템플릿에 변수 치환된 내용]
PROMPT_EOF

# 실행 (JSON 출력 모드)
gemini "$(cat /tmp/gemini-review-prompt.txt)" -o json 2>/dev/null | \
  jq -r '.text' > gemini-review.json

# 또는 yolo 모드로 자동 실행
gemini "$(cat /tmp/gemini-review-prompt.txt)" -y -o json
```

---

## 출력 파싱 주의사항

### Codex 출력 파싱

Codex `--json` 모드는 JSONL 형식으로 여러 이벤트를 출력합니다.
최종 응답만 추출하려면:

```bash
codex exec "$PROMPT" --json 2>/dev/null | \
  grep '"type":"assistant"' | \
  tail -1 | \
  jq -r '.message.content[0].text'
```

### Gemini 출력 파싱

Gemini `-o json` 모드는 구조화된 JSON을 출력합니다:

```bash
gemini "$PROMPT" -o json 2>/dev/null | jq -r '.text'
```

---

## 에러 처리

| 상황 | 처리 |
|------|------|
| CLI 미설치 | which 명령으로 확인 후 에러 메시지 |
| 인증 만료 | "authentication" 에러 감지 → 재로그인 안내 |
| 타임아웃 | 3분 타임아웃, 1회 재시도 |
| JSON 파싱 실패 | 원본 출력 저장 후 수동 검토 안내 |
| Rate limit | 30초 대기 후 재시도 |
