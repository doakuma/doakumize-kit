/**
 * File Upload Component Data
 * 파일 업로드 컴포넌트 데이터 정의
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// File Upload 데이터 등록
window.ComponentData["file-upload"] = {
  type: "file-upload",
  id: "componentFileUpload",
  title: "File Upload",
  description: "파일을 업로드하는 컴포넌트입니다.",
  variants: [
    {
      title: "Default",
      items: [
        {
          preview: `<div class="file-upload" data-name="fileUpload">
  <input type="file" id="fileUpload1" class="file-upload__input" name="fileUpload">
  <label for="fileUpload1" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Default (single)",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadSingle" data-multiple="false">
  <input type="file" id="fileUpload1b" class="file-upload__input" name="fileUploadSingle">
  <label for="fileUpload1b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">제품-매뉴얼-2024.pdf</span>
            <span class="file-upload__item-size">2.4 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Default (single) - 파일 있음",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadMultiple" data-multiple="true">
  <input type="file" id="fileUpload2" class="file-upload__input" name="fileUploadMultiple" multiple>
  <label for="fileUpload2" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Multiple",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadMultipleFiles" data-multiple="true">
  <input type="file" id="fileUpload2b" class="file-upload__input" name="fileUploadMultipleFiles" multiple>
  <label for="fileUpload2b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">제품-매뉴얼-2024.pdf</span>
            <span class="file-upload__item-size">2.4 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-image"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">상품-이미지.jpg</span>
            <span class="file-upload__item-size">845.2 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-doc"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">회의록-2024-12.docx</span>
            <span class="file-upload__item-size">156.8 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Multiple - 파일 있음",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadDisabled" data-disabled="true">
  <input type="file" id="fileUpload3" class="file-upload__input" name="fileUploadDisabled" disabled>
  <label for="fileUpload3" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Disabled",
        },
      ],
    },
    {
      title: "Drag and Drop(기능 구현 예정)",
      items: [
        {
          preview: `<div class="file-upload" data-name="fileUploadDragDrop" data-multiple="true">
  <input type="file" id="fileUpload10" class="file-upload__input" name="fileUploadDragDrop" multiple>
  <label for="fileUpload10" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택 또는 드래그 앤 드롭</span>
  </label>
  <div class="file-upload__preview file-upload__preview--empty">
    <div class="file-upload__dropzone">
      <i class="icon icon--large icon--attached"></i>
      <p class="file-upload__dropzone-text">파일을 드래그하여 놓거나, 버튼을 클릭하여 선택하세요</p>
    </div>
  </div>
</div>`,
          label: "Multiple with Drag & Drop",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadDragDropActive">
  <input type="file" id="fileUpload11" class="file-upload__input" name="fileUploadDragDropActive" multiple>
  <label for="fileUpload11" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택 또는 드래그 앤 드롭</span>
  </label>
  <div class="file-upload__preview file-upload__preview--dragover file-upload__preview--empty">
    <div class="file-upload__dropzone">
      <i class="icon icon--large icon--attached"></i>
      <p class="file-upload__dropzone-text">파일을 드래그하여 놓거나, 버튼을 클릭하여 선택하세요</p>
    </div>
  </div>
</div>`,
          label: "Drag Over State (빈 상태)",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadDragDropWithFiles">
  <input type="file" id="fileUpload13" class="file-upload__input" name="fileUploadDragDropWithFiles" multiple>
  <label for="fileUpload13" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택 또는 드래그 앤 드롭</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">sample-document.pdf</span>
            <span class="file-upload__item-size">245.5 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">sample-document.pdf</span>
            <span class="file-upload__item-size">245.5 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">sample-document.pdf</span>
            <span class="file-upload__item-size">245.5 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">sample-document.pdf</span>
            <span class="file-upload__item-size">245.5 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Drag Over State (파일 있을 때)",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadDragDropSingle">
  <label class="file-upload__field-label">첨부 파일</label>
  <input type="file" id="fileUpload12" class="file-upload__input" name="fileUploadDragDropSingle">
  <label for="fileUpload12" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택 또는 드래그 앤 드롭</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Single with Label & Drag & Drop",
        },
      ],
    },
    {
      title: "With Label",
      items: [
        {
          preview: `<div class="file-upload" data-name="fileUploadWithLabel" data-label="첨부 파일">
  <label class="file-upload__field-label">첨부 파일</label>
  <input type="file" id="fileUpload4" class="file-upload__input" name="fileUploadWithLabel">
  <label for="fileUpload4" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "With Label",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadWithLabelFiles" data-label="첨부 파일">
  <label class="file-upload__field-label">첨부 파일</label>
  <input type="file" id="fileUpload4b" class="file-upload__input" name="fileUploadWithLabelFiles">
  <label for="fileUpload4b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">문서-첨부.pdf</span>
            <span class="file-upload__item-size">1.2 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "With Label - 파일 있음",
        },
      ],
    },
    {
      title: "Sizes",
      items: [
        {
          preview: `<div class="file-upload file-upload--small" data-name="fileUploadSmall">
  <input type="file" id="fileUpload5" class="file-upload__input" name="fileUploadSmall">
  <label for="fileUpload5" class="file-upload__label">
    <i class="icon icon--small icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Small",
        },
        {
          preview: `<div class="file-upload file-upload--small" data-name="fileUploadSmallFiles">
  <input type="file" id="fileUpload5b" class="file-upload__input" name="fileUploadSmallFiles">
  <label for="fileUpload5b" class="file-upload__label">
    <i class="icon icon--small icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-text"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">readme.txt</span>
            <span class="file-upload__item-size">2.3 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Small - 파일 있음",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadMedium">
  <input type="file" id="fileUpload6" class="file-upload__input" name="fileUploadMedium">
  <label for="fileUpload6" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Medium (기본)",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadMediumFiles">
  <input type="file" id="fileUpload6b" class="file-upload__input" name="fileUploadMediumFiles">
  <label for="fileUpload6b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-xls"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">매출-현황-2024.xlsx</span>
            <span class="file-upload__item-size">456.7 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Medium - 파일 있음",
        },
        {
          preview: `<div class="file-upload file-upload--large" data-name="fileUploadLarge">
  <input type="file" id="fileUpload7" class="file-upload__input" name="fileUploadLarge">
  <label for="fileUpload7" class="file-upload__label">
    <i class="icon icon--large icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Large",
        },
        {
          preview: `<div class="file-upload file-upload--large" data-name="fileUploadLargeFiles">
  <input type="file" id="fileUpload7b" class="file-upload__input" name="fileUploadLargeFiles">
  <label for="fileUpload7b" class="file-upload__label">
    <i class="icon icon--large icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">프로젝트-보고서-최종.pdf</span>
            <span class="file-upload__item-size">5.2 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Large - 파일 있음",
        },
      ],
    },
    {
      title: "Orientation",
      items: [
        {
          preview: `<div class="file-upload" data-name="fileUploadVertical">
  <input type="file" id="fileUpload8" class="file-upload__input" name="fileUploadVertical">
  <label for="fileUpload8" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Vertical (기본)",
        },
        {
          preview: `<div class="file-upload" data-name="fileUploadVerticalFiles">
  <input type="file" id="fileUpload8b" class="file-upload__input" name="fileUploadVerticalFiles">
  <label for="fileUpload8b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-image"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">배경-이미지.png</span>
            <span class="file-upload__item-size">1.8 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-image"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">로고.png</span>
            <span class="file-upload__item-size">245.3 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">문서.pdf</span>
            <span class="file-upload__item-size">456 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Vertical - 파일 있음 (세로 나열)",
        },
        {
          preview: `<div class="file-upload file-upload--horizontal" data-name="fileUploadHorizontal">
  <input type="file" id="fileUpload9" class="file-upload__input" name="fileUploadHorizontal">
  <label for="fileUpload9" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview"></div>
</div>`,
          label: "Horizontal",
        },
        {
          preview: `<div class="file-upload file-upload--horizontal" data-name="fileUploadHorizontalFiles">
  <input type="file" id="fileUpload9b" class="file-upload__input" name="fileUploadHorizontalFiles">
  <label for="fileUpload9b" class="file-upload__label">
    <i class="icon icon--medium icon--attached"></i>
    <span class="file-upload__label-text">파일 선택</span>
  </label>
  <div class="file-upload__preview">
    <div class="file-upload__list">
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-zip"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">자료-모음.zip</span>
            <span class="file-upload__item-size">12.5 MB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-pdf"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">문서.pdf</span>
            <span class="file-upload__item-size">456 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
      <div class="file-upload__item">
        <div class="file-upload__item-content">
          <i class="icon icon--large icon--file-image"></i>
          <div class="file-upload__item-info">
            <span class="file-upload__item-name">이미지.jpg</span>
            <span class="file-upload__item-size">845 KB</span>
          </div>
        </div>
        <button type="button" class="file-upload__remove" aria-label="파일 삭제">
          <i class="icon icon--small icon--close"></i>
        </button>
      </div>
    </div>
  </div>
</div>`,
          label: "Horizontal - 파일 있음 (가로 나열)",
        },
      ],
    },
  ],
};
