---
title: "Program-Aided Language Models"
source_url: "https://www.promptingguide.ai/techniques/pal"
source_type: web
author: "DAIR.AI"
fetch_date: "2026-01-08"
---

# Program-Aided Language Models (PAL)

[Gao et al., (2022)](https://arxiv.org/abs/2211.10435) presents a method that uses LLMs to read natural language problems and generate programs as the intermediate reasoning steps. Coined, program-aided language models (PAL), it differs from chain-of-thought prompting in that instead of using free-form text to obtain solution it offloads the solution step to a programmatic runtime such as a Python interpreter.

## How PAL Works

PAL represents an approach where language models generate executable programs as intermediate reasoning steps rather than relying on free-form text explanations. The model reads problems in natural language and produces programs that a runtime environment (typically Python) can execute to derive answers.

### Key Difference from Chain-of-Thought

Unlike chain-of-thought prompting that uses natural language reasoning, PAL leverages code execution. This approach enhances reasoning accuracy by delegating computational tasks to deterministic programming rather than relying solely on model predictions.

## Practical Implementation

The workflow involves:

1. **Setup**: Configure API keys and instantiate the language model
2. **Prompt Engineering**: Provide few-shot examples showing how to structure problems as Python code
3. **Model Output**: The LLM generates Python code snippets
4. **Execution**: Run the generated code using Python's `exec()` function to obtain final answers

## Example: Date Understanding

Let's look at an example using LangChain and OpenAI:

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

# API configuration
openai.api_key = os.getenv("OPENAI_API_KEY")

# for LangChain
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
```

Setup model instance:

```python
llm = OpenAI(model_name='text-davinci-003', temperature=0)
```

Setup prompt + question:

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

## Why PAL Works

PAL is effective because it:

1. **Offloads computation**: Mathematical and logical operations are handled by a reliable runtime
2. **Reduces hallucination**: The model doesn't need to "imagine" computational results
3. **Provides verifiability**: Generated code can be inspected and debugged
4. **Leverages model strengths**: LLMs are good at understanding problems and generating structured code

## References

- [PAL: Program-aided Language Models](https://arxiv.org/abs/2211.10435) - Gao et al., 2022
- [Prompting Guide - PAL](https://www.promptingguide.ai/techniques/pal)
