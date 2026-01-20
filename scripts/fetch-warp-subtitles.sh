#!/bin/bash
# Warp University 41개 영상 자막 다운로드 스크립트

cd /Users/junchan/Documents/GitHub/stanford-cs146s-kr
MEDIA_DIR="docs/week5/warp-university/media"

# 3개씩 병렬 실행 함수
download_subtitle() {
    local slug=$1
    local url=$2
    echo "Downloading: $slug"
    yt-dlp --skip-download --write-auto-sub --sub-lang en --convert-subs vtt \
        -o "$MEDIA_DIR/$slug" "$url" 2>/dev/null
}

export -f download_subtitle
export MEDIA_DIR

# Getting Started (9개)
echo "=== Getting Started (9개) ==="
download_subtitle "warp-vs-claude-code" "https://youtu.be/NUVftxAqZQo" &
download_subtitle "using-project-rules" "https://youtu.be/SCYovBn4TnM" &
download_subtitle "using-agent-profiles" "https://youtu.be/iD0R-8fY-tY" &
wait

download_subtitle "agent-runtime-first-look" "https://www.youtube.com/watch?v=hV6UdEf3C1I" &
download_subtitle "minimal-ui" "https://youtu.be/1GKsIT8FSsE" &
download_subtitle "full-warp-overview" "https://youtu.be/O5E6ze3vqeo" &
wait

download_subtitle "customize-warp" "https://youtu.be/fzb1JcZ0fFA" &
download_subtitle "start-coding-task" "https://youtu.be/IuFSuOYstfg" &
download_subtitle "edit-ai-code-inline" "https://youtu.be/dm-P63USsVg" &
wait

# Warp Code (2개)
echo "=== Warp Code (2개) ==="
download_subtitle "code-review-panel" "https://youtu.be/4JlN0rvoZA8" &
download_subtitle "ten-coding-features" "https://youtu.be/oeonZ-jtzhA" &
wait

# Developer Workflows (7개)
echo "=== Developer Workflows (7개) ==="
download_subtitle "figma-remote-mcp" "https://youtu.be/PsM_Y8Pt-1Q" &
download_subtitle "setup-ollama" "https://youtu.be/Aq8vDxUg4VE" &
download_subtitle "understand-codebases" "https://youtu.be/11rz9OYQ8Hg" &
wait

download_subtitle "postgres-ai-prompts" "https://youtu.be/guXQSMq_Yss" &
download_subtitle "analyze-cloud-run-logs" "https://youtu.be/GJ0NepZmmv8" &
download_subtitle "making-ui-change" "https://youtu.be/V2pwBN6Vt7k" &
wait

download_subtitle "multiple-agents" "https://youtu.be/3jwus1bfKv4" &
wait

# Using MCP (6개)
echo "=== Using MCP (6개) ==="
download_subtitle "mcp-linear" "https://youtu.be/jxeMfuS1pXk" &
download_subtitle "mcp-puppeteer" "https://youtu.be/cYpENRzmpBU" &
download_subtitle "mcp-context7" "https://youtu.be/ssYE25sP7pc" &
wait

download_subtitle "mcp-sentry" "https://youtu.be/mOzC0RyP9YA" &
download_subtitle "mcp-figma" "https://youtu.be/C0g_Onjtsb8" &
download_subtitle "mcp-github" "https://youtu.be/OXYQyNXH2Bw" &
wait

# Rules (5개)
echo "=== Rules (5개) ==="
download_subtitle "rules-monorepos" "https://youtu.be/bndY6opaA7w" &
download_subtitle "rules-best-practices" "https://youtu.be/AuM2OIvXlnY" &
download_subtitle "rules-tech-stack" "https://youtu.be/W5B6MhZsZ_4" &
wait

download_subtitle "rules-coding-preferences" "https://youtu.be/zWvRB2zWr-4" &
download_subtitle "rules-prevent-secrets" "https://youtu.be/2ECPFKtQpVk" &
wait

# Prompts (6개)
echo "=== Prompts (6개) ==="
download_subtitle "prompts-debugging" "https://youtu.be/YzZmrusN8Cw" &
download_subtitle "prompts-db-optimization" "https://youtu.be/VgE5wgtDSnk" &
download_subtitle "prompts-pr-review" "https://youtu.be/NVwqQyphlAw" &
wait

download_subtitle "prompts-ui-mockup" "https://youtu.be/GA0OO_1o8LA" &
download_subtitle "prompts-docker-setup" "https://youtu.be/zdQdEauSF6Q" &
download_subtitle "prompts-saved-prompts" "https://youtu.be/pE15zjJmB4E" &
wait

# How Warp Uses Warp (6개)
echo "=== How Warp Uses Warp (6개) ==="
download_subtitle "warp-understand-codebase" "https://www.youtube.com/watch?v=pohnoRZas-E" &
download_subtitle "warp-images-context" "https://www.youtube.com/watch?v=_Pc7bL0zAoM" &
download_subtitle "warp-multiple-agents" "https://www.youtube.com/watch?v=w0bJFC0u0pE" &
wait

download_subtitle "warp-mcp-servers" "https://www.youtube.com/watch?v=8vn2brhJrF8" &
download_subtitle "warp-building-input" "https://www.youtube.com/watch?v=ySzUj7kMZ64" &
download_subtitle "warp-creating-rules" "https://www.youtube.com/watch?v=OyrpkeL6WNY" &
wait

echo "=== 완료 ==="
echo "다운로드된 파일 수:"
ls -1 $MEDIA_DIR/*.vtt 2>/dev/null | wc -l
