# Component Engine 사용 가이드

## 📁 파일 구조

```
components/
  ├── component-engine.js          # 메인 렌더링 엔진 (캐싱, 렌더러 관리)
  ├── components-init.js           # 초기화 스크립트
  ├── data/                        # 컴포넌트 JSON 데이터
  │   ├── typography.json
  │   ├── button.json
  │   └── icon.json
  └── renderers/
      └── generic.renderer.js      # 제네릭 렌더러 (대부분의 컴포넌트 처리)
```

## 🎯 제네릭 렌더러의 장점

- ✅ **렌더러 파일 90% 감소**: 14개 → 1개
- ✅ **새 컴포넌트 추가 시 JSON만 작성**: 코드 작성 불필요
- ✅ **일관된 구조**: 모든 컴포넌트가 동일한 패턴 사용
- ✅ **유지보수 간편**: 한 곳만 수정하면 모든 컴포넌트에 적용

## 🚀 사용 방법

### 1. 브라우저에서 components.html 열기

- Typography 탭이 자동으로 JSON에서 렌더링됨

### 2. 브라우저 콘솔에서 사용 가능한 명령어:

```javascript
// 캐시 상태 확인
showCacheStats();

// 컴포넌트 재로딩 (개발 중 유용)
reloadComponents();

// 등록된 렌더러 확인
componentEngine.getRegisteredRenderers();

// 특정 타입 캐시 삭제
componentEngine.clearCache("typography");
```

## 🔧 새로운 컴포넌트 추가하기

### ⚡ 간단한 방법 (대부분의 경우 - 추천!)

제네릭 렌더러를 사용하면 **JSON 파일만 작성**하면 됩니다!

#### 1. JSON 데이터 파일 생성

`components/data/my-component.json`

```json
{
  "type": "my-component",
  "id": "componentMyComponent",
  "title": "My Component",
  "variants": [
    {
      "title": "기본 상태",
      "items": [
        {
          "preview": "<button class=\"btn\">Click me</button>",
          "label": "기본 버튼"
        }
      ]
    }
  ]
}
```

#### 2. components-init.js에 등록

```javascript
// 제네릭 렌더러가 자동으로 처리
componentEngine.registerRenderer("my-component", genericRenderer);
```

#### 3. 렌더링 호출

```javascript
await componentEngine.loadAndMount(
  "my-component",
  "components/data/my-component.json",
  "#targetElementId"
);
```

**끝!** 렌더러 파일 작성 불필요 ✨

---

### 🎨 고급 방법 (복잡한 컴포넌트)

Modal, Tab 같은 매우 복잡한 컴포넌트만 전용 렌더러를 만듭니다.

#### 1. 전용 렌더러 클래스 생성

`components/renderers/complex-component.renderer.js`

```javascript
class ComplexComponentRenderer {
  render(data) {
    // 특별한 렌더링 로직
    return "<div>...</div>";
  }

  getCacheKey(data) {
    return `complex-${data.id}`;
  }
}
```

#### 2. HTML에 스크립트 추가

```html
<script src="components/renderers/complex-component.renderer.js"></script>
```

#### 3. components-init.js에 등록

```javascript
componentEngine.registerRenderer("complex", new ComplexComponentRenderer());
```

## 📝 JSON 데이터 수정

`typography.json` 파일을 직접 수정하여 컴포넌트 내용을 변경할 수 있습니다.
수정 후 브라우저를 새로고침하면 자동으로 반영됩니다.

개발 중에는 콘솔에서 `reloadComponents()`를 실행하여
새로고침 없이 변경사항을 확인할 수 있습니다.

## ⚡ 성능 최적화

- 첫 렌더링 후 결과가 자동으로 캐시됨
- 동일한 데이터는 다시 렌더링하지 않음
- JSON 파일도 한 번 로드 후 캐시됨
- 개발 시에만 캐시를 끄려면:
  ```javascript
  componentEngine.render(type, data, false); // 세 번째 인자 false
  ```

## 🐛 디버깅 팁

### 1. 콘솔에 상세 로그가 출력됨:

- `[Init]` 초기화 관련
- `[ComponentEngine]` 엔진 동작 관련

### 2. 렌더링 오류 발생 시:

- 브라우저 콘솔 확인
- JSON 구조가 올바른지 확인
- 렌더러의 `render()` 메서드 확인

### 3. JSON 유효성 검사:

[https://jsonlint.com/](https://jsonlint.com/) 활용

## ✅ 장점

- ✓ **유지보수 용이**: HTML 수정 없이 JSON만 수정
- ✓ **재사용성**: 렌더러를 다른 프로젝트에서도 사용 가능
- ✓ **성능**: 캐싱으로 빠른 렌더링
- ✓ **확장성**: 새로운 컴포넌트 타입을 쉽게 추가
- ✓ **테스트 가능**: 각 렌더러를 독립적으로 테스트
- ✓ **타입 안전성**: 향후 TypeScript 전환 용이

## 📚 다음 단계

1. ✅ **Typography 컴포넌트** - 완료 (제네릭 렌더러 사용)
2. ✅ **Button 컴포넌트** - 완료 (JSON 준비됨)
3. ✅ **Icon 컴포넌트** - 완료 (JSON 준비됨)
4. ⏳ **나머지 컴포넌트 JSON 변환** - Input, Chip, Checkbox 등
5. 🔮 **검색/필터링 기능 추가**
6. 🌐 **다국어 지원 (i18n)**
7. 📘 **TypeScript 전환 고려**

---

## 🎉 제네릭 렌더러 도입 효과

### Before (전용 렌더러 방식)

```
components/renderers/
  ├── typography.renderer.js   (126 lines)
  ├── button.renderer.js       (예정)
  ├── icon.renderer.js         (예정)
  ├── input.renderer.js        (예정)
  ├── ... (10개 더 필요)
  = 총 14개 파일, 약 1,500+ lines
```

### After (제네릭 렌더러 방식)

```
components/renderers/
  └── generic.renderer.js      (228 lines)

= 1개 파일로 모든 컴포넌트 처리! 🚀
```

**결과**: 렌더러 파일 **93% 감소**, 유지보수성 **대폭 향상**!
