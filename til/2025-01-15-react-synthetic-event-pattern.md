# React 합성 이벤트(Synthetic Event) 패턴 - 배열 기반 컴포넌트

> **날짜**: 2025-12-09
> **주제**: CheckBoxGroup의 onChange 이벤트 처리와 합성 이벤트 패턴
> **관련 컴포넌트**: CheckBoxGroup, (향후) Multi-Select Dropdown, Autocomplete

---

## 1. 합성 이벤트(Synthetic Event)란?

**합성 이벤트(Synthetic Event)**는 원래 이벤트 객체를 복사하고, 필요한 부분만 수정해서 새로운 이벤트 객체를 만드는 패턴입니다.

### 핵심 개념

```jsx
// 원래 이벤트 객체
const originalEvent = {
  target: {
    value: "option1", // 단일 값
    name: "checkbox-group-option1",
  },
};

// 합성 이벤트 생성
const syntheticEvent = {
  ...originalEvent, // 원래 이벤트의 모든 속성 복사
  target: {
    ...originalEvent.target, // 원래 target의 모든 속성 복사
    value: ["option1", "option2"], // ✅ value만 배열로 덮어쓰기
  },
};
```

**특징:**

- 원래 이벤트의 모든 속성을 유지하면서
- 필요한 부분(`value`)만 수정
- React의 표준 이벤트 객체 형태를 유지

---

## 2. 왜 쓰는지?

### 문제 상황

배열을 관리하는 컴포넌트(예: `CheckBoxGroup`)에서 개별 항목(예: `Checkbox`)의 이벤트를 그대로 전달하면 문제가 발생합니다.

#### 원래 코드의 문제점

```jsx
// CheckBoxGroup.jsx (문제가 있던 코드)
<Checkbox
  onChange={onChange} // ❌ 그대로 전달
  value={option.value}
/>
```

**문제:**

- `Checkbox`는 단일 값(`"option1"`)만 전달
- `CheckBoxGroup`은 배열(`["option1", "option2"]`)을 관리해야 함
- 배열 업데이트 로직이 없어서 state가 갱신되지 않음

#### 예제 컴포넌트의 문제

```jsx
// CheckboxGroupExample.jsx (문제가 있던 코드)
const handleChange = (e) => {
  const value = e.target.value; // "option1" (단일 값)
  setGroupValue((prev) => {
    if (prev.includes(value)) {
      // ❌ 배열에 단일 값이 있는지 체크
      return prev.filter((v) => v !== value);
    } else {
      return [...prev, value];
    }
  });
};
```

**문제:**

- `CheckBoxGroup`이 배열을 전달하는데, 예제가 단일 값으로 처리하려고 함
- `CheckBoxGroup` 내부에서 배열을 계산해 전달하므로, 예제에서는 그 값을 그대로 사용해야 함

### 해결 방법

**합성 이벤트 패턴**을 사용하여:

1. 컴포넌트 내부에서 배열 계산 로직 처리
2. 계산된 배열을 포함한 합성 이벤트 생성
3. 부모 컴포넌트는 배열만 받아서 사용

**장점:**

- ✅ 복잡한 로직을 컴포넌트 내부에 캡슐화
- ✅ 부모는 단순히 배열만 관리하면 됨
- ✅ React의 표준 이벤트 패턴 유지
- ✅ 다른 배열 기반 컴포넌트에도 재사용 가능

---

## 3. 예시

### CheckBoxGroup 구현 예시

```jsx
// CheckBoxGroup.jsx
const handleChange = (e) => {
  const clickedValue = e.target.value; // "option1" (단일 값)
  const currentValue = value || [];

  // 배열 계산 로직
  let newValue;
  if (clickedValue === "select-all") {
    // 전체 선택/해제 로직
    const allOptionValues = safeOptions.map((opt) => opt.value);
    const allSelected = allOptionValues.every((val) =>
      currentValue.includes(val)
    );
    newValue = allSelected ? [] : [...allOptionValues];
  } else {
    // 개별 체크박스 선택/해제 로직
    newValue = currentValue.includes(clickedValue)
      ? currentValue.filter((v) => v !== clickedValue)
      : [...currentValue, clickedValue];
  }

  // 합성 이벤트 생성 및 전달
  if (onChange) {
    const syntheticEvent = {
      ...e, // 원래 이벤트의 모든 속성 복사
      target: {
        ...e.target, // 원래 target의 모든 속성 복사
        value: newValue, // ✅ value만 배열로 덮어쓰기
      },
    };
    onChange(syntheticEvent);
  }
};
```

### 사용 예시

```jsx
// CheckboxGroupExample.jsx
export const CheckboxGroupExample = () => {
  const [groupValue, setGroupValue] = useState([]);

  const handleChange = (e) => {
    // CheckBoxGroup은 이미 계산된 배열을 e.target.value로 전달함
    const newValue = e.target.value; // ["option1", "option2"]
    setGroupValue(newValue);
  };

  return (
    <CheckBoxGroup
      name="checkbox-group"
      value={groupValue}
      onChange={handleChange}
      options={[
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
      ]}
    />
  );
};
```

### 이벤트 흐름

```
[사용자가 Checkbox 클릭]
    ↓
Checkbox의 onChange 발생
    ↓
e = { target: { value: "option1" } } (원래 이벤트)
    ↓
[CheckBoxGroup의 handleChange(e) 호출]
    ↓
배열 계산: ["option1", "option2"]
    ↓
syntheticEvent 생성
    ↓
syntheticEvent = {
  target: {
    value: ["option1", "option2"]  // ✅ 배열로 변경됨
  }
}
    ↓
[부모의 onChange(syntheticEvent) 호출]
    ↓
CheckboxGroupExample의 handleChange(e) 호출
    ↓
e.target.value = ["option1", "option2"] ✅
```

### 다른 컴포넌트 적용 예시

#### Multi-Select Dropdown

```jsx
const handleChange = (e) => {
  const clickedValue = e.target.value; // "option1"
  const currentValue = value || [];

  // 배열 업데이트
  const newValue = currentValue.includes(clickedValue)
    ? currentValue.filter((v) => v !== clickedValue)
    : [...currentValue, clickedValue];

  // 합성 이벤트 전달
  onChange({
    ...e,
    target: { ...e.target, value: newValue },
  });
};
```

#### Autocomplete (Multi-select)

```jsx
const handleSelect = (selectedItem) => {
  const newValue = [...value, selectedItem];
  onChange({
    target: { value: newValue },
  });
};
```

#### 일반화된 패턴

```jsx
// 범용 배열 관리 컴포넌트 패턴
const handleItemChange = (itemValue) => {
  const currentValue = value || [];

  // 배열 업데이트 로직 (컴포넌트마다 다를 수 있음)
  const newValue = /* 계산 로직 */;

  // 합성 이벤트 전달
  onChange({
    target: { value: newValue }
  });
};
```

---

## 4. 주의사항

### 1. 변수 이름은 단지 이름일 뿐

```jsx
const syntheticEvent = { ... };  // 이름이 syntheticEvent일 뿐
// 이렇게 해도 똑같아:
const myEvent = { ... };
const event = { ... };
const e = { ... };
```

**중요한 건**: 배열을 포함한 합성 이벤트 객체를 만드는 것!

### 2. 매개변수 전달 과정 이해하기

```jsx
// 예제 컴포넌트
const handleChange = (e) => {
  // ← e는 매개변수 이름
  const newValue = e.target.value;
};

<CheckBoxGroup onChange={handleChange} />;
```

```jsx
// CheckBoxGroup 내부
const syntheticEvent = { ... };  // syntheticEvent 변수 생성
onChange(syntheticEvent);  // ← 여기서 syntheticEvent를 전달
```

**결과**: 예제 컴포넌트의 `handleChange`의 매개변수 `e`에 `syntheticEvent`가 전달됨!

### 3. Controlled Component 패턴 유지

- 부모가 `value` prop으로 state를 관리 (controlled)
- 자식은 `onChange`로 변경사항만 알림
- 이 패턴은 React에서 권장되는 방식

### 4. 컴포넌트 책임 분리

- **CheckBoxGroup의 책임**:
  1. 개별 Checkbox의 단일 값 → 배열로 변환
  2. 전체 선택/해제 로직 처리
  3. 부모에게 최종 배열만 전달
- **부모 컴포넌트의 책임**: 배열만 받아서 state 관리

### 5. 원래 이벤트 속성 보존

```jsx
const syntheticEvent = {
  ...e, // ✅ 원래 이벤트의 모든 속성 복사
  target: {
    ...e.target, // ✅ 원래 target의 모든 속성 복사
    value: newValue, // ✅ value만 덮어쓰기
  },
};
```

**주의**: `...e`와 `...e.target`을 사용하여 원래 이벤트의 다른 속성들(`name`, `type` 등)도 보존해야 합니다.

### 6. 배열 기반 컴포넌트에만 적용

이 패턴은 **배열을 다루는 컴포넌트**에만 적용됩니다:

- ✅ CheckBoxGroup
- ✅ Multi-Select Dropdown
- ✅ Autocomplete (Multi-select)
- ✅ Tag Input
- ❌ 단일 값만 다루는 컴포넌트 (Input, Select 등)에는 불필요

---

## 🔗 관련 파일

- `react/src/components/ui/Checkbox/CheckBoxGroup.jsx`
- `react/src/components/studio/showcases/Checkbox/CheckboxGroupExample.jsx`

---

## 📝 참고

- React 공식 문서: [SyntheticEvent](https://react.dev/reference/react-dom/components/common#react-event-object)
- Controlled Components 패턴
- 배열 기반 컴포넌트 설계 패턴

---

**오늘도 배우고, 내일은 더 빠르게! 🚀**
