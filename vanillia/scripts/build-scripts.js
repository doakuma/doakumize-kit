/**
 * Build Scripts Tool
 * 컴포넌트 스크립트 통합 파일 생성 스크립트
 *
 * components/scripts/ 폴더의 모든 .js 파일을 읽어서
 * 하나의 resources/js/components.js 파일로 통합합니다.
 *
 * 또한 components/data/ 폴더의 데이터를 읽어서
 * core/viewer/examples.js 파일을 자동 생성합니다.
 *
 * 사용법:
 *   node scripts/build-scripts.js
 *   npm run build
 *
 * 주의:
 *   - viewer/ 폴더는 빌드 시 보존됩니다 (수동 관리 파일)
 *   - examples.js는 빌드 시 자동 생성됩니다
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

// 경로 설정
const projectRoot = path.join(__dirname, "..");
const scriptsDir = path.join(projectRoot, "components", "scripts");
const dataDir = path.join(projectRoot, "components", "data");
const configFile = path.join(
  projectRoot,
  "..",
  "shared",
  "data",
  "components-config.js"
);
const outputFile = path.join(projectRoot, "resources", "js", "components.js");
const coreOutputFile = path.join(
  projectRoot,
  "core",
  "resources",
  "scripts",
  "components.js"
);
const examplesOutputFile = path.join(
  projectRoot,
  "core",
  "viewer",
  "examples.js"
);

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
 * 컴포넌트 데이터를 Example 형식으로 변환
 */
function convertToExampleFormat(data) {
  const example = {
    title: data.title || data.name || "Component",
    description: data.description || "",
    items: [],
  };

  // variants를 items로 변환
  if (data.variants && Array.isArray(data.variants)) {
    data.variants.forEach((variant) => {
      if (variant.items && Array.isArray(variant.items)) {
        variant.items.forEach((item) => {
          example.items.push({
            label: item.label || variant.title || "Example",
            code: item.preview || item.code || "",
          });
        });
      }
    });
  }

  return example;
}

/**
 * 컴포넌트 설정 파일에서 카테고리 정보 로드
 */
function loadComponentConfig() {
  const configMap = {};

  if (!fs.existsSync(configFile)) {
    console.warn(
      "⚠ Warning: shared/data/components-config.js not found, categories will be missing"
    );
    return configMap;
  }

  try {
    let configContent = fs.readFileSync(configFile, "utf8");

    // const를 let으로 변경하여 재할당 가능하게 함
    configContent = configContent.replace(
      /const\s+COMPONENT_CATEGORIES/g,
      "COMPONENT_CATEGORIES"
    );
    configContent = configContent.replace(
      /const\s+COMPONENT_LIST/g,
      "COMPONENT_LIST"
    );

    // COMPONENT_CATEGORIES를 먼저 정의해야 COMPONENT_LIST에서 참조 가능
    const configSandbox = {
      window: {},
      COMPONENT_CATEGORIES: {
        OVERVIEW: "Overview",
        FOUNDATION: "Foundation",
        FORM_CONTROLS: "Form Controls",
        DATA_DISPLAY: "Data Display",
        FEEDBACK: "Feedback",
        NAVIGATION: "Navigation",
      },
      COMPONENT_LIST: [],
    };
    const configContext = vm.createContext(configSandbox);

    // COMPONENT_CATEGORIES와 COMPONENT_LIST 추출
    vm.runInContext(configContent, configContext);

    if (
      configSandbox.COMPONENT_LIST &&
      Array.isArray(configSandbox.COMPONENT_LIST)
    ) {
      configSandbox.COMPONENT_LIST.forEach((comp) => {
        if (comp.id && comp.category) {
          configMap[comp.id] = {
            category: comp.category,
            name: comp.name || comp.id,
            order: comp.order !== undefined ? comp.order : 999,
          };
        }
      });

      console.log(
        `  ✓ Loaded ${Object.keys(configMap).length} component configs`
      );
    } else {
      console.warn(`  ⚠ COMPONENT_LIST is not an array or missing`);
    }
  } catch (error) {
    console.warn(
      `⚠ Warning: Failed to load component config: ${error.message}`
    );
    console.error(error.stack);
  }

  return configMap;
}

/**
 * examples.js 파일 생성
 */
function buildExamples() {
  console.log("\n📝 Building examples.js...\n");
  console.log(`Input directory: ${dataDir}`);

  if (!fs.existsSync(dataDir)) {
    console.warn("⚠ Warning: components/data directory not found");
    return false;
  }

  // 컴포넌트 설정 로드 (카테고리 정보)
  const componentConfig = loadComponentConfig();

  // .data.js 파일 목록 가져오기
  const files = fs
    .readdirSync(dataDir)
    .filter((file) => file.endsWith(".data.js"))
    .sort();

  if (files.length === 0) {
    console.warn("⚠ Warning: No .data.js files found");
    return false;
  }

  console.log(`Found ${files.length} data file(s)\n`);

  // 가상 window 객체 생성
  const sandbox = {
    window: {
      ComponentData: {},
    },
  };

  const context = vm.createContext(sandbox);

  // 각 데이터 파일 실행하여 ComponentData에 등록
  const examples = {};
  let modalModals = null; // 모달 HTML 저장용

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    try {
      const content = fs.readFileSync(filePath, "utf8");
      vm.runInContext(content, context);

      // 파일명에서 컴포넌트 ID 추출 (예: button.data.js -> button)
      const componentId = file.replace(".data.js", "");
      const data = sandbox.window.ComponentData[componentId];

      if (data) {
        const example = convertToExampleFormat(data);

        // 카테고리 정보 추가
        if (componentConfig[componentId]) {
          example.category = componentConfig[componentId].category;
          example.name = componentConfig[componentId].name;
          example.order = componentConfig[componentId].order;
        }

        // 모달의 경우 modals 배열도 저장
        if (componentId === "modal" && data.modals) {
          modalModals = data.modals;
        }

        examples[componentId] = example;
        console.log(
          `  ✓ Loaded: ${componentId}${
            example.category ? ` (${example.category})` : ""
          }`
        );
      }
    } catch (error) {
      console.warn(`  ✗ Error loading ${file}: ${error.message}`);
    }
  }

  // 카테고리 정보 추가
  const categories = {
    Overview: "Overview",
    Foundation: "Foundation",
    "Form Controls": "Form Controls",
    "Data Display": "Data Display",
    Feedback: "Feedback",
    Navigation: "Navigation",
  };

  // examples.js 파일 생성
  const buildDate = new Date().toISOString().split("T")[0];
  const componentIds = Object.keys(examples).sort();

  const header = `/**
 * Component Examples
 * 
 * Generated by Doakumize Kit Build Script
 * Date: ${buildDate}
 * 
 * Components: ${componentIds.join(", ")}
 */

`;

  let code = `window.ComponentExamples = ${JSON.stringify(examples, null, 2)};

// 카테고리 정보
window.ComponentCategories = ${JSON.stringify(categories, null, 2)};`;

  // 모달 HTML 추가 (viewer에서 사용)
  if (modalModals && Array.isArray(modalModals)) {
    code += `\n\n// 모달 HTML (viewer에서 자동 추가됨)\n`;
    code += `window.ModalHTMLs = ${JSON.stringify(modalModals, null, 2)};`;
    console.log(`  ✓ Included ${modalModals.length} modal HTML(s)`);
  }

  // 출력 디렉토리 생성
  const outputDir = path.dirname(examplesOutputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}\n`);
  }

  // 파일 쓰기
  try {
    const finalContent = header + code;
    fs.writeFileSync(examplesOutputFile, finalContent, "utf8");

    const stats = fs.statSync(examplesOutputFile);
    const fileSizeKB = (stats.size / 1024).toFixed(2);

    console.log("✅ examples.js generated successfully!\n");
    console.log(`Output: ${examplesOutputFile}`);
    console.log(`Size: ${fileSizeKB} KB`);
    console.log(`Components: ${componentIds.length} component(s)\n`);

    return true;
  } catch (error) {
    console.error(`✗ Error writing examples.js: ${error.message}`);
    return false;
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

    // core/resources/scripts/에도 쓰기
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

    // examples.js 생성
    buildExamples();
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
