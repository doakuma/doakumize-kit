import { FileUpload } from "@/components/ui";
export const fileUploadShowcase = {
  title: "FileUpload",
  description: "파일을 업로드하는 컴포넌트입니다.",
  useage: `import { FileUpload } from "@doakumize-kit/react";`,
  property: [
    {
      title: "State",
      description: "파일을 업로드하는 컴포넌트의 상태를 지원합니다.",
      grid: true,
      gridProps: {
        cols: 2,
      },
      items: [
        {
          name: "Default",
          useTitle: true,
          component: (
            <FileUpload id="fileUpload" name="fileUpload" label="파일 선택" />
          ),
        },
        {
          name: "Multiple",
          useTitle: true,
          component: (
            <FileUpload
              id="fileUploadMultiple"
              name="fileUploadMultiple"
              label="파일 선택"
              multiple
            />
          ),
        },
      ],
    },
    {
      title: "Existing Files",
      description: "기존 파일을 업로드하는 컴포넌트의 상태를 지원합니다.",
      items: [
        {
          name: "Default",
          component: (
            <FileUpload
              id="fileUploadExisting"
              name="fileUploadExisting"
              label="파일 선택"
              existingFiles={[
                { name: "example.pdf", size: 1024, type: "application/pdf" },
              ]}
              multiple
            />
          ),
        },
      ],
    },
  ],
  features: [
    {
      title: "ValidateMaxFiles",
      description: "파일 개수 제한 검증을 위한 기능을 제공합니다.",
      items: [
        {
          name: "Max Files",
          useTitle: true,
          component: (
            <FileUpload
              id="fileUpload1"
              name="fileUpload1"
              multiple
              maxFiles={3}
              label="파일 선택(최대 3개)"
              onError={(errors) => console.error(errors)}
            />
          ),
          code: `<FileUpload
  id="fileUpload1"
  name="fileUpload1"
  multiple
  maxFiles={3}
  label="파일 선택(최대 3개)"
  onError={(errors) => console.error(errors)}
    />`,
        },
      ],
    },
    {
      title: "validateFileSize",
      description: "개별 파일 크기 검증을 위한 기능을 제공합니다.",
      items: [
        {
          name: "File Size",
          useTitle: true,
          component: (
            <FileUpload
              id="fileUploadFileSize"
              name="fileUploadFileSize"
              label="파일 선택 (최대 5MB)"
              multiple
              maxFileSize={5 * 1024 * 1024} // 5MB
            />
          ),
          code: `<FileUpload
      id="fileUploadFileSize"
      name="fileUploadFileSize"
      label="파일 선택 (최대 5MB)"
      multiple
      maxFileSize={5 * 1024 * 1024}
    />`,
        },
      ],
    },
    {
      title: "validateTotalSize",
      description: "전체 파일 크기 검증을 위한 기능을 제공합니다.",
      items: [
        {
          name: "Total Size",
          useTitle: true,
          component: (
            <FileUpload
              id="fileUploadTotalSize"
              name="fileUploadTotalSize"
              label="파일 선택 (전체 최대 10MB)"
              multiple
              maxTotalFileSize={10 * 1024 * 1024} // 10MB
            />
          ),
          code: `<FileUpload
      id="fileUploadTotalSize"
      name="fileUploadTotalSize"
      label="파일 선택 (전체 최대 10MB)"
      multiple
      maxTotalFileSize={10 * 1024 * 1024}
    />`,
        },
      ],
    },
    {
      title: "validationDuplicateFile",
      description: "중복 파일 검증을 위한 기능을 제공합니다.",
      items: [
        {
          name: "Duplicate",
          useTitle: true,
          component: (
            <FileUpload
              id="fileUploadDuplicate"
              name="fileUploadDuplicate"
              label="파일 선택 (중복 불가)"
              multiple
              allowDuplicate={false}
            />
          ),
          code: `<FileUpload
      id="fileUploadDuplicate"
      name="fileUploadDuplicate"
      label="파일 선택 (중복 불가)"
      multiple
      allowDuplicate={false}
    />`,
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
      description: "파일 업로드 컴포넌트의 id입니다.",
    },
    {
      propName: "name",
      type: "string",
      isRequired: true,
      defaultValue: "",
      description: "파일 업로드 input의 name 속성입니다.",
    },
    {
      propName: "multiple",
      type: "boolean",
      isRequired: false,
      defaultValue: "false",
      description: "여러 파일 선택 가능 여부입니다.",
    },
    {
      propName: "label",
      type: "string",
      isRequired: false,
      defaultValue: '"파일 선택"',
      description: "파일 선택 버튼에 표시될 라벨입니다.",
    },
    {
      propName: "disabled",
      type: "boolean",
      isRequired: false,
      defaultValue: "false",
      description: "컴포넌트 비활성화 여부입니다.",
    },
    {
      propName: "onChange",
      type: "function",
      isRequired: false,
      defaultValue: "",
      description: "파일 선택 시 호출되는 콜백 함수입니다.",
    },
    {
      propName: "onRemove",
      type: "function",
      isRequired: false,
      defaultValue: "",
      description: "파일 삭제 시 호출되는 콜백 함수입니다.",
    },
    {
      propName: "existingFiles",
      type: "array",
      isRequired: false,
      defaultValue: "[]",
      description: "기존에 업로드된 파일 목록입니다.",
    },
    {
      propName: "maxFiles",
      type: "number",
      isRequired: false,
      defaultValue: "",
      description: "최대 파일 개수 제한입니다.",
    },
    {
      propName: "maxFileSize",
      type: "number",
      isRequired: false,
      defaultValue: "",
      description: "개별 파일 최대 크기입니다 (바이트 단위).",
    },
    {
      propName: "maxTotalFileSize",
      type: "number",
      isRequired: false,
      defaultValue: "",
      description: "전체 파일 최대 크기입니다 (바이트 단위).",
    },
    {
      propName: "allowDuplicate",
      type: "boolean",
      isRequired: false,
      defaultValue: "true",
      description: "중복 파일 허용 여부입니다.",
    },
    {
      propName: "onError",
      type: "function",
      isRequired: false,
      defaultValue: "",
      description: "파일 검증 실패 시 호출되는 콜백 함수입니다.",
    },
  ],
};
