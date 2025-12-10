/**
 * Overview Component Data
 * Component System 전체 소개 및 가이드
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Overview 데이터 등록
window.ComponentData.overview = {
  type: "overview",
  id: "componentOverview",
  title: "Component System Overview",
  variants: [
    {
      title: "🎭 Component Studio란?",
      description:
        "반복 작업을 줄이고 개발 생산성을 높이는 인터랙티브 컴포넌트 가이드",
      content: `
        <div class="overview-section">
          <h3>🚀 핵심 목적: 생산성 향상</h3>
          <div class="overview-intro-highlight">
            <p>같은 컴포넌트를 반복해서 만드는 시간을 줄입니다</p>
          </div>
          <h4>어떻게 생산성을 높이나요?</h4>
          <div class="overview-steps">
            <div class="overview-step">
              <div class="overview-step__number">1</div>
              <div>
                <strong class="overview-step__title">즉시 사용 가능한 코드</strong>
                <p class="overview-step__desc">미리보기 → 코드 복사 → 프로젝트에 붙여넣기. 디자인부터 다시 시작할 필요 없이 HTML/CSS/JS 모두 준비됨</p>
              </div>
            </div>
            <div class="overview-step">
              <div class="overview-step__number">2</div>
              <div>
                <strong class="overview-step__title">빠른 탐색과 비교</strong>
                <p class="overview-step__desc">모든 변형(variants)을 한 곳에서 확인하고 여러 상태를 동시에 테스트하여 최적의 컴포넌트 빠르게 선택</p>
              </div>
            </div>
            <div class="overview-step">
              <div class="overview-step__number">3</div>
              <div>
                <strong class="overview-step__title">필요한 것만 가져가기</strong>
                <p class="overview-step__desc">Component Generator로 선택적 다운로드. 불필요한 코드 제거하고 번들 크기 최적화 자동화</p>
              </div>
            </div>
            <div class="overview-step">
              <div class="overview-step__number">4</div>
              <div>
                <strong class="overview-step__title">일관된 디자인 시스템</strong>
                <p class="overview-step__desc">CSS Variables로 전체 테마 한 번에 변경. 컴포넌트 간 일관성 자동 유지하고 디자이너-개발자 소통 비용 절감</p>
              </div>
            </div>
            <div class="overview-step">
              <div class="overview-step__number">5</div>
              <div>
                <strong class="overview-step__title">학습 곡선 최소화</strong>
                <p class="overview-step__desc">실제 동작하는 예제로 학습. 문서 찾아 헤매지 않고 팀원 온보딩 시간 단축</p>
              </div>
            </div>
          </div>
          <div class="overview-result">
            <p>⚡ 결과: 버튼 하나 만드는데 30분 → 30초</p>
          </div>
        </div>
      `,
    },
    {
      title: "📦 컴포넌트 시스템 소개",
      description: "Vanilla JavaScript 기반의 경량 UI 컴포넌트 라이브러리",
      content: `
        <div class="overview-section">
          <h3>주요 특징</h3>
          <div class="overview-features">
            <div class="overview-feature">
              <div class="overview-feature__header">
                <i class="icon icon--large icon--check-primary"></i>
                <strong class="overview-feature__title">Zero Dependencies</strong>
              </div>
              <p class="overview-feature__desc">jQuery, React 등 외부 라이브러리 불필요. 순수 JavaScript로 구현되어 가볍고 빠릅니다.</p>
            </div>
            <div class="overview-feature">
              <div class="overview-feature__header">
                <i class="icon icon--large icon--check-primary"></i>
                <strong class="overview-feature__title">CSS Variables 기반</strong>
              </div>
              <p class="overview-feature__desc">디자인 토큰을 변수로 관리. 색상, 타이포그래피, 간격을 한 곳에서 쉽게 커스터마이징할 수 있습니다.</p>
            </div>
            <div class="overview-feature">
              <div class="overview-feature__header">
                <i class="icon icon--large icon--check-primary"></i>
                <strong class="overview-feature__title">모듈형 구조</strong>
              </div>
              <p class="overview-feature__desc">필요한 컴포넌트만 선택하여 사용 가능. 불필요한 코드를 제거하여 번들 크기를 최적화합니다.</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      title: "🗂️ 카테고리 구조",
      description: "컴포넌트는 용도에 따라 5개 카테고리로 구성됩니다",
      content: `
        <div class="overview-section">
          <div class="overview-categories">
            <div class="overview-category overview-category--foundation">
              <div class="overview-category__header">
                <strong class="overview-category__title">Foundation (기초)</strong>
                <span class="overview-category__badge">디자인 시스템의 기본 토큰</span>
              </div>
              <p class="overview-category__desc">Color, Typography, Spacing, Icon - 모든 컴포넌트가 기반하는 디자인 요소들</p>
            </div>
            <div class="overview-category overview-category--form">
              <div class="overview-category__header">
                <strong class="overview-category__title">Form Controls (입력)</strong>
                <span class="overview-category__badge">사용자 입력 요소</span>
              </div>
              <p class="overview-category__desc">Button, Input, Checkbox, Radio, Dropdown, Slider, Switch, Textarea, File Upload, Date Picker</p>
            </div>
            <div class="overview-category overview-category--data">
              <div class="overview-category__header">
                <strong class="overview-category__title">Data Display (표시)</strong>
                <span class="overview-category__badge">데이터 시각화 요소</span>
              </div>
              <p class="overview-category__desc">Table, Chip, Badge, File Card, Tooltip - 정보를 보여주는 컴포넌트들</p>
            </div>
            <div class="overview-category overview-category--feedback">
              <div class="overview-category__header">
                <strong class="overview-category__title">Feedback (피드백)</strong>
                <span class="overview-category__badge">사용자 알림 요소</span>
              </div>
              <p class="overview-category__desc">Modal, Popover - 사용자에게 안내나 확인을 요청하는 컴포넌트들</p>
            </div>
            <div class="overview-category overview-category--navigation">
              <div class="overview-category__header">
                <strong class="overview-category__title">Navigation (네비게이션)</strong>
                <span class="overview-category__badge">콘텐츠 탐색 요소</span>
              </div>
              <p class="overview-category__desc">Tab, Accordion - 콘텐츠 구조화 및 탐색을 돕는 컴포넌트들</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      title: "🏗️ CSS Naming Convention (BEM)",
      description:
        "클래스 이름만으로도 구조와 역할을 파악할 수 있는 BEM 패턴을 따릅니다",
      content: `
        <div class="overview-section">
          <h3>BEM 패턴이란?</h3>
          <p class="text-body-md text-secondary" style="margin-bottom: 24px;">Block Element Modifier 패턴으로, 컴포넌트의 구조를 명확하게 표현하는 네이밍 방법론입니다.</p>
          <div class="overview-bem-list">
            <div class="overview-bem-item overview-bem-item--block">
              <code>block</code>
              <span>독립적인 컴포넌트 (예: btn, modal, card)</span>
            </div>
            <div class="overview-bem-item overview-bem-item--element">
              <code>block__element</code>
              <span>블록 내부의 구성 요소 (예: btn__icon, modal__header)</span>
            </div>
            <div class="overview-bem-item overview-bem-item--modifier">
              <code>block--modifier</code>
              <span>블록의 변형 (예: btn--primary, modal--large)</span>
            </div>
            <div class="overview-bem-item overview-bem-item--combined">
              <code>block__element--modifier</code>
              <span>요소의 변형 (예: btn__icon--left, card__title--bold)</span>
            </div>
          </div>
          <h4>실제 예시: Button 컴포넌트</h4>
          <div class="overview-bem-example">
            <pre><code>&lt;button class="btn btn--primary btn--large"&gt;
  &lt;i class="btn__icon btn__icon--left"&gt;&lt;/i&gt;
  &lt;span class="btn__text"&gt;Click Me&lt;/span&gt;
&lt;/button&gt;</code></pre>
          </div>
          <ul class="overview-bem-list-items">
            <li><code>btn</code> - Block (버튼)</li>
            <li><code>btn--primary</code> - Modifier (Primary 스타일)</li>
            <li><code>btn--large</code> - Modifier (큰 사이즈)</li>
            <li><code>btn__icon</code> - Element (아이콘)</li>
            <li><code>btn__icon--left</code> - Element Modifier (왼쪽 위치)</li>
          </ul>
          <div class="overview-bem-tip">
            <strong>💡 Best Practices</strong>
            <ul>
              <li>블록 이름은 짧고 명확하게 (btn, card, modal)</li>
              <li>수식어는 상태나 변형을 명확히 표현 (--primary, --large, --disabled)</li>
              <li>깊이가 2단계를 넘지 않도록 유지 (block__element만, block__element__subelement ❌)</li>
            </ul>
          </div>
        </div>
      `,
    },
    {
      title: "🚀 빠른 시작",
      description: "3단계로 간단하게 시작할 수 있습니다",
      content: `
        <div class="overview-section">
          <div class="overview-quickstart-steps">
            <div>
              <div class="overview-quickstart-step__header">
                <div class="overview-step__number">1</div>
                <strong class="text-h5">CSS 로드</strong>
              </div>
              <div class="overview-quickstart-step__code">
                <pre><code>&lt;link rel="stylesheet" href="styles/common.css"&gt;</code></pre>
              </div>
            </div>
            <div>
              <div class="overview-quickstart-step__header">
                <div class="overview-step__number">2</div>
                <strong class="text-h5">컴포넌트 사용</strong>
              </div>
              <div class="overview-quickstart-step__code">
                <pre><code>&lt;button class="btn btn--primary"&gt;Click Me&lt;/button&gt;
&lt;input class="input" placeholder="Enter text"&gt;
&lt;div class="chip chip--primary"&gt;Tag&lt;/div&gt;</code></pre>
              </div>
            </div>
            <div>
              <div class="overview-quickstart-step__header">
                <div class="overview-step__number">3</div>
                <strong class="text-h5">JS 초기화</strong>
              </div>
              <div class="overview-quickstart-step__code">
                <pre><code>&lt;script src="components.js"&gt;&lt;/script&gt;
&lt;script&gt;
  window.VanillaComponents.initAll();
&lt;/script&gt;</code></pre>
              </div>
            </div>
          </div>
          <div class="overview-quickstart-success">
            <p>✨ 이게 전부입니다! 이제 왼쪽 메뉴에서 원하는 컴포넌트를 탐색하고 코드를 복사하여 사용하세요.</p>
          </div>
        </div>
      `,
    },
    {
      title: "🎯 다음 단계",
      description: "더 자세한 내용은 각 섹션을 탐색해보세요",
      content: `
        <div class="overview-section">
          <div class="overview-next-grid">
            <a href="#" data-nav-link="color" class="overview-next-link">
              <i class="icon icon--medium icon--palette"></i>
              <div>
                <strong class="overview-next-link__title">Color 시스템</strong>
                <span class="overview-next-link__desc">전체 컬러 팔레트 및 Variable 규칙</span>
              </div>
            </a>
            <a href="#" data-nav-link="typography" class="overview-next-link">
              <i class="icon icon--medium icon--text"></i>
              <div>
                <strong class="overview-next-link__title">Typography 시스템</strong>
                <span class="overview-next-link__desc">폰트 크기, 굵기, 행간 및 Font Family</span>
              </div>
            </a>
            <a href="#" data-nav-link="button" class="overview-next-link">
              <i class="icon icon--medium icon--code"></i>
              <div>
                <strong class="overview-next-link__title">컴포넌트 둘러보기</strong>
                <span class="overview-next-link__desc">Button, Input 등 다양한 컴포넌트</span>
              </div>
            </a>
            <a href="generator.html" class="overview-next-link">
              <i class="icon icon--medium icon--download"></i>
              <div>
                <strong class="overview-next-link__title">Component Generator</strong>
                <span class="overview-next-link__desc">필요한 컴포넌트만 선택하여 다운로드</span>
              </div>
            </a>
          </div>
        </div>
      `,
    },
  ],
};

console.log("[ComponentData] Overview data registered");
