/**
 * Modal Component Data
 * 모달(다이얼로그) 컴포넌트 데이터
 *
 * Note: 모달 생성 팩토리 함수는 modal.renderer.js의
 * ModalRenderer.createModal() 정적 메서드를 사용하세요.
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Modal 데이터 등록
window.ComponentData.modal = {
  type: "modal",
  id: "componentModal",
  title: "Modal (Dialog)",
  description: "메시지 팝업과 컨텐츠 팝업의 두 가지 유형을 제공합니다.",
  variants: [
    {
      title: "Message Modal",
      items: [
        {
          preview: `<button
  class="btn btn--primary"
  data-modal-open="#demoMessageModal">
  메시지 팝업 열기
</button>`,
          label: "확인/취소",
        },
      ],
    },
    {
      title: "Content Modal",
      description:
        "다양한 사이즈의 컨텐츠 팝업을 제공합니다. 컨텐츠 양에 따라 적절한 사이즈를 선택할 수 있습니다.",
      items: [
        {
          preview: `<button
  class="btn btn--secondary"
  data-modal-open="#demoContentModal">
  기본 (700px)
</button>`,
          label: "modal--content",
        },
        {
          preview: `<button
  class="btn btn--secondary"
  data-modal-open="#demoContentModalMedium">
  중간 (800px)
</button>`,
          label: "modal--content-medium",
        },
        {
          preview: `<button
  class="btn btn--secondary"
  data-modal-open="#demoContentModalLarge">
  큰 (1200px)
</button>`,
          label: "modal--content-large",
        },
      ],
    },
  ],

  // 실제 Modal HTML (페이지 로드 시 body에 자동 추가됨)
  modals: [
    {
      id: "demoMessageModal",
      type: "message",
      html: `<div
  class="modal modal--message"
  id="demoMessageModal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoMessageTitle"
  aria-describedby="demoMessageDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--msg-warning"></i>
      <h4 class="modal__title" id="demoMessageTitle">File 삭제</h4>
    </header>
    <div class="modal__body" id="demoMessageDesc">
      File을 삭제하시겠습니까?
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--default"
        type="button"
        data-modal-close>
        취소
      </button>
      <button
        class="btn btn--small btn--primary btn--start-icon"
        type="button"
        data-modal-close>
        <i class="icon icon--small icon--check"></i>
        확인
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoContentModal",
      type: "content",
      html: `<div
  class="modal modal--content"
  id="demoContentModal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoContentTitle">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <h4 class="modal__title" id="demoContentTitle">
        기본 크기 모달 (700px)
      </h4>
    </header>
    <div class="modal__body">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          width: 100%;
          background-color: var(--primary-100);
        ">
        <p class="text-h1">기본 크기 모달 (700px)</p>
      </div>
    </div>
    <footer class="modal__footer">
      <button class="btn btn--default" type="button" data-modal-close>
        취소
      </button>
      <button class="btn btn--primary" type="button" data-modal-close>
        저장
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoContentModalMedium",
      type: "content-medium",
      html: `<div
  class="modal modal--content-medium"
  id="demoContentModalMedium"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoContentMediumTitle">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <h4 class="modal__title" id="demoContentMediumTitle">
        중간 크기 모달 (800px)
      </h4>
    </header>
    <div class="modal__body">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          width: 100%;
          background-color: var(--primary-100);
        ">
        <p class="text-h1">중간 크기 모달 (800px)</p>
      </div>
    </div>
    <footer class="modal__footer">
      <button class="btn btn--default" type="button" data-modal-close>
        취소
      </button>
      <button class="btn btn--primary" type="button" data-modal-close>
        저장
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoContentModalLarge",
      type: "content-large",
      html: `<div
  class="modal modal--content-large"
  id="demoContentModalLarge"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoContentLargeTitle">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <h4 class="modal__title" id="demoContentLargeTitle">
        큰 크기 모달 (1200px)
      </h4>
    </header>
    <div class="modal__body">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 300px;
          width: 100%;
          background-color: var(--primary-100);
        ">
        <p class="text-h1">큰 크기 모달 (1200px)</p>
      </div>
    </div>
    <footer class="modal__footer">
      <button class="btn btn--default" type="button" data-modal-close>
        취소
      </button>
      <button class="btn btn--primary" type="button" data-modal-close>
        저장
      </button>
    </footer>
  </div>
</div>`,
    },
    // Note: iconCodeModal은 icon.data.js에서 관리됩니다.
    // IconRenderer가 createModal() 팩토리 함수를 사용하여 동적으로 생성합니다.
  ],
};

console.log("[ComponentData] Modal data registered");
