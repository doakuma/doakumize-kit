/**
 * Footer Component
 * 링크, 커뮤니티, Copyright 정보 포함
 */
function Footer() {
  const footerData = {
    logo: "Component Studio",
    description: "반복 작업은 줄이고, 커스터마이징은 자유롭게",
    version: "v1.0.0",
    sections: [
      {
        title: "Links",
        links: [
          { text: "Components", href: "/components" },
          {
            text: "Documentation",
            href: "https://github.com/doakuma/doakumize-kit",
            external: true,
          },
          {
            text: "License",
            href: "https://github.com/doakuma/doakumize-kit/blob/main/LICENSE",
            external: true,
          },
        ],
      },
      {
        title: "Community",
        links: [
          {
            text: "GitHub",
            href: "https://github.com/doakuma/doakumize-kit",
            external: true,
          },
          {
            text: "Discussions",
            href: "https://github.com/doakuma/doakumize-kit/discussions",
            external: true,
          },
          {
            text: "Issues",
            href: "https://github.com/doakuma/doakumize-kit/issues",
            external: true,
          },
        ],
      },
    ],
    copyright: "© 2025 Component Studio. MIT License.",
    credit: "Built with ❤️ by Doakuma",
  };

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">{footerData.logo}</h3>
            <p className="footer-description">{footerData.description}</p>
            <p className="footer-version">{footerData.version}</p>
          </div>
          {footerData.sections.map((section, idx) => (
            <div key={idx} className="footer-section">
              <h4 className="footer-title">{section.title}</h4>
              <ul className="footer-links">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                      {link.external && (
                        <i class="icon icon--small icon--external"></i>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">{footerData.copyright}</p>
          <p className="footer-credit">{footerData.credit}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

