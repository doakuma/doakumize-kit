import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 프로덕션 빌드 시 GitHub Pages 경로 사용
  const isProduction = mode === "production";

  return {
    plugins: [react()],

    // GitHub Pages 배포 경로
    base: isProduction ? "/doakumize-kit/react/" : "/",

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
