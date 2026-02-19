/**
 * CTA Image Paragraph Block Component - Single source of truth
 * Alternating image + text sections with feature lists and CTA buttons
 * Images are pre-processed by Hugo's responsive image pipeline (srcset)
 */

import {Icon} from "../../shared/components/Icon.jsx";

// Simple markdown renderer
function renderText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

// Arrow icon for CTA buttons
const ArrowIcon = () => (
  <svg aria-hidden="true" class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
      clip-rule="evenodd"
    />
  </svg>
);

function CtaItem({item, idx, imageData, featureIconSvg}) {
  const isReversed = idx % 2 === 1;
  const hasImage = !!imageData;
  const _featureIcon = item.feature_icon || "check";

  // Resolve button link
  const buttonUrl = item.button?.url || "";
  let isExternal = false;
  if (buttonUrl) {
    try {
      const url = new URL(buttonUrl, window.location.origin);
      isExternal = url.origin !== window.location.origin;
    } catch {
      isExternal = /^https?:\/\//.test(buttonUrl);
    }
  }

  const features = Array.isArray(item.features) ? item.features : typeof item.features === "string" ? [item.features] : [];

  return (
    <div class={`gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 ${hasImage ? "md:grid md:grid-cols-2" : ""} sm:py-16 lg:px-6`}>
      {/* Image */}
      {hasImage &&
        (imageData.srcset ? (
          <img
            class="w-full"
            srcset={imageData.srcset}
            sizes="(max-width: 768px) 100vw, 50vw"
            src={imageData.src}
            width={imageData.width}
            height={imageData.height}
            alt={item.title || ""}
            style={isReversed ? {order: 1} : undefined}
          />
        ) : (
          <img
            class="w-full"
            src={imageData.src}
            width={imageData.width}
            height={imageData.height}
            alt={item.title || ""}
            style={isReversed ? {order: 1} : undefined}
          />
        ))}

      {/* Text Content */}
      <div class="mt-4 md:mt-0">
        {item.title && (
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
            dangerouslySetInnerHTML={{__html: renderText(item.title)}}
          />
        )}
        {item.text && (
          <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400" dangerouslySetInnerHTML={{__html: renderText(item.text)}} />
        )}

        {/* Feature List */}
        {features.length > 0 && (
          <ul>
            {features.map((feature, fIdx) => (
              <li key={fIdx} class="relative mb-4 pl-6">
                {featureIconSvg ? <Icon svg={featureIconSvg} attributes={{class: "inline-block pr-5", style: "height: 1em;"}} /> : null}
                <span dangerouslySetInnerHTML={{__html: renderText(String(feature))}} />
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        {item.button?.text && item.button?.url && (
          <a
            href={buttonUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener" : undefined}
            class="mt-3 inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
          >
            {item.button.text}
            <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export const CtaImageParagraphBlock = ({content, _design, _id, item_images, icon_svgs}) => {
  const items = Array.isArray(content?.items) ? content.items : [];
  const imageMap = item_images || {};
  const iconMap = icon_svgs || {};

  return (
    <div>
      {items.map((item, idx) => (
        <CtaItem
          key={idx}
          item={item}
          idx={idx}
          imageData={imageMap[String(idx)] || null}
          featureIconSvg={item.feature_icon ? iconMap[item.feature_icon] : iconMap.check}
        />
      ))}
    </div>
  );
};
