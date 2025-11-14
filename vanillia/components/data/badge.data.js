/**
 * Badge Component Data
 * 로컬 파일 지원을 위한 데이터 파일
 */

// 전역 데이터 저장소 초기화
if (typeof window.ComponentData === "undefined") {
  window.ComponentData = {};
}

// Badge 데이터 등록
window.ComponentData.badge = {
  type: "badge",
  id: "componentBadge",
  title: "Badge Components",
  variants: [
    {
      title: "Basic States",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard" data-badge-count="5"></span></span>',
          label: "default / standard",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot"></span></span>',
          label: "default / dot",
        },
      ],
    },
    {
      title: "Variants",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--medium" data-badge-count="5"></span></span>',
          label: "standard (default)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium"></span></span>',
          label: "dot",
        },
      ],
    },
    {
      title: "Sizes",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--small"></span></span>',
          label: "small",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium"></span></span>',
          label: "medium (default)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--large"></span></span>',
          label: "large",
        },
      ],
    },
    {
      title: "Colors",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--primary"></span></span>',
          label: "primary",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--secondary"></span></span>',
          label: "secondary",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--error"></span></span>',
          label: "error",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--warning"></span></span>',
          label: "warning",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--success"></span></span>',
          label: "success",
        },
      ],
    },
    {
      title: "Alignment",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--align-tl"></span></span>',
          label: "top-left (tl)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--align-tr"></span></span>',
          label: "top-right (tr)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--align-br"></span></span>',
          label: "bottom-right (br)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--align-bl"></span></span>',
          label: "bottom-left (bl)",
        },
      ],
    },
    {
      title: "With Count",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--medium badge--primary" data-badge-count="5"></span></span>',
          label: "standard with count",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--dot badge--medium badge--primary" data-badge-count="99+"></span></span>',
          label: "dot with count",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--small badge--error" data-badge-count="1"></span></span>',
          label: "small with count",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--large badge--secondary" data-badge-count="100"></span></span>',
          label: "large with count",
        },
      ],
    },
    {
      title: "Real-world Examples",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><button class="btn btn--primary btn--medium">버튼</button><span class="badge badge--dot badge--medium badge--error badge--align-tr"></span></span>',
          label: "button with badge",
        },
        {
          preview:
            '<span class="badge-wrapper"><i class="icon icon--large icon--bell"></i><span class="badge badge--standard badge--small badge--error badge--align-tr" data-badge-count="3"></span></span>',
          label: "icon with badge",
        },
        {
          preview:
            '<span class="badge-wrapper"><span class="chip">태그</span><span class="badge badge--dot badge--medium badge--primary badge--align-tr"></span></span>',
          label: "chip with badge",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>프로필</span><span class="badge badge--dot badge--small badge--success badge--align-br"></span></span>',
          label: "text with badge",
        },
      ],
    },
    {
      title: "Visibility",
      items: [
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--medium badge--primary badge--visible"></span></span>',
          label: "visible (default)",
        },
        {
          preview:
            '<span class="badge-wrapper"><span>알림</span><span class="badge badge--standard badge--medium badge--primary badge--hidden"></span></span>',
          label: "hidden (isVisible: false)",
        },
      ],
    },
  ],
};

console.log("[ComponentData] Badge data registered");
