/**
 * Component Studio - Main Landing Page Scripts
 * 간단한 인터랙션 처리
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Component Studio] Main page loaded');

  // 카드 호버 효과 강화
  initCardInteractions();

  // "준비 중" 카드 클릭 시 안내
  initComingSoonCards();

  // 스크롤 애니메이션
  initScrollAnimations();
});

/**
 * 카드 인터랙션 초기화
 */
function initCardInteractions() {
  const cards = document.querySelectorAll('.card:not(.card--disabled)');

  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });

    card.addEventListener('click', (e) => {
      console.log('[Card Click]', card.querySelector('.card__title').textContent);
    });
  });
}

/**
 * "준비 중" 카드 처리
 */
function initComingSoonCards() {
  const comingSoonCards = document.querySelectorAll('.card--disabled');

  comingSoonCards.forEach((card) => {
    card.style.cursor = 'not-allowed';

    card.addEventListener('click', (e) => {
      e.preventDefault();
      const title = card.querySelector('.card__title').textContent;
      showComingSoonMessage(title);
    });
  });
}

/**
 * "준비 중" 메시지 표시
 */
function showComingSoonMessage(framework) {
  // 간단한 알림 (나중에 커스텀 모달로 변경 가능)
  const message = `${framework} 버전은 현재 준비 중입니다! 🚧\n\nVanilla 버전을 먼저 확인해보세요 😊`;
  alert(message);
}

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Features 섹션 애니메이션
  const features = document.querySelectorAll('.feature');
  features.forEach((feature, index) => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(20px)';
    feature.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(feature);
  });
}

/**
 * 브라우저 콘솔에 환영 메시지
 */
console.log(`
%c🎨 Component Studio
%cWelcome to Component Studio!
동일한 디자인을 여러 프레임워크로 제공합니다.

📦 Vanilla JS: 사용 가능
⚛️ React: 준비 중
🎭 MUI: 준비 중

Made with ❤️ by Doakumize Kit
`,
  'font-size: 24px; font-weight: bold; color: #26b7dc;',
  'font-size: 14px; color: #666;'
);

