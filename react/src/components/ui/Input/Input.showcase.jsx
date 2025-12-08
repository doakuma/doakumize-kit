import Input from "./Input";
import { Icon } from "../Icon/Icon";
import { Button } from "../Button/Button";
import InteractiveShowcase from "../../studio/common/InteractiveShowcase";

/**
 * Input Component Showcase Data
 */
export const inputShowcase = {
  title: "Input",
  description: "다양한 스타일과 크기를 지원하는 입력 컴포넌트입니다.",
  useage: `import { Input } from "@doakumize-kit/react";`,
  property: [
    {
      title: "Sizes",
      description:
        "입력 컴포넌트의 크기를 조절할 수 있습니다. small, medium, large 세 가지 크기를 지원합니다.",
      items: [
        {
          name: "Small",
          component: <Input type="text" size="small" placeholder="Small" />,
          code: `<Input type="text" size="small" placeholder="Small" />`,
        },
        {
          name: "Medium",
          component: <Input type="text" size="medium" placeholder="Medium" />,
          code: `<Input type="text" size="medium" placeholder="Medium" />`,
        },
        {
          name: "Large",
          component: <Input type="text" size="large" placeholder="Large" />,
          code: `<Input type="text" size="large" placeholder="Large" />`,
        },
      ],
    },
    {
      title: "States",
      description:
        "입력 컴포넌트의 상태를 제어할 수 있습니다. disabled, readOnly, error 세 가지 상태를 지원합니다.",
      items: [
        {
          name: "Disabled",
          component: (
            <Input type="text" size="medium" disabled value="Disabled" />
          ),
          code: `<Input type="text" size="medium" disabled value="Disabled" />`,
        },
        {
          name: "Read Only",
          component: (
            <Input type="text" size="medium" readOnly value="Read Only" />
          ),
          code: `<Input type="text" size="medium" readOnly value="Read Only" />`,
        },
        {
          name: "Error",
          component: <Input type="text" size="medium" error value="Error" />,
          code: `<Input type="text" size="medium" error value="Error" />`,
        },
      ],
    },
    {
      title: "Types",
      description:
        "입력 타입을 제어할 수 있습니다. text, password, email, number, tel, url, search, date, time, datetime-local, month, week 세 가지 타입을 지원합니다.",
      items: [
        {
          name: "Text",
          component: <Input type="text" size="medium" placeholder="Text" />,
          code: `<Input type="text" size="medium" placeholder="Text" />`,
        },
        {
          name: "Password",
          component: (
            <Input type="password" size="medium" placeholder="Password" />
          ),
          code: `<Input type="password" size="medium" placeholder="Password" />`,
        },
        {
          name: "Email",
          component: <Input type="email" size="medium" placeholder="Email" />,
          code: `<Input type="email" size="medium" placeholder="Email" />`,
        },
        {
          name: "Number",
          component: <Input type="number" size="medium" placeholder="Number" />,
          code: `<Input type="number" size="medium" placeholder="Number" />`,
        },
        {
          name: "Tel",
          component: <Input type="tel" size="medium" placeholder="Tel" />,
          code: `<Input type="tel" size="medium" placeholder="Tel" />`,
        },
        {
          name: "Url",
          component: <Input type="url" size="medium" placeholder="Url" />,
          code: `<Input type="url" size="medium" placeholder="Url" />`,
        },
        {
          name: "Search",
          component: <Input type="search" size="medium" placeholder="Search" />,
          code: `<Input type="search" size="medium" placeholder="Search" />`,
        },
        {
          name: "Date",
          component: <Input type="date" size="medium" placeholder="Date" />,
          code: `<Input type="date" size="medium" placeholder="Date" />`,
        },
        {
          name: "Time",
          component: <Input type="time" size="medium" placeholder="Time" />,
          code: `<Input type="time" size="medium" placeholder="Time" />`,
        },
      ],
    },
    {
      title: "Addons",
      description:
        "입력 컴포넌트의 아이콘을 추가할 수 있습니다. firstAddon, endAddon 두 가지 아이콘을 지원합니다.",
      items: [
        {
          name: "First Addon",
          component: (
            <Input
              type="text"
              size="medium"
              firstAddon={<Icon name="search" />}
              placeholder="First Addon"
            />
          ),
          code: `<Input type="text" size="medium" firstAddon={<Icon name="search" />} placeholder="First Addon" />`,
        },
        {
          name: "End Addon",
          component: (
            <Input
              type="text"
              size="medium"
              endAddon={<Icon name="close" />}
              placeholder="End Addon"
            />
          ),
          code: `<Input type="text" size="medium" endAddon={<Icon name="close" />} placeholder="End Addon" />`,
        },
        {
          name: "End Addon",
          component: (
            <Input
              type="text"
              size="medium"
              endAddon={
                <Button
                  variant="ghost"
                  size="small"
                  startIcon={<Icon name="close" />}
                />
              }
              placeholder="With Close Button"
            />
          ),
          code: `<Input type="text" size="medium" endAddon={<Button variant="ghost" size="small" startIcon={<Icon name="close" />} />} placeholder="With Close Button" />`,
        },
      ],
    },
    {
      title: "Playground",
      description:
        "입력 컴포넌트의 props를 실시간으로 변경하고 이벤트를 확인할 수 있습니다.",
      items: [
        {
          name: "Interactive Input",
          component: (
            <InteractiveShowcase
              defaultProps={{
                type: "email",
                size: "medium",
                placeholder: "name@example.com",
                value: "",
              }}
              controls={[
                {
                  prop: "type",
                  type: "select",
                  label: "Type",
                  options: [
                    "text",
                    "email",
                    "password",
                    "number",
                    "tel",
                    "url",
                    "search",
                  ],
                },
                {
                  prop: "size",
                  type: "select",
                  label: "Size",
                  options: ["small", "medium", "large"],
                },
                {
                  prop: "placeholder",
                  type: "text",
                  label: "Placeholder",
                },
                {
                  prop: "error",
                  type: "text",
                  label: "Error Message",
                },
                {
                  prop: "disabled",
                  type: "boolean",
                  label: "Disabled",
                },
                {
                  prop: "readOnly",
                  type: "boolean",
                  label: "Read Only",
                },
              ]}
              eventHandlers={["onChange"]}
            >
              <Input />
            </InteractiveShowcase>
          ),
          code: `<Input
  type="email"
  size="medium"
  placeholder="name@example.com"
  error="Error message here"
  disabled={false}
  readOnly={false}
  onChange={(e) => console.log(e.target.value)}
  onFocus={(e) => console.log('focused')}
  onBlur={(e) => console.log('blurred')}
/>`,
        },
      ],
    },
    {
      title: "Validation",
      description:
        "입력값의 유효성을 검증하는 예제입니다. isRequired와 pattern을 사용하여 실시간으로 검증할 수 있습니다.",
      items: [
        {
          name: "Required Validation",
          component: (
            <InteractiveShowcase
              defaultProps={{
                type: "text",
                size: "medium",
                placeholder: "필수 입력 항목",
                value: "",
              }}
              controls={[
                {
                  prop: "placeholder",
                  type: "text",
                  label: "Placeholder",
                },
              ]}
              eventHandlers={["onChange"]}
              validationRules={{
                isRequired: true,
              }}
            >
              <Input />
            </InteractiveShowcase>
          ),
          code: `const [value, setValue] = useState("");
const [error, setError] = useState("");

const handleChange = (e) => {
  const newValue = e.target.value;
  setValue(newValue);
  
  if (!newValue || newValue.trim() === "") {
    setError("필수 입력 항목입니다");
  } else {
    setError("");
  }
};

<Input
  type="text"
  size="medium"
  placeholder="필수 입력 항목"
  value={value}
  error={error}
  onChange={handleChange}
/>`,
        },
        {
          name: "Email Validation",
          component: (
            <InteractiveShowcase
              defaultProps={{
                type: "email",
                size: "medium",
                placeholder: "name@example.com",
                value: "",
              }}
              controls={[
                {
                  prop: "placeholder",
                  type: "text",
                  label: "Placeholder",
                },
              ]}
              eventHandlers={["onChange"]}
              validationRules={{
                isRequired: true,
                pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                patternMessage: "올바른 이메일 형식을 입력해주세요",
              }}
            >
              <Input />
            </InteractiveShowcase>
          ),
          code: `const [value, setValue] = useState("");
const [error, setError] = useState("");

const handleChange = (e) => {
  const newValue = e.target.value;
  setValue(newValue);
  
  if (!newValue || newValue.trim() === "") {
    setError("필수 입력 항목입니다");
  } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(newValue)) {
    setError("올바른 이메일 형식을 입력해주세요");
  } else {
    setError("");
  }
};

<Input
  type="email"
  size="medium"
  placeholder="name@example.com"
  value={value}
  error={error}
  onChange={handleChange}
/>`,
        },
        {
          name: "Phone Number Validation",
          component: (
            <InteractiveShowcase
              defaultProps={{
                type: "tel",
                size: "medium",
                placeholder: "010-1234-5678",
                value: "",
              }}
              controls={[
                {
                  prop: "placeholder",
                  type: "text",
                  label: "Placeholder",
                },
              ]}
              eventHandlers={["onChange"]}
              validationRules={{
                isRequired: true,
                pattern: "^01[0-9]-[0-9]{3,4}-[0-9]{4}$",
                patternMessage:
                  "올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)",
              }}
            >
              <Input />
            </InteractiveShowcase>
          ),
          code: `const [value, setValue] = useState("");
const [error, setError] = useState("");

const handleChange = (e) => {
  const newValue = e.target.value;
  setValue(newValue);
  
  if (!newValue || newValue.trim() === "") {
    setError("필수 입력 항목입니다");
  } else if (!/^01[0-9]-[0-9]{3,4}-[0-9]{4}$/.test(newValue)) {
    setError("올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)");
  } else {
    setError("");
  }
};

<Input
  type="tel"
  size="medium"
  placeholder="010-1234-5678"
  value={value}
  error={error}
  onChange={handleChange}
/>`,
        },
      ],
    },
  ],
  props: [
    {
      propName: "type",
      type: "oneOf",
      isRequired: false,
      defaultValue: "text",
      description:
        "입력 타입 (text, password, email, number, tel, url, search, date, time, datetime-local, month, week)",
    },
    {
      propName: "size",
      type: "oneOf",
      isRequired: false,
      defaultValue: "medium",
      description: "입력 크기 (small, medium, large)",
    },
    {
      propName: "value",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "입력 값",
    },
    {
      propName: "defaultValue",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "기본 입력 값",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "비활성화 여부",
    },
    {
      propName: "readOnly",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "읽기 전용 여부",
    },
    {
      propName: "placeholder",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "입력 플레이스홀더",
    },
    {
      propName: "error",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "에러 메시지",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: false,
      defaultValue: () => {},
      description: "입력 값 변경 시 호출되는 함수",
    },
    {
      propName: "firstAddon",
      type: "ReactNode",
      isRequired: false,
      defaultValue: null,
      description: "첫 번째 아이콘",
    },
    {
      propName: "endAddon",
      type: "ReactNode",
      isRequired: false,
      defaultValue: null,
      description: "마지막 아이콘",
    },
  ],
};
