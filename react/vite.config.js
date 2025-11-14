import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 환경 변수 로드 (__dirname 사용)
  const env = loadEnv(mode, __dirname, "");
  const isGitHubPages = env.VITE_GITHUB_PAGES === "true";

  return {
    plugins: [react()],

    // GitHub Pages 배포 경로
    base: isGitHubPages ? "/doakumize-kit/react/" : "/",

    // Shared 리소스 접근을 위한 alias
    resolve: {
      alias: {
        "@shared": resolve(__dirname, "../shared"),
      },
    },

    // 개발 서버 설정
    server: {
      port: 5173,
      // shared 폴더를 정적 파일로 서빙
      fs: {
        allow: [".."],
      },
    },
  };
});
