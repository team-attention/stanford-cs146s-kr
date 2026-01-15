---
name: commit
description: |
  코드 수정 완료 후 conventional commit 형식의 커밋 메시지를 자동 생성하고 사용자 확인 후 커밋합니다.
  사용자가 커밋해줘 또는 /commit 요청 시 사용.
arguments:
  - name: message
    description: 커밋 메시지 직접 지정 (미지정 시 자동 생성)
    required: false
  - name: all
    description: 모든 변경사항 자동 스테이징 (-a 옵션)
    required: false
---

# 커밋 스킬

변경사항을 분석하여 Conventional Commits 형식의 커밋 메시지를 자동 생성하고, 사용자 확인 후 커밋합니다.

## 사용법

```
/commit                        # 자동 메시지 생성 후 확인
/commit --all                  # 모든 변경사항 스테이징 후 커밋
/commit --message "feat: 기능" # 메시지 직접 지정
```

## 워크플로우

### Step 1: 변경사항 분석

1. **스테이징 상태 확인**: `git status --porcelain`
   - 변경사항 없으면: "커밋할 변경사항이 없습니다" 안내 후 중단

2. **staged 변경사항 확인**: `git diff --cached --stat`
   - staged 파일 없고 --all 미지정 시: unstaged 파일 목록 보여주고 스테이징 여부 확인

3. **변경 내용 분석**: `git diff --cached` (또는 --all 시 `git diff`)
   - 변경된 파일들과 내용 파악

### Step 2: 커밋 메시지 생성

--message 미지정 시 자동 생성:

1. **변경 유형 판단**:
   - 새 파일 추가 → `feat:`
   - 버그 수정 → `fix:`
   - 리팩토링 → `refactor:`
   - 문서 수정 (.md 파일만) → `docs:`
   - 스타일/포맷 변경 → `style:`
   - 테스트 추가/수정 → `test:`
   - 빌드/설정 변경 → `chore:`

2. **메시지 형식**:
   ```
   <type>: <간결한 설명 (한국어 또는 영어)>

   - 변경사항 1
   - 변경사항 2
   ```

### Step 3: 사용자 확인

AskUserQuestion으로 확인 요청:

```
커밋 메시지를 확인해주세요:

---
feat: 새로운 기능 추가

- 파일1.ts 변경
- 파일2.ts 추가
---

이 메시지로 커밋할까요?
```

**선택지**:
- 커밋 진행
- 메시지 수정 (사용자가 직접 입력)
- 취소

### Step 4: 커밋 실행

1. **스테이징** (필요 시):
   - --all 옵션: `git add -A`
   - 특정 파일만: `git add <files>`

2. **커밋 실행**:
   ```bash
   git commit -m "<message>"
   ```

3. **결과 출력**:
   ```
   커밋 완료: <commit-hash>
   <commit-message 첫 줄>
   ```

## Conventional Commits 타입

| 타입 | 설명 | 예시 |
|------|------|------|
| feat | 새 기능 | feat: 사용자 로그인 추가 |
| fix | 버그 수정 | fix: 버튼 클릭 오류 수정 |
| refactor | 리팩토링 | refactor: API 호출 로직 개선 |
| docs | 문서 수정 | docs: README 업데이트 |
| style | 포맷/스타일 | style: 코드 포맷팅 |
| test | 테스트 | test: 유닛 테스트 추가 |
| chore | 빌드/설정 | chore: 의존성 업데이트 |

## 에러 처리

| 상황 | 메시지 |
|------|--------|
| 변경사항 없음 | 커밋할 변경사항이 없습니다 |
| git 저장소 아님 | git 저장소가 아닙니다 |
| 사용자 취소 | 커밋이 취소되었습니다 |
