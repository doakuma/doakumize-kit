import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/Icon";
import {
  getFileIconType,
  formatFileSize,
  validateFiles,
} from "../../../utils/fileUtils";

export const FileUpload = (props) => {
  const {
    id,
    name,
    multiple = false,
    label = "파일 선택",
    disabled = false,
    onChange,
    onRemove,
    existingFiles = [],
    //validation props
    maxFiles,
    maxFileSize,
    maxTotalFileSize,
    allowDuplicate = true,
    onError,
    ...rest
  } = props;
  const [newFiles, setNewFiles] = useState([]);
  // const [fileError, setFileError] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // validation
    const errors = validateFiles(files, {
      existingFiles: existingFiles || [],
      newFiles: newFiles || [],
      maxFiles,
      maxFileSize,
      maxTotalFileSize: maxTotalFileSize,
      allowDuplicate,
    });

    // 에러 발생 시 에러 처리 후 파일 추가 안 함
    if (errors.length > 0) {
      if (onError) {
        onError(errors);
      } else {
        // 기본 에러 처리
        console.error("파일 검증 실패", errors);
        errors.forEach((error) => {
          alert(error.message);
        });
      }
      e.target.value = "";
      // setFileError(errors);
      return;
    }

    if (multiple) {
      setNewFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      setNewFiles(files.length > 0 ? [files[0]] : []);
    }

    if (onChange) {
      onChange({
        target: {
          name: e.target.name,
          files: multiple ? files : files.length > 0 ? [files[0]] : [],
        },
      });
    }
  };

  const handleRemove = (file) => {
    if (file.isExisting) {
      if (onRemove) {
        onRemove(file);
      }
    } else {
      const updatedFiles = newFiles.filter((f) => f.name !== file.name);
      setNewFiles(updatedFiles);

      if (onChange) {
        onChange({
          target: {
            name,
            files: updatedFiles,
          },
        });
      }
    }
  };

  const allFiles = useMemo(
    () => [
      ...existingFiles.map((file) => ({ ...file, isExisting: true })),
      ...newFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: file,
        isExisting: false,
      })),
    ],
    [existingFiles, newFiles]
  );
  return (
    <div className="file-upload">
      <input
        type="file"
        id={id}
        className="file-upload__input"
        name={name}
        multiple={multiple}
        disabled={disabled}
        onChange={handleFileChange}
        {...rest}
      />
      <label htmlFor={id} className="file-upload__label">
        <Icon name="upload" />
        <span className="file-upload__label-text">{label}</span>
      </label>
      {allFiles.length > 0 && (
        <div className="file-upload__preview">
          {allFiles.map((file) => {
            const generateKeys = file.isExisting
              ? `ext-${file.name}`
              : file.name;
            return (
              <div className="file-upload__item" key={generateKeys}>
                <Icon name={`file-${getFileIconType(file.name, file.type)}`} />
                <div className="file-upload__item-content">
                  <span className="file-upload__item-name">{file.name}</span>
                  <span className="file-upload__item-size">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  className="file-upload__remove"
                  aria-label="파일 삭제"
                  onClick={() => handleRemove(file)}
                >
                  <Icon name="close" />
                </button>
              </div>
            );
          })}
        </div>
      )}
      {/* {fileError.length > 0 &&
        fileError.map((error) => {
          return <>{error.message}</>;
        })} */}
    </div>
  );
};

FileUpload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  existingFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // 파일 이름 (필수)
      size: PropTypes.number.isRequired, // 파일 크기 바이트 (필수)
      type: PropTypes.string, // MIME 타입 (선택)
      lastModified: PropTypes.number, // 마지막 수정 시간 (선택)
      // 기타 사용자 정의 속성도 허용
    })
  ),
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  maxTotalFileSize: PropTypes.number,
  allowDuplicate: PropTypes.bool,
  onError: PropTypes.func,
};

FileUpload.defaultProps = {
  multiple: false,
  label: "파일 선택",
  disabled: false,
  allowDuplicate: true,
};
