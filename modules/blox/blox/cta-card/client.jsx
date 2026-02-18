import { render } from "preact";
import { CtaCardBlock } from "./component.jsx";

function renderCtaCardBlock() {
    const blocks = document.querySelectorAll('.cta-card-block-container[data-preact-render="true"]');

    blocks.forEach((block) => {
        try {
            if (block.dataset.rendered === "true") return;

            const props = JSON.parse(block.dataset.props);
            render(<CtaCardBlock {...props} />, block);
            block.dataset.rendered = "true";
        } catch (e) {
            console.error("Error rendering CTA Card Block:", e, block);
        }
    });
}

// Initial render
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCtaCardBlock);
} else {
    renderCtaCardBlock();
}
