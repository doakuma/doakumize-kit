#!/usr/bin/env node
/**
 * Doakumize Kit - Build Core Tool
 * resources/styles 에서 core/styles 로 필수 파일 빌드/복사
 *
 * 사용법:
 *   node scripts/build-core.js
 *   npm run build:core
 */

const fs = require("fs");
const path = require("path");

// 색상 출력 헬퍼
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * 파일 크기 포맷팅
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * 파일 복사
 */
function copyFile(source, dest) {
  const sourceAbs = path.resolve(source);
  const destAbs = path.resolve(dest);

  if (!fs.existsSync(sourceAbs)) {
    log(`⚠️  Warning: ${source} not found, skipping`, "yellow");
    return false;
  }

  // 대상 디렉토리 생성
  const destDir = path.dirname(destAbs);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(sourceAbs, destAbs);

  const size = fs.statSync(destAbs).size;
  log(
    `  ✓ ${path.basename(source)} → ${path.relative(
      process.cwd(),
      destAbs
    )} (${formatFileSize(size)})`,
    "green"
  );
  return true;
}

/**
 * 메인 함수
 */
function main() {
  log("\n🎨 Doakumize Kit - Build Core\n", "bright");
  log("resources/styles → core/styles 빌드 시작...\n", "cyan");

  const projectRoot = path.join(__dirname, "..");

  // 복사할 파일 목록
  const filesToCopy = [
    {
      source: "resources/styles/base.css",
      dest: "core/styles/base.css",
      description: "기본 스타일 (*, html, body)",
    },
    {
      source: "resources/styles/animations.css",
      dest: "core/styles/animations.css",
      description: "애니메이션 (steam, loading)",
    },
    {
      source: "resources/styles/scrollbar.css",
      dest: "core/styles/scrollbar.css",
      description: "스크롤바 스타일 (선택적)",
    },
    {
      source: "components/styles/normalize.css",
      dest: "core/styles/normalize.css",
      description: "CSS Reset",
    },
    {
      source: "components/styles/variables.css",
      dest: "core/styles/variables.css",
      description: "디자인 토큰",
    },
  ];

  let successCount = 0;
  let totalSize = 0;

  log("📋 복사 목록:\n", "bright");

  filesToCopy.forEach((file) => {
    const sourcePath = path.join(projectRoot, file.source);
    const destPath = path.join(projectRoot, file.dest);

    log(`📄 ${file.description}`, "cyan");
    if (copyFile(sourcePath, destPath)) {
      successCount++;
      if (fs.existsSync(destPath)) {
        totalSize += fs.statSync(destPath).size;
      }
    }
    console.log(""); // 빈 줄
  });

  // common.css 생성
  log("📄 common.css 생성 (Import 파일)", "cyan");
  const commonCSS = `/* ========================================
 * Core Styles - Project Use Only
 * 프로젝트 배포용 최소 스타일셋
 * 
 * Built: ${new Date().toISOString().split("T")[0]}
 * ======================================== */

/* Base Styles */
@import url(normalize.css);
@import url(variables.css);
@import url(base.css);

/* Animation & Effects */
@import url(animations.css);

/* Optional: 스크롤바 커스터마이징이 필요하면 아래 주석 해제 */
/* @import url(scrollbar.css); */

/* Component Styles */
@import url(components.css);

/* External Fonts */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");
`;

  const commonPath = path.join(projectRoot, "core/styles/common.css");
  fs.writeFileSync(commonPath, commonCSS, "utf-8");
  const commonSize = fs.statSync(commonPath).size;
  totalSize += commonSize;
  log(
    `  ✓ common.css → core/styles/common.css (${formatFileSize(commonSize)})`,
    "green"
  );
  successCount++;

  // 완료 메시지
  log("\n" + "=".repeat(50), "cyan");
  log(`\n✅ 빌드 완료!\n`, "bright");
  log(`📊 통계:`, "cyan");
  log(`   복사된 파일: ${successCount}개`, "green");
  log(`   전체 크기: ${formatFileSize(totalSize)}`, "green");
  log(`   저장 위치: core/styles/\n`, "green");

  // 다음 단계 안내
  log("📖 다음 단계:\n", "yellow");
  log("1. Component Generator에서 컴포넌트 선택", "cyan");
  log("2. Download 버튼 클릭하여 패키지 다운로드", "cyan");
  log("   → examples.js + styles/*.css 포함된 ZIP 생성됨", "cyan");
  log("\n또는:\n", "yellow");
  log("1. copy-to-project.js로 core 전체를 프로젝트에 복사", "cyan");
  log("   node scripts/copy-to-project.js ../my-project/assets\n", "green");

  log("🎉 Core 빌드 완료!\n", "bright");
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { copyFile };
