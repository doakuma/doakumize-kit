import { TextAreaExample } from "./TextareaExample";
export const textareaShowcase = {
  title: "TextArea",
  description: "다양한 스타일과 상태를 지원하는 텍스트 영역 컴포넌트입니다.",
  usage: `import { TextArea } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description:
        "텍스트 영역의 다양한 상태를 지원합니다. 기본 상태, 활성화 상태, 비활성화 상태, 읽기 전용 상태, 최대 글자 수 제한 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-default"
              name="textarea-default"
              value=""
              onChange={() => {}}
            />
          ),
          code: `<TextArea id="textarea-default" name="textarea-default" value="" onChange={() => {}} />`,
        },
        {
          name: "Filled",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-filled"
              name="textarea-filled"
              value="Hello, world!"
            />
          ),
          code: `<TextArea id="textarea-filled" name="textarea-filled" value="Hello, world!" onChange={() => {}} />`,
        },
        {
          name: "Error",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-error"
              name="textarea-error"
              value="Hello, world!"
              isError={true}
            />
          ),
          code: `<TextArea id="textarea-error" name="textarea-error" value="Hello, world!" onChange={() => {}} isError={true} />`,
        },
        {
          name: "Disabled",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-disabled"
              name="textarea-disabled"
              value="Hello, world!"
              disabled={true}
            />
          ),
          code: `<TextArea id="textarea-disabled" name="textarea-disabled" value="Hello, world!" onChange={() => {}} disabled={true} />`,
        },
        {
          name: "ReadOnly",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-read-only"
              name="textarea-read-only"
              value="Hello, world!"
              readOnly={true}
            />
          ),
          code: `<TextArea id="textarea-read-only" name="textarea-read-only" value="Hello, world!" onChange={() => {}} readOnly={true} />`,
        },
      ],
    },
    {
      title: "Character Count",
      description: "최대 글자 수 제한을 지원합니다.",
      items: [
        {
          name: "Default",
          useTitle: true,
          component: (
            <TextAreaExample
              id="textarea-default"
              name="textarea-default"
              value=""
              maxLength={50}
            />
          ),
          code: `<TextArea id="textarea-default" name="textarea-default" value="" onChange={() => {}} maxLength={1000} />`,
        },
      ],
    },
  ],
  props: [
    {
      propName: "id",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "텍스트 영역의 ID",
    },
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "텍스트 영역의 이름",
    },
    {
      propName: "value",
      type: "string",
      isRequired: false,
      defaultValue: "",
      description: "텍스트 영역의 값",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: false,
      defaultValue: () => {},
      description: "텍스트 영역의 값이 변경될 때 호출되는 함수",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "텍스트 영역의 비활성화 여부",
    },
    {
      propName: "readOnly",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "텍스트 영역의 읽기 전용 여부",
    },
    {
      propName: "rows",
      type: "number",
      isRequired: false,
      defaultValue: 4,
      description: "텍스트 영역의 줄 수",
    },
    {
      propName: "placeholder",
      type: "string",
      isRequired: false,
      defaultValue: "입력 전",
      description: "텍스트 영역의 플레이스홀더",
    },
    {
      propName: "isError",
      type: "boolean",
      isRequired: false,
      defaultValue: false,
      description: "텍스트 영역의 에러 여부",
    },
    {
      propName: "maxLength",
      type: "number",
      isRequired: false,
      defaultValue: 1000,
      description: "텍스트 영역의 최대 글자 수",
    },
  ],
};
