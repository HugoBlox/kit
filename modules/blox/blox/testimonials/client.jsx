/**
 * Testimonials Block - Client-side Hydration
 */

import { render } from "preact";
import { TestimonialsBlock } from "./component.jsx";

function renderTestimonialsBlocks() {
    const blocks = document.querySelectorAll('[data-block-type="testimonials"]');

    blocks.forEach((block) => {
        const propsData = block.dataset.props;
        if (propsData) {
            try {
                const props = JSON.parse(propsData);
                render(<TestimonialsBlock {...props} />, block);
                console.debug(`✓ Testimonials block "${block.id}" rendered with Preact`);
            } catch (error) {
                console.error(`Failed to render Testimonials block "${block.id}":`, error);
            }
        }
    });
}

renderTestimonialsBlocks();
