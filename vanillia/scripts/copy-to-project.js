#!/usr/bin/env node
/**
 * Doakumize Kit - Copy to Project Tool
 * core 폴더의 파일들을 실제 프로젝트로 복사하는 CLI 도구
 *
 * 사용법:
 *   node scripts/copy-to-project.js <destination>
 *   node scripts/copy-to-project.js ../my-project/assets
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
 * 디렉토리를 재귀적으로 복사
 */
function copyDirectory(src, dest) {
  // 대상 디렉토리 생성
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // 재귀적으로 디렉토리 복사
      copyDirectory(srcPath, destPath);
    } else {
      // 파일 복사
      fs.copyFileSync(srcPath, destPath);
    }
  }
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
 * 디렉토리 크기 계산
 */
function getDirectorySize(dir) {
  let size = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      size += getDirectorySize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }

  return size;
}

/**
 * 파일 개수 세기
 */
function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }

  return count;
}

/**
 * 메인 함수
 */
function main() {
  log("\n🎨 Doakumize Kit - Copy to Project\n", "bright");

  // 인자 확인
  const args = process.argv.slice(2);
  if (args.length === 0) {
    log("❌ Error: Destination path required", "red");
    log("\n사용법:", "yellow");
    log("  node scripts/copy-to-project.js <destination>\n", "cyan");
    log("예시:", "yellow");
    log("  node scripts/copy-to-project.js ../my-project/assets", "cyan");
    log(
      "  node scripts/copy-to-project.js C:\\Projects\\web-app\\public\\lib\n",
      "cyan"
    );
    process.exit(1);
  }

  const destination = args[0];
  const projectRoot = path.join(__dirname, "..");
  const coreDir = path.join(projectRoot, "core");

  // core 디렉토리 존재 확인
  if (!fs.existsSync(coreDir)) {
    log("❌ Error: core directory not found", "red");
    log(`Expected: ${coreDir}\n`, "yellow");
    process.exit(1);
  }

  // 대상 경로 처리
  const destPath = path.resolve(destination);

  log(`📂 Source: ${coreDir}`, "blue");
  log(`📂 Destination: ${destPath}\n`, "blue");

  // 대상 디렉토리 존재 확인
  if (fs.existsSync(destPath)) {
    log("⚠️  Warning: Destination already exists", "yellow");
    log("기존 파일들을 덮어씁니다...\n", "yellow");
  }

  try {
    // 파일 정보 수집
    const fileCount = countFiles(coreDir);
    const totalSize = getDirectorySize(coreDir);

    log("📊 복사할 파일:", "cyan");
    log(`   파일 수: ${fileCount}개`, "cyan");
    log(`   전체 크기: ${formatFileSize(totalSize)}\n`, "cyan");

    // 복사 시작
    log("🚀 복사 시작...\n", "green");
    const startTime = Date.now();

    copyDirectory(coreDir, destPath);

    const elapsed = Date.now() - startTime;

    // 성공 메시지
    log("✅ 복사 완료!\n", "bright");
    log(`⏱️  소요 시간: ${elapsed}ms`, "green");
    log(`📁 저장 위치: ${destPath}\n`, "green");

    // 사용 가이드
    log("📖 다음 단계:", "yellow");
    log("\n1. HTML에 스타일 추가:", "bright");
    log(
      '   <link rel="stylesheet" href="path/to/styles/normalize.css">',
      "cyan"
    );
    log(
      '   <link rel="stylesheet" href="path/to/styles/variables.css">',
      "cyan"
    );
    log('   <link rel="stylesheet" href="path/to/styles/common.css">', "cyan");
    log(
      '   <link rel="stylesheet" href="path/to/styles/components.css">',
      "cyan"
    );

    log("\n2. 스크립트 추가:", "bright");
    log('   <script src="path/to/components.js"></script>', "cyan");

    log("\n3. 컴포넌트 초기화:", "bright");
    log("   <script>", "cyan");
    log("     window.VanillaComponents.initAll();", "cyan");
    log("   </script>\n", "cyan");

    log("📚 자세한 사용법은 core/README.md를 참고하세요!\n", "blue");
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, "red");
    log("스택 트레이스:", "yellow");
    console.error(error);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { copyDirectory, countFiles, getDirectorySize };
