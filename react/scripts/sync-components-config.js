import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import process from "process";

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Components Config 자동 동기화 스크립트
 * shared/data/components-config.js를 읽어서 React용 ES Module 형태로 변환
 */

// 경로 설정
const sharedPath = join(
  __dirname,
  "..",
  "..",
  "shared",
  "data",
  "components-config.js"
);
const reactPath = join(__dirname, "..", "src", "data", "components-config.js");

try {
  // 1. shared 파일 읽기
  console.log(`📖 Reading ${sharedPath}...`);
  const sharedContent = fs.readFileSync(sharedPath, "utf8");

  // 2. ES Module 형태로 변환
  let reactContent = sharedContent;

  // 2-1. 헤더 주석 추가
  reactContent = `/**
 * Components Configuration (React용)
 * shared/data/components-config.js를 ES Module 형태로 재export
 *
 * ⚠️ 이 파일은 자동 생성됩니다. 수동으로 수정하지 마세요!
 * 원본: shared/data/components-config.js
 * 생성 스크립트: scripts/sync-components-config.js
 */

${reactContent}`;

  // 2-2. const를 export const로 변환 (COMPONENT_CATEGORIES, COMPONENT_LIST)
  reactContent = reactContent.replace(
    /^const (COMPONENT_CATEGORIES|COMPONENT_LIST) =/gm,
    "export const $1 ="
  );

  // 2-3. function을 export function으로 변환
  reactContent = reactContent.replace(
    /^function (normalizeEnabled|getEnabledComponents|getComponentConfig|getComponentsByCategory|getComponentsInCategory|getAllCategories|isComponentEnabled)\(/gm,
    "export function $1("
  );

  // 2-4. 기본값을 "react"로 변경
  reactContent = reactContent.replace(
    /framework = "vanilla"/g,
    'framework = "react"'
  );

  // 2-5. 브라우저 전용 코드 제거
  // window.ComponentConfig 블록 제거 (주석 포함)
  reactContent = reactContent.replace(
    /\/\/ 전역 노출 \(Vanilla 호환성 유지\)\s*\n\s*window\.ComponentConfig = \{[\s\S]*?\};\s*/g,
    ""
  );

  // console.log 제거 (정확한 패턴 매칭)
  // 첫 번째 console.log: 한 줄짜리
  reactContent = reactContent.replace(
    /console\.log\("\[ComponentConfig\] Loaded successfully"\);\s*\n?/g,
    ""
  );
  // 두 번째 console.log: 여러 줄 템플릿 리터럴
  reactContent = reactContent.replace(
    /console\.log\(\s*\n\s*`\[ComponentConfig\] \$\{COMPONENT_LIST\.length\} components in \$\{\s*getAllCategories\(\)\.length\s*\} categories`\s*\n\s*\);\s*\n?/g,
    ""
  );
  // 일반적인 패턴 (혹시 모를 다른 console.log도 제거)
  reactContent = reactContent.replace(
    /console\.log\([^)]*\[ComponentConfig\][^)]*\);\s*\n?/g,
    ""
  );
  // 여러 줄 패턴 (템플릿 리터럴)
  reactContent = reactContent.replace(
    /console\.log\(\s*\n[^)]*\[ComponentConfig\][^)]*\);\s*\n?/g,
    ""
  );

  // module.exports 블록 제거 (주석 포함)
  reactContent = reactContent.replace(
    /\/\/ ES Module export \(React\/MUI에서 사용\)\s*\n\s*if \(typeof module !== "undefined" && module\.exports\) \{[\s\S]*?\}\s*\n?/g,
    ""
  );

  // 2-6. 파일 끝의 찌꺼기 제거 (module.exports 제거 후 남은 것들)
  reactContent = reactContent.replace(/\n\s*;\s*\n\s*\}\s*\n\s*$/g, "\n");

  // 2-7. 빈 줄 정리 (3개 이상 연속된 빈 줄을 2개로)
  reactContent = reactContent.replace(/\n{3,}/g, "\n\n");

  // 2-8. 파일 끝의 불필요한 빈 줄 제거
  reactContent = reactContent.replace(/\n+$/, "\n");

  // 3. React 파일에 쓰기
  console.log(`✍️  Writing to ${reactPath}...`);
  fs.writeFileSync(reactPath, reactContent, "utf8");

  console.log("✅ Components config synchronized successfully!");
} catch (error) {
  console.error("❌ Failed to sync components config:", error.message);
  process.exit(1);
}
