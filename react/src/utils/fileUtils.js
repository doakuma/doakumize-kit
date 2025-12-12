/**
 * 파일 크기를 읽기 쉬원 형식으로 변환
 * @param {number} size - 파일 크기 (바이트)
 * @returns {string} 포맷된 파일 크기 문자열
 */
export function formatFileSize(size) {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  }
}

/**
 * 파일 확장자나 MIME 타입에 따라 적절한 아이콘 타입 변환
 * @param {string} fileName - 파일 이름 (확장자 추출)
 * @param {string} mimeType - MIME 타입 (선택사항)
 * @returns {string}
 */
export function getFileIconType(fileName, mimeType = "") {
  // 파일 확장자 추출
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  // 확장자별 매핑
  const extensionMap = {
    // 문서
    pdf: "pdf",
    doc: "doc",
    docx: "word",
    xls: "xls",
    xlsx: "excel",
    ppt: "ppt",
    pptx: "ppt",
    hwp: "hangul",
    hwpx: "hangul",
    txt: "text",
    html: "html",
    htm: "html",
    // 이미지
    jpg: "image",
    jpeg: "image",
    png: "image",
    gif: "image",
    bmp: "image",
    svg: "image",
    webp: "image",
    // 압축
    zip: "zip",
    rar: "zip",
    "7z": "zip",
    tar: "zip",
    gz: "zip",
    // 기타
    msg: "outlook",
  };

  // MIME 타입별 매핑 (확장자가 없을 때 사용)
  const mimeTypeMap = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "word",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      "excel",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      "ppt",
    "application/x-hwp": "hangul",
    "text/plain": "text",
    "text/html": "html",
    "image/jpeg": "image",
    "image/png": "image",
    "image/gif": "image",
    "image/bmp": "image",
    "image/svg+xml": "image",
    "image/webp": "image",
    "application/zip": "zip",
    "application/x-rar-compressed": "zip",
    "application/x-7z-compressed": "zip",
    "application/vnd.ms-outlook": "outlook",
  };

  // 확장자로 먼저 확인
  if (extension && extensionMap[extension]) {
    return extensionMap[extension];
  }

  // MIME 타입으로 변환
  if (mimeType && mimeTypeMap[mimeType]) {
    return mimeTypeMap[mimeType];
  }

  // 기본값
  return "default";
}

/**
 * 중복파일 검증
 * @param {File[]} files - 새로 추가하려는 파일
 * @param {File[]} existingFiles - 기존 파일
 * @param {File[]} newFiles - 새로 추가하려는 파일
 * @param {boolean} allowDuplicate - 중복파일 허용 여부
 * @returns {boolean} 중복파일 여부
 */
export function validationDuplicateFile(
  files,
  existingFiles,
  newFiles,
  allowDuplicate = true
) {
  if (allowDuplicate) return null;

  // 모든 기존 파일 이름 수집
  const allFileNames = [
    ...existingFiles.map((file) => file.name),
    ...newFiles.map((file) => file.name),
  ];

  // 중복된 파일 찾기
  const duplicates = files.filter((file) => allFileNames.includes(file.name));

  if (duplicates.length > 0) {
    return {
      type: "duplicate",
      message: `중복된 파일이 있습니다. ${duplicates
        .map((f) => f.name)
        .join(", ")}`,
      files: duplicates.map((f) => f.name),
    };
  }
  return null;
}

/**
 * 파일 개수 제한 검증
 * @param {number} currentCount - 현재 파일 개수
 * @param {number} newFilesCount - 새로 추가하려는 파일 개수
 * @param {number} maxFiles - 최대 파일 개수
 * @returns {object | null} 검증 결과
 */
export function ValidateMaxFiles(currentCount, newFilesCount, maxFiles) {
  if (!maxFiles) return null;

  const totalCount = currentCount + newFilesCount;

  if (totalCount > maxFiles) {
    return {
      type: "maxFiles",
      message: `최대 ${maxFiles}개까지 선택할 수 있습니다. (현재 ${totalCount}개)`,
      current: totalCount,
      max: maxFiles,
    };
  }

  return null;
}

/**
 * 개별 파일 크기 검증
 * @param {File[]} files - 검증할 파일 배열
 * @param {number} maxSize - 개별 파일 최대 크기 (바이트)
 * @return {Object|null} 여러 객체 또는 null
 */
export function validateFileSize(files, maxSize) {
  if (!maxSize) return null;

  // 크기 초과 파일 찾기
  const overSizeFile = files.filter((file) => file.size > maxSize);

  if (overSizeFile.length > 0) {
    return {
      type: "fileSize",
      message: `파일 크기가 너무 큽니다. ${overSizeFile
        .map((f) => `${f.name} (${formatFileSize(f.size)})`)
        .join(", ")}`,
      files: overSizeFile.map((f) => ({
        name: f.name,
        size: f.size,
        maxSize: maxSize,
      })),
    };
  }

  return null;
}

/**
 * 전체 파일 크기 검증
 * @param {File[]} exsitingFiles - 기존 파일
 * @param {File[]} newFiles - 새로 추가하려는 파일
 * @param {File[]} addtionalFiles - 추가 파일
 * @param {number} maxTotalSize - 최대 전체 파일 크기 (바이트)
 * @return {Object|null} 여러 객체 또는 null
 */
export function validateTotalSize(
  existingFiles,
  newFiles,
  additionalFiles,
  maxTotalSize
) {
  if (!maxTotalSize) return null;

  // 전체 크기 계산
  const existingFileSize = existingFiles.reduce(
    (sum, f) => sum + (f.size || 0),
    0
  );
  const newFileSize = newFiles.reduce((sum, f) => sum + (f.size || 0), 0);
  const additionalFileSize = additionalFiles.reduce(
    (sum, f) => sum + (f.size || 0),
    0
  );
  const totalSize = existingFileSize + newFileSize + additionalFileSize;

  if (totalSize > maxTotalSize) {
    return {
      type: "totalSize",
      message: `전체 파일 크기가 너무 큽니다. (현재: ${formatFileSize(
        totalSize
      )}), 최대: ${formatFileSize(maxTotalSize)}`,
      currentSize: totalSize,
      maxSize: maxTotalSize,
    };
  }

  return null;
}

/**
 * 파일 검증 통합 함수
 */
export function validateFiles(files, options = {}) {
  const {
    existingFiles = [],
    newFiles = [],
    maxFiles,
    maxFileSize,
    maxTotalFileSize,
    allowDuplicate = true,
  } = options;

  const errors = [];

  // 중복 파일 검증
  const duplicateError = validationDuplicateFile(
    files,
    existingFiles,
    newFiles,
    allowDuplicate
  );
  if (duplicateError) errors.push(duplicateError);

  // 파일 개수 검증
  const maxFilesError = ValidateMaxFiles(
    existingFiles.length + newFiles.length,
    files.length,
    maxFiles
  );
  if (maxFilesError) errors.push(maxFilesError);

  // 개별 파일 크기 검증
  const fileSizeError = validateFileSize(files, maxFileSize);
  if (fileSizeError) errors.push(fileSizeError);

  // 전체 파일 크기 검증
  const totalSizeError = validateTotalSize(
    existingFiles,
    newFiles,
    files,
    maxTotalFileSize
  );
  if (totalSizeError) errors.push(totalSizeError);

  return errors;
}
