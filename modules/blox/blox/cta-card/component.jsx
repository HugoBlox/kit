/**
 * CTA Card Block Component
 * A centered card with title, text, and primary action button.
 * Supports glassmorphism, custom backgrounds, and automatic text color adjustment.
 */

import { Icon } from "../../shared/components/Icon.jsx";

// Simple markdown renderer
function renderText(text) {
    if (!text) return "";
    return String(text)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, "<code>$1</code>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export const CtaCardBlock = ({ content, design, id, button_icon_svg }) => {
    const card = design?.card || {};
    const cardClass = card.css_class || "";
    const cardStyle = card.css_style || "";

    // Overlay Opacity Logic
    let overlayOpacity = 0.15;
    if (card.overlay_opacity !== undefined) {
        const val = parseFloat(card.overlay_opacity);
        if (!isNaN(val)) overlayOpacity = Math.max(0, Math.min(1, val));
    }

    // Text Color Logic
    let textColorMode = "auto";
    if (["light", "dark", "auto"].includes(card.text_color?.toLowerCase())) {
        textColorMode = card.text_color.toLowerCase();
    }

    let textClasses = "text-gray-900 dark:text-white";
    let buttonClasses = "text-gray-900 dark:text-gray-100";

    // Auto-detect based on background gradient
    const bg = design?.background || {};
    const gradientStart = bg.gradient?.start || "";
    const isDarkBg = ["primary-7", "primary-8", "primary-9", "secondary-7", "secondary-8", "secondary-9"].some(p => gradientStart.startsWith(p));

    if (textColorMode === "light") {
        textClasses = "text-white";
        buttonClasses = "text-gray-900 dark:text-white";
    } else if (textColorMode === "dark") {
        textClasses = "text-gray-900 dark:text-white";
        buttonClasses = "text-gray-900 dark:text-white";
    } else if (isDarkBg) {
        textClasses = "text-white";
        buttonClasses = "text-gray-900";
    }

    // Button Logic
    const button = content?.button || {};
    const buttonText = button.text?.trim();
    const buttonUrl = button.url?.trim();
    const showButton = !!(buttonText && buttonUrl);

    let isExternal = false;
    let isNewTab = button.new_tab === true;
    if (buttonUrl) {
        try {
            const url = new URL(buttonUrl, window.location.origin);
            isExternal = url.origin !== window.location.origin;
        } catch {
            isExternal = /^https?:\/\//.test(buttonUrl);
        }
        if (buttonUrl.endsWith(".pdf")) isNewTab = true;
        if (isExternal) isNewTab = true;
    }

    const defaultBgClass = "bg-gradient-to-br from-primary-500/90 via-primary-600/95 to-primary-700/90";
    const finalCardClass = cardClass || defaultBgClass;

    const style = `--glassmorphism-opacity: ${overlayOpacity}; ${cardStyle}`;

    return (
        <div
            class={`relative overflow-hidden ${finalCardClass} p-8 sm:p-12 lg:p-16 xl:p-20 mx-auto max-w-6xl rounded-3xl shadow-2xl flex flex-col items-center text-center`}
            style={style}
        >
            {/* Title */}
            {content.title && (
                <h2
                    class={`${textClasses} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight`}
                    dangerouslySetInnerHTML={{ __html: renderText(content.title) }}
                />
            )}

            {/* Text */}
            {content.text && (
                <div
                    class={`${textClasses}/80 mt-6 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light`}
                    dangerouslySetInnerHTML={{ __html: renderText(content.text) }}
                />
            )}

            {/* Button */}
            {showButton && (
                <div class="flex mt-10">
                    <a
                        href={buttonUrl}
                        target={isNewTab ? "_blank" : undefined}
                        rel={isNewTab ? "noopener" : undefined}
                        class={`group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold ${buttonClasses} transition-all duration-300 ease-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/50 dark:focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent`}
                    >
                        {/* Glassmorphism Background */}
                        <div class="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl ring-1 ring-gray-200/30 dark:ring-white/30 shadow-lg group-hover:bg-white dark:group-hover:bg-gray-800 group-hover:ring-gray-300/50 dark:group-hover:ring-white/50 group-hover:shadow-2xl transition-all duration-300"></div>

                        {/* Button Content */}
                        <span class="relative z-10">{buttonText}</span>
                        {button_icon_svg && (
                            <span class="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                                <Icon svg={button_icon_svg} attributes={{ style: "height: 1.25em", class: "inline-block" }} />
                            </span>
                        )}

                        {/* Glow Effect */}
                        <div class="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </a>
                </div>
            )}
        </div>
    );
};
