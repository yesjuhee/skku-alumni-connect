# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 본 저장소의 코드를 다룰 때 참고할 가이드입니다.

## 프로젝트 개요

성균관대학교 총동창회(Sungkyunkwan University Alumni Association) 웹 애플리케이션입니다. 정적 목(mock) 데이터를 사용하는 프론트엔드 전용 React SPA이며, 본 저장소에는 백엔드가 포함되어 있지 않습니다.

## 명령어

- `npm run dev` — Vite 개발 서버 실행
- `npm run build` — 프로덕션 빌드
- `npm run build:dev` — 개발 빌드
- `npm run lint` — ESLint 실행
- `npm run test` — Vitest 1회 실행
- `npm run test:watch` — Vitest 워치 모드 실행

## 기술 스택

- **React 18** + **TypeScript** (tsconfig에서 strict 모드는 꺼져 있음)
- **Vite** 빌드 도구
- **React Router DOM v6** — 레이아웃 컴포넌트를 활용한 중첩 라우팅
- **Tailwind CSS** + **shadcn/ui** (default 스타일, CSS 변수, `@/components/ui/*`)
- **TanStack React Query** — 설정은 되어 있으나 아직 실제 API와 연결되어 있지 않음
- **React Hook Form** + **Zod** — 폼 처리 및 유효성 검증
- **Sonner** — 토스트 알림
- **Vitest** + **@testing-library/react** — 단위 테스트
- **Playwright** — E2E 테스트

## 경로 별칭

`@/*`는 `./src/*`로 매핑됩니다 (tsconfig 및 vite에 설정됨).

## 아키텍처

### 라우팅 & 레이아웃

모든 라우트는 `src/App.tsx`에 정의되어 있습니다. 두 개의 레이아웃 컴포넌트가 페이지 그룹을 감쌉니다.

- **MainLayout** (`src/components/MainLayout.tsx`) — `/main/*` 하위의 일반 사용자용 페이지. 상단 내비게이션 + 모바일 하단 내비게이션 포함
- **AdminLayout** (`src/components/AdminLayout.tsx`) — `/admin/*` 하위의 관리자 페이지

랜딩, 로그인, 회원가입 플로우 등 단독 라우트는 공통 레이아웃을 사용하지 않습니다.

### 주요 라우트 그룹

- `/` — 랜딩 페이지
- `/login`, `/register/*` — 인증 및 다단계 회원가입 플로우
- `/main/*` — 회원용 페이지 (about, members, news, community, business, mypage, id-card, benefits)
- `/admin/*` — 관리자 대시보드 및 관리 페이지 (members, upload, applications, payments, news, community)

### 데이터 레이어

현재는 정적 데이터 기반입니다. 목 데이터는 `src/data/`에 위치합니다 (members.ts, news.ts, community.ts). 필터링·정렬·검색은 페이지 컴포넌트에서 클라이언트 측에서 직접 처리합니다. React Query는 연결되어 있으나 백엔드 연동 대기 중입니다.

### UI 컴포넌트

shadcn/ui 컴포넌트는 `src/components/ui/`에 있습니다. 새 컴포넌트는 `npx shadcn-ui@latest add <component>`로 추가합니다. 설정은 `components.json`에 있습니다.

### 디자인 토큰

`src/index.css`에 CSS 변수로 커스텀 컬러 스킴이 정의되어 있습니다. 메인 컬러는 그린(HSL 145), 폰트는 "Noto Sans KR"이며, next-themes로 다크 모드를 지원합니다.

## 컨벤션

- 모든 UI 텍스트는 한국어로 작성합니다
- 컴포넌트는 훅을 사용하는 함수형 컴포넌트로 작성합니다
- 페이지는 `src/pages/`에 둡니다 (관리자 페이지는 `src/pages/admin/`)
- 재사용 가능한 컴포넌트는 `src/components/`에 둡니다
- 커스텀 훅은 `src/hooks/`에 둡니다
