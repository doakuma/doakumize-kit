/**
 * Slider Component Data
 * 슬라이더 컴포넌트 데이터
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Slider 데이터 등록
window.ComponentData.slider = {
  type: "slider",
  id: "componentSlider",
  title: "Slider Components",
  description:
    "토큰 속도, 파일 크기 등 수치 값을 선택할 때 사용하는 슬라이더 컴포넌트입니다.",
  variants: [
    {
      title: "기본 상태",
      items: [
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">50K</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">tokens/minute</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100000"
      value="50000"
      step="1000"
      aria-label="토큰 속도 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0</span>
    <span class="slider-mid-label">1,000</span>
    <span class="slider-max-label">100,000</span>
  </div>
</div>`,
          label: "기본",
        },
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">25K</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">tokens/minute</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100000"
      value="25000"
      step="1000"
      aria-label="토큰 속도 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0</span>
    <span class="slider-mid-label">1,000</span>
    <span class="slider-max-label">100,000</span>
  </div>
</div>`,
          label: "중간값",
        },
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">100K</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">tokens/minute</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100000"
      value="100000"
      step="1000"
      aria-label="토큰 속도 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0</span>
    <span class="slider-mid-label">1,000</span>
    <span class="slider-max-label">100,000</span>
  </div>
</div>`,
          label: "최대값",
        },
      ],
    },
    {
      title: "비활성화 상태",
      items: [
        {
          preview: `<div class="slider-container slider-container--disabled">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">50K</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">tokens/minute</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100000"
      value="50000"
      step="1000"
      disabled
      aria-label="토큰 속도 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0</span>
    <span class="slider-mid-label">1,000</span>
    <span class="slider-max-label">100,000</span>
  </div>
</div>`,
          label: "비활성화",
        },
      ],
    },
    {
      title: "다양한 단위",
      items: [
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">5MB</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">파일 크기</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100"
      value="50"
      step="1"
      aria-label="파일 크기 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0MB</span>
    <span class="slider-mid-label">50MB</span>
    <span class="slider-max-label">100MB</span>
  </div>
</div>`,
          label: "파일 크기",
        },
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">75%</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">진행률</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100"
      value="75"
      step="1"
      aria-label="진행률 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0%</span>
    <span class="slider-mid-label">50%</span>
    <span class="slider-max-label">100%</span>
  </div>
</div>`,
          label: "진행률",
        },
      ],
    },
    {
      title: "소수점 값",
      items: [
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">2.5MB</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">파일 크기</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="10"
      value="2.5"
      step="0.1"
      aria-label="소수점 파일 크기 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0MB</span>
    <span class="slider-mid-label">5MB</span>
    <span class="slider-max-label">10MB</span>
  </div>
</div>`,
          label: "소수점 파일 크기",
        },
        {
          preview: `<div class="slider-container">
  <!-- 상단 영역 -->
  <div class="slider-header">
    <div class="slider-value">
      <span class="slider-current-value">87.5%</span>
    </div>
    <div class="slider-unit">
      <span class="slider-unit-text">진행률</span>
    </div>
  </div>

  <!-- 슬라이더 영역 -->
  <div class="slider-wrapper">
    <input
      type="range"
      class="slider-input"
      min="0"
      max="100"
      value="87.5"
      step="0.5"
      aria-label="소수점 진행률 설정" />
    <div class="slider-track-overlay"></div>
  </div>

  <!-- 하단 영역 -->
  <div class="slider-labels">
    <span class="slider-min-label">0%</span>
    <span class="slider-mid-label">50%</span>
    <span class="slider-max-label">100%</span>
  </div>
</div>`,
          label: "소수점 진행률",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Slider data registered");
