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
  description: "Alert(알림), Dialog(대화), Content(컨텐츠) 세 가지 유형을 제공합니다.",
  variants: [
    {
      title: "Alert",
      description:
        "단순 알림 메시지. OK 버튼 하나만 제공하며, 사용자에게 정보를 전달하는 용도입니다.",
      items: [
        {
          preview: `<button
  class="btn btn--secondary"
  data-modal-open="#demoAlertInfo">
  Info Alert
</button>`,
          label: "modal--alert (info)",
        },
        {
          preview: `<button
  class="btn btn--primary"
  data-modal-open="#demoAlertSuccess">
  Success Alert
</button>`,
          label: "modal--alert (success)",
        },
        {
          preview: `<button
  class="btn btn--warning"
  data-modal-open="#demoAlertWarning">
  Warning Alert
</button>`,
          label: "modal--alert (warning)",
        },
        {
          preview: `<button
  class="btn btn--danger"
  data-modal-open="#demoAlertError">
  Error Alert
</button>`,
          label: "modal--alert (error)",
        },
      ],
    },
    {
      title: "Dialog",
      description:
        "사용자의 확인이 필요한 대화형 모달. 확인/취소 버튼을 제공하며, 중요한 액션 수행 전 사용합니다.",
      items: [
        {
          preview: `<button
  class="btn btn--primary"
  data-modal-open="#demoDialogConfirm">
  Confirm Dialog
</button>`,
          label: "modal--dialog (확인/취소)",
        },
        {
          preview: `<button
  class="btn btn--danger"
  data-modal-open="#demoDialogDelete">
  Delete Dialog
</button>`,
          label: "modal--dialog (삭제 확인)",
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
    // ========================================
    // Alert Modals (알림: OK 버튼만)
    // ========================================
    {
      id: "demoAlertInfo",
      type: "alert",
      html: `<div
  class="modal modal--message modal--alert"
  id="demoAlertInfo"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="demoAlertInfoTitle"
  aria-describedby="demoAlertInfoDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--info"></i>
      <h4 class="modal__title" id="demoAlertInfoTitle">알림</h4>
    </header>
    <div class="modal__body" id="demoAlertInfoDesc">
      작업이 예약되었습니다. 완료 시 알림을 받게 됩니다.
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--primary"
        type="button"
        data-modal-close>
        확인
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoAlertSuccess",
      type: "alert",
      html: `<div
  class="modal modal--message modal--alert"
  id="demoAlertSuccess"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="demoAlertSuccessTitle"
  aria-describedby="demoAlertSuccessDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--check"></i>
      <h4 class="modal__title" id="demoAlertSuccessTitle">저장 완료</h4>
    </header>
    <div class="modal__body" id="demoAlertSuccessDesc">
      변경사항이 성공적으로 저장되었습니다.
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--primary"
        type="button"
        data-modal-close>
        확인
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoAlertWarning",
      type: "alert",
      html: `<div
  class="modal modal--message modal--alert"
  id="demoAlertWarning"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="demoAlertWarningTitle"
  aria-describedby="demoAlertWarningDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--msg-warning"></i>
      <h4 class="modal__title" id="demoAlertWarningTitle">주의</h4>
    </header>
    <div class="modal__body" id="demoAlertWarningDesc">
      네트워크 연결이 불안정합니다. 자동 저장이 지연될 수 있습니다.
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--primary"
        type="button"
        data-modal-close>
        확인
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoAlertError",
      type: "alert",
      html: `<div
  class="modal modal--message modal--alert"
  id="demoAlertError"
  role="alertdialog"
  aria-modal="true"
  aria-labelledby="demoAlertErrorTitle"
  aria-describedby="demoAlertErrorDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--msg-error"></i>
      <h4 class="modal__title" id="demoAlertErrorTitle">오류</h4>
    </header>
    <div class="modal__body" id="demoAlertErrorDesc">
      파일 업로드에 실패했습니다. 파일 형식을 확인해주세요.
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--primary"
        type="button"
        data-modal-close>
        확인
      </button>
    </footer>
  </div>
</div>`,
    },

    // ========================================
    // Dialog Modals (대화: 확인/취소)
    // ========================================
    {
      id: "demoDialogConfirm",
      type: "dialog",
      html: `<div
  class="modal modal--message modal--dialog"
  id="demoDialogConfirm"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoDialogConfirmTitle"
  aria-describedby="demoDialogConfirmDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--info"></i>
      <h4 class="modal__title" id="demoDialogConfirmTitle">변경사항 저장</h4>
    </header>
    <div class="modal__body" id="demoDialogConfirmDesc">
      변경된 내용을 저장하시겠습니까?<br/>
      저장하지 않으면 변경사항이 손실됩니다.
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
        저장
      </button>
    </footer>
  </div>
</div>`,
    },
    {
      id: "demoDialogDelete",
      type: "dialog",
      html: `<div
  class="modal modal--message modal--dialog"
  id="demoDialogDelete"
  role="dialog"
  aria-modal="true"
  aria-labelledby="demoDialogDeleteTitle"
  aria-describedby="demoDialogDeleteDesc">
  <div class="modal__overlay" data-modal-close></div>
  <div class="modal__dialog">
    <button
      class="modal__close"
      type="button"
      aria-label="닫기"
      data-modal-close></button>
    <header class="modal__header">
      <i class="icon icon--small icon--msg-warning"></i>
      <h4 class="modal__title" id="demoDialogDeleteTitle">파일 삭제</h4>
    </header>
    <div class="modal__body" id="demoDialogDeleteDesc">
      선택한 파일을 삭제하시겠습니까?<br/>
      <strong>이 작업은 되돌릴 수 없습니다.</strong>
    </div>
    <footer class="modal__footer">
      <button
        class="btn btn--small btn--default"
        type="button"
        data-modal-close>
        취소
      </button>
      <button
        class="btn btn--small btn--danger btn--start-icon"
        type="button"
        data-modal-close>
        <i class="icon icon--small icon--delete"></i>
        삭제
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
