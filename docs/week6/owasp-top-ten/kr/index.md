---
title: "OWASP Top Ten: 주요 웹 애플리케이션 보안 위협"
originalTitle: "OWASP Top Ten: The Leading Web Application Security Risks"
author: "OWASP Foundation"
sourceUrl: "https://owasp.org/www-project-top-ten/"
translatedAt: "2026-01-13"
status: "final"
qaScore:
  consistency: 9
  readability: 8
  accuracy: 9
  overall: 9
---

# OWASP Top Ten 웹 애플리케이션 보안 위협

[원본 링크](https://owasp.org/www-project-top-ten/)

## 개요

OWASP Top Ten은 "개발자와 웹 애플리케이션 보안 전문가를 위한 표준 인식 문서"입니다. 최신 버전인 [OWASP Top Ten 2025](https://owasp.org/Top10/2025/)와 이전 버전인 [2021](https://owasp.org/Top10/2021/), [2017](/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf)을 확인할 수 있습니다.

## 목적

이 문서는 보안 코딩을 실천하려는 개발자를 위한 기초 자료입니다. 조직은 "이 문서를 채택하여 웹 애플리케이션의 위험을 최소화하는 프로세스를 시작할 것"을 권장합니다.

## 번역 현황

### Top 10:2025 완료된 번역

_번역 진행 중 - 곧 확인하세요!_

### 이전 버전 번역

#### Top 10:2021 완료된 번역

- **ar - 아랍어**
- **es - 스페인어**
- **fr - 프랑스어**
- **id - 인도네시아어**
- **it - 이탈리아어**
- **ja - 일본어**
- **pt_BR - 포르투갈어 (브라질)**
- **zh_CN - 중국어 간체**
- **zh_TW - 중국어 번체**

#### Top 10:2017 완료된 번역

중국어, 프랑스어, 독일어, 히브리어, 일본어, 한국어, 포르투갈어, 러시아어, 스페인어 등 여러 언어를 지원하며, 번역자 정보를 상세히 제공합니다.

#### Top 10:2013 완료된 번역

아랍어, 중국어, 체코어, 프랑스어, 독일어, 히브리어, 이탈리아어, 일본어, 한국어, 브라질 포르투갈어, 스페인어, 우크라이나어 번역을 제공하며, 번역팀 전체 귀속 정보를 포함합니다.

#### 2010 완료된 번역

- 한국어 2010
- 스페인어 2010
- 프랑스어 2010
- 독일어 2010
- 인도네시아어 2010
- 이탈리아어 2010
- 일본어 2010
- 중국어 2010
- 베트남어 2010
- 히브리어 2010

## 프로젝트 후원

### 2021 후원사

OWASP Top 10:2021은 Secure Code Warrior가 후원했습니다.

### 2017 후원사

Autodesk가 후원하고 OWASP NoVA 챕터가 지원했습니다.

### 2003-2013 후원사

Aspect Security가 이전 버전을 후원했습니다.

---

## OWASP Top 10 2025 데이터 분석 계획

### 목표

이 이니셔티브의 목표는 "현재까지 식별된 애플리케이션 취약점에 관해 가장 포괄적인 데이터셋을 수집하는 것"입니다. 데이터 소스로는 보안 벤더, 컨설팅 업체, 버그바운티, 조직 기여가 있습니다. 사람 지원 도구(HaT, Human assisted Tools)와 도구 지원 사람(TaH, Tool assisted Human) 접근 방식을 비교할 수 있도록 데이터를 정규화합니다.

### 분석 인프라

데이터 수집, 분석, 저장에 OWASP Azure Cloud Infrastructure를 활용합니다.

### 기여

#### 검증된 데이터 기여

**시나리오 1:** 제출자 신원이 알려져 있고 공개 식별에 동의한 경우

**시나리오 2:** 제출자 신원이 알려져 있지만 익명을 원하는 경우

**시나리오 3:** 제출자 신원이 알려져 있지만 데이터셋에 데이터 기록을 원하지 않는 경우

#### 미검증 데이터 기여

**시나리오 4:** 익명 제출 (검토 중)

미검증 데이터는 분석 시 해당 분류로 표시합니다.

### 기여 프로세스

다음 방법으로 데이터를 기여할 수 있습니다:

1. CSV/Excel 파일을 [프로젝트 이메일]로 전송
2. [https://bit.ly/OWASPTop10Data](https://bit.ly/OWASPTop10Data)에 업로드

템플릿 예시는 [GitHub 저장소](https://github.com/OWASP/Top10/tree/master/2025/Data)에서 확인하세요.

### 기여 기간

2021-2024년 데이터 기여는 2025년 7월 31일까지 접수합니다.

### 데이터 구조 요구사항

#### 필수 메타데이터

- 기여자 이름 (조직 또는 익명)
- 기여자 연락 이메일
- **기간 (2024, 2023, 2022, 2021)**
- **테스트한 애플리케이션 수**
- 테스트 유형 (TaH, HaT, Tools)
- 주요 언어 (코드)
- 지역 (글로벌, 북미, EU, 아시아, 기타)
- 주요 산업 (다수, 금융, 산업, 소프트웨어 등)
- 재테스트 또는 중복 애플리케이션 포함 여부 (참/거짓)

#### CWE 데이터

- **각 CWE가 발견된 애플리케이션 수와 함께 CWE 목록**

_분석 정확도 향상을 위해 CWE 카테고리보다 핵심 CWE를 선호합니다. 모든 정규화/집계 작업을 문서화합니다._

#### 데이터셋 제출 참고사항

별도의 HaT(Human assisted Tools)와 TaH(Tool assisted Human) 데이터셋을 보유한 기여자는 각각 별도로 제출해야 합니다.

### 설문조사 구성요소

2021 모델에 따라 커뮤니티 설문조사로 데이터 분석에 완전히 반영되지 않은 최대 2개의 Top Ten 카테고리를 식별합니다. 2025년 초 예정인 설문조사는 Google Forms를 활용하여 현재 Top Ten에 포함되지 않은 트렌드 발견 및 CWE를 조사합니다.

### 분석 프로세스

향후 연구를 위해 원시 데이터를 유지하면서 데이터를 정규화합니다. 분석에 포함되는 항목:

- CWE 분포 계산
- CWE 재분류 및 통합 가능성 검토
- 모든 정규화 작업의 완전한 문서화
- 발생률 계산 (애플리케이션당 최소 하나의 인스턴스 발생 가능성)
- 상위 20-30개 CWE에 대한 기본 CWSS 점수
- Top 10 순위를 위한 잠재적 영향 가중치
- 보안 및 개발 커뮤니티를 위한 추가 인사이트 탐색

---

## 프로젝트 정보

### 주요 리소스

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [OWASP Top 10 제작 과정](https://www.owasptopten.org/)
- [이전 버전 (2021)](https://owasp.org/Top10/2021/)
- [이전 버전 (2017)](https://owasp.org/www-project-top-ten/2017)

### 다운로드

- [OWASP Top 10 2017 PDF](/www-pdf-archive/OWASP_Top_10-2017_%28en%29.pdf.pdf)
- [기타 언어 및 버전](https://owasp.org/www-project-top-ten/#div-translation_efforts)

### 프로젝트 리더십

- Andrew van der Stock
- Brian Glas
- Neil Smithline
- Tanya Janca
- Torsten Gigler

### 코드 저장소

[GitHub 저장소](https://github.com/OWASP/Top10)

### 소셜 미디어

[Twitter](https://twitter.com/owasptop10)

---

**OWASP 재단**은 오픈 소스 프로젝트, 글로벌 챕터, 멤버십 네트워크, 컨퍼런스 개최를 통해 소프트웨어 보안 향상에 전념하는 비영리 조직입니다.

모든 콘텐츠는 Creative Commons Attribution-ShareAlike v4.0으로 제공되며 보증하지 않습니다. OWASP는 벤더 중립성을 유지하며 상업용 제품이나 서비스를 보증하지 않습니다. Copyright 2025, OWASP Foundation, Inc.

---

## 핵심 요약

- OWASP Top Ten은 개발자와 웹 애플리케이션 보안 전문가를 위한 표준 인식 문서
- 최신 버전은 2025년 버전이며, 2021년과 2017년 버전도 제공
- 보안 벤더, 컨설팅 업체, 버그바운티 등 다양한 소스에서 데이터 수집
- CWE 기반의 체계적인 분석으로 Top 10 순위 결정
- 커뮤니티 설문조사로 데이터 분석에 반영되지 않은 위험 식별
- 다국어 번역 지원으로 글로벌 접근성 확보
