---
title: "Build a Remote MCP Server"
source_url: "https://developers.cloudflare.com/agents/guides/remote-mcp-server/"
source_type: web
author: "Cloudflare"
fetch_date: "2026-01-12"
translation_status: none
---

# Build a Remote MCP Server

This guide walks you through building a remote Model Context Protocol (MCP) server on Cloudflare Workers, adding authentication with OAuth, and connecting it to MCP clients like Claude Desktop and the MCP Inspector.

## Overview

When building a Model Context Protocol (MCP) server, you need both a way to allow users to login (authentication) and allow them to grant the MCP client access to resources on their account (authorization). The Model Context Protocol uses a subset of OAuth 2.1 for authorization. OAuth allows your users to grant limited access to resources, without them having to share API keys or other credentials.

To add authentication, you'll update your MCP server to act as an OAuth provider, handling secure login flows and issuing access tokens that MCP clients can use to make authenticated tool calls. Once authentication is enabled, users can sign in with their existing account and grant their AI agent permission to interact with the tools exposed by your MCP server, using scoped permissions.

## Getting Started

You can start by deploying a public MCP server without authentication, then add user authentication and scoped authorization later. If you already know your server will require authentication, you can skip ahead to the authentication section.

### Creating a New MCP Server Project

To create a new MCP server without authentication, run the following command:

**npm:**
```bash
npm create cloudflare@latest -- my-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
cd my-mcp-server
```

**yarn:**
```bash
yarn create cloudflare my-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
cd my-mcp-server
```

**pnpm:**
```bash
pnpm create cloudflare@latest my-mcp-server --template=cloudflare/ai/demos/remote-mcp-authless
cd my-mcp-server
```

For a server with GitHub OAuth authentication:

```bash
npm create cloudflare@latest -- my-mcp-server-github-auth --template=cloudflare/ai/demos/remote-mcp-github-oauth
cd my-mcp-server-github-auth
```

### Local Development

Launch the development server:

```bash
npm start
```

Server runs at `http://localhost:8788/sse`. To test connections, run the MCP Inspector in another terminal:

```bash
npx @modelcontextprotocol/inspector@latest
open http://localhost:5173
```

Enter `http://localhost:8788/sse` and click Connect to view available tools.

### Deploying to Cloudflare

Deploy via Wrangler:

```bash
npx wrangler@latest deploy
```

This will deploy your MCP server to a URL like: `my-mcp-server.<your-account>.workers.dev/sse`

If you have already connected a git repository to the Worker with your MCP server, you can deploy by pushing a change or merging a pull request to the main branch of the repository.

The one-click "Deploy to Workers" button automatically creates a GitHub or GitLab repository with continuous deployment configured—your MCP server goes live with a single click.

## Defining Tools

To add your own tools to the MCP server, define each tool inside the `init()` method of `src/index.ts` using `this.server.tool(...)`.

The McpAgent class allows developers to build remote MCP servers on Cloudflare by using Durable Objects to maintain stateful connections for every client session. Cloudflare built McpAgent to be stateful from the start, allowing developers to build servers that can remember context, user preferences, and conversation history. Each instance of your MCP server has its own durable state, backed by a Durable Object, with its own SQL database.

## OAuth Provider Library

Cloudflare provides an OAuth Provider Library that implements the provider side of the OAuth 2.1 protocol, allowing you to easily add authorization to your MCP server.

### Key Features

This is a TypeScript library that implements the provider side of the OAuth 2.1 protocol with PKCE support. The library is intended to be used on Cloudflare Workers. The library acts as a wrapper around your Worker code, which adds authorization for your API endpoints. All token management is handled automatically.

Your API handler is written like a regular fetch handler, but receives the already-authenticated user details as a parameter. No need to perform any checks of your own. The library is agnostic to how you manage and authenticate users. The library is agnostic to how you build your UI. Your authorization flow can be implemented using whatever UI framework you use for everything else.

### Three Ways to Use the OAuth Provider Library

You can use the OAuth Provider Library in three ways:

1. **Your Worker handles authorization itself** - Your MCP server, running on Cloudflare, handles the complete OAuth flow.

2. **Integrate directly with a third-party OAuth provider** - Such as GitHub or Google.

3. **Integrate with your own OAuth provider** - Including authorization-as-a-service providers you might already rely on, such as Stytch, Auth0, or WorkOS.

## Adding GitHub OAuth Authentication

In this example, we use GitHub as an OAuth provider, but you can connect your MCP server with any OAuth provider that supports the OAuth 2.0 specification, including Google, Slack, Stytch, Auth0, WorkOS, and more.

### Step 1: Create Authenticated Server

Generate a new project with GitHub OAuth support:

```bash
npm create cloudflare@latest -- my-mcp-server-github-auth --template=cloudflare/ai/demos/remote-mcp-github-oauth
cd my-mcp-server-github-auth
```

The main configuration in `src/index.ts` uses:

```typescript
import GitHubHandler from "./github-handler";

export default new OAuthProvider({
  apiRoute: "/sse",
  apiHandler: MyMCP.Router,
  defaultHandler: GitHubHandler,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
});
```

### Step 2: Creating GitHub OAuth Apps

You'll need to create two GitHub OAuth Apps to use GitHub as an authentication provider for your MCP server — one for local development, and one for production.

**For Local Development:**

Navigate to github.com/settings/developers and create an OAuth App with:
- **Application name:** `My MCP Server (local)`
- **Homepage URL:** `http://localhost:8788`
- **Authorization callback URL:** `http://localhost:8788/callback`

Store credentials in `.dev.vars`:

```bash
touch .dev.vars
echo 'GITHUB_CLIENT_ID="your-client-id"' >> .dev.vars
echo 'GITHUB_CLIENT_SECRET="your-client-secret"' >> .dev.vars
```

**For Production:**

Create a second OAuth App with:
- **Application name:** `My MCP Server (production)`
- **Homepage URL:** `worker-name.account-name.workers.dev`
- **Authorization callback URL:** `worker-name.account-name.workers.dev/callback`

### Step 3: Configuration with wrangler.toml

A typical wrangler.toml for OAuth configuration looks like:

```toml
name = "my-mcp-server"
main = "src/index.ts"
compatibility_date = "2025-01-15"

[vars]
OAUTH_CLIENT_ID = "your-github-client-id"
OAUTH_REDIRECT_URI = "https://my-mcp-server.your-subdomain.workers.dev/callback"

[[kv_namespaces]]
binding = "OAUTH_KV"
id = "your-kv-namespace-id"
preview_id = "your-preview-kv-namespace-id"
```

### Step 4: Setting Secrets via Wrangler CLI

Set your secrets using the Wrangler CLI:

```bash
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY  # add any random string here e.g. openssl rand -hex 32
```

Create the KV namespace:

```bash
wrangler kv:namespace create "OAUTH_KV"
```

Update `wrangler.jsonc`:

```json
{
  "kvNamespaces": [
    {
      "binding": "OAUTH_KV",
      "id": "<YOUR_KV_NAMESPACE_ID>"
    }
  ]
}
```

> **Important Security Note**: Do not use vars to store sensitive information in your Worker's Wrangler configuration file. Use secrets instead.

### Token Management

Instead of passing the token it receives from the upstream provider directly to the MCP client, your Worker stores an encrypted access token in Workers KV. It then issues its own token to the client. This is handled on your behalf by the workers-oauth-provider — your code never directly handles writing this token, preventing mistakes.

## Supported Identity Providers

Allow users to authenticate to your MCP server through email, social logins, SSO (single sign-on), and MFA (multi-factor authentication). Define scopes and permissions that directly map to your MCP tools.

Cloudflare provides integration examples with:

- **Auth0**: Authenticate users through email, social logins, or enterprise SSO to interact with their todos and personal data through AI agents.

- **WorkOS's AuthKit**: Authenticate users and manage the permissions granted to AI agents. The MCP server dynamically exposes tools based on the user's role and access rights. All authenticated users get access to the add tool, but only users who have been assigned the `image_generation` permission in WorkOS can grant the AI agent access to the image generation tool.

- **Descope Inbound Apps**: Authenticate and authorize users (for example, email, social login, SSO) to interact with their data through AI agents. Leverage Descope custom scopes to define and manage permissions for more fine-grained control.

## Agents SDK Built-in Authentication

Cloudflare has integrated the complete OAuth authentication flow directly into the Agents SDK, so your AI agents can securely connect and authenticate to any remote MCP server without you having to build authentication flow from scratch.

This allows you to give users a secure way to log in and explicitly grant access to allow the agent to act on their behalf by automatically:

- Supporting the OAuth 2.1 protocol
- Redirecting users to the service's login page
- Generating the code challenge and exchanging an authorization code for an access token
- Using the access token to make authenticated requests to the MCP server

When a user authenticates to your MCP server, their identity information and tokens are made available through the props parameter.

## McpAgent Class and Durable Objects

The McpAgent class allows developers to build remote MCP servers on Cloudflare by using Durable Objects to maintain stateful connections for every client session.

### Stateful Design

Cloudflare built McpAgent to be stateful from the start, allowing developers to build servers that can remember context, user preferences, and conversation history. Each instance of your MCP server has its own durable state, backed by a Durable Object, with its own SQL database.

### Hibernation Support

Hibernation for McpAgent automatically sleeps stateful, remote MCP servers when inactive and wakes them when needed. This allows you to maintain connections for long-running sessions while ensuring you're not paying for idle time.

The McpAgent class now supports the WebSockets Hibernation API that allows your MCP server to go to sleep when it's not receiving requests and instantly wake up when it's needed, meaning you only pay for compute when your agent is actually working.

### Durable Objects Free Tier

Cloudflare views Durable Objects as a key component for building agents. Previously only accessible as part of paid plans, Durable Objects is now included in the free tier.

## Transport Options

They support both the streamable-http transport via `/mcp` and the sse transport (deprecated) via `/sse`.

If you need SSE support for legacy clients, use the McpAgent class. MCP servers built with the Agents SDK use `createMcpHandler` to handle Streamable HTTP transport.

If your MCP server needs to maintain state across requests, use `createMcpHandler` with a `WorkerTransport` inside an Agent class. This allows you to persist session state in Durable Object storage and use advanced MCP features like elicitation and sampling.

## Testing Your MCP Server

### Using the MCP Inspector

The MCP inspector is an interactive MCP client that allows you to connect to your MCP server and invoke tools from a web browser.

To test with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector@latest
```

Then open http://localhost:5173 and enter your server URL (like `http://localhost:8788/mcp`).

In the inspector:

1. Set Transport Type to SSE
2. Enter the URL of your MCP server, `http://localhost:8788/sse`
3. In the main panel on the right, click the "Open OAuth Settings" button
4. Click "Quick OAuth Flow"

Once you have authenticated, you will be redirected back to the inspector. You should see the "List Tools" button, which will list the tools that your MCP server exposes.

### For Deployed Workers

Enter the workers.dev URL (e.g., `worker-name.account-name.workers.dev/sse`) of your Worker in the inspector as the URL of the MCP server to connect to, and click "Connect". You've now connected to your MCP server from a remote MCP client.

## Connecting Claude Desktop

Even though Claude Desktop doesn't yet support remote MCP clients, you can use the mcp-remote local proxy to connect it to your remote MCP server. This lets you test what an interaction with your remote MCP server will be like with a real-world MCP client.

Follow Anthropic's Quickstart and within Claude Desktop go to Settings > Developer > Edit Config to find your configuration file. Open the file in your text editor and replace it with a configuration like:

```json
{
  "mcpServers": {
    "my-mcp-server": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "http://localhost:8787/sse"
      ]
    }
  }
}
```

This will run a local proxy and let Claude talk to your MCP server over HTTP.

Save the file and restart Claude Desktop (command/ctrl + R). When Claude restarts, a browser window will open showing your OAuth login page. Complete the authorization flow to grant Claude access to your MCP server. Once authenticated, you'll be able to see your tools by clicking the tools icon in the bottom right corner of Claude's interface.

## Cloudflare's Managed MCP Servers

Cloudflare runs a catalog of managed remote MCP Servers which you can connect to using OAuth on clients like Claude, Windsurf, the AI Playground or any SDK that supports MCP.

These MCP servers allow your MCP Client to read configurations from your account, process information, make suggestions based on data, and even make those suggested changes for you.

## Next Steps

- Add custom tools to expose through your MCP server
- Implement scoped authorization for granular permission control
- Integrate with the AI Playground or other MCP clients

---

## Key Takeaways

- MCP servers on Cloudflare use OAuth 2.1 for secure authentication and authorization
- The OAuth Provider Library simplifies integration with identity providers like GitHub, Google, Auth0, and WorkOS
- McpAgent class provides stateful connections using Durable Objects
- Hibernation support ensures you only pay for compute when your agent is actually working
- Multiple transport options available: streamable-http (`/mcp`) and SSE (`/sse`)
- Test with MCP Inspector before connecting to Claude Desktop
- Use mcp-remote proxy to connect Claude Desktop to remote MCP servers
