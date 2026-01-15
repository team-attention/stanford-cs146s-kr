---
title: "원격 MCP 서버 구축하기"
originalTitle: "Build a Remote MCP Server"
author: "Cloudflare"
sourceUrl: "https://developers.cloudflare.com/agents/guides/remote-mcp-server/"
translatedAt: "2026-01-12"
status: "final"
---

# 원격 MCP 서버 구축하기

[원본 링크](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)

---

이 가이드에서는 Cloudflare Workers에서 원격 MCP(Model Context Protocol) 서버를 구축하고, OAuth로 인증을 추가하며, Claude Desktop과 MCP Inspector 같은 MCP 클라이언트에 연결하는 방법을 다룹니다.

## 개요

MCP 서버를 구축할 때는 사용자 로그인(인증)과 MCP 클라이언트가 사용자 계정의 리소스에 접근하도록 허용하는 방법(인가) 모두 필요합니다. Model Context Protocol은 인가를 위해 OAuth 2.1의 일부를 사용합니다. OAuth를 사용하면 API 키나 자격 증명을 공유하지 않고도 리소스에 대한 제한된 접근 권한을 부여할 수 있습니다.

인증을 추가하려면 MCP 서버를 OAuth 프로바이더 역할을 하도록 업데이트해야 합니다. 서버가 보안 로그인 흐름을 처리하고, MCP 클라이언트가 인증된 도구 호출에 사용할 액세스 토큰을 발급합니다. 인증을 활성화하면 사용자가 기존 계정으로 로그인하고, 범위가 지정된 권한으로 AI 에이전트가 MCP 서버의 도구와 상호작용하도록 허용할 수 있습니다.

## 시작하기

인증 없이 공개 MCP 서버를 먼저 배포한 다음, 나중에 사용자 인증과 범위 지정 인가를 추가할 수 있습니다. 서버에 인증이 필요하다면 인증 섹션으로 바로 이동하세요.

### 새 MCP 서버 프로젝트 생성

인증 없는 새 MCP 서버를 생성하려면 다음 명령을 실행합니다:

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

GitHub OAuth 인증을 포함한 서버는 다음과 같이 생성합니다:

```bash
npm create cloudflare@latest -- my-mcp-server-github-auth --template=cloudflare/ai/demos/remote-mcp-github-oauth
cd my-mcp-server-github-auth
```

### 로컬 개발

개발 서버를 실행합니다:

```bash
npm start
```

서버가 `http://localhost:8788/sse`에서 실행됩니다. 연결을 테스트하려면 다른 터미널에서 MCP Inspector를 실행하세요:

```bash
npx @modelcontextprotocol/inspector@latest
open http://localhost:5173
```

`http://localhost:8788/sse`를 입력하고 Connect를 클릭하면 사용 가능한 도구를 확인할 수 있습니다.

### Cloudflare에 배포

Wrangler로 배포합니다:

```bash
npx wrangler@latest deploy
```

MCP 서버가 `my-mcp-server.<your-account>.workers.dev/sse` 형식의 URL에 배포됩니다.

MCP 서버가 포함된 Worker에 이미 git 저장소를 연결했다면, 저장소의 main 브랜치에 변경사항을 푸시하거나 PR을 머지하여 배포할 수 있습니다.

원클릭 "Deploy to Workers" 버튼을 사용하면 지속적 배포가 설정된 GitHub 또는 GitLab 저장소가 자동으로 생성되어 클릭 한 번으로 MCP 서버가 라이브됩니다.

## 도구 정의하기

MCP 서버에 직접 만든 도구를 추가하려면 `src/index.ts`의 `init()` 메서드 내에서 `this.server.tool(...)`로 각 도구를 정의합니다.

McpAgent 클래스를 사용하면 Durable Objects를 활용해 각 클라이언트 세션의 상태를 유지하는 원격 MCP 서버를 Cloudflare에서 구축할 수 있습니다. Cloudflare는 McpAgent를 처음부터 상태 유지형으로 설계하여 서버가 컨텍스트, 사용자 선호도, 대화 기록을 기억합니다. 각 MCP 서버 인스턴스에는 자체 SQL 데이터베이스가 있는 Durable Object가 고유한 지속 상태를 지원합니다.

## OAuth Provider 라이브러리

Cloudflare는 OAuth 2.1 프로토콜의 프로바이더 측을 구현하는 OAuth Provider 라이브러리를 제공하여 MCP 서버에 인가를 쉽게 추가할 수 있습니다.

### 주요 기능

이 TypeScript 라이브러리는 PKCE를 지원하는 OAuth 2.1 프로토콜의 프로바이더 측을 구현합니다. Cloudflare Workers에서 사용하도록 설계되었으며, Worker 코드의 래퍼 역할을 하여 API 엔드포인트에 인가를 추가합니다. 토큰 관리는 모두 자동으로 처리됩니다.

API 핸들러는 일반 fetch 핸들러처럼 작성하지만, 이미 인증된 사용자 세부정보를 파라미터로 받습니다. 별도로 검증할 필요가 없습니다. 이 라이브러리는 사용자 관리 및 인증 방식에 구애받지 않으며, UI 구축 방식에도 구애받지 않습니다. 인가 흐름은 어떤 UI 프레임워크로든 구현할 수 있습니다.

### OAuth Provider 라이브러리 사용 방법

OAuth Provider 라이브러리는 세 가지 방법으로 사용할 수 있습니다:

1. **Worker가 직접 인가 처리** - Cloudflare에서 실행되는 MCP 서버가 전체 OAuth 흐름을 처리합니다.

2. **서드파티 OAuth 프로바이더와 직접 통합** - GitHub이나 Google 같은 프로바이더와 연동합니다.

3. **자체 OAuth 프로바이더와 통합** - Stytch, Auth0, WorkOS 같은 인증 서비스 프로바이더와 연동합니다.

## GitHub OAuth 인증 추가하기

이 예제에서는 GitHub을 OAuth 프로바이더로 사용하지만, Google, Slack, Stytch, Auth0, WorkOS 등 OAuth 2.0 사양을 지원하는 모든 프로바이더와 MCP 서버를 연결할 수 있습니다.

### 1단계: 인증 서버 생성

GitHub OAuth를 지원하는 새 프로젝트를 생성합니다:

```bash
npm create cloudflare@latest -- my-mcp-server-github-auth --template=cloudflare/ai/demos/remote-mcp-github-oauth
cd my-mcp-server-github-auth
```

`src/index.ts`의 주요 설정은 다음과 같습니다:

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

### 2단계: GitHub OAuth 앱 생성

MCP 서버의 인증 프로바이더로 GitHub을 사용하려면 두 개의 GitHub OAuth 앱이 필요합니다. 하나는 로컬 개발용, 다른 하나는 프로덕션용입니다.

**로컬 개발용:**

github.com/settings/developers로 이동하여 다음 설정으로 OAuth 앱을 생성합니다:
- **Application name:** `My MCP Server (local)`
- **Homepage URL:** `http://localhost:8788`
- **Authorization callback URL:** `http://localhost:8788/callback`

자격 증명을 `.dev.vars`에 저장합니다:

```bash
touch .dev.vars
echo 'GITHUB_CLIENT_ID="your-client-id"' >> .dev.vars
echo 'GITHUB_CLIENT_SECRET="your-client-secret"' >> .dev.vars
```

**프로덕션용:**

다음 설정으로 두 번째 OAuth 앱을 생성합니다:
- **Application name:** `My MCP Server (production)`
- **Homepage URL:** `worker-name.account-name.workers.dev`
- **Authorization callback URL:** `worker-name.account-name.workers.dev/callback`

### 3단계: wrangler.toml 설정

OAuth 설정을 위한 일반적인 wrangler.toml은 다음과 같습니다:

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

### 4단계: Wrangler CLI로 시크릿 설정

Wrangler CLI로 시크릿을 설정합니다:

```bash
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET
wrangler secret put COOKIE_ENCRYPTION_KEY  # 임의의 문자열 입력. 예: openssl rand -hex 32
```

KV 네임스페이스를 생성합니다:

```bash
wrangler kv:namespace create "OAUTH_KV"
```

`wrangler.jsonc`를 업데이트합니다:

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

> **중요 보안 참고사항**: Worker의 Wrangler 설정 파일에 민감한 정보를 저장하려면 vars 대신 secrets를 사용하세요.

### 토큰 관리

Worker는 업스트림 프로바이더에서 받은 토큰을 MCP 클라이언트에 직접 전달하지 않습니다. 대신 암호화된 액세스 토큰을 Workers KV에 저장하고 자체 토큰을 클라이언트에 발급합니다. workers-oauth-provider가 이를 대신 처리하므로 코드에서 토큰을 직접 다루지 않아 실수를 방지할 수 있습니다.

## 지원되는 ID 프로바이더

이메일, 소셜 로그인, SSO(Single Sign-On), MFA(다중 인증)로 사용자가 MCP 서버에 인증할 수 있습니다. MCP 도구에 직접 매핑되는 스코프와 권한을 정의할 수 있습니다.

Cloudflare는 다음 통합 예제를 제공합니다:

- **Auth0**: 이메일, 소셜 로그인 또는 엔터프라이즈 SSO로 사용자를 인증하여 AI 에이전트를 통해 할 일 목록과 개인 데이터에 접근합니다.

- **WorkOS의 AuthKit**: 사용자를 인증하고 AI 에이전트에 부여된 권한을 관리합니다. MCP 서버는 사용자의 역할과 접근 권한에 따라 동적으로 도구를 노출합니다. 모든 인증된 사용자가 add 도구에 접근할 수 있지만, WorkOS에서 `image_generation` 권한이 할당된 사용자만 AI 에이전트에 이미지 생성 도구 접근 권한을 부여할 수 있습니다.

- **Descope Inbound Apps**: 이메일, 소셜 로그인, SSO 등으로 사용자를 인증하고 인가하여 AI 에이전트를 통해 데이터에 접근합니다. Descope 커스텀 스코프를 활용해 세분화된 권한 제어가 가능합니다.

## Agents SDK 내장 인증

Cloudflare는 완전한 OAuth 인증 흐름을 Agents SDK에 직접 통합했습니다. AI 에이전트가 인증 흐름을 직접 구축하지 않고도 원격 MCP 서버에 안전하게 연결하고 인증할 수 있습니다.

이를 통해 사용자에게 안전한 로그인 방법을 제공하고, 에이전트가 대신 작동할 수 있도록 명시적으로 접근 권한을 부여하며, 다음을 자동으로 처리합니다:

- OAuth 2.1 프로토콜 지원
- 서비스 로그인 페이지로 사용자 리다이렉트
- 코드 챌린지 생성 및 인가 코드를 액세스 토큰으로 교환
- 액세스 토큰으로 MCP 서버에 인증된 요청 수행

사용자가 MCP 서버에 인증하면 신원 정보와 토큰이 props 파라미터를 통해 제공됩니다.

## McpAgent 클래스와 Durable Objects

McpAgent 클래스를 사용하면 Durable Objects를 활용해 각 클라이언트 세션의 상태를 유지하는 원격 MCP 서버를 Cloudflare에서 구축할 수 있습니다.

### 상태 유지 설계

Cloudflare는 McpAgent를 처음부터 상태 유지형으로 설계하여 서버가 컨텍스트, 사용자 선호도, 대화 기록을 기억합니다. 각 MCP 서버 인스턴스에는 자체 SQL 데이터베이스가 있는 Durable Object가 고유한 지속 상태를 지원합니다.

### 휴면 지원

McpAgent의 휴면 기능은 비활성 상태일 때 상태 유지형 원격 MCP 서버를 자동으로 절전 모드로 전환하고 필요할 때 깨웁니다. 장시간 실행되는 세션의 연결을 유지하면서 유휴 시간에는 비용이 발생하지 않습니다.

McpAgent 클래스는 이제 WebSockets Hibernation API를 지원합니다. MCP 서버가 요청을 받지 않을 때 절전 모드로 전환되고 필요할 때 즉시 깨어납니다. 에이전트가 실제로 작동할 때만 컴퓨팅 비용을 지불합니다.

### Durable Objects 무료 티어

Cloudflare는 Durable Objects를 에이전트 구축의 핵심 구성 요소로 봅니다. 이전에는 유료 플랜에서만 사용할 수 있었던 Durable Objects가 이제 무료 티어에 포함됩니다.

## 전송 옵션

`/mcp`를 통한 streamable-http 전송과 `/sse`를 통한 sse 전송(deprecated) 모두 지원합니다.

레거시 클라이언트에 SSE 지원이 필요하면 McpAgent 클래스를 사용하세요. Agents SDK로 구축된 MCP 서버는 `createMcpHandler`로 Streamable HTTP 전송을 처리합니다.

MCP 서버가 요청 간 상태를 유지해야 하면 Agent 클래스 내에서 `createMcpHandler`와 `WorkerTransport`를 함께 사용하세요. Durable Object 스토리지에 세션 상태를 유지하고 도출(elicitation) 및 sampling 같은 고급 MCP 기능을 사용할 수 있습니다.

## MCP 서버 테스트하기

### MCP Inspector 사용

MCP Inspector는 웹 브라우저에서 MCP 서버에 연결하고 도구를 호출할 수 있는 대화형 MCP 클라이언트입니다.

MCP Inspector로 테스트하려면:

```bash
npx @modelcontextprotocol/inspector@latest
```

http://localhost:5173을 열고 서버 URL(예: `http://localhost:8788/mcp`)을 입력합니다.

Inspector에서:

1. Transport Type을 SSE로 설정
2. MCP 서버 URL 입력: `http://localhost:8788/sse`
3. 오른쪽 메인 패널에서 "Open OAuth Settings" 버튼 클릭
4. "Quick OAuth Flow" 클릭

인증이 완료되면 Inspector로 다시 리다이렉트됩니다. "List Tools" 버튼을 클릭하면 MCP 서버가 노출하는 도구 목록을 볼 수 있습니다.

### 배포된 Worker의 경우

Inspector에서 연결할 MCP 서버 URL로 Worker의 workers.dev URL(예: `worker-name.account-name.workers.dev/sse`)을 입력하고 "Connect"를 클릭합니다. 원격 MCP 클라이언트에서 MCP 서버에 연결됩니다.

## Claude Desktop 연결

Claude Desktop은 아직 원격 MCP 클라이언트를 지원하지 않지만, mcp-remote 로컬 프록시로 원격 MCP 서버에 연결할 수 있습니다. 실제 MCP 클라이언트와 원격 MCP 서버의 상호작용을 테스트할 수 있습니다.

Anthropic의 Quickstart를 따라 Claude Desktop에서 Settings > Developer > Edit Config로 이동하여 설정 파일을 찾습니다. 텍스트 편집기에서 파일을 열고 다음과 같이 설정합니다:

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

로컬 프록시가 실행되어 Claude가 HTTP를 통해 MCP 서버와 통신할 수 있습니다.

파일을 저장하고 Claude Desktop을 재시작합니다(command/ctrl + R). Claude가 재시작되면 OAuth 로그인 페이지가 표시된 브라우저 창이 열립니다. 인가 흐름을 완료하여 Claude에 MCP 서버 접근 권한을 부여합니다. 인증이 완료되면 Claude 인터페이스 오른쪽 하단의 도구 아이콘을 클릭하여 도구를 볼 수 있습니다.

## Cloudflare의 관리형 MCP 서버

Cloudflare는 Claude, Windsurf, AI Playground 또는 MCP를 지원하는 모든 SDK에서 OAuth를 통해 연결할 수 있는 관리형 원격 MCP 서버 카탈로그를 운영합니다.

이러한 MCP 서버를 통해 MCP 클라이언트가 계정 설정을 읽고, 정보를 처리하고, 데이터 기반으로 제안을 하며, 제안된 변경사항을 적용할 수도 있습니다.

## 다음 단계

- MCP 서버를 통해 노출할 커스텀 도구 추가
- 세분화된 권한 제어를 위한 범위 지정 인가 구현
- AI Playground 또는 다른 MCP 클라이언트와 통합

---

## 핵심 요약

- Cloudflare의 MCP 서버는 안전한 인증 및 인가를 위해 OAuth 2.1을 사용합니다
- OAuth Provider 라이브러리는 GitHub, Google, Auth0, WorkOS 같은 ID 프로바이더와의 통합을 단순화합니다
- McpAgent 클래스는 Durable Objects를 사용해 상태 유지 연결을 제공합니다
- 휴면 지원으로 에이전트가 실제로 작동할 때만 컴퓨팅 비용을 지불합니다
- 여러 전송 옵션 사용 가능: streamable-http(`/mcp`)와 SSE(`/sse`)
- Claude Desktop에 연결하기 전에 MCP Inspector로 테스트하세요
- mcp-remote 프록시로 Claude Desktop을 원격 MCP 서버에 연결합니다
