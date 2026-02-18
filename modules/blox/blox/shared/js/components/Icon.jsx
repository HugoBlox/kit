// biome-ignore lint/correctness/noUnusedImports: Classic Preact JSX runtime may require 'h' for JSX transform
import { h } from "preact";

/**
 * Icon component
 * Renders an SVG icon from a raw SVG string passed from Hugo.
 * Decodes JSON-escaped sequences (\u003c) and HTML entities (&lt;, &quot;, &#34;).
 *
 * SVG sizing strategy:
 * - By default, icons size to 1em (matching current font size) — works universally
 *   for inline icons in buttons, text, lists, etc.
 * - If the caller provides explicit height via style attribute (e.g. style="height: 36px"),
 *   the SVG fills that container with height:100%;width:auto instead.
 * - If the caller provides explicit w-/h- Tailwind classes, those take precedence.
 */
export const Icon = ({ svg, attributes }) => {
  if (!svg) return null;

  // Clean the SVG string: decode HTML entities and TRIM whitespace
  let decoded = String(svg)
    .replace(/\\u003c/gi, "<")
    .replace(/\\u003e/gi, ">")
    .replace(/\\u0026/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&amp;/gi, "&")
    .trim();

  const hasWrapper = /<svg[\s>]/i.test(decoded);

  if (hasWrapper) {
    // Determine SVG sizing: if caller provides explicit height (via style attr),
    // use 100% to fill the container; otherwise default to 1em for self-sizing.
    const callerStyle = attributes?.style || "";
    const hasExplicitHeight = /height\s*:/i.test(String(callerStyle));
    const svgStyle = hasExplicitHeight
      ? "height:100%;width:auto"
      : "height:1em;width:auto";

    decoded = decoded.replace(/^(<svg\b)/i, `$1 style="${svgStyle}"`);

    const wrapperProps = {
      ...attributes,
      class: attributes?.class || "",
    };

    // eslint-disable-next-line lint/security/noDangerouslySetInnerHtml
    return <span {...wrapperProps} dangerouslySetInnerHTML={{ __html: decoded }} />;
  }

  const finalAttributes = {
    class: "inline-block w-4 h-4",
    fill: "currentColor",
    viewBox: "0 0 20 20",
    ...(attributes || {}),
  };

  const attrs = Object.entries(finalAttributes)
    .map(([k, v]) => `${k}="${String(v)}"`)
    .join(" ");

  // eslint-disable-next-line lint/security/noDangerouslySetInnerHtml
  return <span class="inline-block" dangerouslySetInnerHTML={{ __html: `<svg ${attrs}>${decoded}</svg>` }} />;
};
