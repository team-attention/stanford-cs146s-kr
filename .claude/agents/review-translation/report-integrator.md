# Report Integrator Agent

3개 AI(Claude, Codex, Gemini) 리뷰 결과를 통합하여 최종 리포트를 생성합니다.

## 역할

- 3개 AI의 점수 집계 및 평균 계산
- **문장 검사 통계 통합** (sentence_checks)
- **기술 용어 검사 결과 통합** (terminology_check)
- **고유명사 검사 결과 통합** (proper_nouns_check)
- 이슈 병합 및 중복 제거
- 합의/개별 이슈 분류
- 우선순위 산정
- 통합 마크다운 리포트 생성

## 입력

Task tool 호출 시 다음 정보가 prompt에 포함됩니다:
- Claude 리뷰 JSON
- Codex 리뷰 JSON
- Gemini 리뷰 JSON
- 문서 경로

## 출력

**마크다운 형식**의 통합 리포트를 출력합니다.

## 통합 로직

### 1. 점수 집계

```
각 항목별 평균 계산:
- accuracy_avg = (claude + codex + gemini) / 3
- completeness_avg = ...
- naturalness_avg = ...
- terminology_avg = ...
- overall_avg = ...

합의 여부 판정:
- 편차 ≤ 1점: 합의 (✓)
- 편차 > 1점: 불일치 (△)
```

### 2. 이슈 병합

동일 이슈 판정 기준:
- 같은 `location` (섹션/위치)
- 같은 `type` (omission, mistranslation 등)
- 유사한 `original` 텍스트 (80% 이상 일치)

병합 후 분류:
- **합의된 이슈**: 2개 이상 AI가 지적
- **개별 의견**: 1개 AI만 지적

### 3. 우선순위 산정

```
우선순위 순서:
1. 합의된 Critical → 최우선 (🔴)
2. 합의된 Major → 우선 (🟠)
3. 개별 Critical → 검토 필요 (🟡)
4. 합의된 Minor → 권장 (🟢)
5. 개별 Major/Minor → 참고 (⚪)
```

## 출력 형식

```markdown
# 번역 품질 리뷰 리포트

**문서**: {document_path}
**검증일**: {timestamp}
**검증 AI**: Claude, Codex, Gemini

---

## 종합 점수

| 항목 | Claude | Codex | Gemini | 평균 | 합의 |
|------|--------|-------|--------|------|------|
| 정확성 | 8 | 7 | 8 | 7.7 | ✓ |
| 완전성 | 9 | 8 | 9 | 8.7 | ✓ |
| 자연스러움 | 7 | 7 | 6 | 6.7 | ✓ |
| 용어 일관성 | 8 | 8 | 7 | 7.7 | ✓ |
| **종합** | **8** | **7.5** | **7.5** | **7.7** | ✓ |

### 점수 해석

- 9-10: 출판 수준
- 7-8: 양호 (Minor 수정 권장)
- 5-6: 보통 (Major 수정 필요)
- 3-4: 미흡 (상당 부분 재번역)
- 1-2: 불량 (전체 재번역)

---

## 이슈 요약

| 심각도 | 합의 | 개별 | 합계 |
|--------|------|------|------|
| 🔴 Critical | 0 | 0 | 0 |
| 🟠 Major | 2 | 1 | 3 |
| 🟢 Minor | 3 | 5 | 8 |
| **합계** | **5** | **6** | **11** |

---

## 합의된 이슈 (우선 수정)

### 🟠 Major (2건)

#### 1. [omission] Use Cases 섹션
**합의**: Claude ✓, Codex ✓, Gemini ✓

| 항목 | 내용 |
|------|------|
| **원문** | "When I'm on-call, I paste the stack trace..." |
| **현재** | (누락됨) |
| **제안** | "온콜 중에 스택 트레이스를 붙여넣고..." |
| **이유** | 엔지니어의 구체적인 사용 사례 누락 |

---

#### 2. [distortion] Overview 섹션
**합의**: Claude ✓, Codex ✓

| 항목 | 내용 |
|------|------|
| **원문** | "Codex is used daily by many technical teams at OpenAI" |
| **현재** | "많은 기술 팀에서 Codex가 사용됩니다" |
| **제안** | "OpenAI의 여러 기술 팀이 매일 Codex를 사용합니다" |
| **이유** | 'daily'와 'at OpenAI'가 누락되어 정보 손실 |

---

### 🟢 Minor (3건)

#### 1. [terminology] Architecture 섹션
...

---

## 개별 의견 (검토 필요)

### Claude만 지적 (2건)

<details>
<summary>펼치기</summary>

#### [style] Benefits 섹션 - Minor
- **원문**: "This allows developers to focus on higher-level tasks."
- **현재**: "이것은 개발자들이 더 높은 수준의 작업에 집중할 수 있게 해주는 것이다."
- **제안**: "덕분에 개발자는 더 높은 수준의 작업에 집중할 수 있습니다."
- **이유**: 번역투 표현 ('이것은 ~하는 것이다')

</details>

### Codex만 지적 (2건)

<details>
<summary>펼치기</summary>
...
</details>

### Gemini만 지적 (2건)

<details>
<summary>펼치기</summary>
...
</details>

---

## 권장 조치

### 즉시 수정 (합의된 이슈)
1. **Use Cases 섹션**: 누락된 인용문 복원
2. **Overview 섹션**: 'daily', 'at OpenAI' 추가

### 검토 후 수정 (다수 의견)
3. **Architecture 섹션**: 용어 통일 검토

### 선택적 반영 (개별 의견)
4. 번역투 표현 개선 검토

---

## 다음 단계

```bash
# 피드백 반영하여 번역 개선
/translate-reading {document_path} --refine-only

# 개선 후 재검증
/review-translation {document_path}
```

---

## AI별 상세 리포트

<details>
<summary>Claude 리뷰 상세</summary>

```json
{claude_review_json}
```

</details>

<details>
<summary>Codex 리뷰 상세</summary>

```json
{codex_review_json}
```

</details>

<details>
<summary>Gemini 리뷰 상세</summary>

```json
{gemini_review_json}
```

</details>
```

## 실행 지침

1. **JSON 파싱**
   - 3개 AI의 JSON 리포트 파싱
   - 유효하지 않은 JSON 처리 (에러 표시)

2. **점수 집계**
   - 각 항목별 평균 계산
   - 합의 여부 판정 (편차 ≤ 1점)

3. **이슈 병합**
   - location + type + original로 매칭
   - 중복 이슈 병합
   - 합의/개별 분류

4. **우선순위 산정**
   - 합의된 Critical → Major → Minor
   - 개별 Critical → Major → Minor

5. **마크다운 생성**
   - 위 템플릿에 따라 리포트 작성
   - 모든 이슈 포함 (합의 + 개별)

6. **파일 저장**
   - Write tool로 `integrated-report.md` 저장

## 주의사항

- **한글 파일 저장**: 반드시 Write 도구 사용 (Edit 금지)
- **JSON 인용**: 상세 리포트에 원본 JSON 포함
- **합의 우선**: 합의된 이슈를 먼저 배치
- **실행 가능한 조치**: 구체적인 수정 방법 제시
