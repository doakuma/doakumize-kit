#!/usr/bin/env node
/**
 * Doakumize Kit - Clean Core Tool
 * core/ 폴더 내의 모든 파일을 삭제하는 스크립트
 *
 * 사용법:
 *   node scripts/clean-core.js           # 기본: viewer/와 문서 파일 보존
 *   node scripts/clean-core.js --all     # 모든 파일 삭제 (viewer/ 포함)
 *   npm run clean:core
 *
 * 주의:
 *   - 기본 모드: viewer/ 폴더와 README.md, FOLDER_STRUCTURE.md 보존 (단, viewer/examples.js는 삭제)
 *   - --all 옵션: core/ 폴더 내의 모든 파일과 폴더 삭제
 *   - 삭제된 파일은 복구할 수 없으니 주의!
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
 * 디렉토리 크기 계산 (재귀)
 */
function getDirectorySize(dir) {
  let size = 0;
  if (!fs.existsSync(dir)) {
    return 0;
  }

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
 * 디렉토리 삭제 (재귀)
 */
function removeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return { files: 0, size: 0 };
  }

  let filesCount = 0;
  let totalSize = 0;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const result = removeDirectory(fullPath);
      filesCount += result.files;
      totalSize += result.size;
      fs.rmdirSync(fullPath);
      log(`  ✗ 폴더 삭제: ${path.relative(dir, fullPath)}`, "yellow");
    } else {
      const size = fs.statSync(fullPath).size;
      fs.unlinkSync(fullPath);
      filesCount++;
      totalSize += size;
      log(`  ✗ 파일 삭제: ${entry.name} (${formatFileSize(size)})`, "yellow");
    }
  }

  return { files: filesCount, size: totalSize };
}

/**
 * core/ 폴더 정리 (기본 모드: viewer/와 문서 파일 보존, 단 viewer/examples.js는 삭제)
 */
function cleanCoreDefault(corePath) {
  if (!fs.existsSync(corePath)) {
    log("⚠️  Warning: core 폴더가 없습니다", "yellow");
    return { files: 0, size: 0 };
  }

  const preservedItems = ["viewer", "README.md", "FOLDER_STRUCTURE.md"];
  let totalFiles = 0;
  let totalSize = 0;

  const entries = fs.readdirSync(corePath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(corePath, entry.name);

    // viewer/ 폴더는 특별 처리 (examples.js만 삭제)
    if (entry.name === "viewer" && entry.isDirectory()) {
      log(`\n📁 viewer/ 폴더 처리 중...`, "bright");
      const viewerPath = path.join(corePath, "viewer");
      const examplesJsPath = path.join(viewerPath, "examples.js");
      
      // viewer/examples.js 삭제 (Generator로 생성되는 빌드 결과물)
      if (fs.existsSync(examplesJsPath)) {
        const size = fs.statSync(examplesJsPath).size;
        fs.unlinkSync(examplesJsPath);
        totalFiles++;
        totalSize += size;
        log(`  ✗ 파일 삭제: viewer/examples.js (${formatFileSize(size)})`, "yellow");
      } else {
        log(`  ⊙ viewer/examples.js 없음 (스킵)`, "cyan");
      }
      
      log(`  ⊙ 보존: viewer/ 폴더 (나머지 파일)`, "cyan");
      continue;
    }

    // 보존할 항목은 건너뛰기
    if (preservedItems.includes(entry.name)) {
      log(`  ⊙ 보존: ${entry.name}`, "cyan");
      continue;
    }

    if (entry.isDirectory()) {
      log(`\n📁 폴더 삭제: ${entry.name}/`, "bright");
      const result = removeDirectory(entryPath);
      totalFiles += result.files;
      totalSize += result.size;
      fs.rmdirSync(entryPath);
    } else {
      const size = fs.statSync(entryPath).size;
      fs.unlinkSync(entryPath);
      totalFiles++;
      totalSize += size;
      log(`  ✗ 파일 삭제: ${entry.name} (${formatFileSize(size)})`, "yellow");
    }
  }

  return { files: totalFiles, size: totalSize };
}

/**
 * core/ 폴더 완전 정리 (--all 옵션: 모든 파일 삭제)
 */
function cleanCoreAll(corePath) {
  if (!fs.existsSync(corePath)) {
    log("⚠️  Warning: core 폴더가 없습니다", "yellow");
    return { files: 0, size: 0 };
  }

  log("\n🧹 core/ 폴더 내 모든 파일 삭제 중...\n", "bright");

  const result = removeDirectory(corePath);

  // core 폴더 자체는 삭제하지 않음 (빈 폴더로 남김)
  // 필요하면 여기서 fs.rmdirSync(corePath) 추가 가능

  return result;
}

/**
 * 메인 함수
 */
function main() {
  log("\n🧹 Doakumize Kit - Clean Core\n", "bright");

  const projectRoot = path.join(__dirname, "..");
  const corePath = path.join(projectRoot, "core");

  // core 폴더 존재 확인
  if (!fs.existsSync(corePath)) {
    log("❌ Error: core 폴더가 없습니다", "red");
    log(`Expected: ${corePath}\n`, "yellow");
    process.exit(1);
  }

  // CLI 옵션 확인
  const args = process.argv.slice(2);
  const cleanAll = args.includes("--all");

  // 삭제 전 확인 메시지
  const mode = cleanAll ? "완전 삭제 (모든 파일)" : "기본 모드 (viewer/와 문서 파일 보존, viewer/examples.js 삭제)";
  log(`📋 정리 모드: ${mode}\n`, "cyan");

  if (cleanAll) {
    log("⚠️  경고: core/ 폴더 내의 모든 파일이 삭제됩니다!", "red");
    log("⚠️  viewer/ 폴더와 문서 파일도 함께 삭제됩니다!\n", "red");
  } else {
    log("💡 보존 항목:", "cyan");
    log("   - viewer/ 폴더 (단, examples.js는 삭제됨)", "cyan");
    log("   - README.md", "cyan");
    log("   - FOLDER_STRUCTURE.md\n", "cyan");
  }

  // 삭제 전 통계
  const beforeSize = getDirectorySize(corePath);
  log(`📊 삭제 전 크기: ${formatFileSize(beforeSize)}\n`, "cyan");

  // 삭제 실행
  let result;
  if (cleanAll) {
    result = cleanCoreAll(corePath);
  } else {
    log("🧹 core/ 폴더 정리 중...\n", "bright");
    result = cleanCoreDefault(corePath);
  }

  // 완료 메시지
  log("\n" + "=".repeat(50), "cyan");
  log(`\n✅ 정리 완료!\n`, "bright");
  log(`📊 통계:`, "cyan");
  log(`   삭제된 파일: ${result.files}개`, "green");
  log(`   삭제된 크기: ${formatFileSize(result.size)}`, "green");

  if (!cleanAll) {
    log(`\n💡 보존된 항목:`, "cyan");
    log(`   - viewer/ 폴더 (examples.js 제외)`, "green");
    log(`   - README.md`, "green");
    log(`   - FOLDER_STRUCTURE.md`, "green");
  }

  log(`\n📁 core/ 폴더 위치: ${corePath}\n`, "green");

  // 다음 단계 안내
  if (result.files > 0) {
    log("📖 다음 단계:\n", "yellow");
    log("1. 빌드 실행:", "bright");
    log("   npm run build:styles && npm run build", "cyan");
    log("   또는", "bright");
    log("   npm run build\n", "cyan");
  } else {
    log("💡 정리할 파일이 없었습니다.\n", "yellow");
  }

  log("🎉 Clean 완료!\n", "bright");
}

// 스크립트 실행
if (require.main === module) {
  main();
}

module.exports = { cleanCoreDefault, cleanCoreAll };

