---
name: pnpm monorepo conversion
overview: npm 싱글 프로젝트를 pnpm workspace 모노레포로 전환하고, Next.js 프론트엔드(롤토체스 팀 빌더)를 추가합니다.
todos:
  - id: monorepo-setup
    content: pnpm workspace 구조 생성, 기존 코드를 apps/api로 이동, 루트 package.json 및 pnpm-workspace.yaml 설정
    status: pending
  - id: nextjs-init
    content: apps/web에 Next.js + Tailwind + shadcn/ui 프로젝트 생성
    status: pending
  - id: champion-list
    content: 챔피언 목록 페이지 구현 (코스트별 색상, 시너지 뱃지, 필터링)
    status: pending
  - id: team-builder
    content: 팀 빌더 페이지 구현 (드래그앤드롭, 시너지 계산, 스탯 표시)
    status: pending
  - id: api-integration
    content: 프론트엔드에서 백엔드 API 연동 또는 데이터 직접 import 설정
    status: pending
isProject: false
---

# pnpm 모노레포 전환 + Next.js 롤토체스 팀 빌더

## 모노레포 구조

```
agent-lab/
├── pnpm-workspace.yaml
├── package.json            (root: scripts, devDeps only)
├── apps/
│   ├── api/                (기존 NestJS 백엔드 이동)
│   │   ├── src/
│   │   ├── prisma/
│   │   ├── data/
│   │   ├── generated/
│   │   └── package.json
│   └── web/                (새 Next.js 프론트엔드)
│       ├── src/app/
│       ├── components/
│       ├── lib/
│       └── package.json
└── packages/               (향후 공유 패키지용, 지금은 비워둠)
```

## Phase 1: 모노레포 전환

- `node_modules/`, `package-lock.json` 삭제
- 루트 `package.json`을 workspace root용으로 변경 (private, scripts만)
- `pnpm-workspace.yaml` 생성: `apps/*`, `packages/*`
- 기존 NestJS 코드 전체를 `apps/api/`로 이동
- `apps/api/package.json`에 기존 dependencies 유지
- `prisma.config.ts`, `tsconfig.json`, `nest-cli.json` 등 경로 조정
- `pnpm install` 실행

## Phase 2: Next.js 프론트엔드 (`apps/web`)

- `pnpm create next-app apps/web` (App Router, TypeScript, Tailwind CSS)
- shadcn/ui 초기화 (`pnpm dlx shadcn@latest init`)
- 주요 페이지 구성:
  - `/` — 랜딩/대시보드
  - `/champions` — 챔피언 목록 (코스트별 필터, 시너지별 필터)
  - `/builder` — 팀 빌더 (드래그&드롭으로 챔피언 배치, 활성 시너지 실시간 표시)

## Phase 3: 프론트엔드 핵심 기능

### 챔피언 목록 페이지

- 코스트별 색상 구분 (1~5코스트)
- 시너지(Trait) 아이콘/뱃지 표시
- 검색 및 필터링

### 팀 빌더 페이지

- 8칸 슬롯에 챔피언 드래그&드롭 배치
- 활성 시너지 자동 계산 및 표시 (브론즈/실버/골드 등급)
- 팀 총 코스트, 스탯 요약
- 챔피언 카드 클릭 시 스탯/스킬 상세 팝업

### 데이터 흐름

- `apps/web`에서 `apps/api`의 REST API 호출 (또는 빌드 시 JSON 직접 import)
- 챔피언 데이터는 API `/champions` 엔드포인트에서 가져옴

## 기술 스택

- **모노레포:** pnpm workspaces
- **백엔드:** NestJS 11, Prisma 7, PostgreSQL
- **프론트엔드:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **드래그&드롭:** `@dnd-kit/core`
- **상태관리:** Zustand (팀 빌더 상태)
