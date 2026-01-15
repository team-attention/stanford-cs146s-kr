---
title: "MCP Specification Overview"
parent_title: "MCP Specification"
parent_slug: "mcp-specification"
source_url: "https://modelcontextprotocol.io/specification/2025-11-25/index"
source_type: web
author: "Anthropic"
fetch_date: "2025-01-13"
translation_status: none
---

# Model Context Protocol - Specification

[원본 링크](https://modelcontextprotocol.io/specification/2025-11-25/index) | [← 목록으로](./_index.md)

---

## Overview

The **Model Context Protocol (MCP)** is an open protocol that enables seamless integration between LLM applications and external data sources and tools. Whether you're building an AI-powered IDE, enhancing a chat interface, or creating custom AI workflows, MCP provides a standardized way to connect LLMs with the context they need.

This specification defines the authoritative protocol requirements, based on the TypeScript schema in [schema.ts](https://github.com/modelcontextprotocol/specification/blob/main/schema/2025-11-25/schema.ts). For implementation guides and examples, visit [modelcontextprotocol.io](https://modelcontextprotocol.io).

**Key RFC 2119 Keywords**: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [BCP 14](https://datatracker.ietf.org/doc/html/bcp14), [RFC2119](https://datatracker.ietf.org/doc/html/rfc2119), and [RFC8174](https://datatracker.ietf.org/doc/html/rfc8174).

---

## Key Details

### Base Protocol

- **JSON-RPC** 2.0 message format
- Stateful connections
- Server and client capability negotiation

### Features

**Servers offer the following features to clients:**

- **Resources**: Context and data, for the user or the AI model to use
- **Prompts**: Templated messages and workflows for users
- **Tools**: Functions for the AI model to execute

**Clients may offer the following features to servers:**

- **Sampling**: Server-initiated agentic behaviors and recursive LLM interactions
- **Roots**: Server-initiated inquiries into URI or filesystem boundaries to operate in
- **Elicitation**: Server-initiated requests for additional information from users

### Additional Utilities

- Configuration
- Progress tracking
- Cancellation
- Error reporting
- Logging

---

## Security and Trust & Safety

The Model Context Protocol enables powerful capabilities through arbitrary data access and code execution paths. With this power comes important security and trust considerations that all implementors must carefully address.

### Key Principles

#### 1. User Consent and Control

- Users must explicitly consent to and understand all data access and operations
- Users must retain control over what data is shared and what actions are taken
- Implementors should provide clear UIs for reviewing and authorizing activities

#### 2. Data Privacy

- Hosts must obtain explicit user consent before exposing user data to servers
- Hosts must not transmit resource data elsewhere without user consent
- User data should be protected with appropriate access controls

#### 3. Tool Safety

- **Tools represent arbitrary code execution** and must be treated with appropriate caution
  - In particular, descriptions of tool behavior such as annotations should be considered untrusted, unless obtained from a trusted server
- Hosts must obtain explicit user consent before invoking any tool
- Users should understand what each tool does before authorizing its use

#### 4. LLM Sampling Controls

- Users must explicitly approve any LLM sampling requests
- Users should control:
  - Whether sampling occurs at all
  - The actual prompt that will be sent
  - What results the server can see
- The protocol intentionally limits server visibility into prompts

### Implementation Guidelines

While MCP itself cannot enforce these security principles at the protocol level, implementors **SHOULD**:

1. Build robust consent and authorization flows into their applications
2. Provide clear documentation of security implications
3. Implement appropriate access controls and data protections
4. Follow security best practices in their integrations
5. Consider privacy implications in their feature designs

---

## Architecture

MCP takes inspiration from the [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), which standardizes how to add support for programming languages across a whole ecosystem of development tools. In a similar way, MCP standardizes how to integrate additional context and tools into the ecosystem of AI applications.

The protocol uses **JSON-RPC 2.0** messages to establish communication between:

- **Hosts**: LLM applications that initiate connections
- **Clients**: Connectors within the host application
- **Servers**: Services that provide context and capabilities

---

## Learn More

Explore the detailed specification for each protocol component:

- [Architecture](/specification/2025-11-25/architecture)
- [Base Protocol](/specification/2025-11-25/basic)
- [Server Features](/specification/2025-11-25/server)
- [Client Features](/specification/2025-11-25/client)
- [Contributing](/development/contributing)
