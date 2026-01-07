# download-youtube Skill

YouTube 영상에서 오디오(MP3)와 자막(Transcript)을 다운로드합니다.

## 사용법

```
/download-youtube <youtube-url>
/download-youtube <youtube-url> --week <N>
/download-youtube <youtube-url> --audio-only
/download-youtube <youtube-url> --transcript-only
```

## 동작 흐름

### 1. URL 분석 및 검증

1. YouTube URL 형식 검증:
   - `youtube.com/watch?v=VIDEO_ID`
   - `youtu.be/VIDEO_ID`
   - 그 외 형식은 에러

2. Week 번호 결정:
   - `--week` 파라미터가 있으면 사용
   - 없으면 `src/content/syllabus.ts`에서 URL 매칭하여 추론
   - 매칭 실패 시 사용자에게 Week 번호 입력 요청

3. Slug 생성:
   - syllabus.ts의 title 또는 krSlug에서 생성
   - 소문자, 공백→하이픈, 특수문자 제거
   - 예: "Deep Dive into LLMs" → `deep-dive-llms`

### 2. yt-dlp 설치 확인

```bash
which yt-dlp
```

설치되어 있지 않으면:
- 사용자에게 설치 안내: `pip install yt-dlp`
- 또는 자동 설치 시도

### 3. 메타데이터 추출

```bash
yt-dlp --dump-json <URL>
```

추출 정보:
- title: 영상 제목
- uploader: 채널명
- duration: 영상 길이 (초)
- description: 영상 설명

### 4. 오디오 다운로드 (--transcript-only가 아닌 경우)

```bash
yt-dlp -x --audio-format mp3 \
  -o "docs/week{N}/media/{slug}.mp3" \
  <URL>
```

저장 경로: `docs/week{N}/media/{slug}.mp3`

### 5. 자막/Transcript 다운로드 (--audio-only가 아닌 경우)

```bash
yt-dlp --write-subs --write-auto-subs \
  --sub-langs "en" --sub-format "vtt" \
  --skip-download \
  -o "docs/week{N}/media/{slug}" \
  <URL>
```

자막 우선순위:
1. 수동 영어 자막 (en)
2. 자동 생성 영어 자막 (en-orig, en-auto)
3. 없으면 경고 표시

저장 경로: `docs/week{N}/media/{slug}.en.vtt`

### 6. VTT → Markdown 변환

VTT 파일을 파싱하여 Markdown 형식의 Transcript로 변환:

```markdown
---
title: "영상 제목"
source_url: "https://youtube.com/..."
source_type: youtube_transcript
author: "채널명"
duration: "HH:MM:SS"
fetch_date: "YYYY-MM-DD"
translation_status: none
audio_file: "media/{slug}.mp3"
---

# 영상 제목

[원본 링크](https://youtube.com/...)

## Transcript

[00:00:00] 첫 번째 문장...

[00:00:15] 두 번째 문장...
```

저장 경로: `docs/week{N}/{slug}.md`

### 7. INDEX.md 업데이트

- `docs/week{N}/INDEX.md`의 해당 Reading 상태를 `collected`로 업데이트
- 수집 날짜, 자막 유형(수동/자동) 등 메타 정보 추가

## 옵션

| 옵션 | 설명 |
|------|------|
| `--week <N>` | Week 번호 직접 지정 |
| `--audio-only` | 오디오 파일만 다운로드 |
| `--transcript-only` | 자막만 다운로드 (오디오 스킵) |
| `--lang <code>` | 자막 언어 지정 (기본: en) |

## 예시

### 기본 사용 (오디오 + 자막)
```
/download-youtube https://www.youtube.com/watch?v=7xTGNNLPyMI
```
결과:
- `docs/week1/media/deep-dive-llms.mp3`
- `docs/week1/media/deep-dive-llms.en.vtt`
- `docs/week1/deep-dive-llms.md`

### Week 지정
```
/download-youtube https://www.youtube.com/watch?v=TswQeKftnaw --week 7
```
결과: `docs/week7/` 디렉토리에 저장

### Transcript만 다운로드
```
/download-youtube https://www.youtube.com/watch?v=T9aRN5JkmL8 --transcript-only
```
결과: MP3 없이 자막과 Transcript 마크다운만 생성

## 에러 처리

| 상황 | 메시지 |
|------|--------|
| yt-dlp 미설치 | `yt-dlp가 설치되어 있지 않습니다. pip install yt-dlp로 설치해주세요.` |
| 잘못된 URL | `유효한 YouTube URL이 아닙니다.` |
| 자막 없음 | `이 영상에는 자막이 없습니다. 오디오만 다운로드되었습니다.` |
| 다운로드 실패 | `다운로드 중 오류가 발생했습니다: [에러 메시지]` |
| Week 매칭 실패 | `syllabus.ts에서 해당 URL을 찾을 수 없습니다. --week 옵션을 사용해주세요.` |

## 참고 파일

- `src/content/syllabus.ts`: URL-Week 매핑
- `docs/glossary.md`: 기술 용어 번역 참조
- `docs/INDEX.md`: 전체 진행 상황
- `docs/week{N}/INDEX.md`: 주차별 상세

## 출력

다운로드 완료 후 표시:
- 저장된 파일 경로들
- 영상 길이
- 자막 유형 (수동/자동)
- 다음 단계 안내: `/translate-reading week{N}/{slug}`

## VTT 파싱 로직

### 입력 예시 (VTT)
```vtt
WEBVTT

00:00:00.000 --> 00:00:03.500
Hi everyone, today we're going to dive deep into

00:00:03.500 --> 00:00:07.200
how large language models work.
```

### 출력 예시 (Markdown)
```markdown
[00:00:00] Hi everyone, today we're going to dive deep into how large language models work.
```

변환 규칙:
1. 연속된 짧은 문장은 하나로 병합 (가독성 향상)
2. 타임스탬프는 [HH:MM:SS] 형식으로 단순화
3. 문장 단위로 구분 (마침표, 물음표, 느낌표 기준)

## 번역 워크플로우 연계

이 스킬의 출력물은 `/translate-reading` 스킬과 완벽 호환됩니다:

```
/download-youtube <url>
    ↓
docs/week{N}/{slug}.md 생성
    ↓
/translate-reading week{N}/{slug}
    ↓
docs/week{N}/kr/{slug}.md 생성
```
