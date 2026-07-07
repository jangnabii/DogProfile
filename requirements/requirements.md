
# 🐶 강아지 주민등록증 생성 웹사이트

Product Requirement Document (PRD)

## 1. 프로젝트 개요

사용자가 강아지 정보를 입력하면 미리 제작된 주민등록증 템플릿(card.jpg) 위에 입력한 텍스트와 사진을 정확한 위치에 합성하여 주민등록증 이미지를 생성하는 웹서비스를 제작한다.

웹사이트는 단순한 이미지 편집기가 아니라 고정된 카드 디자인(card.jpg)에 데이터를 오버레이(Overlay)하여 하나의 이미지로 완성하는 방식으로 구현한다.

최종 결과물은 PNG 이미지로 다운로드할 수 있다.

⸻

## * 기술 스택

Framework

* Next.js 15 (App Router)
* TypeScript
* React
* Tailwind CSS

Image Generation

* HTML + CSS Overlay 방식
* html-to-image (권장)
* html2canvas 가능

State

* React Hook
* Zustand (선택)

Deployment

* Vercel

Analytics

* Vercel Analytics
* Vercel Speed Insights

Database

* Supabase

또는

* Firebase

⸻

## * 핵심 구현 방식 (매우 중요)

서비스는 빈 주민등록증 이미지(card.jpg) 를 배경으로 사용한다.

절대로 Canvas 위에 새로 디자인하는 방식이 아니다.

구조는 다음과 같다.

card.jpg
    │
    ├── 강아지 사진
    ├── 이름
    ├── 등록번호
    ├── 견종
    ├── 성별
    ├── 생년월일
    ├── 보호자
    ├── 발급일
    └── 기타 문구

즉,

사용자가 입력한 데이터는

card.jpg 위의 지정된 좌표(Position)에 HTML 요소로 배치된다.

예시

<div class="card">
<img src="card.jpg">
<div class="dogName">
장찹쌀
</div>
<div class="breed">
말티푸
</div>
<div class="birth">
2024.12.16
</div>
<img class="photo">
</div>

다운로드 버튼을 누르면

이 HTML 전체를 이미지(PNG)로 변환하여 저장한다.

중요

* card.jpg는 절대 수정하지 않는다.
* 모든 정보는 Overlay 방식으로만 표시한다.
* 위치는 CSS absolute positioning으로 관리한다.
* 카드 템플릿이 변경되더라도 CSS 좌표만 수정하면 재사용 가능하도록 설계한다.

⸻

## * 사용자 기능

사용자는 다음 정보를 입력할 수 있다.

강아지 이름

텍스트 입력

⸻

등록번호

텍스트 입력

⸻

견종

기본 견종 선택

스크롤 선택

목록

* 말티푸
* 말티즈
* 푸들
* 포메라니안
* 비숑
* 치와와
* 시츄
* 요크셔테리어
* 믹스견

“직접 입력” 선택 시

텍스트 입력 가능

⸻

성별

선택형

* 남아
* 여아

⸻

생년월일

모바일

Wheel Picker

PC

Dropdown

최종 출력

2024.12.16

⸻

보호자 이름

텍스트 입력

⸻

사진

모바일

갤러리 선택

PC

파일 선택

지원 형식

* jpg
* png
* webp

업로드 후

사진 Crop 가능

사진은 자동으로

주민등록증 사진 영역에 맞게

cover 처리

⸻

## * 카드 미리보기

사용자가 입력하는 즉시

오른쪽(PC)

또는

상단(모바일)

미리보기가 실시간 업데이트된다.

Preview는 실제 다운로드 결과와 동일해야 한다.

WYSIWYG(What You See Is What You Get) 원칙을 따른다.

⸻

## * 다운로드 기능

다운로드 버튼 클릭 시

현재 Preview 그대로

PNG 생성

파일명

강아지등록증_강아지이름.png

예시

강아지등록증_장찹쌀.png

다운로드 이미지에는

다음만 포함된다.

* card.jpg
* 사진
* 텍스트

절대로 포함하지 않는다.

* 입력폼
* 버튼
* 배경
* 헤더
* Footer

⸻

## * 관리자(Admin) 페이지

관리자는 별도의 Admin 페이지를 가진다.

예시

/admin

로그인 필요

(비밀번호 또는 Google 로그인)

관리자는 다음 정보를 확인할 수 있다.

Dashboard

오늘 생성 수

이번 달 생성 수

전체 생성 수

방문자 수

다운로드 횟수

성공률

오류 발생 횟수

⸻

사용 통계

일별 생성 그래프

주별 생성 그래프

월별 생성 그래프

가장 많이 선택된 견종

가장 많이 입력된 이름

모바일 / PC 비율

브라우저 비율

국가별 사용자

⸻

로그

최근 생성 기록

생성 시간

브라우저

OS

다운로드 여부

(개인정보는 저장하지 않는다.)

⸻

카드 관리

향후

card.jpg 교체 가능하도록 설계

예시

card01.jpg
card02.jpg
card03.jpg

관리자가 선택하면

즉시 적용 가능

⸻

## * 디자인 요구사항

전체 웹사이트는

손그림 감성을 유지한다.

키워드

* 색연필
* 크레파스
* 파스텔
* 공주방
* 노트
* 낙서
* 말랑한 버튼

단,

레이아웃은

최신 SaaS 느낌으로 제작한다.

피해야 할 것

* 2000년대 홈페이지
* 플래시 느낌
* 촌스러운 아이콘
* 복잡한 메뉴

⸻

9. 반응형

모바일

제목
↓
카드 Preview
↓
입력폼
↓
다운로드

PC

입력폼      Preview

2 Column

⸻

## * 성능 목표

* Lighthouse Performance 90점 이상
* 모바일 최적화
* 첫 화면 로딩 2초 이하
* 이미지 생성 1초 이내(일반 환경 기준)
* Core Web Vitals 최적화

⸻

## * 개인정보 정책

사용자가 입력한 이름, 사진, 생년월일은 기본적으로 서버에 저장하지 않는다.

이미지 생성은 브라우저에서 처리(Client-side Rendering)를 기본으로 한다.

관리자 페이지에는 개인정보가 아닌 익명화된 사용 통계만 저장한다.

⸻

## * MVP

필수 기능은 다음과 같다.

* Next.js 기반 프로젝트 구성
* 실시간 카드 미리보기
* card.jpg 위에 텍스트 및 사진 오버레이
* 이미지(PNG) 다운로드
* 모바일/PC 반응형
* 관리자(Admin) 페이지
* 사용량 통계(방문, 생성, 다운로드)
* Vercel 배포
* 향후 카드 템플릿 교체를 고려한 확장 가능한 구조
