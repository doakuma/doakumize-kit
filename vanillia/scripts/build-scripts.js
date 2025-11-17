/**
 * Build Scripts Tool
 * 컴포넌트 스크립트 통합 파일 생성 스크립트
 *
 * components/scripts/ 폴더의 모든 .js 파일을 읽어서
 * 하나의 resources/js/components.js 파일로 통합합니다.
 *
 * 사용법:
 *   node scripts/build-scripts.js
 *   npm run build
 */

const fs = require("fs");
const path = require("path");

// 경로 설정
const projectRoot = path.join(__dirname, "..");
const scriptsDir = path.join(projectRoot, "components", "scripts");
const outputFile = path.join(projectRoot, "resources", "js", "components.js");
const coreOutputFile = path.join(projectRoot, "core", "components.js");

/**
 * IIFE 래퍼 제거
 * (function () { "use strict"; ... })(); 형태에서 함수 내용만 추출
 * 주석(JSDoc)은 유지합니다.
 */
function removeIIFEWrapper(content) {
  let result = content.trim();
  const lines = result.split("\n");

  // IIFE 시작 라인 찾기 (주석 이후)
  let iifeStartIndex = -1;
  let iifeEndIndex = -1;

  // (function () { 패턴 찾기
  for (let i = 0; i < lines.length; i++) {
    const trimmedLine = lines[i].trim();
    if (/^\(function\s*\(\)\s*\{/.test(trimmedLine)) {
      iifeStartIndex = i;
      break;
    }
  }

  // })(); 패턴 찾기 (끝에서부터)
  for (let i = lines.length - 1; i >= 0; i--) {
    const trimmedLine = lines[i].trim();
    if (/^\}\s*\)\s*\(\s*\)\s*;$/.test(trimmedLine)) {
      iifeEndIndex = i;
      break;
    }
  }

  // IIFE 래퍼가 발견된 경우 제거
  if (iifeStartIndex >= 0 && iifeEndIndex >= iifeStartIndex) {
    // IIFE 시작 라인 제거
    lines.splice(iifeStartIndex, 1);
    iifeEndIndex--; // 인덱스 조정

    // "use strict"; 줄이 있으면 제거
    if (
      iifeStartIndex < lines.length &&
      /^\s*["']use\s+strict["']\s*;/.test(lines[iifeStartIndex].trim())
    ) {
      lines.splice(iifeStartIndex, 1);
      iifeEndIndex--; // 인덱스 조정
    }

    // IIFE 끝 라인 제거
    if (iifeEndIndex >= 0 && iifeEndIndex < lines.length) {
      lines.splice(iifeEndIndex, 1);
    }

    // 빈 줄 정리 (IIFE 제거 후 생성된 빈 줄)
    // 시작 부분 빈 줄 정리
    while (
      iifeStartIndex < lines.length &&
      lines[iifeStartIndex].trim() === ""
    ) {
      lines.splice(iifeStartIndex, 1);
    }
    // 끝 부분 빈 줄 정리
    while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
      lines.pop();
    }

    result = lines.join("\n");
  }

  // 앞뒤 공백 정리
  result = result.trim();

  // 빈 줄 정리 (연속된 빈 줄을 최대 2개로)
  result = result.replace(/\n{3,}/g, "\n\n");

  return result;
}

/**
 * 파일 내용 읽기 및 전처리
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const fileName = path.basename(filePath);

    console.log(`  ✓ Processing: ${fileName}`);

    // IIFE 래퍼 제거
    // 주석(JSDoc)은 유지하고 IIFE 래퍼만 제거
    let processedContent = removeIIFEWrapper(content);

    // 파일별 주석 추가
    const separator = `\n\n// ========================================\n// ${fileName}\n// ========================================\n\n`;

    return {
      fileName,
      content: separator + processedContent,
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return null;
  }
}

/**
 * 모든 스크립트 파일 읽기 및 통합
 */
function buildComponents() {
  console.log("\n🚀 Building components.js...\n");
  console.log(`Input directory: ${scriptsDir}`);
  console.log(`Output file: ${outputFile}\n`);

  // 입력 디렉토리 확인
  if (!fs.existsSync(scriptsDir)) {
    console.error(`✗ Error: Directory not found: ${scriptsDir}`);
    process.exit(1);
  }

  // .js 파일 목록 가져오기
  const files = fs
    .readdirSync(scriptsDir)
    .filter((file) => file.endsWith(".js") && file !== "scripts-init.js") // scripts-init.js는 제외
    .sort(); // 알파벳 순으로 정렬 (의존성 고려 시 수동 조정 필요)

  if (files.length === 0) {
    console.warn("⚠ Warning: No JavaScript files found in scripts directory");
    return;
  }

  console.log(`Found ${files.length} file(s):`);
  files.forEach((file) => console.log(`  - ${file}`));
  console.log("");

  // 각 파일 처리
  const processedFiles = [];
  for (const file of files) {
    const filePath = path.join(scriptsDir, file);
    const processed = processFile(filePath);
    if (processed) {
      processedFiles.push(processed);
    }
  }

  if (processedFiles.length === 0) {
    console.error("✗ Error: No files were processed successfully");
    process.exit(1);
  }

  // 헤더 주석 생성
  const buildDate = new Date().toISOString().split("T")[0];
  const buildTime = new Date().toLocaleTimeString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const header = `/**
 * Vanilla Components Scripts Bundle
 * 컴포넌트 스크립트 통합 파일 (자동 생성)
 *
 * 이 파일은 scripts/build-scripts.js에 의해 자동으로 생성되었습니다.
 * 수동으로 수정하지 마세요. 수정사항은 다음 빌드 시 덮어씁니다.
 *
 * 생성일: ${buildDate} ${buildTime} KST
 * 통합 파일 수: ${processedFiles.length}
 * 
 * 통합된 컴포넌트:
${processedFiles.map((f) => ` *   - ${f.fileName}`).join("\n")}
 */

`;

  // 네임스페이스 초기화 코드 추가
  const namespaceInit = `// 전역 네임스페이스 초기화
window.VanillaComponents = window.VanillaComponents || {};

`;

  // 모든 파일 내용 합치기
  const allContent = processedFiles.map((f) => f.content).join("\n\n");

  // initAll 메서드 생성 (모든 컴포넌트 초기화 함수 자동 감지)
  const initFunctions = [];
  processedFiles.forEach((file) => {
    // 파일 내용에서 window.VanillaComponents.initXXX 패턴 찾기
    const initMatches = file.content.match(
      /window\.VanillaComponents\.init(\w+)\s*=/g
    );
    if (initMatches) {
      initMatches.forEach((match) => {
        const funcName = match.match(/init(\w+)/)[1];
        const camelCaseName =
          funcName.charAt(0).toLowerCase() + funcName.slice(1);
        initFunctions.push({
          original: `init${funcName}`,
          camelCase: `init${camelCaseName}`,
        });
      });
    }
  });

  // 중복 제거 및 정렬
  const uniqueInitFunctions = Array.from(
    new Map(initFunctions.map((f) => [f.original, f])).values()
  ).sort((a, b) => a.original.localeCompare(b.original));

  // initAll 메서드 생성
  const initAllMethod = `
// ========================================
// initAll - 모든 컴포넌트 초기화
// ========================================

/**
 * 모든 컴포넌트 초기화
 * DOM에 있는 모든 컴포넌트를 자동으로 초기화합니다.
 */
function initAll() {
  console.log("[VanillaComponents] Initializing all components...");
  
  // 각 컴포넌트 초기화 함수 호출
${uniqueInitFunctions
  .map(
    (f) => `  if (window.VanillaComponents.${f.original}) {
    window.VanillaComponents.${f.original}();
  }`
  )
  .join("\n")}
  
  console.log("[VanillaComponents] All components initialized");
}

// 전역 네임스페이스에 등록
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.initAll = initAll;
`;

  // 최종 파일 내용 생성
  const finalContent = header + namespaceInit + allContent + initAllMethod;

  // 출력 디렉토리 생성 (없으면)
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}\n`);
  }

  // 파일 쓰기
  try {
    // resources/js/에 쓰기
    fs.writeFileSync(outputFile, finalContent, "utf8");

    // core/에도 쓰기
    const coreDir = path.dirname(coreOutputFile);
    if (!fs.existsSync(coreDir)) {
      fs.mkdirSync(coreDir, { recursive: true });
    }
    fs.writeFileSync(coreOutputFile, finalContent, "utf8");

    // 파일 크기 확인
    const stats = fs.statSync(outputFile);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log("✅ Build completed successfully!\n");
    console.log(`Output 1: ${outputFile}`);
    console.log(`Output 2: ${coreOutputFile}`);
    console.log(`Size: ${fileSizeKB} KB`);
    console.log(`Files: ${processedFiles.length} file(s) bundled\n`);
  } catch (error) {
    console.error(`✗ Error writing output file: ${error.message}`);
    process.exit(1);
  }
}

// 스크립트 실행
if (require.main === module) {
  buildComponents();
}

module.exports = { buildComponents, removeIIFEWrapper };

