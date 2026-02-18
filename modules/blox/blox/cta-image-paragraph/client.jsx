/**
 * CTA Image Paragraph Block - Client-side Hydration
 */

import { render } from "preact";
import { CtaImageParagraphBlock } from "./component.jsx";

function renderCtaImageParagraphBlocks() {
    const blocks = document.querySelectorAll('[data-block-type="cta-image-paragraph"]');

    blocks.forEach((block) => {
        const propsData = block.dataset.props;
        if (propsData) {
            try {
                const props = JSON.parse(propsData);
                render(<CtaImageParagraphBlock {...props} />, block);
                console.debug(`✓ CTA Image Paragraph block "${block.id}" rendered with Preact`);
            } catch (error) {
                console.error(`Failed to render CTA Image Paragraph block "${block.id}":`, error);
            }
        }
    });
}

renderCtaImageParagraphBlocks();
