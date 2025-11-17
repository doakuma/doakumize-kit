#!/usr/bin/env node
/**
 * Doakumize Kit - Build Styles Tool
 * shared/styles 에서 core/styles 로 필수 파일 빌드/복사
 *
 * 주요 기능:
 *   - shared/styles/components/ → core/styles/items/ 자동 복사
 *   - core/styles/components.css Import 허브 자동 생성
 *   - 빌드 전 자동 정리 (Clean) - items 폴더 제외
 *   - 필수 CSS 파일 복사 (normalize, variables, base, animations, scrollbar)
 *   - common.css 통합 허브 생성
 *   - shared/images/ → core/images/ 자동 복사
 *
 * 사용법:
 *   node scripts/build-styles.js           # 기본 빌드 (자동 정리)
 *   node scripts/build-styles.js --no-clean  # 정리 없이 빌드
 *   npm run build:styles
 *
 * 주의:
 *   - items 폴더는 자동으로 보존됩니다
 *   - components.css는 items 폴더 기반으로 자동 생성됩니다
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
 * 빌드 전 정리 (Clean)
 * items 디렉토리 제외하고 모두 삭제
 */
function cleanCoreStyles(coreStylesPath) {
  if (!fs.existsSync(coreStylesPath)) {
    return;
  }

  const files = fs.readdirSync(coreStylesPath);
  let deletedCount = 0;

  files.forEach((file) => {
    const filePath = path.join(coreStylesPath, file);

    // items 디렉토리는 보존 (나중에 개별 처리)
    if (file === "items") {
      return;
    }

    // 디렉토리는 건너뛰기
    if (fs.statSync(filePath).isDirectory()) {
      return;
    }

    // 파일 삭제
    fs.unlinkSync(filePath);
    log(`  ✗ ${file} (삭제)`, "yellow");
    deletedCount++;
  });

  return deletedCount;
}

/**
 * core/images 폴더 정리 (모든 파일 삭제)
 */
function cleanCoreImages(coreImagesPath) {
  if (!fs.existsSync(coreImagesPath)) {
    return 0;
  }

  const files = fs.readdirSync(coreImagesPath);
  let deletedCount = 0;

  files.forEach((file) => {
    const filePath = path.join(coreImagesPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 디렉토리는 재귀적으로 삭제
      const subFiles = fs.readdirSync(filePath);
      subFiles.forEach((subFile) => {
        fs.unlinkSync(path.join(filePath, subFile));
        deletedCount++;
      });
      fs.rmdirSync(filePath);
    } else {
      // 파일 삭제
      fs.unlinkSync(filePath);
      deletedCount++;
    }
  });

  return deletedCount;
}

/**
 * 디렉토리 복사 (재귀)
 */
function copyDirectory(source, dest) {
  const sourceAbs = path.resolve(source);
  const destAbs = path.resolve(dest);

  if (!fs.existsSync(sourceAbs)) {
    log(`⚠️  Warning: ${source} not found, skipping`, "yellow");
    return 0;
  }

  // 대상 디렉토리 생성
  if (!fs.existsSync(destAbs)) {
    fs.mkdirSync(destAbs, { recursive: true });
  }

  const files = fs.readdirSync(sourceAbs);
  let copiedCount = 0;

  files.forEach((file) => {
    const sourcePath = path.join(sourceAbs, file);
    const destPath = path.join(destAbs, file);
    const stat = fs.statSync(sourcePath);

    if (stat.isDirectory()) {
      // 재귀적으로 디렉토리 복사
      copiedCount += copyDirectory(sourcePath, destPath);
    } else {
      // 모든 파일은 그대로 복사 (CSS도 경로 변환 불필요)
      fs.copyFileSync(sourcePath, destPath);
      const size = fs.statSync(destPath).size;
      log(`  ✓ ${file} → items/${file} (${formatFileSize(size)})`, "green");
      copiedCount++;
    }
  });

  return copiedCount;
}

/**
 * components.css 허브 생성
 */
function generateComponentsHub(coreStylesPath) {
  const itemsPath = path.join(coreStylesPath, "items");

  if (!fs.existsSync(itemsPath)) {
    log("⚠️  Warning: items 폴더가 없습니다", "yellow");
    return false;
  }

  const files = fs
    .readdirSync(itemsPath)
    .filter((file) => file.endsWith(".css"));

  let hubContent = `/* ========================================
 * Components Hub - Auto-generated
 * Import manager for component styles
 * 
 * Built: ${new Date().toISOString().split("T")[0]}
 * Components: ${files.length}
 * ======================================== */

`;

  files.forEach((file) => {
    hubContent += `@import url(items/${file});\n`;
  });

  hubContent += `
/* ========================================
 * 💡 커스터마이징 방법
 * ========================================
 * 
 * 필요없는 컴포넌트는 해당 줄을 주석 처리하세요.
 * 
 * 예시: modal을 사용하지 않는 경우
 *   - 해당 @import 줄 앞에 주석 추가
 *   - 또는 특정 줄만 선택하여 나머지 주석 처리
 * 
 * 용량 최적화:
 *   - 사용하지 않는 컴포넌트를 주석 처리하면
 *   - 해당 CSS 파일이 로드되지 않아 용량 절감됩니다
 */
`;

  const hubPath = path.join(coreStylesPath, "components.css");
  fs.writeFileSync(hubPath, hubContent, "utf-8");

  const size = fs.statSync(hubPath).size;
  log(
    `  ✓ components.css (허브) → core/styles/components.css (${formatFileSize(
      size
    )})`,
    "green"
  );
  log(`     ${files.length}개 컴포넌트 import`, "cyan");

  return true;
}

/**
 * 메인 함수
 */
function main() {
  log("\n🎨 Doakumize Kit - Build Styles\n", "bright");
  log("shared/styles → core/styles 빌드 시작...\n", "cyan");

  const projectRoot = path.join(__dirname, "..");
  const coreStylesPath = path.join(projectRoot, "core/styles");

  // CLI 옵션 확인
  const args = process.argv.slice(2);
  const shouldClean = !args.includes("--no-clean");

  // 🧹 빌드 전 정리
  if (shouldClean) {
    log("🧹 기존 파일 정리 중...\n", "bright");

    // styles 폴더 정리
    const deletedStylesCount = cleanCoreStyles(coreStylesPath);

    // images 폴더 정리
    const coreImagesPath = path.join(projectRoot, "core/images");
    const deletedImagesCount = cleanCoreImages(coreImagesPath);

    const totalDeleted = deletedStylesCount + deletedImagesCount;
    if (totalDeleted > 0) {
      log(
        `\n  정리 완료: ${totalDeleted}개 파일 삭제됨 (styles: ${deletedStylesCount}, images: ${deletedImagesCount})\n`,
        "green"
      );
    } else {
      log(`\n  정리할 파일 없음\n`, "green");
    }
  } else {
    log("⊙ 정리 건너뜀 (--no-clean)\n", "yellow");
  }

  // 복사할 파일 목록 (shared/styles/base/ 기준)
  const filesToCopy = [
    {
      source: "../shared/styles/base/normalize.css",
      dest: "core/styles/normalize.css",
      description: "CSS Reset",
    },
    {
      source: "../shared/styles/base/variables.css",
      dest: "core/styles/variables.css",
      description: "디자인 토큰 (색상, 타이포그래피, 간격)",
    },
    {
      source: "../shared/styles/base/base.css",
      dest: "core/styles/base.css",
      description: "기본 스타일 (*, html, body)",
    },
    {
      source: "../shared/styles/base/animations.css",
      dest: "core/styles/animations.css",
      description: "애니메이션 (steam, loading)",
    },
    {
      source: "../shared/styles/base/scrollbar.css",
      dest: "core/styles/scrollbar.css",
      description: "스크롤바 스타일 (선택적)",
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

  // items 폴더 복사 (shared/styles/components/ → core/styles/items/)
  log("\n📄 컴포넌트 items 복사 중...", "cyan");
  const itemsSource = path.join(
    projectRoot,
    "..",
    "shared",
    "styles",
    "components"
  );
  const itemsDest = path.join(projectRoot, "core/styles/items");
  const itemsCount = copyDirectory(itemsSource, itemsDest);

  if (itemsCount > 0) {
    log(`\n  ✓ items 폴더 복사 완료: ${itemsCount}개 파일\n`, "green");
    totalSize += fs.readdirSync(itemsDest).reduce((sum, file) => {
      const filePath = path.join(itemsDest, file);
      return (
        sum + (fs.statSync(filePath).isFile() ? fs.statSync(filePath).size : 0)
      );
    }, 0);
  }

  // components.css 허브 생성
  log("📄 components.css 허브 생성 (Auto-generated)", "cyan");
  const hubGenerated = generateComponentsHub(coreStylesPath);
  if (hubGenerated) {
    successCount++;
    const hubPath = path.join(coreStylesPath, "components.css");
    totalSize += fs.statSync(hubPath).size;
  }

  // common.css 생성
  log("\n📄 common.css 생성 (Import 파일)", "cyan");
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

  // 이미지 폴더 복사 (shared/images/ → core/images/)
  log("\n📄 이미지 파일 복사 중...", "cyan");
  const imagesSource = path.join(projectRoot, "..", "shared", "images");
  const imagesDest = path.join(projectRoot, "core/images");
  const imagesCount = copyDirectory(imagesSource, imagesDest);

  if (imagesCount > 0) {
    log(`\n  ✓ images 폴더 복사 완료: ${imagesCount}개 파일\n`, "green");
    // 이미지 크기 계산 (재귀적으로)
    const calculateDirSize = (dir) => {
      let size = 0;
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          size += calculateDirSize(fullPath);
        } else {
          size += fs.statSync(fullPath).size;
        }
      }
      return size;
    };
    const imagesSize = calculateDirSize(imagesDest);
    totalSize += imagesSize;
  }

  // 완료 메시지
  log("\n" + "=".repeat(50), "cyan");
  log(`\n✅ 빌드 완료!\n`, "bright");
  log(`📊 통계:`, "cyan");
  log(`   복사된 파일: ${successCount}개`, "green");
  log(`   전체 크기: ${formatFileSize(totalSize)}`, "green");
  log(`   저장 위치: core/styles/, core/images/\n`, "green");

  // 다음 단계 안내
  log("📖 다음 단계:\n", "yellow");
  log("1. Component Generator에서 컴포넌트 선택", "cyan");
  log("2. Download 버튼 클릭하여 패키지 다운로드", "cyan");
  log("   → examples.js + styles/*.css 포함된 ZIP 생성됨", "cyan");
  log("\n또는:\n", "yellow");
  log("1. copy-to-project.js로 core 전체를 프로젝트에 복사", "cyan");
  log("   node scripts/copy-to-project.js ../my-project/assets\n", "green");

  log("💡 옵션:\n", "yellow");
  log("  --no-clean    기존 파일 정리 없이 빌드", "cyan");
  log("                (components.css 보존하고 싶을 때 사용)\n", "cyan");

  log("🎉 Styles 빌드 완료!\n", "bright");
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { copyFile };
