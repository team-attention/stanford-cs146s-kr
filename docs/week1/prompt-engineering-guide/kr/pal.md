---
title: "프로그램 지원 언어 모델 (PAL)"
originalTitle: "Program-Aided Language Models"
author: "DAIR.AI"
sourceUrl: "https://www.promptingguide.ai/techniques/pal"
translatedAt: "2026-01-08"
status: "final"
---

# 프로그램 지원 언어 모델 (PAL)

[Gao et al., (2022)](https://arxiv.org/abs/2211.10435)은 LLM으로 자연어 문제를 읽고 중간 추론 단계로 프로그램을 생성하는 방법을 제시했습니다. PAL(프로그램 지원 언어 모델)이라 명명된 이 방법은 Chain of Thought 프롬프팅과 달리, 자유 형식 텍스트로 솔루션을 도출하는 대신 Python 인터프리터 같은 프로그래밍 런타임에 솔루션 단계를 위임합니다.

## PAL 작동 방식

PAL은 언어 모델이 자유 형식 텍스트 설명 대신 실행 가능한 프로그램을 중간 추론 단계로 생성하는 접근 방식입니다. 모델은 자연어 문제를 읽고 런타임 환경(주로 Python)에서 실행하여 답을 도출하는 프로그램을 생성합니다.

### Chain of Thought와의 핵심 차이점

자연어 추론을 사용하는 Chain of Thought 프롬프팅과 달리 PAL은 코드 실행을 활용합니다. 이 방식은 모델 예측에만 의존하지 않고 결정론적 프로그래밍에 계산 작업을 위임하여 추론 정확도를 높입니다.

## 실제 구현

워크플로우는 다음과 같습니다:

1. **설정**: API 키를 구성하고 언어 모델 인스턴스를 생성합니다
2. **프롬프트 엔지니어링**: 문제를 Python 코드로 구조화하는 few-shot 예시를 제공합니다
3. **모델 출력**: LLM이 Python 코드 스니펫을 생성합니다
4. **실행**: Python `exec()` 함수로 생성된 코드를 실행해 최종 답을 얻습니다

## 예시: 날짜 이해

LangChain과 OpenAI를 사용한 예시를 살펴보겠습니다:

```python
import openai
from datetime import datetime
from dateutil.relativedelta import relativedelta
import os
from langchain.llms import OpenAI
from dotenv import load_dotenv
```

```python
load_dotenv()

# API 구성
openai.api_key = os.getenv("OPENAI_API_KEY")

# LangChain용
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
```

모델 인스턴스 설정:

```python
llm = OpenAI(model_name='text-davinci-003', temperature=0)
```

프롬프트 + 질문 설정:

```python
question = "Today is 27 February 2023. I was born exactly 25 years ago. What is the date I was born in MM/DD/YYYY?"

DATE_UNDERSTANDING_PROMPT = """
# Q: 2015 is coming in 36 hours. What is the date one week from today in MM/DD/YYYY?
# If 2015 is coming in 36 hours, then today is 36 hours before.
today = datetime(2015, 1, 1) - relativedelta(hours=36)
# One week from today,
one_week_from_today = today + relativedelta(weeks=1)
# The answer formatted with %m/%d/%Y is
one_week_from_today.strftime('%m/%d/%Y')
# Q: The first day of 2019 is a Tuesday, and today is the first Monday of 2019. What is the date today in MM/DD/YYYY?
# If the first day of 2019 is a Tuesday, and today is the first Monday of 2019, then today is 6 days later.
today = datetime(2019, 1, 1) + relativedelta(days=6)
# The answer formatted with %m/%d/%Y is
today.strftime('%m/%d/%Y')
# Q: The concert was scheduled to be on 06/01/1943, but was delayed by one day to today. What is the date 10 days ago in MM/DD/YYYY?
# If the concert was scheduled to be on 06/01/1943, but was delayed by one day to today, then today is one day later.
today = datetime(1943, 6, 1) + relativedelta(days=1)
# 10 days ago,
ten_days_ago = today - relativedelta(days=10)
# The answer formatted with %m/%d/%Y is
ten_days_ago.strftime('%m/%d/%Y')
# Q: It is 4/19/1969 today. What is the date 24 hours later in MM/DD/YYYY?
# It is 4/19/1969 today.
today = datetime(1969, 4, 19)
# 24 hours later,
later = today + relativedelta(hours=24)
# The answer formatted with %m/%d/%Y is
later.strftime('%m/%d/%Y')
# Q: Jane thought today is 3/11/2002, but today is actually Mar 12, which is 1 day later. What is the date 24 hours later in MM/DD/YYYY?
# If Jane thought today is 3/11/2002, but today is actually Mar 12, then today is 3/12/2002.
today = datetime(2002, 3, 12)
# 24 hours later,
later = today + relativedelta(hours=24)
# The answer formatted with %m/%d/%Y is
later.strftime('%m/%d/%Y')
# Q: Jane was born on the last day of February in 2001. Today is her 16-year-old birthday. What is the date yesterday in MM/DD/YYYY?
# If Jane was born on the last day of February in 2001 and today is her 16-year-old birthday, then today is 16 years later.
today = datetime(2001, 2, 28) + relativedelta(years=16)
# Yesterday,
yesterday = today - relativedelta(days=1)
# The answer formatted with %m/%d/%Y is
yesterday.strftime('%m/%d/%Y')
# Q: {question}
""".strip() + '\n'
```

```python
llm_out = llm(DATE_UNDERSTANDING_PROMPT.format(question=question))
print(llm_out)
```

```python
# If today is 27 February 2023 and I was born exactly 25 years ago, then I was born 25 years before.
today = datetime(2023, 2, 27)
# I was born 25 years ago,
born = today - relativedelta(years=25)
# The answer formatted with %m/%d/%Y is
born.strftime('%m/%d/%Y')
```

```python
exec(llm_out)
print(born)
```

```
02/27/1998
```

## PAL이 효과적인 이유

PAL이 효과적인 이유는 다음과 같습니다:

1. **계산 위임**: 수학적, 논리적 연산을 신뢰할 수 있는 런타임이 처리합니다
2. **환각 감소**: 모델이 계산 결과를 "상상"할 필요가 없습니다
3. **검증 가능성**: 생성된 코드를 검사하고 디버깅할 수 있습니다
4. **모델 강점 활용**: LLM은 문제 이해와 구조화된 코드 생성에 뛰어납니다

## 참고 자료

- [PAL: Program-aided Language Models](https://arxiv.org/abs/2211.10435) - Gao et al., 2022
- [Prompting Guide - PAL](https://www.promptingguide.ai/techniques/pal)

---

## 핵심 요약

- PAL은 LLM이 추론 단계로 실행 가능한 프로그램을 생성하고 Python 런타임이 이를 실행하는 방법입니다
- Chain of Thought 프롬프팅과 달리 자유 형식 텍스트 대신 코드 실행을 활용합니다
- 계산을 런타임에 위임하여 정확도를 높이고 환각을 줄입니다
- 날짜 계산, 수학 문제 등 결정론적 연산이 필요한 작업에 특히 효과적입니다
