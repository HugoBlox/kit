/**
 * Features Block Component - Single source of truth
 * Responsive grid of feature items with icon, name, and description
 */

import { Icon } from "../../shared/components/Icon.jsx";

// Simple markdown renderer
function renderText(text) {
    if (!text) return "";
    return String(text)
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`(.*?)`/g, "<code>$1</code>");
}

function FeatureItem({ item, iconSvg }) {
    return (
        <div>
            {iconSvg && (
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                    <Icon svg={iconSvg} attributes={{ class: "w-5 h-5 lg:w-6 lg:h-6" }} />
                </div>
            )}
            {item.name && (
                <h3
                    class="mb-2 text-xl font-bold dark:text-white"
                    dangerouslySetInnerHTML={{ __html: renderText(item.name) }}
                />
            )}
            {item.description && (
                <p
                    class="text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{ __html: renderText(item.description) }}
                />
            )}
        </div>
    );
}

export const FeaturesBlock = ({ content, design, id, icon_svgs }) => {
    const title = content?.title;
    const text = content?.text;
    const items = Array.isArray(content?.items) ? content.items : [];
    const iconMap = icon_svgs || {};

    return (
        <section>
            <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                {/* Section Header */}
                {(title || text) && (
                    <div class="max-w-screen-md mb-8 lg:mb-16 flex flex-col justify-center mx-auto">
                        {title && (
                            <h2
                                class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center"
                                dangerouslySetInnerHTML={{ __html: renderText(title) }}
                            />
                        )}
                        {text && (
                            <p
                                class="text-gray-500 sm:text-xl dark:text-gray-400 text-center"
                                dangerouslySetInnerHTML={{ __html: renderText(text) }}
                            />
                        )}
                    </div>
                )}

                {/* Feature Grid */}
                <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {items.map((item, idx) => (
                        <FeatureItem
                            key={idx}
                            item={item}
                            iconSvg={item.icon ? iconMap[item.icon] : null}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
