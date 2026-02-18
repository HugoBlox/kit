/**
 * Stats Block - Client-side Hydration
 * Uses the shared StatsBlock component for consistency
 */

import { render } from "preact";
import { StatsBlock } from "./component.jsx";

function renderStatsBlocks() {
    const statsBlocks = document.querySelectorAll('[data-block-type="stats"]');

    statsBlocks.forEach((block) => {
        const propsData = block.dataset.props;
        if (propsData) {
            try {
                const props = JSON.parse(propsData);
                render(<StatsBlock {...props} />, block);
                console.debug(`✓ Stats block "${block.id}" rendered with Preact`);
            } catch (error) {
                console.error(`Failed to render Stats block "${block.id}":`, error);
            }
        }
    });

    if (statsBlocks.length > 0) {
        console.debug(`✓ ${statsBlocks.length} Stats blocks initialized with Preact`);
    }
}

// Initialize immediately — script is already deferred
renderStatsBlocks();
