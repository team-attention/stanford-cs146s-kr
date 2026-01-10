---
name: create-pr
description: |
  GitHub PR 생성 스킬. 현재 브랜치를 push하고 PR을 생성합니다.
  fork 워크플로우도 지원합니다.
  사용: /create-pr, /create-pr --base develop, /create-pr --draft
arguments:
  - name: base
    description: PR 타겟 브랜치 (기본값: main)
    required: false
  - name: title
    description: PR 제목 (미지정 시 자동 생성)
    required: false
  - name: draft
    description: 드래프트 PR로 생성
    required: false
---

# PR 생성 스킬

현재 브랜치의 변경사항을 push하고 GitHub PR을 생성합니다.

## 사용법

```
/create-pr                     # main 브랜치로 PR
/create-pr --base develop      # develop 브랜치로 PR
/create-pr --draft             # 드래프트 PR 생성
/create-pr --title "제목"      # 제목 지정
```

## 워크플로우

### Step 0: 사전 점검

1. **gh CLI 확인**: `gh --version` 실행
   - 실패 시: "gh CLI를 설치해주세요: https://cli.github.com/" 안내 후 중단

2. **인증 확인**: `gh auth status` 실행
   - 실패 시: "gh auth login 실행이 필요합니다" 안내 후 중단

3. **작업 상태 확인**: `git status --porcelain` 실행
   - uncommitted changes 있으면: 경고 메시지 출력 (계속 진행)

### Step 1: 브랜치 분석

1. **현재 브랜치**: `git branch --show-current`
   - main/master면: "PR을 위한 별도 브랜치가 필요합니다" 안내 후 중단

2. **커밋 분석**: `git log {base}..HEAD --oneline`
   - 커밋 없으면: "{base} 브랜치와 차이가 없습니다" 안내 후 중단

3. **변경 내역**: `git diff --stat {base}...HEAD`

### Step 2: Push

1. **origin push 시도**: `git push -u origin {branch}`
   - 성공 시: Step 3으로
   - 403 에러 시: fork 안내

2. **Fork 안내** (push 실패 시):
   ```
   origin에 push 권한이 없습니다.

   1. GitHub에서 fork 생성: https://github.com/{owner}/{repo}/fork
   2. fork remote 추가: git remote add fork {your-fork-url}
   3. fork URL을 입력해주세요:
   ```
   - AskUserQuestion으로 fork URL 입력받기
   - `git remote add fork {url}` 실행
   - `git push -u fork {branch}` 실행

### Step 3: PR 생성

1. **제목 생성** (--title 미지정 시):
   - 커밋이 1개: 첫 커밋 메시지 사용
   - 커밋이 여러 개: 브랜치명 기반 (feature/xxx → "Feature: xxx")

2. **본문 생성**:
   ```markdown
   ## Summary
   - {커밋 1 메시지}
   - {커밋 2 메시지}
   - ...
   ```

3. **PR 생성**:
   - origin push 성공: `gh pr create --base {base} --title "..." --body "..."`
   - fork 사용: `gh pr create --repo {upstream} --base {base} --head {user}:{branch} --title "..." --body "..."`
   - --draft 옵션 있으면: `--draft` 플래그 추가

### Step 4: 결과

PR URL 출력:
```
PR 생성 완료: https://github.com/{owner}/{repo}/pull/{number}
```

## 에러 처리

| 상황 | 메시지 |
|------|--------|
| gh 미설치 | gh CLI를 설치해주세요: https://cli.github.com/ |
| gh 미인증 | `gh auth login` 실행이 필요합니다 |
| main 브랜치 | PR을 위한 별도 브랜치가 필요합니다 |
| 커밋 없음 | {base} 브랜치와 차이가 없습니다 |
| push 권한 없음 | fork 안내 메시지 |
