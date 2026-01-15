---
title: "Introducing the MCP Registry"
source_url: "https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/"
source_type: web
author: "David Soria Parra, Adam Jones, Tadas Antanavicius, Toby Padilla, Theodora Chu"
published_date: "2025-09-08"
fetch_date: "2026-01-12"
translation_status: none
---

# Introducing the MCP Registry

The MCP Registry is now available in preview.

We are excited to announce the launch of the MCP Registry at https://registry.modelcontextprotocol.io—an open catalog and API for publicly available MCP servers to improve discoverability and implementation. By standardizing how servers are distributed and discovered, the registry expands their reach while making it easier for clients to get connected.

As part of the MCP project, the MCP Registry, as well as a parent OpenAPI specification, are open source—allowing everyone to build a compatible sub-registry.

## Background

In February 2025, the project began as a grassroots effort when MCP creators David Soria Parra and Justin Spahr-Summers asked the PulseMCP and Goose teams to help build a centralized community registry. Registry Maintainer Tadas Antanavicius from PulseMCP spearheaded the initial effort in collaboration with Alex Hancock from Block. They were soon joined by Registry Maintainer Toby Padilla, Head of MCP at GitHub, and more recently, Adam Jones from Anthropic joined as Registry Maintainer.

## Architecture

One of the registry's key architectural decisions is to embrace federation: the upstream MCP Registry is not the only registry. Instead, it serves as the canonical source of public MCP server metadata that subregistries (public or private) can ingest, augment, or mirror.

### Design Principles

The MCP Registry follows core design principles:

- **Single Source of Truth**: Authoritative metadata repository for publicly-available MCP servers
- **Vendor Neutrality**: No preferential treatment for specific servers or organizations
- **Industry Security Standards**: Leverage existing package registries for security
- **Reusability**: API shapes designed for reuse, supporting private/internal registries
- **Progressive Enhancement**: Start with MVP, build foundation for future features

### How It Works

MCP registries are metaregistries. They host metadata about packages, but not the package code or binaries. The MCP Registry stores metadata about MCP servers and references to where they're hosted (npm, PyPI, NuGet, Docker Hub, etc.), but does not host the actual source code or packages.

Server maintainers publish metadata describing each MCP server (endpoint, capabilities, versioning, and related fields). The registry enforces minimal validation (e.g. namespace uniqueness, schema conformance) to maintain a reliable catalog.

A read-only API at registry.modelcontextprotocol.io exposes server listings (e.g., GET /v0/servers), making it trivial for clients and aggregators to keep their catalogs fresh.

## Subregistries

Public subregistries like opinionated "MCP marketplaces" associated with each MCP client are free to augment and enhance data they ingest from the upstream MCP Registry. Every MCP end-user persona will have different needs, and it is up to the MCP client marketplaces to properly serve their end-users in opinionated ways.

Private subregistries will exist within enterprises that have strict privacy and security requirements, but the MCP Registry gives these enterprises a single upstream data source they can build upon. At a minimum, we aim to share API schemas with these private implementations so that associated SDKs and tooling can be shared across the ecosystem.

### Subregistry Capabilities

Subregistries add value to the registry ecosystem by providing:

- **Curation**: Filter servers for specific communities or use cases
- **Ratings**: Add user ratings and download statistics
- **Security**: Implement security scanning and vulnerability checks
- **Enterprise**: Provide internal server registries for enterprise users

### How Subregistries Work

Subregistries (such as those maintained by platforms like GitHub or PulseMCP) periodically pull the full dataset from the upstream registry (e.g., once per day). Each Subregistry applies its own logic:

- **Vetting/Filtering**: They may exclude servers that do not meet their platform's security or performance standards
- **Augmentation**: They add platform-specific metadata like repository star counts
- **Caching**: They cache the data to ensure high availability and low latency for their clients

The registry is primarily designed for programmatic consumption by subregistries (Smithery, PulseMCP, Docker Hub, Anthropic, GitHub, etc.). It is NOT currently intended for individual clients or end-users (they should use subregistries).

## API Access

The MCP Registry API provides programmatic access to server metadata:

- **Production**: https://registry.modelcontextprotocol.io
- **Staging**: https://staging.registry.modelcontextprotocol.io

### API Endpoints

You can interact with the registry API using curl commands:

```bash
# List servers
curl "https://registry.modelcontextprotocol.io/v0/servers?limit=10"

# Search for specific servers
curl "https://registry.modelcontextprotocol.io/v0/servers?search=filesystem"

# Get specific server details
curl "https://registry.modelcontextprotocol.io/v0/servers/{server-id}"
```

The /v0/servers endpoint uses the GET method to retrieve a list of all available servers. The endpoint has a limit in place and uses cursor-based pagination.

## Getting Started

### For Server Maintainers

Server maintainers can add their server by following the guide on Adding Servers to the MCP Registry. For namespace publishing, users must prove ownership:

- For GitHub-based namespaces (e.g., `io.github.domdomegg/my-cool-mcp`), you must login to GitHub as the corresponding user, or be in a GitHub Action on that user's repos
- For domain-based namespaces (e.g., `me.adamjones/my-cool-mcp`), you must prove ownership via DNS or HTTP challenge

The MCP Registry Publisher Tool provides commands including:

- `init`: Create a server.json file template
- `login`: Authenticate with the registry
- `logout`: Clear saved authentication
- `publish`: Publish server.json to the registry

### For Client Maintainers

Client maintainers can access server data by following the guide on Accessing MCP Registry Data.

## Community Moderation

The system enables flagging of servers violating moderation guidelines, with maintainers able to denylist problematic entries.

## Preview Status

This preview is meant to help us improve the user experience before general availability. There may be potential breaking changes before final release.

As of October 2025, the Registry API has entered an API freeze (v0.1). For the next month or more, the API will remain stable with no breaking changes, allowing integrators to confidently implement support.

## Acknowledgments

The MCP Registry cross-company working group includes lead maintainer David Soria Parra and registry maintainers from Anthropic, GitHub, and PulseMCP, along with contributors from Block and Microsoft.

This initiative grew from a February 2025 grassroots effort involving contributors from PulseMCP, GitHub, Block, Anthropic, and other organizations across the AI development ecosystem.
