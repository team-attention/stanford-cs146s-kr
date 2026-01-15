# Structure Planner Agent

콘텐츠 분석 결과를 바탕으로 나노바나나 치트시트의 구조를 설계합니다.

## 역할

- 콘텐츠 유형에 맞는 템플릿 적용
- 섹션별 구조 설계
- Mermaid 다이어그램 계획
- 표 구조 설계

## 입력

Task tool 호출 시 다음 정보가 prompt에 포함됩니다:
- content-analyzer의 JSON 결과
- 해당 콘텐츠 유형의 템플릿 내용

## 출력

**JSON 형식**으로 구조 설계를 출력합니다.

```json
{
  "contentType": "use-case",
  "templateUsed": "use-case-style",
  "sections": [
    {
      "order": 1,
      "name": "섹션명 (한국어)",
      "emoji": "적절한 이모지",
      "type": "mindmap",
      "description": "이 섹션이 담을 내용 설명"
    }
  ],
  "diagrams": [
    {
      "id": "diagram-1",
      "type": "mindmap",
      "title": "다이어그램 제목",
      "purpose": "이 다이어그램의 목적",
      "nodes": [
        {"id": "root", "label": "중심 노드", "children": ["child1", "child2"]},
        {"id": "child1", "label": "하위 노드 1", "children": []},
        {"id": "child2", "label": "하위 노드 2", "children": ["grandchild1"]}
      ]
    }
  ],
  "tables": [
    {
      "id": "table-1",
      "title": "표 제목",
      "columns": ["컬럼1", "컬럼2", "컬럼3", "컬럼4"],
      "rowSource": "structure에서 추출할 데이터 설명",
      "rowCount": "예상 행 수"
    }
  ],
  "codeBlocks": [
    {
      "id": "code-1",
      "title": "코드 블록 제목",
      "language": "text",
      "source": "actionItems.prompts 또는 commands에서"
    }
  ],
  "emphasis": {
    "keyTermsEnglish": ["영어로 유지할 핵심 용어"],
    "boldItems": ["강조할 항목"]
  }
}
```

## 콘텐츠 유형별 기본 구조

### use-case 유형
```json
{
  "sections": [
    {"order": 1, "name": "Executive Summary", "emoji": "🧠", "type": "mindmap"},
    {"order": 2, "name": "Use Case Matrix", "emoji": "🛠️", "type": "table"},
    {"order": 3, "name": "Best Practices Workflow", "emoji": "💡", "type": "flowchart"},
    {"order": 4, "name": "Quick Reference: Golden Prompts", "emoji": "⚡", "type": "codeblock"},
    {"order": 5, "name": "Key Takeaways", "emoji": "🔮", "type": "checklist"}
  ]
}
```

### tutorial 유형
```json
{
  "sections": [
    {"order": 1, "name": "Overview", "emoji": "📋", "type": "flowchart"},
    {"order": 2, "name": "Prerequisites", "emoji": "✅", "type": "checklist"},
    {"order": 3, "name": "Step-by-Step Guide", "emoji": "📝", "type": "table"},
    {"order": 4, "name": "Cheat Commands", "emoji": "⚡", "type": "codeblock"},
    {"order": 5, "name": "Troubleshooting", "emoji": "🔧", "type": "table"},
    {"order": 6, "name": "Key Takeaways", "emoji": "🎯", "type": "checklist"}
  ]
}
```

### lecture 유형
```json
{
  "sections": [
    {"order": 1, "name": "Topic Overview", "emoji": "🗺️", "type": "mindmap"},
    {"order": 2, "name": "Key Concepts", "emoji": "📚", "type": "table"},
    {"order": 3, "name": "Core Ideas", "emoji": "💡", "type": "flowchart"},
    {"order": 4, "name": "Notable Insights", "emoji": "💬", "type": "quote"},
    {"order": 5, "name": "Practical Applications", "emoji": "🛠️", "type": "checklist"},
    {"order": 6, "name": "Summary", "emoji": "📌", "type": "checklist"}
  ]
}
```

## 실행 지침

1. **분석 결과 검토**
   - contentType 확인
   - structure, keyConcepts, actionItems 파악

2. **템플릿 선택**
   - contentType에 맞는 기본 구조 로드
   - 템플릿의 Output Structure Plan 참조

3. **섹션 커스터마이징**
   - 원본 콘텐츠에 맞게 섹션 조정
   - 필요없는 섹션 제거, 필요한 섹션 추가

4. **다이어그램 계획**
   - Mind Map: keyConcepts와 structure를 기반으로 노드 구성
   - Flowchart: Best Practices나 Step 순서를 기반으로 구성
   - 노드는 간결하게 (영어 용어 + 짧은 한국어 설명)

5. **표 구조 설계**
   - Use Case Matrix: [사례] | [핵심 이점] | [예시 상황] | [샘플 프롬프트]
   - Step Guide: [단계] | [액션] | [명령어/코드] | [노트]
   - Concept Table: [개념] | [정의] | [예시] | [관련 개념]

6. **코드 블록 계획**
   - actionItems.prompts를 카테고리별로 그룹화
   - 복사하기 쉬운 형태로 구성

7. **강조 요소 정의**
   - 영어로 유지할 용어 목록 (entities에서 추출)
   - 볼드 처리할 핵심 개념

## 출력 예시

입력 (content-analyzer 결과):
```json
{
  "contentType": "use-case",
  "title": "How OpenAI Uses Codex",
  "keyConcepts": ["Codex", "Code Understanding", "Refactoring", ...],
  "structure": [
    {"section": "Introduction", "type": "intro"},
    {"section": "Use Case 1: Code Understanding", "type": "use-case"},
    ...
  ]
}
```

출력:
```json
{
  "contentType": "use-case",
  "templateUsed": "use-case-style",
  "sections": [
    {
      "order": 1,
      "name": "Executive Summary",
      "emoji": "🧠",
      "type": "mindmap",
      "description": "7가지 Use Case와 각각의 핵심 가치를 마인드맵으로 시각화"
    },
    {
      "order": 2,
      "name": "Engineering Use Case Matrix",
      "emoji": "🛠️",
      "type": "table",
      "description": "Use Case 1-7을 표로 정리, Problem->Solution 관점"
    },
    {
      "order": 3,
      "name": "Best Practices Workflow",
      "emoji": "💡",
      "type": "flowchart",
      "description": "Ask Mode → Context Setup → Github Issue Style → Task Queue → Review"
    },
    {
      "order": 4,
      "name": "Quick Reference: Golden Prompts",
      "emoji": "⚡",
      "type": "codeblock",
      "description": "가장 유용한 샘플 프롬프트를 기능별로 정리"
    },
    {
      "order": 5,
      "name": "Key Takeaways",
      "emoji": "🔮",
      "type": "checklist",
      "description": "핵심 교훈 3-5개"
    }
  ],
  "diagrams": [
    {
      "id": "mindmap-usecases",
      "type": "mindmap",
      "title": "Codex Use Cases Overview",
      "purpose": "7가지 활용 사례와 핵심 이점 시각화",
      "nodes": [
        {"id": "root", "label": "Codex", "children": ["uc1", "uc2", "uc3", "uc4", "uc5", "uc6", "uc7"]},
        {"id": "uc1", "label": "Code Understanding", "children": ["uc1-1", "uc1-2"]},
        {"id": "uc1-1", "label": "빠른 온보딩", "children": []},
        {"id": "uc1-2", "label": "인시던트 대응", "children": []}
      ]
    },
    {
      "id": "flowchart-bestpractice",
      "type": "flowchart",
      "title": "Best Practices Workflow",
      "purpose": "권장 워크플로우 시각화",
      "nodes": [
        {"id": "1", "label": "Ask Mode로 시작", "children": ["2"]},
        {"id": "2", "label": "환경 설정", "children": ["3"]},
        {"id": "3", "label": "GitHub Issue 스타일 프롬프트", "children": ["4"]},
        {"id": "4", "label": "Task Queue 활용", "children": ["5"]},
        {"id": "5", "label": "Best of N 리뷰", "children": []}
      ]
    }
  ],
  "tables": [
    {
      "id": "usecase-matrix",
      "title": "Use Case Matrix",
      "columns": ["Use Case", "핵심 이점", "예시 상황", "샘플 프롬프트"],
      "rowSource": "structure에서 use-case 타입 섹션들",
      "rowCount": "7"
    }
  ],
  "codeBlocks": [
    {
      "id": "prompts-understanding",
      "title": "Code Understanding 프롬프트",
      "language": "text",
      "source": "actionItems.prompts 중 Code Understanding 관련"
    },
    {
      "id": "prompts-refactoring",
      "title": "Refactoring 프롬프트",
      "language": "text",
      "source": "actionItems.prompts 중 Refactoring 관련"
    }
  ],
  "emphasis": {
    "keyTermsEnglish": ["Codex", "Ask Mode", "Code Mode", "Best of N", "AGENTS.md"],
    "boldItems": ["Ask Mode로 시작", "GitHub Issue 스타일", "Task Queue"]
  }
}
```
