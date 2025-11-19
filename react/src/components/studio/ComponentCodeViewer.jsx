import { useState } from "react";
import "./ComponentCodeViewer.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * Component Code Viewer
 * 코드 미리보기 및 복사 기능
 */
function ComponentCodeViewer({ code, language = "jsx" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="code-viewer">
      <div className="code-viewer-header">
        <span className="code-viewer-language">{language}</span>
        <button
          className="code-viewer-copy"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={materialDark}
        customStyle={{
          border: 0,
          margin: 0,
        }}
        showLineNumbers
        wrapLines
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default ComponentCodeViewer;
