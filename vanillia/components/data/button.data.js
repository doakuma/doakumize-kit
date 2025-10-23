/**
 * Button Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Button 데이터 등록
window.ComponentData.button = {
  type: "button",
  id: "componentButton",
  title: "Button Components",
  variants: [
    {
      title: "Small Buttons (작은 버튼)",
      items: [
        {
          preview:
            '<button class="btn btn--primary btn--small">Primary</button>',
          label: "primary / small",
        },
        {
          preview:
            '<button class="btn btn--secondary btn--small">Secondary</button>',
          label: "secondary / small",
        },
        {
          preview:
            '<button class="btn btn--default btn--small">Default</button>',
          label: "default / small",
        },
      ],
    },
    {
      title: "Medium Buttons (중간 버튼)",
      items: [
        {
          preview:
            '<button class="btn btn--primary btn--medium">Primary</button>',
          label: "primary / medium",
        },
        {
          preview:
            '<button class="btn btn--secondary btn--medium">Secondary</button>',
          label: "secondary / medium",
        },
        {
          preview:
            '<button class="btn btn--default btn--medium">Default</button>',
          label: "default / medium",
        },
      ],
    },
    {
      title: "Large Buttons (큰 버튼)",
      items: [
        {
          preview:
            '<button class="btn btn--primary btn--large">Primary</button>',
          label: "primary / large",
        },
        {
          preview:
            '<button class="btn btn--secondary btn--large">Secondary</button>',
          label: "secondary / large",
        },
        {
          preview:
            '<button class="btn btn--default btn--large">Default</button>',
          label: "default / large",
        },
      ],
    },
    {
      title: "Disabled State",
      items: [
        {
          preview:
            '<button class="btn btn--primary btn--disabled" disabled>Disabled Primary</button>',
          label: "primary / disabled",
        },
        {
          preview:
            '<button class="btn btn--secondary btn--disabled" disabled>Disabled Secondary</button>',
          label: "secondary / disabled",
        },
        {
          preview:
            '<button class="btn btn--default btn--disabled" disabled>Disabled Default</button>',
          label: "default / disabled",
        },
      ],
    },
    {
      title: "Buttons with Icon",
      items: [
        {
          preview:
            '<button class="btn btn--primary btn--medium btn--start-icon"><i class="icon icon--medium icon--plus"></i>시작 아이콘</button>',
          label: "medium / start icon",
        },
        {
          preview:
            '<button class="btn btn--secondary btn--medium btn--end-icon">끝 아이콘<i class="icon icon--medium icon--arrow-right"></i></button>',
          label: "medium / end icon",
        },
        {
          preview:
            '<button class="btn btn--default btn--medium btn--only-icon"><i class="icon icon--medium icon--check"></i></button>',
          label: "medium / only icon",
        },
      ],
    },
    {
      title: "Text Buttons",
      items: [
        {
          preview: '<button class="btn btn--text">텍스트 버튼</button>',
          label: "text / primary (underline)",
        },
        {
          preview:
            '<button class="btn btn--text btn--primary">텍스트 버튼</button>',
          label: "text / secondary (underline)",
        },
        {
          preview:
            '<button class="btn btn--text btn--disabled" disabled>텍스트 버튼</button>',
          label: "text / disabled",
        },
      ],
    },
    {
      title: "Gradient Point Buttons (그라데이션 포인트 버튼)",
      items: [
        {
          preview:
            '<button class="btn btn--point btn--medium">프라이머리 버튼</button>',
          label: "gradient / medium",
        },
        {
          preview:
            '<button class="btn btn--point btn--medium btn--disabled" disabled>프라이머리 버튼</button>',
          label: "gradient / disabled",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Button data registered");
