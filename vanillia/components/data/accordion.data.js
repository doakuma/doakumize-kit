/**
 * Accordion Component Data
 * 아코디언 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Accordion 데이터 등록
window.ComponentData.accordion = {
  type: "accordion",
  id: "componentAccordion",
  title: "Accordion Components",
  variants: [
    {
      title: "Basic Accordion",
      description:
        "기본 아코디언 컴포넌트입니다. 헤더 클릭 시 콘텐츠가 펼쳐지고 접힙니다.",
      items: [
        {
          preview: `<!-- accordion -->
<div class="accordion">
  <div class="accordion__header">
    <button class="accordion__toggle" type="button">
      <i class="icon icon--medium icon--chevron-right"></i>
    </button>
    <div class="accordion__header-content">
      <h5 class="accordion__title">프롬프트 #1</h5>
    </div>
    <div class="accordion__actions">
      <div class="btn-group">
        <button class="btn btn--medium btn--default btn--only-icon">
          <i class="icon icon--medium icon--trash"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="accordion__body">
    <div class="accordion__content">
      <p>
        시스템 프롬프트를 입력해주세요. 이 영역에는 AI
        모델에게 전달할 지시사항이나 컨텍스트 정보를
        작성할 수 있습니다.
      </p>
    </div>
  </div>
</div>
<!--// accordion -->`,
          label: "Basic Accordion (Collapsed)",
        },
        {
          preview: `<!-- accordion -->
<div class="accordion accordion--expanded">
  <div class="accordion__header">
    <button class="accordion__toggle" type="button">
      <i class="icon icon--medium icon--chevron-right"></i>
    </button>
    <div class="accordion__header-content">
      <h5 class="accordion__title">프롬프트 #1</h5>
    </div>
    <div class="accordion__actions">
      <div class="dropdown dropdown--medium" data-placeholder="카테고리 선택">
        <button class="dropdown__trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span class="dropdown__text dropdown__text--placeholder">카테고리 선택</span>
          <span class="dropdown__arrow"></span>
        </button>
        <div class="dropdown__menu">
          <div class="dropdown__item" data-value="design" role="option" tabindex="-1">
            디자인
          </div>
          <div class="dropdown__item" data-value="development" role="option" tabindex="-1">
            개발
          </div>
          <div class="dropdown__item" data-value="marketing" role="option" tabindex="-1">
            마케팅
          </div>
        </div>
      </div>
      <div class="btn-group">
        <button class="btn btn--medium btn--default btn--only-icon">
          <i class="icon icon--medium icon--trash"></i>
        </button>
      </div>
    </div>
  </div>
  <div class="accordion__body">
    <div class="accordion__content">
      <p>
        이 아코디언은 기본적으로 펼쳐진 상태입니다.
        헤더를 클릭하면 접힐 수 있습니다.
      </p>
    </div>
  </div>
</div>
<!--// accordion -->`,
          label: "Basic Accordion (Expanded)",
        },
      ],
    },
    {
      title: "Accordion Group",
      description:
        "여러 아코디언을 그룹으로 묶어 사용할 수 있습니다. 단일 모드에서는 하나만 펼칠 수 있습니다.",
      items: [
        {
          preview: `<!-- accordion-group -->
<div class="accordion-group">
  <div class="accordion accordion--expanded">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #1</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>
          첫 번째 아코디언입니다. 다른 아코디언을 펼치면
          이 아코디언은 자동으로 접힙니다.
        </p>
      </div>
    </div>
  </div>

  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #2</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>두 번째 아코디언입니다.</p>
      </div>
    </div>
  </div>

  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #3</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>세 번째 아코디언입니다.</p>
      </div>
    </div>
  </div>
</div>
<!--// accordion-group -->`,
          label: "Accordion Group (Single Mode)",
        },
        {
          preview: `<!-- accordion-group -->
<div class="accordion-group" data-allow-multiple="true">
  <div class="accordion accordion--expanded">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #1</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>여러 아코디언을 동시에 펼칠 수 있습니다.</p>
      </div>
    </div>
  </div>

  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #2</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>각 아코디언은 독립적으로 작동합니다.</p>
      </div>
    </div>
  </div>

  <div class="accordion">
    <div class="accordion__header">
      <button class="accordion__toggle" type="button">
        <i class="icon icon--medium icon--chevron-right"></i>
      </button>
      <div class="accordion__header-content">
        <h5 class="accordion__title">프롬프트 #3</h5>
      </div>
      <div class="accordion__actions">
        <div class="btn-group">
          <button class="btn btn--medium btn--default btn--only-icon">
            <i class="icon icon--medium icon--trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="accordion__body">
      <div class="accordion__content">
        <p>모든 아코디언을 동시에 펼칠 수 있습니다.</p>
      </div>
    </div>
  </div>
</div>
<!--// accordion-group -->`,
          label: "Accordion Group (Multiple Mode)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Accordion data registered");
