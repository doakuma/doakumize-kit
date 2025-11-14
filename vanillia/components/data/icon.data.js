/**
 * Icon Component Data
 * 모든 아이콘 정보를 포함하는 중앙 데이터 소스
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

/**
 * 아이콘 클래스 정의
 * type: 'mask' = mask-image 기반 (색상 변경 가능)
 * type: 'background' = background-image 기반 (컬러 아이콘)
 */
const iconClasses = {
  file: {
    attatch: { className: "icon--file-attatch", type: "background" },
    ppt: { className: "icon--file-ppt", type: "background" },
    outlook: { className: "icon--file-outlook", type: "background" },
    html: { className: "icon--file-html", type: "background" },
    pdf: { className: "icon--file-pdf", type: "background" },
    text: { className: "icon--file-text", type: "background" },
    image: { className: "icon--file-image", type: "background" },
    hangul: { className: "icon--file-hangul", type: "background" },
    excel: { className: "icon--file-excel", type: "background" },
    word: { className: "icon--file-word", type: "background" },
    tool: { className: "icon--file-tool", type: "background" },
    zip: { className: "icon--file-zip", type: "background" },
  },
  arrow: {
    right: { className: "icon--arrow-right", type: "mask" },
    left: { className: "icon--arrow-left", type: "mask" },
    up: { className: "icon--arrow-up", type: "mask" },
    down: { className: "icon--arrow-down", type: "mask" },
    rightDouble: { className: "icon--arrow-right-double", type: "mask" },
    leftDouble: { className: "icon--arrow-left-double", type: "mask" },
    downSmall: { className: "icon--arrow-down-small", type: "mask" },
    upSmall: { className: "icon--arrow-up-small", type: "mask" },
    back: { className: "icon--arrow-back", type: "mask" },
    backEnd: { className: "icon--arrow-back-end", type: "mask" },
    foward: { className: "icon--arrow-foward", type: "mask" },
    fowardEnd: { className: "icon--arrow-foward-end", type: "mask" },
  },
  commonUI: {
    addpjt: { className: "icon--addpjt", type: "mask" },
    calendar: { className: "icon--calendar", type: "mask" },
    close: { className: "icon--close", type: "mask" },
    check: { className: "icon--check", type: "mask" },
    checkDefault: { className: "icon--check-default", type: "mask" },
    checkPrimary: { className: "icon--check-primary", type: "mask" },
    plus: { className: "icon--plus", type: "mask" },
    minus: { className: "icon--minus", type: "mask" },
    search: { className: "icon--search", type: "mask" },
    edit: { className: "icon--edit", type: "mask" },
    editChip: { className: "icon--edit-chip", type: "mask" },
    delete: { className: "icon--delete", type: "mask" },
    lnb: { className: "icon--lnb", type: "mask" },
    lock: { className: "icon--lock", type: "mask" },
    trash: { className: "icon--trash", type: "mask" },
    settings: { className: "icon--settings", type: "mask" },
    more: { className: "icon--more", type: "mask" },
    move: { className: "icon--move", type: "mask" },
    play: { className: "icon--play", type: "mask" },
    send: { className: "icon--send", type: "mask" },
    save: { className: "icon--save", type: "mask" },
    eye: { className: "icon--eye", type: "mask" },
  },
  infoStatus: {
    infoCircle: { className: "icon--info-circle", type: "mask" },
    info: { className: "icon--info", type: "mask" },
    security: { className: "icon--security", type: "mask" },
    key: { className: "icon--key", type: "mask" },
    msgConfirm: { className: "icon--msg-confirm", type: "mask" },
    msgConfirmIn: { className: "icon--msg-confirm-in", type: "mask" },
    msgError: { className: "icon--msg-error", type: "mask" },
    msgInfo: { className: "icon--msg-info", type: "mask" },
    msgSuccess: { className: "icon--msg-success", type: "mask" },
    msgWarning: { className: "icon--msg-warning", type: "mask" },
  },
  dropdown: {
    arrow: { className: "icon--dropdown-arrow", type: "mask" },
    check: { className: "icon--dropdown-check", type: "mask" },
    chevronDown: { className: "icon--chevron-down", type: "mask" },
    chevronUp: { className: "icon--chevron-up", type: "mask" },
    chevronLeft: { className: "icon--chevron-left", type: "mask" },
    chevronRight: { className: "icon--chevron-right", type: "mask" },
  },
  appSpecific: {
    dashboard: { className: "icon--dashboard", type: "mask" },
    code: { className: "icon--code", type: "mask" },
    chart: { className: "icon--chart", type: "mask" },
    user: { className: "icon--user", type: "mask" },
    members: { className: "icon--members", type: "mask" },
    premium: { className: "icon--premium", type: "mask" },
    docbased: { className: "icon--docbased", type: "mask" },
    webbased: { className: "icon--webbased", type: "mask" },
    apiHistory: { className: "icon--api-history", type: "mask" },
    aiTalk: { className: "icon--aI-talk", type: "mask" },
    attached: { className: "icon--attached", type: "mask" },
    expanding: { className: "icon--expanding", type: "mask" },
    folding: { className: "icon--folding", type: "mask" },
    ragAdd: { className: "icon--rag-add", type: "mask" },
    ragCard: { className: "icon--rag-card", type: "background" },
    ragSecurity: { className: "icon--rag-security", type: "mask" },
    copy: { className: "icon--copy", type: "mask" },
    good: { className: "icon--good", type: "mask" },
    bad: { className: "icon--bad", type: "mask" },
    refresh: { className: "icon--refresh", type: "mask" },
    chatEdit: { className: "icon--chat-edit", type: "mask" },
    dictionary: { className: "icon--dictionary", type: "mask" },
    download: { className: "icon--download", type: "mask" },
    external: { className: "icon--external", type: "mask" },
  },
};

/**
 * 카테고리별 표시 이름
 */
const categoryTitles = {
  arrow: "Arrow Icons",
  commonUI: "Common UI Icons",
  dropdown: "Dropdown Icons",
  infoStatus: "Info / Status Icons",
  appSpecific: "App Specific Icons",
  file: "File Icons",
};

/**
 * Icon 데이터 등록
 */
window.ComponentData.icon = {
  type: "icon",
  id: "componentIcon",
  title: "Icon",
  variants: [
    {
      title: "Icon Sizes",
      items: [
        {
          preview: '<i class="icon icon--small icon--arrow-right"></i>',
          label: "small(16x16)",
        },
        {
          preview: '<i class="icon icon--medium icon--arrow-right"></i>',
          label: "medium(20x20)",
        },
        {
          preview: '<i class="icon icon--large icon--arrow-right"></i>',
          label: "large(24x24)",
        },
        {
          preview: '<i class="icon icon--xlarge icon--arrow-right"></i>',
          label: "xlarge(32x32)",
        },
      ],
    },
    {
      title: "Icon Variations",
      description:
        "아이콘을 클릭하면 해당 아이콘의 HTML 코드를 확인하고 복사할 수 있습니다.",
      categories: iconClasses,
      categoryTitles: categoryTitles,
    },
  ],

  /**
   * Icon Code Modal 설정
   * 아이콘 클릭 시 표시되는 모달의 컨텐츠
   */
  modalConfig: {
    id: "iconCodeModal",
    bodyContent: `
      <!-- 아이콘 미리보기 영역 -->
      <div style="padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px; padding: 20px; background: var(--gray-50); border-radius: 8px;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 24px; margin-bottom: 12px;">
            <div style="text-align: center">
              <i id="iconPreviewSmall" class="icon icon--small" style="color: var(--gray-700)"></i>
              <div style="font-size: 11px; color: var(--gray-600); margin-top: 4px;">16x16</div>
            </div>
            <div style="text-align: center">
              <i id="iconPreviewMedium" class="icon icon--medium" style="color: var(--gray-700)"></i>
              <div style="font-size: 11px; color: var(--gray-600); margin-top: 4px;">20x20</div>
            </div>
            <div style="text-align: center">
              <i id="iconPreviewLarge" class="icon icon--large" style="color: var(--gray-700)"></i>
              <div style="font-size: 11px; color: var(--gray-600); margin-top: 4px;">24x24</div>
            </div>
            <div style="text-align: center">
              <i id="iconPreviewXLarge" class="icon icon--xlarge" style="color: var(--gray-700)"></i>
              <div style="font-size: 11px; color: var(--gray-600); margin-top: 4px;">32x32</div>
            </div>
          </div>
          <div id="iconName" style="font: var(--sub-sb-sm); color: var(--gray-800)"></div>
        </div>

        <!-- 코드 영역 -->
        <div class="icon-code-display">
          <div class="icon-code-header">
            <span class="icon-code-title">HTML 코드</span>
            <button class="btn btn--small btn--default" onclick="copyIconCode()">
              <i class="icon icon--small icon--copy"></i>
              <span>복사</span>
            </button>
          </div>
          <pre class="icon-code-content"><code id="iconCodeContent"></code></pre>
        </div>
      </div>
    `,
    footerButtons:
      '<button class="btn btn--primary" type="button" data-modal-close>닫기</button>',
  },
};

console.log("[ComponentData] Icon data registered");
