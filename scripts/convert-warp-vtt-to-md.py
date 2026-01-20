#!/usr/bin/env python3
"""
Warp University VTT → Markdown 변환 스크립트
41개 VTT 자막 파일을 마크다운으로 변환하여 카테고리별 폴더에 저장
"""

import os
import re
from pathlib import Path

# 프로젝트 루트
ROOT = Path("/Users/junchan/Documents/GitHub/stanford-cs146s-kr")
MEDIA_DIR = ROOT / "docs/week5/warp-university/media"
ENG_DIR = ROOT / "docs/week5/warp-university/eng"

# slug → (category, title, titleKr, sourceUrl) 매핑
SLUG_MAPPING = {
    # Getting Started (9개)
    'warp-vs-claude-code': ('getting-started', 'Warp VS Claude Code', 'Warp vs Claude Code 비교', 'https://youtu.be/NUVftxAqZQo'),
    'using-project-rules': ('getting-started', 'Using Project Rules', '프로젝트 규칙 사용하기', 'https://youtu.be/SCYovBn4TnM'),
    'using-agent-profiles': ('getting-started', 'Using Agent Profiles', '에이전트 프로필 사용하기', 'https://youtu.be/iD0R-8fY-tY'),
    'agent-runtime-first-look': ('getting-started', "First look at Warp's Agent Runtime", 'Warp 에이전트 런타임 첫 만남', 'https://www.youtube.com/watch?v=hV6UdEf3C1I'),
    'minimal-ui': ('getting-started', "Make Warp's UI More Minimal", 'Warp UI 미니멀하게 만들기', 'https://youtu.be/1GKsIT8FSsE'),
    'full-warp-overview': ('getting-started', 'A Full Warp Overview', 'Warp 전체 개요', 'https://youtu.be/O5E6ze3vqeo'),
    'customize-warp': ('getting-started', 'Customize Warp', 'Warp 커스터마이징', 'https://youtu.be/fzb1JcZ0fFA'),
    'start-coding-task': ('getting-started', 'Start a Coding Task with Warp', 'Warp로 코딩 작업 시작하기', 'https://youtu.be/IuFSuOYstfg'),
    'edit-ai-code-inline': ('getting-started', 'Edit AI-Written Code Inline', 'AI가 작성한 코드 인라인 편집', 'https://youtu.be/dm-P63USsVg'),

    # Warp Code (2개)
    'code-review-panel': ('warp-code', "Master Warp's Code Review Panel", 'Warp 코드 리뷰 패널 마스터하기', 'https://youtu.be/4JlN0rvoZA8'),
    'ten-coding-features': ('warp-code', '10 Coding Features You Should Know in Warp', 'Warp에서 알아야 할 10가지 코딩 기능', 'https://youtu.be/oeonZ-jtzhA'),

    # Developer Workflows (7개)
    'figma-remote-mcp': ('developer-workflows', 'Setting up Figma Remote MCP in Warp', 'Warp에서 Figma Remote MCP 설정하기', 'https://youtu.be/PsM_Y8Pt-1Q'),
    'setup-ollama': ('developer-workflows', 'How to Setup Ollama using Warp', 'Warp로 Ollama 설정하기', 'https://youtu.be/Aq8vDxUg4VE'),
    'understand-codebases': ('developer-workflows', 'Understand Codebases', '코드베이스 이해하기', 'https://youtu.be/11rz9OYQ8Hg'),
    'postgres-ai-prompts': ('developer-workflows', 'Write Postgres Command with AI Prompts', 'AI 프롬프트로 Postgres 명령어 작성하기', 'https://youtu.be/guXQSMq_Yss'),
    'analyze-cloud-run-logs': ('developer-workflows', 'Analyze Cloud Run Logs', 'Cloud Run 로그 분석하기', 'https://youtu.be/GJ0NepZmmv8'),
    'making-ui-change': ('developer-workflows', 'Making a UI Change', 'UI 변경하기', 'https://youtu.be/V2pwBN6Vt7k'),
    'multiple-agents': ('developer-workflows', 'Run and Review Code with Multiple Agents', '여러 에이전트로 코드 실행 및 리뷰', 'https://youtu.be/3jwus1bfKv4'),

    # Using MCP (6개)
    'mcp-linear': ('using-mcp', 'Connecting Warp to Linear via MCP', 'MCP로 Warp와 Linear 연결하기', 'https://youtu.be/jxeMfuS1pXk'),
    'mcp-puppeteer': ('using-mcp', 'Using Puppeteer MCP Server', 'Puppeteer MCP 서버 사용하기', 'https://youtu.be/cYpENRzmpBU'),
    'mcp-context7': ('using-mcp', 'Using Context7 MCP Server', 'Context7 MCP 서버 사용하기', 'https://youtu.be/ssYE25sP7pc'),
    'mcp-sentry': ('using-mcp', 'Using Sentry MCP Server', 'Sentry MCP 서버 사용하기', 'https://youtu.be/mOzC0RyP9YA'),
    'mcp-figma': ('using-mcp', 'Using Figma MCP Server', 'Figma MCP 서버 사용하기', 'https://youtu.be/C0g_Onjtsb8'),
    'mcp-github': ('using-mcp', 'Using Github MCP Server', 'Github MCP 서버 사용하기', 'https://youtu.be/OXYQyNXH2Bw'),

    # Rules (5개)
    'rules-monorepos': ('rules', 'Link Your Monorepos with Rules', '규칙으로 모노레포 연결하기', 'https://youtu.be/bndY6opaA7w'),
    'rules-best-practices': ('rules', 'Set Coding Best Practices with Rules', '규칙으로 코딩 모범 사례 설정하기', 'https://youtu.be/AuM2OIvXlnY'),
    'rules-tech-stack': ('rules', 'Set Tech Stack Preferences with Rules', '규칙으로 기술 스택 선호도 설정하기', 'https://youtu.be/W5B6MhZsZ_4'),
    'rules-coding-preferences': ('rules', 'Set Coding Preferences with Rules', '규칙으로 코딩 선호도 설정하기', 'https://youtu.be/zWvRB2zWr-4'),
    'rules-prevent-secrets': ('rules', 'Prevent Secrets from Leaking with Rules', '규칙으로 비밀 유출 방지하기', 'https://youtu.be/2ECPFKtQpVk'),

    # Prompts (6개)
    'prompts-debugging': ('prompts', 'Better Prompts for Debugging Your App', '앱 디버깅을 위한 더 나은 프롬프트', 'https://youtu.be/YzZmrusN8Cw'),
    'prompts-db-optimization': ('prompts', 'Create Priority Matrix for Database Optimization', '데이터베이스 최적화를 위한 우선순위 매트릭스 만들기', 'https://youtu.be/VgE5wgtDSnk'),
    'prompts-pr-review': ('prompts', 'Reviewing PRs Like A Senior Dev', '시니어 개발자처럼 PR 리뷰하기', 'https://youtu.be/NVwqQyphlAw'),
    'prompts-ui-mockup': ('prompts', 'How to Actually Code UI That Matches Your Mockup', '목업과 일치하는 UI 실제로 코딩하기', 'https://youtu.be/GA0OO_1o8LA'),
    'prompts-docker-setup': ('prompts', 'Create a Production Ready Docker Setup', '프로덕션 레디 Docker 설정 만들기', 'https://youtu.be/zdQdEauSF6Q'),
    'prompts-saved-prompts': ('prompts', 'Trigger Reusable Actions with Saved Prompts', '저장된 프롬프트로 재사용 가능한 액션 실행하기', 'https://youtu.be/pE15zjJmB4E'),

    # How Warp Uses Warp (6개)
    'warp-understand-codebase': ('how-warp-uses-warp', 'Understanding your Codebase with Warp', 'Warp로 코드베이스 이해하기', 'https://www.youtube.com/watch?v=pohnoRZas-E'),
    'warp-images-context': ('how-warp-uses-warp', 'Using images as context with Warp', 'Warp에서 이미지를 컨텍스트로 사용하기', 'https://www.youtube.com/watch?v=_Pc7bL0zAoM'),
    'warp-multiple-agents': ('how-warp-uses-warp', 'Using multiple agents at once with Warp', 'Warp에서 여러 에이전트 동시 사용하기', 'https://www.youtube.com/watch?v=w0bJFC0u0pE'),
    'warp-mcp-servers': ('how-warp-uses-warp', 'Using MCP servers with Warp', 'Warp에서 MCP 서버 사용하기', 'https://www.youtube.com/watch?v=8vn2brhJrF8'),
    'warp-building-input': ('how-warp-uses-warp', "Building Warp's input with Warp", 'Warp로 Warp의 입력 만들기', 'https://www.youtube.com/watch?v=ySzUj7kMZ64'),
    'warp-creating-rules': ('how-warp-uses-warp', 'Creating rules for Agents with Warp', 'Warp로 에이전트 규칙 만들기', 'https://www.youtube.com/watch?v=OyrpkeL6WNY'),
}


def parse_vtt(vtt_path: Path) -> str:
    """VTT 파일을 파싱하여 순수 텍스트 추출"""
    with open(vtt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    text_lines = []
    seen_lines = set()  # 중복 제거용

    for line in lines:
        line = line.strip()

        # VTT 헤더, 타임스탬프, 빈 줄 스킵
        if not line:
            continue
        if line.startswith('WEBVTT'):
            continue
        if line.startswith('Kind:') or line.startswith('Language:'):
            continue
        if re.match(r'^\d+$', line):  # 숫자만 있는 줄 (cue 번호)
            continue
        if re.match(r'\d{2}:\d{2}:\d{2}\.\d{3}\s*-->', line):  # 타임스탬프
            continue
        if line.startswith('align:') or line.startswith('position:'):
            continue

        # HTML 태그 제거
        line = re.sub(r'<[^>]+>', '', line)

        # 중복 제거 (VTT는 같은 텍스트가 여러 타임스탬프에 반복됨)
        if line not in seen_lines:
            seen_lines.add(line)
            text_lines.append(line)

    # 문장 연결 (짧은 줄들을 자연스럽게 연결)
    paragraphs = []
    current_paragraph = []

    for line in text_lines:
        current_paragraph.append(line)

        # 문장 끝 감지 (마침표, 물음표, 느낌표로 끝나면)
        if line.endswith('.') or line.endswith('?') or line.endswith('!'):
            paragraphs.append(' '.join(current_paragraph))
            current_paragraph = []

    # 남은 텍스트 처리
    if current_paragraph:
        paragraphs.append(' '.join(current_paragraph))

    return '\n\n'.join(paragraphs)


def create_markdown(slug: str, text: str, category: str, title: str, title_kr: str, source_url: str) -> str:
    """마크다운 파일 생성"""
    frontmatter = f"""---
title: "{title}"
titleKr: "{title_kr}"
category: "{category}"
sourceUrl: "{source_url}"
---
"""

    content = f"""# {title}

[영상 바로가기]({source_url})

## 전체 자막

{text}
"""

    return frontmatter + content


def main():
    """메인 실행 함수"""
    # 카테고리 디렉토리 생성
    categories = set(info[0] for info in SLUG_MAPPING.values())
    for category in categories:
        (ENG_DIR / category).mkdir(parents=True, exist_ok=True)

    # VTT 파일 처리
    vtt_files = list(MEDIA_DIR.glob('*.vtt'))
    print(f"발견된 VTT 파일: {len(vtt_files)}개")

    converted = 0
    missing = []

    for vtt_file in sorted(vtt_files):
        # 파일명에서 slug 추출 (예: agent-runtime-first-look.en.vtt → agent-runtime-first-look)
        slug = vtt_file.stem.replace('.en', '')

        if slug not in SLUG_MAPPING:
            missing.append(slug)
            continue

        category, title, title_kr, source_url = SLUG_MAPPING[slug]

        # VTT 파싱
        text = parse_vtt(vtt_file)

        # 마크다운 생성
        md_content = create_markdown(slug, text, category, title, title_kr, source_url)

        # 저장
        output_path = ENG_DIR / category / f"{slug}.md"
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(md_content)

        print(f"✓ {slug} → {category}/{slug}.md")
        converted += 1

    print(f"\n변환 완료: {converted}개")

    if missing:
        print(f"\n⚠️ 매핑 없음: {missing}")


if __name__ == '__main__':
    main()
