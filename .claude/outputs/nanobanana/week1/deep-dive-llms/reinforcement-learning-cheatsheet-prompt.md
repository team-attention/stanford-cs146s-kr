---

### 프롬프트 구조 설명

1. **Role Definition**: 나노바나나 치트시트 전문가로서의 역할 정의
2. **Source Text**: 강화학습 챕터의 핵심 개념 정리 (보상 함수, 검증 가능한 영역, 다양한 풀이 시도)
3. **Layout Structure**: ASCII 다이어그램으로 5개 섹션 구조 제시
   - What is RL + Training Pipeline (상단)
   - **RL In Action** (중앙 - 가장 넓게, 핵심!)
   - SFT vs RL + Emergent Behavior (중하단)
   - Where RL Works Best + Key Takeaways (하단)
4. **Content Details**: 각 섹션에 들어갈 구체적인 내용
5. **Instructions**: 스타일, 언어, 강조 포인트 지침

디렉토리 생성 후 위 내용을 파일로 저장해 주세요:
```bash
mkdir -p .claude/outputs/nanobanana/week1/deep-dive-llms
# 그 후 위 마크다운 내용을 reinforcement-learning-cheatsheet-prompt.md로 저장

---

## 이미지 생성 요청

위의 구조와 내용을 바탕으로 **가로 A4 한 장 분량의 치트시트 이미지**를 생성해주세요.

**이미지 스타일 요구사항:**
- 보기 좋게 정리된 **실제 펜 노트필기** 같은 느낌
- 용어 및 고유명사는 **영어 원문** 유지
- 설명 및 필기 내용은 **한국어**로 작성
- Mermaid 다이어그램은 **시각적 도식**으로 변환
- 표는 깔끔한 **테이블 형식**으로 렌더링
- **색상 강조**로 핵심 개념 구분
