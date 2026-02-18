/**
 * Stats Block Component - Single source of truth
 * Used for both SSR (via preact-wrapper) and SaaS live preview
 *
 * Layouts: cards | compact | minimal
 * Features: counter animation, per-item icons, stagger reveal
 */

import { useEffect, useRef } from "preact/hooks";
import { Icon } from "../../shared/components/Icon.jsx";

// Simple markdown renderer (shared with Hero)
function renderText(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, "<code>$1</code>");
}

// Extract numeric target from a statistic string like "10,000+" → 10000
function parseTarget(statistic) {
    if (!statistic) return 0;
    const raw = String(statistic).replace(/[^0-9.]/g, "");
    const num = Number(raw);
    return isNaN(num) ? 0 : num;
}

// Extract prefix, number, suffix from "~10,000+" → { prefix: "~", number: "10,000", suffix: "+" }
function extractParts(text) {
    if (!text) return { prefix: "", numberPart: "", suffix: "" };
    const parts = String(text).match(/([^0-9]*)([0-9][0-9,.]*)(.*)/);
    return {
        prefix: parts ? parts[1] : "",
        numberPart: parts ? parts[2] : "",
        suffix: parts ? parts[3] : "",
    };
}

// Counter animation hook
function useCounterAnimation(containerRef) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        function animateCounters(el) {
            el.classList.add("animate");
            const counters = el.querySelectorAll(".counter");

            counters.forEach((counter) => {
                const target = parseTarget(counter.getAttribute("data-target"));
                if (target <= 0) return;

                const { prefix, numberPart, suffix } = extractParts(
                    counter.textContent
                );
                const decimals = (numberPart.split(".")[1] || "").length;
                const formatter = new Intl.NumberFormat(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                });

                if (prefersReducedMotion) {
                    counter.textContent = `${prefix}${formatter.format(target)}${suffix}`;
                    return;
                }

                const duration = 2000;
                const start = Date.now();

                function update() {
                    const now = Date.now();
                    const progress = Math.min((now - start) / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = target * easeOut;
                    counter.textContent = `${prefix}${formatter.format(current)}${suffix}`;
                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounters(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
        );

        // Observe each stat item
        const items = container.querySelectorAll(".stats-item");
        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const vh = window.innerHeight;
            if (rect.top < vh * 0.9 && rect.bottom > 0) {
                animateCounters(item);
            } else {
                observer.observe(item);
            }
        });

        return () => observer.disconnect();
    }, []);
}

// Grid columns class based on item count
function gridColsClass(count) {
    if (count <= 1) return "lg:grid-cols-1";
    if (count === 2) return "lg:grid-cols-2";
    if (count >= 4) return "lg:grid-cols-4";
    return "lg:grid-cols-3";
}

// ─── Stat Item (Cards) ───────────────────────────────────────────────
function StatCard({ item, iconSvg }) {
    return (
        <div class="stats-item group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800">
            {/* Hover gradient */}
            <div class="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div class="relative p-8 text-center">
                {/* Icon */}
                {iconSvg && (
                    <div class="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary-100 dark:bg-primary-900/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon svg={iconSvg} attributes={{ class: "w-8 h-8 text-primary-600 dark:text-primary-400" }} />
                    </div>
                )}

                {/* Statistic */}
                <div class="mb-3">
                    <h3
                        class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 counter"
                        data-target={parseTarget(item.statistic)}
                        dangerouslySetInnerHTML={{ __html: renderText(item.statistic) }}
                    />
                </div>

                {/* Description */}
                <p
                    class="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
                    dangerouslySetInnerHTML={{ __html: renderText(item.description) }}
                />

                {/* Sub-metric */}
                {item.sub_metric && (
                    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {item.sub_metric}
                    </p>
                )}
            </div>
        </div>
    );
}

// ─── Stat Item (Compact) ─────────────────────────────────────────────
function StatCompact({ item, iconSvg }) {
    return (
        <div class="stats-item group p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
            {iconSvg && (
                <div class="inline-flex items-center justify-center w-12 h-12 mb-4 bg-primary-100 dark:bg-primary-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon svg={iconSvg} attributes={{ class: "w-6 h-6 text-primary-600 dark:text-primary-400" }} />
                </div>
            )}

            <h3
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 counter"
                data-target={parseTarget(item.statistic)}
                dangerouslySetInnerHTML={{ __html: renderText(item.statistic) }}
            />

            <p
                class="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderText(item.description) }}
            />
        </div>
    );
}

// ─── Stat Item (Minimal) ─────────────────────────────────────────────
function StatMinimal({ item, iconSvg }) {
    return (
        <div class="stats-item text-center group">
            {iconSvg && (
                <div class="inline-flex items-center justify-center w-14 h-14 mb-4 bg-primary-100 dark:bg-primary-900/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Icon svg={iconSvg} attributes={{ class: "w-7 h-7 text-primary-600 dark:text-primary-400" }} />
                </div>
            )}

            <h3
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-2 counter"
                data-target={parseTarget(item.statistic)}
                dangerouslySetInnerHTML={{ __html: renderText(item.statistic) }}
            />

            <p
                class="text-sm font-medium text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: renderText(item.description) }}
            />
        </div>
    );
}

// ─── Main Stats Block ────────────────────────────────────────────────
export const StatsBlock = ({ content, design, id, icon_svgs }) => {
    const containerRef = useRef(null);
    useCounterAnimation(containerRef);

    const title = content?.title;
    const text = content?.text;
    const items = Array.isArray(content?.items) ? content.items : [];
    const layout = (design?.layout || "cards").toLowerCase();

    const count = Math.max(1, Math.min(items.length, 4));
    const lgCols = gridColsClass(count);
    const baseCols = count === 1 ? "grid-cols-1" : "grid-cols-2";

    // icon_svgs is a dict keyed by icon name, provided by preact-wrapper
    const iconMap = icon_svgs || {};

    return (
        <div class="py-8 sm:py-12 lg:py-16" ref={containerRef}>
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                {(title || text) && (
                    <div class="text-center mb-12 lg:mb-16">
                        {title && (
                            <h2
                                class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                                dangerouslySetInnerHTML={{ __html: renderText(title) }}
                            />
                        )}
                        {text && (
                            <p
                                class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                                dangerouslySetInnerHTML={{ __html: renderText(text) }}
                            />
                        )}
                    </div>
                )}

                {/* Cards Layout */}
                {layout === "cards" && (
                    <div class={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-6 lg:gap-8`}>
                        {items.map((item, idx) => (
                            <StatCard key={idx} item={item} iconSvg={item.icon ? iconMap[item.icon] : null} />
                        ))}
                    </div>
                )}

                {/* Compact Layout */}
                {layout === "compact" && (
                    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div class={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-gray-700`}>
                            {items.map((item, idx) => (
                                <StatCompact key={idx} item={item} iconSvg={item.icon ? iconMap[item.icon] : null} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Minimal Layout */}
                {layout === "minimal" && (
                    <div class={`grid ${baseCols} ${lgCols} gap-8 lg:gap-12`}>
                        {items.map((item, idx) => (
                            <StatMinimal key={idx} item={item} iconSvg={item.icon ? iconMap[item.icon] : null} />
                        ))}
                    </div>
                )}
            </div>

            {/* Animation styles (scoped via container ref) */}
            <style>{`
        .stats-item {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .stats-item.animate {
          opacity: 1;
          transform: translateY(0);
        }
        .stats-item:nth-child(1) { transition-delay: 0ms; }
        .stats-item:nth-child(2) { transition-delay: 150ms; }
        .stats-item:nth-child(3) { transition-delay: 300ms; }
        .stats-item:nth-child(4) { transition-delay: 450ms; }
        .stats-item:nth-child(5) { transition-delay: 600ms; }
      `}</style>
        </div>
    );
};
