# React Component Studio

React 버전 컴포넌트 라이브러리

## 🚀 개발 시작

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm dev

# 빌드
pnpm build

# 빌드 미리보기
pnpm preview
```

## 📁 프로젝트 구조

```
react/
├── src/
│   ├── components/     # React 컴포넌트
│   ├── styles/         # 스타일 파일
│   └── App.jsx         # 메인 앱
├── public/             # 정적 파일
├── vite.config.js      # Vite 설정
└── package.json
```

## 🎨 Shared 리소스 사용

```jsx
// CSS Variables 사용
import '@shared/styles/variables.css'

// 또는 alias로 접근
import variables from '@shared/styles/variables.css'
```

## 🌐 배포

GitHub에 push하면 자동으로 배포됩니다.

- **배포 URL**: `https://[username].github.io/doakumize-kit/react/`
- **자동 배포**: GitHub Actions (`.github/workflows/deploy.yml`)
