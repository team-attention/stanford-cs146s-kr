---
title: "Tool use with Claude"
parent_title: "Tool Use with Claude"
parent_slug: "tool-use-claude"
source_url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview"
source_type: web
author: "Anthropic"
fetch_date: "2025-01-13"
translation_status: none
---

# Tool use with Claude

[원본 링크](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview) | [← 목록으로](./_index.md)

---

Claude is capable of interacting with tools and functions, allowing you to extend Claude's capabilities to perform a wider variety of tasks.

Here's an example of how to provide tools to Claude using the Messages API:

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=[
        {
            "name": "get_weather",
            "description": "Get the current weather in a given location",
            "input_schema": {
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string",
                        "description": "The city and state, e.g. San Francisco, CA",
                    }
                },
                "required": ["location"],
            },
        }
    ],
    messages=[{"role": "user", "content": "What's the weather like in San Francisco?"}],
)
print(response)
```

---

## How tool use works

Claude supports two types of tools:

1. **Client tools**: Tools that execute on your systems, which include:
   - User-defined custom tools that you create and implement
   - Anthropic-defined tools like computer use and text editor that require client implementation

2. **Server tools**: Tools that execute on Anthropic's servers, like the web search and web fetch tools. These tools must be specified in the API request but don't require implementation on your part.

### Client tools

Integrate client tools with Claude in these steps:

1. **Provide Claude with tools and a user prompt**
   - Define client tools with names, descriptions, and input schemas in your API request.
   - Include a user prompt that might require these tools.

2. **Claude decides to use a tool**
   - Claude assesses if any tools can help with the user's query.
   - If yes, Claude constructs a properly formatted tool use request.
   - For client tools, the API response has a `stop_reason` of `tool_use`.

3. **Execute the tool and return results**
   - Extract the tool name and input from Claude's request
   - Execute the tool code on your system
   - Return the results in a new `user` message containing a `tool_result` content block

4. **Claude uses tool result to formulate a response**
   - Claude analyzes the tool results to craft its final response.

### Server tools

Server tools follow a different workflow:

1. **Provide Claude with tools and a user prompt**
   - Server tools, like web search and web fetch, have their own parameters.

2. **Claude executes the server tool**
   - Claude assesses if a server tool can help with the user's query.
   - If yes, Claude executes the tool, and the results are automatically incorporated.

3. **Claude uses the server tool result to formulate a response**
   - No additional user interaction is needed for server tool execution.

---

## Using MCP tools with Claude

If you're building an application that uses the Model Context Protocol (MCP), you can use tools from MCP servers directly with Claude's Messages API. MCP tool definitions use a schema format that's similar to Claude's tool format. You just need to rename `inputSchema` to `input_schema`.

### Converting MCP tools to Claude format

When you build an MCP client and call `list_tools()` on an MCP server, you'll receive tool definitions with an `inputSchema` field. To use these tools with Claude, convert them to Claude's format:

```python
from mcp import ClientSession

async def get_claude_tools(mcp_session: ClientSession):
    """Convert MCP tools to Claude's tool format."""
    mcp_tools = await mcp_session.list_tools()

    claude_tools = []
    for tool in mcp_tools.tools:
        claude_tools.append({
            "name": tool.name,
            "description": tool.description or "",
            "input_schema": tool.inputSchema  # Rename inputSchema to input_schema
        })

    return claude_tools
```

Then pass these converted tools to Claude:

```python
import anthropic

client = anthropic.Anthropic()
claude_tools = await get_claude_tools(mcp_session)

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=claude_tools,
    messages=[{"role": "user", "content": "What tools do you have available?"}]
)
```

When Claude responds with a `tool_use` block, execute the tool on your MCP server using `call_tool()` and return the result to Claude in a `tool_result` block.

---

## Tool use examples

### Single tool example

```python
import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    tools=[
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
                        "description": "The unit of temperature"
                    }
                },
                "required": ["location"]
            }
        }
    ],
    messages=[{"role": "user", "content": "What is the weather like in San Francisco?"}]
)

print(response)
```

Claude will return a response similar to:

```json
{
  "id": "msg_01Aq9w938a90dw8q",
  "model": "claude-sonnet-4-5",
  "stop_reason": "tool_use",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "I'll check the current weather in San Francisco for you."
    },
    {
      "type": "tool_use",
      "id": "toolu_01A09q90qw90lq917835lq9",
      "name": "get_weather",
      "input": {"location": "San Francisco, CA", "unit": "celsius"}
    }
  ]
}
```

### Multiple tool example

You can provide Claude with multiple tools to choose from in a single request.

### Parallel tool use

Claude can call multiple tools in parallel within a single response, which is useful for tasks that require multiple independent operations.

### Sequential tools

Some tasks may require calling multiple tools in sequence, using the output of one tool as the input to another.

---

## Pricing

Tool use requests are priced based on:
1. The total number of input tokens sent to the model (including in the `tools` parameter)
2. The number of output tokens generated
3. For server-side tools, additional usage-based pricing

The additional tokens from tool use come from:
- The `tools` parameter in API requests
- `tool_use` content blocks in API requests and responses
- `tool_result` content blocks in API requests

When you use `tools`, we also automatically include a special system prompt for the model which enables tool use.
