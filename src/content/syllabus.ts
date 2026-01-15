import type { Week } from '@/types/syllabus'

export const syllabus: Week[] = [
  {
    number: 1,
    title: 'Introduction to Coding LLMs and AI Development',
    titleKr: '코딩 LLM과 AI 개발 입문',
    topics: [
      '강의 소개 및 운영 안내',
      'LLM이란 무엇인가',
      '효과적인 프롬프팅 방법',
    ],
    readings: [
      {
        title: 'Deep Dive into LLMs',
        url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI',
        krSlug: 'deep-dive-llms',
      },
      {
        title: 'Prompt Engineering Overview',
        url: 'https://cloud.google.com/discover/what-is-prompt-engineering',
        krSlug: 'prompt-engineering-overview',
      },
      {
        title: 'Prompt Engineering Guide',
        url: 'https://www.promptingguide.ai/techniques',
        krSlug: 'prompt-engineering-guide',
        translationStatus: 'complete',
      },
      {
        title: 'AI Prompt Engineering: A Deep Dive',
        url: 'https://www.youtube.com/watch?v=T9aRN5JkmL8',
        krSlug: 'ai-prompt-engineering-deep-dive',
        translationStatus: 'complete',
      },
      {
        title: 'How OpenAI Uses Codex',
        url: 'https://cdn.openai.com/pdf/6a2631dc-783e-479b-b1a4-af0cfbd38630/how-openai-uses-codex.pdf',
        krSlug: 'how-openai-uses-codex',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'LLM Prompting Playground',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week1',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: 'LLM 소개와 작동 원리',
        slidesUrl: 'https://docs.google.com/presentation/d/1zT2Ofy88cajLTLkd7TcuSM4BCELvF9qQdHmlz33i4t0/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: 'LLM을 위한 고급 프롬프팅',
        slidesUrl: 'https://docs.google.com/presentation/d/1MIhw8p6TLGdbQ9TcxhXSs5BaPf5d_h77QY70RHNfeGs/edit?usp=drive_link',
      },
    ],
  },
  {
    number: 2,
    title: 'The Anatomy of Coding Agents',
    titleKr: '코딩 에이전트의 구조',
    topics: [
      '에이전트 아키텍처와 구성 요소',
      '도구 사용과 함수 호출',
      'MCP (Model Context Protocol)',
    ],
    readings: [
      {
        title: 'MCP Introduction',
        url: 'https://stytch.com/blog/model-context-protocol-introduction/',
        krSlug: 'mcp-introduction',
        translationStatus: 'complete',
      },
      {
        title: 'Sample MCP Server Implementations',
        url: 'https://github.com/modelcontextprotocol/servers',
      },
      {
        title: 'MCP Server Authentication',
        url: 'https://developers.cloudflare.com/agents/guides/remote-mcp-server/#add-authentication',
        krSlug: 'mcp-server-authentication',
        translationStatus: 'complete',
      },
      {
        title: 'MCP Server SDK',
        url: 'https://github.com/modelcontextprotocol/typescript-sdk/tree/main?tab=readme-ov-file#server',
      },
      {
        title: 'MCP Registry',
        url: 'https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/',
        krSlug: 'mcp-registry',
        translationStatus: 'complete',
      },
      {
        title: 'MCP Food-for-Thought',
        url: 'https://www.reillywood.com/blog/apis-dont-make-good-mcp-tools/',
        krSlug: 'mcp-food-for-thought',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'First Steps in the AI IDE',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week2',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: '코딩 에이전트 직접 만들기',
        slidesUrl: 'https://docs.google.com/presentation/d/11CP26VhsjnZOmi9YFgLlonzdib9BLyAlgc4cEvC5Fps/edit?usp=sharing',
        additionalResources: [
          {
            title: 'Completed Exercise',
            url: 'https://drive.google.com/file/d/1YtpKFVG13DHyQ2i3HOtwyVJOV90nWeL2/view?usp=drive_link',
          },
        ],
      },
      {
        day: '2차시',
        title: '커스텀 MCP 서버 구축',
        slidesUrl: 'https://docs.google.com/presentation/d/1zSC2ra77XOUrJeyS85houg1DU7z9hq5Y4ebagTch-5o/edit?usp=drive_link',
        additionalResources: [
          {
            title: 'Completed Exercise',
            url: 'https://drive.google.com/file/d/1J6lgZWcxPzpCpjujJSnW1aAkCYF6Yxv3/view?usp=drive_link',
          },
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'The AI IDE',
    titleKr: 'AI IDE',
    topics: [
      '컨텍스트 관리와 코드 이해',
      '에이전트를 위한 PRD 작성',
      'IDE 통합과 확장 기능',
    ],
    readings: [
      {
        title: 'Specs Are the New Source Code',
        url: 'https://blog.ravi-mehta.com/p/specs-are-the-new-source-code',
        krSlug: 'specs-are-the-new-source-code',
        translationStatus: 'complete',
      },
      {
        title: 'How Long Contexts Fail',
        url: 'https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html',
        krSlug: 'how-contexts-fail',
        translationStatus: 'complete',
      },
      {
        title: 'Devin: Coding Agents 101',
        url: 'https://devin.ai/agents101#introduction',
        krSlug: 'coding-agents-101',
        translationStatus: 'complete',
      },
      {
        title: 'Getting AI to Work In Complex Codebases',
        url: 'https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md',
      },
      {
        title: 'How FAANG Vibe Codes',
        url: 'https://www.reddit.com/r/vibecoding/comments/1myakhd/how_we_vibe_code_at_a_faang/',
        krSlug: 'how-faang-vibe-codes',
        translationStatus: 'complete',
      },
      {
        title: 'Writing Effective Tools for Agents',
        url: 'https://www.anthropic.com/engineering/writing-tools-for-agents',
        krSlug: 'writing-effective-tools-for-agents',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'Build a Custom MCP Server',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/blob/master/week3/assignment.md',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: '첫 프롬프트부터 최적의 IDE 설정까지',
        slidesUrl: 'https://docs.google.com/presentation/d/11pQNCde_mmRnImBat0Zymnp8TCS_cT_1up7zbcj6Sjg/edit?usp=sharing',
        additionalResources: [
          {
            title: 'Design Doc Template',
            url: 'https://drive.google.com/file/d/1MZ0Qx68Vzw4x5x_XcV8XiPLp7fFDe1LJ/view?usp=drive_link',
          },
        ],
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://docs.google.com/presentation/d/1i0pRttHf72lgz8C-n7DSegcLBgncYZe_ppU7dB9zhUA/edit?usp=sharing',
        guest: {
          name: 'Silas Alberti',
          role: 'Head of Research',
          company: 'Cognition',
          linkedIn: 'https://www.linkedin.com/in/silasalberti/',
          companyUrl: 'https://cognition.ai/',
        },
      },
    ],
  },
  {
    number: 4,
    title: 'Coding Agent Patterns',
    titleKr: '코딩 에이전트 패턴',
    topics: [
      '에이전트 자율성 수준 관리',
      '인간-에이전트 협업 패턴',
    ],
    readings: [
      {
        title: 'How Anthropic Uses Claude Code',
        url: 'https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf',
        krSlug: 'how-anthropic-uses-claude-code',
        translationStatus: 'complete',
      },
      {
        title: 'Claude Best Practices',
        url: 'https://www.anthropic.com/engineering/claude-code-best-practices',
        krSlug: 'claude-code-best-practices',
        translationStatus: 'complete',
      },
      {
        title: 'Awesome Claude Agents',
        url: 'https://github.com/vijaythecoder/awesome-claude-agents',
        krSlug: 'awesome-claude-agents',
        translationStatus: 'complete',
      },
      {
        title: 'Super Claude',
        url: 'https://github.com/SuperClaude-Org/SuperClaude_Framework',
        krSlug: 'super-claude',
        translationStatus: 'complete',
      },
      {
        title: 'Good Context Good Code',
        url: 'https://blog.stockapp.com/good-context-good-code/',
        krSlug: 'good-context-good-code',
        translationStatus: 'complete',
      },
      {
        title: 'Peeking Under the Hood of Claude Code',
        url: 'https://medium.com/@outsightai/peeking-under-the-hood-of-claude-code-70f5a94a9a62',
        krSlug: 'peeking-under-hood-claude-code',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'Coding with Claude Code',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/blob/master/week4/assignment.md',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: '에이전트 매니저가 되는 법',
        slidesUrl: 'https://docs.google.com/presentation/d/19mgkwAnJDc7JuJy0zhhoY0ZC15DiNpxL8kchPDnRkRQ/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://docs.google.com/presentation/d/1bv7Zozn6z45CAh-IyX99dMPMyXCHC7zj95UfwErBYQ8/edit?usp=sharing',
        guest: {
          name: 'Boris Cherney',
          role: 'Creator of',
          company: 'Claude Code',
          linkedIn: 'https://www.linkedin.com/in/bcherny/',
          companyUrl: 'https://www.anthropic.com/claude-code',
        },
      },
    ],
  },
  {
    number: 5,
    title: 'The Modern Terminal',
    titleKr: '현대적 터미널',
    topics: [
      'AI 강화 커맨드라인 인터페이스',
      '터미널 자동화와 스크립팅',
    ],
    readings: [
      {
        title: 'Warp University',
        url: 'https://www.warp.dev/university?slug=university',
      },
      {
        title: 'Warp vs Claude Code',
        url: 'https://www.warp.dev/university/getting-started/warp-vs-claude-code',
        krSlug: 'warp-vs-claude-code',
        translationStatus: 'complete',
      },
      {
        title: 'How Warp Uses Warp to Build Warp',
        url: 'https://notion.warp.dev/How-Warp-uses-Warp-to-build-Warp-21643263616d81a6b9e3e63fd8a7380c',
        krSlug: 'how-warp-uses-warp',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'Agentic Development with Warp',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week5',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: '혁신적인 AI 개발자 제품 만들기',
        slidesUrl: 'https://docs.google.com/presentation/d/1Djd4eBLBbRkma8rFnJAWMT0ptct_UGB8hipmoqFVkxQ/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://www.figma.com/slides/kwbcmtqTFQMfUhiMH8BiEx/Warp---Stanford--Copy-?node-id=9-116&t=oBWBCk8mjg2l2NR5-1',
        guest: {
          name: 'Zach Lloyd',
          role: 'CEO',
          company: 'Warp',
          linkedIn: 'https://www.linkedin.com/in/zachlloyd/',
          companyUrl: 'https://www.warp.dev/',
        },
      },
    ],
  },
  {
    number: 6,
    title: 'AI Testing and Security',
    titleKr: 'AI 테스팅과 보안',
    topics: [
      '안전한 바이브 코딩',
      '취약점 탐지의 역사',
      'AI 생성 테스트 스위트',
    ],
    readings: [
      {
        title: 'SAST vs DAST',
        url: 'https://www.splunk.com/en_us/blog/learn/sast-vs-dast.html',
        krSlug: 'sast-vs-dast',
        translationStatus: 'complete',
      },
      {
        title: 'Copilot Remote Code Execution via Prompt Injection',
        url: 'https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/',
        krSlug: 'copilot-rce-prompt-injection',
        translationStatus: 'complete',
      },
      {
        title: 'Finding Vulnerabilities in Modern Web Apps Using Claude Code and OpenAI Codex',
        url: 'https://semgrep.dev/blog/2025/finding-vulnerabilities-in-modern-web-apps-using-claude-code-and-openai-codex/',
        krSlug: 'finding-vulnerabilities-claude-code-codex',
        translationStatus: 'complete',
      },
      {
        title: 'Agentic AI Threats: Identity Spoofing and Impersonation Risks',
        url: 'https://unit42.paloaltonetworks.com/agentic-ai-threats/#:~:text=Identity%20spoofing%20and%20impersonation:%20Attackers,accurate%20information%20exchange%20are%20critical.',
        krSlug: 'agentic-ai-threats',
        translationStatus: 'complete',
      },
      {
        title: 'OWASP Top Ten: The Leading Web Application Security Risks',
        url: 'https://owasp.org/www-project-top-ten/',
        krSlug: 'owasp-top-ten',
        translationStatus: 'complete',
      },
      {
        title: 'Context Rot: Understanding Degradation in AI Context Windows',
        url: 'https://research.trychroma.com/context-rot',
        krSlug: 'context-rot',
        translationStatus: 'complete',
      },
      {
        title: 'Vulnerability Prompt Analysis with O3',
        url: 'https://github.com/SeanHeelan/o3_finds_cve-2025-37899/blob/master/system_prompt_uafs.prompt',
      },
    ],
    assignments: [
      {
        title: 'Writing Secure AI Code',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/blob/master/week6/assignment.md',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: 'AI QA, SAST, DAST, 그리고 그 너머',
        slidesUrl: 'https://docs.google.com/presentation/d/1C05bCLasMDigBbkwdWbiz4WrXibzi6ua4hQQbTod_8c/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        guest: {
          name: 'Isaac Evans',
          role: 'CEO',
          company: 'Semgrep',
          linkedIn: 'https://www.linkedin.com/in/isaacevans/',
          companyUrl: 'https://semgrep.dev/',
        },
      },
    ],
  },
  {
    number: 7,
    title: 'Modern Software Support',
    titleKr: '현대적 소프트웨어 지원',
    topics: [
      '신뢰할 수 있는 AI 코드 시스템',
      '디버깅과 진단',
      '지능형 문서 생성',
    ],
    readings: [
      {
        title: 'Code Reviews: Just Do It',
        url: 'https://blog.codinghorror.com/code-reviews-just-do-it/',
        krSlug: 'code-reviews-just-do-it',
        translationStatus: 'complete',
      },
      {
        title: 'How to Review Code Effectively',
        url: 'https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/',
        krSlug: 'how-to-review-code-effectively',
        translationStatus: 'complete',
      },
      {
        title: 'AI-Assisted Assessment of Coding Practices in Modern Code Review',
        url: 'https://arxiv.org/pdf/2405.13565',
        krSlug: 'ai-assisted-assessment-coding-practices',
        translationStatus: 'complete',
      },
      {
        title: 'AI Code Review Implementation Best Practices',
        url: 'https://graphite.dev/guides/ai-code-review-implementation-best-practices',
        krSlug: 'ai-code-review-best-practices',
        translationStatus: 'complete',
      },
      {
        title: 'Code Review Essentials for Software Teams',
        url: 'https://blakesmith.me/2015/02/09/code-review-essentials-for-software-teams.html',
        krSlug: 'code-review-essentials',
        translationStatus: 'complete',
      },
      {
        title: 'Lessons from millions of AI code reviews',
        url: 'https://www.youtube.com/watch?v=TswQeKftnaw',
        krSlug: 'lessons-millions-ai-code-reviews',
        translationStatus: 'complete',
      },
    ],
    assignments: [
      {
        title: 'Code Review Reps',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week7',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: 'AI 코드 리뷰',
        slidesUrl: 'https://docs.google.com/presentation/d/1NkPzpuSQt6Esbnr2-EnxM9007TL6ebSPFwITyVY-QxU/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://drive.google.com/file/d/1hwF-RIkOJ_OFy17BKhzFyCtxSS7Pcf7p/view?usp=drive_link',
        guest: {
          name: 'Tomas Reimers',
          role: 'CPO',
          company: 'Graphite',
          linkedIn: 'https://www.linkedin.com/in/tomasreimers/',
          companyUrl: 'https://graphite.dev/',
        },
      },
    ],
  },
  {
    number: 8,
    title: 'Automated UI and App Building',
    titleKr: '자동화된 UI 및 앱 개발',
    topics: [
      '모두를 위한 디자인과 프론트엔드',
      '빠른 UI/UX 프로토타이핑과 반복',
    ],
    readings: [],
    assignments: [
      {
        title: 'Multi-stack Web App Builds',
        url: 'https://github.com/mihail911/modern-software-dev-assignments/tree/master/week8',
      },
    ],
    lectures: [
      {
        day: '1차시',
        title: '프롬프트 하나로 완성하는 앱',
        slidesUrl: 'https://docs.google.com/presentation/d/1GrVLsfMFIXMiGjIW9D7EJIyLYh_-3ReHHNd_vRfZUoo/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://docs.google.com/presentation/d/1Jf2aN5zIChd5tT86rZWWqY-iDWbxgR-uynKJxBR7E9E/edit?usp=sharing',
        guest: {
          name: 'Gaspar Garcia',
          role: 'Head of AI Research',
          company: 'Vercel',
          linkedIn: 'https://www.linkedin.com/in/gaspargarcia/',
          companyUrl: 'https://vercel.com/',
        },
      },
    ],
  },
  {
    number: 9,
    title: 'Agents Post-Deployment',
    titleKr: '배포 후 에이전트 관리',
    topics: [
      'AI 시스템 모니터링과 관측성',
      '자동화된 장애 대응',
      '트리아지와 디버깅',
    ],
    readings: [
      {
        title: 'Introduction to Site Reliability Engineering',
        url: 'https://sre.google/sre-book/introduction/',
        krSlug: 'introduction-to-sre',
        translationStatus: 'complete',
      },
      {
        title: 'Observability Basics You Should Know',
        url: 'https://last9.io/blog/traces-spans-observability-basics/',
        krSlug: 'observability-basics',
        translationStatus: 'complete',
      },
      {
        title: 'Kubernetes Troubleshooting with AI',
        url: 'https://resolve.ai/blog/kubernetes-troubleshooting-in-resolve-ai',
        krSlug: 'kubernetes-troubleshooting',
        translationStatus: 'complete',
      },
      {
        title: 'Your New Autonomous Teammate',
        url: 'https://resolve.ai/blog/product-deep-dive',
        krSlug: 'autonomous-teammate',
        translationStatus: 'complete',
      },
      {
        title: 'Role of Multi Agent Systems in Making Software Engineers AI-native',
        url: 'https://resolve.ai/blog/role-of-multi-agent-systems-AI-native-engineering',
        krSlug: 'multi-agent-systems',
        translationStatus: 'complete',
      },
      {
        title: 'Benefits of Agentic AI in On-call Engineering',
        url: 'https://resolve.ai/blog/Top-5-Benefits',
        krSlug: 'agentic-ai-benefits',
        translationStatus: 'complete',
      },
    ],
    assignments: [],
    lectures: [
      {
        day: '1차시',
        title: '장애 대응과 DevOps',
        slidesUrl: 'https://docs.google.com/presentation/d/1Mfe-auWAsg9URCujneKnHr0AbO8O-_U4QXBVOlO4qp0/edit?usp=sharing',
      },
      {
        day: '2차시',
        title: '',
        slidesUrl: 'https://drive.google.com/file/d/11WnEbMGc9kny_WBpMN10I8oP8XsiQOnM/view?usp=sharing',
        guest: {
          name: 'Mayank Agarwal',
          role: 'CTO',
          company: 'Resolve',
          linkedIn: 'https://www.linkedin.com/in/mayank-ag/',
          companyUrl: 'https://resolve.ai/',
        },
        coGuest: {
          name: 'Milind Ganjoo',
          role: 'Technical Staff',
          company: 'Resolve',
          linkedIn: 'https://www.linkedin.com/in/mganjoo/',
          companyUrl: 'https://resolve.ai/',
        },
      },
    ],
  },
  {
    number: 10,
    title: "What's Next for AI Software Engineering",
    titleKr: 'AI 소프트웨어 엔지니어링의 미래',
    topics: [
      '소프트웨어 개발 역할의 미래',
      '새로운 AI 코딩 패러다임',
      '업계 트렌드와 전망',
    ],
    readings: [],
    assignments: [],
    lectures: [
      {
        day: '1차시',
        title: '10년 후의 소프트웨어 개발',
      },
      {
        day: '2차시',
        title: '',
        guest: {
          name: 'Martin Casado',
          role: 'General Partner',
          company: 'a16z',
          linkedIn: 'https://a16z.com/author/martin-casado/',
          companyUrl: 'https://a16z.com/',
        },
      },
    ],
  },
]
