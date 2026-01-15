---
title: "How to implement tool use"
parent_title: "Tool Use with Claude"
parent_slug: "tool-use-claude"
source_url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use"
source_type: web
author: "Anthropic"
fetch_date: "2025-01-13"
translation_status: none
---

# How to implement tool use

[원본 링크](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use) | [← 목록으로](./_index.md)

---

## Choosing a model

We recommend using the latest Claude Sonnet (4.5) or Claude Opus (4.5) model for complex tools and ambiguous queries; they handle multiple tools better and seek clarification when needed.

Use Claude Haiku models for straightforward tools, but note they may infer missing parameters.

## Specifying client tools

Client tools are specified in the `tools` top-level parameter of the API request. Each tool definition includes:

| Parameter | Description |
|:----------|:------------|
| `name` | The name of the tool. Must match the regex `^[a-zA-Z0-9_-]{1,64}$`. |
| `description` | A detailed plaintext description of what the tool does, when it should be used, and how it behaves. |
| `input_schema` | A JSON Schema object defining the expected parameters for the tool. |
| `input_examples` | (Optional, beta) An array of example input objects to help Claude understand how to use the tool. |

### Example simple tool definition

```json
{
  "name": "get_weather",
  "description": "Get the current weather in a given location",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "The city and state, e.g. San Francisco, CA"
      },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"],
        "description": "The unit of temperature, either 'celsius' or 'fahrenheit'"
      }
    },
    "required": ["location"]
  }
}
```

### Best practices for tool definitions

- **Provide extremely detailed descriptions.** This is by far the most important factor in tool performance. Your descriptions should explain every detail about the tool.
- **Prioritize descriptions, but consider using `input_examples` for complex tools.**

### Example of a good tool description

```json
{
  "name": "get_stock_price",
  "description": "Retrieves the current stock price for a given ticker symbol. The ticker symbol must be a valid symbol for a publicly traded company on a major US stock exchange like NYSE or NASDAQ. The tool will return the latest trade price in USD. It should be used when the user asks about the current or most recent price of a specific stock. It will not provide any other information about the stock or company.",
  "input_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "The stock ticker symbol, e.g. AAPL for Apple Inc."
      }
    },
    "required": ["ticker"]
  }
}
```

## Tool runner (beta)

The tool runner provides an out-of-the-box solution for executing tools with Claude. Instead of manually handling tool calls, tool results, and conversation management, the tool runner automatically:

- Executes tools when Claude calls them
- Handles the request/response cycle
- Manages conversation state
- Provides type safety and validation

### Basic usage (Python)

```python
import anthropic
import json
from anthropic import beta_tool

client = anthropic.Anthropic()

@beta_tool
def get_weather(location: str, unit: str = "fahrenheit") -> str:
    """Get the current weather in a given location.

    Args:
        location: The city and state, e.g. San Francisco, CA
        unit: Temperature unit, either 'celsius' or 'fahrenheit'
    """
    return json.dumps({"temperature": "20°C", "condition": "Sunny"})

runner = client.beta.messages.tool_runner(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=[get_weather],
    messages=[
        {"role": "user", "content": "What's the weather like in Paris?"}
    ]
)
for message in runner:
    print(message.content[0].text)
```

## Controlling Claude's output

### Forcing tool use

You can force Claude to use a specific tool by specifying the tool in the `tool_choice` field:

```python
tool_choice = {"type": "tool", "name": "get_weather"}
```

Options for `tool_choice`:
- `auto`: Claude decides whether to call any provided tools (default)
- `any`: Claude must use one of the provided tools
- `tool`: Force Claude to always use a particular tool
- `none`: Prevent Claude from using any tools

### Parallel tool use

By default, Claude may use multiple tools to answer a user query. You can disable this behavior by setting `disable_parallel_tool_use=true`.

## Handling tool use and tool result content blocks

### Handling results from client tools

The response will have a `stop_reason` of `tool_use` and one or more `tool_use` content blocks that include:

- `id`: A unique identifier for this particular tool use block
- `name`: The name of the tool being used
- `input`: An object containing the input being passed to the tool

When you receive a tool use response:

1. Extract the `name`, `id`, and `input` from the `tool_use` block.
2. Run the actual tool in your codebase.
3. Continue the conversation by sending a new message with `role` of `user`, and a `content` block containing the `tool_result`.

### Example of successful tool result

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
      "content": "15 degrees"
    }
  ]
}
```

### Important formatting requirements

- Tool result blocks must immediately follow their corresponding tool use blocks
- In the user message containing tool results, the tool_result blocks must come FIRST in the content array

## Troubleshooting errors

### Tool execution error

If the tool throws an error during execution, return the error message with `"is_error": true`:

```json
{
  "role": "user",
  "content": [
    {
      "type": "tool_result",
      "tool_use_id": "toolu_01A09q90qw90lq917835lq9",
      "content": "ConnectionError: the weather service API is not available",
      "is_error": true
    }
  ]
}
```

### Invalid tool name

If Claude's attempted use of a tool is invalid, you can continue the conversation with a `tool_result` that indicates the error, and Claude will try again with the missing information.

### Parallel tool calls not working

Common issues:
1. **Incorrect tool result formatting**: All tool results must be in a single user message
2. **Weak prompting**: Use stronger language to encourage parallel calls
3. **Model-specific behavior**: Claude Opus 4.5 and Sonnet 4 excel at parallel tool use

---

For more examples and detailed implementation guides, visit the [Anthropic Cookbook](https://platform.claude.com/cookbook).
