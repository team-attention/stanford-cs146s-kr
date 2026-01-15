---
title: "APIs don't make good MCP tools"
source_url: "https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/"
source_type: web
author: "Reilly Wood"
fetch_date: "2026-01-12"
translation_status: none
---

The [Model Context Protocol](https://modelcontextprotocol.io/overview) (MCP) is a pretty big deal these days. It's become the de facto standard for giving LLMs access to tools that someone else wrote, which, of course, turns them into [agents](https://simonwillison.net/2025/May/22/tools-in-a-loop/). But writing tools for a new MCP server is hard, and so people often propose [auto-converting existing APIs into MCP tools](https://blog.christianposta.com/semantics-matter-exposing-openapi-as-mcp-tools/); typically using OpenAPI metadata ([1](https://jedisct1.github.io/openapi-mcp/), [2](https://www.gravitee.io/blog/turn-any-rest-api-into-mcp-server-inside-gravitee)).

In my experience, this can work but it doesn't work *well*. Here are a few reasons why:

## Agents don't do well with large numbers of tools

Infamously, [VS Code has a hard limit of 128 tools](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode) - but [many models struggle with accurate tool calling well before that number](https://arxiv.org/abs/2411.15399). Also, each tool and its description takes up valuable context window space.

Most web APIs weren't designed with these constraints in mind! It's fine to have umpteen APIs for a single product area when those APIs are called from code, but if each of those APIs is mapped to an MCP tool the results might not be great.

MCP tools designed from the ground up are typically [much more flexible than individual web APIs](https://engineering.block.xyz/blog/blocks-playbook-for-designing-mcp-servers), with each tool being able to do the work of several individual APIs.

## APIs can blow through context windows quickly

Imagine an API that returns 100 records at a time, and each record is very wide (say, 50 fields). Sending those results to an agent as-is will use up a lot of tokens; even if a query can be satisfied with only a few fields, every field ends up in the context window.

APIs are typically paginated by the number of records, but records can vary a *lot* in size. One record might contain a large text field that takes up 100,000 [tokens](https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens), while another might contain 10. Putting these API results directly into an agent's context window is a gamble; sometimes it works, sometimes it will blow up.

The format of the data can also be an issue. Most web APIs these days return JSON, but JSON is a very token-inefficient format. Take this:

```json
[
  {
    "firstName": "Alice",
    "lastName": "Johnson",
    "age": 28
  },
  {
    "firstName": "Bob",
    "lastName": "Smith",
    "age": 35
  }
]
```

Compare to the same data in CSV format:

```csv
firstName,lastName,age
Alice,Johnson,28
Bob,Smith,35
```

The CSV data is *much* more succinct - it uses up half as many tokens per record. [Typically CSV, TSV, or YAML (for nested data) are better choices than JSON](https://david-gilbertson.medium.com/llm-output-formats-why-json-costs-more-than-tsv-ebaf590bd541).

None of these issues are insurmountable. You could imagine automatically adding tool arguments that let agents [project](https://en.wikipedia.org/wiki/Projection_(relational_algebra)) fields, automatically truncating or summarizing large results, and automatically converting JSON results to CSV (or YAML for nested data). But most servers I've seen do none of those things.

## APIs don't make the most of agents' unique capabilities

APIs return structured data for programmatic consumption. That's often what agents want from tool calls... but agents can *also* handle other, more free-form instructions.

For example an `ask_question` tool could perform a RAG query over some documentation, then return information in plain text that is used to inform the next tool call - skipping structured data entirely.

Or, a call to a `search_cities` tool could return a structured list of cities *and* a suggestion of what to call next:

```csv
city_name,population,country,region
Tokyo,37194000,Japan,Asia
Delhi,32941000,India,Asia
Shanghai,28517000,China,Asia

Suggestion: To get more specific information (weather, attractions, demographics), try calling get_city_details with the city_name parameter.
```

That sort of layering and tool chaining [can be very effective](https://engineering.block.xyz/blog/build-mcp-tools-like-ogres-with-layers) in MCP servers, and it's something you'll miss out on completely if auto-converting APIs to tools.

## If an agent needs to call an API, it could just do that

Agents like Claude Code are remarkably capable of writing+executing code these days, including scripts that call web APIs. Some people take this so far as to [argue that MCP isn't needed at all](https://lucumr.pocoo.org/2025/7/3/tools/)!

I disagree with that conclusion, but I do think we should skate to where the puck is going. [Sandboxing of agents is improving rapidly](https://github.com/openai/codex), and if it's easy+safe for an agent to call APIs directly then we might as well do that and cut out the middleman.

## Conclusion

Agents are fundamentally different from the typical consumers of APIs. It's possible to automatically create MCP tools from existing APIs, but doing that is unlikely to work *well*. Agents do best when given tools that are designed for their unique capabilities and limitations.
