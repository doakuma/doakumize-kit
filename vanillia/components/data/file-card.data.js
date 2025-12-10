/**
 * File Card Component Data
 * 파일 리소스 카드 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// File Card 데이터 등록
window.ComponentData["file-card"] = {
  type: "file-card",
  id: "componentFileCard",
  title: "File Card",
  description:
    "파일 리소스를 표시하는 카드. 소유자에 따른 액션과 선택(체크박스) 상태를 지원합니다.",
  variants: [
    {
      title: "Default",
      items: [
        {
          preview: `<div class="file-card" tabindex="0">
  <i class="icon icon--large icon--file-pdf"></i>
  <div class="file-card__body">
    <div class="file-card__meta">
      <span class="file-card__owner">홍길동 선임</span>
      <span class="file-card__tag">고객 상담</span>
      <span class="file-card__size">2.4MB</span>
    </div>
    <div class="file-card__title">
      제품 매뉴얼 데이터
    </div>
  </div>
  <i class="icon icon--medium icon--lock"></i>
</div>`,
          label: "Other / CheckBox: No",
        },
        {
          preview: `<div class="file-card file-card--me" tabindex="0">
  <i class="icon icon--large icon--file-pdf"></i>
  <div class="file-card__body">
    <div class="file-card__meta">
      <span class="file-card__owner file-card__owner--me">내가 업로드한 RAG</span>
      <span class="file-card__tag">고객 상담</span>
      <span class="file-card__size">2.4MB</span>
    </div>
    <div class="file-card__title">
      제품 매뉴얼 데이터
    </div>
  </div>
  <button class="btn btn--medium btn--icon-only" aria-label="삭제">
    <i class="icon icon--medium icon--trash"></i>
  </button>
</div>`,
          label: "Me / CheckBox: No",
        },
      ],
    },
    {
      title: "With Checkbox",
      items: [
        {
          preview: `<div class="file-card file-card--selectable" tabindex="0">
  <label class="chk">
    <input type="checkbox" class="chk__input" />
    <span class="chk__box" aria-hidden="true"></span>
  </label>
  <i class="icon icon--large icon--file-pdf"></i>
  <div class="file-card__body">
    <div class="file-card__meta">
      <span class="file-card__owner">홍길동 선임</span>
      <span class="file-card__tag">고객 상담</span>
      <span class="file-card__size">2.4MB</span>
    </div>
    <div class="file-card__title">제품 매뉴얼 데이터</div>
  </div>
  <i class="icon icon--medium icon--lock"></i>
</div>`,
          label: "Other / CheckBox: Yes",
        },
        {
          preview: `<div class="file-card file-card--me file-card--selectable file-card--selected" tabindex="0">
  <label class="chk">
    <input type="checkbox" class="chk__input" checked />
    <span class="chk__box" aria-hidden="true"></span>
  </label>
  <i class="icon icon--large icon--file-pdf"></i>
  <div class="file-card__body">
    <div class="file-card__meta">
      <span class="file-card__owner file-card__owner--me">내가 업로드한 RAG</span>
      <span class="file-card__tag">고객 상담</span>
      <span class="file-card__size">2.4MB</span>
    </div>
    <div class="file-card__title">제품 매뉴얼 데이터</div>
  </div>
  <button class="btn btn--medium btn--icon-only" aria-label="삭제">
    <i class="icon icon--medium icon--trash"></i>
  </button>
</div>`,
          label: "Me / CheckBox: Yes (Selected)",
        },
      ],
    },
    {
      title: "Reverse",
      items: [
        {
          preview: `<div class="file-card" tabindex="0">
  <i class="icon icon--large icon--file-tool"></i>
  <div class="file-card__body file-card__reverse">
    <div class="file-card__meta">
      <span class="file-card__description">Tool의 설명 텍스트가 들어갑니다. Tool의 설명 텍스트가 들어갑니다. Tool의 설명 텍스트가 들어갑니다.</span>
    </div>
    <div class="file-card__title">
      get_url_for_user_image
      <span class="chip chip--rounded chip--basic chip--green">내부 함수</span>
      <span class="chip chip--rounded chip--basic chip--purple">오케스트레이션</span>
    </div>
  </div>
  <button class="btn btn--medium btn--icon-only" aria-label="수정">
    <i class="icon icon--medium icon--edit"></i>
  </button>
  <button class="btn btn--medium btn--icon-only" aria-label="삭제">
    <i class="icon icon--medium icon--trash"></i>
  </button>
</div>`,
          label: "CheckBox: No",
        },
        {
          preview: `<div class="file-card file-card--selectable" tabindex="0">
  <label class="chk">
    <input type="checkbox" class="chk__input" />
    <span class="chk__box" aria-hidden="true"></span>
  </label>
  <i class="icon icon--large icon--file-tool"></i>
  <div class="file-card__body file-card__reverse">
    <div class="file-card__meta">
      <span class="file-card__description">Tool의 설명 텍스트가 들어갑니다. Tool의 설명 텍스트가 들어갑니다. Tool의 설명 텍스트가 들어갑니다.</span>
    </div>
    <div class="file-card__title">
      get_url_for_user_image
      <span class="chip chip--rounded chip--basic chip--green">내부 함수</span>
      <span class="chip chip--rounded chip--basic chip--purple">오케스트레이션</span>
    </div>
  </div>
  <button class="btn btn--medium btn--icon-only" aria-label="삭제">
    <i class="icon icon--medium icon--trash"></i>
  </button>
</div>`,
          label: "CheckBox: Yes",
        },
      ],
    },
  ],
};

console.log("[ComponentData] File Card data registered");
