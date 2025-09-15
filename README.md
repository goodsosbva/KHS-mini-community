# KHS Mini Community

> Next.js 15와 Drizzle ORM을 활용한 현대적인 커뮤니티 플랫폼

## 📋 프로젝트 개요

KHS Mini Community는 사용자들이 자유롭게 게시글을 작성하고 댓글을 달 수 있는 소규모 커뮤니티 플랫폼입니다. Next.js 15의 최신 기능과 Drizzle ORM을 활용하여 구축되었습니다.

## 🏗️ 기술 스택

### Frontend

- **Next.js 15.5.0** - React 기반 풀스택 프레임워크
- **React 19.1.0** - UI 라이브러리
- **TypeScript 5** - 타입 안전성
- **Tailwind CSS 4** - 유틸리티 기반 CSS 프레임워크
- **Radix UI** - 접근성이 뛰어난 UI 컴포넌트
- **Lucide React** - 아이콘 라이브러리

### Backend & Database

- **Next.js API Routes** - 서버리스 API
- **Drizzle ORM** - 타입 안전한 ORM
- **Turso (LibSQL)** - SQLite 기반 클라우드 데이터베이스
- **NextAuth.js** - 인증 시스템

### 개발 도구

- **ESLint** - 코드 품질 관리
- **Drizzle Kit** - 데이터베이스 마이그레이션
- **SWR** - 데이터 페칭 및 캐싱

## 🗂️ 프로젝트 구조

```
khs-mini-community/
├── app/                          # Next.js App Router
│   ├── (application)/           # 인증된 사용자 영역
│   │   ├── layout.tsx          # 애플리케이션 레이아웃
│   │   ├── page.tsx            # 메인 페이지
│   │   └── post-write/         # 게시글 작성 페이지
│   ├── (signing)/              # 인증 관련 페이지
│   │   └── layout.tsx          # 인증 레이아웃
│   ├── api/                    # API 라우트
│   │   ├── auth/               # NextAuth 설정
│   │   ├── posts/              # 게시글 API
│   │   └── sign-up/            # 회원가입 API
│   ├── posts/[postId]/         # 게시글 상세 페이지
│   ├── sign-in/                # 로그인 페이지
│   └── sign-up/                # 회원가입 페이지
├── components/                  # 재사용 가능한 컴포넌트
│   ├── base/                   # 기본 컴포넌트
│   ├── lists/                  # 목록 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   └── ui/                     # UI 컴포넌트
├── database/                   # 데이터베이스 관련
│   ├── schema.ts              # 데이터베이스 스키마
│   ├── db.ts                  # 데이터베이스 연결
│   └── migrations/            # 마이그레이션 파일
├── hooks/                      # 커스텀 훅
├── lib/                        # 유틸리티 및 설정
└── middleware.ts               # Next.js 미들웨어
```

## 🗄️ 데이터베이스 스키마

### 테이블 구조

#### 1. User Table

```sql
user (
  id: text (PK)           -- nanoid(21)로 생성되는 고유 ID
  email: text (UNIQUE)    -- 사용자 이메일
  password: text          -- 사용자 비밀번호
  name: text              -- 사용자 이름
  createdAt: text         -- 생성일시
  updatedAt: text         -- 수정일시
)
```

#### 2. User Post Table

```sql
user_post (
  id: text (PK)           -- nanoid(21)로 생성되는 고유 ID
  userId: text (FK)       -- 작성자 ID (user.id 참조)
  title: text             -- 게시글 제목
  content: text           -- 게시글 내용
  createdAt: text         -- 생성일시
  updatedAt: text         -- 수정일시
)
```

#### 3. User Post Comment Table

```sql
user_post_comment (
  id: text (PK)           -- nanoid(21)로 생성되는 고유 ID
  userId: text (FK)       -- 댓글 작성자 ID (user.id 참조)
  postId: text (FK)       -- 게시글 ID (user_post.id 참조)
  content: text           -- 댓글 내용
  createdAt: text         -- 생성일시
  updatedAt: text         -- 수정일시
)
```

### 관계 설정

- **User → Posts**: 1:N (한 사용자가 여러 게시글 작성)
- **User → Comments**: 1:N (한 사용자가 여러 댓글 작성)
- **Post → Comments**: 1:N (한 게시글에 여러 댓글)
- **Cascade Delete**: 사용자 삭제 시 관련 게시글과 댓글도 함께 삭제

## 🔐 인증 시스템

### NextAuth.js 설정

- **Provider**: Credentials Provider (이메일/비밀번호)
- **Session Strategy**: JWT
- **Session Duration**: 7일
- **Custom Pages**: 로그인 페이지 커스터마이징

### 미들웨어 보호

- `/sign-in`, `/sign-up`: 인증된 사용자는 메인 페이지로 리다이렉트
- `/post-write`: 인증되지 않은 사용자는 로그인 페이지로 리다이렉트

## 🎨 UI/UX 설계

### 디자인 시스템

- **색상**: 그라데이션을 활용한 모던한 디자인
- **타이포그래피**: Geist 폰트 사용
- **컴포넌트**: Radix UI 기반 접근성 고려
- **반응형**: 모바일 우선 반응형 디자인

### 주요 페이지

1. **메인 페이지**: 게시글 목록과 새 글 작성 버튼
2. **게시글 작성**: 제목과 내용을 입력하는 폼
3. **게시글 상세**: 게시글 내용과 댓글 목록
4. **로그인/회원가입**: 인증 폼

## 🔄 데이터 관리

### SWR을 활용한 상태 관리

- **자동 재검증**: 포커스 시 데이터 자동 갱신
- **캐싱**: 효율적인 데이터 캐싱
- **에러 처리**: 통합된 에러 처리

### API 설계

- **RESTful API**: 표준 REST API 설계
- **타입 안전성**: TypeScript로 API 응답 타입 정의
- **에러 처리**: 일관된 에러 응답 형식

## 🚀 배포 및 환경 설정

### 환경 변수

```env
# 데이터베이스
TURSO_CONNECTION_URL=your_turso_url
TURSO_AUTH_TOKEN=your_turso_token

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_domain_url
```

### Vercel 배포

- **플랫폼**: Vercel
- **빌드 도구**: Next.js 기본 Webpack (Turbopack 호환성 이슈로 비활성화)
- **데이터베이스**: Turso (LibSQL)

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/khs-mini-community.git
cd khs-mini-community
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일에 필요한 환경 변수 입력
```

### 4. 데이터베이스 마이그레이션

```bash
npm run db:migrate
```

### 5. 개발 서버 실행

```bash
npm run dev
```

### 6. 프로덕션 빌드

```bash
npm run build
npm start
```

## 🛠️ 개발 스크립트

```json
{
  "dev": "next dev", // 개발 서버 실행
  "build": "next build", // 프로덕션 빌드
  "start": "next start", // 프로덕션 서버 실행
  "lint": "eslint" // 코드 린팅
}
```

## 🔧 주요 기능

### ✅ 구현된 기능

- [x] 사용자 회원가입/로그인
- [x] 게시글 작성/조회
- [x] 댓글 작성/조회
- [x] 반응형 UI
- [x] 인증 미들웨어
- [x] 데이터베이스 마이그레이션
- [x] 타입 안전성

### 🚧 향후 개선 사항

- [ ] 게시글 수정/삭제
- [ ] 댓글 수정/삭제
- [ ] 사용자 프로필
- [ ] 이미지 업로드
- [ ] 검색 기능
- [ ] 페이지네이션
- [ ] 실시간 알림

## 📝 라이선스

MIT License

## 👥 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**황제님의 KHS Mini Community 프로젝트** 🎉
