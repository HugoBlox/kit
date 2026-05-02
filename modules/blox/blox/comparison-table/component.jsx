import {Icon} from "../../shared/components/Icon.jsx";

const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>`;
const X_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/></svg>`;
const MINUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M3.75 10a.75.75 0 01.75-.75h11a.75.75 0 010 1.5h-11a.75.75 0 01-.75-.75z" clip-rule="evenodd"/></svg>`;

function renderText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      (_, code) =>
        `<code class="px-1.5 py-0.5 rounded font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">${code}</code>`,
    );
}

// Resolve a cell value into one of: {kind: "check"} | {kind: "cross"} | {kind: "partial", note} | {kind: "text", value, emphasis}
function resolveCell(raw) {
  if (raw === true) return {kind: "check"};
  if (raw === false || raw == null || raw === "") return {kind: "cross"};
  if (typeof raw === "object") {
    if (raw.value === true) return {kind: "check", note: raw.note};
    if (raw.value === false) return {kind: "cross", note: raw.note};
    if (raw.value === "partial" || raw.partial) return {kind: "partial", note: raw.note ?? raw.value};
    return {kind: "text", value: raw.value ?? "", emphasis: raw.emphasis ?? false, note: raw.note};
  }
  const s = String(raw).trim();
  if (s === "true" || s === "yes" || s === "✓") return {kind: "check"};
  if (s === "false" || s === "no" || s === "✗" || s === "—") return {kind: "cross"};
  if (s === "partial" || s === "limited") return {kind: "partial", note: s};
  return {kind: "text", value: s};
}

function CellContent({cell, isHighlighted}) {
  const positiveColor = isHighlighted ? "text-primary-600 dark:text-primary-400" : "text-green-500 dark:text-green-400";
  const partialColor = "text-amber-500 dark:text-amber-400";

  if (cell.kind === "check") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span class={`h-5 w-5 ${positiveColor}`} dangerouslySetInnerHTML={{__html: CHECK_SVG}} />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  if (cell.kind === "cross") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span class="h-5 w-5 text-gray-400 dark:text-gray-500" dangerouslySetInnerHTML={{__html: X_SVG}} />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  if (cell.kind === "partial") {
    return (
      <div class="flex items-center justify-center gap-1.5">
        <span class={`h-5 w-5 ${partialColor}`} dangerouslySetInnerHTML={{__html: MINUS_SVG}} />
        {cell.note && <span class="text-xs text-gray-500 dark:text-gray-400">{cell.note}</span>}
      </div>
    );
  }
  // text — highlighted column gets semibold dark to visually "win" alongside the brand-coloured checks
  const isStrong = cell.emphasis || isHighlighted;
  const weight = isStrong ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300";
  return (
    <div class="text-center">
      <span class={`text-sm ${weight}`}>{cell.value}</span>
      {cell.note && <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cell.note}</div>}
    </div>
  );
}

function DesktopTable({competitors, rows, cta, icon_svgs, rowStriping = false}) {
  const highlightIdx = competitors.findIndex((c) => c.highlight);
  const ctaIconSvg = cta?.icon ? (icon_svgs?.[cta.icon] ?? null) : null;
  const isExtCta = cta?.url && (cta.url.startsWith("http://") || cta.url.startsWith("https://"));
  const highlighted = highlightIdx >= 0 ? competitors[highlightIdx] : null;
  // Column widths: feature label column gets 1.5× a competitor column for readable row labels
  const colWidthPct = 100 / (competitors.length + 1.5);
  const labelColPct = colWidthPct * 1.5;
  const colLeftPct = labelColPct + colWidthPct * (highlightIdx >= 0 ? highlightIdx : 0);

  return (
    // pt-5 reserves vertical space above the table for the ring-tab badge to sit on the column's top edge
    <div class="hidden md:block relative pt-5">
      {/* Card — overflow-visible so the highlight ring can extend above its top edge */}
      <div class="relative rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 overflow-visible shadow-sm">
        {/* Highlight column FILL — paints BEFORE table, behind cells. Cell content sits on top. */}
        {highlightIdx >= 0 && (
          <div
            class="absolute pointer-events-none rounded-2xl bg-primary-50/60 dark:bg-primary-900/20"
            style={`top: -1.25rem; bottom: 0; left: calc(${colLeftPct}% - 4px); width: calc(${colWidthPct}% + 8px);`}
          />
        )}

        {/* Recommended badge — sits on the highlight ring's top edge as a tab */}
        {highlighted?.badge && (
          <div class="absolute z-10" style={`top: -1.25rem; left: calc(${colLeftPct + colWidthPct / 2}%); transform: translate(-50%, -50%);`}>
            <span class="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white shadow-md whitespace-nowrap">
              {highlighted.badge}
            </span>
          </div>
        )}

        <table class="relative w-full">
          <thead>
            <tr>
              <th class="text-left px-6 py-5 align-bottom" style={`width:${labelColPct}%`} />
              {competitors.map((c, i) => {
                const isYou = c.highlight;
                return (
                  <th key={i} class="px-6 py-5 align-bottom text-center" style={`width:${colWidthPct}%`}>
                    <div class={`text-base font-bold ${isYou ? "text-primary-600 dark:text-primary-400" : "text-gray-900 dark:text-white"}`}>
                      {c.name}
                    </div>
                    {c.tagline && <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 font-normal">{c.tagline}</div>}
                    {/* Competitor badges render inline (highlighted column uses the ring-tab instead) */}
                    {c.badge && !isYou && (
                      <div class="mt-2">
                        <span class="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {c.badge}
                        </span>
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {(() => {
              // Track data-row-only index so zebra striping isn't broken by category rows
              let dataIdx = -1;
              return rows.map((row, ri) => {
                const isCategory = row.category === true;
                if (isCategory) {
                  return (
                    <tr key={ri}>
                      <td
                        colSpan={competitors.length + 1}
                        class="px-6 pt-8 pb-3 text-base font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700"
                      >
                        {row.feature}
                      </td>
                    </tr>
                  );
                }
                dataIdx++;
                const values = row.values ?? [];
                const isOdd = rowStriping && dataIdx % 2 === 1;

                // Row-highlight tints the whole row (intentional — the row is the focus).
                // Zebra stripes apply per-cell so cells inside the highlight column can opt out
                // (otherwise the stripe washes out the column's brand tint).
                const cellBg = (ci) => {
                  if (row.highlight) return "bg-primary-100/50 dark:bg-primary-900/25";
                  if (isOdd && ci !== highlightIdx) return "bg-gray-50/70 dark:bg-gray-800/30";
                  return "";
                };
                return (
                  <tr key={ri} class="border-t border-gray-100 dark:border-gray-700/50">
                    <td class={`px-6 py-4 ${cellBg(-1)}`}>
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{row.feature}</div>
                      {row.note && <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.note}</div>}
                    </td>
                    {competitors.map((_, ci) => (
                      <td key={ci} class={`px-6 py-4 ${cellBg(ci)}`}>
                        <CellContent cell={resolveCell(values[ci])} isHighlighted={ci === highlightIdx} />
                      </td>
                    ))}
                  </tr>
                );
              });
            })()}

            {cta?.text && cta?.url && (
              <tr class="border-t border-gray-100 dark:border-gray-700/50">
                <td class="px-6 py-6" />
                {competitors.map((c, ci) => (
                  <td key={ci} class="px-6 py-6 text-center">
                    {ci === highlightIdx && (
                      <a
                        href={cta.url}
                        {...(isExtCta ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                        class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                      >
                        {cta.text}
                        {ctaIconSvg && <Icon svg={ctaIconSvg} attributes={{class: "inline-block", style: "height:1rem;width:auto"}} />}
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>

        {/* Highlight column OUTLINE — paints AFTER the table so row stripes/tints can't interrupt the violet ring. Outline only, no fill (fill is handled by the layer behind the table). */}
        {highlightIdx >= 0 && (
          <div
            class="absolute pointer-events-none ring-2 ring-primary-500 dark:ring-primary-400 rounded-2xl"
            style={`top: -1.25rem; bottom: 0; left: calc(${colLeftPct}% - 4px); width: calc(${colWidthPct}% + 8px);`}
          />
        )}
      </div>
    </div>
  );
}

function MobileCards({competitors, rows, cta, icon_svgs}) {
  const highlightIdx = competitors.findIndex((c) => c.highlight);
  const ordered = highlightIdx >= 0 ? [competitors[highlightIdx], ...competitors.filter((_, i) => i !== highlightIdx)] : competitors;

  const ctaIconSvg = cta?.icon ? (icon_svgs?.[cta.icon] ?? null) : null;
  const isExtCta = cta?.url && (cta.url.startsWith("http://") || cta.url.startsWith("https://"));

  return (
    <div class="md:hidden space-y-4">
      {ordered.map((c) => {
        const ci = competitors.indexOf(c);
        const isYou = c.highlight;
        return (
          <div
            key={ci}
            class={`rounded-2xl p-5 ${isYou ? "ring-2 ring-primary-500 bg-primary-50/40 dark:bg-primary-900/10" : "ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800"}`}
          >
            <div class="flex items-baseline justify-between mb-4">
              <div>
                <div class={`text-lg font-bold ${isYou ? "text-primary-600 dark:text-primary-400" : "text-gray-900 dark:text-white"}`}>{c.name}</div>
                {c.tagline && <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{c.tagline}</div>}
              </div>
              {c.badge && (
                <span
                  class={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${isYou ? "bg-primary-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"}`}
                >
                  {c.badge}
                </span>
              )}
            </div>
            <ul class="space-y-3">
              {rows
                .filter((r) => !r.category)
                .map((row, ri) => (
                  <li key={ri} class="flex items-start justify-between gap-4">
                    <div class="flex-1 min-w-0">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{row.feature}</div>
                      {row.note && <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{row.note}</div>}
                    </div>
                    <div class="flex-shrink-0">
                      <CellContent cell={resolveCell((row.values ?? [])[ci])} isHighlighted={isYou} />
                    </div>
                  </li>
                ))}
            </ul>

            {isYou && cta?.text && cta?.url && (
              <a
                href={cta.url}
                {...(isExtCta ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-all duration-200"
              >
                {cta.text}
                {ctaIconSvg && <Icon svg={ctaIconSvg} attributes={{class: "inline-block", style: "height:1rem;width:auto"}} />}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

export const ComparisonTableBlock = ({content = {}, design = {}, icon_svgs = {}}) => {
  const {title, subtitle, text, competitors = [], rows = [], cta} = content;
  const rowStriping = design.row_striping === true;

  return (
    <div class="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        {(title || subtitle || text) && (
          <div class="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            {subtitle && <p class="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-3">{subtitle}</p>}
            {title && (
              <h2
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                dangerouslySetInnerHTML={{__html: renderText(title)}}
              />
            )}
            {text && <p class="text-lg text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{__html: renderText(text)}} />}
          </div>
        )}

        {competitors.length > 0 && rows.length > 0 && (
          <>
            <DesktopTable competitors={competitors} rows={rows} cta={cta} icon_svgs={icon_svgs} rowStriping={rowStriping} />
            <MobileCards competitors={competitors} rows={rows} cta={cta} icon_svgs={icon_svgs} />
          </>
        )}
      </div>
    </div>
  );
};
