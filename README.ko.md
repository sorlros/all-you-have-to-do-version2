# All You Have To Do

일상적인 일정과 할 일(To-do) 목록을 매끄럽게 관리할 수 있도록 설계된 모던하고 반응형인 웹 애플리케이션입니다. Next.js와 Firebase 기반으로 구축되었으며, 직관적인 할 일 카테고리화, 실시간 업데이트, 푸시 알림 기능을 지원하여 사용자의 일정 관리를 돕습니다.

다른 언어로 읽기: [English](README.md)

## 🌟 주요 기능

- **할 일 카테고리 관리**: 주방, 운동, 목표, 지출, 기타 등 목적에 맞게 할 일을 분류하여 관리합니다.
- **사용자 인증**: 안전한 Google 로그인을 지원하며, 즉각적인 사용을 위해 익명 로그인(데이터 1주일 후 만료) 기능을 제공합니다.
- **푸시 알림**: Firebase Cloud Messaging(FCM)을 활용해 사용자에게 필요한 알림을 전송합니다.
- **타이머 모달**: 웹 사이트 내에서 즉시 사용 가능한 타이머 기능을 제공합니다.
- **PWA 지원**: 프로그레시브 웹 앱으로 기기에 설치하여 네이티브 앱 같은 사용자 경험을 제공합니다.
- **반응형 UI**: 데스크톱 및 모바일 환경 모두에서 깔끔하게 보여지는 사용자 인터페이스를 갖추고 있습니다.

## 🚀 사용된 기술 (Tech Stack)

### Core
- **프레임워크**: [Next.js 14](https://nextjs.org/) (App Router 기반)
- **라이브러리**: [React 18](https://reactjs.org/)
- **언어**: [TypeScript](https://www.typescriptlang.org/)

### Styling & UI
- **스타일링**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 컴포넌트**: [Radix UI](https://www.radix-ui.com/)
- **아이콘**: [React Icons](https://react-icons.github.io/react-icons/), [Lucide React](https://lucide.dev/)
- **알림창 (Toast / Alerts)**: [Sonner](https://sonner.emilkowal.ski/), [SweetAlert2](https://sweetalert2.github.io/)

### State Management & Utilities
- **상태 관리**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **유틸리티**: `clsx`, `tailwind-merge` 등

### Backend & Database & Auth
- **데이터베이스 ORM**: [Prisma](https://www.prisma.io/)
- **데이터베이스**: MongoDB (Prisma 및 Mongoose 혼용 구조)
- **인증 및 백엔드 서비스**: [Firebase](https://firebase.google.com/) (Auth, Cloud Messaging, Functions 등)

## 📦 설치 및 실행 방법

1. **저장소를 클론합니다:**
   ```bash
   git clone https://github.com/sorlros/all-you-have-to-do-version2.git
   cd all-you-have-to-do-version2
   ```

2. **의존성 패키지를 설치합니다:**
   ```bash
   npm install
   ```

3. **환경 변수를 설정합니다:**
   프로젝트 최상단 루트에 `.env` 파일을 생성하고 데이터베이스 및 Firebase 인증 정보를 입력합니다.
   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   # 기타 필요한 파이어베이스 환경 변수 추가...
   ```

4. **Prisma를 초기화합니다:**
   ```bash
   npx prisma generate
   ```

5. **개발 서버를 실행합니다:**
   ```bash
   npm run dev
   ```

6. 브라우저에서 [http://localhost:3000](http://localhost:3000) 경로로 접속하여 확인합니다.

## 📁 주요 폴더 구조

- `/src/app`: Next.js App Router의 루트 디렉터리로 메인 페이지, 레이아웃 및 라우팅 로직을 관리합니다.
  - `/(main)`: 메인 대시보드 및 사용자 페이지
- `/src/components`: 여러 곳에서 재사용되는 UI 컴포넌트들(버튼, 모달, 스피너 등)이 위치합니다.
- `/src/libs`: 공통 유틸리티 함수와 Firebase 설정 파일 등이 위치합니다.
- `/src/actions`: 서버 액션(Server Actions)과 데이터베이스 접근 로직이 위치합니다.
- `/prisma`: Prisma 스키마 파일 및 데이터베이스 설정이 포함되어 있습니다.
