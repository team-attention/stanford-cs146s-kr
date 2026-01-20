---
title: "AI 프롬프트로 Postgres 명령어 작성하기"
originalTitle: "Write Postgres Command with AI Prompts"
category: "developer-workflows"
sourceUrl: "https://youtu.be/guXQSMq_Yss"
translatedAt: "2026-01-20"
status: "draft"
---

# AI 프롬프트로 Postgres 명령어 작성하기

[영상 바로가기](https://youtu.be/guXQSMq_Yss)

## 전체 번역

안녕하세요, 오늘은 Warp에서 좀 더 숨겨져 있지만 멋진 기능 중 하나를 보여드리려고 합니다. Warp의 AI 기능을 장시간 실행되는 터미널 앱의 REPL(Read-Eval-Print Loop) 내에서 사용할 수 있다는 점입니다. 이를 통해 이러한 도구에서 수행하는 인터랙티브 작업을 어떻게 처리해야 할지 파악하는 데 도움을 받을 수 있습니다.

Postgres REPL을 사용해서 시연해 보겠지만, 이 기능은 Node에서도, Python에서도, GDB에서도, MySQL에서도 작동합니다. 자유롭게 사용해 보세요.

자, REPL에 접속해 보겠습니다. 솔직히 저는 Postgres를 어떻게 사용하는지 잘 모릅니다.

Command + I를 누르면 입력 생성 기능이 실행됩니다. 여기서 영어로 타이핑하거나 말하면, 입력한 영어가 현재 사용 중인 REPL의 언어로 번역됩니다. 예를 들어 "show me all tables"라고 입력하면 이것이 `\dt` 명령어로 변환됩니다.

이제 "show me our users table and our teams table"이라고 입력해 보겠습니다. 한 번에 두 가지를 요청하겠습니다. 멋진 점은 이렇게 진행하면서 AI가 구조를 학습하고, REPL 내에서 출력되는 데이터를 학습한다는 것입니다.

이제 정말 멋진 것을 해볼 수 있습니다. "Show me all of the users who have joined Warp in the last 90 days from public email accounts like Gmail, Yahoo, Hotmail and are on teams of more than two people."

여기서 음성 단축키를 눌러 Warp에게 말을 걸어 봅니다. 보시다시피 제가 이렇게 할 수 있습니다. 꽤 복잡한 쿼리가 생성되고, 이를 바로 실행할 수 있습니다. 이 조건을 충족하는 사람이 한 명 나왔네요. 어차피 이건 전부 가짜 데이터니까 여러분이 보셔도 크게 신경 쓰이지 않습니다.

어쨌든 정말 멋진 기능입니다. 재미있게 사용해 보세요!

---

## 핵심 요약

- **Warp의 숨겨진 AI 기능**: Command + I로 REPL 내에서 AI 입력 생성 사용 가능
- **자연어 → SQL 변환**: 영어로 요청하면 현재 REPL 언어(Postgres, Node, Python 등)로 자동 번역
- **컨텍스트 학습**: AI가 REPL 출력 데이터와 구조를 학습하여 점점 더 정확한 쿼리 생성
- **복잡한 쿼리 생성**: 다중 조건 쿼리도 자연어로 요청 가능 (예: 90일 내 가입, 특정 이메일 도메인, 팀 크기 조건)
- **음성 입력 지원**: 음성 단축키로 말하기만 해도 명령어 생성 가능
- **범용성**: Postgres뿐만 아니라 Node, Python, GDB, MySQL 등 다양한 REPL에서 사용 가능
