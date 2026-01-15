---
title: "Claude Code: 에이전틱 코딩 모범 사례"
originalTitle: "Claude Code: Best practices for agentic coding"
author: "Boris Cherny"
sourceUrl: "https://www.anthropic.com/engineering/claude-code-best-practices"
translatedAt: "2026-01-13"
status: "final"
---

# Claude Code: 에이전틱 코딩 모범 사례

[원본 링크](https://www.anthropic.com/engineering/claude-code-best-practices)

게시일: 2025년 4월 18일

Claude Code는 에이전틱 코딩을 위한 커맨드라인 도구입니다. 이 글에서는 다양한 코드베이스, 언어, 환경에서 Claude Code를 효과적으로 사용하는 팁과 기법을 다룹니다.

최근 저희는 에이전틱 코딩을 위한 커맨드라인 도구인 [Claude Code를 출시](https://www.anthropic.com/news/claude-3-7-sonnet)했습니다. 연구 프로젝트로 개발한 Claude Code는 Anthropic 엔지니어와 연구원이 코딩 워크플로우에 Claude를 더 자연스럽게 통합할 수 있게 해줍니다.

Claude Code는 의도적으로 로우 레벨이며 특정 관점을 강요하지 않습니다. 특정 워크플로우를 강제하지 않으면서 모델에 거의 직접 접근할 수 있습니다. 이 설계 철학 덕분에 유연하고, 커스터마이징 가능하며, 스크립팅이 가능하고, 안전한 파워 툴이 탄생했습니다. 강력하지만, 이 유연성 때문에 에이전틱 코딩 도구를 처음 접하는 엔지니어에게는 학습 곡선이 있습니다. 적어도 자신만의 모범 사례를 개발하기 전까지는요.

이 글에서는 Anthropic 내부 팀과 다양한 코드베이스, 언어, 환경에서 Claude Code를 사용하는 외부 엔지니어들이 효과적이라고 검증한 일반적인 패턴을 설명합니다. 이 목록의 어떤 것도 확정된 것이 아니며 보편적으로 적용되지도 않습니다. 출발점으로 생각하세요. 실험하고 여러분에게 가장 잘 맞는 방법을 찾아보시기 바랍니다!

_더 자세한 정보가 필요하신가요? [claude.ai/code](https://claude.ai/redirect/website.v1.d358677c-48d9-4388-8baf-bd9f272951fc/code)의 종합 문서에서 이 글에 언급된 모든 기능, 추가 예시, 구현 세부 사항, 고급 기법을 다룹니다._

## 1. 설정 커스터마이징

Claude Code는 프롬프트에 자동으로 컨텍스트를 가져오는 에이전틱 코딩 어시스턴트입니다. 이 컨텍스트 수집은 시간과 토큰을 소비하지만, 환경 튜닝으로 최적화할 수 있습니다.

### a. `CLAUDE.md` 파일 생성하기

`CLAUDE.md`는 대화를 시작할 때 Claude가 자동으로 컨텍스트에 포함하는 특별한 파일입니다. 다음 내용을 문서화하기에 이상적입니다:

* 자주 쓰는 bash 명령어
* 핵심 파일과 유틸리티 함수
* 코드 스타일 가이드라인
* 테스팅 지침
* 저장소 에티켓 (예: 브랜치 이름 규칙, merge vs. rebase 등)
* 개발자 환경 설정 (예: pyenv 사용, 사용 가능한 컴파일러)
* 프로젝트 고유의 예기치 않은 동작이나 경고
* Claude가 기억했으면 하는 기타 정보

`CLAUDE.md` 파일에 특정 형식은 필요 없습니다. 간결하고 읽기 쉽게 유지하세요. 예를 들면:

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

`CLAUDE.md` 파일은 여러 위치에 배치할 수 있습니다:

* **저장소 루트** 또는 `claude`를 실행하는 곳 (가장 일반적). `CLAUDE.md`로 이름 짓고 git에 체크인하면 세션과 팀 간에 공유할 수 있습니다(권장). 또는 `CLAUDE.local.md`로 이름 짓고 `.gitignore`에 추가하세요
* **`claude`를 실행하는 디렉토리의 상위 디렉토리**. 모노레포에서 가장 유용합니다. `root/foo`에서 `claude`를 실행하면 `root/CLAUDE.md`와 `root/foo/CLAUDE.md` 둘 다 자동으로 컨텍스트에 포함됩니다
* **`claude`를 실행하는 디렉토리의 하위 디렉토리**. 위의 반대 경우로, 하위 디렉토리 파일 작업 시 Claude가 해당 `CLAUDE.md` 파일을 필요에 따라 가져옵니다
* **홈 폴더** (`~/.claude/CLAUDE.md`), 모든 _claude_ 세션에 적용

`/init` 명령어를 실행하면 Claude가 자동으로 `CLAUDE.md`를 생성합니다.

### b. `CLAUDE.md` 파일 튜닝하기

`CLAUDE.md` 파일은 Claude 프롬프트의 일부가 되므로, 자주 사용하는 프롬프트처럼 다듬어야 합니다. 흔한 실수는 효과를 반복 검증하지 않고 방대한 내용을 추가하는 것입니다. 시간을 들여 실험하고 모델이 지침을 가장 잘 따르게 만드는 방법을 파악하세요.

`CLAUDE.md`에 내용을 수동으로 추가하거나, `#` 키를 눌러 Claude에게 지침을 주면 자동으로 관련 `CLAUDE.md`에 반영됩니다. 많은 엔지니어가 코딩 중에 `#`을 자주 사용해 명령어, 파일, 스타일 가이드라인을 문서화한 후, `CLAUDE.md` 변경 사항을 커밋에 포함시켜 팀원들도 혜택을 받게 합니다.

Anthropic에서는 가끔 `CLAUDE.md` 파일을 [프롬프트 개선기](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver)에 통과시키고, 준수를 높이기 위해 지침을 튜닝합니다(예: "IMPORTANT"나 "YOU MUST"로 강조 추가).

![Claude Code tool allowlist](https://www-cdn.anthropic.com/images/4zrzovbb/website/6961243cc6409e41ba93895faded4f4bc1772366-1600x1231.png)

### c. Claude의 허용 도구 목록 관리하기

기본적으로 Claude Code는 시스템을 수정할 수 있는 모든 작업에 권한을 요청합니다: 파일 쓰기, 많은 bash 명령어, MCP 도구 등. 안전을 우선시하기 위해 의도적으로 보수적인 접근 방식으로 Claude Code를 설계했습니다. 허용 목록을 커스터마이즈해서 안전하다고 알고 있는 추가 도구를 허용하거나, 취소하기 쉬운 잠재적 위험 도구(예: 파일 편집, `git commit`)를 허용할 수 있습니다.

허용된 도구를 관리하는 네 가지 방법:

* **세션 중 프롬프트가 표시되면 "Always allow" 선택**
* **Claude Code 시작 후 `/permissions` 명령어 사용**으로 허용 목록에서 도구를 추가하거나 제거. 예: `Edit`를 추가해 항상 파일 편집 허용, `Bash(git commit:*)`로 git 커밋 허용, `mcp__puppeteer__puppeteer_navigate`로 Puppeteer MCP 서버 내비게이션 허용
* **`.claude/settings.json` 또는 `~/.claude.json` 수동 편집** (전자를 소스 컨트롤에 체크인해서 팀과 공유하는 것을 권장)
* **세션별 권한을 위해 `--allowedTools` CLI 플래그 사용**

### d. GitHub를 사용한다면 gh CLI 설치하기

Claude는 `gh` CLI로 이슈 생성, PR 열기, 코멘트 읽기 등 GitHub와 상호작용하는 방법을 알고 있습니다. `gh`가 설치되어 있지 않아도 Claude는 GitHub API나 MCP 서버를 사용할 수 있습니다(설치된 경우).

## 2. Claude에게 더 많은 도구 제공하기

Claude는 여러분의 쉘 환경에 접근할 수 있어서, 자신을 위해 만들듯이 편의 스크립트와 함수 세트를 구축해 줄 수 있습니다. MCP와 REST API를 통해 더 복잡한 도구도 활용할 수 있습니다.

### a. bash 도구와 함께 Claude 사용하기

Claude Code는 여러분의 bash 환경을 상속받아 모든 도구에 접근합니다. Claude는 unix 도구와 `gh` 같은 일반적인 유틸리티를 알지만, 커스텀 bash 도구는 지침 없이 알지 못합니다:

1. 사용 예시와 함께 도구 이름 알려주기
2. `--help`를 실행해 도구 문서를 확인하라고 알려주기
3. 자주 사용하는 도구를 `CLAUDE.md`에 문서화하기

### b. MCP와 함께 Claude 사용하기

Claude Code는 MCP 서버이자 클라이언트로 작동합니다. 클라이언트로서, 세 가지 방법으로 여러 MCP 서버에 연결해 도구에 접근할 수 있습니다:

* **프로젝트 설정** (해당 디렉토리에서 Claude Code 실행 시 사용 가능)
* **전역 설정** (모든 프로젝트에서 사용 가능)
* **체크인된 `.mcp.json` 파일** (코드베이스에서 작업하는 누구나 사용 가능). 예: Puppeteer와 Sentry 서버를 `.mcp.json`에 추가하면 저장소에서 작업하는 모든 엔지니어가 즉시 사용 가능

MCP로 작업할 때 `--mcp-debug` 플래그와 함께 Claude를 실행하면 설정 문제를 식별하는 데 도움이 됩니다.

### c. 커스텀 슬래시 명령어 사용하기

반복되는 워크플로우(디버깅 루프, 로그 분석 등)의 경우, `.claude/commands` 폴더 내 마크다운 파일에 프롬프트 템플릿을 저장하세요. `/`를 입력하면 슬래시 명령어 메뉴에서 사용할 수 있습니다. 이 명령어들을 git에 체크인해서 팀원들도 사용할 수 있게 하세요.

커스텀 슬래시 명령어에 특별한 키워드 `$ARGUMENTS`를 포함하면 명령어 호출에서 매개변수를 전달할 수 있습니다.

예를 들어, GitHub 이슈를 자동으로 가져와서 수정하는 슬래시 명령어:

```
Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use `gh issue view` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.
```

위 내용을 `.claude/commands/fix-github-issue.md`에 넣으면 Claude Code에서 `/project:fix-github-issue` 명령어로 사용할 수 있습니다. `/project:fix-github-issue 1234`로 Claude가 이슈 #1234를 수정하게 할 수 있습니다. 마찬가지로, 모든 세션에서 사용할 개인 명령어를 `~/.claude/commands` 폴더에 추가할 수 있습니다.

## 3. 일반적인 워크플로우 시도하기

Claude Code는 특정 워크플로우를 강제하지 않아 원하는 대로 사용할 수 있습니다. 이 유연성이 허용하는 공간 내에서, 사용자 커뮤니티 전반에 Claude Code를 효과적으로 사용하는 여러 성공적인 패턴이 등장했습니다:

### a. 탐색, 계획, 코딩, 커밋

이 다용도 워크플로우는 많은 문제에 적합합니다:

1. **Claude에게 관련 파일, 이미지, URL을 읽으라고 요청**합니다. 일반적인 포인터("로깅을 처리하는 파일 읽어줘")나 구체적인 파일명("logging.py 읽어줘")을 제공하되, 아직 코드를 작성하지 말라고 명시하세요.
   1. 복잡한 문제에서는 특히 서브에이전트를 적극 활용하세요. Claude에게 세부 사항을 확인하거나 특정 질문을 조사하기 위해 서브에이전트를 사용하라고 지시하면, 특히 대화나 작업 초기에, 효율성 손실 없이 컨텍스트 가용성을 유지할 수 있습니다.
2. **Claude에게 특정 문제에 대한 접근 방식 계획을 세우라고 요청**합니다. 확장된 사고 모드를 트리거하려면 "think"라는 단어를 사용하세요. 이렇게 하면 Claude가 대안을 더 철저하게 평가할 추가 계산 시간을 갖습니다. 이 특정 구문들은 시스템의 사고 예산 수준에 직접 매핑됩니다: "think" < "think hard" < "think harder" < "ultrathink." 각 레벨은 Claude가 사용할 사고 예산을 점진적으로 더 많이 할당합니다.
   1. 이 단계의 결과가 합리적으로 보이면, Claude가 계획을 문서나 GitHub 이슈로 작성하게 해서 구현(3단계)이 원하는 대로 안 되면 이 지점으로 리셋할 수 있습니다.
3. **Claude에게 코드로 솔루션을 구현하라고 요청**합니다. 솔루션의 각 부분을 구현하면서 합리성을 명시적으로 검증하라고 요청하기에도 좋은 지점입니다.
4. **Claude에게 결과를 커밋하고 PR을 생성하라고 요청**합니다. 관련이 있다면, 방금 수행한 작업에 대한 설명으로 README나 changelog를 업데이트하게 하기에도 좋은 시점입니다.

1-2단계가 중요합니다. 이 단계들 없이 Claude는 곧바로 솔루션 코딩으로 뛰어드는 경향이 있습니다. 때로는 그것이 원하는 바이지만, Claude에게 먼저 조사하고 계획하라고 요청하면 사전에 깊은 사고가 필요한 문제에서 성능이 크게 향상됩니다.

### b. 테스트 작성, 커밋; 코딩, 반복, 커밋

유닛 테스트, 통합 테스트, 또는 엔드 투 엔드 테스트로 쉽게 검증할 수 있는 변경 사항에 대해 Anthropic이 선호하는 워크플로우입니다. 테스트 주도 개발(TDD)은 에이전틱 코딩과 함께 더욱 강력해집니다:

1. **Claude에게 예상 입력/출력 쌍을 기반으로 테스트를 작성하라고 요청**합니다. 테스트 주도 개발을 한다고 명시해서 코드베이스에 아직 존재하지 않는 기능에 대해서도 목 구현을 만들지 않게 합니다.
2. **Claude에게 테스트를 실행하고 실패하는지 확인하라고 말합니다**. 이 단계에서 구현 코드를 작성하지 말라고 명시하면 종종 도움이 됩니다.
3. **테스트가 만족스러우면 Claude에게 테스트를 커밋하라고 요청**합니다.
4. **Claude에게 테스트를 통과하는 코드를 작성하라고 요청**하며, 테스트를 수정하지 말라고 지시합니다. 모든 테스트가 통과할 때까지 계속하라고 말합니다. 보통 Claude가 코드를 작성하고, 테스트를 실행하고, 코드를 조정하고, 테스트를 다시 실행하는 몇 차례 반복이 필요합니다.
   1. 이 단계에서 독립적인 서브에이전트로 구현이 테스트에 과적합되지 않았는지 확인하라고 요청하면 도움이 됩니다
5. **변경 사항이 만족스러우면 Claude에게 코드를 커밋하라고 요청**합니다.

Claude는 반복할 수 있는 명확한 목표(시각적 목업, 테스트 케이스, 또는 다른 종류의 출력)가 있을 때 최상의 성능을 발휘합니다. 테스트와 같은 예상 출력을 제공하면 Claude가 변경하고, 결과를 평가하고, 성공할 때까지 점진적으로 개선할 수 있습니다.

### c. 코드 작성, 결과 스크린샷, 반복

테스팅 워크플로우와 유사하게, Claude에게 시각적 목표를 제공할 수 있습니다:

1. **Claude에게 브라우저 스크린샷을 찍을 방법을 제공**합니다 (예: [Puppeteer MCP 서버](https://github.com/modelcontextprotocol/servers/tree/c19925b8f0f2815ad72b08d2368f0007c86eb8e6/src/puppeteer), [iOS 시뮬레이터 MCP 서버](https://github.com/joshuayoes/ios-simulator-mcp), 또는 수동으로 스크린샷 복사/붙여넣기).
2. **Claude에게 시각적 목업을 제공**합니다. 이미지를 복사/붙여넣기하거나 드래그 앤 드롭하거나, Claude에게 이미지 파일 경로를 제공합니다.
3. **Claude에게 디자인을 코드로 구현하고**, 결과를 스크린샷 찍고, 목업과 일치할 때까지 반복하라고 요청합니다.
4. **만족스러우면 Claude에게 커밋하라고 요청**합니다.

인간처럼 Claude의 출력도 반복을 통해 크게 향상됩니다. 첫 번째 버전이 좋을 수 있지만, 2-3번 반복 후에는 일반적으로 훨씬 더 좋아 보입니다. 최상의 결과를 위해 Claude에게 출력을 볼 수 있는 도구를 제공하세요.

![Safe yolo mode](https://www-cdn.anthropic.com/images/4zrzovbb/website/6ea59a36fe82c2b300bceaf3b880a4b4852c552d-1600x1143.png)

### d. Safe YOLO 모드

Claude를 감독하는 대신, `claude --dangerously-skip-permissions`로 모든 권한 확인을 우회하고 Claude가 완료될 때까지 중단 없이 작업하게 할 수 있습니다. 린트 오류 수정이나 보일러플레이트 코드 생성 같은 워크플로우에 잘 작동합니다.

Claude가 임의의 명령어를 실행하도록 허용하는 것은 위험하며 데이터 손실, 시스템 손상, 또는 데이터 유출(예: 프롬프트 인젝션 공격)을 초래할 수 있습니다. 이 위험을 최소화하려면 인터넷 접근이 없는 컨테이너에서 `--dangerously-skip-permissions`를 사용하세요. Docker Dev Containers를 사용하는 [참조 구현](https://github.com/anthropics/claude-code/tree/main/.devcontainer)을 따를 수 있습니다.

### e. 코드베이스 Q&A

새로운 코드베이스에 온보딩할 때 Claude Code를 학습과 탐색에 사용하세요. 페어 프로그래밍할 때 프로젝트의 다른 엔지니어에게 묻는 것과 같은 질문을 Claude에게 할 수 있습니다. Claude는 에이전틱하게 코드베이스를 검색해서 다음과 같은 일반적인 질문에 답할 수 있습니다:

* 로깅은 어떻게 동작하나요?
* 새 API 엔드포인트는 어떻게 만드나요?
* `foo.rs`의 134번째 줄에 있는 `async move { ... }`는 무엇을 하나요?
* `CustomerOnboardingFlowImpl`은 어떤 엣지 케이스를 처리하나요?
* 333번째 줄에서 `bar()` 대신 `foo()`를 호출하는 이유는 무엇인가요?
* `baz.py`의 334번째 줄에 해당하는 Java 코드는 무엇인가요?

Anthropic에서 이런 방식으로 Claude Code를 사용하는 것이 핵심 온보딩 워크플로우가 되었으며, 램프업 시간을 크게 줄이고 다른 엔지니어들의 부담을 줄였습니다. 특별한 프롬프팅이 필요 없습니다! 질문만 하면 Claude가 코드를 탐색해서 답을 찾습니다.

![Use Claude to interact with git](https://www-cdn.anthropic.com/images/4zrzovbb/website/a08ea13c2359aac0eceacebf2e15f81e8e8ec8d2-1600x1278.png)

### f. Claude로 git과 상호작용하기

Claude는 많은 git 작업을 효과적으로 처리합니다. Anthropic의 많은 엔지니어가 _git_ 상호작용의 90% 이상에 Claude를 사용합니다:

* **_git_ 히스토리 검색**으로 "v1.2.3에 어떤 변경 사항이 들어갔나요?", "이 특정 기능의 담당자는 누구인가요?", "이 API는 왜 이렇게 설계되었나요?" 같은 질문에 답합니다. 이런 쿼리에 답하려면 git 히스토리를 살펴보라고 Claude에게 명시적으로 프롬프트하세요.
* **커밋 메시지 작성**. Claude는 관련된 모든 컨텍스트를 고려해서 메시지를 작성하기 위해 자동으로 변경 사항과 최근 히스토리를 살펴봅니다
* **복잡한 git 작업 처리**: 파일 되돌리기, 리베이스 충돌 해결, 패치 비교 및 이식 등

### g. Claude로 GitHub와 상호작용하기

Claude Code는 많은 GitHub 상호작용을 관리합니다:

* **PR 생성**: Claude는 약어 "pr"을 이해하고 diff와 주변 컨텍스트를 기반으로 적절한 커밋 메시지를 생성합니다.
* **간단한 코드 리뷰 코멘트에 대한 원샷 해결 구현**: PR의 코멘트를 수정하라고 말하고(선택적으로 더 구체적인 지침 제공) 완료되면 PR 브랜치에 푸시하라고 하면 됩니다.
* **실패한 빌드** 또는 린터 경고 수정
* **열린 이슈 분류 및 트리아지**: Claude에게 열린 GitHub 이슈들을 반복 순회하라고 요청

이렇게 하면 일상적인 작업을 자동화하면서 `gh` 커맨드라인 구문을 기억할 필요가 없습니다.

### h. Claude로 Jupyter 노트북 작업하기

Anthropic의 연구원과 데이터 과학자들은 Jupyter 노트북을 읽고 쓰는 데 Claude Code를 사용합니다. Claude는 이미지를 포함한 출력을 해석해서 데이터를 탐색하고 상호작용하는 빠른 방법을 제공합니다. 필수 프롬프트나 워크플로우는 없지만, Claude Code와 `.ipynb` 파일을 VS Code에서 나란히 열어두는 워크플로우를 권장합니다.

동료에게 보여주기 전에 Claude에게 Jupyter 노트북을 정리하거나 미적 개선을 요청할 수도 있습니다. 노트북이나 데이터 시각화를 "aesthetically pleasing(미적으로 아름답게)"하라고 구체적으로 말하면 인간의 시청 경험에 최적화한다는 것을 상기시키는 데 도움이 됩니다.

## 4. 워크플로우 최적화하기

아래 제안은 모든 워크플로우에 적용됩니다:

### a. 지침을 구체적으로 제시하기

Claude Code의 성공률은 더 구체적인 지침을 제공할수록 크게 향상됩니다, 특히 첫 시도에서. 미리 명확한 방향을 제시하면 나중에 방향 수정의 필요성이 줄어듭니다.

예를 들어:

| 나쁜 예 | 좋은 예 |
|------|------|
| foo.py에 테스트 추가해 | foo.py에 새 테스트 케이스를 작성해, 사용자가 로그아웃된 엣지 케이스를 커버하도록. mock을 사용하지 마 |
| ExecutionFactory는 왜 그렇게 이상한 API를 갖고 있어? | ExecutionFactory의 git 히스토리를 살펴보고 API가 어떻게 현재 상태가 되었는지 요약해줘 |
| 캘린더 위젯 추가해 | 홈 페이지에 기존 위젯이 어떻게 구현되어 있는지 살펴보고 패턴과 특히 코드와 인터페이스가 어떻게 분리되어 있는지 이해해. HotDogWidget.php가 시작하기 좋은 예시야. 그런 다음 패턴을 따라 사용자가 월을 선택하고 앞뒤로 페이지네이션해서 연도를 선택할 수 있는 새 캘린더 위젯을 구현해. 코드베이스의 나머지에서 이미 사용 중인 것 외에 다른 라이브러리 없이 처음부터 빌드해. |

Claude는 의도를 추론할 수 있지만, 마음을 읽을 수는 없습니다. 구체성은 기대와의 더 나은 정렬로 이어집니다.

![Give Claude images](https://www-cdn.anthropic.com/images/4zrzovbb/website/75e1b57a0b696e7aafeca1ed5fa6ba7c601a5953-1360x1126.png)

### b. Claude에게 이미지 제공하기

Claude는 여러 방법으로 이미지와 다이어그램을 훌륭하게 처리합니다:

* **스크린샷 붙여넣기** (프로 팁: macOS에서 _cmd+ctrl+shift+4_를 누르면 클립보드로 스크린샷, _ctrl+v_로 붙여넣기. Mac에서 일반적으로 붙여넣기에 사용하는 cmd+v가 아니며 원격에서는 작동하지 않습니다.)
* **이미지를 프롬프트 입력창에 직접 드래그 앤 드롭**
* **이미지 파일 경로 제공**

UI 개발을 위한 디자인 목업을 참조로 작업하거나, 분석 및 디버깅을 위한 시각적 차트를 다룰 때 특히 유용합니다. 시각 자료를 컨텍스트에 추가하지 않는 경우에도, 결과가 시각적으로 매력적인 것이 얼마나 중요한지 Claude에게 명확히 하면 도움이 됩니다.

![Mention files you want Claude to look at or work on](https://www-cdn.anthropic.com/images/4zrzovbb/website/7372868757dd17b6f2d3fef98d499d7991d89800-1450x1164.png)

### c. Claude가 살펴보거나 작업할 파일 언급하기

탭 완성을 사용해서 저장소 어디에 있든 파일이나 폴더를 빠르게 참조하면, Claude가 올바른 리소스를 찾거나 업데이트하는 데 도움이 됩니다.

![Give Claude URLs](https://www-cdn.anthropic.com/images/4zrzovbb/website/e071de707f209bbaa7f16b593cc7ed0739875dae-1306x1088.png)

### d. Claude에게 URL 제공하기

Claude가 가져와서 읽을 수 있도록 프롬프트와 함께 특정 URL을 붙여넣으세요. 같은 도메인(예: docs.foo.com)에 대한 권한 프롬프트를 피하려면 `/permissions`로 도메인을 허용 목록에 추가하세요.

### e. 일찍 그리고 자주 방향 수정하기

자동 수락 모드(shift+tab으로 토글)가 Claude의 자율적인 작업을 허용하지만, 일반적으로 적극적인 협력자가 되어 Claude의 접근 방식을 안내할 때 더 나은 결과를 얻습니다. 처음에 작업을 철저히 설명하면 최상의 결과를 얻을 수 있지만, 언제든지 Claude의 방향을 수정할 수도 있습니다.

방향 수정에 도움이 되는 네 가지 도구:

* **코딩 전에 계획을 세우라고 Claude에게 요청**합니다. 계획이 좋아 보인다고 확인할 때까지 코드를 작성하지 말라고 명시합니다.
* **아무 단계에서나 Escape를 눌러 Claude를 중단**합니다(사고, 도구 호출, 파일 편집). 컨텍스트가 유지되어 지침을 수정하거나 확장할 수 있습니다.
* **Escape를 두 번 탭해서 히스토리로 돌아가** 이전 프롬프트를 편집하고 다른 방향을 탐색합니다. 원하는 결과를 얻을 때까지 프롬프트를 편집하고 반복할 수 있습니다.
* **Claude에게 변경 사항을 되돌리라고 요청**합니다. 종종 다른 접근 방식을 취하기 위해 옵션 #2와 함께 사용합니다.

Claude Code가 때때로 첫 시도에서 문제를 완벽하게 해결하지만, 이 수정 도구들을 사용하면 일반적으로 더 빠르게 더 나은 솔루션을 만들어냅니다.

### f. `/clear`로 컨텍스트 집중시키기

긴 세션 동안 Claude의 컨텍스트 윈도우가 관련 없는 대화, 파일 내용, 명령어로 채워질 수 있습니다. 이로 인해 성능이 저하되고 때로는 Claude의 주의가 분산됩니다. 작업 간에 `/clear` 명령어를 자주 사용해서 컨텍스트 윈도우를 리셋하세요.

### g. 복잡한 워크플로우에 체크리스트와 스크래치패드 사용하기

코드 마이그레이션, 많은 린트 오류 수정, 복잡한 빌드 스크립트 실행처럼 여러 단계가 있거나 철저한 솔루션이 필요한 대규모 작업의 경우, Claude가 마크다운 파일(또는 GitHub 이슈!)을 체크리스트 및 작업 스크래치패드로 사용하게 해서 성능을 높일 수 있습니다:

예를 들어, 많은 수의 린트 이슈를 수정하려면:

1. **Claude에게 린트 명령어를 실행**하고 결과로 나온 모든 오류(파일명과 줄 번호 포함)를 마크다운 체크리스트에 작성하라고 지시합니다
2. **Claude에게 각 이슈를 하나씩 처리**하고, 수정하고 확인한 후 체크 표시하고 다음으로 넘어가라고 지시합니다

### h. Claude에게 데이터 전달하기

Claude에게 데이터를 제공하는 여러 방법:

* **프롬프트에 직접 복사해서 붙여넣기** (가장 일반적)
* **Claude Code로 파이프** (예: `cat foo.txt | claude`), 로그, CSV, 대용량 데이터에 특히 유용
* **Claude에게 데이터를 가져오라고 지시**: bash 명령어, MCP 도구, 또는 커스텀 슬래시 명령어로
* **Claude에게 파일을 읽거나 URL을 가져오라고 요청** (이미지에도 작동)

대부분의 세션에서는 이 접근 방식들을 조합해서 사용합니다. 예를 들어, 로그 파일을 파이프로 전달한 다음 Claude에게 도구로 추가 컨텍스트를 가져와 로그를 디버그하라고 말할 수 있습니다.

## 5. 헤드리스 모드로 인프라 자동화하기

Claude Code는 CI, pre-commit 훅, 빌드 스크립트, 자동화 같은 비대화형 컨텍스트를 위한 [헤드리스 모드](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#automate-ci-and-infra-workflows)를 포함합니다. `-p` 플래그와 프롬프트로 헤드리스 모드를 활성화하고, `--output-format stream-json`으로 스트리밍 JSON 출력을 받으세요.

헤드리스 모드는 세션 간에 유지되지 않습니다. 각 세션마다 트리거해야 합니다.

### a. Claude를 이슈 트리아지에 사용하기

헤드리스 모드는 저장소에 새 이슈가 생성되는 것 같은 GitHub 이벤트에 의해 트리거되는 자동화를 구동할 수 있습니다. 예를 들어, 공개 [Claude Code 저장소](https://github.com/anthropics/claude-code/blob/main/.github/actions/claude-issue-triage-action/action.yml)는 새 이슈가 들어오면 Claude로 검사하고 적절한 레이블을 할당합니다.

### b. Claude를 린터로 사용하기

Claude Code는 전통적인 린팅 도구가 감지하지 못하는 [주관적인 코드 리뷰](https://github.com/anthropics/claude-code-action/blob/main/action.yml)를 제공합니다. 오타, 오래된 주석, 오해의 소지가 있는 함수 또는 변수명 등의 이슈를 식별합니다.

## 6. 멀티 Claude 워크플로우로 레벨업하기

단독 사용을 넘어, 가장 강력한 응용 중 일부는 여러 Claude 인스턴스를 병렬로 실행하는 것입니다:

### a. 한 Claude가 코드를 작성하고; 다른 Claude가 검증

간단하지만 효과적인 접근 방식은 한 Claude가 코드를 작성하고 다른 Claude가 리뷰하거나 테스트하는 것입니다. 여러 엔지니어와 작업하듯이, 때로는 분리된 컨텍스트를 갖는 것이 유익합니다:

1. Claude로 코드 작성
2. `/clear`를 실행하거나 다른 터미널에서 두 번째 Claude 시작
3. 두 번째 Claude가 첫 번째 Claude의 작업을 리뷰하게 함
4. 다른 Claude를 시작(또는 `/clear` 다시)해서 코드와 리뷰 피드백 모두 읽기
5. 이 Claude가 피드백을 기반으로 코드를 편집하게 함

테스트로도 유사하게 할 수 있습니다: 한 Claude가 테스트를 작성하고, 다른 Claude가 테스트를 통과하는 코드를 작성합니다. Claude 인스턴스들이 서로 통신하게 하려면 별도의 작업 스크래치패드를 주고 어느 것에 쓰고 어느 것을 읽을지 알려줄 수도 있습니다.

이 분리는 종종 단일 Claude가 모든 것을 처리하는 것보다 더 나은 결과를 낳습니다.

### b. 저장소의 여러 체크아웃 보유하기

Claude가 각 단계를 완료할 때까지 기다리는 대신, Anthropic의 많은 엔지니어가 하는 방법:

1. **별도 폴더에 3-4개의 git 체크아웃 생성**
2. **각 폴더를 별도 터미널 탭에서 열기**
3. **각 폴더에서 다른 작업으로 Claude 시작**
4. **순환하며** 진행 상황 확인 및 권한 요청 승인/거부

### c. git 워크트리 사용하기

이 접근 방식은 여러 독립적인 작업에서 빛을 발하며, 여러 체크아웃보다 더 가벼운 대안입니다. Git 워크트리를 사용하면 동일한 저장소에서 여러 브랜치를 별도 디렉토리로 체크아웃할 수 있습니다. 각 워크트리는 동일한 Git 히스토리와 reflog를 공유하면서 자체 작업 디렉토리와 격리된 파일을 갖습니다.

git 워크트리를 사용하면 프로젝트의 다른 부분에서 여러 Claude 세션을 동시에 실행할 수 있으며, 각각 자신의 독립적인 작업에 집중합니다. 예를 들어, 한 Claude가 인증 시스템을 리팩터링하는 동안 다른 Claude가 완전히 관련 없는 데이터 시각화 컴포넌트를 빌드할 수 있습니다. 작업이 겹치지 않으므로 각 Claude는 다른 Claude의 변경을 기다리거나 머지 충돌을 처리할 필요 없이 전속력으로 작업합니다:

1. **워크트리 생성**: `git worktree add ../project-feature-a feature-a`
2. **각 워크트리에서 Claude 시작**: `cd ../project-feature-a && claude`
3. **필요에 따라 추가 워크트리 생성** (새 터미널 탭에서 1-2단계 반복)

몇 가지 팁:

* 일관된 명명 규칙 사용
* 워크트리당 하나의 터미널 탭 유지
* Mac에서 iTerm2를 사용한다면, Claude가 주의를 필요로 할 때 [알림 설정](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#notification-setup)
* 다른 워크트리에는 별도의 IDE 창 사용
* 완료 시 정리: `git worktree remove ../project-feature-a`

### d. 커스텀 하네스와 함께 헤드리스 모드 사용하기

`claude -p` (헤드리스 모드)는 내장 도구와 시스템 프롬프트를 활용하면서 Claude Code를 더 큰 워크플로우에 프로그래밍 방식으로 통합합니다. 헤드리스 모드를 사용하는 두 가지 주요 패턴:

1. **팬 아웃**은 대규모 마이그레이션이나 분석을 처리합니다(예: 수백 개 로그에서 감정 분석 또는 수천 개 CSV 분석):

   1. Claude에게 작업 목록을 생성하는 스크립트를 작성하게 합니다. 예: 프레임워크 A에서 프레임워크 B로 마이그레이션해야 하는 2천 개 파일 목록 생성
   2. 작업을 반복하며 각각에 대해 프로그래밍 방식으로 Claude를 호출하고 작업과 사용할 수 있는 도구 세트를 제공합니다. 예: `claude -p "migrate foo.py from React to Vue. When you are done, you MUST return the string OK if you succeeded, or FAIL if the task failed." --allowedTools Edit Bash(git commit:*)`
   3. 스크립트를 여러 번 실행하고 원하는 결과를 얻기 위해 프롬프트를 다듬습니다.

2. **파이프라이닝**은 Claude를 기존 데이터/처리 파이프라인에 통합합니다:

   1. `claude -p "<your prompt>" --json | your_command`를 호출합니다. 여기서 `your_command`는 처리 파이프라인의 다음 단계
   2. 그게 전부입니다! JSON 출력(선택 사항)은 더 쉬운 자동화 처리를 위한 구조를 제공합니다.

이 두 사용 사례 모두에서 Claude 호출을 디버깅하기 위해 `--verbose` 플래그를 사용하면 도움이 됩니다. 일반적으로 더 깔끔한 출력을 위해 프로덕션에서는 verbose 모드를 끄세요.

---

Claude Code 작업을 위한 여러분의 팁과 모범 사례는 무엇인가요? @AnthropicAI를 태그해서 여러분이 만들고 있는 것을 보여주세요!

## 감사의 글

글 작성: Boris Cherny. 이 글은 더 넓은 Claude Code 사용자 커뮤니티의 모범 사례를 바탕으로 작성되었으며, 그들의 창의적인 접근 방식과 워크플로우는 계속해서 우리에게 영감을 줍니다. Daisy Hollman, Ashwin Bhat, Cat Wu, Sid Bidasaria, Cal Rueb, Nodir Turakulov, Barry Zhang, Drew Hodun 그리고 Claude Code에 대한 귀중한 통찰력과 실제 경험으로 이 권장 사항을 형성하는 데 도움을 준 많은 다른 Anthropic 엔지니어들에게도 특별히 감사드립니다.

---

## 핵심 요약

- **CLAUDE.md 파일 활용**: 프로젝트별 컨텍스트, 명령어, 스타일 가이드를 Claude가 자동으로 참조하도록 설정
- **도구 확장**: bash 도구, MCP 서버, 커스텀 슬래시 명령어로 Claude의 기능 확장 가능
- **효과적인 워크플로우**: 탐색→계획→코딩→커밋 또는 TDD 방식의 체계적 접근 권장
- **구체적인 지침**: 명확하고 상세한 지침이 첫 시도 성공률을 크게 높임
- **멀티 Claude 활용**: 여러 Claude 인스턴스로 작성/리뷰 분리, git 워크트리로 병렬 작업 가능
- **헤드리스 모드 자동화**: CI/CD, 이슈 트리아지, 대규모 마이그레이션 등에 프로그래밍 방식으로 활용
