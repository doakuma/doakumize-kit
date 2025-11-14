# 컴포넌트 스크립트 리팩토링 계획

## 📊 현재 상황 분석

- **문제점**: `common.js`에 모든 컴포넌트 로직이 2000줄+로 몰려있음
- **영향**: 유지보수 어려움, 충돌 가능성 증가, 코드 재사용성 저하
- **프로젝트 특성**: 퍼블리셔들이 로컬에서 작업하며 소스 수정할 수 있어야 함
- **제약사항**: 번들링 등 복잡한 빌드 프로세스는 부적합, 단순한 통합 파일 제공 필요

## 🎯 일반적인 라이브러리 개발자들의 전략

### 1. **컴포넌트별 모듈 분리 (가장 일반적)**

대부분의 유명 라이브러리들은 이 방식을 사용해:

- **Bootstrap**: `js/dist/dropdown.js`, `tooltip.js`, `modal.js` 각각 분리
- **Material-UI**: 각 컴포넌트가 독립적인 모듈로 관리
- **Ant Design**: 컴포넌트별로 폴더 분리 (`components/Button/`, `components/Input/`)

**장점**:

- ✅ 명확한 책임 분리
- ✅ 필요한 것만 로드 가능 (Tree-shaking)
- ✅ 병렬 작업 가능
- ✅ 버전 관리 용이

### 2. **네임스페이스 기반 구조**

```javascript
// 예: components/scripts/tooltip.js
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.Tooltip = {
  init: function () {
    /* ... */
  },
  destroy: function () {
    /* ... */
  },
};
```

### 3. **클래스 기반 구조 (Modern)**

```javascript
// components/scripts/tooltip.js
class TooltipComponent {
  constructor() {
    /* ... */
  }
  init() {
    /* ... */
  }
  destroy() {
    /* ... */
  }
}

window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.Tooltip = TooltipComponent;
```

### 4. **자동 초기화 vs 명시적 등록**

**자동 초기화** (현재 방식):

- DOMContentLoaded 시 모든 컴포넌트 초기화
- 장점: 간단함
- 단점: 불필요한 컴포넌트도 로드됨

**명시적 등록** (권장):

- 필요한 컴포넌트만 선택적으로 로드
- 장점: 성능, 유연성
- 단점: 사용자가 신경써야 함

## 🚀 퍼블리셔 친화적인 리팩토링 전략 (번들링 불필요)

### **최종 결정: 소스 분리 + 통합 파일 제공**

퍼블리셔 관점에서:

- ✅ **소스 코드 읽기 쉬움**: 컴포넌트별로 파일 분리
- ✅ **수정 용이**: 특정 컴포넌트만 찾아서 수정 가능
- ✅ **사용 편의**: 하나의 통합 파일로 간단히 로드
- ✅ **빌드 프로세스 불필요**: 순수 HTML/JS로 동작

### 제안하는 구조

```
vanillia/
├── components/
│   ├── scripts/                    # 소스 파일들 (개발/수정용)
│   │   ├── tooltip.js
│   │   ├── dropdown.js
│   │   ├── modal.js
│   │   ├── popover.js
│   │   ├── input.js
│   │   ├── chip.js
│   │   ├── tab.js
│   │   ├── accordion.js
│   │   ├── slider.js
│   │   └── checkbox-group.js
│   └── ...
└── resources/js/
    ├── components.js                # 통합 파일 (자동 생성 스크립트)
    └── common.js                    # 기존 파일 (점진적 축소)
```

**핵심 아이디어**:

- 소스는 `scripts/` 폴더에 분리 관리
- 통합 파일 `components.js`는 간단한 스크립트로 자동 생성
- HTML에서는 하나의 `components.js`만 로드

**구조 예시**:

```javascript
// components/scripts/tooltip.js
(function () {
  "use strict";

  /**
   * Tooltip 컴포넌트
   * wrapper 내부 요소에 호버 시 툴팁 표시
   */
  function initTooltip() {
    // 이벤트 위임으로 한 번만 등록
    document.addEventListener(
      "mouseenter",
      function (e) {
        const wrapper = e.target.closest(".tooltip-wrapper");
        if (!wrapper) return;

        // 툴팁 표시 로직
        // ...
      },
      true
    );

    document.addEventListener(
      "mouseleave",
      function (e) {
        // 툴팁 제거 로직
        // ...
      },
      true
    );
  }

  // 전역 네임스페이스에 등록 (초기화 함수만)
  window.VanillaComponents = window.VanillaComponents || {};
  window.VanillaComponents.initTooltip = initTooltip;
})();
```

```javascript
// resources/js/components.js (통합 파일)
// 이 파일은 scripts 폴더의 모든 파일을 읽어서 하나로 합친 결과물
// 간단한 Node.js 스크립트로 자동 생성 가능

(function () {
  "use strict";

  /**
   * 모든 컴포넌트 초기화
   */
  function initAllComponents() {
    console.log("[Components] Initializing all components...");

    // 각 컴포넌트 초기화 함수 호출
    if (window.VanillaComponents) {
      if (typeof window.VanillaComponents.initTooltip === "function") {
        window.VanillaComponents.initTooltip();
      }
      if (typeof window.VanillaComponents.initDropdown === "function") {
        window.VanillaComponents.initDropdown();
      }
      // ... 나머지 컴포넌트들
    }

    console.log("[Components] All components initialized");
  }

  // DOM 준비 시 초기화
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllComponents);
  } else {
    initAllComponents();
  }
})();

// 위에 각 컴포넌트 파일들의 내용이 모두 포함됨
// 예: tooltip.js, dropdown.js 등의 내용이 여기에 복사됨
```

### **옵션 2: 컴포넌트별 폴더 구조**

```
vanillia/
├── components/
│   ├── tooltip/
│   │   ├── tooltip.data.js        # 기존
│   │   ├── tooltip.script.js      # 새로 추가
│   │   └── tooltip.styles.css     # 필요시 분리
│   ├── dropdown/
│   │   ├── dropdown.data.js
│   │   └── dropdown.script.js
│   └── ...
```

**장점**: 각 컴포넌트가 완전히 독립적

**단점**: 파일이 너무 많아질 수 있음

### **옵션 3: 기능별 그룹화 (현재 common.js 유지하면서 점진적 분리)**

```
vanillia/resources/js/
├── common.js                      # 공통 유틸리티만
├── components/
│   ├── form-controls.js           # Input, Dropdown, Chip 등
│   ├── feedback.js                # Modal, Popover, Tooltip 등
│   ├── navigation.js              # Tab, Accordion 등
│   └── data-display.js            # Table 등
```

## 💡 추천 전략: **옵션 1 (컴포넌트별 파일 분리)**

### 이유

1. **명확성**: 각 파일이 단일 컴포넌트만 다룸
2. **확장성**: 새 컴포넌트 추가가 쉬움
3. **유지보수**: 버그 수정 시 영향 범위가 명확
4. **테스트**: 각 컴포넌트 독립 테스트 가능
5. **재사용성**: 필요한 컴포넌트만 import 가능

### 마이그레이션 전략

#### Phase 1: 구조 생성 (비파괴적)

1. `components/scripts/` 폴더 생성
2. 새 컴포넌트(예: tooltip)부터 분리 시작
3. `common.js`는 유지하되 새로운 컴포넌트는 새 구조 사용

#### Phase 2: 점진적 마이그레이션

1. 기존 컴포넌트를 하나씩 새 구조로 이동
2. 각 마이그레이션마다 테스트
3. `common.js`에서 해당 부분 주석 처리 또는 제거

#### Phase 3: 정리

1. 모든 컴포넌트 이동 완료 후
2. `common.js`를 공통 유틸리티만 남기고 정리
3. 또는 `common.js` 삭제

## 📋 구체적인 작업 순서

### 1단계: 기본 구조 생성

```
✓ components/scripts/ 폴더 생성
✓ components/scripts/index.js 생성
✓ 네임스페이스 구조 정의
```

### 2단계: Tooltip 컴포넌트 분리 (파일럿)

```
✓ tooltip.js 생성
✓ common.js에서 tooltip 관련 로직 추출
✓ 새 구조로 동작 확인
```

### 3단계: 나머지 컴포넌트 점진적 분리

```
- dropdown.js
- popover.js
- modal.js
- input.js
- chip.js
- tab.js
- accordion.js
- slider.js
- checkbox-group.js
```

### 4단계: common.js 정리

```
- 공통 유틸리티만 남기거나
- 완전히 제거
```

## 🎨 코드 스타일 가이드

### 네임스페이스

```javascript
window.VanillaComponents = window.VanillaComponents || {};
window.VanillaComponents.Tooltip = TooltipComponent;
```

### 초기화 패턴

```javascript
// 각 컴포넌트는 init() 메서드 필수
class Component {
  init() {
    /* 이벤트 위임 등록 */
  }
  destroy() {
    /* 정리 */
  }
}
```

### 이벤트 위임 권장

```javascript
// 좋은 예: 한 번만 등록
document.addEventListener("click", handler, true);

// 나쁜 예: 각 요소마다 등록
elements.forEach((el) => el.addEventListener("click", handler));
```

## ⚠️ 주의사항

1. **하위 호환성**: 기존 코드가 깨지지 않도록 주의
2. **순서 의존성**: 컴포넌트 간 의존성 확인
3. **전역 네임스페이스**: 충돌 방지를 위한 명확한 네임스페이스
4. **점진적 마이그레이션**: 한 번에 다 바꾸지 말고 단계적으로

## 🔧 통합 파일 자동 생성 (번들러 불필요)

### 방법 1: 간단한 Node.js 스크립트 (권장)

```javascript
// scripts/build-components.js
const fs = require("fs");
const path = require("path");

const scriptsDir = path.join(__dirname, "../components/scripts");
const outputFile = path.join(__dirname, "../resources/js/components.js");

// scripts 폴더의 모든 .js 파일 읽기
const files = fs
  .readdirSync(scriptsDir)
  .filter((file) => file.endsWith(".js"))
  .sort(); // 알파벳 순서로 정렬하여 일관된 순서 보장

let combinedContent = `/**
 * Components 통합 파일
 * 이 파일은 자동 생성됩니다. 수정하지 마세요.
 * 소스 파일은 components/scripts/ 폴더를 확인하세요.
 * 
 * 생성 시간: ${new Date().toISOString()}
 */

(function() {
  'use strict';

`;

// 각 파일 내용 추가
files.forEach((file) => {
  const filePath = path.join(scriptsDir, file);
  const content = fs.readFileSync(filePath, "utf8");

  // IIFE 래퍼 제거 (이미 전체가 IIFE로 감싸져 있음)
  const cleanedContent = content
    .replace(
      /^\s*\(function\s*\([^)]*\)\s*\{[\s\n]*['"]use strict['"];[\s\n]*/,
      ""
    )
    .replace(/\s*\}\)\s*\(\s*\);?\s*$/, "");

  combinedContent += `\n  // === ${file} ===\n`;
  combinedContent += cleanedContent;
  combinedContent += "\n";
});

// 마지막에 초기화 코드 추가
combinedContent += `
  /**
   * 모든 컴포넌트 초기화
   */
  function initAllComponents() {
    console.log('[Components] Initializing all components...');

    if (window.VanillaComponents) {
      Object.keys(window.VanillaComponents).forEach(key => {
        if (key.startsWith('init') && typeof window.VanillaComponents[key] === 'function') {
          window.VanillaComponents[key]();
          console.log(\`[Components] ✓ \${key} initialized\`);
        }
      });
    }

    console.log('[Components] All components initialized');
  }

  // DOM 준비 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllComponents);
  } else {
    initAllComponents();
  }
})();
`;

// 파일 쓰기
fs.writeFileSync(outputFile, combinedContent, "utf8");
console.log(`✓ Generated: ${outputFile}`);
console.log(`✓ Combined ${files.length} files`);
```

**사용법**:

```bash
node scripts/build-components.js
```

### 방법 2: 간단한 Bash 스크립트 (더 간단)

```bash
#!/bin/bash
# scripts/build-components.sh

SCRIPTS_DIR="components/scripts"
OUTPUT_FILE="resources/js/components.js"

echo "/**" > "$OUTPUT_FILE"
echo " * Components 통합 파일" >> "$OUTPUT_FILE"
echo " * 자동 생성됨 - 수정하지 마세요" >> "$OUTPUT_FILE"
echo " */" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "(function() {" >> "$OUTPUT_FILE"
echo "  'use strict';" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# 모든 .js 파일을 순서대로 합치기
for file in "$SCRIPTS_DIR"/*.js; do
  echo "  // === $(basename $file) ===" >> "$OUTPUT_FILE"
  # IIFE 래퍼 제거하고 내용 추가
  sed 's/^(function.*{$/\/\//; s/^})();$//' "$file" >> "$OUTPUT_FILE"
  echo "" >> "$OUTPUT_FILE"
done

echo "  // 초기화 코드" >> "$OUTPUT_FILE"
echo "  // ..." >> "$OUTPUT_FILE"
echo "})();" >> "$OUTPUT_FILE"

echo "✓ Generated: $OUTPUT_FILE"
```

### 방법 3: HTML에서 여러 파일 직접 로드 (가장 간단)

번들링 스크립트를 만들기 어렵다면, HTML에서 직접 로드하는 방법도 있어:

```html
<!-- components/scripts/ 폴더의 파일들을 순서대로 로드 -->
<script src="components/scripts/tooltip.js"></script>
<script src="components/scripts/dropdown.js"></script>
<script src="components/scripts/popover.js"></script>
<!-- ... 나머지 파일들 -->
<script src="components/scripts-init.js"></script>
<!-- 초기화 코드 -->
```

**장점**:

- ✅ 빌드 스크립트 불필요
- ✅ 브라우저 캐싱 활용 가능
- ✅ 개발 시 디버깅 쉬움

**단점**:

- ❌ 스크립트 태그가 많아짐
- ❌ HTTP 요청 증가 (하지만 캐싱으로 해결 가능)

### 추천: 방법 1 (Node.js 스크립트)

이유:

- 한 번만 실행하면 됨 (수정 시에만)
- 프로덕션에서는 하나의 파일로 제공
- 개발 시에는 개별 파일로도 작업 가능
- 복잡한 번들러 없이 간단하게 구현

## 📝 실제 사용 시나리오

### 개발/수정 시

1. `components/scripts/tooltip.js` 파일을 직접 수정
2. 필요시 `node scripts/build-components.js` 실행
3. 브라우저에서 테스트

### 퍼블리셔 사용 시

1. 다운로드한 프로젝트에서 `resources/js/components.js` 사용
2. 수정이 필요하면 `components/scripts/` 폴더의 파일 수정
3. 수정 후 통합 스크립트 실행 (선택사항)

## 📝 다음 단계

1. ✅ 이 계획 검토 및 승인
2. 🔨 `components/scripts/` 폴더 구조 생성
3. 🔨 통합 빌드 스크립트 작성
4. 🧪 Tooltip 컴포넌트 파일럿 프로젝트
5. ✅ 검증 후 나머지 컴포넌트 확장
