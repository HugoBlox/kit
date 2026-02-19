/**
 * Testimonials Block Component - Single source of truth
 * Quote cards with avatar, name, and role
 * Avatars are pre-processed by Hugo's image pipeline (passed as item_images prop)
 */

// Quote mark SVG (inline for zero dependencies)
const QuoteSvg = () => (
  <svg
    aria-hidden="true"
    class="h-16 mx-auto mb-3 text-gray-400 dark:text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 32 32"
  >
    <path d="M9.563 8.469l-0.813-1.25c-5.625 3.781-8.75 8.375-8.75 12.156 0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-0.531-0.188-1.031-0.344-1.031-1.25 0-1.156 0.844-2.875 3.938-5.344zM21.969 8.469l-0.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-0.531-0.188-1-0.344-1-1.25 0-1.156 0.875-2.875 3.875-5.344z" />
  </svg>
);

// Simple markdown renderer
function renderText(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

function TestimonialItem({item, avatarUrl, isLast}) {
  return (
    <div class={`max-w-screen-md mx-auto ${isLast ? "" : "mb-12"}`}>
      <QuoteSvg />
      <blockquote>
        <p class="text-2xl font-medium text-gray-900 dark:text-white" dangerouslySetInnerHTML={{__html: `"${renderText(item.text)}"`}} />
      </blockquote>
      <div class="flex items-center justify-center mt-6 space-x-3">
        {/* Avatar */}
        {avatarUrl ? (
          <img class="w-12 h-12 rounded-full" src={avatarUrl} width="48" height="48" alt={item.name || ""} loading="lazy" />
        ) : (
          <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        )}
        <div class="flex flex-col items-center">
          {item.name && <div class="pr-3 font-medium text-gray-900 dark:text-white">{item.name}</div>}
          {item.role && <div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{item.role}</div>}
        </div>
      </div>
    </div>
  );
}

export const TestimonialsBlock = ({content, _design, _id, item_images}) => {
  const title = content?.title;
  const text = content?.text;
  const items = Array.isArray(content?.items) ? content.items : [];
  const imageMap = item_images || {};

  return (
    <section>
      <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        {/* Section Header */}
        {title && (
          <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="max-w-screen-md mb-8 lg:mb-16 flex flex-col justify-center mx-auto">
              <h2
                class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center"
                dangerouslySetInnerHTML={{__html: renderText(title)}}
              />
              {text && <p class="text-gray-500 sm:text-xl dark:text-gray-400 text-center" dangerouslySetInnerHTML={{__html: renderText(text)}} />}
            </div>
          </div>
        )}

        {/* Testimonial Items */}
        {items.map((item, idx) => (
          <TestimonialItem key={idx} item={item} avatarUrl={imageMap[String(idx)]?.src || null} isLast={idx === items.length - 1} />
        ))}
      </div>
    </section>
  );
};
